import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { BaseController } from '@app/controllers/BaseController';
import { CommandBus } from '@contexts/shared/domain/cqrs/CommandBus';
import { NfcDataCreatorCommand } from '@contexts/nfc/domain/NfcDataCreatorCommand';

export default class PostNfcDataController implements BaseController {
  constructor(private readonly commandBus: CommandBus) {}

  async run(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { userId } = req.tokenPayload!;
    const { serialNumber, contactInfo } = req.body;

    const command = new NfcDataCreatorCommand(
        userId,
        serialNumber,
        contactInfo,
    );

    await this.commandBus.dispatch(command);

    res.status(httpStatus.CREATED).json({
      message: 'NFC data programmed successfully',
    });
  }
}
