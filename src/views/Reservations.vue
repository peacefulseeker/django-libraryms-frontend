<script setup lang="ts">
import { ref, watchEffect, watch } from 'vue';
import { useRoute } from 'vue-router';

import useBooks from '@/stores/books';
import BookList from '@/components/BookList.vue';
import Spinner from '@/components/Spinner.vue';
import Banner from '@/components/Banner.vue';
import router from '@/router';

const loading = ref(true);
const books = ref([]);
const route = useRoute();

const fetchReservedBooks = async () => {
  books.value = await useBooks().listReservedByMember();
  loading.value = false;
};
watch(() => null, fetchReservedBooks, { immediate: true });
</script>

<template>
  <Banner>
    <h1>Your reservations</h1>
  </Banner>
  <main>
    <Spinner v-if="loading" />
    <h2 v-if="!books.length">
      No reservations, check out books:
      <a href="" @click.prevent="router.push({ name: 'books' })" class="link">here</a>
    </h2>
    <BookList class="!justify-start" :books="books" />
  </main>
</template>
