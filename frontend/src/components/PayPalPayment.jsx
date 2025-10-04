import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { Alert, Spinner } from 'flowbite-react'
import axios from 'axios'

/**
 * Componente de pago con PayPal
 * Procesa el pago mediante PayPal
 * @param {Object} props - Props del componente
 * @param {Object} props.socioData - Datos del socio
 * @returns {JSX.Element} Componente de pago PayPal
 */
function PayPalPayment({ socioData }) {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    /**
     * Crea la orden de PayPal
     * @returns {Promise<string>} ID de la orden
     */
    const createOrder = async () => {
        try {
            const { data } = await axios.post('/api/create-paypal-order', {
                amount: 50.0,
                currency: 'EUR',
                socioData,
            })
            return data.orderID
        } catch (error) {
            console.error('Error al crear orden:', error)
            setError('Error al crear la orden de pago')
            throw error
        }
    }

    /**
     * Aprueba el pago de PayPal
     * @param {Object} data - Datos de la transacción
     */
    const onApprove = async (data) => {
        setLoading(true)
        try {
            // 1. Capturar el pago
            const response = await axios.post('/api/capture-paypal-order', {
                orderID: data.orderID,
            })

            // 2. Guardar en Google Sheets
            await axios.post('/api/save-socio', {
                ...socioData,
                paymentId: data.orderID,
                metodoPago: 'paypal',
                estado: 'Pagado',
                fechaPago: new Date().toISOString(),
                monto: 50.0,
            })

            // 3. Redirigir a página de éxito
            navigate('/exito')
        } catch (error) {
            console.error('Error al aprobar pago:', error)
            setError('Error al procesar el pago')
            setLoading(false)

            // Redirigir a página de error
            setTimeout(() => {
                navigate('/error')
            }, 3000)
        }
    }

    /**
     * Maneja errores de PayPal
     * @param {Error} err - Error de PayPal
     */
    const onError = (err) => {
        console.error('Error de PayPal:', err)
        setError('Ocurrió un error al procesar el pago con PayPal')

        setTimeout(() => {
            navigate('/error')
        }, 3000)
    }

    /**
     * Maneja la cancelación del pago
     */
    const onCancel = () => {
        setError('Pago cancelado. Puedes intentarlo nuevamente.')
    }

    if (loading) {
        return (
            <div className="text-center py-8">
                <Spinner size="xl" />
                <p className="mt-4 text-gray-600">Procesando pago...</p>
            </div>
        )
    }

    const precioCuota = import.meta.env.PRECIO_CUOTA || 8 // Precio de la cuota anual

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">Pagar con PayPal</h3>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">Importe a pagar:</span> {precioCuota} €
                    </p>
                </div>

                {error && (
                    <Alert color="failure" className="mb-4">
                        {error}
                    </Alert>
                )}

                <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                    onCancel={onCancel}
                    style={{
                        layout: 'vertical',
                        color: 'blue',
                        shape: 'rect',
                        label: 'pay',
                    }}
                    forceReRender={[50.0]}
                />
            </div>

            <p className="text-xs text-gray-500 text-center">
                Pago seguro procesado por PayPal. Tus datos están protegidos.
            </p>
        </div>
    )
}

export default PayPalPayment
