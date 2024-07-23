import './Main.css';

function Main() {
  return (
    <div className='main-page'>
      <header className="header">
        <img className="header-img" src={process.env.PUBLIC_URL + '/main/air_force.png'} alt='повітряні сили'></img>
        <img className="header-img book" src={process.env.PUBLIC_URL + '/main/book.jpg'} alt='книга памяті'></img>
        <img className="header-img" src={process.env.PUBLIC_URL + '/main/griffin.png'} alt='бригада'></img>
      </header>
      <div className="description" >військовослужбовців 204 Севастопольської бригади тактичної авіації  які віддали своє життя за ради незалежності та територіальної цілісності держави</div>
    </div>
  );
}

export default Main;
