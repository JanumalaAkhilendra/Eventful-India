export interface Artist {
  id: string;
  name: string;
  bio: string;
  category: string[];
  languages: string[];
  feeRange: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  verified: boolean;
}

export interface ArtistSubmission {
  id: string;
  name: string;
  category: string[];
  location: string;
  feeRange: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface FilterOptions {
  category: string;
  location: string;
  priceRange: string;
}