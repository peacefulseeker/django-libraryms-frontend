<script setup lang="ts">
  import PasswordConfirmForm from '@/components/auth/PasswordConfirmForm.vue';
  import Banner from '@/components/HeroBanner.vue';
</script>

<template #banner>
  <Banner>
    <h2 class="mb-4">Set your new password below</h2>
    <PasswordConfirmForm />
  </Banner>
</template>
