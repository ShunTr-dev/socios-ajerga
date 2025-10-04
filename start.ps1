# Script de inicio para el proyecto Socios
# Este script facilita el inicio del frontend y backend simultáneamente

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  Sistema de Inscripción de Socios  " -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Verificar que Node.js está instalado
Write-Host "Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js $nodeVersion encontrado" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js no está instalado" -ForegroundColor Red
    Write-Host "Por favor, instala Node.js desde https://nodejs.org" -ForegroundColor Red
    pause
    exit
}

Write-Host ""

# Verificar que las carpetas existen
if (-not (Test-Path "backend")) {
    Write-Host "✗ Carpeta 'backend' no encontrada" -ForegroundColor Red
    exit
}

if (-not (Test-Path "frontend")) {
    Write-Host "✗ Carpeta 'frontend' no encontrada" -ForegroundColor Red
    exit
}

Write-Host "✓ Estructura del proyecto correcta" -ForegroundColor Green
Write-Host ""

# Verificar si node_modules existe en backend
if (-not (Test-Path "backend\node_modules")) {
    Write-Host "Instalando dependencias del backend..." -ForegroundColor Yellow
    Set-Location backend
    npm install
    Set-Location ..
    Write-Host "✓ Dependencias del backend instaladas" -ForegroundColor Green
}

# Verificar si node_modules existe en frontend
if (-not (Test-Path "frontend\node_modules")) {
    Write-Host "Instalando dependencias del frontend..." -ForegroundColor Yellow
    Set-Location frontend
    npm install
    Set-Location ..
    Write-Host "✓ Dependencias del frontend instaladas" -ForegroundColor Green
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  Iniciando servidores...            " -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Backend:  http://localhost:3000" -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Green
Write-Host ""
Write-Host "Presiona Ctrl+C en cada ventana para detener los servidores" -ForegroundColor Yellow
Write-Host ""

# Iniciar backend en una nueva ventana
Write-Host "Iniciando backend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; Write-Host 'BACKEND - Puerto 3000' -ForegroundColor Green; npm run dev"

# Esperar un poco antes de iniciar el frontend
Start-Sleep -Seconds 3

# Iniciar frontend en una nueva ventana
Write-Host "Iniciando frontend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\frontend'; Write-Host 'FRONTEND - Puerto 5173' -ForegroundColor Green; npm run dev"

Write-Host ""
Write-Host "✓ Servidores iniciados en ventanas separadas" -ForegroundColor Green
Write-Host ""
Write-Host "Para acceder a la aplicación:" -ForegroundColor Cyan
Write-Host "  Abre tu navegador en: http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "Presiona cualquier tecla para cerrar esta ventana..." -ForegroundColor Gray
pause
