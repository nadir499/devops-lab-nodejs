/**
 * Integration test for GET /version.
 * Focus: HTTP behavior & payload shape.
 */
import request from 'supertest'
import app from '../src/app.js'
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'

describe('GET /version', () => {
  it('returns package version as a non-empty string', async () => {
    const res = await request(app).get('/version')
    expect(res.status).toBe(200)
    expect(typeof res.body.version).toBe('string')
    expect(res.body.version.length).toBeGreaterThan(0)
  })

  it('returns the version from package.json', async () => {
    const res = await request(app).get('/version')
    const pkg = JSON.parse(
      fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8')
    )

    expect(res.status).toBe(200)
    expect(res.body.version).toBe(pkg.version)
  })

  it('responds with JSON content-type', async () => {
    const res = await request(app).get('/version')
    expect(res.headers['content-type']).toMatch(/application\/json/)
  })
})
