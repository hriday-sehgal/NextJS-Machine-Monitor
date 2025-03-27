
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useEffect } from "react";
import { toast } from "sonner";

export const useMachines = (autoRefresh = true) => {
  const queryClient = useQueryClient();
  
  const { data: machines, isLoading, error } = useQuery({
    queryKey: ['machines'],
    queryFn: () => api.getAllMachines(),
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: true,
  });
  
  // Set up auto-refresh every 10 seconds
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ['machines'] });
    }, 10000);
    
    return () => clearInterval(interval);
  }, [queryClient, autoRefresh]);
  
  return {
    machines,
    isLoading,
    error: error as Error | null,
  };
};

export const useMachineDetails = (id: number, autoRefresh = true) => {
  const queryClient = useQueryClient();
  
  const { data: machine, isLoading, error } = useQuery({
    queryKey: ['machine', id],
    queryFn: () => api.getMachineById(id),
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: true,
    meta: {
      onError: (error: Error) => {
        toast.error(error.message);
      }
    }
  });
  
  // Set up auto-refresh every 10 seconds
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ['machine', id] });
    }, 10000);
    
    return () => clearInterval(interval);
  }, [queryClient, id, autoRefresh]);
  
  return {
    machine,
    isLoading,
    error: error as Error | null,
  };
};
