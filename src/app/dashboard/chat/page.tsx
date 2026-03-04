"use client";

import React from "react";
import ChatBox from "../_components/ChatBox";
import { useRouter } from "next/navigation";

export default function ChatPage() {
  const router = useRouter();

  const handleClose = () => {
    // go back to the previous page
    router.back();
  };

  // if the viewport expands to medium/large while on this page,
  // switch back to the dashboard layout and let the overlay open.
  React.useEffect(() => {
    const check = () => {
      if (window.innerWidth >= 768) {
        router.push("/dashboard");
      }
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [router]);

  return <ChatBox open={true} onToggle={handleClose} />;
}
