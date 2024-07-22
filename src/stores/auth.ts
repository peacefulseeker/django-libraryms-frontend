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
        console.error('COULD NOT REFRESH, AUTH REQUIRED', e);
      }
      this.refresh_attempted = true;
    },

    async loginWithCredentials(username: string, password: string) {
      const { access, user } = await loginWithCredentials(username, password);
      this.token = access;
      this.setUser(user);
      router.push({ name: 'user' });
    },

    logout() {
      this.token = undefined;
      clearToken();
      router.push({ name: 'home' });
    },

    setUser(user: User | undefined) {
      if (user) {
        this.user = user;
      }
    },
  },
});

export default useAuth;
