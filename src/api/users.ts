import { CrudEndpoint } from './utils';
import { AxiosResponse } from 'axios';
import { Group } from '~/api/groups';
import { useAuth } from '~/composables/useAuth';

export enum Role {
  Teacher = 'Teacher',
  Student = 'Student',
  Admin = 'Admin',
}

export interface User {
  _id: string;
  name: string;
  email: string;
  roles: Role[];
  groups: Group[];
}

export type Student = User & { roles: [Role.Student] };
export type Teacher = User & { roles: [Role.Teacher] };
export type Admin = User & { roles: [Role.Admin] };

export interface CreateUserDto {
  email: string;
  name: string;
  password: string;
  groupIds?: string[];
}

export interface UpdateUserDto {
}

const LAST_LOGIN = 'lastLogin';

const auth = useAuth();

interface RelationOptions {
  with: string[]
}

class UsersEndpoint extends CrudEndpoint<User, CreateUserDto, UpdateUserDto>{
  constructor() {
    super('/user');


    this.transport.interceptors.response.use(undefined, (error) => {
      if (error.response.status === 401) {
        auth.logout();
      }

      return Promise.reject(error);
    })

    UsersEndpoint.updateAuth = UsersEndpoint.updateAuth.bind(this);
  }

  login(email: string, password: string) {
    return this.transport
      .post<User>('/auth/login', { email, password })
      .then(UsersEndpoint.updateAuth)
      .then(this.extractData)
  }

  async logout() {
    if (!auth.isAuthorized.value) {
      return;
    }

    return this.transport.post('/auth/logout')
      .finally(() => {
        auth.logout();
      })
  }

  registerStudent(createUserDto: CreateUserDto) {
    return this.transport
      .post<User>('/auth/register-student', createUserDto)
      .then(UsersEndpoint.updateAuth)
      .then(this.extractData)
  }

  getMe() {
    return this.transport
      .get<User>(`${this.baseUrl}/me`)
      .then(this.extractData);
  }

  private static updateAuth(res: AxiosResponse<User>) {
    auth.authorize(res.data)

    return res;
  }

  findByRole(role: Role, options?: RelationOptions) {
    const params = {
      with: options?.with
    }

    return this.transport
      .get<User[]>(`${this.baseUrl}/role/${role}`, { params })
      .then(this.extractData);
  }
}

export const users = new UsersEndpoint()
