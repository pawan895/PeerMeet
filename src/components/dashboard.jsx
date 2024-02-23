import React from 'react';
import { useEffect, useRef } from 'react';


const Dashboard = () => {
    const userVideoRef = useRef(null);
    const clientVideoRef = useRef(null);

    useEffect(() => {
        const constraints = { audio: false, video: true };
        const startWebcam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                console.log(stream);
                userVideoRef.current.srcObject = stream;
                clientVideoRef.current.srcObject = stream;
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
        <div className="flex h-screen bg-gray-900">
            <div className='w-1/4 bg-gray-700 flex flex-col justify-center gap-2'>
                <div >
                    <video ref={clientVideoRef} width="640" height="480" autoPlay playsInline
                        className='' />
                </div>
                <div>
                    <video ref={userVideoRef} width="640" height="480" autoPlay playsInline
                        className=''
                    />
                </div>
            </div>
            <div className='w-3/4 bg-gray-800 px-8 py-4 flex flex-col justify-between'>
                <div>
                    {/* Example Chat Messages */}

                    <div className="mb-2">
                        <h1 className='text-gray-300'><strong>User 1:</strong> Hello!</h1>
                    </div>
                    <div className="mb-2">
                        <h1 className='text-gray-300'><strong>User 2:</strong> Hi there!</h1>
                    </div>

                </div>

                <div className="flex items-center mb-4">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 bg-gray-600 border text-gray-300 rounded-md p-2 mr-2 focus:outline-none focus:border-gray-400"
                    />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        Send
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
