import './HeroCreateEdit.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

function HeroCreateEdit() {
  const navigator = useNavigate();
  const location = useLocation();

  const ranks = [
    { id: 1, value: 'cолдат' },
    { id: 2, value: 'cтарший солдат' },
    { id: 3, value: 'молодший сержант' },
    { id: 4, value: 'сержант' },
    { id: 5, value: 'старший сержант' },
    { id: 6, value: 'головний сержант' },
    { id: 7, value: 'штаб-сержант' },
    { id: 8, value: 'вищий	Майстер-сержант' },
    { id: 9, value: 'старший майстер-сержант' },
    { id: 10, value: 'молодший лейтенант' },
    { id: 11, value: 'лейтенант' },
    { id: 12, value: 'старший лейтенант' },
    { id: 13, value: 'капітан' },
    { id: 14, value: 'майор' },
    { id: 15, value: 'підполковник' },
    { id: 16, value: 'полковник' },
    { id: 17, value: 'генерал-майор' },
    { id: 18, value: 'генерал-лейтенант' },
    { id: 19, value: 'генерал' },
  ];

  const [isFormValid, setIsFormValid] = useState(false);
  const [isEditMode, setStateMode] = useState(false);
  const [order, setOrder] = useState(0);

  const [formData, setFormData] = useState({
    PIP: '',
    Rank: 1,
    Position: '',
    Description: '',
    Reward: '',
    Photo: null,
  });

  useEffect(() => {
    const fields = Object.keys(formData || []);
    const isValid = fields.every(field => !!formData[field]);
    setIsFormValid(isValid);
  }, [formData]);

  useEffect(() => {
    const order = location?.state?.key;
    order && setOrder(order);
    
    const fetchHero = async () => {
      try {
        const response = await axios.get(`https://memory-204.biz.ua/api/heroes/${order}`);
        if (response?.data) {
          const Rank = ranks.find((rank) => rank.value === response?.data.Rank)?.id ?? 1;
          setFormData({
            PIP: response?.data.PIP,
            Rank,
            Position: response?.data.Position,
            Description: response?.data.Description,
            Reward: response?.data.Reward,
            Photo: null,
          });
        }
      } catch (error) {
        console.error('Error fetching hero:', error);
      }
    };

    if (order) {
      setStateMode(true);
      fetchHero();
    }  
  }, [location?.state?.key]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'Photo') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const Rank = ranks.find(rank => rank.id === +formData.Rank)?.value;
    const formReqData = new FormData();
    formReqData.append('PIP', formData.PIP);
    formReqData.append('Rank', Rank);
    formReqData.append('Description', formData.Description);
    formReqData.append('Reward', formData.Reward);
    formReqData.append('Position', formData.Position);
    formReqData.append('Photo', formData.Photo);


    let response
    if (!isEditMode) {
      response = await axios.post('https://memory-204.biz.ua/api/heroes/create', formReqData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } else {
      formReqData.append('Order', order);
      response = await axios.put('https://memory-204.biz.ua/api/heroes/update', formReqData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    }
    
    
    if (response.data && response.data.isCreated) {
      const heroOrder = response.data.hero?.Order;
      navigator(`/heroes/${heroOrder}`);
    }
  };

  return (
    <div className='hero-create-edit-page'>
      <div className='hero-create-form'>
        <Form className='form'>
          <Form.Group className="mb-3">
            <Form.Label>П.І.П.</Form.Label>
            <Form.Control
              type="text"
              maxLength="60"
              required
              name="PIP"
              value={formData.PIP}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Звання</Form.Label>
            <Form.Select name="Rank" value={formData.Rank} onChange={handleChange} required>
              {ranks.map((rank, id) => <option className='select-option' value={rank.id} key={id}>{rank.value}</option> )}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Посада</Form.Label>
            <Form.Control
              name="Position"
              type="text"
              maxLength="250"
              required
              value={formData.Position}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Опис</Form.Label>
            <Form.Control
              name="Description"
              as="textarea"
              rows={4}
              maxLength="2000"
              required
              value={formData.Description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Нагороди</Form.Label>
            <Form.Control
              name="Reward"
              as="textarea"
              rows={4}
              maxLength="2000"
              required
              value={formData.Reward}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Фото</Form.Label>
            <Form.Control
              name="Photo"
              type="file"
              required
              onChange={handleChange}
            />
          </Form.Group>
          <Button
            disabled={!isFormValid}
            variant="secondary"
            type="button"
            className='add-button'
            onClick={handleSubmit}
          >
            {isEditMode ? 'Оновити дані героя' : 'Додати героя'}
          </Button>
          <Button
            variant="secondary"
            type="button"
            className='add-button'
            onClick={() => navigator(`/heroes/list`)}
          >
            Перейти до списку
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default HeroCreateEdit;
