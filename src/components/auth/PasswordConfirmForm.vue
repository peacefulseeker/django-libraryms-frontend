<script lang="ts" setup>
  import { isAxiosError } from 'axios';
  import Button from 'primevue/button';
  import Password from 'primevue/password';
  import { computed, onMounted, ref, type Ref } from 'vue';
  import { useRoute } from 'vue-router';

  import Spinner from '@/components/Spinner.vue';
  import useAuth from '@/stores/auth';

  const newPassword = ref<any>(null);
  const newPasswordError = ref<Ref | null>(null);
  const newPasswordConfirm = ref<any>(null);
  const hasError = ref(false);
  const loading = ref(false);
  const route = useRoute();

  const canSubmit = computed(() => newPassword.value && newPasswordConfirm.value);

  const confirmPasswordReset = async () => {
    try {
      loading.value = true;
      const auth = useAuth();
      await auth.confirmPasswordReset(
        route.params.token as string,
        newPassword.value,
        newPasswordConfirm.value,
      );
      loading.value = false;
    } catch (error) {
      if (isAxiosError(error)) {
        const { newPassword } = error?.response?.data || {};
        newPasswordError.value = newPassword ? newPassword[0] : null;
      }
      hasError.value = true;
      loading.value = false;
    }
  };

  const clearError = () => (hasError.value = false);

  onMounted(() => document.getElementById('email')?.focus());
</script>

<template>
  <form @submit.prevent="confirmPasswordReset" class="banner-form">
    <Password
      v-model="newPassword"
      placeholder="New password"
      class="mt-4"
      required
      :feedback="false"
      @input="clearError"
      :invalid="!!newPasswordError"
      :disabled="loading" />
    <span v-if="newPasswordError" class="input-error">{{ newPasswordError }}</span>
    <Password
      v-model="newPasswordConfirm"
      placeholder="Confirm password"
      class="mt-4"
      required
      :feedback="false"
      @input="clearError"
      :invalid="!!newPasswordError"
      :disabled="loading" />
    <Button class="mt-4" :disabled="!canSubmit || loading" label="Submit" type="submit" />
    <Spinner v-if="loading" class="spinner-form" />
  </form>
</template>

<style scoped></style>
