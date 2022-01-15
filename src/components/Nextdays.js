import React, {useContext,useEffect,useState} from 'react'
import axios from "axios"

import CityContext from '../context/CityContext'
import CurrentWeatherContext from "../context/CurrentWeatherContext"
import TemperatureUnitContext from "../context/TemperatureUnitContext"

function Nextdays() {
    const [longitude, setLongitude]=useState("35.32")
    const [latitude, setLatitude]=useState("37.00")
    const [weather, setWeather]=useState([])
    const [filteredWeather,setFilteredWeather]=useState([])

    const { city, setCity } = useContext(CityContext)
    const {currentWeather,setCurrentWeather}=useContext(CurrentWeatherContext)
    const {unit,setUnit}= useContext(TemperatureUnitContext)

    

    useEffect(() => {
        const getLongitudeFromApi = async () => {
            try{
                await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city[0]}&units=metric&appid=0ffc648504aef891431a5d0fb0f6474e`).then(res=>setLongitude(res.data.coord.lon))
            }catch (err){
                if (err.response) {
                    console.error(err.response.data)
                }
            }
        }
        const getLatitudeFromApi = async () => {
            try{
                await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city[0]}&units=metric&appid=0ffc648504aef891431a5d0fb0f6474e`).then(res=>setLatitude(res.data.coord.lat))
            }catch (err){
                if (err.response) {
                    console.error(err.response.data)
                }
            }
        }

        const getSevenDaysWeatherInfo = async () => {
            try {
                await axios(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,hourly,minutely&units=${unit}&appid=cb8c05677441bdd9cfb678a863d28e9e`).then(res=>setWeather(res.data.daily.map(item=>{
                    let d  = new Date(item.dt*1000)
                    let day = d.toLocaleString("en-GB",{weekday:"long"})

                    const arr = item.weather[0].description.split(" ")

                    for(let i=0;i<arr.length;i++){
                        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
                    }
                
                        const uppercaseDescription = arr.join(' ')

                    return{
                        day : day,
                        icon : item.weather[0].icon,
                        min : Math.round(item.temp.min),
                        max : Math.round(item.temp.max),
                        description: uppercaseDescription,
                        humidity:item.humidity,
                        windspeed:item.wind_speed

                    }
                })))

            }catch (err){
                if (err.response) {
                    console.error(err.response.data)
                }
            }
        }

        getLongitudeFromApi();
        getLatitudeFromApi();

        getSevenDaysWeatherInfo()
        
    },[city,latitude,longitude,unit])

    useEffect(() => {
        setFilteredWeather(weather.filter((item,i)=>{
            if(i>0){
                return item
            }
        }))
    },[weather])

    return (
        <div className="next-days-container">
            {
                filteredWeather.map((item,i)=>(
                <div key={i} className="box">
                    <div  className="cards">
                        <div className="weekday">{item.day}</div>
                            <div className="image"> 
                                <img src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}/>
                            </div>
                        {
                            unit==="metric" ? 
                            <div className="min-max">{item.min}&#8451; / {item.max}&#8451;</div> 
                            : 
                            <div className="min-max">{item.min}&#8457; / {item.max}&#8457;</div>
                        }
                    </div>
                    <div className="cards-back">
                        <div className="weekday">{item.day}</div>
                        <div>{item.description}</div>
                        <div>Humidity {item.humidity}%</div>
                            {
                         unit==="metric" ? 
                        <div>WindSpeed  {item.windspeed}m/s</div> 
                            : 
                        <div>WindSpeed  {item.windspeed}mph</div>
                            }
                    </div>
                </div>
                    
                ))
            }
        </div>
        
    )
}

export default Nextdays;
