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
    <button onClick={handleSignOut}>SignOut</button>
  )
}

export default SignOutButton