
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { isAuthenticated } from "@/lib/auth";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleBack = () => {
    if (isAuthenticated()) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-gray-50 dark:from-gray-900 dark:to-gray-950 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-8xl font-bold text-gray-300 dark:text-gray-700">404</h1>
            <h2 className="text-2xl font-bold tracking-tight">Page not found</h2>
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Button onClick={handleBack}>
              Return to {isAuthenticated() ? "Dashboard" : "Login"}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
