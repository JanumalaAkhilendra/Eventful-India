'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Artist, ArtistSubmission, FilterOptions } from '@/lib/types';

// Define the application state interface
interface AppState {
  artists: Artist[];
  submissions: ArtistSubmission[];
  filters: FilterOptions;
  loading: boolean;
  error: string | null;
  theme: 'light' | 'dark';
}

// Define action types for state management
type AppAction =
  | { type: 'SET_ARTISTS'; payload: Artist[] }
  | { type: 'SET_SUBMISSIONS'; payload: ArtistSubmission[] }
  | { type: 'UPDATE_FILTERS'; payload: FilterOptions }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'TOGGLE_THEME' }
  | { type: 'UPDATE_SUBMISSION_STATUS'; payload: { id: string; status: 'approved' | 'rejected' } };

// Initial state
const initialState: AppState = {
  artists: [],
  submissions: [],
  filters: { category: '', location: '', priceRange: '' },
  loading: false,
  error: null,
  theme: 'light',
};

// Reducer function for state management
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_ARTISTS':
      return { ...state, artists: action.payload, loading: false };
    case 'SET_SUBMISSIONS':
      return { ...state, submissions: action.payload, loading: false };
    case 'UPDATE_FILTERS':
      return { ...state, filters: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    case 'UPDATE_SUBMISSION_STATUS':
      return {
        ...state,
        submissions: state.submissions.map(submission =>
          submission.id === action.payload.id
            ? { ...submission, status: action.payload.status }
            : submission
        ),
      };
    default:
      return state;
  }
}

// Create context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Context provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the app context
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}