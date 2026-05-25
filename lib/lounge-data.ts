export type Lounge = {
  id: string;
  name: string;
  airport: string;
  airportCode: string;
  terminal: string;
  city: string;
  country: string;
  image: string;
  amenities: string[];
  capacity: number;
  rating: number;
  reviews: number;
  priceFrom: number;
  currency: string;
  occupancyPct: number;
  hours: string;
};

export const LOUNGES: Lounge[] = [
  {
    id: 'zrh-aspire',
    name: 'Aspire Lounge',
    airport: 'Zurich Airport',
    airportCode: 'ZRH',
    terminal: 'Terminal 2 · Gate E',
    city: 'Zurich',
    country: 'Switzerland',
    image:
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80',
    amenities: ['Showers', 'Champagne bar', 'À la carte dining', 'Quiet zone', 'Workstations'],
    capacity: 180,
    rating: 4.8,
    reviews: 1284,
    priceFrom: 65,
    currency: 'CHF',
    occupancyPct: 64,
    hours: '05:00 — 22:30',
  },
  {
    id: 'gva-alpine',
    name: 'Alpine Suite Lounge',
    airport: 'Geneva Airport',
    airportCode: 'GVA',
    terminal: 'Terminal 1 · Gate B',
    city: 'Geneva',
    country: 'Switzerland',
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80',
    amenities: ['Spa', 'Sleeping pods', 'Wine bar', 'Family room'],
    capacity: 140,
    rating: 4.7,
    reviews: 942,
    priceFrom: 70,
    currency: 'CHF',
    occupancyPct: 38,
    hours: '04:30 — 23:00',
  },
  {
    id: 'bsl-rhone',
    name: 'Rhône Business Lounge',
    airport: 'EuroAirport Basel',
    airportCode: 'BSL',
    terminal: 'Terminal · Gate 50',
    city: 'Basel',
    country: 'Switzerland',
    image:
      'https://images.unsplash.com/photo-1551776235-dde6d482980b?auto=format&fit=crop&w=1600&q=80',
    amenities: ['Co-working', 'Espresso bar', 'Press lounge'],
    capacity: 95,
    rating: 4.5,
    reviews: 612,
    priceFrom: 48,
    currency: 'CHF',
    occupancyPct: 22,
    hours: '06:00 — 21:00',
  },
  {
    id: 'abz-northern',
    name: 'Northern Lights Lounge',
    airport: 'Aberdeen Airport',
    airportCode: 'ABZ',
    terminal: 'Terminal · Departures',
    city: 'Aberdeen',
    country: 'United Kingdom',
    image:
      'https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?auto=format&fit=crop&w=1600&q=80',
    amenities: ['Window views', 'Hot buffet', 'Whisky bar'],
    capacity: 120,
    rating: 4.6,
    reviews: 533,
    priceFrom: 42,
    currency: 'GBP',
    occupancyPct: 71,
    hours: '04:00 — 20:15',
  },
];

export type SeatingZone = 'quiet' | 'workstation' | 'family' | 'window';

export type Table = {
  id: string;
  zone: SeatingZone;
  seats: number;
  available: boolean;
  position: { x: number; y: number };
};

export const ZONE_META: Record<
  SeatingZone,
  { label: string; description: string; color: string }
> = {
  quiet: {
    label: 'Quiet Zone',
    description: 'Silent area for rest, reading and reflection.',
    color: '#9FB4A8',
  },
  workstation: {
    label: 'Workstation',
    description: 'Power outlets, large desk and noise-cancelling pods.',
    color: '#8A9BB8',
  },
  family: {
    label: 'Family Area',
    description: 'Soft seating, kids corner and high chairs.',
    color: '#D4A88B',
  },
  window: {
    label: 'Window View',
    description: 'Runway-facing seats with panoramic glass.',
    color: '#B59D88',
  },
};

