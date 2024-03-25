import React, { useEffect, useRef } from 'react';
import { onValue, ref, set, off } from 'firebase/database';
import { db } from '../firebase';
import { UserAuth } from "../context/AuthContext";
import login from '../assets/icons/Login.png';
import logo from '../assets/logo.png';

const Dashboard = () => {
    const userVideoRef = useRef(null);
    const clientVideoRef = useRef(null);
    const localConnectionRef = useRef(null);
    const { user, logOut } = UserAuth();
    const offerRef = ref(db, `Meets/${user.uid}/Offer`);
    const answerRef = ref(db, `Meets/${user.uid}/Answer`);

    useEffect(() => {
        const startWebcam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
                if (stream) {
                    userVideoRef.current.srcObject = stream;
                    console.log("Stream obtained successfully:", stream);
                    createPeerConnection(stream);
                } else {
                    console.error("Failed to obtain stream:", stream);
                }
            } catch (err) {
                console.error("Error accessing webcam:", err);
            }
        };

        startWebcam();

        return () => {
            const tracks = userVideoRef.current.srcObject?.getTracks() || [];
            tracks.forEach(track => track.stop());
        };
    }, []);

    const createPeerConnection = async (stream) => {
        try {
            const localConnection = new RTCPeerConnection({
                iceServers: [
                    {
                      urls: "stun:stun.relay.metered.ca:80",
                    },
                    {
                      urls: "turn:standard.relay.metered.ca:80",
                      username: "79fd5ee51186e1ce1a7addeb",
                      credential: "G+eiTE1mPZru3K9/",
                    },
                    {
                      urls: "turn:standard.relay.metered.ca:80?transport=tcp",
                      username: "79fd5ee51186e1ce1a7addeb",
                      credential: "G+eiTE1mPZru3K9/",
                    },
                    {
                      urls: "turn:standard.relay.metered.ca:443",
                      username: "79fd5ee51186e1ce1a7addeb",
                      credential: "G+eiTE1mPZru3K9/",
                    },
                    {
                      urls: "turns:standard.relay.metered.ca:443?transport=tcp",
                      username: "79fd5ee51186e1ce1a7addeb",
                      credential: "G+eiTE1mPZru3K9/",
                    },
                ],
              });

            localConnection.onicecandidate = handleIceCandidate;
            const sendChannel = localConnection.createDataChannel("sendChannel");
            sendChannel.onmessage = handleChannelMessage;
            sendChannel.onopen = () => console.log("Channel opened.");
            sendChannel.onclose = () => console.log("Channel closed.");

            stream.getTracks().forEach(track => localConnection.addTrack(track, stream));

            const offer = await localConnection.createOffer();
            await localConnection.setLocalDescription(offer);
            set(offerRef, { sdp: offer.sdp, type: offer.type });
            localConnectionRef.current = localConnection;

            console.log("Local connection created successfully:", localConnection);
        } catch (error) {
            console.error("Error creating peer connection:", error);
        }
    };

    const handleIceCandidate = async (e) => {
        const { localDescription } = localConnectionRef.current;
        console.log("NEW ice candidate!! on local connection:", JSON.stringify(localDescription));
        const temp = { sdp: localDescription.sdp, type: localDescription.type };
        set(offerRef, temp);
    };

    const handleChannelMessage = (e) => console.log("Message received:", e.data);

    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (localConnectionRef.current != null) {
            const handleAnswer = async (snapshot) => {
                const { localConnection } = localConnectionRef.current;
                const data = snapshot.val();
                console.log("Received answer from database:", data); // Add this console log to check the received data
                if (data && localConnection) {
                    try {
                        await localConnection.setRemoteDescription(new RTCSessionDescription(data));
                        console.log("Answer received from database and set as remote description", data);
                    } catch (error) {
                        console.error("Error setting remote description:", error);
                    }
                }
            };

            onValue(answerRef, handleAnswer);

            return () => {
                off(answerRef, handleAnswer);
            };
        }
    }, [localConnectionRef.current]);

    return (
        <div className="h-screen bg-gray-800 overflow-hidden">
            <div className='w-full flex items-center justify-center shadow-xl p-2 rounded-2xl'>
                <img src={logo} alt="" width={200} />
            </div>
            <div className='flex justify-end p-4'>
                <button className='flex text-gray-300 items-center gap-2 justify-right' onClick={handleSignOut}>
                    <img src={login} alt="" width={40} />LogOut
                </button>
            </div>
            <div className='p-4 bg-gray-700 flex justify-center items-center gap-4 '>
                <div className='flex sm:flex-row my-10 items-center justify-center shadow-xl rounded-xl'>
                    <div className='p-2'>
                        <video ref={clientVideoRef} width="640" height="480" autoPlay playsInline className='rounded-2xl' />
                    </div>
                    <div className='p-2'>
                        <video ref={userVideoRef} width="640" height="480" autoPlay playsInline className='rounded-2xl' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
