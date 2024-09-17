import { createContext, useState } from "react";

export const EmployeeContext = createContext(null);

export const EmployeeProvider = (props) => {
    const [employeesList, setEmployeesList] = useState([])
    return (
        <EmployeeContext.Provider value={{employeesList, setEmployeesList}}>
            {props.children}
        </EmployeeContext.Provider>
    )
}

