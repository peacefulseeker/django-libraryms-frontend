<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import useBooks from '@/stores/books';
  import Book from '@/components/SingleBook.vue';
  import Spinner from '@/components/Spinner.vue';
  import GoBack from '@/components/GoBack.vue';

  const books = useBooks();
  const route = useRoute();
  const book = ref(null);
  const loading = ref(true);

  const fetchBook = async (id: number) => {
    book.value = await books.get(id);
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
