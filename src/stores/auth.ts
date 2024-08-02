import { defineStore } from 'pinia';

import router from '@/router';
import type { User } from '@/types/auth';
import { loginWithCredentials, clearToken, refreshAuth } from '@/api/auth';

type AuthStoreState = {
  token: string | undefined;
  refresh_attempted: boolean;
  user: User;
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
    refreshable(state: AuthStoreState) {
      return !state.refresh_attempted;
    },
    loggedIn(state: AuthStoreState) {
      return state.token !== undefined;
    },
    loggedOut(state: AuthStoreState) {
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
