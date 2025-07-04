/**
 * @swagger
 * components:
 *   schemas:
 *     HealthResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "UP"
 *           description: "Estado del servidor"
 *         version:
 *           type: string
 *           example: "1.0.0"
 *           description: "Versión de la aplicación"
 *       required:
 *         - status
 *         - version
 */
