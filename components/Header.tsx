"use client"
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { Shield } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
import { User } from '@clerk/nextjs/server'



const Header = () => {
  return (
    <div className='p-4 flex justify-between items-center'>
        <Link href={"/"} className='flex'>
        <h1 className='text-xl font-semibold'><span>Scan</span><span className='text-gray-400'>Us</span></h1>
        <Shield className='w-6 h-6 text-blue-600 mr-2'/>
        </Link>
        <div className='flex space-x-4 items-center'>
          <SignedIn>
            <Link href={"/receipts"}>
            <Button variant={"outline"}>My Recepits</Button></Link>
             <Link href={"/my-plans"}>
            <Button >My Plans</Button></Link>
            <UserButton/>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button>Login</Button>
            </SignInButton>
          </SignedOut>
        </div>

    </div>

  )
}

export default Header