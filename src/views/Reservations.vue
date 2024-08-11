<script setup lang="ts">
  import { ref, watch } from 'vue';

  import useBooks from '@/stores/books';
  import BookList from '@/components/BookList.vue';
  import Spinner from '@/components/Spinner.vue';
  import Banner from '@/components/HeroBanner.vue';
  import { useRouter } from 'vue-router';

  const loading = ref(true);
  const books = ref([]);
  const router = useRouter();

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
    <div v-else>
      <h2 v-if="!books.length">
        No reservations, check out books:
        <a href="" @click.prevent="router.push({ name: 'books' })" class="link">here</a>
      </h2>
      <BookList :books="books" :showTerm="true" :showReservationId="true" />
    </div>
  </main>
</template>
