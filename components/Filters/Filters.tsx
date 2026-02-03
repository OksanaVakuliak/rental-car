"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { Select } from "@mantine/core"; // Імпортуємо Select
import { clientApi } from "@/lib/clientApi";
import { CarQueryParams, GetBrandsResponse } from "@/types/car";
import styles from "./Filters.module.css";

export const Filters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [brands, setBrands] = useState<GetBrandsResponse>([]);

  useEffect(() => {
    clientApi.getBrands().then(setBrands).catch(console.error);
  }, []);

  const prices = Array.from({ length: 15 }, (_, i) =>
    ((i + 1) * 10).toString(),
  );

  const initialValues: CarQueryParams = {
    brand: searchParams.get("brand") || "",
    rentalPrice: searchParams.get("rentalPrice") || "",
    minMileage: searchParams.get("minMileage") || "",
    maxMileage: searchParams.get("maxMileage") || "",
  };

  const handleSubmit = (
    values: CarQueryParams,
    { setSubmitting }: FormikHelpers<CarQueryParams>,
  ) => {
    const params = new URLSearchParams();
    Object.entries(values).forEach(([key, value]) => {
      if (value) params.set(key, value.toString());
    });
    router.push(`/catalog?${params.toString()}`);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className={styles.filterSection}>
          {/* Кастомний Селект для Брендів */}
          <div className={styles.brandWrapper}>
            <Select
              label="Car brand"
              placeholder="Choose a brand"
              data={brands}
              value={values.brand}
              onChange={(value) => setFieldValue("brand", value)}
              searchable
              clearable
            />
          </div>

          {/* Кастомний Селект для Ціни */}
          <div className={styles.priceWrapper}>
            <Select
              label="Price/ 1 hour"
              placeholder="To $"
              data={prices}
              value={values.rentalPrice}
              onChange={(value) => setFieldValue("rentalPrice", value)}
              clearable
            />
          </div>

          <div className={styles.mileageWrapper}>
            <label className={styles.label}>Car mileage / km</label>
            <div className={styles.mileageInputs}>
              <Field
                name="minMileage"
                type="number"
                placeholder="From"
                className={`${styles.input} ${styles.inputLeft}`}
              />
              <Field
                name="maxMileage"
                type="number"
                placeholder="To"
                className={`${styles.input} ${styles.inputRight}`}
              />
            </div>
          </div>

          <button type="submit" className={styles.searchBtn}>
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
};
