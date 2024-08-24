<script setup lang="ts">
  import ChangePasswordForm from '@/components/auth/ChangePasswordForm.vue';
  import Banner from '@/components/HeroBanner.vue';
</script>

<template #banner>
  <Banner>
    <h2 class="mb-4">Change password</h2>
    <ChangePasswordForm />
  </Banner>
</template>
