import './Heroes.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Heroes() {
  const navigate = useNavigate();
  const [heroList, setHeroList] = useState([]);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await axios.get(`https://memory-204.biz.ua/api/heroes/list`);
        
        setHeroList(response?.data ?? []);
      } catch (error) {
        console.error('Error fetching hero:', error);
      }
    };

    fetchHeroes();
  }, []);

  const heroClickHandler = (order) => {
    navigate(`/heroes/${order}`)
  }

  return (
    <div className='heroes-page'>
      <div className='heroes-page-left-side'>
        <img className='book' src={process.env.PUBLIC_URL + '/heroes/book.jpg'} alt="book" onClick={() => navigate(`/`)} />
        <img className='book-text' src={process.env.PUBLIC_URL + '/heroes/book-text.jpg'} alt="book-text" />
      </div>
      <div className='heroes-page-list'>
        {heroList.length && heroList.map(hero => {
          return (
            <div className='hero-wrapper' key={hero.Order} onClick={() => heroClickHandler(hero.Order)}>
              <img className='hero' src={hero.Photo} alt="Hero" />
              <div className='hero-overlay'></div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Heroes;
