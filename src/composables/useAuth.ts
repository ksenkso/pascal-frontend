import { ref } from 'vue';
import { User } from '~/api/users';
import { Router, useRouter } from 'vue-router';

const LAST_LOGIN = 'lastLogin';
const USER = 'user';

const lastLogin = localStorage.getItem(LAST_LOGIN);
let initialState = false;

if (lastLogin) {
  initialState = new Date(+lastLogin) > new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
}

const isAuthorized = ref(initialState);
const userData = localStorage.getItem(USER);
const currentUser = ref<User | undefined>(userData && JSON.parse(userData));
let router: Router | undefined;

export const useAuth = (r?: Router) => {
  if (!router && r) {
    router = r;
  }

  const authorize = (user: User) => {
    currentUser.value = user;
    isAuthorized.value = true;
    localStorage.setItem(LAST_LOGIN, Date.now().toString());
    localStorage.setItem(USER, JSON.stringify(user));
  }

  const logout = () => {
    currentUser.value = undefined;
    isAuthorized.value = false;
    localStorage.removeItem(LAST_LOGIN);
    localStorage.removeItem(USER);
    if (router) {
      router.push('/login');
    }
  }

  return {
    currentUser,
    isAuthorized,
    authorize,
    logout,
  }
}
