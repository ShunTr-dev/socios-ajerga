# 🎯 Sistema de Inscripción de Socios

Sistema web completo y moderno para la inscripción y gestión de socios de asociaciones. Incluye formulario responsivo, procesamiento de pagos con Stripe y PayPal, y almacenamiento automático en Google Sheets.

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-Private-red.svg)](LICENSE)

---

## 📚 Documentación Completa

Este proyecto incluye documentación detallada para diferentes audiencias:

### 🚀 Para Empezar

-   **[QUICKSTART.md](QUICKSTART.md)** - Guía de inicio rápido (< 10 minutos)
-   **[INSTALLATION_WINDOWS.md](INSTALLATION_WINDOWS.md)** - Instalación completa en Windows
-   **Este archivo (README.md)** - Documentación técnica completa

### ⚙️ Configuración

-   **[PAYMENT_SETUP.md](PAYMENT_SETUP.md)** - Configurar Stripe y PayPal paso a paso
-   **[GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md)** - Configurar Google Sheets desde cero

### 📊 Gestión

-   **[EXECUTIVE_SUMMARY.md](EXECUTIVE_SUMMARY.md)** - Resumen ejecutivo del proyecto
-   **[DEPLOYMENT.md](DEPLOYMENT.md)** - Despliegue a producción
-   **[AGENTS.md](AGENTS.md)** - Documentación técnica para desarrolladores

---

## 🏗️ Estructura del Proyecto

```
socios-ajerga/
├── frontend/          # Aplicación React + Vite
│   ├── src/
│   │   ├── components/    # Componentes de pago
│   │   ├── pages/         # Páginas principales
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/           # Servidor Node.js + Express
│   ├── routes/
│   │   ├── stripe.js      # Rutas de Stripe
│   │   ├── paypal.js      # Rutas de PayPal
│   │   └── sheets.js      # Rutas de Google Sheets
│   ├── server.js
│   └── package.json
│
└── README.md
```

## ✨ Características

-   ✅ Formulario moderno y responsivo con validación
-   ✅ Procesamiento de pagos con Stripe y PayPal
-   ✅ Almacenamiento automático en Google Sheets
-   ✅ Verificación de estado de pago
-   ✅ Páginas de confirmación (éxito/error)
-   ✅ Backend RESTful API con Node.js
-   ✅ Separación completa Frontend/Backend

## 🚀 Instalación

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd socios-ajerga
```

### 2. Configurar Backend

```bash
cd backend
npm install
```

Crear archivo `.env` basado en `.env.example`:

```env
PORT=3000

# Stripe
STRIPE_SECRET_KEY=sk_test_YOUR_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET

# PayPal
PAYPAL_CLIENT_ID=YOUR_CLIENT_ID
PAYPAL_CLIENT_SECRET=YOUR_SECRET
PAYPAL_MODE=sandbox

# Google Sheets
GOOGLE_APPLICATION_CREDENTIALS=./credentials/google-credentials.json
GOOGLE_SHEET_ID=YOUR_SHEET_ID
GOOGLE_SHEET_RANGE=Socios!A:N

CORS_ORIGIN=http://localhost:5173
```

### 3. Configurar Frontend

```bash
cd ../frontend
npm install
```

Crear archivo `.env` basado en `.env.example`:

```env
VITE_STRIPE_PUBLIC_KEY=pk_test_YOUR_KEY
VITE_PAYPAL_CLIENT_ID=YOUR_CLIENT_ID
VITE_API_URL=http://localhost:3000
```

## 🔑 Configuración de Servicios

### Stripe

1. Crear cuenta en [Stripe](https://stripe.com)
2. Obtener las claves API (test mode):
    - Clave pública: `pk_test_...`
    - Clave secreta: `sk_test_...`
3. Agregar las claves en los archivos `.env`

### PayPal

1. Crear cuenta de desarrollador en [PayPal Developer](https://developer.paypal.com)
2. Crear una aplicación en el Dashboard
3. Obtener Client ID y Secret
4. Agregar las credenciales en los archivos `.env`

### Google Sheets

1. Ir a [Google Cloud Console](https://console.cloud.google.com)
2. Crear un proyecto nuevo
3. Habilitar Google Sheets API
4. Crear cuenta de servicio:
    - IAM & Admin → Service Accounts → Create Service Account
    - Crear clave JSON y descargarla
5. Guardar el archivo JSON en `backend/credentials/google-credentials.json`
6. Crear una hoja de cálculo en Google Sheets
7. Compartir la hoja con el email de la cuenta de servicio
8. Copiar el ID de la hoja (de la URL) y agregarlo al `.env`

**Estructura de la hoja (primera fila):**

| A                 | B     | C               | D         | E         | F         | G         | H             | I        | J           | K          | L      | M          | N     |
| ----------------- | ----- | --------------- | --------- | --------- | --------- | --------- | ------------- | -------- | ----------- | ---------- | ------ | ---------- | ----- |
| Fecha Inscripción | Email | Nombre Completo | Documento | Dirección | Localidad | Provincia | Código Postal | Teléfono | Método Pago | Payment ID | Estado | Fecha Pago | Monto |

## 🏃 Ejecutar el Proyecto

### Modo Desarrollo

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`
El backend estará disponible en: `http://localhost:3000`

