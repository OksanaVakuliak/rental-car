'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Car } from '@/types/car';
import { clientApi } from '@/lib/clientApi';
import { CarCard } from '../CarCard/CarCard';
import css from './CarList.module.css';
import { HydrationProvider } from '@/components/HydrationProvider/HydrationProvider';
import { Loader } from '../Loader/Loader';
import { useCarsStore } from '@/store/useCarsStore';
import toast from 'react-hot-toast';

interface CarListProps {
  initialCars: Car[];
  totalCars: number;
}

export default function CarList({ initialCars, totalCars }: CarListProps) {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const cars = useCarsStore(state => state.cars);
  const setFilteredCars = useCarsStore(state => state.setFilteredCars);
  const addCars = useCarsStore(state => state.addCars);

  useEffect(() => {
    setFilteredCars(initialCars, totalCars);
    setPage(1);
  }, [initialCars, totalCars, setFilteredCars]);

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setIsLoading(true);

    try {
      const currentParams = Object.fromEntries(searchParams.entries());

      const response = await clientApi.getCars({
        ...currentParams,
        page: nextPage.toString(),
        limit: '12',
      });

      addCars(response.cars);
      setPage(nextPage);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';

      console.error('Load more error:', error);
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={css.section}>
      {isLoading && (
        <div className={css.loaderOverlay}>
          <Loader />
        </div>
      )}

      <div className={css.grid}>
        {cars.map(car => (
          <HydrationProvider key={car.id}>
            <CarCard car={car} />
          </HydrationProvider>
        ))}
      </div>

      {cars.length < totalCars && (
        <button
          onClick={handleLoadMore}
          disabled={isLoading}
          className={css.loadMore}
        >
          Load more
        </button>
      )}
    </section>
  );
}
