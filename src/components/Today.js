import React, {useContext,useEffect,useState} from 'react'
import axios from "axios"

import CityContext from '../context/CityContext'
import TemperatureUnitContext from "../context/TemperatureUnitContext"

function Today() {

    const [icon,setIcon]= useState("01n")
    const [description,setDescription]= useState("")
    const [temperature,setTemperature] = useState("")
    const [tempMin,setTempMin] = useState("")
    const [tempMax,setTempMax] = useState("")
    const [humidity,setHumidity] = useState("")
    const [windSpeed,setWindSpeed] = useState("")

    const [currentTime,setCurrentTime]=useState("")  // saat
    const [currentYear,setCurrentYear] = useState("")  // yıl
    const [currentMonth,setCurrentMonth] = useState("")  // ay
    const [currentWeekday,setCurrentWeekday] = useState("") // gün
    const [currentDate,setCurrentDate] = useState("") 

    const { city } = useContext(CityContext)
    
    const {unit,setUnit}= useContext(TemperatureUnitContext)

    useEffect(() => {
        setInterval(() => {
            setCurrentTime(new Date().toLocaleString(["en-GB"],{
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            }))
            setCurrentWeekday(new Date().toLocaleString(["en-GB"],{
                weekday:"long",
            }))
            setCurrentMonth(new Date().toLocaleString(["en-GB"],{
                month:"long"
            }))
            setCurrentDate(new Date().toLocaleString(["en-GB"],{
                day: 'numeric',
            }))
            setCurrentYear(new Date().toLocaleString(["en-GB"],{
                year: 'numeric',
            }))
        },[1000])
    },[])

    useEffect(() => {
        const getIconsFromApi = async () =>{
            try{
                await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city[0]}&units=metric&appid=0ffc648504aef891431a5d0fb0f6474e`)
                .then(res=>setIcon(res.data.weather[0].icon))
                
            }catch (err) {
                if (err.response) {
                    console.error(err.response.data)
                }
            }
        }
        const getDescriptionFromApi = async () => {
            try{
                await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city[0]}&units=${unit}&appid=0ffc648504aef891431a5d0fb0f6474e`)
                .then(res=>setDescription(res.data.weather[0].description))
                
            }catch (err) {
                if (err.response) {
                    console.error(err.response.data)
                }
            }
        }
        const getTemperatureFromApi = async () => {
            try{
                await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city[0]}&units=${unit}&appid=0ffc648504aef891431a5d0fb0f6474e`)
                .then(res=>setTemperature(res.data.main.temp))
                
            }catch (err) {
                if (err.response) {
                    console.error(err.response.data)
                }
            }
        }
        const getTempMinFromApi = async () => {
            try{
                await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city[0]}&units=${unit}&appid=0ffc648504aef891431a5d0fb0f6474e`)
                .then(res=>setTempMin(res.data.main.temp_min))
                
            }catch (err) {
                if (err.response) {
                    console.error(err.response.data)
                }
            }
        }
        const getTempMaxFromApi = async () => {
            try{
                await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city[0]}&units=${unit}&appid=0ffc648504aef891431a5d0fb0f6474e`)
                .then(res=>setTempMax(res.data.main.temp_max))
                
            }catch (err) {
                if (err.response) {
                    console.error(err.response.data)
                }
            }
        }
        const getHumidityFromApi = async () => {
            try{
                await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city[0]}&units=metric&appid=0ffc648504aef891431a5d0fb0f6474e`)
                .then(res=>setHumidity(res.data.main.humidity))
                
            }catch (err) {
                if (err.response) {
                    console.error(err.response.data)
                }
            }
        }
        const getWindSpeedFromApi = async () => {
            try{
                await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city[0]}&units=${unit}&appid=0ffc648504aef891431a5d0fb0f6474e`)
                .then(res=>setWindSpeed(res.data.wind.speed))
                
            }catch (err) {
                if (err.response) {
                    console.error(err.response.data)
                }
            }
        }
        getIconsFromApi();
        getDescriptionFromApi();
        getTemperatureFromApi();
        getTempMinFromApi();
        getTempMaxFromApi();
        getHumidityFromApi();
        getWindSpeedFromApi();
    },[city,unit])

    const changeToMetric = () => {
        setUnit("metric")
    }

    const changeToİmperial = () => {
        setUnit("imperial")
    }

    return (
        <div className="today-container">
            <div className="today-top">
                <div className="today-top-left">
                    <div className="city-name">{city}</div>
                    {
                        (currentWeekday||currentTime||currentMonth||currentDate||currentYear)  ? <div className="date">{currentWeekday} {currentTime} <br />{currentMonth} {currentDate}, {currentYear} </div> : <div>Loading...</div>
                        
                    }
                </div>
                <div className="today-top-right">
                    <div className="left">
                        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
                    </div>
                    <div className="right">
                        {
                            unit==="metric" ? 
                            <div className="temp">{temperature}&#8451; |
                            <button className="unit-button" onClick={changeToİmperial} type="submit">
                                &#8457;</button>
                            </div>
                             : 
                             <div className="temp">{temperature}&#8457; |
                             <button className="unit-button" onClick={changeToMetric} type="submit">
                                 &#8451;
                             </button></div>
                        }
                        <div className="description">{description} </div>
                    </div>

                </div>
            </div>
            <div className="today-bot">
                 <div className="today-bot-left">
                     {
                         unit==="metric" ? <div>Today Minumum : {tempMin}&#8451;</div> : <div>Today Minumum : {tempMin}&#8457;</div>
                     }
                    {
                         unit==="metric" ? <div>Today Maximum : {tempMax}&#8451;</div> : <div>Today Maximum : {tempMax}&#8457;</div>
                     }
                     
                 </div>
                 <div className="today-bot-right">
                     <div>Humidity : {humidity}%</div>
                     {
                         unit==="metric" ? <div>WindSpeed : {windSpeed}m/s</div> : <div>WindSpeed : {windSpeed}mph</div>
                     }
                 </div>

            </div>
        </div>
    )
}

export default Today;
