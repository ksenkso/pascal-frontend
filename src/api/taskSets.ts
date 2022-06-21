import { CrudEndpoint } from '~/api/utils';
import { Group } from '~/api/groups';
import { Task } from '~/api/tasks';

export enum ResourceScope {
  Private = 'Private',
  Public = 'Public',
  Group = 'Group',
}

export interface TaskSet {
  _id: string;

  name: string;

  description: string;

  scope: ResourceScope;

  isPart: boolean;

  group: Group;

  tasks: Task[];
}

interface CreateTaskSetDto {
  name: string;

  description: string;

  scope: ResourceScope;

  isPart: boolean;

  group: string;
}

export type UpdateTaskSetDto = Partial<CreateTaskSetDto>;

class TaskSetsEndpoint extends CrudEndpoint<TaskSet, CreateTaskSetDto, UpdateTaskSetDto> {
  constructor() {
    super('/task-set');
  }

  findForGroup(groupId: string) {
    return this.transport.get<TaskSet[]>(`/task-set/group/${groupId}`).then(this.extractData);
  }
}

export const taskSets = new TaskSetsEndpoint();
