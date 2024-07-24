<script setup lang="ts">
import useAuth from '@/stores/auth';
import Toast from 'primevue/toast';

const auth = useAuth();
</script>

<template>
  <Toast />
  <header class="mb-4 bg-primary-600 py-2">
    <nav class="container-xl container max-md:px-4 md:mx-auto">
      <ul class="align-center flex items-center">
        <li class="mr-4">
          <RouterLink to="/">
            <img src="/logo-light.svg" class="h-16" alt="logo" />
          </RouterLink>
        </li>
        <!-- <li class="mr-4"><RouterLink to="/books">Books</RouterLink></li> -->
        <li class="flex flex-1 justify-end">
          <ul class="flex text-white">
            <li class="mr-4" v-if="auth.loggedOut"><RouterLink to="/login">Login</RouterLink></li>
            <li class="mr-4" v-if="auth.loggedIn">
              <RouterLink to="/account">Account</RouterLink>
            </li>
            <li v-if="auth.loggedIn"><button @click="auth.logout()">Logout</button></li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
  <!-- <div class="banner"></div> -->
  <main class="container-xl container md:mx-auto">
    <slot />
  </main>
</template>

<style scoped>
.banner {
  min-height: 50vh;
}
</style>
