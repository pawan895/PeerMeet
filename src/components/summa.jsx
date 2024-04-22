import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

const VideoChat = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [roomId, setRoomId] = useState('');

  const inputClasses = 'border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500';
  const buttonClasses = 'bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-500';

  // Function to create and set the local stream
  const setupLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      setLocalStream(stream);
    } catch (error) {
      console.error('Error accessing local media devices:', error);
    }
  };

  // Function to create and set up the peer connection
  const setupPeerConnection = () => {
    const pc = new RTCPeerConnection();
    setPeerConnection(pc); // Set the peerConnection state

    if (localStream) {
      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });
    }

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        const database = getDatabase();
        const candidatesRef = ref(database, `rooms/${roomId}/candidates`);
        set(candidatesRef, { candidate: event.candidate.toJSON() });
      }
    };

    pc.onnegotiationneeded = async () => {
      try {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        const database = getDatabase();
        const offerRef = ref(database, `rooms/${roomId}/offer`);
        set(offerRef, { type: offer.type, sdp: offer.sdp });
      } catch (error) {
        console.error('Error creating offer:', error);
      }
    };

    pc.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };
  };

  const handleReceiveCandidates = async (candidateData) => {
    if (peerConnection && candidateData) {
      try {
        const candidate = new RTCIceCandidate(candidateData.candidate);
        await peerConnection.addIceCandidate(candidate);
      } catch (error) {
        console.error('Error adding ICE candidate:', error);
      }
    }
  };

  useEffect(() => {
    setupLocalStream();
    setupPeerConnection();
  }, []);

  useEffect(() => {
    const database = getDatabase();
    const candidatesRef = ref(database, `rooms/${roomId}/candidates`);
    onValue(candidatesRef, (snapshot) => {
      const data = snapshot.val();
      handleReceiveCandidates(data);
    });

    return () => {
      setPeerConnection(null);
    };
  }, [roomId]);

  const handleCreateRoom = async () => {
    const newRoomId = uuidv4(); // Generate a new Room ID
    setRoomId(newRoomId);
    console.log('Created Room ID:', newRoomId);

    try {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      const database = getDatabase();
      const offerRef = ref(database, `rooms/${newRoomId}/offer`);
      set(offerRef, { type: offer.type, sdp: offer.sdp });
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  };

  const handleJoinExistingRoom = async () => {
    if (peerConnection) {
      try {
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
  
        const database = getDatabase();
        const answerRef = ref(database, `rooms/${roomId}/answer`);
        set(answerRef, { type: answer.type, sdp: answer.sdp });
      } catch (error) {
        console.error('Error creating answer:', error);
      }
    } else {
      console.error('Peer connection is not initialized');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className={inputClasses}
      />
      <div className="flex gap-4 mt-4">
        <button onClick={handleCreateRoom} className={buttonClasses}>Create Room</button>
        <button onClick={handleJoinExistingRoom} className={buttonClasses}>Join Room</button>
      </div>
      <div className="flex justify-center mt-4">
        <video
          ref={(videoElement) => {
            if (videoElement && localStream) {
              videoElement.srcObject = localStream;
            }
          }}
          autoPlay
          muted
          playsInline
          className="w-1/2 rounded-md"
        />
        <video
          ref={(videoElement) => {
            if (videoElement && remoteStream) {
              videoElement.srcObject = remoteStream;
            }
          }}
          autoPlay
          playsInline
          className="w-1/2 rounded-md"
        />
      </div>
    </div>
  );
};

export default VideoChat;
