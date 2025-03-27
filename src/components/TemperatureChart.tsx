
import { TemperatureReading } from "@/types/machine";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface TemperatureChartProps {
  temperatureHistory?: TemperatureReading[];
}

const TemperatureChart = ({ temperatureHistory = [] }: TemperatureChartProps) => {
  const sortedData = [...temperatureHistory].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  // Format data for the chart
  const chartData = sortedData.map(reading => ({
    timestamp: reading.timestamp,
    temperature: reading.value,
    // Format timestamp for display
    time: format(new Date(reading.timestamp), "HH:mm"),
  }));

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.6, ease: "easeOut" } },
  };

  // Get min and max temperature for chart domain with a buffer
  const temperatures = chartData.map(d => d.temperature);
  const minTemp = Math.floor(Math.min(...temperatures) - 5);
  const maxTemp = Math.ceil(Math.max(...temperatures) + 5);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-950 p-3 border rounded-lg shadow-md">
          <p className="font-medium text-sm">{`${format(new Date(payload[0].payload.timestamp), "HH:mm, dd MMM")}`}</p>
          <p className="text-primary font-medium">{`${payload[0].value}°C`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="w-full"
    >
      <Card className="border border-border bg-white dark:bg-gray-950 shadow-lg overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle>Temperature Trend</CardTitle>
          <CardDescription>24-hour temperature history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis 
                  dataKey="time" 
                  tickMargin={10}
                  tickFormatter={(value) => value}
                  stroke="#888"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  domain={[minTemp, maxTemp]}
                  tickMargin={10}
                  tickFormatter={(value) => `${value}°C`}
                  stroke="#888"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="temperature"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#temperatureGradient)"
                  activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2, fill: '#fff' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TemperatureChart;
