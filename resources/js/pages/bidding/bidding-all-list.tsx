import UsersLayout from '@/layouts/users-layout'
import { Head, Link } from '@inertiajs/react'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useRef } from 'react'

//Initialization for Data Tables
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';

import 'datatables.net-buttons-dt/css/buttons.dataTables.min.css';
import 'datatables.net-buttons/js/dataTables.buttons.min';
import 'datatables.net-buttons/js/buttons.html5.min';
import 'datatables.net-buttons/js/buttons.print.min';
import 'datatables.net-buttons/js/buttons.colVis.min';
import 'datatables.net-fixedcolumns';
import 'jszip';
import 'pdfmake';


import Breadcrumbs from '@/components/custom-layout/breadcrumbs';
import { MdPersonAdd } from 'react-icons/md';
import HeaderTitle from '@/components/custom-layout/header-title';
import { FaPlus } from "react-icons/fa";


const BiddingAllList = () => {


    // DataTables Properties
	const tableRef = useRef<HTMLTableElement>(null);

	useEffect(() => {
		const table = $(tableRef.current!).DataTable({
			destroy: true,
			scrollX: true,
			scrollCollapse: true,
			fixedColumns: {
				leftColumns: 1,
				rightColumns: 1,
			},
            autoWidth: false,
            columnDefs: [
            {  targets: 0 },
            { width: '120px', targets: -1 },
            ],
			dom:    `<"flex flex-col gap-2 mb-2"
								<"flex justify-between items-center"<"dt-left-length"l>>
								<"flex justify-between items-center"<"dt-left-buttons flex gap-2"B><"dt-right-search"f>>
						>rtip`,
			buttons: ['copy', 'print'],
		});

		return () => {
			table.destroy(); // Clean up
		};
	}, []);



    return (
        <>
            <Head title='Bidding - All List '/>

            <UsersLayout>
                <div className="text-slate-700 ml-3 my-3">
                    <Breadcrumbs
                        items={[
                            { label: "Bid Events" },
                            { label: "All List", href: "/bidding/all-list", current: true },
                        ]}
                    />
                </div>

                <main className="flex-grow scroll-smooth mt-5 bg-white h-96 w-auto mx-3 rounded-md min-h-screen">
                    <HeaderTitle title="Bid Event - All List" description="Lists of Bid Events"/>
                    <hr />
                    <div className="p-4">

                        <Link href="/bidding/create" className='shadow-md bg-yellow-800 text-white px-3 py-2 rounded hover:bg-yellow-700 transition-colors mb-4 flex w-24  justify-center items-center cursor-pointer'>
                                <FaPlus className="inline-block size-3 mr-2" />
                                <span className='text-sm'>Create</span>
                        </Link>

                        <div className="p-4 shadow-md bg-gray-50 rounded-sm ">
                            <div className="overflow-x-auto w-full">

                                <table ref={tableRef} className="w-full table-fixed border-separate border border-gray-300 display" >
                                    
                                    <thead>
                                        <tr>
                                            <th className='w-16 th-header-class'></th>
                                            <th className='w-56 th-header-class'>Bid Event No.</th>
                                            <th className='w-56 th-header-class'>PR</th>
                                            <th className='w-56 th-header-class'>Status</th>
                                            <th className='w-56 th-header-class'>Abstract ID</th>
                                            <th className='w-56 th-header-class'>Requesting Site</th>
                                            <th className='w-56 th-header-class'>Buyer</th>
                                            <th className='w-56 th-header-class'>Bid Start Time</th>
                                            <th className='w-56 th-header-class'>Bid End Time</th>
                                            <th className='w-56 th-header-class'>Bid Needed Date</th>
                                            <th className='w-56 th-header-class'>PR Date</th>
                                            <th className='w-56 th-header-class'>PR Department</th>
                                            <th className='w-56 th-header-class'>PR Requestor</th>
                                            <th className='w-44 th-header-class'>PR Budget Year</th>
                                            <th className='w-28 th-header-class'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        

                                    </tbody>
                                </table>
                            </div>
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

export default BiddingAllList