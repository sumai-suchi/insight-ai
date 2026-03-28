// "use client";
// const CustomBadge = ({ children, variant = "default", className = "" }: { 
//   children: React.ReactNode, 
//   variant?: "default" | "outline" | "success" | "warning" | "error",
//   className?: string 
// }) => {
//   const variants = {
//     default: "bg-slate-100 text-slate-600 border-slate-200",
//     outline: "bg-transparent text-slate-500 border-slate-200",
//     success: "bg-emerald-50 text-emerald-700 border-emerald-100",
//     warning: "bg-amber-50 text-amber-700 border-amber-100",
//     error: "bg-rose-50 text-rose-700 border-rose-100",
//   };
//   return (
//     <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${variants[variant]} ${className}`}>
//       {children}
//     </span>
//   );
// };
// import { useState } from "react";
// import { CustomButton } from "@/components/editor-dashboard/CustomButton";
// import { 
//   Send, Eye, History, FileText, CheckCircle, 
//   ChevronDown, Menu, X, Sparkles 
// } from "lucide-react";

// export default function ResponsiveEditorNav({ onAction }: { onAction: (status: string) => void }) {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md px-4 md:px-8 py-3">
//       <div className="flex items-center justify-between">
        
//         {/* LEFT SECTION: Status & Meta */}
//         <div className="flex items-center gap-3 md:gap-6">
//           <div className="flex items-center gap-2">
//             <CustomBadge variant="warning" className="hidden sm:flex px-3 py-1">Draft</CustomBadge>
//             <span className="hidden md:inline text-slate-300">/</span>
//             <div className="flex flex-col md:flex-row md:items-center gap-1">
//               <span className="text-[10px] md:text-sm font-medium text-slate-500 flex items-center gap-1">
//                 <History size={14} /> Last saved 2m ago
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT SECTION: Desktop Actions */}
//         <div className="hidden lg:flex items-center gap-2">
//           <CustomButton variant="ghost" className="rounded-full text-slate-600 hover:bg-slate-100">
//             <Eye size={18} className="mr-2"/> Preview
//           </CustomButton>

//           <div className="h-6 w-px bg-slate-200 mx-2" />

//           {/* Grouped Actions */}
//           <div className="flex items-center gap-2 bg-slate-100/50 p-1 rounded-full border border-slate-100">
//             <CustomButton 
//               onClick={() => onAction("draft")}
//               variant="ghost" 
//               className="rounded-full text-xs font-bold hover:bg-white hover:shadow-sm"
//             >
//               <FileText size={14} className="mr-1.5" /> Save Draft
//             </CustomButton>
            
//             <CustomButton 
//               onClick={() => onAction("review")}
//               variant="ghost" 
//               className="rounded-full text-xs font-bold hover:bg-white hover:shadow-sm"
//             >
//               <Sparkles size={14} className="mr-1.5 text-indigo-500" /> Submit Review
//             </CustomButton>

//             <CustomButton 
//               onClick={() => onAction("published")}
//               className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 py-1.5 text-xs font-bold shadow-md shadow-indigo-100 transition-all active:scale-95"
//             >
//               <Send size={14} className="mr-1.5" /> Publish Now
//             </CustomButton>
//           </div>
//         </div>

//         {/* MOBILE TOGGLE */}
//         <button
//           className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* MOBILE MENU DROPDOWN */}
//       {isMenuOpen && (
//         <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 p-4 space-y-3 shadow-xl animate-in fade-in slide-in-from-top-2">
//           <div className="grid grid-cols-2 gap-2">
//             <CustomButton variant="outline" className="w-full justify-start rounded-xl">
//               <Eye size={18} className="mr-2"/> Preview
//             </CustomButton>
//             <CustomButton variant="outline" className="w-full justify-start rounded-xl">
//               <History size={18} className="mr-2"/> History
//             </CustomButton>
//           </div>
          
//           <div className="space-y-2 pt-2 border-t border-slate-100">
//             <CustomButton onClick={() => onAction("draft")} className="w-full justify-start bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl">
//               <FileText size={18} className="mr-2" /> Save Draft
//             </CustomButton>
//             <CustomButton onClick={() => onAction("review")} className="w-full justify-start bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl border border-indigo-100">
//               <Sparkles size={18} className="mr-2" /> Submit Review
//             </CustomButton>
//             <CustomButton onClick={() => onAction("published")} className="w-full justify-start bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl shadow-lg">
//               <Send size={18} className="mr-2" /> Publish Now
//             </CustomButton>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }