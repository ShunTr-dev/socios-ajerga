import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PaymentPage from './pages/PaymentPage'
import SuccessPage from './pages/SuccessPage'
import ErrorPage from './pages/ErrorPage'

/**
 * Componente principal de la aplicación
 * Define las rutas principales de la aplicación
 * @returns {JSX.Element} Componente App
 */
function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pago" element={<PaymentPage />} />
                <Route path="/exito" element={<SuccessPage />} />
                <Route path="/error" element={<ErrorPage />} />
            </Routes>
        </div>
    )
}

export default App
