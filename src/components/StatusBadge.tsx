
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: 'Running' | 'Idle' | 'Stopped';
  className?: string;
  showDot?: boolean;
}

const StatusBadge = ({ status, className, showDot = true }: StatusBadgeProps) => {
  const statusClasses = {
    Running: "status-running",
    Idle: "status-idle",
    Stopped: "status-stopped",
  };

  return (
    <span className={cn("status-badge", statusClasses[status], className)}>
      {showDot && (
        <span 
          className={cn(
            "w-2 h-2 rounded-full animate-pulse-slow",
            status === "Running" && "bg-status-running",
            status === "Idle" && "bg-status-idle",
            status === "Stopped" && "bg-status-stopped"
          )}
        />
      )}
      {status}
    </span>
  );
};

export default StatusBadge;
