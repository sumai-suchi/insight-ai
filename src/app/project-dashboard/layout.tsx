import DashboardSidebar from '@/components/fullProjectDashboard/DashboardSidebar';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <DashboardSidebar />
      

      {children}
    </div>
  )
}