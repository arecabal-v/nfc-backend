import { Router, Request, Response, NextFunction } from 'express';
import container from '@app/dependency-injection';
import PostNfcDataController from '@app/controllers/nfc/PostNfcDataController';

export const register = (router: Router) => {
  const postNfcDataController: PostNfcDataController = container.get('Apps.nfc.controllers.PostNfcDataController');

  router.post('/nfc/data', (req: Request, res: Response, next: NextFunction) => {
    return postNfcDataController.run(req, res, next);
  });
};
