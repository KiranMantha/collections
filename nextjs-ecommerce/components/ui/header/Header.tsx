'use client';

import { useCartStore } from '@hooks';
import Link from 'next/link';

export function Header() {
  const { items } = useCartStore();

  return (
    <header>
      <nav>
        <div className="navbar justify-between bg-base-300">
          <Link href="/" className="btn btn-ghost text-lg">
            Home
          </Link>
          <ul>
            <li>
              <Link href="/cart" className="btn btn-ghost rounded-btn">
                Cart <div className="badge badge-secondary">{items.length}</div>
              </Link>
            </li>
            <li>
              <Link href="/signin" className="btn btn-ghost rounded-btn">
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
