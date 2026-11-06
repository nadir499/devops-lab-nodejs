/**
 * Express app configuration.
 * Responsibilities:
 *  - Base routes (/, /health)
 *  - Explicitly mount all routers to ensure test coverage tracking
 *  - Global error handler (consistent JSON for errors)
 */
import express from 'express'
import { errorHandler } from './utils/errorHandler.js'
import versionRouter from './routes/auto/version.route.js'
import infoRouter from './routes/auto/info.route.js'
import boomRouter from './routes/auto/boom.route.js'

const app = express()

// Simple root + health endpoints
app.get('/', (_req, res) => res.json({ ok: true, message: 'Hello from CI/CD demo 👋' }))
app.get('/health', (_req, res) => res.status(200).send('OK'))

// Montage explicite des routes
app.use('/', versionRouter)
app.use('/', infoRouter)
app.use('/', boomRouter)

// Global error middleware last
app.use(errorHandler)

export default app