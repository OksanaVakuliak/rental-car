"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Car } from "@/types/car";
import { clientApi } from "@/lib/clientApi";
import { CarCard } from "../CarCard/CarCard";
import css from "./CarList.module.css";
import { HydrationProvider } from "@/components/HydrationProvider/HydrationProvider";
import { Loader } from "../Loader/Loader";

interface CarListProps {
  initialCars: Car[];
  totalCars: number;
}

export default function CarList({ initialCars, totalCars }: CarListProps) {
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setCars(initialCars);
    setPage(1);
  }, [initialCars]);

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setIsLoading(true);

    try {
      const currentParams = Object.fromEntries(searchParams.entries());

      const response = await clientApi.getCars({
        ...currentParams,
        page: nextPage.toString(),
        limit: "12",
      });

      setCars((prev) => [...prev, ...response.cars]);
      setPage(nextPage);
    } catch (error) {
      console.error("Failed to load more cars:", error);
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
        {cars.map((car) => (
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
