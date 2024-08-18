<script setup lang="ts">
  import { ref, watch, type WatchCallback } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useToast } from 'primevue/usetoast';
  import type { ToastMessageOptions } from 'primevue/toast';
  import { ToastSeverity } from 'primevue/api';

  import { type Book as BookType } from '@/types/books';
  import useBook from '@/stores/book';
  import Book from '@/components/SingleBook.vue';
  import Spinner from '@/components/Spinner.vue';
  import GoBack from '@/components/GoBack.vue';
  import useAuth from '@/stores/auth';

  const toast = useToast();
  const book = ref({} as BookType);
  const bookLoading = ref(true);
  const bookOrderProcessing = ref(false);
  const bookStore = useBook();
  const route = useRoute();
  const router = useRouter();
  const auth = useAuth();

  const checkAuth = () => {
    if (auth.loggedOut) {
      toast.add({
        severity: ToastSeverity.WARN,
        detail: 'Please, login first',
        life: 3000,
      } as ToastMessageOptions);
      router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } });
      return false;
    }
    return true;
  };

  const swapBookOrderProcessing = () => {
    bookOrderProcessing.value = !bookOrderProcessing.value;
  };

  const fetchBook = async (id: number) => {
    book.value = await bookStore.get(id);
    bookLoading.value = false;
  };

  const onOrder = async (bookId: number) => {
    if (!bookOrderProcessing.value && checkAuth()) {
      swapBookOrderProcessing();
      await bookStore.order(bookId);
      book.value = await bookStore.get(bookId);
      swapBookOrderProcessing();
    }
  };

  const onOrderCancel = async (bookId: number) => {
    if (!bookOrderProcessing.value && checkAuth()) {
      swapBookOrderProcessing();
      await bookStore.orderCancel(bookId);
      book.value = await bookStore.get(bookId);
      swapBookOrderProcessing();
    }
  };

  watch(() => route.params.id, fetchBook as WatchCallback, { immediate: true });
</script>

<template>
  <main>
    <GoBack />
    <Spinner v-if="bookLoading" />
    <Book
      v-else
      :book="book"
      :orderProcessing="!!bookOrderProcessing"
      :onOrder="onOrder"
      :onOrderCancel="onOrderCancel" />
  </main>
</template>

<style scoped></style>
