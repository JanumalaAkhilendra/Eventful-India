'use client'

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
  index?: number;
}

export default function CategoryCard({ id, name, description, icon, count, index = 0 }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/artists?category=${id}`}>
        <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg border-2 hover:border-blue-200 dark:hover:border-blue-800 h-full">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-4xl mb-2"
              >
                {icon}
              </motion.div>
              <Badge variant="secondary" className="text-xs">
                {count} artists
              </Badge>
            </div>
            
            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
              {name}
            </h3>
            
            <p className="text-muted-foreground mb-4 text-sm">
              {description}
            </p>
            
            <motion.div
              className="flex items-center text-blue-600 text-sm font-medium"
              whileHover={{ x: 5 }}
            >
              Explore {name}
              <ArrowRight className="ml-1 h-4 w-4" />
            </motion.div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}