import { groups } from './groups';
import { joinRequests } from './joinRequests';
import { users } from './users';
import { auth } from '~/api/auth';
import { taskSets } from '~/api/taskSets';
import { tasks } from '~/api/tasks';
import { solutions } from '~/api/solutions';
import { comments } from '~/api/comments';

export const apiClient = {
  groups,
  joinRequests,
  users,
  auth,
  taskSets,
  tasks,
  solutions,
  comments,
}
