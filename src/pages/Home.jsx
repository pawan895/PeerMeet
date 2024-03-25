import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import login from '../assets/icons/Login.png';
import add from '../assets/icons/PlusNoBackground.png';
import logo from '../assets/logo.png';
import Lottie from "react-lottie";
import animationData from "../assets/Animations/girlOnMobile.json";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
    const [animationSize, setAnimationSize] = useState({ height: 400, width: 500 });

    const handleInstantMeetClick = () => {
        toast.info('Feature Coming Soon!');
    }

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;
            if (windowWidth < 768) { // Adjust the threshold as needed
                setAnimationSize({ height: 200, width: 250 });
            } else {
                setAnimationSize({ height: 400, width: 500 });
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call initially to set size based on current window width

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='bg-gray-800 h-screen lg:overflow-hidden md:overflow-hidden'>
            <div className='mx-auto max-w-[80%]'>
                <div className='flex justify-between items-center'>
                    <img src={logo} alt="Logo" className='lg:w-48 sm:w-24' />
                    <Navbar />
                </div>
                <div className='flex flex-col lg:flex-row items-center justify-center p-8'>
                    <div className='flex flex-col gap-4 text-center lg:text-left'>
                        <h1 className='text-4xl text-gray-200 font-bold'>
                            Putting the ‘fun’ in <br />
                            Fundamentals
                        </h1>
                        <p className='text-lg text-gray-400'>
                            PeerMeet lets you VideoChat with your friends.
                            Choose Random match to match with random peoples,
                            choose Instant meet to have your own meet.
                        </p>
                        <div className='flex flex-col lg:flex-row gap-4'>
                        <Link to="/peerjoin">
                            <button className='bg-[#6a4e56] rounded-xl flex gap-2 py-3 px-4 text-gray-200' onClick={handleInstantMeetClick}>
                                <img src={login} alt="" className='w-6' />
                                <span>Join Meet</span>
                            </button>
                            </Link>
                            <Link to="/dashboard">
                                <button className='bg-[#6a4e56] rounded-xl flex gap-2 py-3 px-4 text-gray-200'>
                                    <img src={add} alt="" className='w-6' />
                                    <span>Start Meet</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <Lottie options={defaultOptions} height={animationSize.height} width={animationSize.width} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

export default Home;
