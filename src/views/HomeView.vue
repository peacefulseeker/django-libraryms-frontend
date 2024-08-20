<script setup lang="ts">
  import { ref, watchEffect } from 'vue';

  import BookList from '@/components/BookList.vue';
  import HomeBanner from '@/components/HomeBanner.vue';
  import Spinner from '@/components/Spinner.vue';
  import useBooks from '@/stores/books';

  const books = useBooks();
  const loading = ref(true);

  watchEffect(async () => {
    await books.listAvailable();
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
        <BookList :books="books.available" />
      </div>
    </div>
  </main>
</template>
