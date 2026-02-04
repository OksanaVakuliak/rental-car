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
          withinPortal: true,
          withArrow: false,
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
        dropdown: {
          borderRadius: "14px",
          border: "1px solid var(--inputs)",
          padding: "8px",
          backgroundColor: "var(--white)",
          boxShadow: "0px 4px 36px 0px rgba(0, 0, 0, 0.02)",
        },
      },
    }),
    DatePicker: {
      classNames: {
        datePickerRoot: css.calendarRoot,
        calendarHeader: css.calendarHeader,
        calendarHeaderControl: css.calendarControl,
        calendarHeaderControlIcon: css.calendarControlIcon,
        calendarHeaderLevel: css.calendarLabel,
        weekday: css.calendarWeekday,
        day: css.calendarDay,
      },
    },
    Popover: {
      defaultProps: {
        withArrow: true,
        arrowSize: 12,
      },
      classNames: {
        dropdown: css.popoverDropdown,
        arrow: css.popoverArrow,
      },
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      {children}
    </MantineProvider>
  );
}
