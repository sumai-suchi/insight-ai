// import Link from "next/link";
// import React from "react";

// const suppot = () => {
//   return (
//     <div className="flex flex-col gap-4">
//       <Link href="/Project-Dashboard/userDashboard/useComponents/support/contact">
//         Contact
//       </Link>
//       <Link href="/Project-Dashboard/userDashboard/useComponents/support/FAQs">
//         FAQs
//       </Link>
//       <Link href="/Project-Dashboard/userDashboard/useComponents/support/mytickets">
//         My Ticket
//       </Link>
//     </div>
//   );
// };

// export default suppot;
"use client";
import Link from "next/link";
import React from "react";
import { MessageSquare, HelpCircle, Ticket, ChevronRight } from "lucide-react";

const SupportMenu = () => {
  const menuItems = [
    {
      name: "Contact",
      href: "/Project-Dashboard/userDashboard/useComponents/support/contact",
      icon: <MessageSquare size={20} />,
      desc: "Get in touch with our team",
      color: "text-blue-600 bg-blue-50",
    },
    {
      name: "FAQs",
      href: "/Project-Dashboard/userDashboard/useComponents/support/FAQs",
      icon: <HelpCircle size={20} />,
      desc: "Find quick answers here",
      color: "text-orange-600 bg-orange-50",
    },
    {
      name: "My Ticket",
      href: "/Project-Dashboard/userDashboard/useComponents/support/mytickets",
      icon: <Ticket size={20} />,
      desc: "Track your support requests",
      color: "text-purple-600 bg-purple-50",
    },
  ];

  return (
    <div className="max-w-sm w-full bg-white/80 backdrop-blur-md p-5 rounded-3xl shadow-xl border border-purple-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6 px-2">
        Support Center
      </h2>

      <div className="flex flex-col gap-3">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="group flex items-center justify-between p-4 rounded-2xl bg-white border border-transparent hover:border-purple-200 hover:shadow-md transition-all duration-300 active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-xl transition-colors duration-300 ${item.color} group-hover:bg-[#9333ea] group-hover:text-white`}
              >
                {item.icon}
              </div>
              <div>
                <p className="font-bold text-gray-800 group-hover:text-[#9333ea] transition-colors uppercase text-sm">
                  {item.name}
                </p>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
            </div>

            <ChevronRight
              size={18}
              className="text-gray-300 group-hover:text-[#9333ea] group-hover:translate-x-1 transition-all"
            />
          </Link>
        ))}
      </div>

      <div className="mt-6 p-4 bg-[#9333ea]/5 rounded-2xl border border-dashed border-[#9333ea]/20 text-center">
        <p className="text-xs text-purple-600 font-medium">
          Need urgent help? Call us 24/7
        </p>
      </div>
    </div>
  );
};

export default SupportMenu;
