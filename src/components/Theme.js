import React, {useContext,useEffect,useState}from 'react'

import BackgroundContext from "../context/BackgroundContext"

function Theme() {

    const {theme, setTheme}=useContext(BackgroundContext);

    const changeTheme = () =>{
        if(theme==="blue"){
            setTheme("light")
        }else if(theme==="light"){
            setTheme("dark")
        }else if(theme==="dark"){
            setTheme("netflix")
        }else if(theme==="netflix"){
            setTheme("live")
        }else if(theme==="live"){
            setTheme("lizard")
        }else if(theme==="lizard"){
            setTheme("blue")
        }
    }

    return (
        <div className="theme">
            <button className="theme-button" onClick={changeTheme}>Change Theme</button>
        </div>
    )
}

export default Theme;
