<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

import useAuth from '@/stores/auth';

const auth = useAuth();
const router = useRouter();

const username = ref('');
const password = ref('');

const invalidCredentials = computed(() => !(username.value && password.value));

const loginWithCredentials = async () => {
  await auth.loginWithCredentials(username.value, password.value);
};

const isEmail = computed(() => {
  return username.value.includes('@');
});
</script>

<template>
  <form @submit.prevent="loginWithCredentials">
    <label for="username">Username or Email</label>
    <InputText
      :type="isEmail ? 'email' : 'text'"
      v-model="username"
      autocomplete="username"
      class="mb-4" />
    <label for="password">Pasword</label>
    <Password v-model="password" autocomplete="password" class="mb-4" :feedback="false" />
    <Button :disabled="invalidCredentials" label="Submit" type="submit" />
  </form>
</template>

<style>
form {
  max-width: 400px;
  display: flex;
  flex-direction: column;

  * {
    flex: 1 0 100%;
  }
}
</style>
