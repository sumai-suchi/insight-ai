"use client";
import { authClient } from "@/lib/auth/auth-client";
import React from "react";

const Auth2FA = () => {
  const { data: session } = authClient.useSession();

  console.log("usre is", session?.user?.twoFactorEnabled);
  const TwoFactorSettings = () => {};

  return <div>2fa</div>;
};

export default Auth2FA;
