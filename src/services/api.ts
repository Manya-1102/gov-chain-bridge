const API_BASE_URL = 'http://localhost:8000';

// Types based on your current data structure
export interface Milestone {
  id: number;
  name: string;
  status: 'pending' | 'in-progress' | 'submitted' | 'completed';
  amount: number;
  dueDate: string;
}

export interface Project {
  id: number;
  name: string;
  description?: string;
  budget: number;
  contractor?: string;
  status: string;
  completedMilestones: number;
  totalMilestones: number;
  fundsReleased: number;
  startDate?: string;
  expectedCompletion?: string;
  milestones?: Milestone[];
}

export interface Transaction {
  date: string;
  amount: number;
  type: string;
  milestone: string;
}

export interface PublicProject extends Project {
  transactions: Transaction[];
}

// API service functions
export const apiService = {
  // Get all projects for contractor
  async getContractorProjects(): Promise<Project[]> {
    const response = await fetch(`${API_BASE_URL}/contractor/projects`);
    if (!response.ok) throw new Error('Failed to fetch contractor projects');
    return response.json();
  },

  // Get all projects for government dashboard
  async getGovernmentProjects(): Promise<Project[]> {
    const response = await fetch(`${API_BASE_URL}/government/projects`);
    if (!response.ok) throw new Error('Failed to fetch government projects');
    return response.json();
  },

  // Get public projects with transactions
  async getPublicProjects(): Promise<PublicProject[]> {
    const response = await fetch(`${API_BASE_URL}/public/projects`);
    if (!response.ok) throw new Error('Failed to fetch public projects');
    return response.json();
  },

  // Submit milestone for verification
  async submitMilestone(projectId: number, milestoneId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/contractor/projects/${projectId}/milestones/${milestoneId}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to submit milestone');
  },

  // Create new project
  async createProject(projectData: {
    name: string;
    budget: number;
    description: string;
    contractorAddress: string;
    milestones: { name: string; amount: number; dueDate: string }[];
  }): Promise<Project> {
    const response = await fetch(`${API_BASE_URL}/government/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });
    if (!response.ok) throw new Error('Failed to create project');
    return response.json();
  },

  // Get pending verifications for auditor
  async getPendingVerifications(): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/auditor/pending-verifications`);
    if (!response.ok) throw new Error('Failed to fetch pending verifications');
    return response.json();
  },

  // Approve/reject milestone verification
  async verifyMilestone(milestoneId: number, approved: boolean, notes?: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/auditor/milestones/${milestoneId}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ approved, notes }),
    });
    if (!response.ok) throw new Error('Failed to verify milestone');
  },

  // Get statistics for dashboards
  async getContractorStats(): Promise<{
    totalEarned: number;
    pendingAmount: number;
    activeProjects: number;
  }> {
    const response = await fetch(`${API_BASE_URL}/contractor/stats`);
    if (!response.ok) throw new Error('Failed to fetch contractor stats');
    return response.json();
  },

  async getGovernmentStats(): Promise<{
    totalBudget: number;
    activeProjects: number;
    verifiedContractors: number;
    fundsReleased: number;
  }> {
    const response = await fetch(`${API_BASE_URL}/government/stats`);
    if (!response.ok) throw new Error('Failed to fetch government stats');
    return response.json();
  },

  async getPublicStats(): Promise<{
    totalBudget: number;
    fundsReleased: number;
    activeProjects: number;
    transparencyScore: number;
  }> {
    const response = await fetch(`${API_BASE_URL}/public/stats`);
    if (!response.ok) throw new Error('Failed to fetch public stats');
    return response.json();
  },
};