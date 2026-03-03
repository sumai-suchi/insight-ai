import React, { ButtonHTMLAttributes, ElementType, ReactNode } from "react";

// ১. প্রপস এর জন্য ইন্টারফেস তৈরি করা
interface HomeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline"; // নির্দিষ্ট ভ্যালু ডিফাইন করে দেওয়া
  icon?: ElementType; // আইকন কম্পোনেন্টের জন্য ElementType ব্যবহার করা হয়
  className?: string;
}

const HomeButton: React.FC<HomeButtonProps> = ({
  children,
  variant = "primary",
  icon: Icon,
  className = "",
  ...props
}) => {
  // ২. বেসিক স্টাইল
  const baseStyles: string =
    "flex items-center justify-center gap-2 font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-md active:scale-95";

  // ৩. ভেরিয়েন্ট অনুযায়ী স্টাইল (Record টাইপ ব্যবহার করা হয়েছে নিরাপত্তার জন্য)
  const variants: Record<string, string> = {
    primary: "bg-white text-[#57198A] hover:bg-gray-100",
    outline: "border-2 border-white text-white hover:bg-white hover:text-[#57198A]",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {/* যদি আইকন থাকে তবেই দেখাবে */}
      {Icon && <Icon className="w-5 h-5" />} 
      {children}
    </button>
  );
};

export default HomeButton;