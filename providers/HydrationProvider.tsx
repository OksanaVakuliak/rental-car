"use client";

import { useSyncExternalStore, ReactNode } from "react";

const emptySubscribe = () => () => {};

export const HydrationProvider = ({ children }: { children: ReactNode }) => {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!isMounted) {
    return null;
  }

  return <>{children}</>;
};
