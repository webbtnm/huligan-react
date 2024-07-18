import { useEffect } from 'react';
import './App.css';
import MenuPage from './MenuPage'
const tg = window.Telegram.WebApp;

function App() {
  return (
    <div className="App">
      <MenuPage />
    </div>
  );
}

export default App;
