import { CrudEndpoint } from '~/api/utils';
import { Task } from '~/api/tasks';
import { Student } from '~/api/users';

export interface Solution {
  code: string
  time: number;
  task: Task;
  student: Student;
  score: number;
  output: string;
  messages: string[];
  successful: boolean;
}

export interface SolutionAssessmentResult {
  average: number;
  messages: string[];
  output: string;
  successful: boolean;
}

export interface CreateSolutionDto {
  code: string;
  time: number;
  task: string;
  student: string;
}

class SolutionsEndpoint extends CrudEndpoint<Solution, CreateSolutionDto, any> {
  constructor() {
    super('/solution');
  }

  checkSolution(solution: CreateSolutionDto) {
    return this.transport.post<SolutionAssessmentResult>(this.baseUrl, solution).then(this.extractData);
  }

  getForUser(userId: string) {
    return this.transport.get<Solution[]>(`${this.baseUrl}/user/${userId}`).then(this.extractData);
  }
}

export const solutions = new SolutionsEndpoint();
