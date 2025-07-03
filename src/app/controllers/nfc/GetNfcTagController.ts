import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { BaseController } from '@app/controllers/BaseController';
import { QueryBus } from '@contexts/shared/domain/cqrs/QueryBus';
import { GetNfcTagByIdQuery } from '@contexts/nfc/domain/GetNfcTagByIdQuery';
import { NfcTag } from '@contexts/nfc/domain/NfcTag';

export default class GetNfcTagController implements BaseController {
  constructor(private readonly queryBus: QueryBus) {}

  async run(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { id } = req.params;
    const query = new GetNfcTagByIdQuery(id);

    const nfcTag = await this.queryBus.ask(query) as NfcTag;

    res.status(httpStatus.OK).json({
      data: nfcTag.toPrimitives(),
    });
  }
}