### Modo Producción

**Backend:**

```bash
cd backend
npm start
```

**Frontend:**

```bash
cd frontend
npm run build
npm run preview
```

## 📋 Flujo de la Aplicación

1. **Página Principal** (`/`)

    - Usuario completa el formulario de inscripción
    - Selecciona método de pago (Stripe o PayPal)
    - Datos se guardan en localStorage

2. **Página de Pago** (`/pago`)

    - Se muestra resumen de datos
    - Se carga el componente de pago según método elegido
    - Usuario completa el pago

3. **Procesamiento**

    - Se crea payment intent (Stripe) u orden (PayPal)
    - Se procesa el pago
    - Se guardan los datos en Google Sheets
    - Se verifica el estado del pago

4. **Página de Resultado**
    - `/exito` - Pago exitoso
    - `/error` - Pago fallido

## 🔌 Endpoints del API

### Stripe

-   `POST /api/create-payment-intent` - Crear intención de pago
-   `GET /api/verify-stripe-payment/:paymentId` - Verificar pago

### PayPal

-   `POST /api/create-paypal-order` - Crear orden
-   `POST /api/capture-paypal-order` - Capturar pago
-   `GET /api/verify-paypal-payment/:orderID` - Verificar pago

### Google Sheets

-   `POST /api/save-socio` - Guardar datos del socio
-   `PUT /api/update-payment-status` - Actualizar estado de pago
-   `GET /api/socios` - Obtener lista de socios

### Otros

-   `GET /api/health` - Health check del servidor

## 🛠️ Tecnologías Utilizadas

### Frontend

-   React 19
-   Vite
-   React Router DOM
-   Tailwind CSS
-   Flowbite React
-   Stripe.js
-   PayPal React SDK
-   Axios

### Backend

-   Node.js
-   Express
-   Stripe SDK
-   PayPal Server SDK (v0.6)
-   Google APIs (Sheets)
-   dotenv
-   CORS

## 🎨 Personalización

### Cambiar Texto Principal

Editar `frontend/src/pages/HomePage.jsx`:

```jsx
<p className="text-lg text-gray-600 max-w-2xl mx-auto">
    Bienvenido al portal de inscripción...
    {/* Modificar este texto */}
</p>
```

### Cambiar Monto del Pago

Editar en varios archivos:

**Frontend:**

-   `frontend/src/components/StripePayment.jsx` - línea con `amount: 5000`
-   `frontend/src/components/PayPalPayment.jsx` - línea con `amount: 50.00`

**Backend:**
Los montos se reciben desde el frontend.

### Cambiar Colores

Editar `frontend/tailwind.config.js` para personalizar la paleta de colores.

## 🧪 Testing

### Tarjetas de Prueba Stripe

-   **Exitosa:** `4242 4242 4242 4242`
-   **Requiere autenticación:** `4000 0025 0000 3155`
-   **Declinada:** `4000 0000 0000 9995`

Fecha: Cualquier fecha futura
CVC: Cualquier 3 dígitos
Código postal: Cualquiera

### PayPal Sandbox

Usar las credenciales de prueba de tu cuenta sandbox de PayPal.

## 📝 Notas Importantes

1. **Seguridad:**

    - Nunca exponer claves secretas en el frontend
    - Usar variables de entorno
    - Validar datos en el backend

2. **Producción:**

    - Cambiar claves de test a producción
    - Configurar HTTPS
    - Implementar rate limiting
    - Agregar logs adecuados

3. **Google Sheets:**
    - Límite de 10 millones de celdas por hoja
    - Para muchos socios, considerar base de datos

## 🐛 Solución de Problemas

### Error: CORS

Verificar que `CORS_ORIGIN` en backend coincida con la URL del frontend.

### Error: Google Sheets

-   Verificar que el archivo de credenciales esté en la ruta correcta
-   Verificar que la hoja esté compartida con la cuenta de servicio
-   Verificar el ID de la hoja en el `.env`

### Error: Stripe/PayPal

-   Verificar que las claves sean correctas
-   En producción, usar claves de producción (no test)

## 📄 Licencia

Este proyecto es privado y confidencial.

## 👥 Soporte

Para soporte o preguntas, contactar con el equipo de desarrollo.
