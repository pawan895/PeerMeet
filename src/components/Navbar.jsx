import React from 'react';
import homeIcon from '../assets/icons/homePage.png'
import AboutIcon from '../assets/icons/Info.png'
import ContactIcon from '../assets/icons/development.png'
const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-end ">
                    <div className='bg-gray-600 p-3 px-4 border rounded-2xl'>
                        <ul className="flex gap-2 space-x-4">
                            <li className='flex gap-1'>
                                <img src={homeIcon} alt="" className='w-6 h-6'/>
                                <a href="#" className="text-white">Home</a>
                            </li>
                            <li className='flex gap-1'>
                                <img src={AboutIcon} alt="" className='w-6 h-6'/>
                                <a href="#" className="text-white">About</a>
                            </li>
                            <li className='flex gap-1'>
                                <img src={ContactIcon} alt="" className='w-6 h-6'/>
                                <a href="https://pawandevelops.me" className="text-white">Who Built me?</a>
                            </li>

                        </ul>

                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
