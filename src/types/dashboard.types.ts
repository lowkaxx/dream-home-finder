export interface DashboardKPIs {
  totalProperties: number;
  totalLeads: number;
  pendingAppointments: number;
  totalFavorites: number;
  conversionRate: number;
  activeListings: number;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyId: string;
  propertyTitle: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
}

export interface Appointment {
  id: string;
  propertyId: string;
  propertyTitle: string;
  userName: string;
  userEmail: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface PopularNeighborhood {
  name: string;
  count: number;
}

export interface PropertyView {
  propertyId: string;
  title: string;
  views: number;
}

export interface Simulation {
  id: string;
  userName: string;
  propertyTitle: string;
  loanAmount: number;
  monthlyPayment: number;
  createdAt: string;
}

export interface DashboardData {
  kpis: DashboardKPIs;
  leads: Lead[];
  appointments: Appointment[];
  popularNeighborhoods: PopularNeighborhood[];
  topViewedProperties: PropertyView[];
  recentFavorites: { propertyTitle: string; userName: string; createdAt: string }[];
  simulations: Simulation[];
}