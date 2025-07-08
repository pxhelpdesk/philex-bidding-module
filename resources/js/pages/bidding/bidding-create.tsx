// Miscellaneous imports
import { Head, Link, usePage } from '@inertiajs/react'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import axios from 'axios'

// Icons
import { FaPlus } from 'react-icons/fa'
import { GrFormPrevious } from 'react-icons/gr'
import { CgDetailsMore } from 'react-icons/cg'
import { CalendarDays, Send } from 'lucide-react'
import { IoIosArrowBack } from 'react-icons/io'

//Components
import AsyncSelect from 'react-select/async';

//Layouts
import Breadcrumbs from '@/components/custom-layout/breadcrumbs'
import HeaderTitle from '@/components/custom-layout/header-title'
import UsersLayout from '@/layouts/users-layout'

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


// Type Definitions
type BidItemLists = {

}

type SupplierLists = {

}

type AbstractOption = {
    value: string;
    label: string;
    data: AbstractDataFetched;
    // pr_number: string;
    // rfq_number: string;

    // pr_department_code: string;
    // pr_requestor_name: string;
    // pr_date: string;
    // pr_budget_year: string;

    // bid_items: BidItemLists[];

    // supplier_lists: SupplierLists[];
}

type AbstractHO = {
    rfq_number: string;
    pr_number: string;
};

type AbstractPadcal ={


}

type AbstractDataFetched = {
  PRE_NUM: string;
  RFQ_NUM: string;
  SUP_NAM: string;
  PHN_ONE?: string;
};




