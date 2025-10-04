import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Label, TextInput, Select, Card } from 'flowbite-react'
import { FaUserPlus } from 'react-icons/fa'
import Header from '../components/Header'
import Footer from '../components/Footer'

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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <Header />
            <div className="py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Encabezado moderno */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg mb-6">
                            <FaUserPlus className="text-4xl text-white" />
                        </div>
                        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-10">
                            Inscripción de Socios
                        </h1>

                        {/* Cards de información con diseño moderno */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            {/* Card: Derechos y participación */}
                            <Card className="hover:shadow-xl transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
                                <div className="text-left">
                                    <div className="flex items-center mb-3">
                                        <div className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full mr-3"></div>
                                        <h3 className="text-xl font-bold text-gray-900">Derechos y participación</h3>
                                    </div>
                                    <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                                        Las personas asociadas en AJERGA mantienen un alto nivel de implicación con la
                                        entidad, pudiendo participar en las Asambleas Generales y en el Programa de
                                        Voluntariado.
                                    </p>
                                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 mt-4">
                                        <p className="text-sm font-semibold text-gray-700 mb-2">Líneas de trabajo:</p>
                                        <ul className="space-y-2 text-sm text-gray-600">
                                            <li className="flex items-center">
                                                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                                                Desarrollo personal y profesional
                                            </li>
                                            <li className="flex items-center">
                                                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                                                Integración y apoyo social
                                            </li>
                                            <li className="flex items-center">
                                                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-2"></span>
                                                Eventos y promoción cultural
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </Card>

                            {/* Card: Cuota */}
                            <Card className="hover:shadow-xl transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
                                <div className="text-left">
                                    <div className="flex items-center mb-3">
                                        <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full mr-3"></div>
                                        <h3 className="text-xl font-bold text-gray-900">Cuota y destino</h3>
                                    </div>
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 mb-4">
                                        <div className="text-center">
                                            <p className="text-sm text-gray-600 mb-2">Cuota anual</p>
                                            <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                                                8€
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Los fondos se destinan exclusivamente a cubrir gastos administrativos básicos:
                                        gestoría, web, teléfono, comisiones bancarias y otros costes operativos.
                                    </p>
                                </div>
                            </Card>
                        </div>

                        {/* Call to action */}
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 shadow-xl mb-10">
                            <p className="text-lg text-white font-semibold">
                                Complete el formulario para convertirse en socio
                            </p>
                        </div>
                    </div>

                    {/* Formulario moderno */}
                    <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email */}
                            <div>
                                <Label htmlFor="email" value="Email *" className="mb-2 block" />
                                <TextInput
                                    id="email"
                                    name="email"
                                    type="email"
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

                            {/* Botón de Envío Moderno */}
                            <div className="flex justify-center pt-6">
                                <Button
                                    type="submit"
                                    size="xl"
                                    className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:ring-4 focus:ring-indigo-300 border-0">
                                    <span className="flex items-center justify-center gap-2">
                                        Continuar al Pago
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                                            />
                                        </svg>
                                    </span>
                                </Button>
                            </div>
                        </form>
                    </Card>

                    {/* Nota de campos obligatorios */}
                    <div className="text-center mt-8 text-sm text-gray-500">
                        <p>* Todos los campos son obligatorios</p>
                        <p className="mt-2">Al continuar, aceptas nuestros términos y condiciones</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default HomePage
