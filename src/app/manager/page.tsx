'use client';

import { useSession } from 'next-auth/react';
import TaskCreator from '@/components/manager/TaskCreator';

const ManagerDashboardPage = () => {
  const { data: session } = useSession();

  if (session?.user?.role !== 'manager') {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <h1>Manager Dashboard</h1>
      <p>Welcome, {session?.user?.name}</p>
      <TaskCreator />
    </div>
  );
};

export default ManagerDashboardPage;