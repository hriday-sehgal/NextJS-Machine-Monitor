
import { Machine } from "@/types/machine";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusBadge from "@/components/StatusBadge";
import { useNavigate } from "react-router-dom";

interface MachineTableProps {
  machines: Machine[];
  isLoading: boolean;
}

const MachineTable: React.FC<MachineTableProps> = ({ machines, isLoading }) => {
  const navigate = useNavigate();

  const handleRowClick = (id: number) => {
    navigate(`/machine/${id}`);
  };

  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Temperature (°C)</TableHead>
              <TableHead className="text-right">Energy Consumption (kWh)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(3)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="h-5 w-24 bg-muted/50 animate-pulse rounded"></div>
                </TableCell>
                <TableCell>
                  <div className="h-5 w-16 bg-muted/50 animate-pulse rounded"></div>
                </TableCell>
                <TableCell>
                  <div className="h-5 w-12 bg-muted/50 animate-pulse rounded"></div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="h-5 w-14 bg-muted/50 animate-pulse rounded ml-auto"></div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Temperature (°C)</TableHead>
            <TableHead className="text-right">Energy Consumption (kWh)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {machines.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                No machines found
              </TableCell>
            </TableRow>
          ) : (
            machines.map((machine) => (
              <TableRow
                key={machine.id}
                onClick={() => handleRowClick(machine.id)}
                className="cursor-pointer hover:bg-muted/50"
              >
                <TableCell className="font-medium">{machine.name}</TableCell>
                <TableCell>
                  <StatusBadge status={machine.status} />
                </TableCell>
                <TableCell>{machine.temperature}</TableCell>
                <TableCell className="text-right">{machine.energyConsumption}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MachineTable;
