<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue';
import useAuth from '@/stores/auth';

const auth = useAuth();
</script>

<template>
  <LoginForm v-if="auth.loggedOut" />
</template>
