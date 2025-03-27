import { AuthResponse, LoginCredentials, Machine, MachineUpdatePayload } from "@/types/machine";
import { getToken } from "./auth";

// Base API URL - this would point to your NestJS backend
const API_URL = 'http://localhost:3001'; 

// Helper function for handling API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    // Try to parse the error response
    let errorMessage;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || `Error: ${response.status}`;
    } catch (e) {
      errorMessage = `Error: ${response.status}`;
    }
    throw new Error(errorMessage);
  }
  return response.json();
};

// Function to get auth headers
const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

// Auth API functions
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },
};

// Machines API functions
export const machinesApi = {
  getAllMachines: async (): Promise<Machine[]> => {
    const response = await fetch(`${API_URL}/machines`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
  
  getMachineById: async (id: number): Promise<Machine> => {
    const response = await fetch(`${API_URL}/machines/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
  
  updateMachine: async (id: number, data: MachineUpdatePayload): Promise<Machine> => {
    const response = await fetch(`${API_URL}/machines/${id}/update`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
};

// Mock API for development
export const mockApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check credentials
    if (credentials.email === 'admin@example.com' && credentials.password === 'password123') {
      return {
        token: 'mock-jwt-token',
        user: {
          email: 'admin@example.com',
          name: 'Admin User',
        },
      };
    }
    
    throw new Error('Invalid email or password');
  },
  
  getAllMachines: async (): Promise<Machine[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Return mock data
    return [
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
  },
  
  getMachineById: async (id: number): Promise<Machine> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get all machines and find the one with matching ID
    const machines = await mockApi.getAllMachines();
    const machine = machines.find(m => m.id === id);
    
    if (!machine) {
      throw new Error(`Machine with ID ${id} not found`);
    }
    
    return machine;
  },
  
  updateMachine: async (id: number, data: MachineUpdatePayload): Promise<Machine> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Get the machine
    const machine = await mockApi.getMachineById(id);
    
    // Update the machine
    const updatedMachine = {
      ...machine,
      ...data,
      temperatureHistory: [
        {
          timestamp: new Date().toISOString(),
          value: data.temperature || machine.temperature
        },
        ...(machine.temperatureHistory || []).slice(0, 23)
      ]
    };
    
    return updatedMachine;
  }
};

// Create a unified API interface with consistent methods for both real and mock APIs
const createUnifiedApi = (source: typeof mockApi | { authApi: typeof authApi, machinesApi: typeof machinesApi }) => {
  if ('authApi' in source) {
    // Real API
    return {
      login: source.authApi.login,
      getAllMachines: source.machinesApi.getAllMachines,
      getMachineById: source.machinesApi.getMachineById,
      updateMachine: source.machinesApi.updateMachine
    };
  } else {
    // Mock API
    return source;
  }
};

// Use the real API instead of mock
export const api = createUnifiedApi({
  authApi,
  machinesApi
});
