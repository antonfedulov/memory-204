import { Hono } from 'hono';

const app = new Hono();

app.get('/test', (arg) => {
  return arg.json({ hero: 'HEROOOOOOOTESTTTTTTTT'}) 
})

export default app;