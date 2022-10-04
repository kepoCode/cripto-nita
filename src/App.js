import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/Home';
import CriptoInfo from './pages/CriptoInfo';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/info" element={<CriptoInfo/>}/>
      </Routes>
    </Router>
  );
}

export default App;
