import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
            if (windowWidth < 768) {
                setAnimationSize({ height: 200, width: 250 });
            } else {
                setAnimationSize({ height: 400, width: 500 });
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white overflow-hidden'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <header className='py-6'>
                    <div className='flex justify-between items-center'>
                        <motion.img 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            src={logo} 
                            alt="Logo" 
                            className='w-32 md:w-48'
                        />
                        <Navbar />
                    </div>
                </header>

                <main className='mt-10 md:mt-16'>
                    <div className='flex flex-col lg:flex-row items-center justify-between'>
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className='flex flex-col gap-8 text-center lg:text-left lg:w-1/2'
                        >
                            <h1 className='text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
                                Putting the 'fun' in Fundamentals
                            </h1>
                            <p className='text-xl text-gray-300'>
                                PeerMeet lets you VideoChat with your friends. Choose Random match to connect with new people, or start an Instant meet for your own gathering.
                            </p>
                            <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
                                <Link to="/peerjoin">
                                    <motion.button 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className='bg-purple-600 hover:bg-purple-700 rounded-full flex items-center gap-2 py-3 px-6 text-white font-semibold transition duration-300'
                                        onClick={handleInstantMeetClick}
                                    >
                                        <img src={login} alt="" className='w-6' />
                                        <span>Join Meet</span>
                                    </motion.button>
                                </Link>
                                <Link to="/dashboard">
                                    <motion.button 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className='bg-pink-600 hover:bg-pink-700 rounded-full flex items-center gap-2 py-3 px-6 text-white font-semibold transition duration-300'
                                    >
                                        <img src={add} alt="" className='w-6' />
                                        <span>Start Meet</span>
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className='mt-10 lg:mt-0 lg:w-1/2'
                        >
                            <div className='relative'>
                                <div className='absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full filter blur-3xl opacity-70'></div>
                                <Lottie options={defaultOptions} height={animationSize.height} width={animationSize.width} />
                            </div>
                        </motion.div>
                    </div>
                </main>
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