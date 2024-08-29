<script lang="ts" setup>
  import Button from 'primevue/button';
  import InputText from 'primevue/inputtext';
  import { computed, onMounted, ref } from 'vue';

  import Spinner from '@/components/Spinner.vue';
  import useAuth from '@/stores/auth';

  const email = ref<any>(null);
  const hasError = ref(false);
  const loading = ref(false);

  const canSubmit = computed(() => !hasError.value && !loading.value && email.value);

  const resetPassword = async () => {
    try {
      loading.value = true;
      const auth = useAuth();
      await auth.requestPasswordReset(email.value);
      loading.value = false;
    } catch (error) {
      hasError.value = true;
      loading.value = false;
    }
  };

  const clearError = () => (hasError.value = false);

  onMounted(() => document.getElementById('email')?.focus());
</script>

<template>
  <form @submit.prevent="resetPassword" class="banner-form">
    <InputText
      id="email"
      type="email"
      v-model="email"
      placeholder="Email"
      autocomplete="email"
      :invalid="hasError"
      :disabled="loading"
      @input="clearError"
      class="mb-4" />
    <Button class="mt-4" :disabled="!canSubmit" label="Submit" type="submit" />
    <Spinner v-if="loading" class="spinner-form" />
  </form>
</template>

<style scoped></style>
