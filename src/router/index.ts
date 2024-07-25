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
const ReservationsView = () => import('@/views/Reservations.vue');
const LoginView = () => import('@/views/LoginView.vue');

const BookView = () => import('@/views/BookView.vue');
const BooksView = () => import('@/views/BooksView.vue');

const getAuth = () => {
  const auth = useAuth();
  return auth;
};

const refreshAuthOnDemand = async () => {
  const auth = getAuth();
  if (auth.loggedOut && auth.refreshable) {
    await auth.refreshAuth();
  }
  return auth;
};

const redirectBasedOnAuth = (to: RouteLocationNormalized, auth: ReturnType<typeof getAuth>) => {
  if (to.meta.authRequired && !auth.loggedIn) {
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    };
  } else if (to.name === 'login' && auth.loggedIn) {
    return {
      name: 'home'
    };
  }
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
    path: '/books',
    name: 'books',
    component: BooksView,
    meta: {
      showSearchWidget: true,
    }
  },
  {
    path: '/books/:id',
    name: 'book',
    component: BookView,
    meta: {
      showSearchWidget: true,
    }
  },
  {
    path: '/account',
    name: 'account',
    meta: { authRequired: true },
    component: AccountView,
  },
  {
    path: '/account/reservations',
    name: 'reservations',
    meta: { authRequired: true },
    component: ReservationsView,
  },
];

const router: RouterExtended = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
} as RouterOptions);


router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded) => {
  if (!to.name) {
    return { name: 'home' };
  }
  const auth = await refreshAuthOnDemand();
  return redirectBasedOnAuth(to, auth)
});

export default router;
