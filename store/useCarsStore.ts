import { create } from 'zustand';
import { Car, CarQueryParams } from '@/types/car';

interface CarsState {
  cars: Car[];
  totalCars: number;
  filters: CarQueryParams;
  setFilteredCars: (cars: Car[], total: number) => void;
  addCars: (cars: Car[]) => void;
  setFilters: (filters: CarQueryParams) => void;
  resetCars: () => void;
}

export const useCarsStore = create<CarsState>(set => ({
  cars: [],
  totalCars: 0,
  filters: {},

  setFilteredCars: (cars, total) => set({ cars, totalCars: total }),
  addCars: newCars => set(state => ({ cars: [...state.cars, ...newCars] })),
  setFilters: filters => set({ filters }),
  resetCars: () => set({ cars: [], totalCars: 0 }),
}));
