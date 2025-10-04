# Guía de Configuración de Pagos

Esta guía te ayudará a configurar Stripe y PayPal para procesar los pagos.

## 🔵 Configuración de Stripe

### 1. Crear Cuenta

1. Ve a [stripe.com](https://stripe.com)
2. Haz clic en "Empezar ahora"
3. Completa el formulario de registro
4. Verifica tu email

### 2. Obtener Claves de Prueba

1. Inicia sesión en el [Dashboard de Stripe](https://dashboard.stripe.com)
2. Asegúrate de estar en **modo de prueba** (toggle arriba a la derecha)
3. Ve a "Desarrolladores" → "Claves de API"
4. Copia las siguientes claves:
    - **Clave publicable:** Empieza con `pk_test_...`
    - **Clave secreta:** Empieza con `sk_test_...`

### 3. Configurar en la Aplicación

**Frontend** (`frontend/.env`):

```env
VITE_STRIPE_PUBLIC_KEY=pk_test_TU_CLAVE_AQUI
```

**Backend** (`backend/.env`):

```env
STRIPE_SECRET_KEY=sk_test_TU_CLAVE_AQUI
```

### 4. Webhooks (Opcional)

Para recibir notificaciones de eventos:

1. En el Dashboard, ve a "Desarrolladores" → "Webhooks"
2. Haz clic en "Agregar endpoint"
3. URL: `https://tu-dominio.com/api/stripe-webhook`
4. Selecciona los eventos que quieres escuchar
5. Copia el "Signing secret" (empieza con `whsec_...`)
6. Agrégalo al `.env`:
    ```env
    STRIPE_WEBHOOK_SECRET=whsec_TU_SECRET_AQUI
    ```

### 5. Tarjetas de Prueba

Usa estas tarjetas para probar:

#### Pagos Exitosos

-   **Visa:** `4242 4242 4242 4242`
-   **Mastercard:** `5555 5555 5555 4444`

#### Requiere Autenticación

-   **3D Secure:** `4000 0025 0000 3155`

#### Pagos Declinados

-   **Fondos insuficientes:** `4000 0000 0000 9995`
-   **Tarjeta perdida:** `4000 0000 0000 9987`
-   **Tarjeta robada:** `4000 0000 0000 9979`

**Datos adicionales para todas las tarjetas:**

-   **Fecha:** Cualquier fecha futura (ej: 12/25)
-   **CVC:** Cualquier 3 dígitos (ej: 123)
-   **Código postal:** Cualquiera (ej: 12345)

### 6. Activar Modo Producción

Cuando estés listo para producción:

1. Completa la información de tu negocio en el Dashboard
2. Activa tu cuenta (puede tomar unos días)
3. Cambia al **modo de producción** (toggle)
4. Obtén las claves de producción:
    - `pk_live_...` (publicable)
    - `sk_live_...` (secreta)
5. Actualiza los archivos `.env` con las claves live

---

## 💙 Configuración de PayPal

### 1. Crear Cuenta de Desarrollador

1. Ve a [developer.paypal.com](https://developer.paypal.com)
2. Inicia sesión con tu cuenta de PayPal (o crea una)
3. Acepta los términos del programa de desarrolladores

### 2. Crear una App

1. En el Dashboard, ve a "My Apps & Credentials"
2. Asegúrate de estar en **Sandbox** (arriba)
3. Haz clic en "Create App"
4. Completa la información:
    - **App Name:** "Socios Asociación"
    - **Sandbox Business Account:** Selecciona o crea una
5. Haz clic en "Create App"

### 3. Obtener Credenciales

En la página de tu app, encontrarás:

-   **Client ID:** (visible directamente)
-   **Secret:** Haz clic en "Show" para verlo

### 4. Configurar en la Aplicación

**Frontend** (`frontend/.env`):

```env
VITE_PAYPAL_CLIENT_ID=TU_CLIENT_ID_AQUI
```

**Backend** (`backend/.env`):

```env
PAYPAL_CLIENT_ID=TU_CLIENT_ID_AQUI
PAYPAL_CLIENT_SECRET=TU_SECRET_AQUI
PAYPAL_MODE=sandbox
```

### 5. Cuentas de Prueba Sandbox

PayPal crea automáticamente cuentas de prueba:

1. Ve a "Sandbox" → "Accounts"
2. Verás dos tipos de cuentas:
    - **Personal (Buyer):** Para hacer compras
    - **Business (Seller):** Para recibir pagos

Para probar pagos:

1. Copia las credenciales de una cuenta Personal
2. Al hacer un pago en tu app, usa esas credenciales
3. Email: `sb-xxxxx@personal.example.com`
4. Password: La que aparece en el Dashboard

### 6. Configurar Webhooks (Opcional)

1. En tu app, baja a la sección "Webhooks"
2. Haz clic en "Add webhook"
3. URL: `https://tu-dominio.com/api/paypal-webhook`
4. Selecciona los eventos:
    - `PAYMENT.CAPTURE.COMPLETED`
    - `PAYMENT.CAPTURE.DENIED`
5. Guarda el Webhook ID

### 7. Activar Modo Producción

Cuando estés listo:

1. Completa el proceso de verificación de tu cuenta de PayPal
2. En el Developer Dashboard, cambia a **Live**
3. Crea una nueva App (o usa la misma)
4. Obtén las credenciales Live
5. Actualiza los archivos `.env`:
    ```env
    PAYPAL_CLIENT_ID=TU_LIVE_CLIENT_ID
    PAYPAL_CLIENT_SECRET=TU_LIVE_SECRET
    PAYPAL_MODE=production
    ```

---

## 💰 Configurar Montos

### Cambiar el Monto a Cobrar

El monto por defecto es **50.00 EUR**. Para cambiarlo:

#### Frontend

**1. Stripe** (`frontend/src/components/StripePayment.jsx`):

```javascript
// Línea ~42
const { data } = await axios.post('/api/create-payment-intent', {
    amount: 5000, // 50.00 EUR en centavos → Cambiar a 10000 para 100 EUR
    currency: 'eur',
    socioData,
})
```

```javascript
// Línea ~87 (texto del botón)
<p className="text-sm text-gray-700">
    <span className="font-semibold">Importe a pagar:</span> 50,00 €
</p>
```

**2. PayPal** (`frontend/src/components/PayPalPayment.jsx`):

```javascript
// Línea ~21
const { data } = await axios.post('/api/create-paypal-order', {
    amount: 50.0, // Cambiar a 100.00 para 100 EUR
    currency: 'EUR',
    socioData,
})
```

```javascript
// Línea ~84 (texto informativo)
<p className="text-sm text-gray-700">
    <span className="font-semibold">Importe a pagar:</span> 50,00 €
</p>
```

### Importante sobre Montos

**Stripe:**

-   Los montos se envían en **centavos** (menor unidad)
-   50.00 EUR = 5000 centavos
-   100.00 EUR = 10000 centavos

**PayPal:**

-   Los montos se envían en **unidades** (formato decimal)
-   50.00 EUR = 50.00
-   100.00 EUR = 100.00

---

## 🌍 Cambiar Moneda

Por defecto está configurado en **EUR (Euro)**. Para cambiarlo:

### Stripe

```javascript
// En los archivos de componentes
currency: 'eur' // Cambiar a 'usd', 'gbp', etc.
```

[Lista completa de monedas soportadas](https://stripe.com/docs/currencies)

### PayPal

```javascript
// En los archivos de componentes
currency: 'EUR' // Cambiar a 'USD', 'GBP', etc.
```

[Lista completa de monedas soportadas](https://developer.paypal.com/docs/reports/reference/paypal-supported-currencies/)

---

## 🔒 Seguridad

### Mejores Prácticas

1. **Nunca** expongas claves secretas en el frontend
2. **Siempre** valida los pagos en el backend
3. **Usa** HTTPS en producción
4. **Implementa** rate limiting
5. **Verifica** la firma de webhooks

### Validación de Pagos

El flujo actual ya incluye validación:

1. Frontend crea el payment intent/orden
2. Backend verifica con Stripe/PayPal
3. Solo si el pago es exitoso, se guarda en Sheets

### Variables de Entorno

Asegúrate de que los archivos `.env` estén en `.gitignore`:

```gitignore
# En .gitignore
.env
.env.local
.env.production
```

---

## 🧪 Testing

### Proceso de Prueba Completo

1. **Iniciar el backend:**

    ```bash
    cd backend
    npm run dev
    ```

2. **Iniciar el frontend:**

    ```bash
    cd frontend
    npm run dev
    ```

3. **Probar con Stripe:**

    - Ir a http://localhost:5173
    - Llenar el formulario
    - Seleccionar "Tarjeta de Crédito/Débito"
    - Usar tarjeta de prueba: `4242 4242 4242 4242`
    - Verificar que se guarde en Google Sheets

4. **Probar con PayPal:**
    - Llenar el formulario
    - Seleccionar "PayPal"
    - Usar credenciales de cuenta Sandbox
    - Verificar que se guarde en Google Sheets

### Checklist de Pruebas

-   [ ] Formulario valida campos correctamente
-   [ ] Pago con Stripe funciona
-   [ ] Pago con PayPal funciona
-   [ ] Datos se guardan en Google Sheets
-   [ ] Página de éxito se muestra correctamente
-   [ ] Página de error se muestra en caso de fallo
-   [ ] Email y teléfono tienen formato correcto

---

## 🚀 Despliegue a Producción

### Checklist Pre-Producción

-   [ ] Activar cuentas de Stripe y PayPal
-   [ ] Obtener claves de producción
-   [ ] Actualizar variables de entorno
-   [ ] Configurar HTTPS
-   [ ] Probar pagos reales con montos pequeños
-   [ ] Configurar webhooks
-   [ ] Implementar logging
-   [ ] Configurar alertas de errores

### Actualizar Variables de Entorno

**Frontend:**

```env
VITE_STRIPE_PUBLIC_KEY=pk_live_...
VITE_PAYPAL_CLIENT_ID=LIVE_CLIENT_ID
VITE_API_URL=https://api.tu-dominio.com
```

**Backend:**

```env
STRIPE_SECRET_KEY=sk_live_...
PAYPAL_CLIENT_ID=LIVE_CLIENT_ID
PAYPAL_CLIENT_SECRET=LIVE_SECRET
PAYPAL_MODE=production
```

---

## ❓ Solución de Problemas

### Stripe

**Error: "Invalid API Key"**

-   Verifica que la clave sea correcta
-   Verifica que no haya espacios extra
-   Verifica que uses la clave del modo correcto (test/live)

**Error: "Card declined"**

-   En test: Usa las tarjetas de prueba oficiales
-   En producción: Contacta con el banco del cliente

### PayPal

**Error: "Authentication failed"**

-   Verifica Client ID y Secret
-   Verifica que `PAYPAL_MODE` sea correcto (sandbox/production)

**Error: "Account restricted"**

-   Verifica que la cuenta esté verificada
-   Completa el proceso de verificación de identidad

### General

**Error: "Network error"**

-   Verifica que el backend esté corriendo
-   Verifica las URLs en `.env`
-   Verifica CORS en el backend

---

## 📚 Recursos Adicionales

### Stripe

-   [Documentación oficial](https://stripe.com/docs)
-   [API Reference](https://stripe.com/docs/api)
-   [Testing](https://stripe.com/docs/testing)

### PayPal

-   [Documentación oficial](https://developer.paypal.com/docs/)
-   [Sandbox Guide](https://developer.paypal.com/docs/api-basics/sandbox/)
-   [API Reference](https://developer.paypal.com/api/rest/)

---

## 💡 Consejos

1. **Prueba exhaustivamente** antes de activar producción
2. **Monitorea** los pagos regularmente
3. **Mantén** backups de la hoja de Google
4. **Documenta** cualquier cambio en los montos o configuración
5. **Contacta** con soporte si tienes dudas

¡Buena suerte con tu sistema de pagos! 🚀
