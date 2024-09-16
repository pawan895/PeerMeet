import React, { useState, useEffect, useRef } from 'react';
import { onValue, ref, set, push, child } from 'firebase/database';
import { UserAuth } from "../context/AuthContext";
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Toast } from '@/components/ui/toast';
import { LogOut, Video, VideoOff, Mic, MicOff, Copy } from 'lucide-react';
import logo from '../assets/logo.png';
import Navbar from './Navbar';
import IceServer from '../iceServer';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, logOut } = UserAuth();
    const [roomCode, setRoomCode] = useState('');
    const [isHost, setIsHost] = useState(true);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [isAudioOn, setIsAudioOn] = useState(true);
    const [isConnected, setIsConnected] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const userVideoRef = useRef(null);
    const peerConnectionRef = useRef(null);
    const localStreamRef = useRef(null);

    useEffect(() => {
        if (isHost) {
            generateRoomCode();
        }
        startWebcam();

        return () => {
            if (localStreamRef.current) {
                localStreamRef.current.getTracks().forEach(track => track.stop());
            }
            if (peerConnectionRef.current) {
                peerConnectionRef.current.close();
            }
        };
    }, [isHost]);

    const generateRoomCode = () => {
        const newRoomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        setRoomCode(newRoomCode);
        const roomRef = ref(db, `rooms/${newRoomCode}`);
        set(roomRef, { host: user.uid, created: Date.now() });
    };

    const startWebcam = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            userVideoRef.current.srcObject = stream;
            localStreamRef.current = stream;
        } catch (err) {
            console.error("Error accessing media devices:", err);
        }
    };

    const createPeerConnection = () => {
        const peerConnection = new RTCPeerConnection(IceServer);

        localStreamRef.current.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStreamRef.current);
        });

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                const roomRef = ref(db, `rooms/${roomCode}`);
                push(child(roomRef, 'ice-candidates'), event.candidate.toJSON());
            }
        };

        peerConnection.onconnectionstatechange = () => {
            if (peerConnection.connectionState === 'connected') {
                setIsConnected(true);
            }
        };

        peerConnectionRef.current = peerConnection;
    };

    const handleJoinRoom = async () => {
        if (!roomCode) return;

        setIsHost(false);
        const roomRef = ref(db, `rooms/${roomCode}`);

        createPeerConnection();

        if (isHost) {
            const offer = await peerConnectionRef.current.createOffer();
            await peerConnectionRef.current.setLocalDescription(offer);
            await set(child(roomRef, 'offer'), { type: offer.type, sdp: offer.sdp });
        } else {
            onValue(child(roomRef, 'offer'), async (snapshot) => {
                const offer = snapshot.val();
                if (offer && !peerConnectionRef.current.currentRemoteDescription) {
                    await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
                    const answer = await peerConnectionRef.current.createAnswer();
                    await peerConnectionRef.current.setLocalDescription(answer);
                    await set(child(roomRef, 'answer'), { type: answer.type, sdp: answer.sdp });
                }
            });
        }

        onValue(child(roomRef, 'ice-candidates'), (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const candidate = new RTCIceCandidate(childSnapshot.val());
                peerConnectionRef.current.addIceCandidate(candidate);
            });
        });
    };

    const toggleVideo = () => {
        const videoTrack = localStreamRef.current.getVideoTracks()[0];
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(videoTrack.enabled);
    };

    const toggleAudio = () => {
        const audioTrack = localStreamRef.current.getAudioTracks()[0];
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioOn(audioTrack.enabled);
    };

    const copyRoomCode = () => {
        navigator.clipboard.writeText(roomCode);
        // setShowToast(true);
        // setTimeout(() => setShowToast(false), 3000);
    };

    const handleSignOut = async () => {
        try {
            await logOut();
            navigate('/');
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <header className="bg-gray-800 shadow-lg">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <img src={logo} alt="Peer Meet Logo" className="h-10" />
                    <Navbar />
                    <Button variant="ghost" onClick={handleSignOut} className="text-white">
                        <LogOut className="mr-2 h-4 w-4" /> Sign Out
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <Card className="bg-gray-800">
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-300">{isHost ? 'Your Room' : 'Join a Room'}</h2>
                            <div className="flex items-center space-x-4">
                                <Input
                                    type="text"
                                    value={roomCode}
                                    onChange={(e) => setRoomCode(e.target.value)}
                                    placeholder={isHost ? 'Your room code' : 'Enter room code'}
                                    className="flex-grow text-gray-400"
                                    readOnly={isHost}
                                />
                                {isHost ? (
                                    <Button onClick={copyRoomCode}>
                                        <Copy className="mr-2 h-4 w-4" /> Copy
                                    </Button>
                                ) : (
                                    <Button onClick={handleJoinRoom}>Join Room</Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    <Card className="bg-gray-800 overflow-hidden">
                        <CardContent className="p-0">
                            <video ref={userVideoRef} autoPlay playsInline muted className="w-full h-auto" />
                        </CardContent>
                    </Card>
                    {isConnected && (
                        <Card className="bg-gray-800 overflow-hidden">
                            <CardContent className="p-0">
                                <video id="remoteVideo" autoPlay playsInline className="w-full h-auto" />
                            </CardContent>
                        </Card>
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-8 flex justify-center space-x-4"
                >
                    <Button onClick={toggleVideo} variant={isVideoOn ? "default" : "destructive"}>
                        {isVideoOn ? <Video className="mr-2 h-4 w-4" /> : <VideoOff className="mr-2 h-4 w-4" />}
                        {isVideoOn ? "Turn Off Video" : "Turn On Video"}
                    </Button>
                    <Button onClick={toggleAudio} variant={isAudioOn ? "default" : "destructive"}>
                        {isAudioOn ? <Mic className="mr-2 h-4 w-4" /> : <MicOff className="mr-2 h-4 w-4" />}
                        {isAudioOn ? "Mute Audio" : "Unmute Audio"}
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-4 text-center"
                >
                    <p className={`text-lg ${isConnected ? 'text-green-500' : 'text-yellow-500'}`}>
                        {isConnected ? 'Connected to peer' : 'Waiting for peer to join...'}
                    </p>
                </motion.div>
            </main>

            {showToast && (
                <Toast>Room code copied to clipboard!</Toast>
            )}
        </div>
    );
};

export default Dashboard;