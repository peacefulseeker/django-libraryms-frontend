import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type RouteLocationNormalizedLoaded,
  type NavigationGuardNext,
  type RouterOptions,
  type Router,
} from 'vue-router';

import useAuth from '@/stores/auth';

const HomeView = () => import('@/views/HomeView.vue');
const AccountView = () => import('@/views/AccountView.vue');
const BookView = () => import('@/views/BookView.vue');
const LoginView = () => import('@/views/LoginView.vue');

const getAuth = () => {
  const auth = useAuth();
  return auth;
};

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/books/:id',
    name: 'book',
    component: BookView,
  },

  {
    path: '/account',
    name: 'account',
    meta: { authRequired: true },
    component: AccountView,
  },
];

const router: RouterExtended = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
} as RouterOptions);

const refreshAuthOnDemand = async () => {
  const auth = getAuth();
  if (auth.loggedOut && auth.refreshable) {
    await auth.refreshAuth();
  }
};

const checkRoutePermitted = (to: RouteLocationNormalized) => {
  const auth = getAuth();
  if (to.meta.authRequired && !auth.loggedIn) {
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    };
  }
};

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded) => {
  if (!to.name) {
    return { name: 'home' };
  }
  refreshAuthOnDemand();
  return checkRoutePermitted(to);
});

export default router;
