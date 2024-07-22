import { Hono } from 'hono';

const app = new Hono();

app.get('/test', (arg) => {
  return arg.json({ hero: 'HEROOOOOOO'}) 
})

export default app;