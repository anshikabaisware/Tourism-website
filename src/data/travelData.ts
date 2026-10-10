import heroImage from '../assets/images/hero_cinematic_landscape_1791607130414.jpg';
import baliImage from '../assets/images/dest_bali_retreat_1791607142215.jpg';
import swissImage from '../assets/images/dest_switzerland_alps_1791607152968.jpg';
import kyotoImage from '../assets/images/dest_kyoto_bamboo_1791607162878.jpg';
import santoriniImage from '../assets/images/dest_santorini_sunset_1791607173252.jpg';

import { Destination, Experience, TravelPackage, Testimonial } from '../types/travel';

export const HERO_IMAGE = heroImage;

export const FEATURED_DESTINATIONS: Destination[] = [
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    region: 'Asia',
    tagline: 'Island of Gods, Sacred Cascades & Botanical Peace',
    description: 'Emerald terraced valleys, secluded bamboo retreats, and ancient spiritual rituals in Ubud and the mystical northern highlands.',
    longDescription: 'Immerse yourself in Bali’s poetic rhythm. Wander across the mist-shrouded rice terraces of Tegallalang, receive private water blessings from revered temple priests, and unwind in secluded open-air river sanctuaries crafted by master artisans.',
    imageUrl: baliImage,
    startingPrice: 2850,
    currency: '$',
    bestTimeToVisit: 'April – October (Dry Season)',
    idealDuration: '7 – 10 Days',
    highlights: [
      'Private dawn walk through Tegallalang emerald terraces',
      'Holistic Ayurvedic wellness ritual overlooking the Ayung River',
      'Artisanal farm-to-table culinary workshop with Balinese master chefs',
      'Traditional sunset gamelan performance at Uluwatu clifftop sanctuary'
    ],
    vibe: 'Spiritual tranquility, lush volcanic nature, warm barefoot elegance',
    curatedTips: [
      'Rise before 6:00 AM to witness morning mist rolling over Ubud’s river valleys.',
      'Request our concierge reserve an intimate candlelit dinner in Sayan gorge.',
      'Explore Sidemen valley for an untouched glimpse of Bali from fifty years ago.'
    ],
    rating: 4.96,
    reviewsCount: 142
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    country: 'Swiss Confederation',
    region: 'Europe',
    tagline: 'Alpine Grandeur, Glacial Lakes & Timber Chalets',
    description: 'Pristine mountain passes, mirror-like alpine waters, and timbered sanctuaries tucked beneath dramatic snow-capped peaks.',
    longDescription: 'Experience the pinnacle of European alpine majesty. Journey through high-altitude wildflower meadows, ride historic cogwheel railways to mountain ridges, and savor Michelin-star dining paired with Valais vintages beside a roaring cedar fireplace.',
    imageUrl: swissImage,
    startingPrice: 4200,
    currency: '$',
    bestTimeToVisit: 'June – September (Alpine Bloom) / Dec – March (Winter Snow)',
    idealDuration: '8 – 12 Days',
    highlights: [
      'Private panoramic cogwheel ascent up to Gornergrat Matterhorn viewpoint',
      'Scenic wooden boat cruise along turquoise Lake Lucerne and Brienz',
      'Artisanal alpine cheese tasting in a 200-year-old high-altitude chalet',
      'Bespoke guided glacier trek across the majestic Aletsch Glacier'
    ],
    vibe: 'Pure alpine air, timeless precision, cozy fireside luxury',
    curatedTips: [
      'Take the first morning train to beat crowds at iconic alpine observation decks.',
      'Pack light merino wool layers even in summer for crisp high-altitude evenings.',
      'Sip local Chasselas white wine on lakefront terraces in Lavaux vineyards.'
    ],
    rating: 4.98,
    reviewsCount: 189
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    region: 'Asia',
    tagline: 'Ancient Temples, Whispering Bamboo & Zen Poetry',
    description: 'Timeless bamboo groves, meditative rock gardens, secluded tea pavilions, and multi-course kaiseki dining steeped in tradition.',
    longDescription: 'Step into centuries of quiet refinement. Walk stone pathways illuminated by paper lanterns, participate in private chanoyu tea ceremonies inside historic wooden temples, and gain exclusive access to private gardens closed to the general public.',
    imageUrl: kyotoImage,
    startingPrice: 3600,
    currency: '$',
    bestTimeToVisit: 'March – May (Cherry Blossoms) & Oct – Nov (Crimson Foliage)',
    idealDuration: '7 – 9 Days',
    highlights: [
      'Early morning private meditation at Daitoku-ji Zen monastery',
      'Exclusive tea ceremony conducted by a 15th-generation Urasenke master',
      'Guided twilight stroll through preserved Gion historic preservation district',
      'Ten-course seasonal kaiseki feast in a traditional riverside machiya'
    ],
    vibe: 'Meditative stillness, exquisite craftsmanship, subtle seasonal harmony',
    curatedTips: [
      'Book morning visits to Arashiyama bamboo forest at 6:30 AM for sublime solitude.',
      'Wear slip-on shoes for effortless entry into temple verandas and tatami dining.',
      'Experience an overnight ryokan stay with private cedar onsen soaking.'
    ],
    rating: 4.97,
    reviewsCount: 165
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    region: 'Mediterranean',
    tagline: 'Whitewashed Cycladic Cliffs & Aegean Sunsets',
    description: 'Sun-drenched cliffside suites, vivid blue domes, Aegean breezes, and private catamaran cruises across volcanic waters.',
    longDescription: 'Perched high above the sapphire caldera, Santorini captivates with timeless Aegean light. Relax in cave suites with plunge pools suspended between sky and sea, savor freshly caught seafood dressed in cold-pressed Cretan oil, and toast golden sunsets in quiet Oia cliff gardens.',
    imageUrl: santoriniImage,
    startingPrice: 3450,
    currency: '$',
    bestTimeToVisit: 'May – June & September – October (Warm & Peaceful)',
    idealDuration: '6 – 8 Days',
    highlights: [
      'Private sunset sailing charter around volcanic caldera and hot springs',
      'Sommelier-led tasting of crisp Assyrtiko wines at indigenous vineyards',
      'Clifftop walking trail from Imerovigli to Oia with endless sea vistas',
      'Gourmet cliffside dinner overlooking illuminated caldera villages'
    ],
    vibe: 'Sun-warmed marble, azure horizons, romantic Mediterranean ease',
    curatedTips: [
      'Opt for Imerovigli or Megalochori for caldera vistas with higher privacy than Oia.',
      'Book catamaran charters for the late afternoon to catch sunset from the water.',
      'Visit prehistoric Akrotiri ruins with an archeologist private guide.'
    ],
    rating: 4.95,
    reviewsCount: 210
  }
];

