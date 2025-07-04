# 🏷️ NFC Backend - Sistema de Correas Personalizadas

Backend para un sistema de venta de correas con chips NFC personalizables. Permite a los usuarios registrarse, programar datos en sus chips NFC y gestionar la información almacenada con autenticación JWT. Además, proporciona un endpoint público para acceder a la información de contacto en caso de emergencia.

## 🎯 **Concepto del Negocio**

1. **Cliente compra correa** con chip NFC integrado
2. **Se registra en la aplicación** con sus datos personales
3. **Recibe tokens JWT** para autenticación segura
4. **Programa datos personalizados** en el chip NFC
5. **Solo el propietario** puede modificar los datos de su chip
6. **Cualquier persona** puede leer la información de contacto escaneando el NFC

### **Casos de Uso Típicos**

- 📞 **Información de contacto** (tutor, padre, madre)
- 🏢 **Datos profesionales** (empresa, cargo)
- 📧 **Contactos de emergencia**
- 🔗 **Enlaces personalizados**
- 🆘 **Acceso rápido a contactos** en caso de emergencia

## 🏗️ **Arquitectura**

- **Arquitectura Hexagonal** (Clean Architecture)
- **Patrón CQRS** (Command Query Responsibility Segregation)
- **TypeScript** con tipado estricto
- **Express.js** como framework web
- **MongoDB** para persistencia
- **JWT Authentication** con access/refresh tokens
- **Inyección de Dependencias** con `node-dependency-injection`

### **Estructura de Contextos**

```
src/contexts/
├── shared/           # Código compartido entre contextos
├── auth/            # Autenticación y gestión de usuarios
└── nfc/             # Gestión de datos NFC
```

## 🚀 **Instalación y Configuración**

### **1. Clonar el repositorio**

```bash
git clone <repository-url>
cd nfc-backend
```

### **2. Instalar dependencias**

```bash
npm install
```

### **3. Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto:

```env
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# MongoDB Configuration
MONGO_URL=mongodb://admin:password@localhost:27017
MONGO_DATABASE=nfc-backend

# Server Configuration
PORT=3000
ENVIRONMENT=DEVELOP
```

### **4. Iniciar MongoDB con Docker**

```bash
# Iniciar MongoDB
docker-compose up -d

# Verificar que esté corriendo
docker ps

# Ver logs (opcional)
docker logs nfc-backend-mongo
```

### **5. Iniciar el servidor**

```bash
# Desarrollo
npm run dev

# Producción
npm run prod
```

El servidor estará disponible en: `http://localhost:3000`

## 📚 **API Endpoints**

### **Base URL**

```
http://localhost:3000/api/v1
```

### **🔐 Autenticación**

#### **Registrar Usuario**

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "miPassword123",
  "name": "Juan Pérez"
}
```

**Respuesta exitosa (201):**

```json
{
  "message": "User registered successfully",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### **Iniciar Sesión**

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "miPassword123"
}
```

**Respuesta exitosa (200):**

```json
{
  "message": "Login successful",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### **Renovar Tokens**

```http
POST /api/v1/auth/refresh
Content-Type: application/json
Authorization: Bearer <refresh_token>
```

**Respuesta exitosa (200):**

```json
{
  "message": "Tokens refreshed successfully",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### **Información de Tokens JWT**

- **Access Token**: Válido por **24 horas**, usado para autenticar requests
- **Refresh Token**: Válido por **30 días**, usado para renovar access tokens

### **🏷️ NFC Data**

#### **Crear/Actualizar Datos NFC**

```http
POST /api/v1/nfc/data
Content-Type: application/json
Authorization: Bearer <access_token>

{
  "nfcTagId": "123e4567-e89b-12d3-a456-426614174000",
  "serialNumber": "NFC001234567890",
  "contactInfo": [
    {
      "type": "tutor",
      "name": "María García",
      "phone": "+34612345678",
      "email": "maria.garcia@colegio.edu",
      "company": "Colegio San José",
      "position": "Tutora de 5º Primaria"
    },
    {
      "type": "father",
      "name": "Carlos Pérez",
      "phone": "+34698765432",
      "email": "carlos.perez@gmail.com"
    }
  ]
}
```

**Respuesta exitosa (200):**

```json
{
  "message": "NFC data saved successfully"
}
```

> **Funcionalidad Inteligente:**
>
> - **Para CREAR**: Envía un UUID v4 nuevo → Se crea un NFC tag nuevo
> - **Para ACTUALIZAR**: Envía el UUID de un NFC existente → Se actualiza el contenido
> - **El userId se obtiene automáticamente del token JWT**
> - **Las fechas se gestionan automáticamente** (createdAt en creación, updatedAt en actualización)

#### **Obtener NFC Tag por ID**

```http
GET /api/v1/nfc/tag/{tagId}
Content-Type: application/json
Authorization: Bearer <access_token>
```

**Respuesta exitosa (200):**

```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "userId": "123e4567-e89b-12d3-a456-426614174000",
    "serialNumber": "NFC001234567890",
    "nfcData": {
      "contactInfo": [
        {
          "type": "tutor",
          "name": "María García",
          "phone": "+34612345678",
          "email": "maria.garcia@colegio.edu",
          "company": "Colegio San José",
          "position": "Tutora de 5º Primaria"
        }
      ]
    },
    "isActive": true,
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T15:30:00.000Z"
  }
}
```

#### **Obtener NFC Tags del Usuario**

```http
GET /api/v1/nfc/tags/user
Content-Type: application/json
Authorization: Bearer <access_token>
```

**Respuesta exitosa (200):**

```json
{
  "nfcTags": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "serialNumber": "NFC001234567890"
    },
    {
      "id": "456e7890-e89b-12d3-a456-426614174001",
      "serialNumber": "NFC987654321"
    }
  ]
}
```

> **Nota**: El `userId` se obtiene automáticamente del token JWT.

#### **Obtener Información Pública del NFC**

```http
GET /api/v1/nfc/public/{serialNumber}
Content-Type: application/json

