"use client";

import Image from "next/image";
import Link from "next/link";
import { Car } from "@/types/car";
import styles from "./CarCard.module.css";

interface CarCardProps {
  car: Car;
}

export const CarCard = ({ car }: CarCardProps) => {
  // Тимчасова логіка (скоро замінимо на Zustand)
  const isFavorite = false;

  const addressParts = car.address.split(",");
  const city = addressParts[1]?.trim() || "Unknown";
  const country = addressParts[2]?.trim() || "Unknown";

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          fill
          priority={false}
          sizes="274px"
          className={styles.image}
          style={{ objectFit: "cover" }}
        />

        <button
          type="button"
          className={styles.favoriteBtn}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg className={styles.heartIcon}>
            {/* Використовуємо іконку залежно від стану isFavorite */}
            <use href={`/sprite.svg#${isFavorite ? "Love-blue" : "Love"}`} />
          </svg>
        </button>
      </div>

      <div className={styles.titleLine}>
        <h2 className={styles.titleText}>
          {car.brand} <span className={styles.model}>{car.model}</span>,{" "}
          {car.year}
        </h2>
        <span className={styles.price}>${car.rentalPrice}</span>
      </div>

      <div className={styles.infoLine}>
        <span>{city}</span>
        <span className={styles.divider}>|</span>
        <span>{country}</span>
        <span className={styles.divider}>|</span>
        <span>{car.rentalCompany}</span>
        <span className={styles.divider}>|</span>
        <span>{car.type}</span>
        <span className={styles.divider}>|</span>
        <span>{car.model}</span>
        <span className={styles.divider}>|</span>
        <span>{car.id.split("-")[0]}</span> {/* Скорочуємо довгий ID */}
        <span className={styles.divider}>|</span>
        <span>{car.functionalities[0]}</span>
      </div>

      <Link href={`/catalog/${car.id}`} className={styles.learnMoreBtn}>
        Learn more
      </Link>
    </div>
  );
};