export const SIGNATURE_EXPERIENCES: Experience[] = [
  {
    id: 'adventure',
    title: 'Adventure Escapes',
    category: 'Adventure Escapes',
    subtitle: 'Thrilling expeditions across dramatic frontiers',
    description: 'From heliskiing unmarked powder in the Swiss Alps to hiking sacred volcanic ridges in Bali, these journeys awaken your senses through exhilarating encounters with untouched nature.',
    durationRange: '6 – 12 Days',
    accentQuote: 'The wildest paths lead to the most indelible memories.',
    keyFeatures: [
      'Small expedition groups or private party charters',
      'Certified high-alpine & wilderness expedition leaders',
      'Exclusive permits to restricted natural reserves',
      'Premium gear & safety logistics fully managed'
    ],
    iconName: 'Compass',
    representativeDestinations: ['Swiss Alps', 'Patagonia', 'Bali Volcanic Ridges'],
    groupSize: 'Max 6 or Private'
  },
  {
    id: 'cultural',
    title: 'Cultural Journeys',
    category: 'Cultural Journeys',
    subtitle: 'Living traditions, ancient arts & deep human connection',
    description: 'Go beyond ordinary sightseeing with curated introductions to master artisans, temple custodians, and generational stewards preserving world heritage.',
    durationRange: '7 – 14 Days',
    accentQuote: 'Culture is not a monument to observe, but a dialogue to experience.',
    keyFeatures: [
      'Private access to national treasures after public closing hours',
      'Intimate culinary workshops with generational master chefs',
      'Curated dialogues with local historians and anthropologists',
      'Stays in historical heritage villas and restored estates'
    ],
    iconName: 'Landmark',
    representativeDestinations: ['Kyoto', 'Peloponnese', 'Morocco', 'Oaxaca'],
    groupSize: 'Max 8 or Private'
  },
  {
    id: 'luxury',
    title: 'Luxury Retreats',
    category: 'Luxury Retreats',
    subtitle: 'Sanctuaries of rest, bespoke wellness & unhurried quiet',
    description: 'Handpicked villas, cliffside cave sanctuaries, and remote wellness lodges designed for total restoration. Unwind in sublime settings with deeply personalized service.',
    durationRange: '5 – 10 Days',
    accentQuote: 'True luxury is the space and time to be entirely present.',
    keyFeatures: [
      'Dedicated private butler and on-call executive chauffeur',
      'Customized holistic wellness, spa, and nutrition programs',
      'Private plunge pools, open-air bath pavilions, and panoramic views',
      'Seamless luggage handling and private VIP tarmac transfers'
    ],
    iconName: 'Sparkles',
    representativeDestinations: ['Santorini Caldera', 'Bali Sayan Valley', 'Lake Como'],
    groupSize: 'Solo, Couples & Families'
  },
  {
    id: 'nature',
    title: 'Nature Expeditions',
    category: 'Nature Expeditions',
    subtitle: 'Biodiverse wonders, primeval forests & untouched waters',
    description: 'Follow scenic waterways, traverse ancient bamboo forests, and witness wild ecosystems in pristine equilibrium, led by passionate local naturalists and conservationists.',
    durationRange: '8 – 14 Days',
    accentQuote: 'Step into landscapes that echo the first morning of creation.',
    keyFeatures: [
      'Eco-luxury low-impact lodges harmonized with ecosystems',
      'Silent electric boat cruises and private kayak expeditions',
      'Field naturalists providing daily botanical & wildlife insights',
      'Direct contribution to local biodiversity conservation trusts'
    ],
    iconName: 'Trees',
    representativeDestinations: ['Japanese Alps', 'Nordic Fjords', 'Costa Rica Canopies'],
    groupSize: 'Max 6 or Private'
  }
];

