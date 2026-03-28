"use client";

import EditorDashboardPage from "../editorDashboard/page";
import { IUser } from "@/lib/mongoose-connect/User";

interface Props {
  user: IUser;
}

export default function EditorDashboardClientWrapper({ user }: Props) {
  // you can pass props down if needed
  return <EditorDashboardPage  />;
}