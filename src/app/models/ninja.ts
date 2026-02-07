export interface Ninja {
  id: string;
  username: string;
  rank: 'Academy' | 'Genin' | 'Chunin' | 'Jonin' | 'Kage';
  experiencePoints: number;
  avatarUrl: string;
}