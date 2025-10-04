import express from 'express'
import Stripe from 'stripe'

const router = express.Router()

/**
 * Obtiene la instancia de Stripe configurada
 * @returns {Stripe} Instancia de Stripe
 */
function getStripeClient() {
    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error('STRIPE_SECRET_KEY no está configurado en las variables de entorno')
    }
    return new Stripe(process.env.STRIPE_SECRET_KEY)
}

/**
 * Crea un Payment Intent de Stripe
 * @route POST /api/create-payment-intent
 * @param {number} amount - Cantidad en centavos
 * @param {string} currency - Moneda (eur, usd, etc.)
 * @param {Object} socioData - Datos del socio
 * @returns {Object} Client secret para confirmar el pago
 */
router.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency, socioData } = req.body

        if (!amount || !currency) {
            return res.status(400).json({ error: 'Faltan parámetros requeridos' })
        }

        const stripe = getStripeClient()

        // Crear el payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            metadata: {
                email: socioData.email,
                nombre: socioData.nombreCompleto,
                documento: socioData.documento,
            },
            description: `Inscripción de socio - ${socioData.nombreCompleto}`,
        })

        console.log('Payment Intent creado:', paymentIntent.id)

        res.json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
        })
    } catch (error) {
        console.error('Error al crear payment intent:', error)
        res.status(500).json({
            error: 'Error al crear el payment intent',
            message: error.message,
        })
    }
})

/**
 * Verifica el estado de un pago de Stripe
 * @route GET /api/verify-stripe-payment/:paymentId
 * @param {string} paymentId - ID del payment intent
 * @returns {Object} Estado del pago
 */
router.get('/verify-stripe-payment/:paymentId', async (req, res) => {
    try {
        const { paymentId } = req.params

        const stripe = getStripeClient()
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentId)

        res.json({
            status: paymentIntent.status,
            amount: paymentIntent.amount,
            currency: paymentIntent.currency,
            paid: paymentIntent.status === 'succeeded',
        })
    } catch (error) {
        console.error('Error al verificar pago:', error)
        res.status(500).json({
            error: 'Error al verificar el pago',
            message: error.message,
        })
    }
})

export default router
