import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import homeIcon from '../assets/icons/homePage.png';
import AboutIcon from '../assets/icons/Info.png';
import ContactIcon from '../assets/icons/development.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { to: "/", icon: homeIcon, text: "Home" },
        { to: "/about", icon: AboutIcon, text: "About" },
        { href: "https://pawandevelops.me", icon: ContactIcon, text: "Who Built Me?" },
    ];

    const variants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: "-100%" },
    };

    return (
        <nav className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 shadow-lg rounded-full px-8 broder ">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    
                    <div className="hidden md:block">
                        <NavItems items={navItems} />
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white focus:outline-none"
                        >
                            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                                ) : (
                                    <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <motion.div
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={variants}
                transition={{ duration: 0.3 }}
                className="md:hidden"
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <NavItems items={navItems} mobile />
                </div>
            </motion.div>
        </nav>
    );
};

const NavItems = ({ items, mobile }) => (
    <ul className={`flex ${mobile ? 'flex-col' : 'space-x-4'}`}>
        {items.map((item, index) => (
            <motion.li
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center"
            >
                {item.to ? (
                    <Link to={item.to} className="flex items-center text-gray-300 hover:text-white transition duration-300">
                        <img src={item.icon} alt="" className="w-5 h-5 mr-2" />
                        <span>{item.text}</span>
                    </Link>
                ) : (
                    <a href={item.href} className="flex items-center text-gray-300 hover:text-white transition duration-300">
                        <img src={item.icon} alt="" className="w-5 h-5 mr-2" />
                        <span>{item.text}</span>
                    </a>
                )}
            </motion.li>
        ))}
    </ul>
);

export default Navbar;