# 🏷️ NFC Backend - Sistema de Correas Personalizadas

Backend para un sistema de venta de correas con chips NFC personalizables. Permite a los usuarios registrarse, programar datos en sus chips NFC y gestionar la información almacenada.

## 🎯 **Concepto del Negocio**

1. **Cliente compra correa** con chip NFC integrado
2. **Se registra en la aplicación** con sus datos personales
3. **Programa datos personalizados** en el chip NFC
4. **Solo el propietario** puede modificar los datos de su chip

### **Casos de Uso Típicos**

- 📞 **Información de contacto** (tutor, padre, madre)
- 🏢 **Datos profesionales** (empresa, cargo)
- 📧 **Contactos de emergencia**
- 🔗 **Enlaces personalizados**

## 🏗️ **Arquitectura**

- **Arquitectura Hexagonal** (Clean Architecture)
- **Patrón CQRS** (Command Query Responsibility Segregation)
- **TypeScript** con tipado estricto
- **Express.js** como framework web
- **MongoDB** para persistencia
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

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus configuraciones:

```env
# Server Configuration
PORT=3000
ENVIRONMENT=DEVELOP

# MongoDB Configuration
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=tu_password_seguro
MONGO_DATABASE=nfc-backend
MONGO_URL=mongodb://admin:tu_password_seguro@localhost:27017/nfc-backend?authSource=admin
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
  "message": "User registered successfully"
}
```

### **🏷️ NFC Data**

#### **Programar Datos NFC**

```http
POST /api/v1/nfc/data
Content-Type: application/json

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

**Programar datos NFC:**

```bash
curl -X POST http://localhost:3000/api/v1/nfc/data \
  -H "Content-Type: application/json" \
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

## 🛠️ **Desarrollo**

### **Scripts Disponibles**

```bash
npm run dev          # Servidor en modo desarrollo
npm run build        # Compilar para producción
npm run start        # Iniciar servidor compilado
npm run eslint       # Linter
npm run test:unit    # Tests unitarios
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
│       ├── auth/              # Contexto de autenticación
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
- ⚠️ **Autenticación JWT** (pendiente implementar)
- ⚠️ **Autorización** (pendiente implementar)

## 🚧 **Próximas Funcionalidades**

- [ ] Autenticación JWT
- [ ] Autorización por usuario
- [ ] Actualización de datos NFC
- [ ] Consulta de datos NFC
- [ ] Gestión de múltiples tags por usuario
- [ ] API para lectura desde dispositivos NFC

## 🤝 **Contribuir**

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 **Licencia**

Este proyecto está bajo la licencia ISC.
