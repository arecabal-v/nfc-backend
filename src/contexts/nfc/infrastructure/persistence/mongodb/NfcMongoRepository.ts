import { MongoRepository } from '@contexts/shared/infrastructure/persistance/mongo/MongoRepository';
import { NfcRepository } from '../../../domain/NfcRepository';
import { NfcTag } from '../../../domain/NfcTag';

export class NfcMongoRepository extends MongoRepository<NfcTag> implements NfcRepository {
  protected moduleName(): string {
    return 'nfcTag';
  }

  async save(nfcTag: NfcTag): Promise<void> {
    await this.persist(nfcTag.id.value, nfcTag);
  }
}
