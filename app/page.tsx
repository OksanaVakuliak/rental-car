import Image from "next/image";
import Link from "next/link";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <main>
      <section className={css.hero}>
        <Image
          src="/car-background.jpg"
          alt="Car on the road"
          fill
          priority
          sizes="100vw"
          className={css.bgImage}
        />
        <div className={css.content}>
          <h1 className={css.title}>Find your perfect rental car</h1>
          <p className={css.text}>
            Reliable and budget-friendly rentals for any journey
          </p>
          <Link href="/catalog" className={css.button}>
            View Catalog
          </Link>
        </div>
      </section>
    </main>
  );
}
