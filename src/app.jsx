import {useState} from 'react';
import { LocationProvider, Router, Route } from 'preact-iso';
import { Header } from './components/header/header';
// import { Socket } from './socket/socket';
import HomePage from './pages/Home';
import Socket from './pages/Socket';

export function App() {
  return (
    <LocationProvider>
      <Header/>
        <Router>
            <Route path="/" component={HomePage}/>
            <Route path="/sockets" component={Socket} />
        </Router>
    </LocationProvider>
  );
}