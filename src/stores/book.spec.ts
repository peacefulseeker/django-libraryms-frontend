import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { cancelBookOrder, orderBook, type OrderResponse } from '@/api/books';
import useBook from '@/stores/book';
import type { Book } from '@/types/books';

vi.mock('@/api/books', () => ({
  orderBook: vi.fn(),
  cancelBookOrder: vi.fn(),
}));

describe('useBook', () => {
  beforeEach(() => {
    setActivePinia(createPinia());

    vi.stubGlobal('$toast', {
      add: vi.fn(),
    });
  });

  it('initializes with empty book', () => {
    const store = useBook();
    expect(store.book).toEqual({});
  });

  it('reservedByAnyone is queuable', () => {
    const store = useBook();
    store.book = { isAvailable: false } as Book;

    expect(store.reservedByAnyone).toBe(true);
    expect(store.queuable).toBe(true);
  });

  it('bookedByMember is not queuable', () => {
    const store = useBook();
    store.book = { isReservedByMember: true } as Book;

    expect(store.bookedByMember).toBe(true);
    expect(store.queuable).toBe(false);
  });

  it('book order action', async () => {
    const store = useBook();
    vi.mocked(orderBook).mockResolvedValue({ detail: 'Order successful' } as OrderResponse);
    const toastAddSpy = vi.spyOn(window.$toast, 'add');

    await store.order(1);

    expect(orderBook).toHaveBeenCalledWith(1);
    expect(toastAddSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: 'Order successful',
        severity: 'success',
      }),
    );
  });

  it('book order cancel action', async () => {
    const store = useBook();
    const toastAddSpy = vi.spyOn(window.$toast, 'add');

    await store.orderCancel(1);

    expect(cancelBookOrder).toHaveBeenCalledWith(1);
    expect(toastAddSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: 'Reservation cancelled',
        severity: 'warn',
      }),
    );
    expect(store.book).toEqual({});
  });
});
