import { Router } from 'express';
import container from '@app/dependency-injection';
import PostRegisterController from '@app/controllers/auth/PostRegisterController';
import PostLoginController from '@app/controllers/auth/PostLoginController';
import GetRefreshTokenController from '@app/controllers/auth/GetRefreshTokenController';
import { AuthMiddleware } from '@app/middlewares/AuthMiddleware';

export const register = (router: Router): void => {
  const postRegisterController: PostRegisterController = container.get('Apps.auth.controllers.PostRegisterController');
  const postLoginController: PostLoginController = container.get('Apps.auth.controllers.PostLoginController');
  const getRefreshTokenController: GetRefreshTokenController = container.get('Apps.auth.controllers.GetRefreshTokenController');
  const authMiddleware: AuthMiddleware = container.get('Shared.AuthMiddleware');

  router.post('/auth/register', (req, res, next) => {
    return postRegisterController.run(req, res, next)
  });
  router.post('/auth/login', (req, res, next) => {
    return postLoginController.run(req, res, next)
  });
  router.post('/auth/refresh', authMiddleware.authenticate, (req, res, next) => {
    return getRefreshTokenController.run(req, res, next)
  });
};
