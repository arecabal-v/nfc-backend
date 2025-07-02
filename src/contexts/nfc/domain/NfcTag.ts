import { AggregateRoot } from '../../shared/domain/AggregateRoot';
import { NfcTagId } from './NfcTagId';
import { UserId } from '../../shared/domain/UserId';
import { NfcData } from './NfcData';

export class NfcTag extends AggregateRoot {
  constructor(
    private readonly _id: NfcTagId,
    private readonly _userId: UserId,
    private readonly _serialNumber: string,
    private readonly _nfcData: NfcData,
    private readonly _isActive: boolean,
    private readonly _createdAt: Date,
    private readonly _updatedAt: Date,
  ) {
    super();
  }

  static create(
      id: NfcTagId,
      userId: UserId,
      serialNumber: string,
      nfcData: NfcData,
  ): NfcTag {
    const now = new Date();
    return new NfcTag(id, userId, serialNumber, nfcData, true, now, now);
  }

  updateData(nfcData: NfcData): NfcTag {
    const now = new Date();
    return new NfcTag(
        this._id,
        this._userId,
        this._serialNumber,
        nfcData,
        this._isActive,
        this._createdAt,
        now,
    );
  }

  desactivate(): NfcTag {
    const now = new Date();
    return new NfcTag(
        this._id,
        this._userId,
        this._serialNumber,
        this._nfcData,
        false,
        this._createdAt,
        now,
    );
  }

  get id(): NfcTagId {
    return this._id;
  }

  get userId(): UserId {
    return this._userId;
  }

  get serialNumber(): string {
    return this._serialNumber;
  }

  get nfcData(): NfcData {
    return this._nfcData;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  toPrimitives() {
    return {
      id: this._id.value,
      userId: this._userId.value,
      serialNumber: this._serialNumber,
      nfcData: {
        contactInfo: this._nfcData.value.contactInfo.map((info) => {
          return info.value
        }),
      },
      isActive: this._isActive,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
