import { Uuid } from '../../shared/domain/value-object/uuid';

export class NfcTagId extends Uuid {
  constructor(value: string) {
    super(value);
  }
}
