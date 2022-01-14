import React,{useContext}from 'react'

import Header from './components/Header'
import Dropdown from './components/Dropdown'
import Today from './components/Today'
import Nextdays from './components/Nextdays'
import Theme from './components/Theme'

import './App.css';

import {CityProvider} from './context/CityContext'
import {CurrentWeatherProvider} from './context/CurrentWeatherContext'
import {TemperatureUnitProvider} from './context/TemperatureUnitContext'


import BackgroundContext from "./context/BackgroundContext"

function App() {

  const {theme}= useContext(BackgroundContext)

  return (
    <div className={`App ${theme}`}>
      <Theme/>
      <Header/>
      <CityProvider>
      <CurrentWeatherProvider>
      <TemperatureUnitProvider>
      <div className="context">
          <div className="top-container">
            <Dropdown/>
            <Today/>
            </div>
          <div className="bot-container">
          <Nextdays/>
          </div>
      </div>
      </TemperatureUnitProvider>
      </CurrentWeatherProvider>
      </CityProvider>
    </div>
  );
}

export default App;