# No requiere autenticación
```

**Respuesta exitosa (200):**

```json
{
  "serialNumber": "NFC001234567890",
  "contactInfo": [
    {
      "type": "tutor",
      "name": "María García",
      "phone": "+34612345678",
      "email": "maria.garcia@colegio.edu",
      "company": "Colegio San José",
      "position": "Tutora de 5º Primaria"
    },
    {
      "type": "father",
      "name": "Carlos Pérez",
      "phone": "+34698765432",
      "email": "carlos.perez@gmail.com"
    }
  ]
}
```

#### **Tipos de Contacto Disponibles**

- `tutor` - Tutor/Profesor
- `father` - Padre
- `mother` - Madre
- `other` - Otro

### **🏥 Health Check**

#### **Verificar Estado del Servidor**

```http
GET /api/v1/health
```

**Respuesta:**

```json
{
  "status": "UP",
  "version": "0.2.0"
}
```

## 🧪 **Pruebas**

### **Usando REST Client (VS Code)**

El proyecto incluye un archivo `requests.http` con ejemplos de todas las APIs:

1. Instala la extensión "REST Client" en VS Code
2. Abre el archivo `requests.http`
3. Haz clic en "Send Request" sobre cada endpoint

### **Usando cURL**

**Registrar usuario:**

```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

**Crear/Actualizar datos NFC:**

```bash
# Primero registra un usuario y obtén el accessToken
ACCESS_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

curl -X POST http://localhost:3000/api/v1/nfc/data \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d '{
    "nfcTagId": "123e4567-e89b-12d3-a456-426614174000",
    "serialNumber": "NFC001234567890",
    "contactInfo": [
      {
        "type": "tutor",
        "name": "María García",
        "phone": "+34612345678",
        "email": "maria.garcia@colegio.edu"
      }
    ]
  }'
```

**Renovar tokens:**

```bash
# Usar el refresh token para obtener nuevos tokens
REFRESH_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

curl -X POST http://localhost:3000/api/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $REFRESH_TOKEN"
```

**Obtener información pública del NFC:**

```bash
curl -X GET http://localhost:3000/api/v1/nfc/public/NFC001234567890 \
  -H "Content-Type: application/json"
```

## 🛠️ **Desarrollo**

### **Scripts Disponibles**

```bash
npm run dev          # Servidor en modo desarrollo
npm run build        # Compilar para producción
```

### **Estructura del Proyecto**

