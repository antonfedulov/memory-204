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


  return (
    <div className='heroes-page-list'>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr className='table-header-row'>
            <th>Порядковий номер</th>
            <th>П.І.П.</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {heroList.length && heroList.map((hero) => {
            return (
              <tr key={hero.Order}>
                <th>{hero.Order}</th>
                <th>{hero.PIP}</th>
                <th className='action-btn'>
                  <i className="bi bi-pencil-square" onClick={() => navigate('/heroes/create', { state: { key: hero.Order } })}></i>
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
