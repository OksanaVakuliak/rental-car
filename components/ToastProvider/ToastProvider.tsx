"use client";

import { Toaster } from "react-hot-toast";
import css from "./ToastProvider.module.css";

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        className: css.toast,
        success: {
          className: `${css.toast} ${css.toastSuccess}`,
          iconTheme: {
            primary: "#3470FF",
            secondary: "#ffffff",
          },
        },
        error: {
          className: `${css.toast} ${css.toastError}`,
          iconTheme: {
            primary: "#EF4444",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
};
