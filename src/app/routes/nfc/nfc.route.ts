import { Router, Request, Response, NextFunction } from 'express';
import container from '@app/dependency-injection';
import PostNfcDataController from '@app/controllers/nfc/PostNfcDataController';
import GetNfcTagController from '@app/controllers/nfc/GetNfcTagController';
import { AuthMiddleware } from '@app/middlewares/AuthMiddleware';

export const register = (router: Router) => {
  const postNfcDataController: PostNfcDataController = container.get('Apps.nfc.controllers.PostNfcDataController');
  const getNfcTagController: GetNfcTagController = container.get('Apps.nfc.controllers.GetNfcTagController');
  const authMiddleware: AuthMiddleware = container.get('Shared.AuthMiddleware');

  router.post('/nfc/data',
      authMiddleware.authenticate,
      (req: Request, res: Response, next: NextFunction) => {
        return postNfcDataController.run(req, res, next);
      },
  );

  router.get('/nfc/tag/:id',
      authMiddleware.authenticate,
      (req: Request, res: Response, next: NextFunction) => {
        return getNfcTagController.run(req, res, next);
      },
  );
};
