"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  CheckCheck,
  Trash2,
  Info,
  AlertTriangle,
  Zap,
  MessageSquare,
  Clock,
  Loader2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";


interface NotificationItem {
  _id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}


const getIcon = (type: string) => {
  switch (type) {
    case "system":
      return <Zap className="text-cyan-400" size={18} />;
    case "security":
      return <AlertTriangle className="text-amber-400" size={18} />;
    case "message":
      return <MessageSquare className="text-blue-400" size={18} />;
    case "article":
      return <Info className="text-purple-400" size={18} />;
    default:
      return <Info className="text-emerald-400" size={18} />;
  }
};

const Notification = () => {
 
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);


  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      if (Array.isArray(data)) {
        const sortedData = data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        setNotifications(sortedData);
      }
    } catch (error) {
      console.error("Failed to load notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const markAsRead = async (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
    );

    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const markAllAsRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ all: true }),
      });
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const deleteNotification = async (id: string) => {
    setNotifications((prev) => prev.filter((n) => n._id !== id));
    try {
      await fetch(`/api/notifications?id=${id}`, { method: "DELETE" });
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const clearAll = () => {
    if (window.confirm("Are you sure you want to clear all notifications?")) {
      setNotifications([]);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0A1228] text-white p-6 md:p-10">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <Bell className="text-blue-400" size={24} />
              </div>
              <h1 className="text-4xl font-black uppercase tracking-tighter mb-2 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
                Notifications
              </h1>
            </div>
            <p className="text-white/40 text-sm font-medium ml-1">
              {notifications.filter((n) => !n.isRead).length} unread
              Notifications pending.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-[10px] font-bold uppercase tracking-widest"
            >
              <CheckCheck size={14} /> Mark all read
            </button>
            <button
              onClick={clearAll}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 transition-all text-[10px] font-bold uppercase tracking-widest"
            >
              <Trash2 size={14} /> Clear
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 opacity-20">
              <Loader2 className="animate-spin mb-4" size={32} />
              <p className="text-xs uppercase tracking-[0.2em]">
                Syncing Data...
              </p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <motion.div
                    key={notification._id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() =>
                      !notification.isRead && markAsRead(notification._id)
                    }
                    className={`group relative flex items-start gap-4 p-5 rounded-[1.8rem] border transition-all cursor-pointer ${
                      notification.isRead
                        ? "bg-white/[0.01] border-white/5 opacity-50"
                        : "bg-white/[0.04] border-white/10 shadow-xl shadow-blue-900/10"
                    }`}
                  >
                    {!notification.isRead && (
                      <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,1)]" />
                    )}

                    <div
                      className={`p-3 rounded-2xl ${notification.isRead ? "bg-white/5" : "bg-white/10"}`}
                    >
                      {getIcon(notification.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3
                          className={`text-sm font-bold uppercase tracking-wide ${notification.isRead ? "text-white/60" : "text-white"}`}
                        >
                          {notification.title}
                        </h3>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase">
                          <Clock size={12} />
                          {formatDistanceToNow(
                            new Date(notification.createdAt),
                          )}{" "}
                          ago
                        </div>
                      </div>
                      <p className="text-sm text-white/40 leading-relaxed font-medium">
                        {notification.message}
                      </p>
                    </div>

                    <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification._id);
                        }}
                        className="p-2 hover:bg-red-500/10 rounded-lg text-white/10 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-24 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/5">
                    <Bell className="text-white/10" size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-white/40 uppercase tracking-tighter">
                    Clean Slate
                  </h3>
                  <p className="text-xs text-white/20 mt-1 uppercase tracking-widest">
                    No new Notifications at the moment.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