const BiddingCreate = () => {

    // Fetch DATA
    //const { bid_event_id } = usePage<{ bid_pr_number: string }>().props;
    //const { old_buyers_lists } = usePage<{ old_buyers_lists: OldBuyers[] }>().props;
    //const { supplier } = usePage<{ : UserDType }>().props;

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




     // Handle input change
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBiddingFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Fetch Abstract Data API
    const [selectedAbstractHO, setSelectedAbstractHO] = useState<AbstractDataFetched | null>(null);
    const [selectedAbstractPadcal, setSelectedAbstractPadacl] = useState<AbstractPadcal | null>(null);

    const fetchAbstract = async (inputValue: string): Promise<AbstractOption[]> => {

        console.log(inputValue)

        const response = await axios.get(`/bidding/api/create-search-abstract?q=${inputValue}`);
        // Assuming response.data is an array of abstract objects with id and name

        console.log(response.data);

        return response.data.map((abstract: AbstractDataFetched) => ({
            
            value: abstract.RFQ_NUM,
            label: abstract.RFQ_NUM,
            data: abstract
            // abstract_id: abstract.RFQ_NUM, // Assuming PRE_NUM is the abstract ID
            // pr_number: abstract.PRE_NUM,

            // pr_department_code: string;
            // pr_requestor_name: string;
            // pr_date: string;
            // pr_budget_year: string;

            // bid_items: BidItemLists[];

            // supplier_lists: SupplierLists[];

        }));
    };

    // -- AUTO GENERATE FRONT END --
    //Today Date
    const today = new Date();
    const formattedDate =   [
                                String(today.getMonth() + 1).padStart(2, '0'),
                                String(today.getDate()).padStart(2, '0'),      
                                today.getFullYear()  

                            ].join('/');

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

                                    <div className="header-background-label-class">
                                        <div className="flex flex-col gap-2">

                                            <h1 className='header-title-label-class'>EVENT DETAILS</h1>
                                        </div>
                                    </div>


                                    <div className="max-xl:w-auto mx-4 w-auto ">
                                        
                                        <div className="flex flex-row gap-5">

                                            <div className="w-1/2 ">
                                                <div className="my-3 flex flex-row gap-5">
                                                    <div className="flex flex-col w-full">
                                                        <label htmlFor="first_name" className='label-bidding-class'>Bid Event ID <span className='text-red-500'>*</span></label>
                                                        <input
                                                            type="text"
                                                            id="bid_event_id"
                                                            name="bid_event_id"
                                                            className='input-field-bidding-class '
                                                            disabled={true}
                                                            value={bid_event_id}
                                                            //onChange={handleChange}
                                                        />
                                                    </div>

                                                    <div className="flex flex-col w-full">
                                                        <label htmlFor="office" className='label-bidding-class'>Requesting Site: <span className='text-red-500'>*</span></label>
                                                        <select
                                                            value={biddingFormData.office}
                                                            onChange={handleChange}
                                                            id="office"
                                                            name="office"
                                                            defaultValue={0}
                                                            className="input-field-bidding-class"
                                                        >
                                                            <option value="0" disabled>- Office -</option>
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
                                                </div>
                                            </div>
                                            
                                            <div className="w-1/2">

                                                <div className="my-3 flex flex-row gap-5 ">
                                                    
                                                    <div className="flex flex-col w-full">
                                                        <label htmlFor="abstract_id" className='label-bidding-class'>Abstract Number: <span className='text-red-500'>*</span></label>
                                                        <AsyncSelect
                                                            cacheOptions
                                                            defaultOptions
                                                            loadOptions={fetchAbstract}
                                                            value={
                                                                selectedAbstractHO
                                                                    ? {
                                                                        value: selectedAbstractHO.RFQ_NUM,
                                                                        label: selectedAbstractHO.RFQ_NUM,
                                                                        data: selectedAbstractHO
                                                                    }
                                                                    : null
                                                            }
                                                            onChange={(selectedOption: AbstractOption | null) => {
                                                                setSelectedAbstractHO(
                                                                    selectedOption?.data ?? null
                                                                );
                                                            }}

                                                            placeholder="Search Abstract..."
                                                            classNames={{
                                                                control: () =>
                                                                    'border border-gray-300 rounded-xs px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-auto',
                                                                menu: () => 'text-sm z-50',
                                                                option: ({ isFocused }) =>
                                                                    `px-3  cursor-pointer ${isFocused ? 'bg-yellow-100' : ''}`,
                                                                singleValue: () => 'text-gray-800',
                                                                input: () => 'text-sm',
                                                            }}
                                                            styles={{
                                                                control: (base) => ({
                                                                    ...base,
                                                                    minHeight: '33px', // default is ~38px; change this to your desired height
                                                                    height: '20px', // set your custom height
                                                                }),
                                                                valueContainer: (base) => ({
                                                                    ...base,
                                                                    height: '20px',
                                                                    padding: '0px',
                                                                }),
                                                                input: (base) => ({
                                                                    ...base,
                                                                    margin: 0,
                                                                    padding: 0,
                                                                }),
                                                            }}

                                                        />

                                                        {/* <select
                                                            value={biddingFormData.office}
                                                            onChange={handleChange}
                                                            name="abstract_id"
                                                            className="input-field-bidding-class"
                                                        >
                                                            <option value="">- Select -</option>
                                                            <option value="padcal">Padcal</option>
                                                            <option value="head office">Head Office</option>
                                                        </select> */}
                                                        
                                                    </div>

                                                    <div className="flex flex-col w-full">
                                                        <label htmlFor="date" className='label-bidding-class'>PR Number: <span className='text-red-500'>*</span></label>
                                                        <input
                                                            type="text"
                                                            id="pr_number"
                                                            name="pr_number"
                                                            className='input-field-bidding-class '
                                                            disabled={true}
                                                            //onChange={handleChange}
                                                        />
                                                    </div>

                                                </div>
                                            </div>

                                        </div>


                                        <div className="flex flex-row gap-5">

                                            <div className="my-3 w-1/2">
                                                <div className="flex flex-col w-full">
                                                    <label htmlFor="bid_description" className='label-bidding-class'>Bid Description: <span className='text-red-500'>*</span></label>
                                                    <textarea
                                                        id="bid_description"
                                                        name="bid_description"
                                                        className='textarea-field-bidding-class'
                                                        rows={6}
                                                        //onChange={handleChange}
                                                    ></textarea>
                                                </div>
                                            </div>

                                            <div className="my-3 w-1/2">
                                                <div className="flex flex-row gap-5">

                                                    <div className="flex flex-col w-full">
                                                        <label htmlFor="first_name" className='label-bidding-class'>Status:</label>
                                                        <input
                                                            type="text"
                                                            id="bid_event_id"
                                                            name="bid_event_id"
                                                            className='input-field-bidding-class '
                                                            disabled={true}
                                                            value="DRAFT"
                                                            //onChange={handleChange}
                                                        />
                                                    </div>

                                                    <div className="flex flex-col w-full">
                                                        <label htmlFor="date" className='label-bidding-class'>Bid Needed by End User: <span className='text-red-500'>*</span></label>
                                                        <input
                                                            type="date"
                                                            id="bid_needed_date"
                                                            name="bid_needed_date"
                                                            className='input-field-bidding-class'
                                                            value={formattedDate}
                                                            //onChange={handleChange}
                                                        />
                                                    </div>
                                                    
                                                </div>
                                            </div>

                                        </div>
                                     
                                        <div className="flex flex-row gap-5">

                                            <div className="my-3 w-1/2 ">
                                                <div className="flex flex-col w-full">
                                                    <label htmlFor="bid_remarks" className='label-bidding-class'>Bid Remarks: <span className='text-red-500'>*</span></label>
                                                    <textarea
                                                        id="bid_remarks"
                                                        name="bid_remarks"
                                                        className='textarea-field-bidding-class'
                                                        rows={3}
                                                        //onChange={handleChange}
                                                    ></textarea>
                                                </div>
                                            </div>

                                            <div className="my-3 w-1/2">
                                                <div className="flex flex-row gap-5">

                                                    <div className="flex flex-col w-full">
                                                        <label htmlFor="first_name" className='label-bidding-class'>Bid Start Date:</label>
                                                        <input
                                                            type="date"
                                                            id="bid_start_date"
                                                            name="bid_start_date"
                                                            className='input-field-bidding-class '
                                                            //onChange={handleChange}
                                                        />
                                                    </div>

                                                    <div className="flex flex-col w-full">
                                                        <label htmlFor="date" className='label-bidding-class'>Bid End Date: <span className='text-red-500'>*</span></label>
                                                        <input
                                                            type="date"
                                                            id="bid_end_date"
                                                            name="bid_end_date"
                                                            className='input-field-bidding-class'
                                                            value={formattedDate}
                                                            //onChange={handleChange}
                                                        />
                                                    </div>
                                                    
                                                </div>
                                            </div>

                                        </div>

                                    </div>


                                    <div className="header-background-label-class">
                                        <div className="flex flex-col gap-2">

                                            <h1 className='header-title-label-class'>PR DETAILS</h1>
                                        </div>
                                    </div>


                                    <div className="max-xl:w-auto mx-4 w-auto">
                                        <div className="flex flex-row gap-5">

                                            <div className="w-full">
                                                <div className="my-3 flex flex-row gap-5">
                                                    <div className="flex flex-col w-full">
                                                        <label htmlFor="first_name" className='label-bidding-class'>Department Code:<span className='text-red-500'>*</span></label>
                                                        <input
                                                            type="text"
                                                            id="bid_event_id"
                                                            name="bid_event_id"
                                                            className='input-field-bidding-class '
                                                            disabled={true}
                                                            value={bid_event_id}
                                                            //onChange={handleChange}
                                                        />
                                                    </div>

                                                    <div className="flex flex-col w-full">
                                                        <label htmlFor="office" className='label-bidding-class'>Requestor:<span className='text-red-500'>*</span></label>
                                                        <input
                                                            type="text"
                                                            id="bid_event_id"
                                                            name="bid_event_id"
                                                            className='input-field-bidding-class '
                                                            disabled={true}
                                                            value={bid_event_id}
                                                            //onChange={handleChange}
                                                        />
                                                    </div>

                                                    <div className="flex flex-col w-full">
                                                        <label htmlFor="date" className='label-bidding-class'>Purchase Requesition Date: <span className='text-red-500'>*</span></label>
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
                                                        <label htmlFor="date" className='label-bidding-class'>Budget Year: <span className='text-red-500'>*</span></label>
                                                         <input
                                                            type="text"
                                                            id="bid_event_id"
                                                            name="bid_event_id"
                                                            className='input-field-bidding-class '
                                                            disabled={true}
                                                            value={'2005'}
                                                            //onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>                    
                                    </div>


                                    <div className="header-background-label-class">
                                        <div className="flex flex-col gap-2">

                                            <h1 className='header-title-label-class'>BID DETAILS</h1>
                                        </div>
                                    </div>

                                    <div className="max-xl:w-auto mx-4 w-auto">
                                        <div className="bg-white rounded-sm border-gray-300 py-5 border px-4">
                                            
                                            <h1 className='uppercase font-bold text-center mb-5 text-gray-600'>Bid Items</h1>
                                            <div className="overflow-x-auto w-full">
                                                <table className='w-full table-fixed border-separate border border-gray-300 display'>
                                                    <thead>
                                                        <tr>
                                                            <th className='w-32 th-header-class'>Item No.</th>
                                                            <th className='w-24 th-header-class'>Stock Code</th>
                                                            <th className='w-56 th-header-class'>Stock Description</th>
                                                            <th className='w-10 th-header-class'>Uoms</th>
                                                            <th className='w-10 th-header-class'>Quantity Order</th>
                                                            <th className='w-32 th-header-class'>Unit Cost</th>
                                                            <th className='w-32 th-header-class'>Total Cost</th>
                                                            <th className='w-16 th-header-class'>Remarks</th>
                                                            <th className='w-32 th-header-class'>Attachment</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className='td-cell-border-class'>awaxsdaxadsxddaw</td>
                                                            <td className='td-cell-border-class'>awddaw</td>
                                                            <td className='td-cell-border-class'>awdasxasxasxdaw</td>
                                                            <td className='td-cell-border-class'>awddaw</td>
                                                            <td className='td-cell-border-class'>awdaxsadxasdxdaw</td>
                                                            <td className='td-cell-border-class'>awddasxasxdasaw</td>
                                                            <td className='td-cell-border-class'>awddaw</td>
                                                            <td className='td-cell-border-class'>awddaw</td>
                                                            <td className='td-cell-border-class'>awddaw</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                          
                                           

                                        </div>                    
                                    </div>

                                    <div className="header-background-label-class">
                                        <div className="flex flex-col gap-2">

                                            <h1 className='header-title-label-class'>SUPPLIERS LISTS</h1>
                                        </div>
                                    </div>

                                    <div className="max-xl:w-auto mx-4 w-auto">
                                        <div className="flex flex-row gap-5">
                                            <div className="w-1/3 bg-white rounded-sm border-gray-300 py-4 border">
                                            
                                                <h1 className='uppercase font-bold text-center mb-4 text-gray-600'>Company Name</h1>
                                                <hr />

                                                <div className="">

                                                </div>

                                            </div>  

                                            <div className="w-full bg-white rounded-sm border-gray-300 py-4 border">
                                            
                                                <h1 className='uppercase font-bold text-center mb-4 text-gray-600'>Company Lists</h1>
                                                <hr />

                                                <div className="">
                                                    
                                                </div>

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