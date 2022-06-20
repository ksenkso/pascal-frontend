import { CrudEndpoint } from './utils';
import { Student } from '~/api/users';

export interface Group {
  _id: string;
  name: string;
}

export interface CreateGroupDto {
  name: string;
}

export interface UpdateGroupDto {
  name: string;
}

class GroupsEndpoint extends CrudEndpoint<Group, CreateGroupDto, UpdateGroupDto> {
  constructor() {
    super('/group');
  }

  getStudents(id: string) {
    return this.transport
      .get<Student[]>(`${this.baseUrl}/${id}/students`)
      .then(this.extractData);
  }
}

export const groups = new GroupsEndpoint();
