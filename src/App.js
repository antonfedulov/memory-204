import './App.css';
import { Routes, Route } from 'react-router-dom';
import Hero from './pages/hero/Hero';
import Heroes from './pages/heroes/Heroes';
import HeroCreateEdit from './pages/hero-create-edit/HeroCreateEdit';
import Main from './pages/main/Main';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/heroes" element={<Heroes />} />
      <Route path="/heroes/:id" element={<Hero />} />
      <Route path="/heroes/create" element={<HeroCreateEdit />} />
    </Routes>
  );
}

export default App;
