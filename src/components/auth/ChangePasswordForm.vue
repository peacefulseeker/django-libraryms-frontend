<script lang="ts" setup>
  import { isAxiosError } from 'axios';
  import Button from 'primevue/button';
  import Password from 'primevue/password';
  import { computed, onMounted, ref, type Ref } from 'vue';
  import { useRouter } from 'vue-router';

  import Spinner from '@/components/Spinner.vue';
  import useAuth from '@/stores/auth';

  const passwordCurrent = ref<any>(null);
  const passwordCurrentError = ref<Ref | null>(null);
  const passwordNew = ref<any>(null);
  const passwordNewError = ref<Ref | null>(null);
  const passwordNewConfirm = ref<any>(null);
  const passwordNewConfirmError = ref<Ref | null>(null);
  const hasError = ref(false);
  const loading = ref(false);
  const router = useRouter();

  const canSubmit = computed(() => {
    return (
      !hasError.value &&
      !loading.value &&
      passwordCurrent.value &&
      passwordNew.value &&
      passwordNewConfirm.value
    );
  });

  const changePassword = async () => {
    try {
      loading.value = true;
      const auth = useAuth();
      await auth.changePassword(passwordCurrent.value, passwordNew.value, passwordNewConfirm.value);
      loading.value = false;
    } catch (error) {
      if (isAxiosError(error)) {
        const { passwordCurrent, passwordNew, passwordNewConfirm } = error?.response?.data || {};
        passwordCurrentError.value = passwordCurrent ? passwordCurrent[0] : null;
        passwordNewError.value = passwordNew ? passwordNew[0] : null;
        passwordNewConfirmError.value = passwordNewConfirm ? passwordNewConfirm[0] : null;
      }
      hasError.value = true;
      loading.value = false;
    }
  };

  const clearError = () => (hasError.value = false);

  onMounted(() => document.getElementById('username')?.focus());
</script>

<template>
  <form @submit.prevent="changePassword" class="banner-form">
    <Password
      v-model="passwordCurrent"
      autocomplete="password"
      placeholder="Current password"
      :feedback="false"
      @input="clearError"
      :invalid="!!passwordCurrentError"
      :disabled="loading" />
    <span v-if="passwordCurrentError" class="input-error">{{ passwordCurrentError }}</span>
    <Password
      v-model="passwordNew"
      autocomplete="password"
      placeholder="New password"
      class="mt-4"
      :feedback="false"
      @input="clearError"
      :invalid="!!passwordNewError"
      :disabled="loading" />
    <span v-if="passwordNewError" class="input-error">{{ passwordNewError }}</span>
    <Password
      v-model="passwordNewConfirm"
      autocomplete="password"
      placeholder="Confirm new password"
      class="mt-4"
      :feedback="false"
      @input="clearError"
      :invalid="!!passwordNewConfirmError"
      :disabled="loading" />
    <span v-if="passwordNewConfirmError" class="input-error">{{ passwordNewConfirmError }}</span>
    <Button class="mt-4" :disabled="!canSubmit" label="Submit" type="submit" />
    <Spinner v-if="loading" class="spinner-form" />
    <a
      href=""
      @click.prevent="router.push({ name: 'account' })"
      class="mt-4 link align-center inline-flex self-center">
      Back to account
    </a>
  </form>
</template>
