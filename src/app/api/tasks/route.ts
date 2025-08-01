// src/app/api/tasks/route.ts
import { getTasks, createTask } from '@/lib/google-sheets';
import { NextResponse } from 'next/server';

/**
 * Handles GET requests to fetch all tasks.
 */
export async function GET() {
  try {
    const tasks = await getTasks();
    return NextResponse.json({ success: true, data: tasks });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

/**
 * Handles POST requests to create a new task.
 */
export async function POST(request: Request) {
  try {
    const taskData = await request.json();

    // Basic validation
    if (!taskData.title || !taskData.content) {
      return NextResponse.json(
        { success: false, message: 'Title and content are required' },
        { status: 400 }
      );
    }

    const result = await createTask(taskData);

    if (!result.success) {
      return NextResponse.json({ success: false, message: result.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Task created successfully' });

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
