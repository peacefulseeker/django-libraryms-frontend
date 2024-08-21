import { defineStore } from 'pinia';
import { ToastSeverity } from 'primevue/api';
import type { ToastMessageOptions } from 'primevue/toast';
import type { RouteLocationNormalized } from 'vue-router';

import { clearToken, getUser, loginWithCredentials, refreshAuth, registerMember } from '@/api/auth';
import router from '@/router';
import type { RegistrationCredentials, User } from '@/types/auth';

interface AuthStoreState {
  token: string | undefined;
  refreshAttempted: boolean;
  user: User;
}

const useAuth = defineStore('auth', {
  state: (): AuthStoreState => {
    return {
      token: undefined,
      refreshAttempted: false,
      user: {
        email: '',
        username: '',
        firstName: '',
        lastName: '',
      },
    };
  },
  getters: {
    refreshable(state) {
      return !state.refreshAttempted;
    },
    loggedIn(state) {
      return state.token !== undefined;
    },
    loggedOut() {
      return !this.loggedIn;
    },
  },
  actions: {
    addToast(detail: string, life = 3000, severity = ToastSeverity.SUCCESS) {
      window.$toast.add({
        severity,
        detail,
        life,
      } as ToastMessageOptions);
    },

    async refreshAuth(route: RouteLocationNormalized) {
      try {
        const { access, user } = await refreshAuth(Boolean(route.meta.fetchUser));
        this.token = access;
        this.setUser(user);
      } catch (e) {
        // login required
      }
      this.refreshAttempted = true;
    },

    async login(username: string, password: string) {
      const { query } = router.currentRoute.value;
      const fetchUser = query.redirect?.includes('account');
      const { access, user } = await loginWithCredentials(username, password, fetchUser);
      this.token = access;
      this.setUser(user);

      query.redirect
        ? router.push({ path: decodeURIComponent(String(query.redirect)) })
        : router.push({ name: 'account' });

      this.addToast('Login successful');
    },

    async register({
      username,
      email,
      password,
      passwordConfirm,
      firstName,
      lastName,
    }: RegistrationCredentials) {
      const { registrationCode } = await registerMember({
        username,
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
      });

      this.addToast(
        `Your registation request(code: ${registrationCode}) received and will be reviewed soon`,
        6000,
      );
      router.push({ name: 'home' });
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

    setUser(user: User) {
      if (user) {
        this.user = user;
      }
    },

    async getUser() {
      const user = await getUser();
      this.setUser(user);
    },
  },
});

export default useAuth;
