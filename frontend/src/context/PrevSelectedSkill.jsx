import { createContext, useState } from "react";

export const PrevSelectedSkillContext = createContext(null)

export const PrevSelectedSkillProvider = (props) => {
    const [prevSelectedSkill, setPrevSelectedSkill] = useState([])
    return(
        <PrevSelectedSkillContext.Provider value={{prevSelectedSkill, setPrevSelectedSkill}}>
            {props.children}
        </PrevSelectedSkillContext.Provider>
    )
}