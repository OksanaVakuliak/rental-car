"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Car } from "@/types/car";
import { clientApi } from "@/lib/clientApi";
import { CarCard } from "../CarCard/CarCard";
import styles from "./CarList.module.css";

interface CarListProps {
  initialCars: Car[];
  totalCars: number;
}

export default function CarList({ initialCars, totalCars }: CarListProps) {
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  // Коли змінюються фільтри в URL, скидаємо список до початкових серверних даних
  useEffect(() => {
    setCars(initialCars);
    setPage(1);
  }, [initialCars]);

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setIsLoading(true);

    try {
      // Отримуємо поточні фільтри з URL для коректного дозавантаження
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
    <section className={styles.section}>
      <div className={styles.grid}>
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {cars.length < totalCars && (
        <button
          onClick={handleLoadMore}
          disabled={isLoading}
          className={styles.loadMore}
        >
          {isLoading ? "Loading..." : "Load more"}
        </button>
      )}
    </section>
  );
}
