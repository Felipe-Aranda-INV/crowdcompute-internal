// lib/api-client.ts
// Client for interacting with Google Apps Script Web App

interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  error?: string;
  timestamp: string;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'https://script.google.com/macros/s/AKfycbybzYID2K-SQX6q1N6-OuatREdkb1nd5rhnoxiG-Q4dZm3M99-kWD0vdwcYVGCDd8ys/exec';
    
    if (!this.baseUrl) {
      throw new Error('APPS_SCRIPT_URL environment variable is required');
    }
  }

  private async makeRequest<T>(action: string, payload?: any): Promise<T> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          payload: payload || {}
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<T> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Unknown API error');
      }

      return result.data;
    } catch (error) {
      console.error(`API Error (${action}):`, error);
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    const response = await fetch(`${this.baseUrl}?action=health`);
    return await response.json();
  }

  // ========== USER OPERATIONS ==========
  
  async createUser(userData: {
    email: string;
    name: string;
    picture?: string;
    role?: 'agent' | 'manager';
    sub?: string;
    id?: string;
  }) {
    return this.makeRequest('createUser', userData);
  }

  async getUser(email: string) {
    return this.makeRequest('getUser', { email });
  }

  // ========== TASK OPERATIONS ==========
  
  async createTask(taskData: {
    title: string;
    description?: string;
    content?: any;
    difficulty?: 'easy' | 'medium' | 'hard';
    category?: string;
    timeLimit?: number;
    createdBy: string;
    aiAnswer?: any;
    gradingCriteria?: string;
  }) {
    return this.makeRequest('createTask', taskData);
  }

  async getTasks(filters?: {
    status?: string;
    category?: string;
    difficulty?: string;
    createdBy?: string;
  }) {
    return this.makeRequest('getTasks', { filters: filters || {} });
  }

  async getNextTask(agentId: string) {
    return this.makeRequest('getNextTask', { agentId });
  }

  // ========== SUBMISSION OPERATIONS ==========
  
  async submitTask(submissionData: {
    taskId: string;
    agentId: string;
    answer: any;
    aiScore?: number;
    feedback?: string;
  }) {
    return this.makeRequest('submitTask', submissionData);
  }

  async getSubmissions(filters?: {
    agentId?: string;
    taskId?: string;
    status?: string;
  }) {
    return this.makeRequest('getSubmissions', { filters: filters || {} });
  }

  // ========== PROGRESS OPERATIONS ==========
  
  async updateProgress(progressData: {
    agentId: string;
    taskCompleted?: boolean;
    score?: number;
  }) {
    return this.makeRequest('updateProgress', progressData);
  }

  async getProgress(agentId: string) {
    return this.makeRequest('getProgress', { agentId });
  }

  // ========== ANALYTICS OPERATIONS ==========
  
  async getAnalytics(filters?: any) {
    return this.makeRequest('getAnalytics', { filters: filters || {} });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export types for use in components
export interface User {
  id: string;
  google_id: string;
  email: string;
  name: string;
  picture?: string;
  role: 'agent' | 'manager';
  created_at: string;
  updated_at: string;
  certification_status: 'pending' | 'certified' | 'needs_improvement';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  content: any;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  time_limit: number;
  status: 'draft' | 'active' | 'archived';
  created_by: string;
  created_at: string;
  ai_answer: any;
  grading_criteria: string;
}

export interface Submission {
  id: string;
  task_id: string;
  agent_id: string;
  answer: any;
  submitted_at: string;
  ai_score?: number;
  feedback?: string;
  graded_at?: string;
  status: 'submitted' | 'graded' | 'requires_review';
}

export interface Progress {
  id: string;
  agent_id: string;
  total_tasks: number;
  completed_tasks: number;
  average_score: number;
  last_activity: string;
}