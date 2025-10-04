import { FaEnvelope, FaInstagram } from 'react-icons/fa'

/**
 * Componente Footer
 * Muestra información de contacto y enlaces importantes
 * @returns {JSX.Element} Footer
 */
function Footer() {
    const politicaCookiesUrl = import.meta.env.VITE_POLITICA_COOKIES_URL || '#'
    const avisoLegalUrl = import.meta.env.VITE_AVISO_LEGAL_URL || '#'
    const nuestroEquipoUrl = import.meta.env.VITE_NUESTRO_EQUIPO_URL || '#'

    return (
        <footer className="bg-gray-800 text-white mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Columna 1: Contacto */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contacto</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <FaEnvelope className="text-blue-400" />
                                <a
                                    href="mailto:socios@retornoxove.gal"
                                    className="hover:text-blue-400 transition-colors">
                                    socios@retornoxove.gal
                                </a>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaEnvelope className="text-blue-400" />
                                <a href="mailto:info@retornoxove.gal" className="hover:text-blue-400 transition-colors">
                                    info@retornoxove.gal
                                </a>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaInstagram className="text-pink-400" />
                                <a
                                    href="https://instagram.com/jovenesemigrantes"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-pink-400 transition-colors">
                                    @jovenesemigrantes
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Columna 2: Enlaces legales */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Información</h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href={politicaCookiesUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-400 transition-colors">
                                    Política de cookies
                                </a>
                            </li>
                            <li>
                                <a
                                    href={avisoLegalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-400 transition-colors">
                                    Aviso legal
                                </a>
                            </li>
                            <li>
                                <a
                                    href={nuestroEquipoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-400 transition-colors">
                                    Nuestro equipo
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Columna 3: Logo Xunta de Galicia */}
                    <div className="flex items-center justify-center md:justify-end">
                        <img
                            src="/src/public/xuntadegalicia-300x86.webp"
                            alt="Xunta de Galicia"
                            className="h-16 md:h-20 w-auto object-contain"
                        />
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
                    <p>© {new Date().getFullYear()} AJERGA - Asociación de Jóvenes Emigrantes Retornadxs en Galicia</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
