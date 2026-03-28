"use client";
import React, { useState } from "react";
import {
  Bell,
  CheckCircle,
  Info,
  MessageCircle,
  Star,
  Trash2,
  XCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const notificationsData = [
  {
    id: 1,
    type: "news",
    title: "New AI article published",
    message: "Check out the latest trends in Artificial Intelligence.",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    type: "recommendation",
    title: "Recommended for you",
    message: "Based on your interest, read this Tech article.",
    time: "10 min ago",
    read: false,
  },
  {
    id: 3,
    type: "system",
    title: "Profile updated",
    message: "Your profile information was updated successfully.",
    time: "1 hour ago",
    read: true,
  },
  {
    id: 4,
    type: "interaction",
    title: "New reply on your comment",
    message: "Someone replied to your discussion.",
    time: "3 hours ago",
    read: false,
  },
  {
    id: 5,
    type: "admin",
    title: "New Feature Released",
    message: "AI Summary feature is now live!",
    time: "1 day ago",
    read: true,
  },
];

const getIcon = (type) => {
  switch (type) {
    case "news":
      return <Bell className="w-5 h-5 text-blue-500" />;
    case "recommendation":
      return <Star className="w-5 h-5 text-yellow-500" />;
    case "system":
      return <CheckCircle className="w-5 h-5 text-emerald-500" />;
    case "interaction":
      return <MessageCircle className="w-5 h-5 text-purple-500" />;
    case "admin":
      return <Info className="w-5 h-5 text-rose-500" />;
    default:
      return <Bell className="w-5 h-5 text-gray-500" />;
  }
};

export default function NotificationPage() {
  const [notifications, setNotifications] = useState(notificationsData);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (e, id) => {
    e.stopPropagation();
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const toggleRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
              <Bell className="w-8 h-8 text-blue-600" /> Notifications
            </h1>
            <p className="text-slate-500 mt-1 font-medium">
              You have {notifications.filter((n) => !n.read).length} unread
              messages
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 text-sm font-semibold bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all shadow-sm active:scale-95"
            >
              Mark all read
            </button>
            <button
              onClick={clearAll}
              className="px-4 py-2 text-sm font-semibold bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-all flex items-center gap-2 active:scale-95"
            >
              <XCircle className="w-4 h-4" /> Clear All
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <motion.div
                  key={n.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => toggleRead(n.id)}
                  className={`group relative p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer shadow-sm hover:shadow-md overflow-hidden
                    ${
                      n.read
                        ? "bg-white border-slate-100"
                        : "bg-white border-blue-200 ring-1 ring-blue-100"
                    }`}
                >
                  {/* Unread Indicator Bar */}
                  {!n.read && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
                  )}

                  <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-white transition-colors">
                    {getIcon(n.type)}
                  </div>

                  <div className="flex-1 pr-8">
                    <div className="flex items-center gap-2">
                      <h3
                        className={`font-bold transition-colors ${n.read ? "text-slate-600" : "text-slate-900"}`}
                      >
                        {n.title}
                      </h3>
                      {!n.read && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                      )}
                    </div>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                      {n.message}
                    </p>
                    <span className="text-xs font-semibold text-slate-400 mt-2 block italic">
                      {n.time}
                    </span>
                  </div>

                  {/* Individual Delete Button */}
                  <button
                    onClick={(e) => deleteNotification(e, n.id)}
                    className="sm:opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300"
              >
                <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-500 font-medium">
                  No notifications yet!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