export const TABLES: Table[] = [
  // Quiet
  { id: 'Q1', zone: 'quiet', seats: 2, available: true, position: { x: 12, y: 18 } },
  { id: 'Q2', zone: 'quiet', seats: 2, available: false, position: { x: 24, y: 18 } },
  { id: 'Q3', zone: 'quiet', seats: 4, available: true, position: { x: 12, y: 32 } },
  { id: 'Q4', zone: 'quiet', seats: 2, available: true, position: { x: 24, y: 32 } },
  // Workstation
  { id: 'W1', zone: 'workstation', seats: 1, available: true, position: { x: 44, y: 18 } },
  { id: 'W2', zone: 'workstation', seats: 1, available: true, position: { x: 54, y: 18 } },
  { id: 'W3', zone: 'workstation', seats: 1, available: false, position: { x: 64, y: 18 } },
  { id: 'W4', zone: 'workstation', seats: 2, available: true, position: { x: 44, y: 32 } },
  { id: 'W5', zone: 'workstation', seats: 2, available: true, position: { x: 60, y: 32 } },
  // Family
  { id: 'F1', zone: 'family', seats: 4, available: true, position: { x: 14, y: 60 } },
  { id: 'F2', zone: 'family', seats: 6, available: false, position: { x: 30, y: 60 } },
  { id: 'F3', zone: 'family', seats: 4, available: true, position: { x: 14, y: 76 } },
  // Window
  { id: 'V1', zone: 'window', seats: 2, available: true, position: { x: 80, y: 24 } },
  { id: 'V2', zone: 'window', seats: 2, available: true, position: { x: 80, y: 38 } },
  { id: 'V3', zone: 'window', seats: 4, available: false, position: { x: 80, y: 56 } },
  { id: 'V4', zone: 'window', seats: 2, available: true, position: { x: 80, y: 72 } },
];

export type QueueEntry = {
  id: string;
  name: string;
  initials: string;
  party: number;
  preference: SeatingZone;
  joinedAt: string;
  estimatedWait: number; // minutes
  status: 'waiting' | 'notified' | 'seated' | 'expired';
};

export const QUEUE_INITIAL: QueueEntry[] = [
  { id: 'q-001', name: 'M. Brunner', initials: 'MB', party: 2, preference: 'window', joinedAt: '13:42', estimatedWait: 14, status: 'notified' },
  { id: 'q-002', name: 'A. Laurent', initials: 'AL', party: 1, preference: 'workstation', joinedAt: '13:48', estimatedWait: 18, status: 'waiting' },
  { id: 'q-003', name: 'S. Patel',   initials: 'SP', party: 4, preference: 'family',      joinedAt: '13:51', estimatedWait: 25, status: 'waiting' },
  { id: 'q-004', name: 'N. Keller',  initials: 'NK', party: 2, preference: 'quiet',       joinedAt: '13:55', estimatedWait: 28, status: 'waiting' },
  { id: 'q-005', name: 'R. Moreau',  initials: 'RM', party: 3, preference: 'window',      joinedAt: '13:58', estimatedWait: 32, status: 'waiting' },
];

export const TIME_SLOTS = [
  '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
];

export const MEMBERSHIPS = [
  { id: 'priority-pass', label: 'Priority Pass', perk: 'Included' },
  { id: 'loyalty',       label: 'Airline Loyalty',   perk: 'Verify status' },
  { id: 'credit-card',   label: 'Premium Credit Card', perk: 'Verify card' },
  { id: 'pay',           label: 'Direct payment',  perk: 'Pay per visit' },
];

export const OCCUPANCY_FORECAST = [
  { hour: '06', value: 18 },
  { hour: '07', value: 32 },
  { hour: '08', value: 48 },
  { hour: '09', value: 56 },
  { hour: '10', value: 64 },
  { hour: '11', value: 72 },
  { hour: '12', value: 81 },
  { hour: '13', value: 76 },
  { hour: '14', value: 64 },
  { hour: '15', value: 58 },
  { hour: '16', value: 66 },
  { hour: '17', value: 78 },
  { hour: '18', value: 84 },
  { hour: '19', value: 72 },
  { hour: '20', value: 54 },
];

export const FLIGHTS = [
  { code: 'LX 318', dest: 'London Heathrow', sched: '14:35', status: 'On time',  gate: 'A12' },
  { code: 'BA 715', dest: 'Edinburgh',        sched: '14:50', status: 'Boarding', gate: 'A18' },
  { code: 'AF 1213', dest: 'Paris CDG',       sched: '15:05', status: 'Delayed +15', gate: 'B04' },
  { code: 'KL 1924', dest: 'Amsterdam',       sched: '15:20', status: 'On time',  gate: 'B12' },
  { code: 'EW 553',  dest: 'Düsseldorf',      sched: '15:40', status: 'On time',  gate: 'C02' },
  { code: 'LX 412',  dest: 'Madrid',          sched: '16:00', status: 'On time',  gate: 'A21' },
];
