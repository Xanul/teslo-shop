'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store';

export function CartGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => setIsHydrated(true), []);

  useEffect(() => {
    if (!isHydrated) return;
    if (cart.length === 0) router.replace('/empty');
  }, [cart.length, isHydrated, router]);

  if (!isHydrated || cart.length === 0) return null;
  return <>{children}</>;
}

