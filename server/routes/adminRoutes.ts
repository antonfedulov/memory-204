import { Hono } from 'hono';

export const adminRoutes = new Hono()
  .post('/', async (c) => {
    try {
      const data = await c.req.json();
      if (data?.login === 'admin' && data?.password === 'memory204') {
        return c.json({ isAdmin: true }, 200);
      } else {
        return c.json({ isAdmin: false }, 200);
      }
    } catch (error) {
      return c.json({ error: 'Invalid JSON' }, 400);
    }
  })