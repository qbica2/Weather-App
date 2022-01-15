import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { useFormik } from 'formik';

import CityContext from '../context/CityContext'
import BackgroundContext from "../context/BackgroundContext"

function Dropdown() {

    const [data, setData] = useState([])
    const [allCities, setAllCities] = useState([])

    const { setCity } = useContext(CityContext)
    const {theme}= useContext(BackgroundContext)

    const {handleSubmit}=useFormik({
        initialValues:{
            city:"Adana",
        },
        onSubmit: values =>{
            setCity(allCities.filter((item)=>{
                if(item===values.city){
                    return item
                }else{return false}
            }))
        }
    })

    const handleCity = (e)=>{
        setCity(allCities.filter((item)=>{
            if(item===e.target.value){
                return item
            }else{return false}
        }));
        e.target.size=1;
        e.target.blur();
    }



    useEffect(() => {
        const getCityFromData = () => {
            try {
                axios.get("citiesofturkey.json")
                    .then(res => setData(res.data))
            } catch (err) {
                if (err.response) {
                    console.error(err.response.data)
                }
            }
        }
        getCityFromData();
    }, [])

    useEffect(() => {
        setAllCities(data.map((item => {
            return item.name
        })))
    }, [data])

    
    // useEffect(() => {
    //     const getWeatherInfoCurrent = async () =>{
    //         try{
    //             await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city[0]}&units=${unit}&appid=0ffc648504aef891431a5d0fb0f6474e`)
    //             .then(res=>setCurrentWeather(res.data))
                
    //         }catch (err) {
    //             if (err.response) {
    //                 console.error(err.response.data)
    //             }
    //         }
    //     }
        
    //     getWeatherInfoCurrent();
    // },[city,unit])
    

    return (
        <div className="dropdown-container">
            <form  onSubmit={handleSubmit} className="form-container">
                <select 
                name="city" 
                className={`dropdown ${theme}` } 
                
                onChange={handleCity}
                size="1"
                onFocus={(e)=>e.target.size = 6}
                onBlur={(e)=>e.target.size=1}
                >
                    {
                        allCities.sort((a,b)=>a.localeCompare(b,"tr")).map((data, i) => (
                            <option className="dropdown-item" key={i} value={data}>{data}</option>
                        ))
                    }
                </select>
            </form>
        </div>
    )
}

export default Dropdown;
