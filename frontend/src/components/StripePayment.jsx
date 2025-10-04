import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import { Button, Spinner, Alert } from 'flowbite-react'
import axios from 'axios'

// Estilos para los elementos de Stripe
const ELEMENT_OPTIONS = {
    style: {
        base: {
            color: '#1f2937',
            fontFamily: '"Inter", "Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#9ca3af',
            },
        },
        invalid: {
            color: '#ef4444',
            iconColor: '#ef4444',
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
    const [postalCode, setPostalCode] = useState('')

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
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: socioData.nombreCompleto,
                        email: socioData.email,
                        address: {
                            postal_code: socioData.codigoPostal,
                        },
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

    const precioCuota = import.meta.env.PRECIO_CUOTA || 8 // Precio de la cuota anual
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Número de tarjeta */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <div className="flex items-center">
                        <svg
                            className="w-5 h-5 mr-2 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                        </svg>
                        Número de Tarjeta
                    </div>
                </label>
                <div className="relative">
                    <div className="p-4 border-2 border-gray-200 rounded-lg focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200 bg-white hover:border-gray-300">
                        <CardNumberElement options={ELEMENT_OPTIONS} />
                    </div>
                </div>
            </div>

            {/* Fecha de expiración y CVC */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <div className="flex items-center">
                            <svg
                                className="w-5 h-5 mr-2 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            Fecha de Expiración
                        </div>
                    </label>
                    <div className="p-4 border-2 border-gray-200 rounded-lg focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200 bg-white hover:border-gray-300">
                        <CardExpiryElement options={ELEMENT_OPTIONS} />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <div className="flex items-center">
                            <svg
                                className="w-5 h-5 mr-2 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                            CVC
                        </div>
                    </label>
                    <div className="p-4 border-2 border-gray-200 rounded-lg focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200 bg-white hover:border-gray-300">
                        <CardCvcElement options={ELEMENT_OPTIONS} />
                    </div>
                </div>
            </div>

            {/* Información de seguridad */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-100 rounded-xl p-5">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Importe Total</p>
                        <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            {precioCuota} €
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md">
                            <svg
                                className="w-6 h-6 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <Alert color="failure" className="border-2 border-red-200">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                            />
                        </svg>
                        {error}
                    </div>
                </Alert>
            )}

            <Button
                type="submit"
                disabled={!stripe || loading}
                size="xl"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]">
                {loading ? (
                    <div className="flex items-center justify-center">
                        <Spinner size="md" className="mr-3" />
                        <span className="text-lg">Procesando Pago...</span>
                    </div>
                ) : (
                    <div className="flex items-center justify-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                        <span className="text-lg">Pagar 50,00 € de forma segura</span>
                    </div>
                )}
            </Button>

            {/* Badges de seguridad */}
            <div className="flex items-center justify-center space-x-6 pt-4">
                <div className="flex items-center text-gray-500 text-xs">
                    <svg
                        className="w-5 h-5 mr-1.5 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                    </svg>
                    <span className="font-medium">Pago seguro con Stripe</span>
                </div>
                <div className="flex items-center text-gray-500 text-xs">
                    <svg className="w-5 h-5 mr-1.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>
                    <span className="font-medium">Datos encriptados</span>
                </div>
            </div>
        </form>
    )
}

export default StripePayment
