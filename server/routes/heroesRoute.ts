import { Hono } from 'hono';
import { addHero, getEditHeroes, getHero, getHeroes, removeHero, updateHero, type HeroData } from '../controls/heroesControls';
import { parseFormData } from '.';
import { compress } from '../utils/compress';

export const heroesRoutes = new Hono()
  .get('/list', async (c) => {
    try {
      const heroes: HeroData[] = await getHeroes();

      const compressedPhotos = await Promise.all(
        heroes.map(async (hero) => {
          const compressedBuffer = await compress(hero.Photo);
          return {
            Order: hero.Order,
            Photo: `data:image/jpeg;base64,${compressedBuffer.toString('base64')}`,
          };
        })
      );

      return c.json(compressedPhotos);
  
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
        Photo: `data:${photoMimeType};base64,${photoBase64}`,
        Title: hero.Title
      });
  
    } catch (error) {
      console.error('Error fetching hero:', error);
      return c.json({ message: 'Internal server error' }, 500);
    }
  })
  .post('/create', async (c) => {
    try {
      const { fields, files } = await parseFormData(c.req);
      const { PIP, Rank, Description, Reward, Position, Title } = fields;
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
        Photo: photoBuffer,
        Title
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
      const { PIP, Rank, Description, Reward, Position, Order, Title } = fields;
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
        Photo: photoBuffer,
        Title
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
  .delete('/delete/:order', async (c) => {
    try {
      const { order } = await c.req.param();

      if (!!order) {
        const result = await removeHero(+order);
        const heroes: HeroData[] = await getEditHeroes();
        return c.json({ message: 'Hero removed from list', isRemoved: true, heroes: heroes }, 201);
      } else {
        return c.json({ isRemoved: false }, 200);
      }
    } catch (error) {
      return c.json({ isRemoved: false }, 200);
    }
  })