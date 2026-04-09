import { supabase } from "@/integrations/supabase/client";
import { DashboardData, DashboardKPIs, Lead, Appointment, PopularNeighborhood, PropertyView, Simulation } from "@/types/dashboard.types";

// Mock data for now - in production, these would come from Supabase tables
export const getDashboardKPIs = async (): Promise<DashboardKPIs> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    totalProperties: 156,
    totalLeads: 89,
    pendingAppointments: 12,
    totalFavorites: 234,
    conversionRate: 23.5,
    activeListings: 142
  };
};

export const getLeads = async (): Promise<Lead[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  return [
    {
      id: "1",
      name: "João Silva",
      email: "joao@email.com",
      phone: "(11) 99999-9999",
      propertyId: "prop1",
      propertyTitle: "Apartamento 3 quartos Centro",
      createdAt: "2024-04-01T10:00:00Z",
      status: "new"
    },
    {
      id: "2",
      name: "Maria Santos",
      email: "maria@email.com",
      phone: "(11) 88888-8888",
      propertyId: "prop2",
      propertyTitle: "Casa 4 quartos Vila Madalena",
      createdAt: "2024-04-02T14:30:00Z",
      status: "contacted"
    }
  ];
};

export const getAppointments = async (): Promise<Appointment[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  return [
    {
      id: "1",
      propertyId: "prop1",
      propertyTitle: "Apartamento 3 quartos Centro",
      userName: "João Silva",
      userEmail: "joao@email.com",
      date: "2024-04-05",
      time: "15:00",
      status: "pending"
    },
    {
      id: "2",
      propertyId: "prop2",
      propertyTitle: "Casa 4 quartos Vila Madalena",
      userName: "Maria Santos",
      userEmail: "maria@email.com",
      date: "2024-04-06",
      time: "10:00",
      status: "confirmed"
    }
  ];
};

export const getPopularNeighborhoods = async (): Promise<PopularNeighborhood[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));

  return [
    { name: "Centro", count: 45 },
    { name: "Vila Madalena", count: 38 },
    { name: "Pinheiros", count: 32 },
    { name: "Moema", count: 28 },
    { name: "Itaim Bibi", count: 25 }
  ];
};

export const getTopViewedProperties = async (): Promise<PropertyView[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));

  return [
    { propertyId: "prop1", title: "Apartamento 3 quartos Centro", views: 1250 },
    { propertyId: "prop2", title: "Casa 4 quartos Vila Madalena", views: 980 },
    { propertyId: "prop3", title: "Cobertura 4 quartos Jardins", views: 875 }
  ];
};

export const getRecentFavorites = async (): Promise<{ propertyTitle: string; userName: string; createdAt: string }[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));

  return [
    { propertyTitle: "Apartamento 3 quartos Centro", userName: "João Silva", createdAt: "2024-04-03T09:15:00Z" },
    { propertyTitle: "Casa 4 quartos Vila Madalena", userName: "Maria Santos", createdAt: "2024-04-03T08:45:00Z" }
  ];
};

export const getSimulations = async (): Promise<Simulation[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));

  return [
    {
      id: "1",
      userName: "João Silva",
      propertyTitle: "Apartamento 3 quartos Centro",
      loanAmount: 500000,
      monthlyPayment: 2850,
      createdAt: "2024-04-02T16:20:00Z"
    },
    {
      id: "2",
      userName: "Maria Santos",
      propertyTitle: "Casa 4 quartos Vila Madalena",
      loanAmount: 800000,
      monthlyPayment: 4560,
      createdAt: "2024-04-01T11:30:00Z"
    }
  ];
};

export const getDashboardData = async (): Promise<DashboardData> => {
  const [kpis, leads, appointments, popularNeighborhoods, topViewedProperties, recentFavorites, simulations] = await Promise.all([
    getDashboardKPIs(),
    getLeads(),
    getAppointments(),
    getPopularNeighborhoods(),
    getTopViewedProperties(),
    getRecentFavorites(),
    getSimulations()
  ]);

  return {
    kpis,
    leads,
    appointments,
    popularNeighborhoods,
    topViewedProperties,
    recentFavorites,
    simulations
  };
};