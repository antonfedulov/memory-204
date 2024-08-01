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
    <div className='heroes-page'>
      <div className='heroes-page-list'>
        {heroList.length && heroList.map(hero => <img className='hero' src={hero.Photo} alt="Hero" onClick={() => heroClickHandler(hero.Order)} />)}
      </div>
    </div>
  );
}

export default Heroes;
