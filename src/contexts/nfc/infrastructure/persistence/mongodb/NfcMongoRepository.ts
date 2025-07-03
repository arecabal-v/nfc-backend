import { MongoRepository } from '@contexts/shared/infrastructure/persistance/mongo/MongoRepository';
import { NfcRepository } from '../../../domain/NfcRepository';
import { NfcTag } from '../../../domain/NfcTag';
import { NfcTagId } from '../../../domain/NfcTagId';
import { UserId } from '@contexts/shared/domain/UserId';
import { NfcData } from '../../../domain/NfcData';
import { ContactInfo } from '../../../domain/ContactInfo';
import { ContactType } from '../../../domain/ContactType';

interface NfcTagDocument {
  _id: string;
  userId: string;
  serialNumber: string;
  nfcData: {
    contactInfo: Array<{
      type: ContactType;
      name?: string;
      phone?: string;
      email?: string;
      company?: string;
      position?: string;
    }>;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class NfcMongoRepository extends MongoRepository<NfcTag> implements NfcRepository {
  protected moduleName(): string {
    return 'nfcTag';
  }

  async save(nfcTag: NfcTag): Promise<void> {
    await this.persist(nfcTag.id.value, nfcTag);
  }

  async findById(id: NfcTagId): Promise<NfcTag | null> {
    const collection = await this.collection();
    const document = await collection.findOne({ _id: id.value } as any);

    if (!document) return null;

    return this.documentToAggregate(document as unknown as NfcTagDocument);
  }

  private documentToAggregate(document: NfcTagDocument): NfcTag {
    const id = new NfcTagId(document._id);
    const userId = new UserId(document.userId);
    const nfcData = new NfcData({
      contactInfo: document.nfcData.contactInfo.map((info) => {
        return new ContactInfo(info);
      }),
    });

    return NfcTag.create(id, userId, document.serialNumber, nfcData);
  }
}
