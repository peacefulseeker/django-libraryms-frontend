<script setup lang="ts">
import { ref, watch } from 'vue';
import Book from '@/components/Book.vue';
import { useRoute, useRouter } from 'vue-router';
import useBooks from '@/stores/books';

const books = useBooks();
const route = useRoute();
const router = useRouter();

const fetchBook = async (id: number) => {
  await books.get(id);
};
watch(() => route.params.id, fetchBook, { immediate: true });
</script>

<template>
  <a class="link mb-5" @click="router.back()">
    <i class="pi pi-arrow-left"></i>
    Back
  </a>
  <div v-if="books.book.id">
    <Book :book="books.book" />
  </div>
</template>

<style scoped></style>
