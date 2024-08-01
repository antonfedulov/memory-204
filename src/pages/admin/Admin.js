import React, { useState, useEffect } from 'react';
import './Admin.scss';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin === 'true') {
      navigate('/heroes/create');
    }
  }, []);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
//https://memory-204.biz.ua/api/admin
    const response = await axios.post(`https://memory-204.biz.ua/api/admin`,
      { 
        login: loginValue,
        password: passwordValue 
      }
    );
    setLoginValue('');
    setPasswordValue('');
    if (response && response.data && response.data.isAdmin) {
      localStorage.setItem('isAdmin', true);
      navigate('/heroes/create');
    } else {
      localStorage.setItem('isAdmin', false);
      navigate('/');
    }
};

  return (
    <div className='admin-page'>
      <div className='admin-form'>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Login</Form.Label>
            <Form.Control type="text" value={loginValue} onChange={e => { setLoginValue(e.target.value)}} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Пароль</Form.Label>
            <Form.Control type="password" value={passwordValue} onChange={e => { setPasswordValue(e.target.value)}} />
          </Form.Group>
          <Button as="a" variant="secondary" className='admin-page-btn' type="button" onClick={handleSubmit}>
            Увійти
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Admin;
