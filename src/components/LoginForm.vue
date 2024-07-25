<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';

import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

import useAuth from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';

const username = ref<any>(null);
const password = ref<any>(null);
const hasError = ref(false);

const auth = useAuth();
const route = useRoute();
const router = useRouter();

const canSubmit = computed(() => username.value && password.value);

const login = async () => {
  try {
    await auth.login(username.value, password.value);
  } catch (error) {
    hasError.value = true;
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
  <form @submit.prevent="login" class="m-auto">
    <InputText
      id="username"
      :type="isEmail ? 'email' : 'text'"
      v-model="username"
      placeholder="Username"
      autocomplete="username"
      :invalid="hasError"
      @input="clearError"
      class="mb-4" />
    <Password
      v-model="password"
      autocomplete="password"
      placeholder="Password"
      class="mb-4"
      :feedback="false"
      @input="clearError"
      :invalid="hasError" />
    <Button :disabled="!canSubmit" label="Submit" type="submit" />
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
