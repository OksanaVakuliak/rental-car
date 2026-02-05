'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Car } from '@/types/car';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import css from './CarCard.module.css';
import { useState } from 'react';
import { Loader } from '../Loader/Loader';

interface CarCardProps {
  car: Car;
}

export const CarCard = ({ car }: CarCardProps) => {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleLinkClick = () => {
    setIsRedirecting(true);
  };

  const favorites = useFavoritesStore(state => state.favorites);
  const toggleFavorite = useFavoritesStore(state => state.toggleFavorite);

  const favorite = favorites.some(fav => fav.id === car.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(car);
  };

  const addressParts = car.address.split(',');
  const city = addressParts[1]?.trim() || 'Unknown';
  const country = addressParts[2]?.trim() || 'Unknown';
  const formattedMileage = new Intl.NumberFormat('fr-FR').format(car.mileage);

  return (
    <div className={css.card}>
      {isRedirecting && (
        <div className={css.loaderOverlay}>
          <Loader />
        </div>
      )}
      <div className={css.imageWrapper}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          fill
          sizes="274px"
          className={css.image}
          style={{ objectFit: 'cover' }}
        />
        <button
          type="button"
          className={css.favoriteBtn}
          onClick={handleFavoriteClick}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            width="16"
            height="16"
            className={`${css.heartIcon} ${favorite ? css.active : ''}`}
          >
            <use href={`/sprite.svg#${favorite ? 'love-blue' : 'love'}`} />
          </svg>
        </button>
      </div>

      <div className={css.titleLine}>
        <h2 className={css.titleText}>
          {car.brand} <span className={css.model}>{car.model}</span>, {car.year}
        </h2>
        <span className={css.price}>${car.rentalPrice}</span>
      </div>

      <div className={css.infoLine}>
        <span>{city}</span>
        <span className={css.divider}>|</span>
        <span>{country}</span>
        <span className={css.divider}>|</span>
        <span>{car.rentalCompany}</span>
        <span className={css.divider}>|</span>
        <span>{car.type}</span>
        <span className={css.divider}>|</span>
        <span>{formattedMileage} km</span>
      </div>

      <Link
        href={`/catalog/${car.id}`}
        className={css.readMoreBtn}
        onClick={handleLinkClick}
      >
        Read more
      </Link>
    </div>
  );
};
