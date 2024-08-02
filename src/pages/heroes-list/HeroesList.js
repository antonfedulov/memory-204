import './HeroesList.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';


function HeroesList() {
  const navigate = useNavigate();
  const [heroList, setHeroList] = useState([]);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await axios.get(`https://memory-204.biz.ua/api/heroes/edit-list`);
        if (response?.data) {
          setHeroList(response?.data);
        }
      } catch (error) {
        console.error('Error fetching heroes:', error);
      }
    };

    fetchHeroes();
  }, []);


  const onRemoveHandle = async (order) => {
    const response = await axios.delete(`https://memory-204.biz.ua/api/heroes/delete/${order}`);

    if (response.data && response.data.isRemoved) {
      setHeroList(response.data.heroes);
    }
  }

  return (
    <div className='heroes-page-list'>
      <i className="bi bi-house-door home-icon" onClick={() => navigate('/')}></i>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr className='table-header-row'>
            <th>Порядковий номер</th>
            <th>П.І.П.</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {heroList.length && heroList.sort((a, b) => +a.Order - +b.Order).map((hero) => {
            return (
              <tr key={hero.Order}>
                <th>{hero.Order}</th>
                <th>{hero.PIP}</th>
                <th className='action-btn'>
                  <i className="bi bi-pencil-square" onClick={() => navigate('/heroes/create', { state: { key: hero.Order } })}></i>
                  <i className="bi bi-file-earmark-x-fill" onClick={() => onRemoveHandle(hero.Order)}></i>
                </th>
              </tr>
            )
          })}
      </tbody>
      </Table>
    </div>
  );
}

export default HeroesList;
