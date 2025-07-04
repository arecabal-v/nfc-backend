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
    private readonly _updatedAt?: Date,
    private readonly _createdAt?: Date,
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
        now,
    );
  }

  static fromPrimitives(id: string, userId: string, serialNumber: string, nfcData: NfcData, isActive: boolean) {
    return new NfcTag(
        new NfcTagId(id),
        new UserId(userId),
        serialNumber,
        nfcData,
        isActive,
    )
  }

  desactivate(): NfcTag {
    const now = new Date();
    return new NfcTag(
        this._id,
        this._userId,
        this._serialNumber,
        this._nfcData,
        false,
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

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  get updatedAt(): Date | undefined {
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
      updatedAt: this._updatedAt,
      createdAt: this._createdAt,
    };
  }
}
