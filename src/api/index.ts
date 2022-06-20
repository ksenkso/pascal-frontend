import { groups } from './groups';
import { joinRequests } from './joinRequests';
import { users } from './users';
import { auth } from '~/api/auth';

export const apiClient = {
  groups,
  joinRequests,
  users,
  auth,
}
