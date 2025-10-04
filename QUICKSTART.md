# Inicio Rápido

Esta guía te ayudará a poner en marcha el proyecto en menos de 10 minutos.

## ⚡ Instalación Rápida

### 1. Instalar Dependencias

```powershell
# Backend
cd backend
npm install

# Frontend
cd ..\frontend
npm install
cd ..
```

### 2. Configurar Variables de Entorno

**Backend:**

```powershell
cd backend
copy .env.example .env
# Editar .env con tus claves
```

**Frontend:**

```powershell
cd frontend
copy .env.example .env
# Editar .env con tus claves
```

### 3. Iniciar en Modo Desarrollo

Abre **dos terminales PowerShell**:

**Terminal 1 (Backend):**

```powershell
cd backend
npm run dev
```

**Terminal 2 (Frontend):**

```powershell
cd frontend
npm run dev
```

### 4. Abrir en el Navegador

Abre tu navegador en: **http://localhost:5173**

---

## 🔑 Configuración Mínima

Para pruebas rápidas, solo necesitas configurar estas variables:

### Backend `.env`

```env
PORT=3000

# Stripe (claves de prueba)
STRIPE_SECRET_KEY=sk_test_51XXXXXX

# PayPal (claves sandbox)
PAYPAL_CLIENT_ID=XXXXXX
PAYPAL_CLIENT_SECRET=XXXXXX
PAYPAL_MODE=sandbox

# Google Sheets (temporal - configurar después)
GOOGLE_APPLICATION_CREDENTIALS=./credentials/google-credentials.json
GOOGLE_SHEET_ID=tu-sheet-id
GOOGLE_SHEET_RANGE=Socios!A:N
```

### Frontend `.env`

```env
VITE_STRIPE_PUBLIC_KEY=pk_test_51XXXXXX
VITE_PAYPAL_CLIENT_ID=XXXXXX
```

---

## 🧪 Probar sin Google Sheets

Si aún no has configurado Google Sheets, puedes comentar temporalmente esas líneas:

**En `backend/routes/sheets.js`:**

```javascript
// Comentar temporalmente la función save-socio para probar los pagos
router.post('/save-socio', async (req, res) => {
    console.log('Datos recibidos:', req.body)
    res.json({ success: true, message: 'Prueba sin Google Sheets' })
})
```

---

## 📋 Orden de Configuración Recomendado

1. **Día 1:** Configurar Stripe (15 min)

    - Crear cuenta en Stripe
    - Obtener claves de prueba
    - Probar pagos con tarjeta

2. **Día 1:** Configurar PayPal (15 min)

    - Crear cuenta de desarrollador
    - Obtener credenciales sandbox
    - Probar pagos con PayPal

3. **Día 2:** Configurar Google Sheets (30 min)

    - Crear proyecto en Google Cloud
    - Configurar cuenta de servicio
    - Crear hoja de cálculo
    - Probar guardado de datos

4. **Día 3:** Personalización (tiempo variable)
    - Cambiar textos
    - Ajustar estilos
    - Configurar montos

---

## 🎯 Verificación Rápida

### Backend funcionando ✅

```powershell
curl http://localhost:3000/api/health
```

Deberías ver:

```json
{ "status": "OK", "message": "Servidor funcionando correctamente" }
```

### Frontend funcionando ✅

Abre: http://localhost:5173

Deberías ver la página de inscripción con el formulario.

---

## 🐛 Problemas Comunes

### "Puerto ya en uso"

Si el puerto 3000 está ocupado:

```powershell
# En backend/.env
PORT=3001
```

### "Module not found"

Ejecuta de nuevo:

```powershell
npm install
```

### "Cannot find module"

Verifica que estés usando Node.js 18 o superior:

```powershell
node --version
```

---

## 📚 Siguiente Paso

Una vez que todo funcione:

1. Lee **PAYMENT_SETUP.md** para configurar los pagos
2. Lee **GOOGLE_SHEETS_SETUP.md** para configurar el almacenamiento
3. Lee **README.md** para información completa

---

## 🆘 Ayuda

Si tienes problemas:

1. Verifica que Node.js esté instalado (v18+)
2. Verifica que npm esté actualizado
3. Lee los logs de error en las terminales
4. Consulta las guías detalladas

¡Buena suerte! 🚀
