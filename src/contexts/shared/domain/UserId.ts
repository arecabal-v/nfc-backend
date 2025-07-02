import { Uuid } from './value-object/uuid';

export class UserId extends Uuid {
  constructor(value: string) {
    super(value);
  }
}
