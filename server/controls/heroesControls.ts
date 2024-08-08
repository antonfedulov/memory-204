import Hero from '../models/Hero';
import { sequelize } from '../config/database';

export interface HeroData {
  Order: number;
  PIP: string;
  Rank: string;
  Description: string;
  Reward: string;
  Position: string;
  Photo: Buffer;
  Title: string;
}

export async function addHero(data: HeroData) {
  const transaction = await sequelize.transaction();
  try {
    const maxOrderResult = await Hero.max('Order');
    const maxOrder = maxOrderResult ? Number(maxOrderResult) : 0;

    const newHero = await Hero.create({
      ...data,
      Order: maxOrder + 1
    }, { transaction });

    await transaction.commit();
    return newHero;
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating hero:', error);
    return null;
  }
}

export async function updateHero(data: HeroData) {
  const transaction = await sequelize.transaction();
  try {
    const hero = await Hero.findOne({ where: { Order: data.Order } });

    if (!hero) {
      return null;
    }

    const newHero = await hero.update(data);
    await transaction.commit();
    return newHero;
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating hero:', error);
    return null;
  }
}

export async function getHeroes(): Promise<HeroData[]> {
  try {
    const heroes = await Hero.findAll({attributes: ['Order', 'Photo']});
    
    if (!heroes) {
      return [] as HeroData[];
    }
    return !!heroes && heroes !== null ? heroes : {} as HeroData[];
  } catch (error) {
    console.error('Error not found hero:', error);
    return [] as HeroData[];
  }
}

export async function getEditHeroes(): Promise<HeroData[]> {
  try {
    const heroes = await Hero.findAll({attributes: ['Order', 'PIP']});

    if (!heroes) {
      return [] as HeroData[];
    }
    return !!heroes && heroes !== null ? heroes : {} as HeroData[];
  } catch (error) {
    console.error('Error not found hero:', error);
    return [] as HeroData[];
  }
}

export async function getHero(Order: number): Promise<HeroData> {
  const transaction = await sequelize.transaction();
  try {
    const hero = await Hero.findOne({ where: { Order }, transaction });

    if (!hero) {
      return {} as HeroData;
    }
    await transaction.commit();
    return !!hero && hero !== null ? hero : {} as HeroData;
  } catch (error) {
    await transaction.rollback();
    console.error('Error not found hero:', error);
    return {} as HeroData;
  }
}

export async function removeHero(Order: number): Promise<boolean> {
  const transaction = await sequelize.transaction();
  try {
    const hero = await Hero.findOne({ where: { Order } });
    let result
    if (hero) {
      result = await hero.destroy({ transaction });
    }
    console.log(result)
    await transaction.commit();
    return true;
  } catch (error) {
    console.error('Error not found hero:', error);
    await transaction.rollback();
    return false;
  }
}