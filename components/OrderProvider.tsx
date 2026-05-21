'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Dish } from '@/lib/menu-data';

export type OrderStatus =
  | 'idle'
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ontheway'
  | 'delivered';

type OrderItem = { dish: Dish; qty: number };

type Ctx = {
  items: OrderItem[];
  add: (d: Dish) => void;
  remove: (id: string) => void;
  clear: () => void;
  status: OrderStatus;
  reference: string | null;
  placeOrder: (note?: string) => void;
  etaMinutes: number;
  note: string;
  setNote: (n: string) => void;
};

const OrderContext = createContext<Ctx | null>(null);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [status, setStatus] = useState<OrderStatus>('idle');
  const [reference, setReference] = useState<string | null>(null);
  const [note, setNote] = useState('');

  const add = useCallback((d: Dish) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.dish.id === d.id);
      if (existing) {
        return prev.map((i) =>
          i.dish.id === d.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { dish: d, qty: 1 }];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => {
      const next: OrderItem[] = [];
      for (const i of prev) {
        if (i.dish.id !== id) {
          next.push(i);
        } else if (i.qty > 1) {
          next.push({ ...i, qty: i.qty - 1 });
        }
      }
      return next;
    });
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const etaMinutes = useMemo(() => {
    const base = 6;
    return Math.min(22, base + items.reduce((acc, i) => acc + i.qty * 2, 0));
  }, [items]);

  const placeOrder = useCallback(() => {
    if (!items.length) return;
    const ref = 'ASP-' + Math.random().toString(36).slice(2, 7).toUpperCase();
    setReference(ref);
    setStatus('pending');
    setTimeout(() => setStatus('confirmed'), 900);
    setTimeout(() => setStatus('preparing'), 2400);
    setTimeout(() => setStatus('ontheway'), 5200);
    setTimeout(() => setStatus('delivered'), 8200);
  }, [items.length]);

  const value: Ctx = useMemo(
    () => ({
      items,
      add,
      remove,
      clear,
      status,
      reference,
      placeOrder,
      etaMinutes,
      note,
      setNote,
    }),
    [items, add, remove, clear, status, reference, placeOrder, etaMinutes, note],
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrder must be used inside OrderProvider');
  return ctx;
}
