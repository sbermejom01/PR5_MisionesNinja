export interface Mission {
  id: string;
  title: string;
  description: string;
  rankRequirement: 'D' | 'C' | 'B' | 'A' | 'S';
  reward: number;
  status: 'DISPONIBLE' | 'EN_CURSO' | 'COMPLETADA';
  acceptedByNinjaName?: string;
  acceptedByNinjaAvatar?: string;
}