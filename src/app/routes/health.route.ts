import { Router, Request, Response, NextFunction } from 'express';
import container from '@app/dependency-injection';
import HealthController from '@app/controllers/health/HealthController';

export const register = (router: Router) => {
  const controller: HealthController = container.get('Controller.Health');
  
  /**
   * @swagger
   * /health:
   *   get:
   *     summary: Verificar estado del servidor
   *     description: Endpoint para verificar que el servidor está funcionando correctamente
   *     tags: [Health]
   *     responses:
   *       200:
   *         description: Servidor funcionando correctamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/HealthResponse'
   *             example:
   *               status: "UP"
   *               version: "1.0.0"
   *       500:
   *         description: Error interno del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  router.get('/health', (req: Request, res: Response, next: NextFunction) => {
    return controller.run(req, res, next);
  });
};
