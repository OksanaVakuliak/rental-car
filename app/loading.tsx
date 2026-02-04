import { Loader } from "@/components/Loader/Loader";
import css from "./loading-page.module.css";

export default function Loading() {
  return (
    <div className={css.fullPageOverlay}>
      <Loader />
    </div>
  );
}
