
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/lib/auth";
import { useMachines } from "@/hooks/useMachine";
import Header from "@/components/Header";
import MachineTable from "@/components/MachineTable";
import RefreshIndicator from "@/components/RefreshIndicator";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { machines, isLoading, error } = useMachines();

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["machines"] });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container py-6 md:py-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-6"
        >
          <motion.div 
            variants={itemVariants}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Monitor and manage your machine fleet
              </p>
            </div>

            <div className="flex items-center gap-4">
              <RefreshIndicator onRefresh={handleRefresh} />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                className="flex gap-2 items-center"
              >
                <RotateCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="grid gap-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold tracking-tight">Machines</h2>
                <p className="text-sm text-muted-foreground">
                  A list of all machines and their current status
                </p>
              </div>

              {error ? (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-800 dark:text-red-300">
                  <p>Error loading machines: {error.message}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleRefresh}
                    className="mt-2"
                  >
                    Try again
                  </Button>
                </div>
              ) : (
                <MachineTable machines={machines || []} isLoading={isLoading} />
              )}
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
