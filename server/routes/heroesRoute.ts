import { Hono } from 'hono';

export const heroesRoutes = new Hono()
  .get('/', (req) => {
    return req.json({ pisun: 'dsadasda' })
  })