import React from 'react';
import './App.css';
import Home from './components/main/Home/Home';
import Header from './components/shared/Header/Header';
import { socket, SocketContext } from './core/contexts/socket';

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <div className="main-container">
        <Header />

        <Home />
      </div>
    </SocketContext.Provider>
  );
}

export default App;
