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
  const [descriptionState, setDescriptionState] = useState([]);
  const [rewardState, setRewardState] = useState([]);
  const [heroState, setHeroState] = useState({
    PIP: '',
    Rank: '',
    Position: '',
    Title: ''
  });

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await axios.get(`https://memory-204.biz.ua/api/heroes/${id}`);
        setUrlState(response?.data?.Photo ?? '');
        if (response?.data) {
          setHeroState({
            PIP: response.data.PIP,
            Rank: response.data.Rank,
            Position: response.data.Position,
            Title: response.data.Title
          });
        }

        if (response?.data) {
          const descriptions = response.data.Description?.split('$');
          const rewards = response.data.Reward?.split('$');
          setDescriptionState(descriptions);
          setRewardState(rewards);
        }
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
          {heroState.Title && <div className='hero-page-top-title' translate="no">{heroState.Title}</div>}
          <div className='hero-page-top-rank' translate="no">{heroState.Rank}</div>
          <div className='hero-page-top-pip' translate="no">{heroState.PIP}</div>
        </div>
        <div className='hero-page-top-right'>
          <div className='hero-page-top-position' translate="no">{heroState.Position}</div>
          <div className='hero-page-top-description' translate="no">{descriptionState.length && descriptionState.map((p) => {
            return (<p className='description-p'>{p}</p>)
          })}</div>
        </div>
      </div>
      <div className='hero-page-bottom'>
        <img className='brigada' src={process.env.PUBLIC_URL + '/hero/204brigada.png'} alt="Hero" onClick={() => brigadaClickHandler()} />
        <div className='hero-page-bottom-reward' translate="no">{rewardState.length && rewardState.map((p) => {
          return (<p className='reward-p'>{p}</p>)
        })}</div>
      </div>
    </div>
  );
}

export default Hero;
