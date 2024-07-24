<script setup lang="ts">
import useBooks from '@/stores/books';
import { ref, watchEffect } from 'vue';
import ProgressSpinner from 'primevue/progressspinner';

const books = ref([]);
const loading = ref(true);

watchEffect(async () => {
  let booksList = await useBooks().list();
  books.value = booksList.filter((book) => book.isAvailable);
  loading.value = false;
});
</script>

<template>
  <div class="text-center">
    <ProgressSpinner
      v-if="loading"
      unstyled
      style="width: 50px; height: 50px"
      strokeWidth="4"
      animationDuration=".5s" />
    <div v-else>
      <h2 class="my-10">New books for reservation</h2>
      <ul class="m-auto flex flex-wrap justify-center md:w-2/3" style="gap: 30px">
        <li v-for="book in books" :key="book.id" class="book-item">
          <RouterLink class="link" :to="{ name: 'book', params: { id: book.id } }">
            <div
              class="book-cover transition-background-color flex items-center justify-center rounded transition-opacity"
              :class="{ 'no-cover': !book.coverImageUrl }"
              :style="{
                'background-image': book.coverImageUrl ? 'url(' + book.coverImageUrl + ')' : 'none',
              }"
              alt="book cover">
              <i v-if="!book.coverImageUrl" class="pi pi-book hover:text-white-300 text-white"></i>
            </div>
            <h3 class="bold mt-2 font-medium">{{ book.title }}</h3>
          </RouterLink>
          <span v-if="book.author">{{ book.author.lastName }}, {{ book.author.firstName }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.link {
  width: 100%;
}

.book-item {
  width: 140px;

  &:hover .book-cover.no-cover {
    background-color: rgb(var(--primary-400));
  }

  &:hover .book-cover {
    opacity: 0.8;
  }
}

.book-cover {
  min-height: 200px;
  background-size: 100% 100%;

  &.no-cover {
    background-color: rgb(var(--primary-500));
    position: relative;

    &::before {
      content: '';
      display: block;
      background-color: white;
      height: 100%;
      width: 2px;
      position: absolute;
      left: 2px;
    }
  }
}
</style>
