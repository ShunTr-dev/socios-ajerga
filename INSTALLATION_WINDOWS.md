# Instalación de Prerequisitos en Windows

Esta guía te ayudará a instalar todo lo necesario para ejecutar el proyecto en Windows.

## 📋 Requisitos del Sistema

-   Windows 10 o superior
-   Conexión a Internet
-   Al menos 2 GB de espacio libre en disco

## 📦 Instalación de Node.js y npm

### Opción 1: Instalador Oficial (Recomendado)

1. **Descargar Node.js:**

    - Ve a [nodejs.org](https://nodejs.org/)
    - Descarga la versión **LTS** (Long Term Support)
    - Recomendado: Versión 20.x o superior

2. **Ejecutar el Instalador:**

    - Abre el archivo descargado (`.msi`)
    - Haz clic en "Next"
    - Acepta los términos de licencia
    - Deja la ruta de instalación por defecto
    - **IMPORTANTE:** Asegúrate de marcar la opción:
      ✅ "Automatically install the necessary tools..."
    - Haz clic en "Install"
    - Espera a que termine la instalación

3. **Verificar la Instalación:**

    Abre PowerShell y ejecuta:

    ```powershell
    node --version
    npm --version
    ```

    Deberías ver algo como:

    ```
    v20.11.0
    10.2.4
    ```

### Opción 2: Usando Chocolatey

Si tienes Chocolatey instalado:

```powershell
# Ejecutar como Administrador
choco install nodejs-lts
```

### Opción 3: Usando winget

```powershell
winget install OpenJS.NodeJS.LTS
```

## 🔧 Configuración de Git

### Instalar Git

1. **Descargar Git:**

    - Ve a [git-scm.com](https://git-scm.com/download/win)
    - Descarga el instalador

2. **Ejecutar el Instalador:**

    - Ejecuta el archivo descargado
    - Usa las opciones por defecto
    - Recomendado: "Git from the command line and also from 3rd-party software"

3. **Verificar Instalación:**
    ```powershell
    git --version
    ```

## 🚀 Clonar y Configurar el Proyecto

### 1. Clonar el Repositorio

```powershell
# Navega a tu carpeta de proyectos
cd C:\Users\TuUsuario\Documents

# Clona el repositorio
git clone <URL_DEL_REPOSITORIO>

# Entra al directorio
cd socios-ajerga-1
```

### 2. Instalar Dependencias del Backend

```powershell
cd backend
npm install
```

Esto puede tomar varios minutos la primera vez.

### 3. Instalar Dependencias del Frontend

```powershell
cd ..\frontend
npm install
```

### 4. Configurar Variables de Entorno

**Backend:**

```powershell
cd ..\backend
copy .env.example .env
notepad .env
```

Edita el archivo con tus claves.

**Frontend:**

```powershell
cd ..\frontend
copy .env.example .env
notepad .env
```

Edita el archivo con tus claves.

## 🎯 Verificar que Todo Funciona

### 1. Probar el Backend

En una terminal PowerShell:

```powershell
cd backend
npm run dev
```

Deberías ver:

```
🚀 Servidor corriendo en http://localhost:3000
📊 Health check: http://localhost:3000/api/health
```

### 2. Probar el Frontend

En **OTRA** terminal PowerShell:

```powershell
cd frontend
npm run dev
```

Deberías ver:

```
  VITE v6.0.5  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 3. Abrir en el Navegador

Abre tu navegador en: **http://localhost:5173**

Si ves el formulario de inscripción, ¡todo funciona correctamente! ✅

## ❌ Solución de Problemas

### Error: "npm no se reconoce como comando"

**Solución:**

1. Cierra todas las ventanas de PowerShell
2. Abre una nueva ventana de PowerShell
3. Intenta de nuevo

Si persiste:

1. Busca "Variables de entorno" en Windows
2. Edita "Path" en Variables del sistema
3. Agrega: `C:\Program Files\nodejs\`
4. Reinicia PowerShell

### Error: "node no se reconoce como comando"

**Solución:**
Igual que el error anterior de npm.

### Error: "Permission denied" o "EACCES"

**Solución:**

1. Ejecuta PowerShell como Administrador
2. O cambia los permisos de npm:
    ```powershell
    npm config set prefix "C:\Users\TuUsuario\AppData\Roaming\npm"
    ```

### Error: "Port 3000 is already in use"

**Solución:**
Cambia el puerto en `backend/.env`:

```env
PORT=3001
```

### Error: "Cannot find module"

**Solución:**

```powershell
# Elimina node_modules y reinstala
Remove-Item -Recurse -Force node_modules
npm install
```

### Error: "gyp ERR!"

Este error suele aparecer al instalar dependencias que requieren compilación.

**Solución:**

1. Instala las herramientas de compilación de Windows:

    ```powershell
    npm install --global windows-build-tools
    ```

2. O instala Visual Studio Build Tools manualmente desde:
   [visualstudio.microsoft.com](https://visualstudio.microsoft.com/downloads/)

## 📝 Comandos Útiles de PowerShell

```powershell
# Ver versión de Node.js
node --version

# Ver versión de npm
npm --version

# Actualizar npm
npm install -g npm@latest

# Limpiar caché de npm
npm cache clean --force

# Ver carpeta actual
pwd

# Listar archivos
ls

# Cambiar de directorio
cd ruta\al\directorio

# Volver al directorio anterior
cd ..

# Limpiar pantalla
cls
```

## 🔄 Actualizar Node.js

Si necesitas actualizar Node.js a una versión más reciente:

1. Desinstala la versión actual desde Panel de Control
2. Descarga la nueva versión desde nodejs.org
3. Instala la nueva versión
4. Verifica la instalación

## 🌐 Editores de Código Recomendados

### Visual Studio Code (Recomendado)

1. Descarga desde: [code.visualstudio.com](https://code.visualstudio.com/)
2. Instala las extensiones recomendadas:
    - ES7+ React/Redux/React-Native snippets
    - Tailwind CSS IntelliSense
    - ESLint
    - Prettier
    - GitLens

## 🎨 Terminal Mejorada (Opcional)

### Windows Terminal

Para una mejor experiencia de terminal:

1. Instala Windows Terminal desde Microsoft Store
2. O usa: `winget install Microsoft.WindowsTerminal`

### Oh My Posh (Opcional)

Para una terminal más bonita:

```powershell
winget install JanDeDobbeleer.OhMyPosh
```

## 📚 Recursos Adicionales

-   [Node.js Docs](https://nodejs.org/docs/)
-   [npm Docs](https://docs.npmjs.com/)
-   [PowerShell Docs](https://docs.microsoft.com/powershell/)
-   [Windows Terminal Docs](https://docs.microsoft.com/windows/terminal/)

## 💡 Consejos

1. **Usa rutas sin espacios:** Evita tener el proyecto en rutas con espacios
2. **Actualiza regularmente:** Mantén Node.js y npm actualizados
3. **Usa terminal como administrador:** Para evitar problemas de permisos
4. **Cierra y abre terminal:** Después de instalar Node.js
5. **Antivirus:** Algunos antivirus pueden ralentizar npm install

## ✅ Checklist de Instalación

Marca cada paso cuando lo completes:

-   [ ] Node.js instalado y verificado
-   [ ] npm instalado y verificado
-   [ ] Git instalado y verificado
-   [ ] Proyecto clonado
-   [ ] Dependencias del backend instaladas
-   [ ] Dependencias del frontend instaladas
-   [ ] Archivos .env configurados
-   [ ] Backend inicia correctamente
-   [ ] Frontend inicia correctamente
-   [ ] Página web se ve en el navegador

¡Una vez completes todos los pasos, estarás listo para empezar a trabajar! 🎉
