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

    const precioCuota = import.meta.env.PRECIO_CUOTA || 8 // Precio de la cuota anual

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <Header />
            <div className="py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    {/* Header moderno */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4 shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                            Completar Pago
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Estás a un paso de completar tu inscripción
                        </p>
                        <div className="mt-4 inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
                            <span className="text-sm text-gray-500 mr-2">Método de pago:</span>
                            <span className="font-semibold text-gray-900 flex items-center">
                                {socioData?.metodoPago === 'stripe' ? (
                                    <>
                                        <svg
                                            className="w-5 h-5 mr-1.5 text-blue-600"
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
                                        Tarjeta de Crédito/Débito
                                    </>
                                ) : (
                                    <>
                                        <svg
                                            className="w-5 h-5 mr-1.5 text-blue-600"
                                            fill="currentColor"
                                            viewBox="0 0 24 24">
                                            <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 00-.794.68l-.04.22-.63 3.993-.028.15a.806.806 0 01-.795.68H7.723a.484.484 0 01-.477-.558L9.326 8.07a.966.966 0 01.952-.814h4.92c.686 0 1.295.044 1.82.133.088.015.174.03.259.047.083.016.165.033.244.051.558.127 1.02.32 1.39.588a2.536 2.536 0 01.156.13z" />
                                        </svg>
                                        PayPal
                                    </>
                                )}
                            </span>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-5 gap-8">
                        {/* Resumen de datos - Sidebar */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-8">
                                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                                    <h3 className="text-lg font-bold text-white flex items-center">
                                        <svg
                                            className="w-5 h-5 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                        Resumen de Inscripción
                                    </h3>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <svg
                                                    className="w-5 h-5 text-blue-600"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                Nombre Completo
                                            </p>
                                            <p className="mt-1 text-sm font-semibold text-gray-900">
                                                {socioData?.nombreCompleto}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                                <svg
                                                    className="w-5 h-5 text-green-600"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                Email
                                            </p>
                                            <p className="mt-1 text-sm font-semibold text-gray-900 break-all">
                                                {socioData?.email}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                                <svg
                                                    className="w-5 h-5 text-purple-600"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                Documento
                                            </p>
                                            <p className="mt-1 text-sm font-semibold text-gray-900">
                                                {socioData?.documento}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                                <svg
                                                    className="w-5 h-5 text-orange-600"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                Dirección
                                            </p>
                                            <p className="mt-1 text-sm font-semibold text-gray-900">
                                                {socioData?.direccion}
                                            </p>
                                            <p className="mt-0.5 text-sm text-gray-600">
                                                {socioData?.localidad}, {socioData?.provincia}
                                            </p>
                                            <p className="text-sm text-gray-600">CP: {socioData?.codigoPostal}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                                                <svg
                                                    className="w-5 h-5 text-pink-600"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                Teléfono
                                            </p>
                                            <p className="mt-1 text-sm font-semibold text-gray-900">
                                                {socioData?.telefono}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-4 mt-4 border-t border-gray-200">
                                        <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                                            <span className="text-sm font-medium text-gray-700">Total a Pagar</span>
                                            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                                {precioCuota} €
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Componente de pago */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                                <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-5 border-b border-gray-200">
                                    <h3 className="text-xl font-bold text-gray-900 flex items-center">
                                        <svg
                                            className="w-6 h-6 mr-2 text-blue-600"
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
                                        Datos de Pago
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Todos los pagos son procesados de forma segura
                                    </p>
                                </div>
                                <div className="p-6">
                                    {socioData?.metodoPago === 'stripe' ? (
                                        <Elements stripe={stripePromise}>
                                            <StripePayment socioData={socioData} />
                                        </Elements>
                                    ) : (
                                        <PayPalScriptProvider options={paypalOptions}>
                                            <PayPalPayment socioData={socioData} />
                                        </PayPalScriptProvider>
                                    )}
                                </div>
                            </div>

                            {/* Botón para volver */}
                            <div className="text-center mt-6">
                                <button
                                    onClick={() => navigate('/')}
                                    className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 group">
                                    <svg
                                        className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                        />
                                    </svg>
                                    Volver al formulario
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PaymentPage
