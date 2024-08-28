<script setup lang="ts">
  import PasswordResetForm from '@/components/auth/PasswordResetForm.vue';
  import Banner from '@/components/HeroBanner.vue';
</script>

<template #banner>
  <Banner>
    <h2 class="mb-4">Request password reset</h2>
    <PasswordResetForm />
  </Banner>
</template>
