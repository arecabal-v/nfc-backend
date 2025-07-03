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

#### **Información de Tokens JWT**

- **Access Token**: Válido por **24 horas**, usado para autenticar requests
- **Refresh Token**: Válido por **30 días**, usado para renovar access tokens

### **🏷️ NFC Data**

#### **Programar Datos NFC**

```http
POST /api/v1/nfc/data
Content-Type: application/json
Authorization: Bearer <access_token>

{
  "userId": "123e4567-e89b-12d3-a456-426614174000",
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

**Respuesta exitosa (201):**

```json
{
  "message": "NFC data programmed successfully"
}
```

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

**Programar datos NFC (con token):**

```bash
# Primero registra un usuario y obtén el accessToken
ACCESS_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

curl -X POST http://localhost:3000/api/v1/nfc/data \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d '{
    "userId": "123e4567-e89b-12d3-a456-426614174000",
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
- ⚠️ **Autorización por usuario** (pendiente implementar)

## 🔑 **Sistema de Autenticación JWT**

### **Flujo de Autenticación**

1. **Registro**: Usuario se registra → Recibe access + refresh tokens
2. **Autenticación**: Cliente incluye access token en header `Authorization: Bearer <token>`
3. **Renovación**: Cuando access token expira, usar refresh token para obtener nuevos tokens

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

## 🚧 **Próximas Funcionalidades**

- [ ] Endpoint para renovar tokens
- [ ] Autorización por usuario
- [ ] Actualización de datos NFC
- [ ] Gestión de múltiples tags por usuario
- [ ] Logout y revocación de tokens

## 🤝 **Contribuir**

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 **Licencia**

Este proyecto está bajo la licencia ISC.
