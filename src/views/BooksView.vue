<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

import useBooks from '@/stores/books';

import Banner from '@/components/Banner.vue';
import BookList from '@/components/BookList.vue';
import LoginForm from '@/components/LoginForm.vue';
import Spinner from '@/components/Spinner.vue';

const loading = ref(true);
const books = ref([]);
const route = useRoute();

watchEffect(async () => {
  books.value = await useBooks().search(route.query.q);
  loading.value = false;
});
</script>

<template>
  <main>
    <Spinner v-if="loading" />
    <div v-else>
      <h2 class="my-10">
        <span v-if="books.length">Books found </span>
        <span v-else>No books found </span>
        <span v-if="route.query.q">for "{{ route.query.q }}" query</span>
      </h2>
      <BookList class="!justify-start md:w-full" :books="books" />
    </div>
  </main>
</template>
