import { Artist, ArtistSubmission } from './types';

export const artistCategories = [
  {
    id: 'singers',
    name: 'Singers',
    description: 'Professional vocalists for any occasion',
    icon: '🎤',
    count: 247
  },
  {
    id: 'dancers',
    name: 'Dancers',
    description: 'Choreographers and performers',
    icon: '💃',
    count: 189
  },
  {
    id: 'speakers',
    name: 'Speakers',
    description: 'Motivational and keynote speakers',
    icon: '🎙️',
    count: 156
  },
  {
    id: 'djs',
    name: 'DJs',
    description: 'Music mixers and entertainment',
    icon: '🎧',
    count: 203
  }
];

export const mockArtists: Artist[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    bio: 'Professional jazz vocalist with 10+ years of experience performing at weddings, corporate events, and intimate venues.',
    category: ['Singers', 'Jazz'],
    languages: ['English', 'French'],
    feeRange: '$500-1000',
    location: 'New York, NY',
    image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    reviews: 127,
    verified: true
  },
  {
    id: '2',
    name: 'Marcus Thompson',
    bio: 'Dynamic hip-hop dancer and choreographer. Specializes in urban dance styles and stage performances.',
    category: ['Dancers', 'Hip-Hop'],
    languages: ['English', 'Spanish'],
    feeRange: '$300-700',
    location: 'Los Angeles, CA',
    image: 'https://images.pexels.com/photos/1699159/pexels-photo-1699159.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    reviews: 89,
    verified: true
  },
  {
    id: '3',
    name: 'Dr. Emily Chen',
    bio: 'Motivational speaker and business consultant. Expert in leadership development and team building.',
    category: ['Speakers', 'Business'],
    languages: ['English', 'Mandarin'],
    feeRange: '$1000-2500',
    location: 'San Francisco, CA',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 5.0,
    reviews: 203,
    verified: true
  },
  {
    id: '4',
    name: 'DJ Alex Rivera',
    bio: 'Professional DJ with extensive experience in weddings, corporate events, and nightclub performances.',
    category: ['DJs', 'Electronic'],
    languages: ['English', 'Portuguese'],
    feeRange: '$400-900',
    location: 'Miami, FL',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    reviews: 156,
    verified: true
  },
  {
    id: '5',
    name: 'Isabella Martinez',
    bio: 'Classical pianist and composer. Perfect for elegant events, weddings, and intimate gatherings.',
    category: ['Singers', 'Classical'],
    languages: ['English', 'Spanish', 'Italian'],
    feeRange: '$600-1200',
    location: 'Chicago, IL',
    image: 'https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    reviews: 94,
    verified: true
  },
  {
    id: '6',
    name: 'James Wilson',
    bio: 'Contemporary dance instructor and performer. Specializes in modern dance and theatrical performances.',
    category: ['Dancers', 'Contemporary'],
    languages: ['English'],
    feeRange: '$350-800',
    location: 'Seattle, WA',
    image: 'https://images.pexels.com/photos/1697350/pexels-photo-1697350.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    reviews: 71,
    verified: false
  }
];

export const mockSubmissions: ArtistSubmission[] = [
  {
    id: '1',
    name: 'Michael Brown',
    category: ['Singers', 'Rock'],
    location: 'Austin, TX',
    feeRange: '$400-800',
    submittedAt: '2024-01-15',
    status: 'pending'
  },
  {
    id: '2',
    name: 'Lisa Wang',
    category: ['Dancers', 'Ballet'],
    location: 'Boston, MA',
    feeRange: '$500-1000',
    submittedAt: '2024-01-14',
    status: 'approved'
  },
  {
    id: '3',
    name: 'Carlos Mendez',
    category: ['DJs', 'Latin'],
    location: 'Phoenix, AZ',
    feeRange: '$300-600',
    submittedAt: '2024-01-13',
    status: 'pending'
  },
  {
    id: '4',
    name: 'Dr. Rachel Green',
    category: ['Speakers', 'Technology'],
    location: 'Portland, OR',
    feeRange: '$1500-3000',
    submittedAt: '2024-01-12',
    status: 'approved'
  }
];

export const languages = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 
  'Mandarin', 'Japanese', 'Korean', 'Arabic', 'Russian', 'Hindi'
];

export const locations = [
  'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX',
  'Phoenix, AZ', 'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA',
  'Dallas, TX', 'San Jose, CA', 'Austin, TX', 'Jacksonville, FL',
  'San Francisco, CA', 'Columbus, OH', 'Charlotte, NC', 'Fort Worth, TX',
  'Detroit, MI', 'El Paso, TX', 'Memphis, TN', 'Seattle, WA'
];

export const feeRanges = [
  '$200-400', '$400-700', '$700-1000', '$1000-1500', '$1500-2500', '$2500+'
];