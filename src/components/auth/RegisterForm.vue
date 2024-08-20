<script lang="ts" setup>
  import Button from 'primevue/button';
  import InputText from 'primevue/inputtext';
  import Password from 'primevue/password';
  import { computed, onMounted, ref, type Ref } from 'vue';

  import Spinner from '@/components/Spinner.vue';
  import useAuth from '@/stores/auth';
  import { APIError } from '@/types/axios';

  const username = ref<Ref | null>(null);
  const usernameError = ref<Ref | null>(null);
  const email = ref<Ref | null>(null);
  const emailError = ref<Ref | null>(null);
  const password = ref<Ref | null>(null);
  const passwordError = ref<Ref | null>(null);
  const passwordConfirm = ref<Ref | null>(null);
  const firstName = ref<Ref | string>('');
  const lastName = ref<Ref | string>('');
  const hasError = ref(false);
  const loading = ref(false);

  const canSubmit = computed(() => {
    return username.value && password.value && passwordConfirm.value && email.value;
  });

  const register = async () => {
    try {
      loading.value = true;
      const auth = useAuth();
      await auth.register({
        username: username.value,
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        password: password.value,
        passwordConfirm: passwordConfirm.value,
      });
      loading.value = false;
    } catch (error) {
      if (error instanceof APIError) {
        const { password, username, email } = error?.response?.data || {};
        passwordError.value = password ? password[0] : null;
        usernameError.value = username ? username[0] : null;
        emailError.value = email ? email[0] : null;
      }
      hasError.value = true;
      loading.value = false;
    }
  };

  const clearError = () => (hasError.value = false);

  onMounted(() => document.getElementById('username')?.focus());
</script>

<template>
  <form @submit.prevent="register" class="relative m-auto flex w-96 flex-col max-sm:w-56">
    <InputText
      id="username"
      v-model="username"
      placeholder="Username"
      required
      :invalid="!!usernameError"
      :disabled="loading"
      @input="clearError" />
    <span v-if="usernameError" class="input-error text-red-500">{{ usernameError }}</span>

    <InputText
      id="email"
      type="email"
      required
      v-model="email"
      placeholder="Email"
      autocomplete="email"
      :invalid="!!emailError"
      :disabled="loading"
      @input="clearError"
      class="mt-4" />
    <span v-if="emailError" class="input-error text-red-500">{{ emailError }}</span>
    <InputText
      id="firstName"
      v-model="firstName"
      placeholder="First name"
      :disabled="loading"
      class="mt-4" />
    <InputText
      id="lastName"
      v-model="lastName"
      placeholder="Last name"
      :disabled="loading"
      class="mt-4" />
    <Password
      v-model="password"
      placeholder="Password"
      class="mt-4"
      required
      :feedback="false"
      @input="clearError"
      :invalid="!!passwordError"
      :disabled="loading" />
    <span v-if="passwordError" class="input-error text-red-500">{{ passwordError }}</span>
    <Password
      v-model="passwordConfirm"
      placeholder="Password confirmation"
      class="mt-4"
      required
      :feedback="false"
      @input="clearError"
      :invalid="!!passwordError"
      :disabled="loading" />
    <Button class="mt-4" :disabled="loading || !canSubmit" label="Submit" type="submit" />
    <Spinner v-if="loading" class="absolute h-full w-full" />
    <p class="mt-3 text-xs">
      Upon submission your request will be sent to the administrator for approval. Afterwards you
      will need to arrive to the library and present your ID card to the librarian for verification.
    </p>
  </form>
</template>

<style scoped>
  .input-error {
    @apply text-xs text-red-500;
  }
</style>
