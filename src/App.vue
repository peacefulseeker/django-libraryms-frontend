<script setup lang="ts">
import useAuth from '@/stores/auth';
import Toast from 'primevue/toast';

const auth = useAuth();
</script>

<template>
  <Toast />
  <header class="mb-4">
    <nav>
      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/books">Books</RouterLink></li>
        <li v-if="auth.loggedIn"><RouterLink to="/me">Profile</RouterLink></li>
        <li v-if="auth.loggedIn"><button @click="auth.logout()">Logout</button></li>
      </ul>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped>
nav {
  li {
    list-style: none;
    display: inline-block;
    margin-right: 1rem;
  }
}
</style>
