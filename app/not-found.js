import Link from 'next/link'
import Image from 'next/image'
import icon from '@/public/logo.svg'
 
export default function NotFound() {


  return (
    <div className='flex flex-col items-center justify-center h-screen'>
     <Image src={icon} alt="icon" width='350' />
     <div className='flex flex-col items-center justify-center mt-12 space-y-6'>
      <h2 className='text-2xl font-bold'>Page Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className='green-btn'>Return Home</Link>
      </div>
    </div>
  )
}