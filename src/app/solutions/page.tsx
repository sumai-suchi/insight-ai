
import CheckoutButton from '@/components/checkout/CheckoutButton'
import Hero from '@/components/solutions/Hero'

const page = () => {
  return (
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-10">
         <Hero />
         <CheckoutButton />
        </div>
      </main>       
    
  )
}

export default page
