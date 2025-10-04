import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'flowbite-react'
import { FaCheckCircle } from 'react-icons/fa'
import Header from '../components/Header'
import Footer from '../components/Footer'

/**
 * Página de pago exitoso
 * Muestra confirmación de pago realizado
 * @returns {JSX.Element} Página de éxito
 */
function SuccessPage() {
    useEffect(() => {
        // Limpiar localStorage después de pago exitoso
        localStorage.removeItem('socioData')
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
            <Header />
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    <Card>
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <FaCheckCircle className="text-8xl text-green-500" />
                            </div>

                            <h1 className="text-3xl font-bold text-gray-900 mb-4">¡Pago Realizado con Éxito!</h1>

                            <p className="text-lg text-gray-600 mb-6">
                                Tu inscripción ha sido procesada correctamente.
                            </p>

                            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                                <h2 className="font-semibold text-gray-900 mb-2">¿Qué sigue ahora?</h2>
                                <ul className="text-left text-gray-700 space-y-2">
                                    <li>✓ Recibirás un email de confirmación en breve</li>
                                    <li>✓ Tus datos han sido registrados en nuestro sistema</li>
                                    <li>✓ El estado de tu pago ha sido verificado y aprobado</li>
                                    <li>✓ Tu membresía está ahora activa</li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <p className="text-sm text-gray-500">Gracias por unirte a nuestra asociación</p>

                                <Link to="/">
                                    <Button size="lg" className="w-full md:w-auto">
                                        Volver al Inicio
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SuccessPage
