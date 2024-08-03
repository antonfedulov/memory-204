import './Heroes.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as rdd from 'react-device-detect';
import Spinner from 'react-bootstrap/Spinner';


function Heroes() {
  const { isMobile } = rdd;
  const navigate = useNavigate();
  const [heroList, setHeroList] = useState([]);
  const classDevice = isMobile ? 'is-phone' : 'is-pc';

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        //https://memory-204.biz.ua/api/heroes/list
        const response = await axios.get(`http://localhost:4000/heroes/list`);
        
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
    <div className={'heroes-page ' + classDevice}>
      <div className='heroes-page-left-side'>
        <img className='book' src={process.env.PUBLIC_URL + '/heroes/book.jpg'} alt="book" onClick={() => navigate(`/`)} />
        <img className='book-text' src={process.env.PUBLIC_URL + '/heroes/book-text.jpg'} alt="book-text" />
      </div>
      <div className='heroes-page-list'>
        {heroList.length ? heroList.sort((a, b) => +a.Order - +b.Order).map(hero => {
          return (
            <div className='hero-wrapper' key={hero.Order} onClick={() => heroClickHandler(hero.Order)}>
              <img className='hero' src={hero.Photo} alt="Hero" />
              <div className='hero-overlay'></div>
            </div>
          )
        }) : (<Spinner animation="border" variant="light" size="sm" />)}
      </div>
    </div>
  );
}

export default Heroes;
