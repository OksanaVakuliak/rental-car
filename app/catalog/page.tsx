import CarList from "@/components/CarList/CarList";
import { Filters } from "@/components/Filters/Filters";
import { clientApi } from "@/lib/clientApi";
import { CarQueryParams } from "@/types/car";
import css from "./CatalogPage.module.css";

interface PageProps {
  searchParams: Promise<CarQueryParams>;
}

export default async function CatalogPage({ searchParams }: PageProps) {
  const filters = await searchParams;

  const initialData = await clientApi.getCars({
    ...filters,
    limit: filters.limit || "12",
    page: filters.page || "1",
  });

  return (
    <section className={css.section}>
      <Filters />

      <CarList
        initialCars={initialData.cars}
        totalCars={initialData.totalCars}
      />
    </section>
  );
}
