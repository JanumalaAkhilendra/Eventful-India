'use client';

import { useState } from 'react';
import {
  Card, CardContent, CardHeader, CardTitle
} from '@/components/ui/card';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Filter } from 'lucide-react';
import { FilterOptions } from '@/lib/types';
import { artistCategories, locations, feeRanges } from '@/lib/data';

interface FilterSectionProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  resultsCount: number;
}

export default function FilterSection({
  filters,
  onFiltersChange,
  resultsCount,
}: FilterSectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value === 'all' ? '' : value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      category: '',
      location: '',
      priceRange: '',
    });
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <Card className="mb-8">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg">Filters</CardTitle>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {resultsCount} artists found
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="lg:hidden"
            >
              {isCollapsed ? 'Show' : 'Hide'}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className={`pt-0 transition-all duration-300 ${isCollapsed ? 'hidden lg:block' : ''}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <Select
              value={filters.category || 'all'}
              onValueChange={(value) => handleFilterChange('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {artistCategories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.icon} {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Location</label>
            <Select
              value={filters.location || 'all'}
              onValueChange={(value) => handleFilterChange('location', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Price Range</label>
            <Select
              value={filters.priceRange || 'all'}
              onValueChange={(value) => handleFilterChange('priceRange', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Prices" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                {feeRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={clearFilters}
              disabled={activeFiltersCount === 0}
              className="w-full"
            >
              <X className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
            {filters.category && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Category: {filters.category}
                <button onClick={() => handleFilterChange('category', 'all')}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.location && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Location: {filters.location}
                <button onClick={() => handleFilterChange('location', 'all')}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.priceRange && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Price: {filters.priceRange}
                <button onClick={() => handleFilterChange('priceRange', 'all')}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
