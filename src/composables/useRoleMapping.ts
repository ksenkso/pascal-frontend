import { computed } from 'vue';
import { useAuth } from '~/composables/useAuth';
import { Role } from '~/api/users';

interface RoleMapping<T = any> {
  Student: T;
  Teacher: T;
  Admin: T;
}

export const useRoleMapping = <T = any>(mapping: RoleMapping<T>) => {
  const auth = useAuth();

  return computed(() => {
    const roles = auth.currentUser.value!.roles;
    switch (true) {
      case roles.includes(Role.Teacher): return mapping.Teacher;
      case roles.includes(Role.Student): return mapping.Student;
      case roles.includes(Role.Admin): return mapping.Admin;
      default: return null;
    }
  })
}
