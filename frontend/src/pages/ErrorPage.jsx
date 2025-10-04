import { Link } from 'react-router-dom'
import { Card, Button } from 'flowbite-react'
import { FaTimesCircle } from 'react-icons/fa'
import Header from '../components/Header'
import Footer from '../components/Footer'

/**
 * Página de error de pago
 * Muestra mensaje de error cuando el pago falla
 * @returns {JSX.Element} Página de error
 */
function ErrorPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100">
            <Header />
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    <Card>
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <FaTimesCircle className="text-8xl text-red-500" />
                            </div>

                            <h1 className="text-3xl font-bold text-gray-900 mb-4">Error en el Pago</h1>

                            <p className="text-lg text-gray-600 mb-6">
                                Hubo un problema al procesar tu pago. Por favor, inténtalo de nuevo.
                            </p>

                            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                                <h2 className="font-semibold text-gray-900 mb-2">Posibles causas:</h2>
                                <ul className="text-left text-gray-700 space-y-2">
                                    <li>• Fondos insuficientes</li>
                                    <li>• Datos de tarjeta incorrectos</li>
                                    <li>• Problema de conexión</li>
                                    <li>• Pago rechazado por el banco</li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <p className="text-sm text-gray-500">Si el problema persiste, contacta con soporte</p>

                                <div className="flex flex-col md:flex-row gap-4 justify-center">
                                    <Link to="/pago">
                                        <Button color="failure" size="lg" className="w-full md:w-auto">
                                            Reintentar Pago
                                        </Button>
                                    </Link>
                                    <Link to="/">
                                        <Button color="gray" size="lg" className="w-full md:w-auto">
                                            Volver al Inicio
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ErrorPage
