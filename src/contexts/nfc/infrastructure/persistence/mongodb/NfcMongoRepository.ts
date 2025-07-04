import { MongoRepository } from '@contexts/shared/infrastructure/persistance/mongo/MongoRepository';
import { NfcRepository } from '../../../domain/NfcRepository';
import { NfcTag } from '../../../domain/NfcTag';
import { NfcTagId } from '../../../domain/NfcTagId';
import { UserId } from '@contexts/shared/domain/UserId';
import { NfcData } from '../../../domain/NfcData';
import { ContactInfo } from '../../../domain/ContactInfo';
import { ContactType } from '../../../domain/ContactType';
import { NfcTagSummary } from '@contexts/nfc/domain/NfcTagSummary';
import { PublicNfcTagResponse } from '../../../domain/PublicNfcTagResponse';
import { Nullable } from '@contexts/shared/domain/Nullable';

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

  async search(id: NfcTagId): Promise<Nullable<NfcTag>> {
    const collection = await this.collection();
    const document = await collection.findOne({ _id: id.value } as any);

    if (!document) return null;

    return this.documentToAggregate(document as unknown as NfcTagDocument);
  }

  async searchByUserId(userId: UserId): Promise<NfcTagSummary[]> {
    const collection = await this.collection();
    const documents = await collection.find<Partial<{ _id: string; serialNumber: string }>>({ userId: userId.value }, { projection: { _id: 1, serialNumber: 1 } }).toArray();

    return documents.map((document) => {
      return {
        id: new NfcTagId(document._id?.toString() || ''),
        serialNumber: document.serialNumber || '',
      };
    });
  }

  async searchBySerialNumber(serialNumber: string): Promise<Nullable<PublicNfcTagResponse>> {
    const collection = await this.collection();
    const document = await collection.findOne({ serialNumber });

    if (!document) return null;

    const doc = document as unknown as NfcTagDocument;
    return new PublicNfcTagResponse(
        doc.serialNumber,
        doc.nfcData.contactInfo.map((info) => {
          return new ContactInfo(info);
        }),
    );
  }

  private documentToAggregate(document: NfcTagDocument): NfcTag {
    const nfcData = new NfcData({
      contactInfo: document.nfcData.contactInfo.map((info) => {
        return new ContactInfo(info);
      }),
    });

    return NfcTag.fromPrimitives(document._id, document.userId, document.serialNumber, nfcData, document.isActive);
  }
}
