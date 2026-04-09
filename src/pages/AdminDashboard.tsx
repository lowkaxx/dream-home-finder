import { motion } from "framer-motion";
import {
  Building,
  Users,
  Calendar,
  Heart,
  TrendingUp,
  Home
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import KPICard from "@/components/KPICard";
import { ViewsChart, NeighborhoodChart, ConversionChart } from "@/components/Charts";
import { LeadsTable, AppointmentsTable } from "@/components/DataTable";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";

const AdminDashboard = () => {
  const { data, isLoading, error } = useAdminDashboard();

  if (isLoading) {
    return (
      <AdminLayout>
        <DashboardSkeleton />
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center min-h-96"
        >
          <div className="text-center">
            <p className="text-lg font-medium text-muted-foreground mb-2">
              Erro ao carregar dados
            </p>
            <p className="text-sm text-muted-foreground">
              Tente recarregar a página
            </p>
          </div>
        </motion.div>
      </AdminLayout>
    );
  }

  if (!data) {
    return (
      <AdminLayout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center min-h-96"
        >
          <div className="text-center">
            <p className="text-lg font-medium text-muted-foreground">
              Nenhum dado encontrado
            </p>
          </div>
        </motion.div>
      </AdminLayout>
    );
  }

  const { kpis, leads, appointments, popularNeighborhoods, topViewedProperties } = data;

  // Mock data for conversion chart
  const conversionData = [
    { month: 'Jan', leads: 65, conversions: 15 },
    { month: 'Fev', leads: 78, conversions: 18 },
    { month: 'Mar', leads: 82, conversions: 22 },
    { month: 'Abr', leads: 89, conversions: 21 },
  ];

  return (
    <AdminLayout currentPage="dashboard">
      <div className="space-y-8">
        {/* KPIs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6"
        >
          <KPICard
            title="Total Imóveis"
            value={kpis.totalProperties}
            icon={Building}
            trend={{ value: 12, isPositive: true }}
            delay={0}
          />
          <KPICard
            title="Total Leads"
            value={kpis.totalLeads}
            icon={Users}
            trend={{ value: 8, isPositive: true }}
            delay={0.1}
          />
          <KPICard
            title="Agendamentos Pendentes"
            value={kpis.pendingAppointments}
            icon={Calendar}
            trend={{ value: -3, isPositive: false }}
            delay={0.2}
          />
          <KPICard
            title="Total Favoritos"
            value={kpis.totalFavorites}
            icon={Heart}
            trend={{ value: 15, isPositive: true }}
            delay={0.3}
          />
          <KPICard
            title="Taxa Conversão"
            value={`${kpis.conversionRate}%`}
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
            delay={0.4}
          />
          <KPICard
            title="Lançamentos Ativos"
            value={kpis.activeListings}
            icon={Home}
            trend={{ value: 7, isPositive: true }}
            delay={0.5}
          />
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ViewsChart data={topViewedProperties} />
          <NeighborhoodChart data={popularNeighborhoods} />
          <div className="lg:col-span-2">
            <ConversionChart data={conversionData} />
          </div>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LeadsTable leads={leads} />
          <AppointmentsTable appointments={appointments} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
