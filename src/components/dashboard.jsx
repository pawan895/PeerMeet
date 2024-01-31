import React from 'react';
import { useEffect, useRef } from 'react';


const Dashboard = () => {
    const userVideoRef = useRef(null);
    const clientVideoRef = useRef(null);

    useEffect(() => {
        const constraints = { audio: true, video: true };
        const startWebcam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                console.log(stream);
                userVideoRef.current.srcObject = stream;
            } catch (err) {
                console.log(err);
            }
        };
        startWebcam();

        return () => {
            if (userVideoRef.current) {
                const stream = userVideoRef.current.srcObject;
                const tracks = stream?.getTracks() || [];

                tracks.forEach(track => {
                    track.stop();
                });
            }
        };
    }, []);


    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 w-full flex bg-gray-200">
                    {/* Video Screens (Stacked on the Left) */}
                    <div className='w-1/3 h-screen  flex flex-col justify-between items-center p-8'>
                        <div>
                            <video ref={clientVideoRef} width="640" height="480" autoPlay playsInline
                                className='w-96' />
                        </div>
                        <div>
                            <video ref={userVideoRef} width="640" height="480" autoPlay playsInline
                                className='w-96'
                            />
                        </div>
                    </div>


                    {/* Chat Section (On the Right) */}
                    <div className="w-2/3 p-6 bg-white border-l">
                        {/* Chatbox Component Goes Here */}


                        {/* Chat Messages Go Here */}
                        <div className="flex flex-col p-4 justify-between h-screen overflow-y-auto">
                            <div>
                                {/* Example Chat Messages */}

                                <div className="mb-2">
                                    <strong>User 1:</strong> Hello!
                                </div>
                                <div className="mb-2">
                                    <strong>User 2:</strong> Hi there!
                                </div>

                            </div>

                            <div className="flex items-center mb-4">
                                <input
                                    type="text"
                                    placeholder="Type your message..."
                                    className="flex-1 border rounded-md p-2 mr-2 focus:outline-none focus:border-blue-500"
                                />
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
