"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Car } from "@/types/car";
import { clientApi } from "@/lib/clientApi";
import { CarCard } from "../CarCard/CarCard";
import css from "./CarList.module.css";
import { HydrationProvider } from "@/providers/HydrationProvider";

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
      <div className={css.grid}>
        <HydrationProvider>
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </HydrationProvider>
      </div>

      {cars.length < totalCars && (
        <button
          onClick={handleLoadMore}
          disabled={isLoading}
          className={css.loadMore}
        >
          {isLoading ? "Loading..." : "Load more"}
        </button>
      )}
    </section>
  );
}
