import React, { useEffect, useState } from 'react';
import Lottie from "react-lottie";
import animationData from '../assets/Animations/siginin.json'
import { toast } from 'react-toastify';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ref, child, get, set, update } from 'firebase/database';
import { db } from '../firebase';
import LoginIcon from '../assets/icons/Login.png'


const SignIn = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const [animationSize, setAnimationSize] = useState({ height: 400, width: 500 });


  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {


    if (user != null) {
      checkAndUpdateUserStatus();
      navigate('/dashboard');

    }
  }, [user]);

  const checkAndUpdateUserStatus = async () => {
   
    // const refUserRegister = ref(db, 'Users/Registration/' + userID);
    toast.success('Signed in sucessfully 👍')

    
  };

  return (
    <div className="bg-heroBg bg-gray-950 text-white min-h-screen flex flex-col gap-3 md:flex-row items-center justify-center h-screen overflow-hidden">
      <div className='h-96 w-96'>
      <Lottie options={defaultOptions}  />
      </div>
      <div>
        <h1 className="text-2xl text-center md:text-left font-bold mb-4">Sign In / Sign Up</h1>
        <p className='max-w-sm text-center md:text-left'>Sign Up to our platform to get Started  </p>
        <button
          className="flex items-center mx-auto md:mx-0 px-4 py-3 mt-8 space-x-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
          onClick={handleGoogleSignIn}
        >

          <img src={LoginIcon} alt="signIn" className='w-6 m-1' />
          <span>Sign in with Google</span>
        </button>
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
export default SignIn;