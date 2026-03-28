export const CustomButton = ({ 
  children, 
  onClick, 
  variant = "solid", 
  className = "",
  disabled = false
}: { 
  children: React.ReactNode, 
  onClick?: () => void, 
  variant?: "solid" | "outline" | "ghost" | "secondary",
  className?: string,
  disabled?: boolean
}) => {
  // Base styles for all buttons
  const baseStyles = "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-bold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
  
  // Style variations based on the "variant" prop
  const variants = {
    solid: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-100",
    secondary: "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100",
    outline: "border border-slate-200 bg-transparent text-slate-600 hover:bg-slate-50",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
