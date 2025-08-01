'use client';

import { useSession } from 'next-auth/react';
import TaskList from '@/components/tasks/TaskList';

const AgentDashboardPage = () => {
  const { data: session } = useSession();

  if (session?.user?.role !== 'agent') {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <h1>Agent Dashboard</h1>
      <p>Welcome, {session?.user?.name}</p>
      <TaskList />
    </div>
  );
};

export default AgentDashboardPage;