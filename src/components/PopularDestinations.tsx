import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plane, Loader2, ArrowRight, BadgeCheck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const PopularDestinations = () => {
  const { toast } = useToast();

  // Use react-query to fetch destinations with improved caching
  const { 
    data: destinations = [],
    isLoading, 
    error,
  } = useQuery({
    queryKey: ['popularDestinations'],
    queryFn: async () => {
      console.log('Fetching popular destinations from Supabase...');
      const { data, error } = await supabase
        .from('countries')
        .select('*')
        .order('name')
        .limit(8);
      
      if (error) {
        console.error('Error fetching destinations:', error);
        throw error;
      }
      
      console.log('Destinations fetched:', data?.length);
      
      // Transform the data to match the expected format with INR prices
      return data.map(country => ({
        id: country.id,
        name: country.name,
        imageUrl: country.banner || 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=1000',
        processingTime: country.processing_time || '2-4 weeks',
        startingPrice: country.name === 'United States' ? '₹11,950' :
                      country.name === 'Japan' ? '₹2,340' :
                      country.name === 'Singapore' ? '₹3,200' : 
                      country.name === 'Australia' ? '₹10,500' : '₹1,999',
        visaCount: country.name === 'United States' ? '25K+' :
                  country.name === 'Japan' ? '21K+' :
                  country.name === 'Singapore' ? '11K+' : 
                  country.name === 'Australia' ? '7K+' : '15K+',
        date: country.name === 'United States' ? 'Get on 29 Jun, 11:48 PM' :
              country.name === 'Japan' ? 'Get on 08 May, 09:52 PM' :
              country.name === 'Singapore' ? 'Get on 14 Apr, 10:08 PM' :
              country.name === 'Australia' ? 'Get on 28 Apr, 11:14 PM' :
              `Get on ${new Date().getDate() + Math.floor(Math.random() * 90)} ${new Date().toLocaleString('en-US', { month: 'short' })}, ${Math.floor(Math.random() * 12 + 1)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
        directFlights: country.name === 'United States' ? '2 direct flights from ₹90k' :
                      country.name === 'Japan' ? '2 direct flights from ₹56k' :
                      country.name === 'Singapore' ? '10 direct flights from ₹44k' : 
                      country.name === 'Australia' ? '1 direct flight from ₹99k' : '5 direct flights from ₹60k',
        hasSpecialVisa: country.name === 'Japan'
      }));
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    refetchOnWindowFocus: false, // Prevent unnecessary refetches
  });

  // Show toast if error occurs
  React.useEffect(() => {
    if (error) {
      console.error('Error in useQuery:', error);
      toast({
        title: "Error loading destinations",
        description: error instanceof Error ? error.message : "Failed to load destinations",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-navy">Popular Destinations</h2>
        </motion.div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            <span className="ml-3 text-gray-700">Loading destinations...</span>
          </div>
        ) : destinations.length === 0 ? (
          <div className="text-center py-16 px-4">
            <p className="text-gray-500 mb-4">No destinations available yet.</p>
            <p className="text-sm text-gray-400">
              Please check back soon for exciting new destinations.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 sm:px-0">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/country/${destination.id}`}>
                  <Card className="overflow-hidden h-full rounded-xl border-0 shadow-md hover:shadow-xl transition-all duration-300 group">
                    <div className="relative">
                      <AspectRatio ratio={16/9} className="bg-gray-100">
                        <img 
                          src={destination.imageUrl} 
                          alt={destination.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=1000';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>
                      </AspectRatio>
                      
                      {/* Visa count badge */}
                      <Badge className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur-sm text-white border-0 py-1.5 px-3 rounded-full">
                        {destination.visaCount} Visas on Time
                      </Badge>
                      
                      {/* Special label for certain countries */}
                      {destination.hasSpecialVisa && (
                        <div className="absolute top-3 right-3">
                          <div className="bg-yellow-400/90 text-xs font-bold px-3 py-1.5 rounded-full text-navy-900 flex items-center">
                            <BadgeCheck className="w-3.5 h-3.5 mr-1" /> 
                            Sticker Visa
                          </div>
                        </div>
                      )}
                      
                      {/* Country name at bottom */}
                      <div className="absolute bottom-3 left-3 z-20">
                        <h3 className="font-semibold text-xl text-white">{destination.name}</h3>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <Calendar className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                          <span className="truncate">{destination.date}</span>
                        </div>
                        <span className="font-bold text-blue-600">{destination.startingPrice}</span>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-500">
                        <Plane className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                        <span className="truncate">{destination.directFlights}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
        
        <motion.div 
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link to="/countries" className="text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center group">
            View all destinations
            <ArrowRight className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularDestinations;
