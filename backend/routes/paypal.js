import express from 'express'
import pkg from '@paypal/paypal-server-sdk'
const { client, orders } = pkg

const router = express.Router()

/**
 * Configura el cliente de PayPal
 * @returns {Object} Cliente de PayPal configurado
 */
function getPayPalClient() {
    const environment = process.env.PAYPAL_MODE === 'production' ? 'production' : 'sandbox'

    return client({
        clientCredentialsAuthCredentials: {
            oAuthClientId: process.env.PAYPAL_CLIENT_ID,
            oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET,
        },
        environment,
        logging: {
            logLevel: 'info',
            logRequest: { logBody: true },
            logResponse: { logHeaders: true },
        },
    })
}

/**
 * Crea una orden de PayPal
 * @route POST /api/create-paypal-order
 * @param {number} amount - Cantidad a cobrar
 * @param {string} currency - Moneda (EUR, USD, etc.)
 * @param {Object} socioData - Datos del socio
 * @returns {Object} Order ID de PayPal
 */
router.post('/create-paypal-order', async (req, res) => {
    try {
        const { amount, currency, socioData } = req.body

        if (!amount || !currency) {
            return res.status(400).json({ error: 'Faltan parámetros requeridos' })
        }

        const paypalClient = getPayPalClient()

        const request = {
            body: {
                intent: 'CAPTURE',
                purchaseUnits: [
                    {
                        amount: {
                            currencyCode: currency,
                            value: amount.toFixed(2),
                        },
                        description: `Inscripción de socio - ${socioData.nombreCompleto}`,
                        customId: socioData.email,
                    },
                ],
                applicationContext: {
                    brandName: 'Asociación',
                    landingPage: 'NO_PREFERENCE',
                    userAction: 'PAY_NOW',
                },
            },
        }

        const order = await orders.ordersCreate(request, { client: paypalClient })

        console.log('Orden de PayPal creada:', order.result.id)

        res.json({
            orderID: order.result.id,
        })
    } catch (error) {
        console.error('Error al crear orden de PayPal:', error)
        res.status(500).json({
            error: 'Error al crear la orden de PayPal',
            message: error.message,
        })
    }
})

/**
 * Captura el pago de una orden de PayPal
 * @route POST /api/capture-paypal-order
 * @param {string} orderID - ID de la orden de PayPal
 * @returns {Object} Detalles de la captura
 */
router.post('/capture-paypal-order', async (req, res) => {
    try {
        const { orderID } = req.body

        if (!orderID) {
            return res.status(400).json({ error: 'Order ID requerido' })
        }

        const paypalClient = getPayPalClient()

        const request = {
            id: orderID,
            body: {},
        }

        const capture = await orders.ordersCapture(request, { client: paypalClient })

        console.log('Pago capturado:', capture.result.id)

        res.json({
            orderID: capture.result.id,
            status: capture.result.status,
            captureID: capture.result.purchaseUnits[0].payments.captures[0].id,
        })
    } catch (error) {
        console.error('Error al capturar pago de PayPal:', error)
        res.status(500).json({
            error: 'Error al capturar el pago',
            message: error.message,
        })
    }
})

/**
 * Verifica el estado de una orden de PayPal
 * @route GET /api/verify-paypal-payment/:orderID
 * @param {string} orderID - ID de la orden
 * @returns {Object} Estado del pago
 */
router.get('/verify-paypal-payment/:orderID', async (req, res) => {
    try {
        const { orderID } = req.params

        const paypalClient = getPayPalClient()

        const request = {
            id: orderID,
        }

        const order = await orders.ordersGet(request, { client: paypalClient })

        res.json({
            status: order.result.status,
            paid: order.result.status === 'COMPLETED',
        })
    } catch (error) {
        console.error('Error al verificar pago de PayPal:', error)
        res.status(500).json({
            error: 'Error al verificar el pago',
            message: error.message,
        })
    }
})

export default router
