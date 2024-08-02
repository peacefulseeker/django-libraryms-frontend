<script setup lang="ts">
  import router from '@/router';
  import Button from 'primevue/button';
  import InputText from 'primevue/inputtext';
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  const route = useRoute();

  const search = ref(route.query.q);

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
  <form @submit.prevent="searchBooks" class="search-form flex items-stretch">
    <InputText
      v-model="search"
      v-focus
      minlength="3"
      style="width: 400px"
      size="large"
      class="w-60 rounded-br-none rounded-tr-none invalid:hover:border-primary invalid:focus:ring-0"
      placeholder="Book title or author" />
    <Button class="rounded-bl-none rounded-tl-none" type="submit">
      <i class="pi pi-search"></i>
    </Button>
  </form>
</template>

<style scoped></style>
