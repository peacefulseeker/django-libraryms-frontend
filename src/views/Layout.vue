<script setup lang="ts">
  import Toast from 'primevue/toast';
  import Menu from 'primevue/menu';

  import useAuth from '@/stores/auth';
  import SearchWidget from '@/components/SearchWidget.vue';
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  const route = useRoute();
  const router = useRouter();
  const auth = useAuth();
  const accountMenu = ref(null);
  const accountMenuItems = ref([
    {
      label: 'Account',
      command: () => router.push({ name: 'account' }),
    },
    {
      label: 'Reservations',
      command: () => router.push({ name: 'reservations' }),
    },
    {
      label: 'Logout',
      command: () => auth.logout(),
    },
  ]);
  const toggleAccountMenu = (event: MouseEvent) => {
    accountMenu.value.toggle(event);
  };
</script>

<template>
  <Toast />

  <header class="bg-primary-600 py-4">
    <nav class="container mx-auto px-4">
      <ul class="flex items-center text-white">
        <li>
          <RouterLink to="/">
            <img src="/logo-light.svg" class="h-16" alt="logo" />
          </RouterLink>
        </li>
        <li class="ml-8">
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li class="ml-8">
          <RouterLink to="/books">Books</RouterLink>
        </li>
        <li class="flex flex-1 justify-end">
          <ul class="flex items-center">
            <li class="mr-4 max-md:hidden" v-if="route.meta.showSearchWidget">
              <SearchWidget />
            </li>
            <li class="mr-4" v-if="auth.loggedOut"><RouterLink to="/login">Login</RouterLink></li>
            <li v-if="auth.loggedIn">
              <i
                class="pi pi-bars !block"
                style="font-size: 24px; cursor: pointer"
                @click="toggleAccountMenu" />
              <Menu ref="accountMenu" :model="accountMenuItems" :popup="true" />
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>

  <slot />

  <footer class="absolute bottom-0 w-full bg-slate-100 py-2">
    <div class="container mx-auto px-4 text-right">
      <a class="link" href="https://github.com/peacefulseeker/" target="_blank">
        @peacefulseeker {{ new Date().getFullYear() }}
      </a>
    </div>
  </footer>
</template>
