# AGENTS.md

## 📋 Descripción del Proyecto

Sistema web completo de inscripción de socios para una asociación. Permite a los usuarios registrarse mediante un formulario moderno, procesar pagos de forma segura mediante Stripe o PayPal, y almacenar automáticamente todos los datos en Google Sheets para fácil gestión.

## 🏗️ Arquitectura

El proyecto está dividido en dos partes principales:

### Frontend (React + Vite)

-   **Ubicación:** `/frontend`
-   **Framework:** React 19 con Vite
-   **Estilos:** Tailwind CSS + Flowbite React
-   **Navegación:** React Router DOM
-   **Gestión de pagos:** Stripe.js y PayPal React SDK

### Backend (Node.js + Express)

-   **Ubicación:** `/backend`
-   **Servidor:** Express.js
-   **APIs de pago:** Stripe SDK y PayPal Checkout SDK
-   **Almacenamiento:** Google Sheets API
-   **Seguridad:** CORS, variables de entorno

## 🔧 Entorno y Dependencias

### Frontend

-   **Framework:** React 19
-   **Build tool:** Vite 6
-   **Estilos:** Tailwind CSS 3, Flowbite React
-   **Routing:** React Router DOM 7
-   **Pagos:**
    -   @stripe/stripe-js 5
    -   @stripe/react-stripe-js 3
    -   @paypal/react-paypal-js 8
-   **HTTP:** Axios 1.7
-   **Iconos:** React Icons 5

### Backend

-   **Runtime:** Node.js 18+
-   **Framework:** Express 4
-   **Pagos:**
    -   stripe 17
    -   @paypal/paypal-server-sdk 0.6
-   **Storage:** googleapis 144
-   **Utilidades:**
    -   dotenv 16
    -   cors 2
    -   body-parser 1
-   **Dev:** nodemon 3

## 📁 Estructura del Proyecto

```
socios-ajerga-1/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── StripePayment.jsx    # Componente de pago Stripe
│   │   │   └── PayPalPayment.jsx    # Componente de pago PayPal
│   │   ├── pages/
│   │   │   ├── HomePage.jsx         # Formulario de inscripción
│   │   │   ├── PaymentPage.jsx      # Página de procesamiento de pago
│   │   │   ├── SuccessPage.jsx      # Confirmación de éxito
│   │   │   └── ErrorPage.jsx        # Página de error
│   │   ├── App.jsx                  # Componente principal con rutas
│   │   ├── main.jsx                 # Punto de entrada
│   │   └── index.css                # Estilos globales
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env.example
│
├── backend/
│   ├── routes/
│   │   ├── stripe.js                # Endpoints de Stripe
│   │   ├── paypal.js                # Endpoints de PayPal
│   │   └── sheets.js                # Endpoints de Google Sheets
│   ├── server.js                    # Servidor Express
│   ├── package.json
│   └── .env.example
│
├── README.md                        # Documentación completa
├── QUICKSTART.md                    # Guía de inicio rápido
├── PAYMENT_SETUP.md                 # Configuración de pagos
├── GOOGLE_SHEETS_SETUP.md           # Configuración de Google Sheets
└── AGENTS.md                        # Este archivo
```

## 🔄 Flujo de Datos

1. **HomePage (/):**

    - Usuario completa el formulario de inscripción
    - Validación en tiempo real de campos
    - Datos se guardan en `localStorage`
    - Redirección a `/pago`

2. **PaymentPage (/pago):**

    - Recupera datos de `localStorage`
    - Muestra resumen de inscripción
    - Carga componente de pago según método seleccionado
    - Procesa el pago con Stripe o PayPal

3. **Procesamiento de Pago:**

    - **Stripe:** Crea Payment Intent → Confirma pago → Verifica estado
    - **PayPal:** Crea Order → Captura pago → Verifica estado

4. **Guardado en Google Sheets:**

    - POST a `/api/save-socio` con todos los datos
    - Backend inserta fila en la hoja
    - Incluye: datos personales, método de pago, estado, fecha, monto

5. **Confirmación:**
    - Pago exitoso → `/exito` (SuccessPage)
    - Pago fallido → `/error` (ErrorPage)
    - Se limpia `localStorage`

## 🛠️ Estructura Recomendada para Funciones

Todas las funciones deben documentarse con JSDoc:

```javascript
/**
 * Descripción breve de la función
 * @param {type} paramName - Descripción del parámetro
 * @returns {type} Descripción del retorno
 */
function nombreFuncion(paramName) {
    // Código
}
```

## 🔌 API Endpoints

### Stripe (`/backend/routes/stripe.js`)

#### POST `/api/create-payment-intent`

Crea un Payment Intent para procesar el pago con Stripe.

**Request:**

```json
{
    "amount": 5000,
    "currency": "eur",
    "socioData": {
        "email": "usuario@email.com",
        "nombreCompleto": "Juan Pérez",
        "documento": "12345678X"
    }
}
```

**Response:**

```json
{
    "clientSecret": "pi_xxx_secret_xxx",
    "paymentIntentId": "pi_xxx"
}
```

#### GET `/api/verify-stripe-payment/:paymentId`

