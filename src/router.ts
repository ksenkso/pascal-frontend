import { RouteRecordRaw } from 'vue-router';
import Login from '~/pages/Login.vue';
import Register from '~/pages/Register.vue';
import UserHomePage from '~/pages/UserHomePage.vue';
import GroupPage from '~/pages/GroupPage.vue';
import SolutionPage from '~/pages/SolutionPage.vue';
// Auto generates routes from vue files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const pages = import.meta.glob('./pages/*.vue');
const publicPages = new Set<string>([
  '/login',
  '/register',
  '/about'
])

export const routes: RouteRecordRaw[] = [
  {
    name: 'INDEX',
    path: '/',
    component: UserHomePage,
    meta: {
      private: true,
    }
  },
  {
    name: 'LOGIN',
    path: '/login',
    component: Login
  },
  {
    name: 'REGISTER',
    path: '/register-student',
    component: Register,
    props: {
      mode: 'student'
    }
  },
  {
    name: 'SOLUTION_PAGE',
    path: '/solution',
    component: SolutionPage
  },
  {
    name: 'GROUP_PAGE',
    path: '/group/:id',
    component: GroupPage
  }
]
