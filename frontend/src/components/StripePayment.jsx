import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { Button, Spinner, Alert } from 'flowbite-react'
import axios from 'axios'

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
        },
    },
}

/**
 * Componente de pago con Stripe
 * Procesa el pago mediante tarjeta de crédito/débito
 * @param {Object} props - Props del componente
 * @param {Object} props.socioData - Datos del socio
 * @returns {JSX.Element} Componente de pago Stripe
 */
function StripePayment({ socioData }) {
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    /**
     * Maneja el proceso de pago con Stripe
     * @param {Event} e - Evento del formulario
     */
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        setLoading(true)
        setError(null)

        try {
            // 1. Crear payment intent en el backend
            const { data } = await axios.post('/api/create-payment-intent', {
                amount: 5000, // 50.00 EUR (en centavos)
                currency: 'eur',
                socioData,
            })

            // 2. Confirmar el pago
            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: socioData.nombreCompleto,
                        email: socioData.email,
                    },
                },
            })

            if (result.error) {
                setError(result.error.message)
                setLoading(false)
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    // 3. Guardar en Google Sheets
                    await axios.post('/api/save-socio', {
                        ...socioData,
                        paymentId: result.paymentIntent.id,
                        metodoPago: 'stripe',
                        estado: 'Pagado',
                        fechaPago: new Date().toISOString(),
                        monto: 50.0,
                    })

                    // 4. Redirigir a página de éxito
                    navigate('/exito')
                }
            }
        } catch (error) {
            console.error('Error en el pago:', error)
            setError(error.response?.data?.error || 'Error al procesar el pago')
            setLoading(false)

            // Si hay error, redirigir a página de error
            setTimeout(() => {
                navigate('/error')
            }, 3000)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">Datos de la Tarjeta</h3>

                <div className="p-4 border border-gray-300 rounded-lg">
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                    <span className="font-semibold">Importe a pagar:</span> 50,00 €
                </p>
            </div>

            {error && <Alert color="failure">{error}</Alert>}

            <Button type="submit" disabled={!stripe || loading} size="lg" className="w-full">
                {loading ? (
                    <>
                        <Spinner size="sm" className="mr-2" />
                        Procesando Pago...
                    </>
                ) : (
                    'Pagar 50,00 €'
                )}
            </Button>

            <p className="text-xs text-gray-500 text-center">
                Pago seguro procesado por Stripe. Tus datos están protegidos.
            </p>
        </form>
    )
}

export default StripePayment
