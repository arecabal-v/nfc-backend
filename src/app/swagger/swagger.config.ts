import swaggerJSDoc from 'swagger-jsdoc';
import { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'NFC Backend API',
    version: '1.0.0',
    description: `
      Backend para un sistema de venta de correas con chips NFC personalizables.
      
      ## 🎯 Concepto del Negocio
      
      1. **Cliente compra correa** con chip NFC integrado
      2. **Se registra en la aplicación** con sus datos personales  
      3. **Recibe tokens JWT** para autenticación segura
      4. **Programa datos personalizados** en el chip NFC
      5. **Solo el propietario** puede modificar los datos de su chip
      6. **Cualquier persona** puede leer la información de contacto escaneando el NFC
      
      ## 🔑 Autenticación
      
      - **Access Token**: Válido por 24 horas
      - **Refresh Token**: Válido por 30 días
      - **Algoritmo**: HS256
      
      ## 🏷️ Sistema NFC Inteligente
      
      - **API Unificada**: Un solo endpoint para crear y actualizar
      - **Control del Frontend**: El cliente decide si crear o actualizar enviando el UUID
      - **Gestión Automática de Fechas**: El sistema maneja createdAt y updatedAt automáticamente
      
      ## 📋 Códigos de Estado HTTP
      
      - **200**: Operación exitosa
      - **400**: Error de validación o datos incorrectos
      - **401**: No autorizado (token inválido o faltante)
      - **404**: Recurso no encontrado
      - **500**: Error interno del servidor
    `,
    contact: {
      name: 'NFC Backend API',
    },
    license: {
      name: 'ISC',
      url: 'https://opensource.org/licenses/ISC',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/api/v1',
      description: 'Servidor de desarrollo',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Ingresa tu token JWT sin el prefijo "Bearer"',
      },
    },
  },
  tags: [
    {
      name: 'Health',
      description: 'Endpoints de estado del servidor',
    },
    {
      name: 'Auth',
      description: 'Autenticación y gestión de usuarios',
    },
    {
      name: 'NFC',
      description: 'Gestión de datos NFC (requiere autenticación)',
    },
    {
      name: 'Public',
      description: 'Endpoints públicos (sin autenticación)',
    },
  ],
};

const options = {
  definition: swaggerDefinition,
  apis: [
    './src/app/swagger/schemas/*.ts',
    './src/app/swagger/paths/*.ts',
  ],
};

export const swaggerSpec = swaggerJSDoc(options);
