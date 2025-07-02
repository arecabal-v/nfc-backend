import { Router, Request, Response, NextFunction } from 'express';
import container from '@app/dependency-injection';
import RegisterController from '@app/controllers/auth/RegisterController';

export const register = (router: Router) => {
  const registerController: RegisterController = container.get('Apps.auth.controllers.RegisterController');

  router.post('/auth/register', (req: Request, res: Response, next: NextFunction) => {
    return registerController.run(req, res, next);
  });
};
