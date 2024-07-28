import './HeroCreateEdit.scss';

function HeroCreateEdit() {
  return (
    <div className='hero-create-edit-page'>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>П.І.П.</Form.Label>
          <Form.Control type="text" value={loginValue} onChange={e => { setLoginValue(e.target.value)}} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Пароль</Form.Label>
          <Form.Control type="password" value={passwordValue} onChange={e => { setPasswordValue(e.target.value)}} />
        </Form.Group>
        <Button as="a" variant="secondary" type="button">
          Увійти
        </Button>
      </Form>
    </div>
  );
}

export default HeroCreateEdit;
