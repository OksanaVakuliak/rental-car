'use client';

import Link from 'next/link';
import css from './Header.module.css';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href={'/'} className={css.logo}>
          <svg width="104" height="16" className={css.logoIcon}>
            <use href="/sprite.svg#logo"></use>
          </svg>
        </Link>

        <ul className={css.navigationList}>
          <li>
            <Link
              href={'/'}
              className={`${css.linkItem} ${pathname === '/' ? css.active : ''}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href={'/catalog'}
              className={`${css.linkItem} ${pathname === '/catalog' ? css.active : ''}`}
            >
              Catalog
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
