import UsersLayout from '@/layouts/users-layout'
import { Head } from '@inertiajs/react'
import React from 'react'

const BiddingDashboard = () => {
    return (
      <>
        <Head title='Bidding - Dashboard '/>

        <UsersLayout>
          Reports
        </UsersLayout>
      </>
    )
}

export default BiddingDashboard