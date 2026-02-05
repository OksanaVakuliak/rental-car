import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Car } from '@/types/car';

interface FavoritesState {
  favorites: Car[];
  toggleFavorite: (car: Car) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: car => {
        const isFav = get().favorites.some(fav => fav.id === car.id);
        if (isFav) {
          set(state => ({
            favorites: state.favorites.filter(fav => fav.id !== car.id),
          }));
        } else {
          set(state => ({
            favorites: [...state.favorites, car],
          }));
        }
      },
    }),
    { name: 'favorites-storage' }
  )
);
