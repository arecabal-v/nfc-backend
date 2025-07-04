import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { BaseController } from '@app/controllers/BaseController';
import { QueryBus } from '@contexts/shared/domain/cqrs/QueryBus';
import { GetNfcTagsByUserIdQuery } from '@contexts/nfc/domain/GetNfcTagsByUserIdQuery';
import { NfcTagSummary } from '@contexts/nfc/domain/NfcTagSummary';

export default class GetNfcTagsByUserController implements BaseController {
  constructor(private readonly queryBus: QueryBus) {}

  async run(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { userId } = req.tokenPayload!;
    const query = new GetNfcTagsByUserIdQuery(userId);

    const nfcTags = await this.queryBus.ask(query) as NfcTagSummary[];

    res.status(httpStatus.OK).send({
      nfcTags: nfcTags.map((tag) => {
        return {
          id: tag.id.value,
          serialNumber: tag.serialNumber,
        }
      }),
    });
  }
}
