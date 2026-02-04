"use client";

import { MantineProvider, createTheme, Select } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import css from "./MantineProvider.module.css";

const CustomChevron = () => (
  <svg width="13" height="7" viewBox="0 0 59 32" className={css.customChevron}>
    <use href="/sprite.svg#down" />
  </svg>
);

const theme = createTheme({
  primaryColor: "blue",
  defaultRadius: "12px",
  fontFamily: "var(--font-family)",

  components: {
    Select: Select.extend({
      defaultProps: {
        withCheckIcon: false,
        rightSection: <CustomChevron />,
        rightSectionPointerEvents: "none",
        clearable: true,
        clearButtonProps: {
          className: css.clearButton,
          "aria-label": "Clear input",
        },
        comboboxProps: {
          transitionProps: {
            transition: "scale-y",
            duration: 250,
            timingFunction: "linear",
          },
        },
      },

      classNames: {
        root: css.root,
        label: css.label,
        input: css.input,
        dropdown: css.dropdown,
        option: css.option,
        section: css.section,
      },
      styles: {
        root: {
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        },
      },
    }),
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      {children}
    </MantineProvider>
  );
}
