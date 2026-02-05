import CarList from '@/components/CarList/CarList';
import { Filters } from '@/components/Filters/Filters';
import { clientApi } from '@/lib/clientApi';
import { CarQueryParams } from '@/types/car';
import css from './CatalogPage.module.css';
import { Suspense } from 'react';
import { Loader } from '@/components/Loader/Loader';
import { Metadata } from 'next';

interface PageProps {
  searchParams: Promise<CarQueryParams>;
}

export const metadata: Metadata = {
  title: 'Car Catalog | RentalCar - Best Deals',
  description:
    'Explore our wide range of cars for rent. Filter by brand, price, and mileage to find the perfect vehicle for your journey.',
  keywords: ['car rental', 'rent a car', 'affordable cars', 'car catalog'],
  openGraph: {
    title: 'Car Catalog | RentalCar',
    description: 'Find and book your perfect car today.',
    type: 'website',
  },
};

export default async function CatalogPage({ searchParams }: PageProps) {
  const filters = await searchParams;

  const initialData = await clientApi.getCars({
    ...filters,
    limit: filters.limit || '12',
    page: filters.page || '1',
  });

  return (
    <section className={css.section}>
      <Suspense fallback={<Loader />}>
        <Filters />

        <CarList
          initialCars={initialData.cars}
          totalCars={initialData.totalCars}
        />
      </Suspense>
    </section>
  );
}
