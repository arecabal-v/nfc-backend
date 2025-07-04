/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - name
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "usuario@ejemplo.com"
 *           description: "Email válido del usuario"
 *         password:
 *           type: string
 *           minLength: 6
 *           example: "miPassword123"
 *           description: "Contraseña del usuario (mínimo 6 caracteres)"
 *         name:
 *           type: string
 *           example: "Juan Pérez"
 *           description: "Nombre completo del usuario"
 *
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "usuario@ejemplo.com"
 *           description: "Email del usuario"
 *         password:
 *           type: string
 *           example: "miPassword123"
 *           description: "Contraseña del usuario"
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "User registered successfully"
 *         accessToken:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *           description: "Token JWT para autenticación (válido 24h)"
 *         refreshToken:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *           description: "Token para renovar el access token (válido 30 días)"
 *       required:
 *         - message
 *         - accessToken
 *         - refreshToken
 *
 *     RefreshResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Tokens refreshed successfully"
 *         accessToken:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *           description: "Nuevo token JWT para autenticación"
 *         refreshToken:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *           description: "Nuevo refresh token"
 *       required:
 *         - message
 *         - accessToken
 *         - refreshToken
 */
