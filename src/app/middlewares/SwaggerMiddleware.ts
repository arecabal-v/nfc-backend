import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../swagger/swagger.config';

export class SwaggerMiddleware {
  static setup(app: Express): void {
    // Servir la documentación Swagger en /api-docs
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
      explorer: true,
      customCss: `
        .swagger-ui .topbar { display: none; }
        .swagger-ui .info .title { color: #3b82f6; }
        .swagger-ui .scheme-container { background: #f8fafc; }
        .swagger-ui .btn.authorize { background-color: #3b82f6; border-color: #3b82f6; }
        .swagger-ui .btn.authorize:hover { background-color: #2563eb; border-color: #2563eb; }
      `,
      customSiteTitle: 'NFC Backend API Documentation',
      customfavIcon: '/favicon.ico',
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        filter: true,
        showExtensions: true,
        showCommonExtensions: true,
        docExpansion: 'none',
        defaultModelsExpandDepth: 2,
        defaultModelExpandDepth: 2,
        displayOperationId: false,
        tryItOutEnabled: true,
      },
    }));

    app.get('/api-docs.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
    });
  }
}
