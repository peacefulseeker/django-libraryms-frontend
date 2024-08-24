<script setup lang="ts">
  import Button from 'primevue/button';
  import { ref, watchEffect } from 'vue';
  import { useRouter } from 'vue-router';

  import Banner from '@/components/HeroBanner.vue';
  import Spinner from '@/components/Spinner.vue';
  import useAuth from '@/stores/auth';

  const auth = useAuth();
  const router = useRouter();
  const loading = ref(true);

  watchEffect(async () => {
    if (!auth.user.email) {
      await auth.getUser();
    }
    loading.value = false;
  });
</script>

<template>
  <Banner>
    <h1>Hi, {{ auth.user.username }}!</h1>
  </Banner>
  <main>
    <Spinner v-if="loading" />
    <div v-else>
      <p>Your email: {{ auth.user.email }}</p>
      <p>Your first name: {{ auth.user.firstName }}</p>
      <p>Your last name: {{ auth.user.lastName }}</p>
      <a class="link" @click="router.push({ name: 'change_password' })">Change password</a> <br />
      <Button class="mt-4" @click="router.push({ name: 'reservations' })">View reservations</Button>
    </div>
  </main>
</template>
