
import { Machine } from "@/types/machine";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StatusBadge from "./StatusBadge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

interface MachineDetailCardProps {
  machine: Machine;
}

const MachineDetailCard = ({ machine }: MachineDetailCardProps) => {
  const detailItems = [
    { label: "Serial Number", value: machine.serialNumber || "N/A" },
    { label: "Manufacturer", value: machine.manufacturer || "N/A" },
    { label: "Model", value: machine.model || "N/A" },
    { label: "Install Date", value: machine.installDate || "N/A" },
    { label: "Last Maintenance", value: machine.lastMaintenance || "N/A" },
    { label: "Location", value: machine.location || "N/A" },
  ];

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">{machine.name}</CardTitle>
              <CardDescription>Machine Details</CardDescription>
            </div>
            <StatusBadge status={machine.status} className="text-sm" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">Temperature</span>
                <span className="text-3xl font-bold">
                  {machine.temperature}
                  <span className="text-lg font-normal text-muted-foreground ml-1">°C</span>
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">Energy Consumption</span>
                <span className="text-3xl font-bold">
                  {machine.energyConsumption}
                  <span className="text-lg font-normal text-muted-foreground ml-1">kWh</span>
                </span>
              </div>
            </div>

            <Separator className="my-2" />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {detailItems.map((item, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MachineDetailCard;
