import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import login from "../assets/icons/Login.png";
import add from "../assets/icons/PlusNoBackground.png";
import logo from "../assets/logo.png";
import Lottie from "react-lottie";
import animationData from "../assets/Animations/girlOnMobile.json";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaVideo,
  FaUsers,
  FaLock,
  FaChalkboardTeacher,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Home = () => {
  const [animationSize, setAnimationSize] = useState({
    height: 400,
    width: 500,
  });
  const [isVisible, setIsVisible] = useState({
    about: false,
    features: false,
    pricing: false,
    contact: false,
  });

  const handleInstantMeetClick = () => {
    toast.info("Feature Coming Soon!");
  };

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 768) {
        setAnimationSize({ height: 200, width: 250 });
      } else {
        setAnimationSize({ height: 400, width: 500 });
      }
    };

    const handleScroll = () => {
      const aboutSection = document.getElementById("about");
      const featuresSection = document.getElementById("features");
      const pricingSection = document.getElementById("pricing");
      const contactSection = document.getElementById("contact");

      if (aboutSection) {
        setIsVisible((prev) => ({
          ...prev,
          about: isElementInViewport(aboutSection),
        }));
      }

      if (featuresSection) {
        setIsVisible((prev) => ({
          ...prev,
          features: isElementInViewport(featuresSection),
        }));
      }

      if (pricingSection) {
        setIsVisible((prev) => ({
          ...prev,
          pricing: isElementInViewport(pricingSection),
        }));
      }

      if (contactSection) {
        setIsVisible((prev) => ({
          ...prev,
          contact: isElementInViewport(contactSection),
        }));
      }
    };

    const isElementInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.8
      );
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white overflow-hidden">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="py-6">
          <div className="flex justify-between items-center">
            <motion.img
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              src={logo}
              alt="Logo"
              className="w-32 md:w-48"
            />
            <Navbar />
          </div>
        </header>

        <main className="mt-10 md:mt-16">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-8 text-center lg:text-left lg:w-1/2"
            >
              <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Putting the 'fun' in Fundamentals
              </h1>
              <p className="text-xl text-gray-300">
                PeerMeet lets you VideoChat with your friends. Choose Random
                match to connect with new people, or start an Instant meet for
                your own gathering.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/peerjoin">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-purple-600 hover:bg-purple-700 rounded-full flex items-center gap-2 py-3 px-6 text-white font-semibold transition duration-300"
                  >
                    <img src={login} alt="" className="w-6" />
                    <span>Join Meet</span>
                  </motion.button>
                </Link>
                <Link to="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-pink-600 hover:bg-pink-700 rounded-full flex items-center gap-2 py-3 px-6 text-white font-semibold transition duration-300"
                  >
                    <img src={add} alt="" className="w-6" />
                    <span>Start Meet</span>
                  </motion.button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 lg:mt-0 lg:w-1/2"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full filter blur-3xl opacity-70"></div>
                <Lottie
                  options={defaultOptions}
                  height={animationSize.height}
                  width={animationSize.width}
                />
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={
              isVisible.about ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              About PeerMeet
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              PeerMeet was founded with a simple mission: to connect people
              through seamless, high-quality video experiences. We believe that
              meaningful connections shouldn't be limited by distance or
              technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                isVisible.about ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.7, delay: 0.1 }}
              className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
            >
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FaVideo className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Our Story</h3>
              <p className="text-gray-300 text-center">
                Founded in 2023, PeerMeet emerged from a team of developers
                passionate about creating better ways for people to connect
                online.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                isVisible.about ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
            >
              <div className="bg-pink-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FaUsers className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">
                Our Mission
              </h3>
              <p className="text-gray-300 text-center">
                We're committed to building technology that brings people closer
                together through intuitive and reliable video communication.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                isVisible.about ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.7, delay: 0.3 }}
              className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-purple-500/20 transition-all duration-300 md:col-span-2 lg:col-span-1"
            >
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FaLock className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Our Values</h3>
              <p className="text-gray-300 text-center">
                Security, ease of use, and creating meaningful connections are
                the core values that drive every feature we build.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={
              isVisible.features ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Key Features
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover what makes PeerMeet the perfect platform for all your
              video communication needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={
                isVisible.features
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -30 }
              }
              transition={{ duration: 0.7, delay: 0.1 }}
              className="bg-gray-900 p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-4 text-purple-400">
                Instant Meetings
              </h3>
              <p className="text-gray-300 mb-6">
                Start a video call in seconds with just one click. No downloads
                required, just share the link and connect instantly.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center mr-3">
                    ✓
                  </div>
                  <span className="text-gray-300">
                    One-click meeting creation
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center mr-3">
                    ✓
                  </div>
                  <span className="text-gray-300">Shareable meeting links</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center mr-3">
                    ✓
                  </div>
                  <span className="text-gray-300">
                    No account required for guests
                  </span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={
                isVisible.features
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: 30 }
              }
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-gray-900 p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-4 text-pink-400">
                Random Matching
              </h3>
              <p className="text-gray-300 mb-6">
                Connect with new people from around the world. Our smart
                matching algorithm pairs you with like-minded individuals.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-pink-600 flex items-center justify-center mr-3">
                    ✓
                  </div>
                  <span className="text-gray-300">Interest-based matching</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-pink-600 flex items-center justify-center mr-3">
                    ✓
                  </div>
                  <span className="text-gray-300">
                    Safe and moderated environment
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-pink-600 flex items-center justify-center mr-3">
                    ✓
                  </div>
                  <span className="text-gray-300">
                    Skip option for new matches
                  </span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={
                isVisible.features
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -30 }
              }
              transition={{ duration: 0.7, delay: 0.3 }}
              className="bg-gray-900 p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-4 text-purple-400">
                High-Quality Video
              </h3>
              <p className="text-gray-300 mb-6">
                Enjoy crystal clear video and audio with our optimized streaming
                technology, even on slower connections.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center mr-3">
                    ✓
                  </div>
                  <span className="text-gray-300">HD video quality</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center mr-3">
                    ✓
                  </div>
                  <span className="text-gray-300">Adaptive streaming</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center mr-3">
                    ✓
                  </div>
                  <span className="text-gray-300">Echo cancellation</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={
                isVisible.features
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: 30 }
              }
              transition={{ duration: 0.7, delay: 0.4 }}
              className="bg-gray-900 p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-4 text-pink-400">
                Collaborative Tools
              </h3>
              <p className="text-gray-300 mb-6">
                Do more than just talk with our integrated collaboration
                features designed for productivity.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-pink-600 flex items-center justify-center mr-3">
                    ✓
                  </div>
                  <span className="text-gray-300">Screen sharing</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-pink-600 flex items-center justify-center mr-3">
                    ✓
                  </div>
                  <span className="text-gray-300">In-call chat</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-pink-600 flex items-center justify-center mr-3">
                    ✓
                  </div>
                  <span className="text-gray-300">
                    Virtual whiteboard (coming soon)
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={
              isVisible.pricing ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Simple Pricing
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the plan that works best for you and your team. All plans
              include our core features.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                isVisible.pricing ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.7, delay: 0.1 }}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <div className="text-4xl font-bold mb-4">
                  $0<span className="text-lg text-gray-400">/mo</span>
                </div>
                <p className="text-gray-400 mb-6">Perfect for personal use</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center mr-3 mt-0.5">
                      ✓
                    </div>
                    <span className="text-gray-300">Up to 4 participants</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center mr-3 mt-0.5">
                      ✓
                    </div>
                    <span className="text-gray-300">
                      40-minute meeting limit
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center mr-3 mt-0.5">
                      ✓
                    </div>
                    <span className="text-gray-300">Basic video quality</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center mr-3 mt-0.5">
                      ✓
                    </div>
                    <span className="text-gray-300">Screen sharing</span>
                  </li>
                </ul>
              </div>
              <div className="px-8 pb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition duration-300"
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                isVisible.pricing ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl overflow-hidden shadow-xl transform scale-105 z-10"
            >
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 py-2 px-4">
                <p className="text-center font-semibold">MOST POPULAR</p>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <div className="text-4xl font-bold mb-4">
                  $9.99<span className="text-lg text-gray-300">/mo</span>
                </div>
                <p className="text-gray-300 mb-6">
                  For small teams and professionals
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-pink-600 flex items-center justify-center mr-3 mt-0.5">
                      ✓
                    </div>
                    <span className="text-gray-100">Up to 50 participants</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-pink-600 flex items-center justify-center mr-3 mt-0.5">
                      ✓
                    </div>
                    <span className="text-gray-100">
                      Unlimited meeting duration
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-pink-600 flex items-center justify-center mr-3 mt-0.5">
                      ✓
                    </div>
                    <span className="text-gray-100">HD video quality</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-pink-600 flex items-center justify-center mr-3 mt-0.5">
                      ✓
                    </div>
                    <span className="text-gray-100">
                      Cloud recording (10GB)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-pink-600 flex items-center justify-center mr-3 mt-0.5">
                      ✓
                    </div>
                    <span className="text-gray-100">Custom branding</span>
                  </li>
                </ul>
              </div>
              <div className="px-8 pb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-pink-600 hover:bg-pink-700 rounded-lg font-semibold transition duration-300"
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                isVisible.pricing ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.7, delay: 0.3 }}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Business</h3>
                <div className="text-4xl font-bold mb-4">
                  $19.99<span className="text-lg text-gray-400">/mo</span>
                </div>
                <p className="text-gray-400 mb-6">For large organizations</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center mr-3 mt-0.5">
                      ✓
                    </div>
                    <span className="text-gray-300">
                      Up to 250 participants
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center mr-3 mt-0.5">
                      ✓
                    </div>
                    <span className="text-gray-300">
                      Unlimited meeting duration
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center mr-3 mt-0.5">
                      ✓
                    </div>
                    <span className="text-gray-300">4K video quality</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center mr-3 mt-0.5">
                      ✓
                    </div>
                    <span className="text-gray-300">
                      Cloud recording (100GB)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center mr-3 mt-0.5">
                      ✓
                    </div>
                    <span className="text-gray-300">Admin dashboard & SSO</span>
                  </li>
                </ul>
              </div>
              <div className="px-8 pb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition duration-300"
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400">
              Need a custom solution for your enterprise?
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-8 py-3 bg-transparent border border-purple-500 hover:bg-purple-500/10 rounded-lg font-semibold transition duration-300"
            >
              Contact Sales
            </motion.button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={
              isVisible.contact ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have questions or need assistance? Our team is here to help you
              get started with PeerMeet.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={
                isVisible.contact
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -30 }
              }
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-purple-400">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center mr-4 flex-shrink-0">
                    <FaEnvelope className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Email Us</h4>
                    <p className="text-gray-300">hello@peermeet.com</p>
                    <p className="text-gray-400 mt-1">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center mr-4 flex-shrink-0">
                    <FaPhone className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Call Us</h4>
                    <p className="text-gray-300">+1 (555) 123-4567</p>
                    <p className="text-gray-400 mt-1">Mon-Fri, 9AM-5PM PT</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center mr-4 flex-shrink-0">
                    <FaMapMarkerAlt className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Visit Us</h4>
                    <p className="text-gray-300">123 Tech Street</p>
                    <p className="text-gray-300">San Francisco, CA 94107</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center hover:bg-purple-700 transition duration-300"
                    >
                      <FaTwitter className="text-white" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center hover:bg-purple-700 transition duration-300"
                    >
                      <FaFacebook className="text-white" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center hover:bg-purple-700 transition duration-300"
                    >
                      <FaInstagram className="text-white" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center hover:bg-purple-700 transition duration-300"
                    >
                      <FaLinkedin className="text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={
                isVisible.contact ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }
              }
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-pink-400">
                Send Us a Message
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold transition duration-300"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-pink-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Subscribe to our newsletter for the latest features, tips, and
              special offers.
            </p>
            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                className="flex-grow px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                placeholder="Your email address"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-r-lg font-semibold transition duration-300"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 pt-16 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div>
              <img src={logo} alt="Logo" className="w-32 mb-6" />
              <p className="text-gray-400 mb-6">
                Connecting people through simple, high-quality video
                experiences.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  <FaFacebook />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    Tutorials
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    API Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    Cookies Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    GDPR Compliance
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 mb-4 md:mb-0">
                © 2025 PeerMeet. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-gray-500 hover:text-white transition duration-300"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-white transition duration-300"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-white transition duration-300"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default Home;
