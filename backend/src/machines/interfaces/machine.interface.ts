
export interface Machine {
  id: number;
  name: string;
  status: 'Running' | 'Idle' | 'Stopped';
  temperature: number;
  energyConsumption: number;
  // Additional details for machine detail page
  serialNumber?: string;
  manufacturer?: string;
  installDate?: string;
  lastMaintenance?: string;
  location?: string;
  model?: string;
  temperatureHistory?: TemperatureReading[];
}

export interface TemperatureReading {
  timestamp: string;
  value: number;
}
