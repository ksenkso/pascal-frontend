import { CrudEndpoint } from './utils';

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
}

export const groups = new GroupsEndpoint();
