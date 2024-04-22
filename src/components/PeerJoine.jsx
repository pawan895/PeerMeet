import React, { useEffect, useRef } from 'react';
import login from '../assets/icons/Login.png';
import logo from '../assets/logo.png';
import { onValue, ref, set } from 'firebase/database';
import { UserAuth } from "../context/AuthContext";
import { db } from '../firebase';
import IceServer from '../iceServer';
import Navbar from './Navbar';

const PeerJoin = () => {
    const userVideoRef = useRef(null);
    const clientVideoRef = useRef(null);
    const remoteConnectionRef = useRef(null);
    const { user, logOut } = UserAuth();
    const offerRef = ref(db, `Meets/${user.uid}/Offer`);
    const answerRef = ref(db, `Meets/${user.uid}/Answer`);

    useEffect(() => {
        const startWebcam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
                userVideoRef.current.srcObject = stream;
                clientVideoRef.current.srcObject = stream;
                joinExistingConnection();
            } catch (err) {
                console.log(err);
            }
        };
        startWebcam();

        return () => {
            const tracks = userVideoRef.current.srcObject?.getTracks() || [];
            tracks.forEach(track => track.stop());
        };
    }, []);
    console.log("This is the iceServer logs",IceServer)
    const joinExistingConnection = async () => {
        const remoteConnection = new RTCPeerConnection(IceServer);
        remoteConnectionRef.current = remoteConnection;

        remoteConnection.onicecandidate = handleIceCandidate;
        remoteConnection.ontrack = handleTrack;

        const stream = userVideoRef.current.srcObject;
        stream.getTracks().forEach(track => remoteConnection.addTrack(track, stream));

        fetchOffer(remoteConnection);
    };

    const fetchOffer = async (remoteConnection) => {
        onValue(offerRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                remoteConnection.setRemoteDescription(data)
                    .then(() => {
                      
                        createAnswer(remoteConnection);
                    })
                    .catch(err => console.error("Error setting remote description:", err));
            }
        });
    };

    const createAnswer = async (remoteConnection) => {
        const answer = await remoteConnection.createAnswer();
        
        await remoteConnection.setLocalDescription(answer);
        set(answerRef, { sdp: answer.sdp, type: answer.type });
        console.log("local and remote description set.");
    };

    const handleIceCandidate = async (e) => {
        const { localDescription } = remoteConnectionRef.current;
        console.log("NEW ice candidate!! on remote connection:", JSON.stringify(localDescription));
    };

    const handleTrack = (e) => {
        console.log("Received remote track:", e.track);
        clientVideoRef.current.srcObject = e.streams[0];
    };

    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="h-screen bg-gray-800 overflow-hidden">
            <div className='w-full flex items-center justify-between shadow-xl p-2 rounded-2xl'>
                <img src={logo} alt="" width={200} />
                <Navbar />
                <div className='flex justify-end p-4'>
                <button className='flex text-gray-300 items-center gap-2 justify-right' onClick={handleSignOut}>
                    <img src={login} alt="" width={35} />LogOut
                </button>
            </div>
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

export default PeerJoin;
