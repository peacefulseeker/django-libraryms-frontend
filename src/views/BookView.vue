<script setup lang="ts">
import { ref, watch } from 'vue';
import Book from '@/components/Book.vue';
import { useRoute } from 'vue-router';
import useBooks from '@/stores/books';

const books = useBooks();
const route = useRoute();

const book = ref(null);
const loading = ref(false);

const fetchData = async (id: number) => {
  book.value = await books.get(id);
};

watch(() => route.params.id, fetchData, { immediate: true });
</script>

<template>
  <div v-if="loading" class="loading">Loading...</div>
  <div v-if="book">
    <Book :book="book" />
  </div>
</template>

<style scoped></style>
