<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue';

  import InputText from 'primevue/inputtext';
  import Password from 'primevue/password';
  import Button from 'primevue/button';
  import Spinner from './Spinner.vue';
  import useAuth from '@/stores/auth';
  const username = ref<any>(null);
  const password = ref<any>(null);
  const hasError = ref(false);
  const loading = ref(false);

  const canSubmit = computed(() => username.value && password.value);

  const login = async () => {
    try {
      loading.value = true;
      const auth = useAuth();
      await auth.login(username.value, password.value);
      loading.value = false;
    } catch (error) {
      hasError.value = true;
      loading.value = false;
    }
  };

  const isEmail = computed(() => {
    return username.value?.includes('@');
  });

  const clearError = () => (hasError.value = false);

  // could not it working with refs only
  onMounted(() => document.getElementById('username')?.focus());
</script>

<template>
  <form @submit.prevent="login" class="relative m-auto">
    <InputText
      id="username"
      :type="isEmail ? 'email' : 'text'"
      v-model="username"
      placeholder="Username"
      autocomplete="username"
      :invalid="hasError"
      :disabled="loading"
      @input="clearError"
      class="mb-4" />
    <Password
      v-model="password"
      autocomplete="password"
      placeholder="Password"
      class="mb-4"
      :feedback="false"
      @input="clearError"
      :invalid="hasError"
      :disabled="loading" />
    <Button :disabled="!canSubmit || loading" label="Submit" type="submit" />
    <Spinner v-if="loading" class="absolute h-full w-full" />
  </form>
</template>

<style scoped>
  form {
    width: 400px;
    display: flex;
    flex-direction: column;

    * {
      flex: 1 0 100%;
    }
  }
</style>
