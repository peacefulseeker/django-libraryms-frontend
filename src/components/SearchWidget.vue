<script setup lang="ts">
  import Button from 'primevue/button';
  import InputText from 'primevue/inputtext';
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';

  import router from '@/router';

  const route = useRoute();

  const search = ref(route.query.q as string);

  const searchBooks = () => {
    if (route.name !== 'books') {
      router.push({ name: 'books', query: { q: search.value } });
    } else {
      router.push({ query: { q: search.value } });
    }
  };

  const vFocus = {
    mounted: (el: HTMLInputElement) => {
      el.focus();
    },
  };
</script>
<template>
  <form @submit.prevent="searchBooks" class="flex items-stretch justify-center">
    <InputText
      v-model="search"
      v-focus
      size="large"
      class="w-96 rounded-br-none rounded-tr-none invalid:hover:border-primary invalid:focus:ring-0 max-md:w-56"
      placeholder="Book title or author" />
    <Button class="rounded-bl-none rounded-tl-none" type="submit">
      <i class="pi pi-search"></i>
    </Button>
  </form>
</template>

<style scoped></style>
