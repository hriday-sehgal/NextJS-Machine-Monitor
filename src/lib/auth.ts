
import { toast } from "sonner";

// Constants
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

// Function to store auth data in localStorage
export const storeAuthData = (token: string, user: { email: string, name: string }) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

// Function to get the stored token
export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
};

// Function to get the stored user
export const getUser = () => {
  if (typeof window === 'undefined') return null;
  const userJson = localStorage.getItem(USER_KEY);
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson);
  } catch (error) {
    console.error('Failed to parse user data:', error);
    return null;
  }
};

// Function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

// Function to clear auth data (logout)
export const clearAuthData = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

// Function to handle logout
export const logout = () => {
  clearAuthData();
  window.location.href = '/login';
  toast.success('You have been logged out successfully');
};