Verifica el estado de un pago de Stripe.

**Response:**

```json
{
    "status": "succeeded",
    "amount": 5000,
    "currency": "eur",
    "paid": true
}
```

### PayPal (`/backend/routes/paypal.js`)

#### POST `/api/create-paypal-order`

Crea una orden de PayPal.

**Request:**

```json
{
    "amount": 50.0,
    "currency": "EUR",
    "socioData": {
        "email": "usuario@email.com",
        "nombreCompleto": "Juan Pérez"
    }
}
```

**Response:**

```json
{
    "orderID": "ORDER_ID_XXX"
}
```

#### POST `/api/capture-paypal-order`

Captura el pago de una orden de PayPal.

**Request:**

```json
{
    "orderID": "ORDER_ID_XXX"
}
```

**Response:**

```json
{
    "orderID": "ORDER_ID_XXX",
    "status": "COMPLETED",
    "captureID": "CAPTURE_ID_XXX"
}
```

#### GET `/api/verify-paypal-payment/:orderID`

Verifica el estado de una orden de PayPal.

**Response:**

```json
{
    "status": "COMPLETED",
    "paid": true
}
```

### Google Sheets (`/backend/routes/sheets.js`)

#### POST `/api/save-socio`

Guarda los datos del socio en Google Sheets.

**Request:**

```json
{
    "email": "usuario@email.com",
    "nombreCompleto": "Juan Pérez García",
    "documento": "12345678X",
    "direccion": "Calle Principal, 123",
    "localidad": "Madrid",
    "provincia": "Madrid",
    "codigoPostal": "28001",
    "telefono": "612345678",
    "metodoPago": "stripe",
    "paymentId": "pi_xxx",
    "estado": "Pagado",
    "fechaPago": "2025-10-04T10:30:00Z",
    "monto": 50.0
}
```

**Response:**

```json
{
    "success": true,
    "message": "Datos guardados correctamente",
    "updates": {
        "updatedRows": 1
    }
}
```

#### PUT `/api/update-payment-status`

Actualiza el estado de pago de un socio.

**Request:**

```json
{
    "email": "usuario@email.com",
    "estado": "Pagado",
    "paymentId": "pi_xxx"
}
```

**Response:**

```json
{
    "success": true,
    "message": "Estado actualizado correctamente",
    "email": "usuario@email.com",
    "estado": "Pagado"
}
```

#### GET `/api/socios`

Obtiene la lista de todos los socios registrados.

**Response:**

```json
{
    "socios": [
        {
            "Fecha Inscripción": "2025-10-04T10:30:00Z",
            "Email": "usuario@email.com",
            "Nombre Completo": "Juan Pérez García",
            "Documento": "12345678X",
            "Estado": "Pagado",
            "Monto": "50.00"
        }
    ]
}
```

## 🎨 Componentes Principales

### HomePage.jsx

-   **Ruta:** `/`
-   **Propósito:** Formulario de inscripción
-   **Estado:** Maneja `formData` y `errors`
-   **Funciones clave:**
    -   `handleChange()` - Actualiza campos del formulario
    -   `validateForm()` - Valida todos los campos
    -   `handleSubmit()` - Guarda en localStorage y redirige

### PaymentPage.jsx

-   **Ruta:** `/pago`
-   **Propósito:** Procesar el pago
-   **Estado:** Maneja `socioData` y `loading`
-   **Funciones clave:**
    -   Recupera datos de localStorage
    -   Renderiza componente de pago apropiado

### StripePayment.jsx

-   **Props:** `socioData`
-   **Propósito:** Interfaz de pago con Stripe
-   **Estado:** Maneja `loading` y `error`
-   **Funciones clave:**
    -   `handleSubmit()` - Procesa el pago con Stripe
    -   Crea Payment Intent
    -   Confirma el pago
    -   Guarda en Google Sheets

### PayPalPayment.jsx

-   **Props:** `socioData`
-   **Propósito:** Interfaz de pago con PayPal
-   **Estado:** Maneja `error` y `loading`
-   **Funciones clave:**
    -   `createOrder()` - Crea orden de PayPal
    -   `onApprove()` - Captura el pago
    -   `onError()` - Maneja errores
    -   `onCancel()` - Maneja cancelación

### SuccessPage.jsx

-   **Ruta:** `/exito`
-   **Propósito:** Confirmación de pago exitoso
-   **Funcionalidad:** Limpia localStorage

### ErrorPage.jsx

-   **Ruta:** `/error`
-   **Propósito:** Mostrar error de pago
-   **Funcionalidad:** Opciones de reintentar o volver

## 📊 Estructura de Google Sheets

La hoja debe tener estas columnas (fila 1):

