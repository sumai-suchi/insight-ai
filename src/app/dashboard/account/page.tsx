import Link from "next/link";
import React from "react";

const AccountPage = () => {
  return (
    <div>
      <Link href="/auth/reset_password">(1)Recet Password</Link>
      <Link href="/auth/2FA">(2)2FA</Link>
    </div>
  );
};

export default AccountPage;
