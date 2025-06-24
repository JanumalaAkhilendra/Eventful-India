'use client'

import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Users, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-background to-purple-50 dark:from-blue-950 dark:via-background dark:to-purple-950 py-20 lg:py-32">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.04] bg-[size:40px_40px]" />
      <div className="relative container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex justify-center"
          >
            <div className="flex items-center rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 px-4 py-2 text-sm font-medium text-blue-600 ring-1 ring-blue-600/20">
              <Star className="mr-2 h-4 w-4" />
              Trusted by 10,000+ event organizers
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            Book Amazing
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}Artists{' '}
            </span>
            for Your Events
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10 text-lg text-muted-foreground sm:text-xl lg:text-2xl max-w-3xl mx-auto"
          >
            Connect with talented performers, speakers, and entertainers. 
            From intimate gatherings to grand celebrations, find the perfect artist for your event.
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/artists">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3 h-auto">
                Find Artists
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/onboard">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3 h-auto border-2 hover:bg-accent">
                Join as Artist
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-border"
          >
            {[
              { icon: Users, value: '2,500+', label: 'Verified Artists', color: 'text-blue-600' },
              { icon: Award, value: '50,000+', label: 'Events Booked', color: 'text-purple-600' },
              { icon: Star, value: '4.9/5', label: 'Average Rating', color: 'text-green-600' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-${stat.color.split('-')[1]}-100 dark:bg-${stat.color.split('-')[1]}-900/20 mb-3`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}