'use client';

import TaskCreator from '@/components/manager/TaskCreator';
import TaskList from '@/components/tasks/TaskList';

const TestPage = () => {
  return (
    <div>
      <h1>Test Page</h1>
      <h2>Task Creator</h2>
      <TaskCreator />
      <h2>Task List</h2>
      <TaskList />
    </div>
  );
};

export default TestPage;