export type ProjectCategory = 
  | 'All'
  | 'YouTube & Retention'
  | 'Commercials & Ads'
  | 'Short-form & Reels'
  | 'Cinematic & Documentaries'
  | 'Music Videos & VFX';

export type UserRole = 'admin' | 'collaborator' | 'reviewer';

export interface TimecodedComment {
  id: string;
  timestamp: string; // e.g. "01:24"
  seconds: number;
  author: string;
  role: UserRole;
  text: string;
  createdAt: string;
  resolved?: boolean;
}

export interface VideoProject {
  id: string;
  title: string;
  client: string;
  category: Exclude<ProjectCategory, 'All'>;
  videoUrl: string; // Direct video mp4/webm or demo video
  posterUrl: string;
  duration: string;
  year: string;
  viewsMetric: string;
  retentionBoost?: string;
  softwareUsed: string[];
  editingTechniques: string[];
  description: string;
  breakdown: string;
  beforeAfterGrading?: {
    beforeImage: string; // Log / Uncut
    afterImage: string;  // Final Graded
  };
  featured?: boolean;
  visibility: 'public' | 'draft' | 'client-only';
  collaborators?: {
    name: string;
    role: string;
  }[];
  comments: TimecodedComment[];
  createdAt: string;
}

export interface CollaboratorUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  activeStatus: 'active' | 'invited' | 'disabled';
}

export interface ClientInquiry {
  id: string;
  clientName: string;
  email: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  projectDetails: string;
  submittedAt: string;
  status: 'new' | 'reviewed' | 'in_progress';
}
