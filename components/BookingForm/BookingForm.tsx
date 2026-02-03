"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import styles from "./BookingForm.module.css";

const BookingSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  bookingDate: Yup.date()
    .required("Date is required")
    .typeError("Please enter a valid date")
    .nullable(),
  comment: Yup.string(),
});

interface FormValues {
  name: string;
  email: string;
  bookingDate: string;
  comment: string;
}

export const BookingForm = () => {
  const initialValues: FormValues = {
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  };

  // Використовуємо FormikHelpers<FormValues> замість any
  const handleSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>,
  ) => {
    console.log("Booking Data Sent:", values);

    // Нотифікація про вдалу оренду за ТЗ
    alert("Successful rental! We will contact you soon.");
    resetForm();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Book your car now</h2>
      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={BookingSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.inputWrapper}>
              <Field name="name" placeholder="Name*" className={styles.input} />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.inputWrapper}>
              <Field
                name="email"
                type="email"
                placeholder="Email*"
                className={styles.input}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.inputWrapper}>
              <Field
                name="bookingDate"
                type="date"
                placeholder="Booking date"
                className={styles.input}
              />
              <ErrorMessage
                name="bookingDate"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.inputWrapper}>
              <Field
                name="comment"
                as="textarea"
                placeholder="Comment"
                className={styles.textarea}
              />
              <ErrorMessage
                name="comment"
                component="div"
                className={styles.error}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
