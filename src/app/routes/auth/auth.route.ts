import { Router, Request, Response, NextFunction } from 'express';
import container from '@app/dependency-injection';
import PostRegisterController from '@app/controllers/auth/PostRegisterController';
import PostLoginController from '@app/controllers/auth/PostLoginController';

export const register = (router: Router) => {
  const postRegisterController: PostRegisterController = container.get('Apps.auth.controllers.PostRegisterController');
  const postLoginController: PostLoginController = container.get('Apps.auth.controllers.PostLoginController');

  router.post('/auth/register', (req: Request, res: Response, next: NextFunction) => {
    return postRegisterController.run(req, res, next);
  });

  router.post('/auth/login', (req: Request, res: Response, next: NextFunction) => {
    return postLoginController.run(req, res, next);
  });
};
