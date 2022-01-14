import {createContext,useState} from "react"

const CurrentWeatherContext = createContext();

export const CurrentWeatherProvider = ({children}) => {

    const [currentWeather,setCurrentWeather]= useState([])

    const values = {
        currentWeather,
        setCurrentWeather
    }


    return <CurrentWeatherContext.Provider value={values}>{children}</CurrentWeatherContext.Provider>
}

export default CurrentWeatherContext;