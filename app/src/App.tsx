import React from 'react';
import './App.css';
import Home from './components/main/Home/Home';
import Header from './components/shared/Header/Header';

function App() {
  return (
    <div className="main-container">
      <Header />

      <Home />
    </div>
  );
}

export default App;
