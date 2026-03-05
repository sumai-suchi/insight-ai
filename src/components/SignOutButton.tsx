"use client";
import React from 'react'

import { redirect } from 'next/navigation';
import { authClient } from '@/lib/auth/auth-client';
import { LogOut } from 'lucide-react';


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
  className="
             text-white flex gap-2 text-xs py-3 px-7 rounded-full 
             "
>
  
    

 <LogOut></LogOut> Sign Out
</button>
  )
}

export default SignOutButton