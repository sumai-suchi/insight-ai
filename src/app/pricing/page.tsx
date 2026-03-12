
import PricingPage from '@/components/Pricing/Pricing';
import React from 'react'

const page = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-10">
        {/* Pricing cards will go here */}  
        <PricingPage/>
      </div>
    </main>
  );
}

export default page