export const POPULAR_PACKAGES: TravelPackage[] = [
  {
    id: 'pkg-swiss-grandeur',
    title: 'Alpine Serenity & Swiss Grandeur',
    destinationId: 'switzerland',
    destinationName: 'Swiss Alps',
    country: 'Switzerland',
    duration: '8 Days / 7 Nights',
    pricePerPerson: 4850,
    rating: 4.98,
    reviewsCount: 88,
    category: 'Luxury Retreat & Alpine Adventure',
    imageUrl: swissImage,
    highlights: [
      'First-class Glacier Express panoramic private coupe',
      '3 nights at a five-star timber chalet resort in Zermatt',
      'Private helicopter flight over Matterhorn & Monte Rosa peaks',
      'Alpine wine and cheese pairing in a secluded 18th-century cellar'
    ],
    overview: 'An unforgettable alpine odyssey blending world-class Swiss hospitality with dramatic mountain exploration. Travel from glacial turquoise lakes to towering snow peaks with private guides.',
    included: [
      'All 5-star boutique chalet and luxury hotel accommodations',
      'Daily gourmet alpine breakfast and four multi-course chef dinners',
      'Private Swiss rail pass with first-class scenic car reservations',
      'All private guided excursions, entrance permits, and ski/hiking passes',
      '24/7 dedicated Wanderly alpine travel concierge'
    ],
    notIncluded: [
      'International flights to Zurich/Geneva',
      'Personal discretionary shopping and premium spa treatments'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Zurich & Private Transfer to Lake Lucerne', description: 'VIP tarmac greeting and private Mercedes transfer to your lakeside boutique resort. Welcome champagne reception overlooking Mt. Pilatus.' },
      { day: 2, title: 'Steamboat Cruise & Mount Rigi Alpine Walk', description: 'Vintage steam paddleboat journey across crystal waters followed by a guided mountain meadow stroll with wild botanical herb foraging.' },
      { day: 3, title: 'Glacier Express Scenic Rail to Zermatt', description: 'Board the legendary Glacier Express through snow-capped valleys and dramatic viaducts, arriving at vehicle-free Zermatt at sunset.' },
      { day: 4, title: 'Matterhorn Sunrise & Gornergrat Ridge', description: 'Ascend to 3,089 meters on the cogwheel railway for early morning panoramic views. Afternoon private tasting with master cheesemakers.' },
      { day: 5, title: 'Alpine Heli-Tour & Glacier Walk', description: 'Private morning helicopter flight over the dramatic Matterhorn summit with a safe guided walk on pristine glacial ridges.' },
      { day: 6, title: 'Interlaken & Brienz Woodcarving Heritage', description: 'Scenic drive to the Bernese Oberland. Visit private ateliers preserving centuries-old Swiss alpine artisan crafts.' },
      { day: 7, title: 'Farewell Gala Dinner at Jungfraujoch Panorama', description: 'Exclusive after-hours dinner at an alpine observatory, celebrating your journey under a blanket of starlight.' },
      { day: 8, title: 'Scenic Transfer to Zurich Departure', description: 'Private chauffeured transfer to Zurich Airport with lounge access assistance.' }
    ]
  },
  {
    id: 'pkg-kyoto-zen',
    title: 'Kyoto Zen & Ancient Capitals',
    destinationId: 'kyoto',
    destinationName: 'Kyoto & Nara',
    country: 'Japan',
    duration: '10 Days / 9 Nights',
    pricePerPerson: 4200,
    rating: 4.97,
    reviewsCount: 94,
    category: 'Cultural Journeys & Spiritual Heritage',
    imageUrl: kyotoImage,
    highlights: [
      '4 nights in a centuries-old riverside traditional ryokan with private onsen',
      'Private early-access pass to Arashiyama bamboo forest and Ryoan-ji',
      'Exclusive matcha ceremony with an authentic Urasenke grand master',
      'Private night tour of illuminated Gion with a licensed cultural scholar'
    ],
    overview: 'A contemplative journey through the spiritual soul of Japan. Discover hidden stone courtyards, sacred pine forests, and master artisans whose craft has endured across centuries.',
    included: [
      'Luxury traditional ryokan and five-star heritage hotel stays',
      'Daily traditional Japanese breakfasts and three private kaiseki dinners',
      'Private chauffeured transport across Kyoto, Uji, and Nara',
      'Personal English-speaking licensed cultural docent throughout',
      'All temple entry authorizations and private ceremony donations'
    ],
    notIncluded: [
      'International flights to Osaka/Tokyo',
      'Alcoholic beverages outside curated pairings'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Kyoto via Kansai Shinkansen', description: 'Warm greeting at Kyoto Station and transfer to your peaceful ryokan along the Kamogawa River. Evening garden stroll.' },
      { day: 2, title: 'Sacred Arashiyama at Dawn', description: 'Beat all crowds with a 6:30 AM sunrise stroll through the whispering bamboo grove, followed by matcha tea in an 800-year-old temple garden.' },
      { day: 3, title: 'Zen Meditation at Daitoku-ji', description: 'Morning zazen sitting led by a Buddhist monk, followed by an explanation of rock garden aesthetics and shojin ryori temple vegetarian lunch.' },
      { day: 4, title: 'Ceramics & Swordsmith Ateliers', description: 'Meet living cultural treasures in their private workshops to witness the delicate forging of Japanese steel and clay.' },
      { day: 5, title: 'Historic Nara & Ancient Deer Groves', description: 'Excursion to Todai-ji to see the Great Bronze Buddha and walk through ancient cedar forests inhabited by sacred sika deer.' },
      { day: 6, title: 'Green Tea Harvest in Uji', description: 'Private visit to the birthplace of Japanese green tea. Learn traditional hand-rolling techniques and savor ceremonial gyokuro.' },
      { day: 7, title: 'Fushimi Inari Torii Gates at Twilight', description: 'Ascend the winding orange torii paths as lanterns flicker on, avoiding midday travelers for a magical spiritual ascent.' },
      { day: 8, title: 'Gion Historic District & Geiko Culture', description: 'An educational walking tour exploring the architecture, music, and preserved traditions of Kyoto’s historic entertainment quarters.' },
      { day: 9, title: 'Kaiseki Masterclass & Farewell Feast', description: 'Ten-course seasonal banquet celebrating the philosophy of shun (the peak ephemeral flavor of the season).' },
      { day: 10, title: 'Morning Blessing & Departure', description: 'Private departure ceremony at your ryokan before private transfer to Kansai International Airport.' }
    ]
  },
  {
    id: 'pkg-bali-sanctuary',
    title: 'Balinese Soul & Wellness Sanctuary',
    destinationId: 'bali',
    destinationName: 'Bali',
    country: 'Indonesia',
    duration: '7 Days / 6 Nights',
    pricePerPerson: 3200,
    rating: 4.96,
    reviewsCount: 112,
    category: 'Luxury Retreats & Tropical Wellness',
    imageUrl: baliImage,
    highlights: [
      '3 nights luxury riverside bamboo villa in Ubud & 3 nights cliffside Uluwatu suite',
      'Private Tirta Empul purification ritual with village high priest',
      'Daily organic farm dining and bespoke Ayurvedic spa therapy',
      'Catamaran day cruise to secluded crystalline bays in Nusa Lembongan'
    ],
    overview: 'Restore mind and spirit in Indonesia’s most enchanted sanctuary. Wake up to tropical mist swirling over emerald rice terraces, breathe fragrant frangipani blossoms, and experience rejuvenating spa traditions.',
    included: [
      'Boutique luxury pool villa accommodations in Ubud & Uluwatu',
      'Daily wholesome tropical breakfast and farm-to-table lunches',
      'Daily private yoga, sound bath, and Ayurvedic wellness treatments',
      'Private air-conditioned SUV and personal chauffeur throughout',
      'Fast-track VIP airport clearance upon landing in Denpasar'
    ],
    notIncluded: [
      'International flights to Denpasar (DPS)',
      'Optional scuba diving certification courses'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Denpasar & Private Transfer to Ubud', description: 'VIP airport greeting and transfer to your open-air rainforest villa in Sayan. Welcome herbal elixir and evening reflexology.' },
      { day: 2, title: 'Tegallalang Sunrise & Botanical Walk', description: 'Dawn stroll through cascading rice paddies before travelers arrive. Breakfast overlooking the sacred volcanic valley.' },
      { day: 3, title: 'Sacred Water Purification Ceremony', description: 'Private blessing ceremony with a traditional Balinese healer at a secluded holy spring sanctuary.' },
      { day: 4, title: 'Ubud Artisans & Culinary Masterclass', description: 'Visit master woodcarvers and silver jewelers, followed by an organic cooking class in a working permaculture farm.' },
      { day: 5, title: 'Transfer to Uluwatu Clifftop Villa', description: 'Drive south to the dramatic limestone cliffs of the Bukit Peninsula. Relax by your private horizon plunge pool.' },
      { day: 6, title: 'Private Catamaran & Cliffside Sunset Dinner', description: 'Charter to crystal-clear reef lagoons for snorkeling, returning in time for a cliffside sunset seafood barbecue.' },
      { day: 7, title: 'Farewell Wellness Ritual & Departure', description: 'Closing floral bath treatment before seamless transfer to Denpasar International Airport.' }
    ]
  },
  {
    id: 'pkg-santorini-odyssey',
    title: 'Aegean Odyssey: Santorini & Cyclades',
    destinationId: 'santorini',
    destinationName: 'Santorini & Cyclades',
    country: 'Greece',
    duration: '9 Days / 8 Nights',
    pricePerPerson: 3950,
    rating: 4.95,
    reviewsCount: 104,
    category: 'Luxury Retreats & Mediterranean Romance',
    imageUrl: santoriniImage,
    highlights: [
      'Cave suite carved into Oia’s caldera cliff with private heated infinity pool',
      'Private sunset catamaran sailing with freshly prepared Greek feast',
      'Volcanic wine estate tour sampling century-old Assyrtiko vines',
      'Exclusive helicopter hop to hidden beaches in Milos and Folegandros'
    ],
    overview: 'Gaze over the deep azure caldera from sun-drenched marble verandas. A romantic Mediterranean escape rich with authentic island charm, ancient archaeology, and world-class wine.',
    included: [
      '5-star luxury cliffside suite accommodations with caldera vistas',
      'Champagne breakfasts served on your private terrace each morning',
      'Private sunset sailing charter with open Mediterranean bar',
      'Private chauffeured luxury Mercedes van throughout Santorini',
      'All archaeological site entrance permits with licensed guide'
    ],
    notIncluded: [
      'International flights to Athens/Santorini',
      'Personal yacht charters beyond included package'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Santorini & Welcome Terrace Sunset', description: 'Private transfer to your cliffside suite in Oia. Chilled Santorini wine and local cheeses awaiting your arrival.' },
      { day: 2, title: 'Walking the Caldera Ridge: Imerovigli to Oia', description: 'Guided morning walk along the scenic cliff edge with panoramic views of the volcanic islands and shimmering sea.' },
      { day: 3, title: 'Private Sunset Catamaran Cruise', description: 'Sail past Red Beach and the White Beach to the volcanic thermal springs. Sunset dinner anchored beneath Oia’s cliffs.' },
      { day: 4, title: 'Volcanic Terroir Wine Safari', description: 'Visit three historic wineries to taste indigenous grapes cultivated in unique basket-shaped volcanic vines.' },
      { day: 5, title: 'Prehistoric Akrotiri & Black Sand Beaches', description: 'Explore the remarkably preserved Bronze Age settlement with an archaeologist, followed by lunch at Perivolos beach.' },
      { day: 6, title: 'Day Trip to Secluded Folegandros', description: 'Private speedboat transfer to the tranquil neighbor island for an authentic Greek village lunch and quiet coves.' },
      { day: 7, title: 'Culinary Masterclass with Island Chef', description: 'Learn the secrets of Greek island cuisine: tomato keftedes, fresh octopus, and honeyed baklava with local walnuts.' },
      { day: 8, title: 'Celebration Dinner in Clifftop Garden', description: 'Intimate candlelit dining perched high above the illuminated Aegean sea, savoring seasonal Mediterranean dishes.' },
      { day: 9, title: 'Farewell Morning Sun & Departure', description: 'Last peaceful coffee on your caldera terrace before private chauffeured transfer to Santorini Airport.' }
    ]
  }
];

