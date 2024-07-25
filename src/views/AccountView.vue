<script setup lang="ts">
import Banner from '@/components/Banner.vue';
import useAuth from '@/stores/auth';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';

const auth = useAuth();
const user = auth.user;
const router = useRouter();
</script>

<template>
  <Banner>
    <h1>Hi, {{ user.username }}!</h1>
  </Banner>

  <main>
    <div>
      <p>Your uuid: {{ user.uuid }}</p>
      <p>Your email: {{ user.email }}</p>
      <p>Your first name: {{ user.firstName }}</p>
      <p>Your last name: {{ user.lastName }}</p>
      <Button class="mt-4" @click="router.push({ name: 'reservations' })">View reservations</Button>
    </div>
  </main>
</template>
