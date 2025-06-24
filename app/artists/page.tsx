'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ArtistCard from '@/components/artist-card';
import FilterSection from '@/components/filter-section';
import LoadingSpinner from '@/components/loading-spinner';
import PageTransition from '@/components/page-transition';
import { useAppContext } from '@/contexts/app-context';
import { api } from '@/lib/api';
import { Artist, FilterOptions } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Grid, List } from 'lucide-react';

function ArtistsContent() {
  const searchParams = useSearchParams();
  const { state, dispatch } = useAppContext();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [localLoading, setLocalLoading] = useState(true);

  // Initialize filters from URL params
  useEffect(() => {
    const initialFilters: FilterOptions = {
      category: searchParams.get('category') || 'all',
      location: searchParams.get('location') || 'all',
      priceRange: searchParams.get('priceRange') || 'all'
    };
    dispatch({ type: 'UPDATE_FILTERS', payload: initialFilters });
  }, [searchParams, dispatch]);

  // Fetch artists when filters change
  useEffect(() => {
    console.log('Current filters:', state.filters);
    const fetchArtists = async () => {
      try {
        setLocalLoading(true);
        dispatch({ type: 'SET_LOADING', payload: true });
        const artists = await api.getArtists(state.filters);
        console.log('Fetched artists:', artists);
        dispatch({ type: 'SET_ARTISTS', payload: artists });
      } catch (error) {
        console.error('Error fetching artists:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load artists' });
      } finally {
        setLocalLoading(false);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    fetchArtists();
  }, [state.filters, dispatch]);

  const handleFiltersChange = (newFilters: FilterOptions) => {
    dispatch({ type: 'UPDATE_FILTERS', payload: newFilters });
  };

  if (localLoading || state.loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Find Your Perfect Artist
          </h1>
          <p className="text-muted-foreground text-lg">
            Browse through our curated collection of talented performers and entertainers.
          </p>
        </motion.div>

        <FilterSection
          filters={state.filters}
          onFiltersChange={handleFiltersChange}
          resultsCount={state.artists.length}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between mb-6"
        >
          <h2 className="text-xl font-semibold">
            {state.artists.length} Artists Found
          </h2>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:inline">View:</span>
            <div className="flex rounded-lg border">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {state.artists.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🎭</div>
              <h3 className="text-xl font-semibold mb-2">No artists found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters to see more results.
              </p>
              <Button onClick={() => handleFiltersChange({ category: 'all', location: 'all', priceRange: 'all' })}>
                Clear All Filters
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}
            >
              {state.artists.map((artist, index) => (
                <motion.div
                  key={artist.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ArtistCard artist={artist} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}

export default function ArtistsPage() {
  return (
    <Suspense fallback={<LoadingSpinner size="lg" className="min-h-screen flex items-center justify-center" />}>
      <ArtistsContent />
    </Suspense>
  );
}