<script setup lang="ts">
import useAuth from '@/stores/auth';

const auth = useAuth();
const user = auth.user;
</script>

<template>
  <div v-if="user.uuid">
    <h1>Hi, {{ user.username }}!</h1>
    <p>Your uuid: {{ user.uuid }}</p>
    <p>Your email: {{ user.email }}</p>
    <p>Your first name: {{ user.firstName }}</p>
    <p>Your last name: {{ user.lastName }}</p>
  </div>
  <h1 v-else>Hi!</h1>
</template>
