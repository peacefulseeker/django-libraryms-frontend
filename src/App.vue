<script setup lang="ts">
  import Toast, { type ToastMessageOptions } from 'primevue/toast';
  import Layout from './views/Layout.vue';
  import { useToast } from 'primevue/usetoast';
  import { onMounted, onUnmounted } from 'vue';
  import { ToastSeverity } from 'primevue/api';

  import useAuth from '@/stores/auth';
  import type { RootProps } from '@/types/rootProps';

  const props = defineProps<RootProps>();

  const toast = useToast();

  if (props.access) {
    const auth = useAuth();
    auth.$patch({
      token: props.access,
      user: props.user,
    });
  }
  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      toast.removeAllGroups();
    }
  };

  onMounted(() => {
    if (props.error) {
      toast.add({
        severity: ToastSeverity.WARN,
        summary: props.error.status.toString(),
        detail: props.error.message,
        life: 3000,
      } as ToastMessageOptions);
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
