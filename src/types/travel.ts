export interface Destination {
  id: string;
  name: string;
  country: string;
  region: 'Asia' | 'Europe' | 'Mediterranean' | 'Americas';
  tagline: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  startingPrice: number;
  currency: string;
  bestTimeToVisit: string;
  idealDuration: string;
  highlights: string[];
  vibe: string;
  curatedTips: string[];
  rating: number;
  reviewsCount: number;
}

export interface Experience {
  id: string;
  title: string;
  category: 'Adventure Escapes' | 'Cultural Journeys' | 'Luxury Retreats' | 'Nature Expeditions';
  subtitle: string;
  description: string;
  durationRange: string;
  accentQuote: string;
  keyFeatures: string[];
  iconName: string;
  representativeDestinations: string[];
  groupSize: string;
}

export interface TravelPackage {
  id: string;
  title: string;
  destinationId: string;
  destinationName: string;
  country: string;
  duration: string;
  pricePerPerson: number;
  rating: number;
  reviewsCount: number;
  category: string;
  imageUrl: string;
  highlights: string[];
  overview: string;
  included: string[];
  notIncluded: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  tripTaken: string;
  rating: number;
  story: string;
  travelYear: string;
  avatarSeed: string;
  highlightPhrase: string;
}

export interface SearchQuery {
  destination: string;
  dates: string;
  travelers: number;
}
