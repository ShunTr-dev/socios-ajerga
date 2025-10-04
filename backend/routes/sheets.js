import express from 'express'
import { google } from 'googleapis'

const router = express.Router()

/**
 * Obtiene el cliente autenticado de Google Sheets
 * @returns {Promise<Object>} Cliente autenticado
 */
async function getGoogleSheetsClient() {
    const auth = new google.auth.GoogleAuth({
        keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const authClient = await auth.getClient()
    return google.sheets({ version: 'v4', auth: authClient })
}

/**
 * Guarda los datos del socio en Google Sheets
 * @route POST /api/save-socio
 * @param {Object} socioData - Datos completos del socio
 * @returns {Object} Confirmación de guardado
 */
router.post('/save-socio', async (req, res) => {
    try {
        const socioData = req.body

        if (!socioData.email || !socioData.nombreCompleto) {
            return res.status(400).json({ error: 'Faltan datos requeridos' })
        }

        const sheets = await getGoogleSheetsClient()
        const spreadsheetId = process.env.GOOGLE_SHEET_ID

        // Preparar los datos para la fila
        const values = [
            [
                new Date().toISOString(), // Fecha de inscripción
                socioData.email,
                socioData.nombreCompleto,
                socioData.documento,
                socioData.direccion,
                socioData.localidad,
                socioData.provincia,
                socioData.codigoPostal,
                socioData.telefono,
                socioData.metodoPago,
                socioData.paymentId,
                socioData.estado || 'Pendiente',
                socioData.fechaPago || '',
                socioData.monto || 0,
            ],
        ]

        // Agregar la fila a la hoja
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: process.env.GOOGLE_SHEET_RANGE || 'Socios!A:N',
            valueInputOption: 'RAW',
            insertDataOption: 'INSERT_ROWS',
            requestBody: {
                values,
            },
        })

        console.log('Datos guardados en Google Sheets:', response.data.updates)

        res.json({
            success: true,
            message: 'Datos guardados correctamente',
            updates: response.data.updates,
        })
    } catch (error) {
        console.error('Error al guardar en Google Sheets:', error)
        res.status(500).json({
            error: 'Error al guardar los datos',
            message: error.message,
        })
    }
})

/**
 * Actualiza el estado de pago de un socio
 * @route PUT /api/update-payment-status
 * @param {string} email - Email del socio
 * @param {string} estado - Nuevo estado del pago
 * @returns {Object} Confirmación de actualización
 */
router.put('/update-payment-status', async (req, res) => {
    try {
        const { email, estado, paymentId } = req.body

        if (!email || !estado) {
            return res.status(400).json({ error: 'Email y estado requeridos' })
        }

        const sheets = await getGoogleSheetsClient()
        const spreadsheetId = process.env.GOOGLE_SHEET_ID
        const range = process.env.GOOGLE_SHEET_RANGE || 'Socios!A:N'

        // Obtener todos los datos
        const getResponse = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        })

        const rows = getResponse.data.values
        if (!rows || rows.length === 0) {
            return res.status(404).json({ error: 'No se encontraron datos' })
        }

        // Buscar la fila con el email
        let rowIndex = -1
        for (let i = 1; i < rows.length; i++) {
            // Empezar en 1 para saltar la cabecera
            if (rows[i][1] === email) {
                // Columna B (email)
                rowIndex = i + 1 // +1 porque las filas en Sheets empiezan en 1
                break
            }
        }

        if (rowIndex === -1) {
            return res.status(404).json({ error: 'Socio no encontrado' })
        }

        // Actualizar el estado (columna L) y fecha de pago (columna M)
        const updateRange = `Socios!L${rowIndex}:M${rowIndex}`
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: updateRange,
            valueInputOption: 'RAW',
            requestBody: {
                values: [[estado, new Date().toISOString()]],
            },
        })

        console.log(`Estado actualizado para ${email}: ${estado}`)

        res.json({
            success: true,
            message: 'Estado actualizado correctamente',
            email,
            estado,
        })
    } catch (error) {
        console.error('Error al actualizar estado:', error)
        res.status(500).json({
            error: 'Error al actualizar el estado',
            message: error.message,
        })
    }
})

/**
 * Obtiene todos los socios registrados
 * @route GET /api/socios
 * @returns {Array} Lista de socios
 */
router.get('/socios', async (req, res) => {
    try {
        const sheets = await getGoogleSheetsClient()
        const spreadsheetId = process.env.GOOGLE_SHEET_ID
        const range = process.env.GOOGLE_SHEET_RANGE || 'Socios!A:N'

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        })

        const rows = response.data.values
        if (!rows || rows.length === 0) {
            return res.json({ socios: [] })
        }

        // Convertir filas a objetos
        const headers = rows[0]
        const socios = rows.slice(1).map((row) => {
            const socio = {}
            headers.forEach((header, index) => {
                socio[header] = row[index] || ''
            })
            return socio
        })

        res.json({ socios })
    } catch (error) {
        console.error('Error al obtener socios:', error)
        res.status(500).json({
            error: 'Error al obtener los datos',
            message: error.message,
        })
    }
})

export default router
