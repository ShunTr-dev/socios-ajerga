import logo from '../public/logo_ajerga-150x156.webp'

/**
 * Componente de encabezado con logo y nombre de la asociación
 * @returns {JSX.Element} Header component
 */
function Header() {
    return (
        <header className="bg-white shadow-md mb-8">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-center md:justify-start gap-4">
                    <img src={logo} alt="Logo AJERGA" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
                    <div>
                        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
                            Asociación de Jóvenes Emigrantes
                        </h1>
                        <h2 className="text-base md:text-lg text-gray-700">Retornados en Galicia</h2>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
