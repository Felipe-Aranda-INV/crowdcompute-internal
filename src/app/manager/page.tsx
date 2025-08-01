'use client';

import TaskCreator from '@/components/manager/TaskCreator';

const ManagerDashboardPage = () => {
  return (
    <div>
      <h1>Manager Dashboard</h1>
      <p>Welcome, Manager</p>
      <TaskCreator />
    </div>
  );
};

export default ManagerDashboardPage;