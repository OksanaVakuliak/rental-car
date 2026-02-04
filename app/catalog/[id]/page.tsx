import { clientApi } from "@/lib/clientApi";
import { BookingForm } from "@/components/BookingForm/BookingForm";
import Image from "next/image";
import css from "./CarDetailPage.module.css";
import { notFound } from "next/navigation";
import { CarInfo } from "@/components/CarInfo/CarInfo";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CarDetailPage({ params }: PageProps) {
  const { id } = await params;

  const car = await clientApi.getCarById(id).catch(() => null);

  if (!car) return notFound();

  return (
    <main className={css.main}>
      <div className={css.contentWrapper}>
        <div className={css.leftColumn}>
          <div className={css.galleryWrapper}>
            <Image
              src={car.img}
              alt={`${car.brand} ${car.model}`}
              fill
              priority
              style={{ objectFit: "cover" }}
              className={css.image}
            />
          </div>
          <BookingForm />
        </div>

        <div className={css.rightColumn}>
          <CarInfo car={car} />
        </div>
      </div>
    </main>
  );
}
