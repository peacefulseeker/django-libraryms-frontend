import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type RouteLocationNormalizedLoaded,
  type NavigationGuardNext,
} from 'vue-router';

import useAuth from '@/stores/auth';

const HomeView = () => import('@/views/HomeView.vue');
const UserView = () => import('@/views/UserView.vue');
const BooksView = () => import('@/views/BooksView.vue');
const BookView = () => import('@/views/BookView.vue');

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
    path: '/me',
    name: 'user',
    component: UserView,
  },
  {
    path: '/books',
    name: 'books',
    component: BooksView,
  },
  {
    path: '/books/:id',
    name: 'book',
    component: BookView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

const refreshAuthOnDemand = async () => {
  const auth = getAuth();
  if (auth.loggedOut && auth.refreshable) {
    await auth.refreshAuth();
  }
};

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded) => {
  if (!to.name) {
    return { name: 'home' };
  }
  refreshAuthOnDemand();
});

export default router;
