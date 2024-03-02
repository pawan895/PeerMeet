import { React, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import sendIcon from '../assets/icons/send.png';
import plusIcon from '../assets/icons/plus.png';

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

            <div className='w-2/6 p-4 bg-gray-700 flex flex-col justify-center items-center gap-4 '>

                <div
                    className='w-full flex items-center justify-center shadow-xl p-2 rounded-2xl'>
                    <img src="Images/logo.png" alt="" width={200} />

                </div>
                <div className='shadow-xl rounded-xl'>

                    <div className='p-2'>
                        <video ref={clientVideoRef} width="640" height="480" autoPlay playsInline
                            className='rounded-2xl' />
                    </div>
                    <div className='p-2'>
                        <video ref={userVideoRef} width="640" height="480" autoPlay playsInline
                            className='rounded-2xl'
                        />
                    </div>

                </div>


            </div>
            <div className='w-4/6 bg-gray-800 px-8 py-4 flex flex-col justify-between'>
                <Navbar />
                <div className='bg-gray-700 flex flex-col justify-end h-5/6 p-2 rounded-xl'>

                    <div>
                        {/* Example Chat Messages */}

                        <div className="mb-2">
                            <h1 className='text-gray-300'><strong>User 1:</strong> Hello!</h1>
                        </div>
                        <div className="mb-2">
                            <h1 className='text-gray-300'><strong>User 2:</strong> Hi there!</h1>
                        </div>

                    </div>

                    <div className="relative m-2">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="bg-gray-600 border text-gray-300 rounded-lg p-2 pl-10 focus:outline-none focus:border-gray-400 w-full"
                        />
                        <img src={plusIcon} alt="" className='absolute top-0 left-2 w-6 h-6 mt-2' />
                        <button className="absolute top-0 right-0 px-4 py-2 rounded-md hover:bg-blue-600">
                            <img src={sendIcon} alt="" className='w-6 h-6' />
                        </button>
                    </div>



                </div>


            </div>
        </div>
    );
};

export default Dashboard;
