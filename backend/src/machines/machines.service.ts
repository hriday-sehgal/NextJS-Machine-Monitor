
import { Injectable, NotFoundException } from '@nestjs/common';
import { Machine } from './interfaces/machine.interface';
import { UpdateMachineDto } from './dto/update-machine.dto';

@Injectable()
export class MachinesService {
  private machines: Machine[] = [
    {
      id: 1,
      name: "Lathe Machine",
      status: "Running",
      temperature: 75,
      energyConsumption: 1200,
      serialNumber: "LT-2023-001",
      manufacturer: "Industrial Tech",
      installDate: "2023-02-15",
      lastMaintenance: "2023-09-10",
      location: "Factory Floor A",
      model: "LT-5000",
      temperatureHistory: Array.from({ length: 24 }, (_, i) => ({
        timestamp: new Date(Date.now() - i * 3600000).toISOString(),
        value: 75 + Math.sin(i * 0.5) * 5
      }))
    },
    {
      id: 2,
      name: "CNC Milling Machine",
      status: "Idle",
      temperature: 65,
      energyConsumption: 800,
      serialNumber: "CNC-2022-452",
      manufacturer: "PrecisionTools",
      installDate: "2022-11-05",
      lastMaintenance: "2023-08-20",
      location: "Factory Floor B",
      model: "CNC-X200",
      temperatureHistory: Array.from({ length: 24 }, (_, i) => ({
        timestamp: new Date(Date.now() - i * 3600000).toISOString(),
        value: 65 + Math.sin(i * 0.5) * 4
      }))
    },
    {
      id: 3,
      name: "Injection Molding Machine",
      status: "Stopped",
      temperature: 85,
      energyConsumption: 1500,
      serialNumber: "IMM-2021-873",
      manufacturer: "PlasticTech",
      installDate: "2021-06-30",
      lastMaintenance: "2023-07-15",
      location: "Factory Floor A",
      model: "IMM-9000",
      temperatureHistory: Array.from({ length: 24 }, (_, i) => ({
        timestamp: new Date(Date.now() - i * 3600000).toISOString(),
        value: 85 + Math.sin(i * 0.5) * 6
      }))
    }
  ];

  getAllMachines(): Machine[] {
    return this.machines;
  }

  getMachineById(id: number): Machine {
    const machine = this.machines.find(m => m.id === id);
    if (!machine) {
      throw new NotFoundException(`Machine with ID ${id} not found`);
    }
    return machine;
  }

  updateMachine(id: number, updateMachineDto: UpdateMachineDto): Machine {
    const machineIndex = this.machines.findIndex(m => m.id === id);
    if (machineIndex === -1) {
      throw new NotFoundException(`Machine with ID ${id} not found`);
    }

    const updatedMachine = {
      ...this.machines[machineIndex],
      ...updateMachineDto,
      temperatureHistory: [
        {
          timestamp: new Date().toISOString(),
          value: updateMachineDto.temperature || this.machines[machineIndex].temperature
        },
        ...(this.machines[machineIndex].temperatureHistory || []).slice(0, 23)
      ]
    };

    this.machines[machineIndex] = updatedMachine;
    return updatedMachine;
  }
}
