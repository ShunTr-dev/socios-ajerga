import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Label, TextInput, Select, Card } from 'flowbite-react'
import { FaUserPlus, FaEnvelope, FaIdCard, FaHome, FaPhone, FaCreditCard } from 'react-icons/fa'

/**
 * Página principal con formulario de inscripción
 * Recopila los datos del socio y los guarda en localStorage
 * @returns {JSX.Element} Página de inicio
 */
function HomePage() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        nombreCompleto: '',
        documento: '',
        direccion: '',
        localidad: '',
        provincia: '',
        codigoPostal: '',
        telefono: '',
        metodoPago: '',
    })

    const [errors, setErrors] = useState({})

    /**
     * Maneja los cambios en los campos del formulario
     * @param {Event} e - Evento del input
     */
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
        // Limpiar error del campo al escribir
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }))
        }
    }

    /**
     * Valida los datos del formulario
     * @returns {boolean} true si el formulario es válido
     */
    const validateForm = () => {
        const newErrors = {}

        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido'
        }
        if (!formData.nombreCompleto || formData.nombreCompleto.length < 3) {
            newErrors.nombreCompleto = 'Nombre completo requerido'
        }
        if (!formData.documento || formData.documento.length < 8) {
            newErrors.documento = 'Documento inválido'
        }
        if (!formData.direccion) {
            newErrors.direccion = 'Dirección requerida'
        }
        if (!formData.localidad) {
            newErrors.localidad = 'Localidad requerida'
        }
        if (!formData.provincia) {
            newErrors.provincia = 'Provincia requerida'
        }
        if (!formData.codigoPostal || !/^\d{5}$/.test(formData.codigoPostal)) {
            newErrors.codigoPostal = 'Código postal inválido (5 dígitos)'
        }
        if (!formData.telefono || !/^\d{9}$/.test(formData.telefono)) {
            newErrors.telefono = 'Teléfono inválido (9 dígitos)'
        }
        if (!formData.metodoPago) {
            newErrors.metodoPago = 'Selecciona un método de pago'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    /**
     * Maneja el envío del formulario
     * @param {Event} e - Evento del formulario
     */
    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {
            // Guardar en localStorage
            localStorage.setItem('socioData', JSON.stringify(formData))
            // Redirigir a la página de pago
            navigate('/pago')
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Encabezado */}
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-4">
                        <FaUserPlus className="text-6xl text-indigo-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Inscripción de Socios</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Bienvenido al portal de inscripción de nuestra asociación. Complete el formulario a continuación
                        para convertirse en socio. Sus datos serán tratados con total confidencialidad y seguridad.
                    </p>
                </div>

                {/* Formulario */}
                <Card>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <Label htmlFor="email" value="Email *" className="mb-2 block" />
                            <TextInput
                                id="email"
                                name="email"
                                type="email"
                                icon={FaEnvelope}
                                placeholder="ejemplo@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                color={errors.email ? 'failure' : 'gray'}
                                helperText={errors.email}
                                required
                            />
                        </div>

                        {/* Nombre y Apellidos */}
                        <div>
                            <Label htmlFor="nombreCompleto" value="Nombre y Apellidos *" className="mb-2 block" />
                            <TextInput
                                id="nombreCompleto"
                                name="nombreCompleto"
                                type="text"
                                icon={FaUserPlus}
                                placeholder="Juan Pérez García"
                                value={formData.nombreCompleto}
                                onChange={handleChange}
                                color={errors.nombreCompleto ? 'failure' : 'gray'}
                                helperText={errors.nombreCompleto}
                                required
                            />
                        </div>

                        {/* DNI/NIF/NIE */}
                        <div>
                            <Label htmlFor="documento" value="DNI / NIF / NIE *" className="mb-2 block" />
                            <TextInput
                                id="documento"
                                name="documento"
                                type="text"
                                icon={FaIdCard}
                                placeholder="12345678X"
                                value={formData.documento}
                                onChange={handleChange}
                                color={errors.documento ? 'failure' : 'gray'}
                                helperText={errors.documento}
                                required
                            />
                        </div>

                        {/* Dirección */}
                        <div>
                            <Label htmlFor="direccion" value="Dirección *" className="mb-2 block" />
                            <TextInput
                                id="direccion"
                                name="direccion"
                                type="text"
                                icon={FaHome}
                                placeholder="Calle Principal, 123"
                                value={formData.direccion}
                                onChange={handleChange}
                                color={errors.direccion ? 'failure' : 'gray'}
                                helperText={errors.direccion}
                                required
                            />
                        </div>

                        {/* Localidad y Provincia */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="localidad" value="Localidad *" className="mb-2 block" />
                                <TextInput
                                    id="localidad"
                                    name="localidad"
                                    type="text"
                                    placeholder="Madrid"
                                    value={formData.localidad}
                                    onChange={handleChange}
                                    color={errors.localidad ? 'failure' : 'gray'}
                                    helperText={errors.localidad}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="provincia" value="Provincia *" className="mb-2 block" />
                                <TextInput
                                    id="provincia"
                                    name="provincia"
                                    type="text"
                                    placeholder="Madrid"
                                    value={formData.provincia}
                                    onChange={handleChange}
                                    color={errors.provincia ? 'failure' : 'gray'}
                                    helperText={errors.provincia}
                                    required
                                />
                            </div>
                        </div>

                        {/* Código Postal y Teléfono */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="codigoPostal" value="Código Postal *" className="mb-2 block" />
                                <TextInput
                                    id="codigoPostal"
                                    name="codigoPostal"
                                    type="text"
                                    placeholder="28001"
                                    value={formData.codigoPostal}
                                    onChange={handleChange}
                                    color={errors.codigoPostal ? 'failure' : 'gray'}
                                    helperText={errors.codigoPostal}
                                    maxLength={5}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="telefono" value="Teléfono *" className="mb-2 block" />
                                <TextInput
                                    id="telefono"
                                    name="telefono"
                                    type="tel"
                                    icon={FaPhone}
                                    placeholder="612345678"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    color={errors.telefono ? 'failure' : 'gray'}
                                    helperText={errors.telefono}
                                    maxLength={9}
                                    required
                                />
                            </div>
                        </div>

                        {/* Método de Pago */}
                        <div>
                            <Label htmlFor="metodoPago" value="Forma de Pago *" className="mb-2 block" />
                            <Select
                                id="metodoPago"
                                name="metodoPago"
                                icon={FaCreditCard}
                                value={formData.metodoPago}
                                onChange={handleChange}
                                color={errors.metodoPago ? 'failure' : 'gray'}
                                helperText={errors.metodoPago}
                                required>
                                <option value="">Selecciona un método de pago</option>
                                <option value="stripe">Tarjeta de Crédito/Débito (Stripe)</option>
                                <option value="paypal">PayPal</option>
                            </Select>
                        </div>

                        {/* Botón de Envío */}
                        <div className="flex justify-center pt-4">
                            <Button type="submit" size="xl" className="w-full md:w-auto">
                                Continuar al Pago
                            </Button>
                        </div>
                    </form>
                </Card>

                {/* Footer */}
                <div className="text-center mt-8 text-sm text-gray-500">
                    <p>* Todos los campos son obligatorios</p>
                    <p className="mt-2">Al continuar, aceptas nuestros términos y condiciones</p>
                </div>
            </div>
        </div>
    )
}

export default HomePage
