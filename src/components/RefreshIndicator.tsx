
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { RefreshCw } from "lucide-react";

interface RefreshIndicatorProps {
  interval?: number; // in seconds
  onRefresh?: () => void;
  className?: string;
}

const RefreshIndicator = ({
  interval = 10,
  onRefresh,
  className,
}: RefreshIndicatorProps) => {
  const [timeLeft, setTimeLeft] = useState(interval);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRefreshing(true);
          if (onRefresh) {
            onRefresh();
          }
          setTimeout(() => {
            setIsRefreshing(false);
          }, 1000);
          return interval;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [interval, onRefresh]);

  const progress = ((interval - timeLeft) / interval) * 100;

  return (
    <div className={cn("relative flex items-center gap-2", className)}>
      <div className="relative w-5 h-5">
        <svg
          className="w-5 h-5 -rotate-90"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeOpacity="0.1"
          />
          <circle
            cx="12"
            cy="12"
            r="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray={`${2 * Math.PI * 10}`}
            strokeDashoffset={`${2 * Math.PI * 10 * (1 - progress / 100)}`}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <RefreshCw
          className={cn(
            "w-3 h-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground",
            isRefreshing && "animate-spin text-primary"
          )}
        />
      </div>
      <span className="text-xs text-muted-foreground">
        Refreshing in {timeLeft}s
      </span>
    </div>
  );
};

export default RefreshIndicator;
