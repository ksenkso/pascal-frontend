import { useRouter } from 'vue-router';
import { apiClient } from '~/api';
import { useLoading } from '~/composables/useLoading';
import { useAuth } from '~/composables/useAuth';
import { computed } from 'vue';
import { Role } from '~/api/users';

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

  const isTeacher = computed(() => auth.currentUser.value!.roles.includes(Role.Teacher));
  const isAdmin = computed(() => auth.currentUser.value!.roles.includes(Role.Admin));
  const isStudent = computed(() => auth.currentUser.value!.roles.includes(Role.Student));

  return {
    currentUser: auth.currentUser,
    loadUser,
    isLoading,
    isTeacher,
    isAdmin,
    isStudent
  }
}
