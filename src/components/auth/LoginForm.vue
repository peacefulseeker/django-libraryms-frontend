<script lang="ts" setup>
  import Button from 'primevue/button';
  import InputText from 'primevue/inputtext';
  import Password from 'primevue/password';
  import { computed, onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';

  import Spinner from '@/components/Spinner.vue';
  import useAuth from '@/stores/auth';

  const username = ref<any>(null);
  const password = ref<any>(null);
  const hasError = ref(false);
  const loading = ref(false);
  const router = useRouter();

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

  onMounted(() => document.getElementById('username')?.focus());
</script>

<template>
  <form @submit.prevent="login" class="relative m-auto flex w-96 flex-col max-sm:w-56">
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
    <div class="mt-3 text-center">
      Don't have account yet? Request registration
      <a href="" class="link" @click.prevent="router.push({ name: 'register' })">here</a>
    </div>
  </form>
</template>

<style scoped></style>