| Columna | Nombre            | Tipo     | Descripción                 |
| ------- | ----------------- | -------- | --------------------------- |
| A       | Fecha Inscripción | DateTime | Fecha y hora de inscripción |
| B       | Email             | String   | Email del socio             |
| C       | Nombre Completo   | String   | Nombre y apellidos          |
| D       | Documento         | String   | DNI/NIF/NIE                 |
| E       | Dirección         | String   | Dirección completa          |
| F       | Localidad         | String   | Ciudad o localidad          |
| G       | Provincia         | String   | Provincia                   |
| H       | Código Postal     | String   | Código postal (5 dígitos)   |
| I       | Teléfono          | String   | Teléfono (9 dígitos)        |
| J       | Método Pago       | String   | "stripe" o "paypal"         |
| K       | Payment ID        | String   | ID del pago                 |
| L       | Estado            | String   | "Pendiente" o "Pagado"      |
| M       | Fecha Pago        | DateTime | Fecha y hora del pago       |
| N       | Monto             | Number   | Cantidad pagada             |

## 🔒 Variables de Entorno

### Frontend (`.env`)

```env
# Stripe - Clave pública
VITE_STRIPE_PUBLIC_KEY=pk_test_...

# PayPal - Client ID
VITE_PAYPAL_CLIENT_ID=...

# API URL (opcional)
VITE_API_URL=http://localhost:3000
```

### Backend (`.env`)

```env
# Puerto del servidor
PORT=3000

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# PayPal
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
PAYPAL_MODE=sandbox

# Google Sheets
GOOGLE_APPLICATION_CREDENTIALS=./credentials/google-credentials.json
GOOGLE_SHEET_ID=...
GOOGLE_SHEET_RANGE=Socios!A:N

# CORS
CORS_ORIGIN=http://localhost:5173
```

## 🚀 Comandos Disponibles

### Frontend

```powershell
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

### Backend

```powershell
# Instalar dependencias
npm install

# Desarrollo (con nodemon)
npm run dev

# Producción
npm start
```

## 🧪 Testing

### Datos de Prueba

**Tarjeta Stripe exitosa:**

-   Número: `4242 4242 4242 4242`
-   Fecha: Cualquier fecha futura
-   CVC: `123`
-   Código postal: `12345`

**Credenciales PayPal Sandbox:**

-   Usar las credenciales de tu cuenta sandbox
-   Email: `sb-xxxxx@personal.example.com`

**Datos de formulario válidos:**

```javascript
{
  email: "test@email.com",
  nombreCompleto: "Juan Pérez García",
  documento: "12345678X",
  direccion: "Calle Test, 123",
  localidad: "Madrid",
  provincia: "Madrid",
  codigoPostal: "28001",
  telefono: "612345678",
  metodoPago: "stripe"
}
```

## 🐛 Solución de Problemas Comunes

### Error: "Module not found"

```powershell
cd frontend  # o cd backend
npm install
```

### Error: "Port already in use"

Cambia el puerto en `backend/.env`:

```env
PORT=3001
```

### Error: "Invalid API Key"

Verifica que las claves en los archivos `.env` sean correctas y no tengan espacios.

### Error: "Cannot read credentials"

Verifica que:

1. El archivo `google-credentials.json` esté en `backend/credentials/`
2. La ruta en `.env` sea correcta
3. El archivo tenga permisos de lectura

### Error: "CORS policy"

Verifica que `CORS_ORIGIN` en backend coincida con la URL del frontend.

## 📝 Mejores Prácticas

### Código

-   Usar nombres descriptivos para variables y funciones
-   Documentar todas las funciones con JSDoc
-   Validar datos tanto en frontend como backend
-   Manejar errores apropiadamente
-   Usar try-catch en operaciones asíncronas

### Seguridad

-   Nunca exponer claves secretas en el frontend
-   Validar todos los datos en el backend
-   Usar HTTPS en producción
-   Implementar rate limiting
-   Sanitizar inputs del usuario

### Git

-   No hacer commit de archivos `.env`
-   No hacer commit de `node_modules/`
-   No hacer commit de credenciales de Google
-   Usar `.gitignore` apropiadamente

## 🔄 Flujo de Desarrollo

### Para agregar un nuevo campo al formulario:

1. **Frontend - HomePage.jsx:**

    - Agregar al estado `formData`
    - Agregar campo en el JSX
    - Agregar validación en `validateForm()`

2. **Backend - routes/sheets.js:**

    - Agregar el campo al array `values`
    - Actualizar `GOOGLE_SHEET_RANGE` si es necesario

3. **Google Sheets:**
    - Agregar nueva columna en la hoja
    - Actualizar el encabezado

### Para cambiar el monto del pago:

1. **Frontend:**

    - `StripePayment.jsx`: Cambiar `amount` (en centavos)
    - `PayPalPayment.jsx`: Cambiar `amount` (en unidades)
    - Actualizar textos que muestren el monto

2. **Backend:**
    - Los montos se reciben desde el frontend
    - Opcional: Agregar validación del monto

## 📚 Recursos Útiles

-   [React Docs](https://react.dev/)
-   [Vite Docs](https://vitejs.dev/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [Flowbite React](https://flowbite-react.com/)
-   [Stripe Docs](https://stripe.com/docs)
-   [PayPal Developer](https://developer.paypal.com/)
-   [Google Sheets API](https://developers.google.com/sheets/api)
-   [Express Docs](https://expressjs.com/)

## 📄 Licencia

Este proyecto es privado y confidencial.

---

**Última actualización:** Octubre 2025
**Versión:** 1.0.0
