import { defineStore } from 'pinia';
import { ToastSeverity } from 'primevue/api';
import type { ToastMessageOptions } from 'primevue/toast';

import router from '@/router';
import type { User } from '@/types/auth';
import { loginWithCredentials, clearToken, refreshAuth } from '@/api/auth';

interface AuthStoreState {
  token: string | undefined;
  refresh_attempted: boolean;
  user: User;
}

const useAuth = defineStore('auth', {
  state: (): AuthStoreState => {
    return {
      token: undefined,
      refresh_attempted: false,
      user: {
        uuid: '',
        email: '',
        username: '',
        firstName: '',
        lastName: '',
      },
    };
  },
  getters: {
    refreshable(state) {
      return !state.refresh_attempted;
    },
    loggedIn(state) {
      return state.token !== undefined;
    },
    loggedOut() {
      return !this.loggedIn;
    },
  },
  actions: {
    addToast(detail: string, severity = ToastSeverity.SUCCESS) {
      window.$toast.add({
        severity,
        detail: detail,
        life: 3000,
      } as ToastMessageOptions);
    },

    async refreshAuth() {
      try {
        const { access, user } = await refreshAuth();
        this.token = access;
        this.setUser(user);
      } catch (e) {
        // login required
      }
      this.refresh_attempted = true;
    },

    async login(username: string, password: string) {
      const { access, user } = await loginWithCredentials(username, password);
      this.token = access;
      this.setUser(user);

      const { query } = router.currentRoute.value;
      query.redirect
        ? router.push({ path: decodeURIComponent(String(query.redirect)) })
        : router.push({ name: 'account' });

      this.addToast('Login successful');
    },

    logout() {
      this.token = undefined;
      clearToken();
      const route = router.currentRoute.value;
      if (route.meta.authRequired) {
        router.push({ name: 'login', query: { redirect: route.fullPath } });
      }

      this.addToast('Logout successful');
    },

    setUser(user: User | undefined) {
      if (user) {
        this.user = user;
      }
    },
  },
});

export default useAuth;
