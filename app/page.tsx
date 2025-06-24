import { Suspense } from 'react';
import { Metadata } from 'next';
import Hero from '@/components/hero';
import CategoryCard from '@/components/category-card';
import LoadingSpinner from '@/components/loading-spinner';
import PageTransition from '@/components/page-transition';
import { artistCategories } from '@/lib/data';

export const metadata: Metadata = {
  title: 'ArtistHub - Book Amazing Artists for Your Events',
  description: 'Connect with talented performers, speakers, and entertainers. Find the perfect artist for your event.',
};

// Static generation for better performance
export async function generateStaticParams() {
  return [];
}

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      
      {/* Artist Categories Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Explore Artist Categories
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From intimate acoustic performances to grand stage productions, 
              find the perfect entertainer for your event.
            </p>
          </div>
          
          <Suspense fallback={<LoadingSpinner size="lg" className="py-20" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {artistCategories.map((category, index) => (
                <CategoryCard
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  description={category.description}
                  icon={category.icon}
                  count={category.count}
                  index={index}
                />
              ))}
            </div>
          </Suspense>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Book Your Next Artist?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of event organizers who trust ArtistHub to find amazing talent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Browse Artists
            </button>
            <button className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Post Your Event
            </button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}