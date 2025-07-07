import Breadcrumbs from '@/components/custom-layout/breadcrumbs'
import HeaderTitle from '@/components/custom-layout/header-title'
import UsersLayout from '@/layouts/users-layout'
import { Head, Link, usePage } from '@inertiajs/react'
import React, { ChangeEvent, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { GrFormPrevious } from 'react-icons/gr'
import { CgDetailsMore } from 'react-icons/cg'
import { CalendarDays, Send } from 'lucide-react'
import { IoIosArrowBack } from 'react-icons/io'


const BiddingCreate = () => {

      // Fetch DATA
    //const { bid_event_id } = usePage<{ bid_event_id: string }>().props;
    //const { old_buyers_lists } = usePage<{ old_buyers_lists: OldBuyers[] }>().props;

    const [formData, setFormData] = useState<{
        supplier_id: number | null;
        role_id: number | null;
    }>({
        supplier_id: null,
        role_id: null,
    });

    
    // Define form state
    type BiddingFormData = {

        // Personal / Account Details
        bid_event_id: string;
        office: string;
        date: Date;
        suffix: string;
        email: string;
        department: string;
        position: string;
        password: string;
        password_confirmation: string;
        roles: string;


    };

    const [biddingFormData, setBiddingFormData] = useState<BiddingFormData>({

        // Personal / Account Details
        bid_event_id: '',
        office: '',
        date: new Date(),
        suffix: '',
        email: '',
        department: '',
        position: '',
        password: '',
        password_confirmation: '',
        roles: 'Supplier',


    });


     // Handle input change
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBiddingFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // -- AUTO GENERATE FRONT END --
    //Today Date
    const today = new Date();
    const formattedDate =   [
                                String(today.getMonth() + 1).padStart(2, '0'),
                                String(today.getDate()).padStart(2, '0'),      
                                today.getFullYear()                            
                            ].join('/')
    // Bid Event ID
    const currentYear = today.getFullYear(); 
    const currentMonth = String(today.getMonth() + 1).padStart(2, '0');

    const bid_event_id = `${currentYear}${currentMonth}****`;


    return (
        <>
            <Head title='Bidding - All List '/>

            <UsersLayout>
                <div className="text-slate-700 ml-3 my-3">
                    <Breadcrumbs
                        items={[
                            { label: "Bid Events" },
                            { label: "All List", href: "/bidding/all-list" },
                            { label: "Create Bid Event", href: "/bidding/create", current: true },
                        ]}
                    />
                </div>

                <main className="flex-grow scroll-smooth mt-5 bg-white h-96 w-auto mx-3 rounded-md min-h-screen">
                    <HeaderTitle title="Bid Creation - Bid Event" description="Bid Event Creation"/>
                    <hr />
                    <div className="m-3">
                        <div className="button-back-with-icon-class">
                            <GrFormPrevious />
                            <Link href="/bidding/all-list" className='cursor-pointer'>Back</Link>
                        </div>
                        <div className="border-slate-300 border rounded shadow-md ">
                            <form>
                                <div className="my-5 ">

                                    <div className="w-auto p-3 m-4 rounded-sm bg-yellow-500 items-center">
                                        <div className="flex flex-col gap-2">

                                            <h1 className='text-xl font-bold text-center text-white'>Event Details: </h1>
                                        </div>
                                    </div>


                                    <div className="max-xl:w-auto mx-4 w-auto flex flex-col ">
                                        
                                        {/* <div className="flex my-2 gap-2 items-center">
                                            <div className="bg-yellow-700 p-2 shadow-md rounded">
                                                <CgDetailsMore className='text-white '/>
                                            </div>
                                            <div className="flex flex-col gap-2">

                                                <h1 className='text-xl font-bold text-slate-700'>Event Details: </h1>
                                            </div>
                                        </div> */}
                                    
                                        <div className="flex gap-5 mt-5 ">
                                            <div className="flex flex-col w-full">
                                                <label htmlFor="first_name" className='label-bidding-class'>Bid Event ID <span className='text-red-500'>*</span></label>
                                                <input
                                                    type="text"
                                                    id="bid_event_id"
                                                    name="first_name"
                                                    className='input-field-bidding-class '
                                                    disabled={true}
                                                    value={bid_event_id}
                                                    //onChange={handleChange}
                                                />
                                            </div>

                                            <div className="flex flex-col w-6xl">
                                                <label htmlFor="first_name" className='label-bidding-class'>Requesting Site: <span className='text-red-500'>*</span></label>
                                                <select
                                                    value={biddingFormData.office}
                                                    onChange={handleChange}
                                                    name="office"
                                                    className="input-field-bidding-class"
                                                >
                                                    <option value="">- Office -</option>
                                                    <option value="padcal">Padcal</option>
                                                    <option value="head office">Head Office</option>
                                                </select>
                                            </div>

                                            <div className="flex flex-col w-full">
                                                <label htmlFor="date" className='label-bidding-class'>Date: <span className='text-red-500'>*</span></label>
                                               <div className="relative w-full">
                                                    <CalendarDays className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />

                                                    <input
                                                    type="text"
                                                    id="date"
                                                    name="date"
                                                    className="input-field-bidding-class pl-10"
                                                    disabled={true}
                                                    value={formattedDate}
                                                    // onChange={handleChange}
                                                    />

                                                </div>
                                            </div>

                                            <div className="flex flex-col w-full">
                                                <label htmlFor="abstract_id" className='label-bidding-class'>Abstract Number: <span className='text-red-500'>*</span></label>
                                                <select
                                                    value={biddingFormData.office}
                                                    onChange={handleChange}
                                                    name="abstract_id"
                                                    className="input-field-bidding-class"
                                                >
                                                    <option value="">- Select -</option>
                                                    <option value="padcal">Padcal</option>
                                                    <option value="head office">Head Office</option>
                                                </select>
                                            </div>

                                            <div className="flex flex-col w-full">
                                                <label htmlFor="date" className='label-bidding-class'>PR Number: <span className='text-red-500'>*</span></label>
                                                <input
                                                    type="text"
                                                    id="pr_number"
                                                    name="pr_number"
                                                    className='input-field-bidding-class '
                                                    disabled={true}
                                                    value={formattedDate}
                                                    //onChange={handleChange}
                                                />
                                            </div>

                                        </div>
                                    </div>


                                    <div className='flex gap-5 mx-4 items-center justify-between mt-10 mb-3'>
                                       
                                        <button type="submit" className="bg-yellow-800 hover:bg-yellow-700 transition-colors text-white px-4 text-sm py-2 rounded cursor-pointer">
                                            <Send className='inline-block size-3 mr-2'/>
                                            Create
                                        </button>

                                    </div>



                                 </div>


                            </form>
                            
                        </div>
                    </div>
                </main>


                {/* Modal for User Employee deletion */}

                {/* {showDeleteModal && (
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50"
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="bg-white p-6 rounded-sm shadow-lg w-96"
                            >
                                <h2 className="text-lg font-semibold mb-2">Confirm Delete</h2>
                                <hr />
                                <p className="mb-1 mt-2 text-sm">Are you sure you want to delete this user?</p>
                                <p className='text-sm mb-5 mt-1'>Supplier Name: <span className='text-sm font-bold'>{userFullName}</span></p>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        className="px-4 py-2 cursor-pointer transition-colors bg-gray-200 text-sm rounded hover:bg-gray-300"
                                        onClick={() => setShowDeleteModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-4 py-2 cursor-pointer transition-colors bg-red-500 text-sm text-white rounded hover:bg-red-600"
                                        onClick={async () => {
                                            if (userToDelete !== null) {
                                                await handleUserDelete(userToDelete);
                                            }

                                            setShowDeleteModal(false);
                                            setUserToDelete(null);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence> 
                )}*/}

            </UsersLayout>

        </>
    )
}

export default BiddingCreate