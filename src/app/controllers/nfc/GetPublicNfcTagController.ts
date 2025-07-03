import { Request, Response } from 'express';
import { BaseController } from '../BaseController';
import { QueryBus } from '@contexts/shared/domain/cqrs/QueryBus';
import { GetPublicNfcTagBySerialNumberQuery } from '@contexts/nfc/domain/GetPublicNfcTagBySerialNumberQuery';
import httpStatus from 'http-status';

export class GetPublicNfcTagController implements BaseController {
  constructor(private readonly queryBus: QueryBus) {}

  async run(req: Request, res: Response): Promise<void> {
    const serialNumber = req.params.serialNumber;
    const query = new GetPublicNfcTagBySerialNumberQuery(serialNumber);
    const publicTag = await this.queryBus.ask(query);

    res.status(httpStatus.OK).json(publicTag)
  }
}
