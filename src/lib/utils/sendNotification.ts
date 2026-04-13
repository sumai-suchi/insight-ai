// utils/sendNotification.ts
import { Notification } from "@/lib/models/Notification";

export const sendNotification = async (data: {
  title: string;
  message: string;
  type: "system" | "security" | "article" | "support";
  recipientRole?: "ADMIN" | "EDITOR" | "USER" | "ALL";
  recipientId?: string;
}) => {
  await Notification.create(data);
};
