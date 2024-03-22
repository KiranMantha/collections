'use client';

import { useCartStore } from '@hooks/store';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export function Header() {
  const {
    state: { items }
  } = useCartStore();
  const { data: session } = useSession();
  console.log(session);

  return (
    <header className="sticky top-0">
      <nav>
        <div className="navbar justify-between bg-base-300">
          <Link href="/" className="btn btn-ghost text-lg">
            Home
          </Link>
          <ul>
            <li>
              <Link href="/cart" className="btn btn-ghost rounded-btn">
                Cart <div className="badge badge-secondary">{items.reduce((acc, item) => acc + item.qty, 0)} </div>
              </Link>
            </li>
            <li>
              {!session ? (
                <Link href="/api/auth/signin" className="btn btn-ghost rounded-btn">
                  Sign In
                </Link>
              ) : (
                <Link href="/api/auth/signout" className="btn btn-ghost rounded-btn">
                  Sign Out
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
