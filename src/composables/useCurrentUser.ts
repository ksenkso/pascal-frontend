import { useRouter } from 'vue-router';
import { apiClient } from '~/api';
import { useLoading } from '~/composables/useLoading';
import { useAuth } from '~/composables/useAuth';

export const useCurrentUser = () => {
  const router = useRouter();
  const auth = useAuth();

  const getUser = () => apiClient.users.getMe()
    .then((user) => {
      if (!user) {
        router.push('/login');
      }

      auth.authorize(user);

      return user;
    })
    .catch(() => {
      router.push('/login');
    });
  const { run: loadUser, isLoading } = useLoading(getUser);

  return {
    currentUser: auth.currentUser,
    loadUser,
    isLoading
  }
}
