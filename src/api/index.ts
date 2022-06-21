import { groups } from './groups';
import { joinRequests } from './joinRequests';
import { users } from './users';
import { auth } from '~/api/auth';
import { taskSets } from '~/api/taskSets';
import { tasks } from '~/api/tasks';

export const apiClient = {
  groups,
  joinRequests,
  users,
  auth,
  taskSets,
  tasks,
}
