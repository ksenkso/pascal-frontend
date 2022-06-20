import { CrudEndpoint } from './utils';
import { Group } from './groups';
import { Student } from './users';

export interface JoinRequest {
  _id: string;
  group: Group;
  student: Student;
  checked?: boolean;
}

export interface CreateJoinRequestDto {
  studentId: string;
  groupId: string;
}

class JoinRequestsEndpoint extends CrudEndpoint<JoinRequest, CreateJoinRequestDto>{
  constructor() {
    super('/join-requests');
  }

  add(requestIds: string[]) {
    return this.transport
      .post(`${this.baseUrl}/add`, { requestIds })
      .then(this.extractData);
  }

  reject(requestIds: string[]) {
    return this.transport
      .post(`${this.baseUrl}/reject`, { requestIds })
      .then(this.extractData);
  }
}

export const joinRequests = new JoinRequestsEndpoint()
