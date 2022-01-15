import {createContext,useState} from "react"

const BackgroundContext = createContext()

export const BackgroundProvider = ({children}) => {

    const [theme,setTheme]= useState("blue")

    const values = {
        theme,
        setTheme
    }

    return <BackgroundContext.Provider value={values}>{children}</BackgroundContext.Provider>
} 




export default BackgroundContext ;