```
nfc-backend/
├── src/
│   ├── app/                    # Capa de aplicación
│   │   ├── controllers/        # Controladores HTTP
│   │   ├── routes/            # Definición de rutas
│   │   ├── middlewares/       # Middlewares (Auth, etc.)
│   │   ├── dependency-injection/ # Configuración DI
│   │   └── server/            # Configuración del servidor
│   └── contexts/              # Contextos de dominio
│       ├── shared/            # Código compartido
│       │   ├── domain/        # Entidades y servicios compartidos
│       │   │   └── jwt/       # Servicio JWT
│       │   └── infrastructure/ # Implementaciones JWT
│       ├── auth/              # Contexto de autenticación
│       │   ├── domain/        # Entidades de usuario
│       │   └── application/   # Casos de uso y queries
│       └── nfc/               # Contexto de NFC
├── docker-compose.yml         # MongoDB con Docker
├── requests.http             # Ejemplos de API
└── README.md                # Este archivo
```

## 🔒 **Seguridad**

- ✅ **Validación de datos** en value objects
- ✅ **Hashing de contraseñas** con crypto nativo
- ✅ **Validación de emails** centralizada
- ✅ **Variables de entorno** para secretos
- ✅ **Autenticación JWT** con access/refresh tokens
- ✅ **Separación CQRS** para comandos y queries
- ✅ **Endpoint público** para información de emergencia
- ✅ **Middleware de autenticación** reutilizable
- ✅ **Obtención automática del userId** desde el token JWT
- ✅ **Validación de UUID v4** para nfcTagId
- ✅ **Prevención de emails duplicados** en registro

## 🔑 **Sistema de Autenticación JWT**

### **Flujo de Autenticación**

1. **Registro**: Usuario se registra → Recibe access + refresh tokens
2. **Autenticación**: Cliente incluye access token en header `Authorization: Bearer <token>`
3. **Renovación**: Cuando access token expira, usar refresh token para obtener nuevos tokens
4. **Middleware**: Valida automáticamente tokens y extrae información del usuario

### **Configuración JWT**

- **Access Token**: 24 horas de validez
- **Refresh Token**: 30 días de validez
- **Algoritmo**: HS256
- **Secret**: Configurable via `JWT_SECRET` en `.env`

### **Payload del Token**

```json
{
  "userId": "uuid-del-usuario",
  "email": "usuario@ejemplo.com",
  "name": "Nombre Usuario",
  "iat": 1234567890,
  "exp": 1234567890
}
```

### **Middleware de Autenticación**

El middleware automáticamente:

- Valida el formato del header `Authorization`
- Verifica la validez del token JWT
- Extrae el payload y lo hace disponible en `req.tokenPayload`
- Permite que los controladores accedan al `userId` sin enviarlo en el body

## 🏷️ **Sistema NFC Inteligente**

### **Gestión Unificada de NFC Tags**

El sistema utiliza un enfoque inteligente para manejar tanto la creación como la actualización de NFC tags a través de un único endpoint:

#### **Características Principales:**

- **API Unificada**: Un solo endpoint para crear y actualizar
- **Control del Frontend**: El cliente decide si crear o actualizar enviando el UUID
- **Gestión Automática de Fechas**: El sistema maneja `createdAt` y `updatedAt` automáticamente
- **Validación de UUID**: Solo acepta UUID v4 válidos para `nfcTagId`

#### **Flujo de Funcionamiento:**

1. **Frontend genera/obtiene UUID v4** para el `nfcTagId`
2. **Backend verifica** si el UUID ya existe en la base de datos
3. **Si NO existe** → Crea nuevo NFC tag con fechas actuales
4. **Si SÍ existe** → Actualiza el contenido manteniendo `createdAt` original

#### **Beneficios:**

✅ **Simplicidad**: Un solo endpoint para ambas operaciones
✅ **Flexibilidad**: Frontend controla el flujo de creación/actualización
✅ **Consistencia**: Fechas gestionadas automáticamente por el dominio
✅ **Seguridad**: Validación de UUID y autorización por usuario

## 🚧 **Funcionalidades Completadas**

- [x] Endpoint para renovar tokens
- [x] Autorización por usuario mediante JWT
- [x] Middleware de autenticación reutilizable
- [x] API unificada para crear/actualizar NFC tags
- [x] Gestión automática de fechas de creación/actualización
- [x] Validación de UUID v4 para nfcTagId
- [x] Endpoint público para información de emergencia
- [x] Prevención de registro con emails duplicados

## 🔄 **Próximas Mejoras**

- [ ] Soft delete para NFC tags
- [ ] Historial de cambios en NFC tags
- [ ] Notificaciones push
- [ ] Rate limiting
- [ ] Logs de auditoría

## 🤝 **Contribuir**

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 **Licencia**

Este proyecto está bajo la licencia ISC.
