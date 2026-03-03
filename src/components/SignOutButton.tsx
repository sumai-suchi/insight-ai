"use client";
import React from 'react'

import { redirect } from 'next/navigation';
import { authClient } from '@/lib/auth/auth-client';


const SignOutButton = () => {
    const handleSignOut = async () => {
  await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      alert("Signed out successfully");
      redirect("/auth/sign-in");
     },
  },
});
}


  return (
  <button
  onClick={handleSignOut}
  className="bg-linear-to-r from-blue-400 to-blue-600 
             hover:from-blue-500 hover:to-blue-700 
             text-white font-bold py-3 px-7 rounded-full 
             shadow-lg hover:shadow-xl transform hover:scale-105 
             transition-all duration-300 ease-in-out flex items-center gap-2"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 002 2h3a2 2 0 002-2V7a2 2 0 00-2-2h-3a2 2 0 00-2 2v1"
    />
  </svg>
  Sign Out
</button>
  )
}

export default SignOutButton