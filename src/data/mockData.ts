import type { DashboardStats, Portfolio, Story } from '../types';

export const currentUser: Portfolio = {
  id: '1',
  name: 'Arun',
  avatar: 'A',
  bio: 'Storyteller, dreamer, and creator of worlds through words and voice.',
  storiesCount: 12,
  followers: 248,
  following: 56,
  joinedAt: '2025-06-15',
};

const gradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
  'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
];

export const stories: Story[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    content:
      'Between life and death there is a library, and within that library, the shelves go on forever...',
    excerpt:
      'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
    author: currentUser,
    category: 'fiction',
    coverGradient: gradients[0],
    mediaType: 'text',
    createdAt: '2026-02-20',
    updatedAt: '2026-02-22',
    likes: 42,
    views: 186,
    isPublished: true,
  },
  {
    id: '2',
    title: 'Echoes of Tomorrow',
    content: 'The signal came from beyond the edge of the known universe...',
    excerpt:
      'The signal came from beyond the edge of the known universe, a whisper in the void that changed everything we thought we knew about time.',
    author: currentUser,
    category: 'sci-fi',
    coverGradient: gradients[1],
    mediaType: 'audio',
    duration: '4:32',
    createdAt: '2026-02-18',
    updatedAt: '2026-02-18',
    likes: 67,
    views: 320,
    isPublished: true,
  },
  {
    id: '3',
    title: 'Whispers in the Rain',
    content: 'She stood at the window, watching the city dissolve into silver threads...',
    excerpt:
      'She stood at the window, watching the city dissolve into silver threads of rain, each drop carrying a memory she thought she had forgotten.',
    author: currentUser,
    category: 'romance',
    coverGradient: gradients[2],
    mediaType: 'video',
    duration: '6:15',
    createdAt: '2026-02-15',
    updatedAt: '2026-02-16',
    likes: 89,
    views: 412,
    isPublished: true,
  },
  {
    id: '4',
    title: 'The Last Cartographer',
    content:
      "In a world where every inch had been mapped, he discovered a place that shouldn't exist...",
    excerpt:
      "In a world where every inch had been mapped, he discovered a place that shouldn't exist — a blank space on the edge of reality.",
    author: currentUser,
    category: 'fantasy',
    coverGradient: gradients[3],
    mediaType: 'text',
    createdAt: '2026-02-10',
    updatedAt: '2026-02-12',
    likes: 55,
    views: 275,
    isPublished: true,
  },
  {
    id: '5',
    title: 'Fragments of Silence',
    content: 'Poetry is what happens when words run out of places to hide...',
    excerpt:
      'Poetry is what happens when words run out of places to hide. A collection of verses born from the quiet moments between heartbeats.',
    author: currentUser,
    category: 'poetry',
    coverGradient: gradients[4],
    mediaType: 'audio',
    duration: '3:18',
    createdAt: '2026-02-08',
    updatedAt: '2026-02-08',
    likes: 34,
    views: 158,
    isPublished: false,
  },
  {
    id: '6',
    title: 'The Case of the Vanishing Note',
    content:
      'Detective Rao never believed in coincidences, until the morning three identical letters appeared...',
    excerpt:
      'Detective Rao never believed in coincidences, until the morning three identical letters appeared on three different desks across the city.',
    author: currentUser,
    category: 'mystery',
    coverGradient: gradients[5],
    mediaType: 'text',
    createdAt: '2026-02-05',
    updatedAt: '2026-02-07',
    likes: 73,
    views: 390,
    isPublished: true,
  },
];

export const dashboardStats: DashboardStats = {
  totalStories: 12,
  totalViews: 2341,
  totalLikes: 487,
  totalRecordings: 5,
};

export const featuredPortfolios: Portfolio[] = [
  {
    id: '2',
    name: 'Maya Chen',
    avatar: 'M',
    bio: 'Weaving tales of distant galaxies and forgotten civilizations.',
    storiesCount: 28,
    followers: 1204,
    following: 89,
    joinedAt: '2025-03-10',
  },
  {
    id: '3',
    name: 'Kai Nakamura',
    avatar: 'K',
    bio: 'Spoken word artist and audio storyteller from Tokyo.',
    storiesCount: 45,
    followers: 3500,
    following: 120,
    joinedAt: '2025-01-22',
  },
  {
    id: '4',
    name: 'Priya Sharma',
    avatar: 'P',
    bio: 'Memoir writer exploring the spaces between cultures and identities.',
    storiesCount: 15,
    followers: 890,
    following: 67,
    joinedAt: '2025-05-08',
  },
];
