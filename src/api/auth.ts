import { CrudEndpoint } from '~/api/utils';
import { CreateUserDto, UpdateUserDto, User } from '~/api/users';

class AuthEndpoint extends CrudEndpoint<User, CreateUserDto, UpdateUserDto>{
  constructor() {
    super('/auth');
  }

  registerTeacher(dto: CreateUserDto) {
    return this.transport
      .post<User>(`${this.baseUrl}/register-teacher`, dto)
      .then(this.extractData);
  }
}

export const auth = new AuthEndpoint();
