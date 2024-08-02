import './Hero.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import * as rdd from 'react-device-detect';

function Hero() {
  const { isMobile } = rdd;
  const { id } = useParams();
  const navigate = useNavigate();
  const classDevice = isMobile ? 'is-phone' : 'is-pc';
  
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
        const response = await axios.get(`https://memory-204.biz.ua/api/heroes/${id}`);
        setUrlState(response?.data?.Photo ?? '');
        setHeroState({...response.data});
      } catch (error) {
        console.error('Error fetching hero:', error);
      }
    };

    fetchHero();
  }, [id]);

  const brigadaClickHandler = () => {
    navigate('/heroes');
  }


  return (heroState.PIP &&
    <div className={'hero-page ' + classDevice} style={{
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
        <img className='brigada' src={process.env.PUBLIC_URL + '/hero/204brigada.png'} alt="Hero" onClick={() => brigadaClickHandler()} />
        <div className='hero-page-bottom-reward'>{heroState.Reward}</div>
      </div>
    </div>
  );
}

export default Hero;
