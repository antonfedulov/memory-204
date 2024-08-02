import './Main.scss';
import { useNavigate } from "react-router-dom";
import * as rdd from 'react-device-detect';

function Main() {
  const navigator = useNavigate();
  const classDevice = rdd.isMobile ? 'is-phone' : 'is-pc';
  
  return (
    <div className={'main-page ' + classDevice}>
      <header className="header">
        <img className="header-img" src={process.env.PUBLIC_URL + '/main/air_force.png'} alt='повітряні сили'></img>
        <img className="header-img book" src={process.env.PUBLIC_URL + '/main/book.jpg'} alt='книга памяті' onClick={() => navigator('/heroes')}></img>
        <img className="header-img" src={process.env.PUBLIC_URL + '/main/griffin.png'} alt='бригада' onClick={() => !rdd.isMobile && navigator('/admin')}></img>
      </header>
      <div className="description" >військовослужбовців 204 Севастопольської бригади тактичної авіації  які віддали своє життя за ради незалежності та територіальної цілісності держави</div>
    </div>
  );
}

export default Main;
