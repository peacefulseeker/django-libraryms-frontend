<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.back() || router.push({ name: 'books' });
};
</script>

<template>
  <a class="link mb-5 inline-flex items-center hover:no-underline" @click="goBack">
    <i class="pi pi-arrow-left mr-2"></i>
    Back
  </a>
</template>

<style scoped></style>
