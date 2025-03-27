
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/lib/auth";
import { useMachineDetails } from "@/hooks/useMachine";
import Header from "@/components/Header";
import MachineDetailCard from "@/components/MachineDetailCard";
import TemperatureChart from "@/components/TemperatureChart";
import RefreshIndicator from "@/components/RefreshIndicator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const MachineDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const machineId = parseInt(id || "0");
  
  const { machine, isLoading, error } = useMachineDetails(machineId);

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["machine", machineId] });
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container py-6 md:py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBack}
              className="gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {isLoading ? "Loading..." : machine?.name}
              </h1>
              <p className="text-muted-foreground">Machine details and metrics</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <RefreshIndicator onRefresh={handleRefresh} />
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="flex gap-2 items-center"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        {error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-red-800 dark:text-red-300">
            <p>Error loading machine details: {error.message}</p>
            <div className="flex gap-4 mt-4">
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                Try again
              </Button>
              <Button variant="outline" size="sm" onClick={handleBack}>
                Back to dashboard
              </Button>
            </div>
          </div>
        ) : isLoading ? (
          <div className="space-y-6">
            <div className="h-64 bg-muted/50 animate-pulse rounded-xl" />
            <div className="h-80 bg-muted/50 animate-pulse rounded-xl" />
          </div>
        ) : machine ? (
          <div className="space-y-6">
            <MachineDetailCard machine={machine} />
            <TemperatureChart temperatureHistory={machine.temperatureHistory} />
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default MachineDetails;
