import {createContext,useState} from "react"

const TemperatureUnitContext= createContext()

export const TemperatureUnitProvider = ({children}) => {

        const [unit,setUnit] = useState("metric")
        

        const values = {
            unit,
            setUnit,
        }

    return <TemperatureUnitContext.Provider value={values}>{children}</TemperatureUnitContext.Provider>
}



export default TemperatureUnitContext;