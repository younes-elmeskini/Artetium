"use client";
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Type pour une voiture
export type Car = {
  id: string;
  name: string;
  type: string;
  image?: string;
  cover: string;
  price: string;
  seats: number;
  dors: number;
  quantity: number;
  transmission: string;
  fuelType: string;
  airConditioning: boolean;
  brand?: string;
  gamme?: string;
  [key: string]: unknown;
};

// Type pour les filtres
export type CarFilters = {
  gamme?: string;
  carType?: string;
  brand?: string;
  fuelType?: string;
  transmission?: string;
  limit?: number;
};

// Type pour le contexte
interface CarContextType {
  cars: Car[];
  setCars: (cars: Car[]) => void;
  refreshCars: (filters?: CarFilters) => Promise<void>;
  addCar: (car: Car) => void;
  updateCar: (carId: string, updatedCar: Partial<Car>) => void;
  deleteCar: (carId: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  currentFilters: CarFilters;
  setCurrentFilters: (filters: CarFilters) => void;
}

// Créer le contexte
const CarContext = createContext<CarContextType | undefined>(undefined);

// Hook personnalisé pour utiliser le contexte
export function useCarContext() {
  const context = useContext(CarContext);
  if (context === undefined) {
    throw new Error('useCarContext must be used within a CarProvider');
  }
  return context;
}

// Props pour le provider
interface CarProviderProps {
  children: ReactNode;
}

// Provider du contexte
export function CarProvider({ children }: CarProviderProps) {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<CarFilters>({});

  // Fonction pour rafraîchir les voitures depuis l'API
  const refreshCars = useCallback(async (filters?: {
    gamme?: string;
    carType?: string;
    brand?: string;
    fuelType?: string;
    transmission?: string;
    limit?: number;
  }) => {
    try {
      setIsLoading(true);
      
      // Construire les paramètres de requête
      const params = new URLSearchParams();
      if (filters?.gamme && filters.gamme !== "All") {
        params.append("gamme", filters.gamme);
      }
      if (filters?.carType && filters.carType !== "All") {
        params.append("carType", filters.carType);
      }
      if (filters?.brand && filters.brand !== "All") {
        params.append("brand", filters.brand);
      }
      if (filters?.fuelType && filters.fuelType !== "All") {
        params.append("fuelType", filters.fuelType);
      }
      if (filters?.transmission && filters.transmission !== "All") {
        params.append("transmission", filters.transmission);
      }
      if (filters?.limit && filters.limit > 0) {
        params.append("limit", filters.limit.toString());
      }

      const queryString = params.toString();
      const res = await fetch(`/api/cars${queryString ? `?${queryString}` : ""}`);
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setCars(data);
      } else {
        console.error("Invalid data format received:", data);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fonction pour ajouter une voiture à la liste locale
  const addCar = useCallback((car: Car) => {
    setCars(prevCars => [car, ...prevCars]);
  }, []);

  // Fonction pour mettre à jour une voiture dans la liste locale
  const updateCar = useCallback((carId: string, updatedCar: Partial<Car>) => {
    setCars(prevCars => 
      prevCars.map(car => 
        car.id === carId ? { ...car, ...updatedCar } : car
      )
    );
  }, []);

  // Fonction pour supprimer une voiture de la liste locale
  const deleteCar = useCallback((carId: string) => {
    setCars(prevCars => prevCars.filter(car => car.id !== carId));
  }, []);

  const value: CarContextType = {
    cars,
    setCars,
    refreshCars,
    addCar,
    updateCar,
    deleteCar,
    isLoading,
    setIsLoading,
    currentFilters,
    setCurrentFilters,
  };

  return (
    <CarContext.Provider value={value}>
      {children}
    </CarContext.Provider>
  );
}
