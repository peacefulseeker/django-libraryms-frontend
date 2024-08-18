<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const goBack = () => {
    if (router.back() === undefined) {
      router.push({ name: 'books' });
    }
  };
</script>

<template>
  <a href="" class="link mb-5 inline-flex items-center hover:no-underline" @click.prevent="goBack">
    <i class="pi pi-arrow-left mr-2"></i>
    Back
  </a>
</template>

<style scoped></style>
