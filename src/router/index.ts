import {
  createRouter,
  createWebHistory,
  type RouteLocation,
  type RouteLocationNormalized,
  type RouteLocationNormalizedLoaded,
  type RouterOptions,
} from 'vue-router';

import useAuth from '@/stores/auth';

const HomeView = () => import('@/views/HomeView.vue');
const AccountView = () => import('@/views/AccountView.vue');
const ChangePasswordView = () => import('@/views/ChangePasswordView.vue');
const ResetPasswordView = () => import('@/views/ResetPasswordView.vue');
const PasswordConfirmView = () => import('@/views/PasswordConfirmView.vue');
const ReservationsView = () => import('@/views/Reservations.vue');
const LoginView = () => import('@/views/LoginView.vue');
const RegisterView = () => import('@/views/RegisterView.vue');

const BookView = () => import('@/views/BookView.vue');
const BooksView = () => import('@/views/BooksView.vue');

const getAuth = () => {
  const auth = useAuth();
  return auth;
};

const refreshAuthOnDemand = async (route: RouteLocationNormalized) => {
  const auth = getAuth();
  if (auth.loggedOut && auth.refreshable) {
    await auth.refreshAuth(route);
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
      name: 'home',
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
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/books',
    name: 'books',
    component: BooksView,
    meta: {
      showSearchWidget: true,
    },
  },
  {
    path: '/books/:id',
    name: 'book',
    component: BookView,
    meta: {
      showSearchWidget: true,
    },
  },
  {
    path: '/account',
    name: 'account',
    meta: { authRequired: true, fetchUser: true },
    component: AccountView,
  },
  {
    path: '/account/change-password',
    name: 'change_password',
    meta: { authRequired: true },
    component: ChangePasswordView,
  },
  {
    path: '/account/reset-password',
    name: 'reset_password',
    component: ResetPasswordView,
  },
  {
    path: '/account/reset-password/:token',
    name: 'reset_password_confirm',
    component: PasswordConfirmView,
    // beforeEnter: (to: RouteLocation) => {
    //   const token = to.params.token;
    //   console.log(token);
    //   // if (token.length < 32) {
    //   //   return { name: 'reset_password' };
    //   // }
    // },
  },
  {
    path: '/account/reservations',
    name: 'reservations',
    meta: { authRequired: true },
    component: ReservationsView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
} as RouterOptions);

router.beforeEach(async (to: RouteLocationNormalized, _from: RouteLocationNormalizedLoaded) => {
  if (!to.name) {
    return { name: 'home' };
  }
  const auth = await refreshAuthOnDemand(to);
  return redirectBasedOnAuth(to, auth);
});

export default router;
