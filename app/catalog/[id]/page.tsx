"use client";

import { useEffect, useState, use } from "react";
import { clientApi } from "@/lib/clientApi";
import { Car } from "@/types/car";
import Image from "next/image";
import { BookingForm } from "@/components/BookingForm/BookingForm";

// В Next.js 16 params треба розгортати через use() або await
export default function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clientApi
      .getCarById(id)
      .then((data) => setCar(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>
        Loading car details...
      </div>
    );
  if (!car)
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>Car not found</div>
    );

  return (
    <main style={{ padding: "40px 128px", fontFamily: "Manrope, sans-serif" }}>
      <div style={{ display: "flex", gap: "64px" }}>
        {/* Ліва частина: Фото */}
        <div
          style={{
            position: "relative",
            width: "640px",
            height: "448px",
            borderRadius: "14px",
            overflow: "hidden",
          }}
        >
          <Image
            src={car.img}
            alt={car.brand}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Права частина: Коротке інфо */}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "32px", marginBottom: "8px" }}>
            {car.brand} <span style={{ color: "#3470FF" }}>{car.model}</span>,{" "}
            {car.year}
          </h1>
          <p
            style={{
              color: "#121417",
              lineHeight: "1.5",
              marginBottom: "24px",
            }}
          >
            {car.description}
          </p>

          <div style={{ marginBottom: "24px" }}>
            <h3
              style={{ fontSize: "14px", fontWeight: 600, marginBottom: "8px" }}
            >
              Accessories & functionalities:
            </h3>
            <p style={{ fontSize: "12px", color: "rgba(18, 20, 23, 0.5)" }}>
              {[...car.accessories, ...car.functionalities].join(" | ")}
            </p>
          </div>

          <p style={{ fontSize: "24px", fontWeight: 700 }}>
            ${car.rentalPrice}
          </p>
        </div>
        <BookingForm />
      </div>
    </main>
  );
}
