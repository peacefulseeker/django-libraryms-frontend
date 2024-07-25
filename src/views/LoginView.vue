<script setup lang="ts">
import Banner from '@/components/Banner.vue';
import LoginForm from '@/components/LoginForm.vue';
import useAuth from '@/stores/auth';

const auth = useAuth();
</script>

<template #banner>
  <Banner>
    <LoginForm v-if="auth.loggedOut" />
  </Banner>
</template>
