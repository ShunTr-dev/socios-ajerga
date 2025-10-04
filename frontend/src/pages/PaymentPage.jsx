import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { Card, Spinner } from 'flowbite-react'
import StripePayment from '../components/StripePayment'
import PayPalPayment from '../components/PayPalPayment'
import Header from '../components/Header'
import Footer from '../components/Footer'

// Configurar Stripe (reemplazar con tu clave pública)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_YOUR_KEY')

// Configurar PayPal (reemplazar con tu client ID)
const paypalOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || 'YOUR_PAYPAL_CLIENT_ID',
    currency: 'EUR',
}

/**
 * Página de procesamiento de pago
 * Muestra el componente de pago según el método seleccionado
 * @returns {JSX.Element} Página de pago
 */
function PaymentPage() {
    const navigate = useNavigate()
    const [socioData, setSocioData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Recuperar datos del localStorage
        const data = localStorage.getItem('socioData')

        if (!data) {
            // Si no hay datos, redirigir al inicio
            navigate('/')
            return
        }

        try {
            const parsedData = JSON.parse(data)
            setSocioData(parsedData)
            setLoading(false)
        } catch (error) {
            console.error('Error al parsear datos:', error)
            navigate('/')
        }
    }, [navigate])

    if (loading) {
        return (
            <>
                <Header />
                <div className="min-h-screen flex items-center justify-center">
                    <Spinner size="xl" />
                </div>
            </>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Header />
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Completar Pago</h1>
                        <p className="text-gray-600">
                            Método de pago seleccionado:{' '}
                            <span className="font-semibold">
                                {socioData?.metodoPago === 'stripe' ? 'Tarjeta de Crédito/Débito' : 'PayPal'}
                            </span>
                        </p>
                    </div>

                    {/* Resumen de datos */}
                    <Card className="mb-6">
                        <h3 className="text-lg font-semibold mb-4">Resumen de Inscripción</h3>
                        <div className="space-y-2 text-sm">
                            <p>
                                <span className="font-medium">Nombre:</span> {socioData?.nombreCompleto}
                            </p>
                            <p>
                                <span className="font-medium">Email:</span> {socioData?.email}
                            </p>
                            <p>
                                <span className="font-medium">Documento:</span> {socioData?.documento}
                            </p>
                            <p>
                                <span className="font-medium">Dirección:</span> {socioData?.direccion}
                            </p>
                            <p>
                                <span className="font-medium">Localidad:</span> {socioData?.localidad},{' '}
                                {socioData?.provincia} - {socioData?.codigoPostal}
                            </p>
                            <p>
                                <span className="font-medium">Teléfono:</span> {socioData?.telefono}
                            </p>
                        </div>
                    </Card>

                    {/* Componente de pago según método */}
                    <Card>
                        {socioData?.metodoPago === 'stripe' ? (
                            <Elements stripe={stripePromise}>
                                <StripePayment socioData={socioData} />
                            </Elements>
                        ) : (
                            <PayPalScriptProvider options={paypalOptions}>
                                <PayPalPayment socioData={socioData} />
                            </PayPalScriptProvider>
                        )}
                    </Card>

                    {/* Botón para volver */}
                    <div className="text-center mt-6">
                        <button
                            onClick={() => navigate('/')}
                            className="text-indigo-600 hover:text-indigo-800 font-medium">
                            ← Volver al formulario
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PaymentPage
