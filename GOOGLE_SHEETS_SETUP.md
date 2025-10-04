# Guía de Configuración de Google Sheets

Esta guía te ayudará a configurar Google Sheets para almacenar los datos de los socios.

## 1. Crear el Proyecto en Google Cloud

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Haz clic en "Crear proyecto"
3. Nombra el proyecto (ej: "Socios Asociación")
4. Haz clic en "Crear"

## 2. Habilitar Google Sheets API

1. En el menú lateral, ve a "APIs y servicios" → "Biblioteca"
2. Busca "Google Sheets API"
3. Haz clic en "Habilitar"

## 3. Crear Cuenta de Servicio

1. Ve a "APIs y servicios" → "Credenciales"
2. Haz clic en "Crear credenciales" → "Cuenta de servicio"
3. Completa la información:
    - Nombre: "Socios Backend"
    - ID: (se genera automáticamente)
4. Haz clic en "Crear y continuar"
5. Rol: "Editor" (o "Básico" → "Editor")
6. Haz clic en "Continuar" y luego en "Listo"

## 4. Crear Clave JSON

1. En la lista de cuentas de servicio, haz clic en la que acabas de crear
2. Ve a la pestaña "Claves"
3. Haz clic en "Agregar clave" → "Crear clave nueva"
4. Selecciona "JSON"
5. Haz clic en "Crear"
6. Se descargará un archivo JSON

## 5. Guardar las Credenciales

1. Crea una carpeta `credentials` en el directorio `backend`:

    ```bash
    mkdir backend/credentials
    ```

2. Mueve el archivo JSON descargado a esa carpeta y renómbralo:

    ```bash
    mv ~/Descargas/nombre-del-archivo.json backend/credentials/google-credentials.json
    ```

3. El archivo debe tener este formato:
    ```json
    {
      "type": "service_account",
      "project_id": "tu-proyecto",
      "private_key_id": "...",
      "private_key": "-----BEGIN PRIVATE KEY-----\n...",
      "client_email": "cuenta@proyecto.iam.gserviceaccount.com",
      "client_id": "...",
      ...
    }
    ```

## 6. Crear la Hoja de Cálculo

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nómbrala (ej: "Base de Datos - Socios")
4. En la primera hoja, renómbrala a "Socios"

## 7. Configurar las Columnas

En la primera fila de la hoja "Socios", agrega estos encabezados:

| A                 | B     | C               | D         | E         | F         | G         | H             | I        | J           | K          | L      | M          | N     |
| ----------------- | ----- | --------------- | --------- | --------- | --------- | --------- | ------------- | -------- | ----------- | ---------- | ------ | ---------- | ----- |
| Fecha Inscripción | Email | Nombre Completo | Documento | Dirección | Localidad | Provincia | Código Postal | Teléfono | Método Pago | Payment ID | Estado | Fecha Pago | Monto |

### Formato recomendado:

-   **Fila 1:** Negrita, fondo de color (ej: azul claro)
-   **Columna A:** Formato de fecha y hora
-   **Columna M:** Formato de fecha y hora
-   **Columna N:** Formato de moneda (€)

## 8. Compartir la Hoja

1. Copia el email de la cuenta de servicio del archivo JSON:

    - Busca el campo `client_email`
    - Ejemplo: `cuenta@proyecto.iam.gserviceaccount.com`

2. En Google Sheets, haz clic en "Compartir"
3. Pega el email de la cuenta de servicio
4. Asegúrate de que tenga permisos de "Editor"
5. Haz clic en "Enviar"

## 9. Obtener el ID de la Hoja

1. En la URL de tu hoja, copia el ID:

    ```
    https://docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit
    ```

2. Ejemplo:

    ```
    https://docs.google.com/spreadsheets/d/1abc123XYZ456DEF789/edit
    ```

    El ID es: `1abc123XYZ456DEF789`

## 10. Configurar el Backend

1. Abre el archivo `backend/.env`
2. Agrega o actualiza estas líneas:
    ```env
    GOOGLE_APPLICATION_CREDENTIALS=./credentials/google-credentials.json
    GOOGLE_SHEET_ID=1abc123XYZ456DEF789
    GOOGLE_SHEET_RANGE=Socios!A:N
    ```

## 11. Verificar la Configuración

1. Inicia el backend:

    ```bash
    cd backend
    npm run dev
    ```

2. Prueba el endpoint de health:

    ```bash
    curl http://localhost:3000/api/health
    ```

3. Si todo funciona, intenta registrar un socio de prueba desde el frontend.

## Solución de Problemas

### Error: "The caller does not have permission"

-   Verifica que la hoja esté compartida con el email de la cuenta de servicio
-   Verifica que el email sea exactamente el del campo `client_email` del JSON

### Error: "Unable to parse range"

-   Verifica que el nombre de la hoja sea exactamente "Socios"
-   Verifica que el rango sea correcto: "Socios!A:N"

### Error: "Cannot read credentials"

-   Verifica que el archivo JSON esté en la ruta correcta
-   Verifica que el nombre del archivo sea exactamente `google-credentials.json`
-   Verifica que la ruta en el `.env` sea correcta

### Error: "Requested entity was not found"

-   Verifica que el GOOGLE_SHEET_ID sea correcto
-   Verifica que copies el ID completo de la URL

## Ejemplo de Datos

Así es como se verán los datos en la hoja:

| Fecha Inscripción    | Email           | Nombre Completo   | ... | Estado | Fecha Pago           | Monto |
| -------------------- | --------------- | ----------------- | --- | ------ | -------------------- | ----- |
| 2025-10-04T10:30:00Z | juan@email.com  | Juan Pérez García | ... | Pagado | 2025-10-04T10:32:15Z | 50.00 |
| 2025-10-04T11:15:00Z | maria@email.com | María López Ruiz  | ... | Pagado | 2025-10-04T11:16:45Z | 50.00 |

## Seguridad

⚠️ **IMPORTANTE:**

1. **NUNCA** subas el archivo `google-credentials.json` a Git
2. Asegúrate de que esté en `.gitignore`
3. No compartas las credenciales públicamente
4. Si las credenciales se comprometen, revócalas inmediatamente desde Google Cloud Console

## Backup

Recomendaciones para backup:

1. Configura copias de seguridad automáticas en Google Drive
2. Exporta periódicamente la hoja como Excel/CSV
3. Considera migrar a una base de datos cuando tengas muchos registros

## Límites de Google Sheets

-   **Celdas:** 10 millones por hoja
-   **Columnas:** 18,278 por hoja
-   **Filas:** No hay límite específico (limitado por el número de celdas)
-   **Tamaño de archivo:** Hasta 100 MB por hoja

Para la mayoría de asociaciones, estos límites son más que suficientes.
