import { Request, Response } from 'express';
import { BaseController } from '../BaseController';
import { QueryBus } from '@contexts/shared/domain/cqrs/QueryBus';
import { GetPublicNfcTagBySerialNumberQuery } from '@contexts/nfc/domain/GetPublicNfcTagBySerialNumberQuery';
import { PublicNfcTagResponse } from '@contexts/nfc/domain/PublicNfcTagResponse';
import { TemplateService } from '@contexts/shared/domain/template/TemplateService';
import httpStatus from 'http-status';

export class GetPublicNfcTagController implements BaseController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly templateService: TemplateService,
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    const serialNumber = req.params.serialNumber;
    const query = new GetPublicNfcTagBySerialNumberQuery(serialNumber);
    const publicTag = await this.queryBus.ask(query) as PublicNfcTagResponse;

    const primitives = publicTag.toPrimitives();
    const templateData = {
      serialNumber: primitives.serialNumber,
      contactInfo: primitives.contactInfo.map((contact) => {
        return {
          type: contact.type,
          name: contact.name!,
          phone: contact.phone,
          email: contact.email,
          company: contact.company,
          position: contact.position,
        };
      }),
    };

    const html = this.templateService.generateContactPage(templateData);

    res.status(httpStatus.OK).contentType('text/html').send(html);
  }
}
