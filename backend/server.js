import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import stripeRoutes from './routes/stripe.js'
import paypalRoutes from './routes/paypal.js'
import sheetsRoutes from './routes/sheets.js'

// Cargar variables de entorno
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
    next()
})

// Rutas
app.use('/api', stripeRoutes)
app.use('/api', paypalRoutes)
app.use('/api', sheetsRoutes)

// Ruta de prueba
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Servidor funcionando correctamente' })
})

// Manejo de errores
app.use((err, req, res, next) => {
    console.error('Error:', err)
    res.status(500).json({
        error: 'Error interno del servidor',
        message: err.message,
    })
})

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`)
})
