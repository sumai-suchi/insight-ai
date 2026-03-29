// "use client";

// import {
//   FilePlus,
//   CheckCircle2,
//   XCircle,
//   Radio,
//   AlertTriangle,
//   Calendar,
// } from "lucide-react";
// import type { ActivityItem, ActivityType } from "@/types/editor";

// interface ActivityFeedProps {
//   items: ActivityItem[];
// }

// const TYPE_CONFIG: Record<ActivityType, { label: string; icon: React.ElementType; color: string; bg: string }> = {
//   submitted: {
//     label: "submitted",
//     icon: FilePlus,
//     color: "text-blue-600",
//     bg: "bg-blue-50",
//   },
//   approved: {
//     label: "approved",
//     icon: CheckCircle2,
//     color: "text-emerald-600",
//     bg: "bg-emerald-50",
//   },
//   rejected: {
//     label: "rejected",
//     icon: XCircle,
//     color: "text-red-500",
//     bg: "bg-red-50",
//   },
//   published: {
//     label: "published",
//     icon: Radio,
//     color: "text-purple-600",
//     bg: "bg-purple-50",
//   },
//   flagged: {
//     label: "flagged comment on",
//     icon: AlertTriangle,
//     color: "text-amber-500",
//     bg: "bg-amber-50",
//   },
//   scheduled: {
//     label: "scheduled",
//     icon: Calendar,
//     color: "text-indigo-600",
//     bg: "bg-indigo-50",
//   },
// };

// function timeAgo(iso: string) {
//   const diff = Date.now() - new Date(iso).getTime();
//   const mins = Math.floor(diff / 60000);
//   if (mins < 60) return `${mins}m`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs}h`;
//   return `${Math.floor(hrs / 24)}d`;
// }

// export function ActivityFeed({ items }: ActivityFeedProps) {
//   return (
//     <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
//       <div className="px-4 py-3.5 border-b border-zinc-50">
//         <h2 className="text-sm font-semibold text-zinc-900">Recent Activity</h2>
//       </div>

//       <div className="px-4 py-3 space-y-3">
//         {items.map((item) => {
//           const conf = TYPE_CONFIG[item.type];
//           const Icon = conf.icon;

//           return (
//             <div key={item.id} className="flex items-start gap-2.5">
//               <div
//                 className={`w-6 h-6 rounded-lg ${conf.bg} flex items-center justify-center shrink-0 mt-0.5`}
//               >
//                 <Icon className={`w-3 h-3 ${conf.color}`} />
//               </div>

//               <div className="flex-1 min-w-0">
//                 <p className="text-xs text-zinc-700 leading-snug">
//                   <span className="font-medium text-zinc-900">
//                     {item.actorName}
//                   </span>{" "}
//                   {conf.label}
//                   {item.targetTitle && (
//                     <>
//                       {" "}
//                       <span className="font-medium text-zinc-800 italic">
//                         "{item.targetTitle}"
//                       </span>
//                     </>
//                   )}
//                   {item.meta && (
//                     <span className="text-zinc-400"> — {item.meta}</span>
//                   )}
//                 </p>
//               </div>

//               <span className="text-[10px] text-zinc-400 shrink-0 mt-0.5">
//                 {timeAgo(item.timestamp)}
//               </span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }