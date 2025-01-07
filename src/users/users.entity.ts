
import { Exclude } from 'class-transformer';

export class UserEntity {
  id: number;
  email: string;
  name: string;
  gender: null | string;
  birthday: null | Date;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
