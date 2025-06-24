import { Artist, ArtistSubmission } from './types';

// Simulate API delay for realistic loading states
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API endpoints
export const api = {
  // Fetch all artists with optional filtering
  async getArtists(filters?: { category?: string; location?: string; priceRange?: string }): Promise<Artist[]> {
    await delay(800); // Simulate network delay
    
    // Import mock data dynamically
    const { mockArtists } = await import('./data');
    let filteredArtists = [...mockArtists];

    // Apply filters if provided
    if (filters?.category && filters.category !== 'all') {
      filteredArtists = filteredArtists.filter(artist =>
        artist.category.some(cat =>
          cat.toLowerCase() === filters.category!.toLowerCase()
        )
      );
    }

    if (filters?.location && filters.location !== 'all') {
      filteredArtists = filteredArtists.filter(artist =>
        artist.location === filters.location
      );
    }

    if (filters?.priceRange && filters.priceRange !== 'all') {
      filteredArtists = filteredArtists.filter(artist =>
        artist.feeRange === filters.priceRange
      );
    }

    return filteredArtists;
  },

  // Fetch artist submissions for dashboard
  async getSubmissions(): Promise<ArtistSubmission[]> {
    await delay(600);
    const { mockSubmissions } = await import('./data');
    return [...mockSubmissions];
  },

  // Submit new artist application
  async submitArtistApplication(data: any): Promise<{ success: boolean; message: string }> {
    await delay(1500); // Simulate form processing
    
    // Simulate occasional API errors for realistic error handling
    if (Math.random() < 0.1) {
      throw new Error('Network error occurred. Please try again.');
    }

    console.log('Artist application submitted:', data);
    return {
      success: true,
      message: 'Application submitted successfully! We\'ll review it within 24 hours.'
    };
  },

  // Update submission status
  async updateSubmissionStatus(id: string, status: 'approved' | 'rejected'): Promise<void> {
    await delay(300);
    console.log(`Submission ${id} updated to ${status}`);
  }
};