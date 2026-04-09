import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "@/services/admin.service";
import { DashboardData } from "@/types/dashboard.types";

export const useAdminDashboard = () => {
  return useQuery<DashboardData>({
    queryKey: ["admin-dashboard"],
    queryFn: getDashboardData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};