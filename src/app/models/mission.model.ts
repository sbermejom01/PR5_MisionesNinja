export type Rank = 'S' | 'A' | 'B' | 'C' | 'D';
export type MissionStatus = 'available' | 'in-progress' | 'completed';

export interface Mission { 
  id: string; 
  title: string; 
  rank: string; 
  reward: number; 
  status: string; 
  isAvailable: boolean; 
  description?: string;
  assignee?: { name: string; photoUrl: string; };
  sector?: string; 
  expirationTime?: string;
  dangerLevel?: number;
}

export const RANK_COLORS = {
  S: '#FFD700',
  A: '#ea1d24',
  B: '#32CD32',
  C: '#1E90FF',
  D: '#8B4513'
};