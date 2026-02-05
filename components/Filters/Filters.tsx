"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { Select } from "@mantine/core";
import { clientApi } from "@/lib/clientApi";
import { CarQueryParams, GetBrandsResponse } from "@/types/car";
import * as Yup from "yup";
import css from "./Filters.module.css";
import { Loader } from "../Loader/Loader";

export const Filters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [brands, setBrands] = useState<GetBrandsResponse>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    clientApi.getBrands().then(setBrands).catch(console.error);
  }, []);

  useEffect(() => {
    setIsSearching(false);
  }, [searchParams]);

  const prices = Array.from({ length: 15 }, (_, i) => {
    const val = ((i + 1) * 10).toString();
    return { value: val, label: `To $${val}` };
  });

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
    setIsSearching(true);

    const params = new URLSearchParams();
    Object.entries(values).forEach(([key, value]) => {
      if (value) params.set(key, value.toString());
    });
    router.push(`/catalog?${params.toString()}`);
    setSubmitting(false);
  };

  const mileageValidationSchema = Yup.object().shape({
    minMileage: Yup.number()
      .typeError("Must be a number")
      .min(0, "Cannot be negative"),
    maxMileage: Yup.number()
      .typeError("Must be a number")
      .min(0, "Cannot be negative")
      .test("is-greater", "Must be greater than 'From'", function (value) {
        const { minMileage } = this.parent;
        return !value || !minMileage || value >= minMileage;
      }),
  });

  return (
    <>
      {isSearching && (
        <div className={css.loaderOverlay}>
          <Loader />
        </div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={mileageValidationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form className={css.filterSection}>
            <div className={css.brandWrapper}>
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

            <div className={css.priceWrapper}>
              <Select
                label="Price/ 1 hour"
                placeholder="Choose a price"
                data={prices}
                value={values.rentalPrice}
                onChange={(value) => setFieldValue("rentalPrice", value)}
                renderOption={({ option }) => option.value}
                clearable
                searchable
              />
            </div>

            <div className={css.mileageWrapper}>
              <label className={css.label}>Car mileage / km</label>
              <div className={css.mileageInputs}>
                <div className={css.inputContainer}>
                  <span className={css.prefix}>From</span>
                  <Field
                    name="minMileage"
                    type="number"
                    className={`${css.input} ${css.inputLeft}`}
                  />
                  {touched.minMileage && errors.minMileage && (
                    <div className={css.errorLabel}>{errors.minMileage}</div>
                  )}
                </div>

                <div className={css.inputContainer}>
                  <span className={css.prefix}>To</span>
                  <Field
                    name="maxMileage"
                    type="number"
                    className={`${css.input} ${css.inputRight}`}
                  />
                  {touched.maxMileage && errors.maxMileage && (
                    <div className={css.errorLabel}>{errors.maxMileage}</div>
                  )}
                </div>
              </div>
            </div>

            <button type="submit" className={css.searchBtn}>
              Search
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
