import { Router, Request, Response, NextFunction } from 'express';
import container from '@app/dependency-injection';
import PostRegisterController from '@app/controllers/auth/PostRegisterController';

export const register = (router: Router) => {
  const postRegisterController: PostRegisterController = container.get('Apps.auth.controllers.PostRegisterController');

  router.post('/auth/register', (req: Request, res: Response, next: NextFunction) => {
    return postRegisterController.run(req, res, next);
  });
};
