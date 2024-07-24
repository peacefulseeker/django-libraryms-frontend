import { defineStore } from 'pinia';
import type { AuthToken } from '@/types/auth';
import { loginWithCredentials, clearToken, refreshAuth } from '@/api/auth';
import { computed } from 'vue';
import router from '@/router';

interface User {
  uuid: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

type AuthStoreState = {
  token: AuthToken | undefined;
  refresh_attempted: boolean;
  user: User | undefined;
};

const useAuth = defineStore('auth', {
  state: (): AuthStoreState => {
    return {
      token: undefined,
      refresh_attempted: false,
      user: {
        uuid: '',
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
    loggedOut(state) {
      return !state.loggedIn;
    },
  },
  actions: {
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
    },

    logout() {
      this.token = undefined;
      clearToken();
      const route = router.currentRoute.value;
      if (route.meta.authRequired) {
        router.push({ name: 'login', query: { redirect: route.fullPath } });
      }
    },

    setUser(user: User | undefined) {
      if (user) {
        this.user = user;
      }
    },
  },
});

export default useAuth;
