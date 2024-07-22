import { Hono } from 'hono';
import { heroesRoutes } from './heroesRoute';

const hanoRouter = new Hono();

hanoRouter.route('api/heroes', heroesRoutes)

export default hanoRouter;