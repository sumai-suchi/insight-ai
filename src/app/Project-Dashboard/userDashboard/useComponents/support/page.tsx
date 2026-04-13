import React from "react";
import Link from "next/link";

import {
  MessageSquare,
  HelpCircle,
  Ticket,
  MoveRight,
  Mail,
  Phone,
} from "lucide-react";

const SupportMenu = () => {
  const menuItems = [
    {
      name: "Contact",
      href: "/Project-Dashboard/userDashboard/useComponents/support/contact",
      icon: <MessageSquare size={24} className="text-blue-600" />,
      iconBg: "bg-blue-50",
      desc: "Get in touch with our team",
      // ছবির মতো বাটন স্টাইল
      action: (
        <Link
          href="/Project-Dashboard/userDashboard/useComponents/support/contact"
          className="w-full"
        >
          <button className="w-full flex items-center justify-center gap-2 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all active:scale-95 text-sm">
            Start chat <MoveRight size={16} />
          </button>
        </Link>
      ),
    },
    {
      name: "FAQs",
      href: "/Project-Dashboard/userDashboard/useComponents/support/FAQs",
      icon: <HelpCircle size={24} className="text-purple-600" />,
      iconBg: "bg-purple-50",
      desc: "Find quick answers here",
      action: (
        <Link
          href="/Project-Dashboard/userDashboard/useComponents/support/FAQs"
          className="w-full py-3 text-center font-bold text-black border border-gray-200 rounded-xl block text-sm hover:bg-gray-50 transition-colors"
        >
          support@doormat.ca
        </Link>
      ),
    },
    {
      name: "My Ticket",
      href: "/Project-Dashboard/userDashboard/useComponents/support/mytickets",
      icon: <Ticket size={24} className="text-red-500" />,
      iconBg: "bg-red-50",
      desc: "Track your support requests",
      action: (
        <Link
          href="/Project-Dashboard/userDashboard/useComponents/support/mytickets"
          className="w-full py-3 text-center font-bold text-black border border-gray-200 rounded-xl block text-sm hover:bg-gray-50 transition-colors"
        >
          +1 (647) 492-9515
        </Link>
      ),
    },
  ];

  return (
    <section className="bg-gray-100 py-16 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Section - ছবির মতো স্টাইল */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a2b3b] mb-4">
            We are here for you, <br />
            contact us at <span className="text-black italic">anytime</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Have any questions about our services or just want to talk with us?
            Please reach out.
          </p>
        </div>

        {/* Support Cards Grid - ৩টি অপশন */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col items-center text-center group hover:shadow-xl transition-all duration-300"
            >
              {/* Icon Container */}
              <div
                className={`w-16 h-16 ${item.iconBg} rounded-full flex items-center justify-center mb-6`}
              >
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-black mb-1">{item.name}</h3>
              <p className="text-gray-400 text-sm mb-8">{item.desc}</p>

              {/* Action area (Link/Button) */}
              <div className="w-full mt-auto">{item.action}</div>
            </div>
          ))}
        </div>

        {/* Bottom Bar - ছবির নিচের সেকশন */}
        <div className="max-w-5xl mx-auto py-5 px-8 bg-white border border-gray-100 rounded-2xl text-center shadow-sm">
          <p className="text-gray-600 font-medium">
            We'll get back to you as soon as possible. Our team is available{" "}
            <span className="text-black font-bold">8am-6pm on weekdays.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SupportMenu;
