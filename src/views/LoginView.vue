<script setup lang="ts">
  import LoginForm from '@/components/auth/LoginForm.vue';
  import Banner from '@/components/HeroBanner.vue';
</script>

<template #banner>
  <Banner>
    <h2 class="mb-4">Login</h2>
    <LoginForm />
  </Banner>
</template>
