<script setup lang="ts">
  import type { User } from '@/types/auth';
  import Layout from './views/Layout.vue';
  import useAuth from './stores/auth';

  const props = defineProps<{
    user?: User;
    access?: string;
  }>();

  if (props.access) {
    const auth = useAuth();
    auth.$patch({
      token: props.access,
      user: props.user,
    });
  }
</script>

<template>
  <Layout>
    <RouterView />
  </Layout>
</template>

<style scoped></style>
