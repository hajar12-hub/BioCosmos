// Flask API service layer
// Replace BASE_URL with your actual Flask backend URL
const BASE_URL = 'http://localhost:5000/api';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

export interface QuizSubmission {
  name: string;
  surname: string;
  score: number;
  totalQuestions: number;
  timestamp: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  surname: string;
  score: number;
  badge: string;
  timestamp: string;
}

export interface SummaryData {
  category: string;
  data: any;
  visualizations: any[];
}

export interface ChatMessage {
  message: string;
  response: string;
  timestamp: string;
}

// API functions
export const api = {
  // Quiz endpoints
  async getQuizQuestions(): Promise<QuizQuestion[]> {
    try {
      const response = await fetch(`${BASE_URL}/quiz/questions`);
      if (!response.ok) throw new Error('Failed to fetch questions');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      // Return mock data for development
      return mockQuizQuestions;
    }
  },

  async submitQuiz(submission: QuizSubmission): Promise<void> {
    try {
      const response = await fetch(`${BASE_URL}/quiz/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      });
      if (!response.ok) throw new Error('Failed to submit quiz');
    } catch (error) {
      console.error('API Error:', error);
    }
  },

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    try {
      const response = await fetch(`${BASE_URL}/leaderboard`);
      if (!response.ok) throw new Error('Failed to fetch leaderboard');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      return mockLeaderboard;
    }
  },

  // Summary endpoints
  async getSummaryData(category: string): Promise<SummaryData> {
    try {
      const response = await fetch(`${BASE_URL}/summary/${category}`);
      if (!response.ok) throw new Error('Failed to fetch summary data');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      return mockSummaryData[category] || mockSummaryData['O2'];
    }
  },

  // Dashboard endpoints
  async uploadFile(file: File): Promise<any> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch(`${BASE_URL}/dashboard/upload`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to upload file');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  async getDashboardData(): Promise<any> {
    try {
      const response = await fetch(`${BASE_URL}/dashboard/data`);
      if (!response.ok) throw new Error('Failed to fetch dashboard data');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      return mockDashboardData;
    }
  },

  // Chatbot endpoints
  async sendChatMessage(message: string): Promise<string> {
    try {
      const response = await fetch(`${BASE_URL}/chatbot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) throw new Error('Failed to get chatbot response');
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('API Error:', error);
      return getMockChatResponse(message);
    }
  },
};

// Mock data for development
const mockQuizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'What percentage of oxygen is produced by cyanobacteria in proposed lunar systems?',
    options: ['1.5kg per day', '2.3kg per day', '3.1kg per day', '4.2kg per day'],
    correctAnswer: 1,
    category: 'O2',
  },
  {
    id: '2',
    question: 'Which biofilm reduces cosmic radiation exposure on Mars?',
    options: ['Algae', 'Extremophile bacteria', 'Fungi', 'Lichens'],
    correctAnswer: 1,
    category: 'Radiation',
  },
  {
    id: '3',
    question: 'What is the primary challenge for plant growth in lunar regolith?',
    options: ['Temperature', 'Lack of nutrients', 'No atmosphere', 'All of the above'],
    correctAnswer: 3,
    category: 'Agriculture',
  },
  {
    id: '4',
    question: 'How much does mycelium-based construction reduce launch mass?',
    options: ['20%', '30%', '40%', '50%'],
    correctAnswer: 2,
    category: 'Materials',
  },
  {
    id: '5',
    question: 'What DNA technique helps prevent bone density loss in space?',
    options: ['PCR', 'CRISPR', 'Sequencing', 'Cloning'],
    correctAnswer: 1,
    category: 'DNA',
  },
];

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Alex', surname: 'Johnson', score: 100, badge: 'DNA Master', timestamp: '2024-10-03T10:00:00Z' },
  { rank: 2, name: 'Sarah', surname: 'Chen', score: 95, badge: 'O₂ Explorer', timestamp: '2024-10-03T09:45:00Z' },
  { rank: 3, name: 'Michael', surname: 'Torres', score: 90, badge: 'Mars Pioneer', timestamp: '2024-10-03T09:30:00Z' },
  { rank: 4, name: 'Emily', surname: 'Rodriguez', score: 85, badge: 'Biology Expert', timestamp: '2024-10-03T09:15:00Z' },
  { rank: 5, name: 'James', surname: 'Kim', score: 80, badge: 'Space Scientist', timestamp: '2024-10-03T09:00:00Z' },
];

const mockSummaryData: Record<string, SummaryData> = {
  O2: {
    category: 'Oxygen Production',
    data: {
      production: 2.3,
      efficiency: 87,
      sustainability: 'High',
    },
    visualizations: [
      { month: 'Jan', production: 2.1 },
      { month: 'Feb', production: 2.2 },
      { month: 'Mar', production: 2.3 },
      { month: 'Apr', production: 2.4 },
    ],
  },
  H2O: {
    category: 'Water Recovery',
    data: {
      recovery: 95,
      efficiency: 92,
      sustainability: 'Critical',
    },
    visualizations: [
      { source: 'Ice', amount: 450 },
      { source: 'Recycling', amount: 380 },
      { source: 'Condensation', amount: 120 },
    ],
  },
  DNA: {
    category: 'Genetic Research',
    data: {
      experiments: 156,
      breakthroughs: 23,
      applications: 'Multiple',
    },
    visualizations: [
      { area: 'CRISPR', value: 45 },
      { area: 'Sequencing', value: 67 },
      { area: 'Therapy', value: 44 },
    ],
  },
};

const mockDashboardData = {
  rankings: mockLeaderboard,
  statistics: {
    totalParticipants: 1247,
    averageScore: 76,
    completionRate: 89,
  },
};

function getMockChatResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes('oxygen') || lowerMessage.includes('o2')) {
    return 'Oxygen production on the Moon uses cyanobacteria that can generate 2.3kg of O₂ per day per square meter. This is enough to support 4 astronauts with a 10m² cultivation area!';
  } else if (lowerMessage.includes('water') || lowerMessage.includes('h2o')) {
    return 'Water recovery systems on Mars achieve 95% efficiency through bioengineered thermophilic bacteria that extract and purify water from polar ice deposits.';
  } else if (lowerMessage.includes('dna') || lowerMessage.includes('genetic')) {
    return 'CRISPR-based gene therapy shows a 67% reduction in bone density loss during Mars missions. This breakthrough could revolutionize long-duration space travel!';
  } else if (lowerMessage.includes('quiz')) {
    return 'The BioCosmos quiz tests your knowledge on space biology, including oxygen production, water systems, radiation protection, and genetic adaptations. Complete it to earn badges!';
  } else {
    return 'BioCosmos synthesizes NASA bioscience research for Moon and Mars exploration. Ask me about oxygen production, water systems, DNA research, or take our interactive quiz!';
  }
}
