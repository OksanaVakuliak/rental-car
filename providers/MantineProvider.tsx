"use client";

import { MantineProvider, createTheme, Select } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

const theme = createTheme({
  primaryColor: "blue",
  defaultRadius: "14px",
  fontFamily: "var(--font-family)",

  components: {
    Select: Select.extend({
      styles: {
        root: {
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        },
        label: {
          fontSize: "14px",
          fontWeight: 500,
          color: "var(--gray)",
          marginBottom: 0,
        },
        input: {
          backgroundColor: "var(--inputs)",
          border: "none",
          height: "48px",
          padding: "14px 18px",
          fontSize: "18px",
          fontWeight: 500,
          color: "var(--main)",
          borderRadius: "14px",
        },
        dropdown: {
          borderRadius: "14px",
          border: "1px solid rgba(18, 20, 23, 0.05)",
          padding: "8px",
        },
        // Ми прибрали складні селектори звідси, щоб не було помилки
        option: {
          fontSize: "16px",
          borderRadius: "8px",
          transition: "color 0.2s ease",
        },
      },
    }),
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      {/* Щоб стилізувати ховер та вибраний елемент без помилок JS, 
         ми додамо маленький глобальний CSS для Mantine опцій 
      */}
      <style jsx global>{`
        .mantine-Select-option[data-selected],
        .mantine-Select-option[data-combobox-selected],
        .mantine-Select-option:hover {
          background-color: transparent !important;
          color: var(--main) !important;
        }
        .mantine-Select-option {
          color: rgba(18, 20, 23, 0.2) !important;
        }
      `}</style>
      {children}
    </MantineProvider>
  );
}
