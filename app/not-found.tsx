import Link from 'next/link';
import css from './not-found.module.css';

export const metadata = {
  title: '404 - Page Not Found',
};

export default function NotFound() {
  return (
    <main className={css.container}>
      <div className={css.content}>
        <h1 className={css.code}>404</h1>
        <h2 className={css.title}>Oops! Page not found</h2>
        <p className={css.text}>
          The car you are looking for might have already been rented or the link
          is broken.
        </p>
        <Link href="/catalog" className={css.button}>
          Back to Catalog
        </Link>
      </div>
    </main>
  );
}