export const WHY_CHOOSE_US_FEATURES = [
  {
    id: 'itineraries',
    title: 'Personalised Itineraries',
    description: 'Every journey is tailored around your personal passions, travel tempo, and lifestyle preferences. No rigid group schedules or cookie-cutter routes.',
    metric: '100% Bespoke',
    subtext: 'Tailored to your individual rhythm'
  },
  {
    id: 'guides',
    title: 'Expert Local Guides',
    description: 'We connect you with licensed scholars, master artisans, and native residents who unlock secret doorways and share generational stories.',
    metric: '120+ Curators',
    subtext: 'Vetted cultural & wilderness specialists'
  },
  {
    id: 'pricing',
    title: 'Transparent Pricing',
    description: 'Clear, comprehensive quotes with zero hidden booking surcharges. All luxury accommodations, private transfers, and excursions itemized honestly.',
    metric: 'Zero Hidden Fees',
    subtext: 'Guaranteed upfront pricing transparency'
  },
  {
    id: 'support',
    title: '24/7 Travel Assistance',
    description: 'A dedicated personal travel concierge stays on call around the clock to handle flight adjustments, reservations, and unexpected changes instantly.',
    metric: '< 5 Min Response',
    subtext: 'Real human support at any hour worldwide'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Elena & Marcus Vance',
    location: 'Geneva & London',
    tripTaken: 'Alpine Serenity & Swiss Grandeur',
    rating: 5,
    story: 'Wanderly curated an anniversary trip to Switzerland that exceeded every expectation. From the private helicopter over the Matterhorn to an intimate chalet dinner that was entirely arranged for the two of us, every minute felt effortless and deeply poetic.',
    travelYear: 'October 2025',
    avatarSeed: 'EV',
    highlightPhrase: 'Every minute felt effortless and deeply poetic.'
  },
  {
    id: 'test-2',
    author: 'Kenji Takahashi & Claire Laurent',
    location: 'Paris & Tokyo',
    tripTaken: 'Kyoto Zen & Ancient Capitals',
    rating: 5,
    story: 'As someone who has traveled to Japan several times, I was astonished by the access Wanderly provided. Entering Daitoku-ji before sunrise in absolute quietness and speaking with the temple abbot was an unforgettable spiritual highlight of my life.',
    travelYear: 'November 2025',
    avatarSeed: 'KT',
    highlightPhrase: 'Astonished by the rare access and quiet reverence.'
  },
  {
    id: 'test-3',
    author: 'Dr. Arthur Sterling',
    location: 'San Francisco, CA',
    tripTaken: 'Balinese Soul & Wellness Sanctuary',
    rating: 5,
    story: 'After a relentless year of surgery, I needed genuine stillness. The secluded bamboo villa in Ubud and the water blessing ritual recommended by Wanderly renewed my spirit. Their 24/7 concierge resolved our flight delay before we even landed in Denpasar.',
    travelYear: 'January 2026',
    avatarSeed: 'AS',
    highlightPhrase: 'Renewed my spirit in ways ordinary travel never could.'
  },
  {
    id: 'test-4',
    author: 'Sofia & Mateo Rossi',
    location: 'Milan, Italy',
    tripTaken: 'Aegean Odyssey: Santorini & Cyclades',
    rating: 5,
    story: 'We were skeptical about Santorini because of tourist crowds, but Wanderly’s team showed us a completely different world. Private cliffside paths, secret vineyards in Megalochori, and a sunset catamaran where we were the only guests. Truly extraordinary.',
    travelYear: 'August 2025',
    avatarSeed: 'SR',
    highlightPhrase: 'Showed us a secret, peaceful side of the Aegean.'
  }
];
