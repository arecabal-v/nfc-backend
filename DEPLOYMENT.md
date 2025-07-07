# 🚀 Guía de Despliegue Automatizado

Este proyecto está configurado para despliegue automático a Google Cloud Run usando GitHub Actions.

## 📋 Pre-requisitos

### 1. Google Cloud Platform

- Cuenta de GCP activa
- Proyecto creado en GCP
- Billing habilitado

### 2. MongoDB Atlas

- Cuenta en MongoDB Atlas
- Cluster creado
- URL de conexión

### 3. GitHub

- Repositorio en GitHub
- Acceso para configurar secrets

## 🔧 Configuración paso a paso

### Paso 1: Configurar GCP

1. **Habilitar APIs necesarias:**

```bash
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
gcloud services enable artifactregistry.googleapis.com
```

2. **Crear Artifact Registry:**

```bash
gcloud artifacts repositories create nfc-backend \
  --repository-format=docker \
  --location=southamerica-east1 \
  --description="NFC Backend Docker images"
```

3. **Crear Service Account:**

```bash
gcloud iam service-accounts create github-actions \
  --description="Service account para GitHub Actions" \
  --display-name="GitHub Actions"
```

4. **Asignar permisos:**

```bash
# Cloud Run Admin
gcloud projects add-iam-policy-binding [TU_PROJECT_ID] \
  --member="serviceAccount:github-actions@[TU_PROJECT_ID].iam.gserviceaccount.com" \
  --role="roles/run.admin"

# Artifact Registry Writer
gcloud projects add-iam-policy-binding [TU_PROJECT_ID] \
  --member="serviceAccount:github-actions@[TU_PROJECT_ID].iam.gserviceaccount.com" \
  --role="roles/artifactregistry.writer"

# Service Account User
gcloud projects add-iam-policy-binding [TU_PROJECT_ID] \
  --member="serviceAccount:github-actions@[TU_PROJECT_ID].iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"
```

5. **Generar clave del Service Account:**

```bash
gcloud iam service-accounts keys create key.json \
  --iam-account=github-actions@[TU_PROJECT_ID].iam.gserviceaccount.com
```

### Paso 2: Configurar MongoDB Atlas

1. **Crear cluster** en MongoDB Atlas
2. **Crear base de datos** llamada `nfc_backend`
3. **Configurar Network Access** para permitir conexiones desde cualquier IP (0.0.0.0/0)
4. **Crear usuario** con permisos de lectura/escritura
5. **Copiar la connection string**

### Paso 3: Configurar GitHub Secrets

Ve a tu repositorio en GitHub → Settings → Secrets and variables → Actions

Agrega estos secrets:

```
GCP_PROJECT_ID: tu-project-id-de-gcp
GCP_SA_KEY: contenido-completo-del-archivo-key.json
MONGODB_URI: mongodb+srv://usuario:password@cluster.mongodb.net/nfc_backend?retryWrites=true&w=majority
JWT_SECRET: un_secreto_jwt_muy_seguro_y_largo_minimo_32_caracteres
```

### Paso 4: Variables de entorno locales

Crea un archivo `.env` basado en este ejemplo:

```env
# Configuración de la aplicación
NODE_ENV=development
PORT=3000

# Base de datos MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nfc_backend?retryWrites=true&w=majority

# Seguridad JWT
JWT_SECRET=tu_secreto_jwt_super_seguro_y_largo

# Configuración de logs
LOG_LEVEL=info
```

## 🎯 Cómo funciona el despliegue

### Trigger automático

- **Push a `main`**: Ejecuta tests → Deploy a producción
- **Pull Request**: Solo ejecuta tests

### Pipeline

1. **Test Job:**

   - ✅ Instala dependencias
   - ✅ Ejecuta linter
   - ✅ Verifica tipos TypeScript
   - ✅ Ejecuta tests unitarios

2. **Deploy Job (solo en main):**
   - 🐳 Construye imagen Docker
   - 📤 Sube a Artifact Registry
   - 🚀 Despliega a Cloud Run
   - 🌐 Configura variables de entorno

### Primer despliegue

1. **Hacer push a main:**

```bash
git add .
git commit -m "feat: initial deployment setup"
git push origin main
```

2. **Ver el progreso:**

   - Ve a GitHub → Actions tab
   - Observa el progreso del workflow

3. **Obtener la URL:**
   - Al final del deploy verás la URL de tu API
   - Formato: `https://nfc-backend-[hash]-ew.a.run.app`

## 🔍 Verificar el despliegue

Una vez desplegado, puedes probar:

```bash
# Health check
curl https://tu-url-de-cloud-run/api/v1/health

# Swagger docs
https://tu-url-de-cloud-run/api-docs
```

## 🛠️ Troubleshooting

### Error: "Permission denied"

- Verifica que el Service Account tenga todos los permisos
- Revisa que el JSON key sea correcto

### Error: "Repository not found"

- Asegúrate de que Artifact Registry esté creado
- Verifica el nombre del repositorio

### Error de conexión a MongoDB

- Verifica la URL de conexión
- Asegúrate de que Network Access permita conexiones
- Revisa las credenciales del usuario

### Ver logs de Cloud Run

```bash
gcloud logs read --service=nfc-backend --region=southamerica-east1
```

## 💰 Estimación de costos

**Cloud Run (tier gratuito):**

- 2 millones de requests/mes
- 400,000 GB-segundos/mes
- 200,000 CPU-segundos/mes

**MongoDB Atlas (tier gratuito):**

- 512 MB de almacenamiento
- Shared cluster

### 🔍 Optimizaciones para minimizar costos:

- ✅ **Health checks**: Cloud Run maneja esto internamente, no usamos Docker HEALTHCHECK
- ✅ **Auto-scaling**: La aplicación se reduce a 0 instancias cuando no hay tráfico
- ✅ **Región optimizada**: Sudamérica para menor latencia y costos

Para proyectos pequeños/medianos, probablemente **no tendrás costos** los primeros meses.

## 🔄 Actualizaciones futuras

Solo necesitas hacer push a `main` y el despliegue será automático:

```bash
git add .
git commit -m "feat: nueva funcionalidad"
git push origin main
```

¡Y listo! Tu aplicación se desplegará automáticamente. 🎉
