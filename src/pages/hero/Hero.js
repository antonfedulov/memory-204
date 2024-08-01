import './Hero.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

function Hero() {
  const { id } = useParams();
  const [urlState, setUrlState] = useState('');
  const [heroState, setHeroState] = useState({
    PIP: '',
    Rank: '',
    Description: '',
    Reward: '',
    Position: ''
  });

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/heroes/${id}`);
        setUrlState(response?.data?.Photo ?? '');
        setHeroState({...response.data});
      } catch (error) {
        console.error('Error fetching hero:', error);
      }
    };

    fetchHero();
  }, [id]);


  return (heroState.PIP &&
    <div className='hero-page' style={{
      backgroundImage: `url("${process.env.PUBLIC_URL}/hero/hero-background.jpg")`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className='hero-page-top'>
        <div className='hero-page-top-left'>
          <img className='hero-page-top-photo' src={urlState} alt="Hero" />
          <div className='hero-page-top-rank'>{heroState.Rank}</div>
          <div className='hero-page-top-pip'>{heroState.PIP}</div>
        </div>
        <div className='hero-page-top-right'>
          <div className='hero-page-top-position'>{heroState.Position}</div>
          <div className='hero-page-top-description'>{heroState.Description}</div>
        </div>
      </div>
      <div className='hero-page-bottom'>
        <div className='hero-page-bottom-reward'>{heroState.Reward}</div>
      </div>
    </div>
  );
}

export default Hero;
