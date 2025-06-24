'use client'

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Artist } from '@/lib/types';
import Image from 'next/image';

interface ArtistCardProps {
  artist: Artist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden">
            <Image
              src={artist.image}
              alt={`${artist.name} - Professional artist`}
              width={400}
              height={300}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          {artist.verified && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-3 right-3 bg-green-500 text-white p-1 rounded-full"
            >
              <Check className="h-4 w-4" />
            </motion.div>
          )}
        </div>
        
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
              {artist.name}
            </h3>
            <div className="flex items-center text-yellow-500">
              <Star className="h-4 w-4 fill-current" />
              <span className="ml-1 text-sm font-medium text-foreground">{artist.rating}</span>
              <span className="ml-1 text-sm text-muted-foreground">({artist.reviews})</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {artist.category.slice(0, 2).map((cat) => (
              <Badge key={cat} variant="secondary" className="text-xs">
                {cat}
              </Badge>
            ))}
            {artist.category.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{artist.category.length - 2}
              </Badge>
            )}
          </div>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {artist.bio}
          </p>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              {artist.location}
            </div>
            <div className="text-lg font-semibold text-blue-600">
              {artist.feeRange}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Ask for Quote
            </Button>
            <Button variant="outline" size="sm">
              View Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}