import { Task } from '@/types/tasks';

// Actual deployed Google Apps Script URL
const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbybzYID2K-SQX6q1N6-OuatREdkb1nd5rhnoxiG-Q4dZm3M99-kWD0vdwcYVGCDd8ys/exec';

/**
 * Fetches all tasks from the Google Sheet via the Apps Script endpoint.
 * @returns {Promise<Task[]>} A promise that resolves to an array of tasks.
 */
export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch tasks.');
    }

    // The data from Apps Script will be an array of objects.
    // We can cast it to our Task type, assuming the structure matches.
    return result.data as Task[];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return []; // Return an empty array on error
  }
};

/**
 * Creates a new task by sending it to the Google Sheet via the Apps Script endpoint.
 * @param {Omit<Task, 'id'>} taskData - The task data to create.
 * @returns {Promise<{success: boolean, message: string}>} A promise that resolves to the result.
 */
export const createTask = async (taskData: Omit<Task, 'id'>) => {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Required for POSTs to Apps Script from a different origin
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    // no-cors mode means we won't be able to read the response, but the request will go through.
    // We will assume success if the request doesn't throw an error.
    return {
      success: true,
      message: 'Task creation request sent successfully.',
    };
  } catch (error) {
    console.error('Error creating task:', error);
    return { success: false, message: 'Failed to create task.' };
  }
};
