<script setup lang="ts">
  import { ref, watchEffect, type Ref } from 'vue';

  import { type BookInList } from '@/types/books';
  import useBooks from '@/stores/books';
  import HomeBanner from '@/components/HomeBanner.vue';
  import BookList from '@/components/BookList.vue';
  import Spinner from '@/components/Spinner.vue';

  const books: Ref<BookInList[] | []> = ref([]);
  const loading = ref(true);

  watchEffect(async () => {
    books.value = await useBooks().listAvailable();
    loading.value = false;
  });
</script>

<template>
  <HomeBanner />
  <main>
    <div class="text-center">
      <Spinner v-if="loading" />
      <div v-else>
        <h2 class="mb-10">New books for reservation</h2>
        <BookList :books="books" />
      </div>
    </div>
  </main>
</template>
