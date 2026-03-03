import Sidebar from "./SideBar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <div className="flex">
      <Sidebar/>
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}