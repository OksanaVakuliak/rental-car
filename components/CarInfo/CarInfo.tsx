import { Car } from '@/types/car';
import css from './CarInfo.module.css';

interface CarInfoProps {
  car: Car;
}

export const CarInfo = ({ car }: CarInfoProps) => {
  const conditions = car.rentalConditions || [];

  const addressParts = car.address?.split(',') || [];
  const city = addressParts[1]?.trim() || '';
  const country = addressParts[2]?.trim() || '';

  const shortId = car.id.slice(0, 4).toUpperCase();

  const allFeatures = [
    ...(car.accessories || []),
    ...(car.functionalities || []),
  ];

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <div className={css.titleWrapper}>
          <h1 className={css.title}>
            {car.brand} {car.model}, {car.year}
          </h1>
          <p className={css.id}>Id: {shortId}</p>
        </div>

        <div className={css.locationWrapper}>
          <svg className={css.icon}>
            <use href="/sprite.svg#location" />
          </svg>
          <span className={css.locationText}>
            {city}, {country}
          </span>
          <span className={css.mileage}>
            Mileage: {car.mileage.toLocaleString()} km
          </span>
        </div>

        <p className={css.price}>${car.rentalPrice}</p>
      </div>

      <p className={css.description}>{car.description}</p>

      <section className={css.section}>
        <h2 className={css.sectionTitle}>Rental Conditions:</h2>
        <ul className={css.conditionsList}>
          {conditions.map((condition, index) => (
            <li key={index} className={css.conditionItem}>
              <svg className={css.checkIcon} width="16" height="16">
                <use href="/sprite.svg#vectorO" />
              </svg>
              {condition}
            </li>
          ))}
        </ul>
      </section>

      <section className={css.section}>
        <h2 className={css.sectionTitle}>Car Specifications:</h2>
        <ul className={css.specsList}>
          <li className={css.specItem}>
            <svg className={css.specIcon} width="16" height="16">
              <use href="/sprite.svg#calendar" />
            </svg>
            Year: {car.year}
          </li>
          <li className={css.specItem}>
            <svg className={css.specIcon} width="16" height="16">
              <use href="/sprite.svg#car" />
            </svg>
            Type: {car.type}
          </li>
          <li className={css.specItem}>
            <svg className={css.specIcon} width="16" height="16">
              <use href="/sprite.svg#oil" />
            </svg>
            Fuel Consumption: {car.fuelConsumption}
          </li>
          <li className={css.specItem}>
            <svg className={css.specIcon} width="16" height="16">
              <use href="/sprite.svg#setting" />
            </svg>
            Engine Size: {car.engineSize}
          </li>
        </ul>
      </section>

      <section className={css.section}>
        <h2 className={css.sectionTitle}>Accessories and functionalities:</h2>
        <ul className={css.featureList}>
          {allFeatures.map((feature, index) => (
            <li key={index} className={css.featureItem}>
              <svg className={css.checkIcon} width="16" height="16">
                <use href="/sprite.svg#vectorO" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
