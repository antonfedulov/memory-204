import { Hono } from 'hono';
import { addHero, getEditHeroes, getHero, getHeroes, updateHero, type HeroData } from '../controls/heroesControls';
import { parseFormData } from '.';

export const heroesRoutes = new Hono()
  .get('/list', async (c) => {
    try {
      const heroes: HeroData[] = await getHeroes();
 
      const mappedHeroes = heroes.map((hero) => {
        const Order = hero.Order;
        const photoBase64 = hero.Photo.toString('base64');
        const photoMimeType = 'image/jpeg';
        const Photo = `data:${photoMimeType};base64,${photoBase64}`;
        return { Order, Photo };
      })

      return c.json(mappedHeroes);
  
    } catch (error) {
      console.error('Error fetching hero:', error);
      return c.json({ message: 'Internal server error' }, 500);
    }
  })
  .get('/edit-list', async (c) => {
    try {
      const heroes: HeroData[] = await getEditHeroes();
      return c.json(heroes);
  
    } catch (error) {
      console.error('Error fetching hero:', error);
      return c.json({ message: 'Internal server error' }, 500);
    }
  })
  .get('/:id', async (c) => {
    try {
      const Order = c.req.param('id');
      const hero: HeroData = await getHero(+Order);

      const photoBase64 = hero.Photo.toString('base64');
      const photoMimeType = 'image/jpeg';

      return c.json({
        Order: hero.Order,
        PIP: hero.PIP,
        Rank: hero.Rank,
        Description: hero.Description,
        Reward: hero.Reward,
        Position: hero.Position,
        Photo: `data:${photoMimeType};base64,${photoBase64}`
      });
  
    } catch (error) {
      console.error('Error fetching hero:', error);
      return c.json({ message: 'Internal server error' }, 500);
    }
  })
  .post('/create', async (c) => {
    try {
      const { fields, files } = await parseFormData(c.req);
      const { PIP, Rank, Description, Reward, Position } = fields;
      const photoBlob = files['Photo'] as Blob;
  
      if (!PIP || !Rank || !Description || !Reward || !Position || !photoBlob) {
        return c.json({ message: 'All fields are required' }, 400);
      }
  
      const photoArrayBuffer = await photoBlob.arrayBuffer();
      const photoBuffer = Buffer.from(photoArrayBuffer);

      const newHero = await addHero({
        PIP,
        Rank,
        Description,
        Reward,
        Position,
        Photo: photoBuffer
      } as HeroData);

      if (newHero) {
        return c.json({ message: 'Hero created successfully', isCreated: true, hero: newHero }, 201);
      } else {
        return c.json({ isCreated: false }, 200);
      }
    } catch (error) {
      return c.json({ isCreated: false }, 200);
    }
  })
  .put('/update', async (c) => {
    try {
      const { fields, files } = await parseFormData(c.req);
      const { PIP, Rank, Description, Reward, Position, Order } = fields;
      const photoBlob = files['Photo'] as Blob;
  
      if (!PIP || !Rank || !Description || !Reward || !Position || !photoBlob) {
        return c.json({ message: 'All fields are required' }, 400);
      }
  
      const photoArrayBuffer = await photoBlob.arrayBuffer();
      const photoBuffer = Buffer.from(photoArrayBuffer);

      const newHero = await updateHero({
        Order,
        PIP,
        Rank,
        Description,
        Reward,
        Position,
        Photo: photoBuffer
      } as HeroData);

      if (newHero) {
        return c.json({ message: 'Hero created successfully', isCreated: true, hero: newHero }, 201);
      } else {
        return c.json({ isCreated: false }, 200);
      }
    } catch (error) {
      return c.json({ isCreated: false }, 200);
    }
  })