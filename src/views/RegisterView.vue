<script setup lang="ts">
  import RegisterForm from '@/components/auth/RegisterForm.vue';
  import Banner from '@/components/HeroBanner.vue';
</script>

<template #banner>
  <Banner>
    <h2 class="mb-5">Registration request</h2>
    <RegisterForm />
  </Banner>
</template>
