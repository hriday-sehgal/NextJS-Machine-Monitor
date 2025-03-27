
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

export interface MachineUpdatePayload {
  status?: 'Running' | 'Idle' | 'Stopped';
  temperature?: number;
  energyConsumption?: number;
}

export interface AuthResponse {
  token: string;
  user: {
    email: string;
    name: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}
