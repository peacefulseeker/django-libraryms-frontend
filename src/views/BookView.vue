<script setup lang="ts">
  import type { Book as BookType } from '@/types/books';
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import useBook from '@/stores/book';
  import Book from '@/components/SingleBook.vue';
  import Spinner from '@/components/Spinner.vue';
  import GoBack from '@/components/GoBack.vue';

  const book = ref({}) as BookType;
  const loading = ref(true);
  const bookStore = useBook();
  const route = useRoute();

  const fetchBook = async (id: number) => {
    book.value = await bookStore.get(id);
    loading.value = false;
  };
  watch(() => route.params.id, fetchBook, { immediate: true });
</script>

<template>
  <main>
    <GoBack />
    <Spinner v-if="loading" />
    <Book v-else :book="book" />
  </main>
</template>

<style scoped></style>
