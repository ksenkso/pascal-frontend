import { CrudEndpoint } from '~/api/utils';
import { TaskSet } from '~/api/taskSets';

export type AssessmentType = 'NumberOfLinesAssessment' | 'ContainsTextAssessment';

export interface SerializedAssessmentData {
  type: AssessmentType;
  constructorArguments: any[];
}

export interface SerializedAssessment extends SerializedAssessmentData {
  type: AssessmentType;

  constructorArguments: any[];
}

export interface Task {
  _id: string;

  name: string;

  description: string;

  expectedResult: string;

  assessments: SerializedAssessment[];

  taskSet: TaskSet;
}

export interface CreateTaskDto {
  name: string;
  description: string;
  expectedResult: string;
  assessments?: SerializedAssessment[];
  taskSet: string;
}

export type UpdateTaskSetDto = Partial<CreateTaskDto>;


class TasksEndpoint extends CrudEndpoint<Task, CreateTaskDto, UpdateTaskSetDto> {
  constructor() {
    super('/tasks');
  }
}

export const tasks = new TasksEndpoint();
