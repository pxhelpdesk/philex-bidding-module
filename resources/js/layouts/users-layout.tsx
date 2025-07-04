import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { PropsWithChildren } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import axios from 'axios';

import '../../css/datatable-app.css';

// Components
import { Link, usePage } from '@inertiajs/react';
import { toast, ToastContainer } from 'react-toastify';

// Icons
import { IoPieChartSharp } from "react-icons/io5";
import { FaHome, FaSignOutAlt, FaRegCheckCircle, FaRegCheckSquare, FaList, FaUserCircle, FaCodeBranch } from "react-icons/fa";
import { PiSquaresFourFill } from "react-icons/pi";

import { LuUser } from "react-icons/lu";
import { RiAuctionFill } from "react-icons/ri";
import { TbLayoutList } from "react-icons/tb";
import { IoIosNotifications } from "react-icons/io";
import { GrHide } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { Contact, Forklift, ShieldAlert, ShieldPlus }  from 'lucide-react';
import { MdDashboard } from "react-icons/md";

import PhilexLogo from '../../../public/files/header/PX_Logo.png';


export default function UsersLayout({ children }: PropsWithChildren) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isNotifDropdownOpen, setNotifDropdownOpen] = useState(false);

    const dummyNotifications = [
        { id: 1, message: "You have a new appointment scheduled.", date: "Feb 27, 2025" },
        { id: 2, message: "Your profile was updated successfully.", date: "Feb 26, 2025" },
        { id: 3, message: "New visitor check-in completed.", date: "Feb 25, 2025" },
    ];

    const { url } = usePage();

    useEffect(() => {
        if (url.startsWith("/users")) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [url]);

    const { auth } = usePage().props as any;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [changelogEntries, setChangelogEntries] = useState<
        { title: string; description: string; date: string }[]
    >([]);

    const openModal = () => {
        setChangelogEntries([
            {
                title: "Maintenance",
                description: "This update includes new features, bug fixes, and UI enhancements.",
                date: "February 26, 2025",
            },
            {
                title: "Security Update",
                description: "Improved authentication mechanisms and fixed security vulnerabilities.",
                date: "February 10, 2025",
            },
            {
                title: "Performance Improvements",
                description: "Optimized database queries and reduced page load times.",
                date: "January 30, 2025",
            },
        ]);
        setIsModalOpen(true);
    };

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [closeMenuSelections, setCloseMenuSelections] = useState(false);

    //Hook for Sidebar Collapse - Local Storage
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('sidebar-collapsed');
        if (stored !== null) {
            setCollapsed(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('sidebar-collapsed', JSON.stringify(collapsed));
    }, [collapsed]);


    // Handle Logout
    const handleLogout = async () => {
        try {
            
            const token = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute('content');

            await axios.post('http://172.17.1.237:4020/logout', {}, {
                headers: {
                    'X-CSRF-TOKEN': token!,
                    'Accept': 'application/json',
                },
                withCredentials: true,
            });

            // Manually redirect to the login page on 4010
           window.location.href = 'http://172.17.1.237:4010/login';


           // optional, Laravel will redirect anyway
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <nav className="fixed top-0 left-0 w-full bg-slate-100">
                <div className=" bg-green-900 z-50 overflow-hidden order-1 flex flex-row items-center justify-between md:hidden px-10">

                    <a href="http://172.17.1.237:4010/dashboard-modules" className="flex m-2 cursor-pointer items-center gap-3">
                        <img src={PhilexLogo} alt="SMMCI Logo" className="size-8 w-auto" />
                        {!collapsed && (
                            <h1 className="text-white font-bold text-base ml-2 transition-all">Philex Web Portal</h1>
                        )}
                    </a>

                    <button onClick={() => setCloseMenuSelections(!closeMenuSelections)} >
                        <GiHamburgerMenu className="size-7 m-2 p-1 radius border rounded-md text-white " />
                    </button>
                </div>

                <div className={`${sidebarOpen ? "ml-0" : "ml-3"} bg-yellow-50/70 border-gray-200 order-2 md:block text-black`}>

                    <div className={` ${ collapsed ?  sidebarOpen ? "ml-0" : "ml-20" : sidebarOpen ? "ml-0" : "ml-64" }  bg-slate-100 ${sidebarOpen ? "" : "rounded-l-lg"} shadow-sm max-md:ml-0 items-center mx-auto transition-all duration-300`}>
                        <div className={`w-full  md:w-auto" `} id="navbar-multi-level">
                            <div className={`flex flex-row font-medium p-2 gap-5 ${sidebarOpen ? "" : "rounded-l-lg"} justify-between max-md:justify-self-end rtl:space-x-reverse md:bg-white`}>
                                <div className='flex flex-row gap-3 max-md:hidden'>

                                    {!sidebarOpen && (
                                        <>
                                            <button
                                                onClick={() => setCollapsed(!collapsed)}
                                                className={`w-full z-50 bg-slate-400 text-white p-2 rounded-sm shadow-md transition cursor-pointer`}
                                                >
                                                <GiHamburgerMenu className={`transition-all ${collapsed ? "rotate-90" : "rotate-180"}`} />
                                            </button>
                                        </>
                                    )}

                                    <button
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    className={`w-full z-50 bg-slate-400 text-white p-2 rounded-sm shadow-md transition cursor-pointer`}
                                    >
                                        <GrHide
                                        className={`text-white ${!sidebarOpen ? "text-green-900" : "text-white" }`}
                                        />
                                    </button>
                                </div>

                                <div className='mr-20 max-md:mr-0'>
                                    <div className="flex gap-4">

                                        {/* Notification Bell with Dropdown */}
                                        <div className="relative">
                                            <button
                                                onClick={() => setNotifDropdownOpen(!isNotifDropdownOpen)}
                                                className="relative block py-1 px-3 text-white  rounded-sm md:bg-transparent cursor-pointer md:text-blue-700 md:p-0"
                                                aria-current="page"
                                            >
                                                <motion.div
                                                    whileHover={{
                                                        rotate: [0, -10, 10, -10, 10, 0],
                                                        transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse" },
                                                    }}
                                                >
                                                    <IoIosNotifications className="size-6 text-yellow-600" />
                                                </motion.div>
                                                {/* Red Dot Indicator */}
                                                <span className="absolute top-0 right-0 inline-block w-1.5 h-1.5 bg-red-600 rounded-full "></span>
                                            </button>

                                            {isNotifDropdownOpen && (
                                                <div
                                                    className="absolute right-0 max-md:-right-20 mt-2 w-64 bg-white rounded-md shadow-lg  border-4 border-transparent"
                                                    style={{
                                                        background: "white",
                                                        borderImage: "linear-gradient(90deg, #034921, #038c4c) 1",
                                                        borderImageSlice: 1,
                                                    }}
                                                >
                                                    <div className="py-2">
                                                        {dummyNotifications.map((notification) => (
                                                            <div key={notification.id} className="px-4 py-2 border-b border-gray-200 last:border-b-0">
                                                                <div className="text-sm text-gray-700">{notification.message}</div>
                                                                <div className="text-xs text-gray-400">{notification.date}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Users Tab */}
                                        <div className='flex '>
                                            <div className="relative items-center flex ">
                                                <FaUserCircle className='size-7 md:mr-2 text-zinc-700'/>
                                                <button
                                                    type="button"
                                                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                                                    className="flex flex-row items-center cursor-pointer justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-900 md:p-0"
                                                >
                                                    <span className='text-sm'>{auth.user.first_name} {auth.user.last_name}</span>
                                                    <svg
                                                        className={`w-3 h-3 ml-2 transform transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 10 6"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="m1 1 4 4 4-4"
                                                        />
                                                    </svg>
                                                </button>

                                                {isDropdownOpen && (
                                                    <div className="absolute -left-9 top-10 z-10 font-normal bg-white divide-y divide-gray-100 border border-zinc-100 rounded-sm shadow-sm w-44">
                                                        <div className="py-1">
                                                            <button
                                                                onClick={handleLogout}
                                                                className="w-full px-4 py-1 flex gap-2 items-center text-xs text-gray-700 hover:bg-gray-100 cursor-pointer"
                                                                >
                                                                <FaSignOutAlt className="size-4 text-red-700" />
                                                                <span className="text-red-700">LOGOUT</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <aside
                id="logo-sidebar"
                className={` top-0 left-0 z-50 h-screen bg-slate-50 shadow-md border-r border-gray-100 transition-all duration-300 flex-row max-md:hidden  ${sidebarOpen ? "hidden" : "fixed"} ${
                    collapsed ? "w-20" : "w-64"
                }`}

                aria-label="Sidebar"
            >
                <a href="http://172.17.1.237:4010/dashboard-modules"  className="flex mx-auto py-3 justify-center items-center gap-2">
                        <img src={PhilexLogo} alt="SMMCI Logo" className={`w-auto ${collapsed ? 'size-8' : 'size-10'}`} />
                        {!collapsed && (
                        <h1 className=" font-bold text-base ml-2 transition-all text-slate-700">Philex Web Portal</h1>
                    )}
                </a>

                <div className="h-full px-3 pb-4 overflow-y-auto bg-slate-50 shadow-md">
                    <ul className="space-y-2 font-medium">
                        <hr className='bg-slate-300 border-0 h-[1px]' />

                        {/* Dashboard Module Tab */}
                        <li>
                            {/* href="https://portal.silanganmining.com.ph" */}
                            <a href="http://172.17.1.237:4010/dashboard-modules" className="flex items-center px-2 py-1 rounded-xs hover:bg-slate-200/50  transition-colors group">
                                <PiSquaresFourFill className='size-5 icon-color' />
                                {!collapsed && <span className="ml-3 text-sm py-1 text-color-selections">Modules</span>}
                            </a>
                        </li>

                        <hr className='bg-slate-300 border-0 h-[1px] ' />

                        {/* Bid Event Tab */}

                        <li>
                    
                            <Link href={route("bidding.dashboard")} className="flex items-center px-2 py-1 rounded-xs hover:bg-slate-200/50  transition-colors group">
                                <FaHome className='size-5 icon-color' />
                                {!collapsed && <span className="ml-3 text-sm py-1 text-color-selections">Dashboard</span>}
                            </Link>
                            
                        </li>

                        <li>
                            <button
                                type="button"
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex items-center w-full p-2 text-base  duration-200 rounded-xs group hover:bg-slate-200/50 transition-all cursor-pointer"
                                aria-controls="dropdown-example"
                                aria-expanded={isOpen}
                            >
                                <RiAuctionFill className="size-5 icon-color" />

                                {!collapsed && (
                                    <>
                                        <span className="flex-1 ms-3 text-left text-sm rtl:text-right whitespace-nowrap text-color-selections">Bid Events</span>
                                        <svg
                                            className={`w-2.5 h-2.5 transform transition-transform duration-300 mr-2 ${isOpen ? "rotate-180" : ""}`}
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 10 6"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 1 4 4 4-4"
                                            />
                                        </svg>
                                    </>
                                )}
                            </button>

                            {/* Smooth Dropdown */}
                            <ul
                                id="dropdown-example" className={`overflow-hidden transition-all duration-300 ease-in-out text-sm ${isOpen ? "max-h-full opacity-100" : "max-h-0 opacity-0"}`}
                            >

                                <li>
                                    <Link
                                        href={route("bidding.all-list")}
                                        className={`flex items-center  p-2 my-2 w-full text-color-selections transition duration-75 rounded-xs ${ collapsed ? "pl-5" : "pl-11"} group ${
                                            route().current("bidding.all-list")
                                            ? "bg-slate-200 "
                                            : " hover:bg-slate-200/50"
                                        }`}
                                    >
                                        <FaList  className="size-4 icon-color" />
                                        {!collapsed && <span className="ms-3 text-sm">All List</span>}
                                    </Link>
                                </li>

                                {/* <li>
                                    <Link
                                        href={route("user.suppliers.allList")}
                                        className={`flex items-center w-full p-2 my-2 text-color-selections transition duration-75 rounded-xs ${ collapsed ? "pl-5" : "pl-11"} group ${
                                            route().current("user.suppliers.dashboard")
                                            ? "bg-slate-200 "
                                            : " hover:bg-slate-200/50"
                                        }`}
                                    >
                                        <Forklift className="size-5 icon-color" />
                                        {!collapsed && <span className="ms-3 text-sm">Suppliers</span>}
                                    </Link>
                                </li> */}

                              

                            </ul>
                        </li>
                    </ul>

                    {/* Changelog Button */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-5">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            animate={{
                                scale: [1, 1.1, 1],
                                boxShadow: [
                                    "0 0 0px rgba(255, 193, 7, 0.4)",
                                    "0 0 10px rgba(255, 193, 7, 0.6)",
                                    "0 0 0px rgba(255, 193, 7, 0.4)",
                                ],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                            onClick={openModal}
                            className="text-center bg-yellow-300 shadow-md px-3 py-1 rounded text-sm flex items-center hover:bg-yellow-400 transition-all duration-200 cursor-pointer"
                        >
                            { !collapsed &&  <span>v2.0.</span>}
                            <FaCodeBranch className="size-3 ml-1" />
                        </motion.button>
                    </div>
                </div>
            </aside>


            {/* -------------------------------------------------------------------------------------------------------------------------------- */}
            {/* Selections for Mobile / Tablet Resolution */}
            <div className={`fixed top-0 left-0 w-full h-auto bg-green-900 z-50 overflow-y-auto flex flex-col items-center justify-between md:hidden px-5 ${closeMenuSelections ? "hidden" : ""} `}>
                <div className="flex flex-row gap-7 justify-between items-center">
                    <div className="flex flex-row justify-between py-5 items-center gap-3">
                        {/* <img src={fileSMMCILogo} alt="SMMCI Logo" className="size-10 w-auto" /> */}
                        <h1 className="text-white font-bold text-base ml-2 transition-all">Silangan Web Portal</h1>
                    </div>

                    <button onClick={() => setCloseMenuSelections(!closeMenuSelections)} className='block absolute right-5 top-3 bg-green-700 rounded border border-green-950'>
                        <IoMdClose className={`text-white size-7 ${!closeMenuSelections ? "block" : "hidden"}`} />
                    </button>
                </div>

                <div className="w-full">
                    <ul className="space-y-2 font-medium">
                        <hr className='bg-green-950 border-0 h-0.5' />

                        {/* Home Tab */}
                        <li>
                            {/* href="https://portal.silanganmining.com.ph" */}
                            <a href="/" className="flex items-center p-2 text-white rounded-md hover:bg-green-800 group">
                            <FaHome className='size-5' />
                                <span className="ml-3">Dashboard</span>
                            </a>
                        </li>
                        <hr className='bg-green-950 border-0 h-0.5' />

                        {/* Visitor Tab */}
                        <li>
                            <button
                                type="button"
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex items-center w-full p-2 text-base text-white transition duration-200 rounded-md group hover:bg-green-900"
                                aria-controls="dropdown-example"
                                aria-expanded={isOpen}
                            >
                                <LuUser className="size-5" />

                                <>
                                    <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Visitor</span>
                                    <svg
                                        className={`w-3 h-3 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 10 6"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 4 4 4-4"
                                        />
                                    </svg>
                                </>
                            </button>

                            {/* Smooth Dropdown */}
                            <ul
                                id="dropdown-example" className={`overflow-hidden transition-all duration-300 ease-in-out text-sm ${isOpen ? "max-h-full opacity-100" : "max-h-0 opacity-0"}`}
                            >

                                <li>
                                    <Link
                                        href={route("bidding.all-list")}
                                        className={`flex items-center  p-2 my-2 w-full text-color-selections transition duration-75 rounded-xs ${ collapsed ? "pl-5" : "pl-11"} group ${
                                            route().current("bidding.all-list")
                                            ? "bg-slate-200 "
                                            : " hover:bg-slate-200/50"
                                        }`}
                                    >
                                        <Contact  className="size-5 icon-color" />
                                        {!collapsed && <span className="ms-3 text-sm">All List</span>}
                                    </Link>
                                </li>
                                
                            </ul>
                        </li>
                    </ul>
                    <hr className='bg-green-950 border-0 h-0.5' />
                    <div className="my-5 flex justify-center">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            animate={{
                                scale: [1, 1.1, 1],
                                boxShadow: [
                                    "0 0 0px rgba(255, 193, 7, 0.4)",
                                    "0 0 10px rgba(255, 193, 7, 0.6)",
                                    "0 0 0px rgba(255, 193, 7, 0.4)",
                                ],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                            onClick={openModal}
                            className="text-center bg-yellow-300 shadow-md px-4 py-2 rounded text-sm flex items-center hover:bg-yellow-400 transition-all duration-200"
                        >
                            { !collapsed &&  <span>v2.0.</span>}
                            <FaCodeBranch className="size-3 ml-1" />
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Changelog Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 ">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 100, damping: 10 }}
                        className="bg-white shadow-lg w-[45rem] max-md:w-96 p-4 rounded border-transparent"
                        style={{
                            background: "white",
                            borderImage: "linear-gradient(90deg, #034921, #038c4c) 1",
                            borderImageSlice: 1,
                        }}
                    >
                        <h2 className="text-xl font-semibold mb-2">Changelog</h2>
                        <hr />
                        <div className="space-y-4">
                            {changelogEntries.map((entry, index) => (
                                <div key={index} className="p-3 border-b last:border-b-0">
                                    <h3 className="text-lg font-semibold">{entry.title}</h3>
                                    <p className="text-gray-500 text-sm">{entry.date}</p>
                                    <p className="text-gray-700">{entry.description}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end mt-4">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsModalOpen(false)}
                                className="text-white px-4 py-2 rounded transition"
                                style={{ backgroundColor: "#8B0000" }}
                            >
                                Close
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Content Body */}
            <div className="">

                <div className={`${collapsed ? sidebarOpen ? "ml-0" : "ml-20" : sidebarOpen ? "ml-0" : "ml-64 "} transition-all duration-300 max-md:ml-0 `}>
                    <div className="flex-grow scroll-smooth mt-12 bg-yellow-50/70 py-3">
                        {children}
                    </div>
                </div>
            </div>


            {/* Toast */}
            <ToastContainer />

        </div>
    )
}
