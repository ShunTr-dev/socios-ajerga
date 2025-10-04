# 🚀 Guía de Despliegue a Producción

Esta guía te ayudará a desplegar tu aplicación en un servidor de producción.

## 📋 Pre-requisitos

Antes de desplegar, asegúrate de tener:

-   [ ] Cuentas de Stripe y PayPal **activadas** (no en modo test)
-   [ ] Dominio registrado (ej: `tuasociacion.com`)
-   [ ] Google Sheets configurado
-   [ ] Aplicación probada completamente en desarrollo

## 🌐 Opciones de Hosting

### Frontend (Recomendado: Vercel)

#### Vercel (Gratis/Fácil)

1. **Crear cuenta en Vercel:**

    - Ve a [vercel.com](https://vercel.com)
    - Regístrate con GitHub

2. **Conectar repositorio:**

    - Haz push de tu código a GitHub
    - En Vercel, clic en "Import Project"
    - Selecciona tu repositorio

3. **Configurar proyecto:**

    ```
    Framework Preset: Vite
    Root Directory: frontend
    Build Command: npm run build
    Output Directory: dist
    ```

4. **Variables de entorno:**

    - En Settings → Environment Variables
    - Agregar:
        ```
        VITE_STRIPE_PUBLIC_KEY=pk_live_...
        VITE_PAYPAL_CLIENT_ID=...
        VITE_API_URL=https://api.tudominio.com
        ```

5. **Deploy:**
    - Clic en "Deploy"
    - Tu app estará en: `tu-proyecto.vercel.app`

#### Alternativas Frontend

-   **Netlify:** Similar a Vercel
-   **GitHub Pages:** Solo para sitios estáticos
-   **Cloudflare Pages:** Rápido y con CDN

### Backend (Recomendado: Railway)

#### Railway ($5-20/mes)

1. **Crear cuenta:**

    - Ve a [railway.app](https://railway.app)
    - Regístrate con GitHub

2. **Nuevo proyecto:**

    - "New Project" → "Deploy from GitHub repo"
    - Selecciona tu repositorio

3. **Configurar:**

    ```
    Root Directory: backend
    Start Command: npm start
    ```

4. **Variables de entorno:**

    - En Variables, agregar todas las de `.env`:
        ```
        PORT=3000
        STRIPE_SECRET_KEY=sk_live_...
        PAYPAL_CLIENT_ID=...
        PAYPAL_CLIENT_SECRET=...
        PAYPAL_MODE=production
        GOOGLE_APPLICATION_CREDENTIALS=/app/credentials/google-credentials.json
        GOOGLE_SHEET_ID=...
        GOOGLE_SHEET_RANGE=Socios!A:N
        CORS_ORIGIN=https://tudominio.com
        ```

5. **Subir credenciales de Google:**

    - En Settings → Volumes
    - Crear volumen en `/app/credentials`
    - Subir `google-credentials.json`

6. **Deploy:**
    - Railway automáticamente desplegará
    - URL: `tu-proyecto.railway.app`

#### Alternativas Backend

-   **Render:** Similar a Railway, tiene plan gratis
-   **Heroku:** $7/mes, muy popular
-   **DigitalOcean App Platform:** $5-12/mes
-   **AWS Elastic Beanstalk:** Escalable, más complejo

## 🔐 Configurar HTTPS

### Con Vercel/Railway (Automático)

-   HTTPS se configura automáticamente
-   Certificado SSL gratuito incluido

### Con dominio propio

1. **Comprar dominio:**

    - Namecheap, GoDaddy, Google Domains
    - Costo: ~$10-15/año

2. **Configurar DNS en Vercel:**

    - En Settings → Domains
    - Agregar tu dominio
    - Actualizar DNS en tu registrador:
        ```
        Type: CNAME
        Name: @
        Value: cname.vercel-dns.com
        ```

3. **Configurar DNS para API:**
    - Subdominio: `api.tudominio.com`
    - Apuntar a Railway:
        ```
        Type: CNAME
        Name: api
        Value: tu-proyecto.railway.app
        ```

## 🔄 Actualizar a Claves de Producción

### Stripe

1. **Dashboard de Stripe:**

    - Cambia a modo "Live" (toggle arriba a la derecha)
    - Ve a Developers → API keys

2. **Copiar claves:**

    - Publishable key: `pk_live_...`
    - Secret key: `sk_live_...`

3. **Actualizar en Vercel:**

    ```env
    VITE_STRIPE_PUBLIC_KEY=pk_live_...
    ```

4. **Actualizar en Railway:**
    ```env
    STRIPE_SECRET_KEY=sk_live_...
    ```

### PayPal

1. **PayPal Developer:**

    - Cambia a modo "Live"
    - Crea nueva app o usa la existente

2. **Copiar credenciales:**

    - Client ID (live)
    - Secret (live)

3. **Actualizar variables:**
    ```env
    PAYPAL_CLIENT_ID=LIVE_CLIENT_ID
    PAYPAL_CLIENT_SECRET=LIVE_SECRET
    PAYPAL_MODE=production
    ```

## 🧪 Testing en Producción

### Checklist de Pruebas

-   [ ] Formulario se carga correctamente
-   [ ] Validación de campos funciona
-   [ ] Pago con Stripe funciona (usar monto real pequeño)
-   [ ] Pago con PayPal funciona
-   [ ] Datos se guardan en Google Sheets
-   [ ] Redirección a página de éxito
-   [ ] Emails válidos son aceptados
-   [ ] Formulario es responsive en móvil

### Pruebas de Pago Reales

⚠️ **IMPORTANTE:** Usa montos pequeños (1€) para pruebas

1. **Prueba con Stripe:**

    - Usa una tarjeta real
    - Verifica que el pago aparezca en Dashboard de Stripe
    - Verifica que los datos estén en Google Sheets
    - Cancela/reembolsa el pago si es prueba

2. **Prueba con PayPal:**
    - Usa cuenta real de PayPal
    - Verifica el pago en tu cuenta PayPal
    - Verifica datos en Google Sheets

## 📊 Monitoreo

### Logs

**Vercel:**

-   Realtime logs en Dashboard
-   Función: `Functions` → Ver logs

**Railway:**

-   Logs en tiempo real en Dashboard
-   Clic en tu servicio → View Logs

### Errores

Configura alertas para:

-   Errores 500 del servidor
-   Pagos fallidos
-   Problemas con Google Sheets

### Analytics (Opcional)

Añadir Google Analytics:

1. Crear propiedad en Google Analytics
2. Instalar en frontend:
    ```bash
    npm install react-ga4
    ```
3. Configurar en `App.jsx`

## 🔒 Seguridad en Producción

### Variables de Entorno

✅ **HACER:**

-   Usar variables de entorno para todas las claves
-   Nunca hacer commit de `.env`
-   Rotar claves regularmente

❌ **NO HACER:**

-   Hardcodear claves en el código
-   Compartir claves públicamente
-   Usar las mismas claves en dev y prod

### CORS

Actualizar en backend:

```javascript
// server.js
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || 'https://tudominio.com',
        credentials: true,
    })
)
```

### Rate Limiting

Instalar express-rate-limit:

```bash
npm install express-rate-limit
```

```javascript
// server.js
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // límite de 100 requests
})

app.use('/api/', limiter)
```

### Helmet (Seguridad HTTP)

```bash
npm install helmet
```

```javascript
// server.js
import helmet from 'helmet'
app.use(helmet())
```

## 📧 Configurar Emails (Opcional)

Para enviar emails de confirmación:

### Opción 1: SendGrid

```bash
npm install @sendgrid/mail
```

```javascript
// backend/services/email.js
import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export async function sendConfirmationEmail(to, socioData) {
    const msg = {
        to,
        from: 'noreply@tudominio.com',
        subject: 'Confirmación de Inscripción',
        text: `Hola ${socioData.nombreCompleto}...`,
        html: '<strong>Bienvenido...</strong>',
    }
    await sgMail.send(msg)
}
```

### Opción 2: Nodemailer

Más económico pero requiere servidor SMTP.

## 🔄 CI/CD (Despliegue Continuo)

### GitHub Actions

Crear `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
    push:
        branches: [main]

jobs:
    deploy:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2

            - name: Deploy Frontend
              uses: amondnet/vercel-action@v20
              with:
                  vercel-token: ${{ secrets.VERCEL_TOKEN }}
                  vercel-org-id: ${{ secrets.ORG_ID }}
                  vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📊 Base de Datos (Migración Futura)

Si Google Sheets se vuelve limitado:

### PostgreSQL en Railway

1. Crear base de datos en Railway
2. Instalar Prisma o TypeORM
3. Migrar datos de Sheets
4. Actualizar código del backend

## 🆘 Solución de Problemas

### Error: "CORS policy"

Verifica que `CORS_ORIGIN` en backend coincida con la URL del frontend.

### Error: "Payment failed"

1. Verifica que uses claves live (no test)
2. Verifica que la cuenta esté activada
3. Revisa logs de Stripe/PayPal

### Error: "Google Sheets API"

1. Verifica que las credenciales estén en el servidor
2. Verifica que la hoja esté compartida
3. Verifica el ID de la hoja

### Frontend no se conecta al Backend

1. Verifica `VITE_API_URL` en frontend
2. Verifica que el backend esté corriendo
3. Verifica configuración de CORS

## 📈 Escalamiento

### Cuando crecer

Considera mejorar cuando:

-   Más de 10 pagos por día
-   Más de 1000 socios registrados
-   Tiempos de respuesta lentos

### Opciones de Escalamiento

1. **Base de datos:** PostgreSQL en lugar de Sheets
2. **CDN:** Cloudflare para assets
3. **Cache:** Redis para datos frecuentes
4. **Queue:** Bull para procesar pagos asíncronamente
5. **Microservicios:** Separar pagos y registro

## 💰 Costos Mensuales Estimados

### Configuración Mínima

-   Frontend (Vercel): **Gratis**
-   Backend (Railway): **$5-10**
-   Dominio: **$1/mes**
-   **Total: ~$6-11/mes**

### Configuración Profesional

-   Frontend (Vercel Pro): **$20**
-   Backend (Railway Pro): **$20**
-   Base de datos: **$10**
-   Email (SendGrid): **$15**
-   Dominio: **$1**
-   **Total: ~$66/mes**

## ✅ Checklist Final

Antes de lanzar oficialmente:

-   [ ] Todas las pruebas pasan
-   [ ] Claves de producción configuradas
-   [ ] HTTPS habilitado
-   [ ] Dominio configurado
-   [ ] Google Sheets funcionando
-   [ ] Emails de confirmación (si aplica)
-   [ ] Política de privacidad agregada
-   [ ] Términos y condiciones agregados
-   [ ] Backup de Google Sheets configurado
-   [ ] Monitoreo de errores activo
-   [ ] Pruebas de pago real exitosas

## 🎉 ¡Listo para Producción!

Una vez completados todos los pasos, tu aplicación estará lista para recibir inscripciones reales.

### Siguientes Pasos

1. Anuncia el lanzamiento a tu asociación
2. Monitorea los primeros días de cerca
3. Recopila feedback de usuarios
4. Implementa mejoras según sea necesario

---

**¿Necesitas ayuda?** Consulta la documentación de cada servicio o contacta con soporte técnico.
