<script setup lang="ts">
  import { ref, watchEffect, type Ref } from 'vue';
  import { useRoute } from 'vue-router';

  import useBooks from '@/stores/books';

  import BookList from '@/components/BookList.vue';
  import Spinner from '@/components/Spinner.vue';
  import type { BookInList } from '@/types/books';

  const loading = ref(true);
  const books: Ref<BookInList[] | []> = ref([]);
  const route = useRoute();

  watchEffect(async () => {
    books.value = await useBooks().search(route.query.q as string);
    loading.value = false;
  });
</script>

<template>
  <main>
    <Spinner v-if="loading" />
    <div v-else>
      <h2 class="my-10 max-md:text-center">
        <span v-if="books.length">Books found </span>
        <span v-else>No books found </span>
        <span v-if="route.query.q">for "{{ route.query.q }}" query</span>
      </h2>
      <BookList class="md:w-full" :books="books" />
    </div>
  </main>
</template>
