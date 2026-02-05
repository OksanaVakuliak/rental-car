'use client';

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import css from './BookingForm.module.css';
import { Popover } from '@mantine/core';
import dayjs from 'dayjs';
import { DatePicker } from '@mantine/dates';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Loader } from '../Loader/Loader';

const BookingSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  bookingDate: Yup.date()
    .required('Date is required')
    .typeError('Please enter a valid date')
    .nullable(),
  comment: Yup.string().max(100, 'Maximum 100 characters allowed').optional(),
});

interface FormValues {
  name: string;
  email: string;
  bookingDate: Date | string;
  comment: string;
}

export const BookingForm = () => {
  const [opened, setOpened] = useState(false);

  const initialValues: FormValues = {
    name: '',
    email: '',
    bookingDate: '',
    comment: '',
  };

  const handleSubmit = async (
    values: FormValues,
    { resetForm, setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const formattedData = {
        ...values,
        bookingDate: values.bookingDate
          ? dayjs(values.bookingDate).format('YYYY-MM-DD')
          : '',
      };
      console.log('Booking Data Sent:', formattedData);

      toast.success('Successful rental! We will contact you soon.');
      resetForm();
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
      setOpened(false);
    }
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Book your car now</h2>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={BookingSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <>
            {isSubmitting && (
              <div className={css.loaderOverlay}>
                <Loader />
              </div>
            )}
            <Form className={css.form} noValidate>
              <div className={css.inputWrapper}>
                <Field name="name" placeholder="Name*" className={css.input} />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={css.error}
                />
              </div>

              <div className={css.inputWrapper}>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email*"
                  className={css.input}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.error}
                />
              </div>

              <div className={css.inputWrapper}>
                <Popover
                  opened={opened}
                  onChange={setOpened}
                  withArrow
                  shadow="md"
                >
                  <Popover.Target>
                    <div onClick={() => setOpened(o => !o)}>
                      <Field
                        name="bookingDate"
                        placeholder="Booking date"
                        readOnly
                        value={
                          values.bookingDate
                            ? dayjs(values.bookingDate).format('DD/MM/YYYY')
                            : ''
                        }
                        className={css.input}
                      />
                    </div>
                  </Popover.Target>

                  <Popover.Dropdown className={css.calendarDropdown}>
                    <DatePicker
                      weekdayFormat={date => dayjs(date).format('ddd')}
                      value={
                        values.bookingDate ? new Date(values.bookingDate) : null
                      }
                      onChange={date => {
                        setFieldValue('bookingDate', date);
                        setOpened(false);
                      }}
                      minDate={new Date()}
                      locale="en"
                      getDayProps={date => ({
                        style: dayjs(date).isSame(values.bookingDate, 'day')
                          ? { backgroundColor: 'var(--button)', color: 'white' }
                          : {},
                      })}
                    />
                  </Popover.Dropdown>
                  <ErrorMessage
                    name="bookingDate"
                    component="div"
                    className={css.error}
                  />
                </Popover>
              </div>

              <div className={css.inputWrapper}>
                <Field
                  name="comment"
                  as="textarea"
                  placeholder="Comment"
                  className={css.textarea}
                />
                <ErrorMessage
                  name="comment"
                  component="div"
                  className={css.error}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={css.submitButton}
              >
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};
