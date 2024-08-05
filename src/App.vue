<script setup lang="ts">
  import Toast from 'primevue/toast';
  import Layout from './views/Layout.vue';
  import { useToast } from 'primevue/usetoast';
  import { onMounted, onUnmounted } from 'vue';
  import { ToastSeverity } from 'primevue/api';

  import useAuth from '@/stores/auth';
  import type { User } from '@/types/auth';
  import type PageError from '@/types/pageError';

  const props = defineProps<{
    user?: User;
    access?: string;
    error?: PageError;
  }>();

  const toast = useToast();

  if (props.access) {
    const auth = useAuth();
    auth.$patch({
      token: props.access,
      user: props.user,
    });
  }
  const handleKeyUp = (e) => {
    if (e.key === 'Escape') {
      toast.removeAllGroups();
    }
  };

  onMounted(() => {
    if (props.error) {
      console.log(props.error);
      toast.add({
        severity: ToastSeverity.WARN,
        summary: props.error.status,
        detail: props.error.message,
        life: 3000,
      });
    }

    document.addEventListener('keyup', handleKeyUp);
  });

  onUnmounted(() => {
    document.removeEventListener('keyup', handleKeyUp);
  });
</script>

<template>
  <Layout>
    <Toast class="max-md:w-56" />
    <RouterView />
  </Layout>
</template>

<style scoped></style>
