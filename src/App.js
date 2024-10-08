import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Hero from './pages/hero/Hero';
import Heroes from './pages/heroes/Heroes';
import HeroCreateEdit from './pages/hero-create-edit/HeroCreateEdit';
import Main from './pages/main/Main';
import Admin from './pages/admin/Admin';
import HeroesList from './pages/heroes-list/HeroesList';

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="/" element={<Main />} />
      <Route path="/heroes" element={<Heroes />} />
      <Route path="/heroes/:id" element={<Hero />} />
      <Route path="/heroes/create" element={<HeroCreateEdit />} />
      <Route path="/heroes/list" element={<HeroesList />} />
    </Routes>
  );
}

export default App;
