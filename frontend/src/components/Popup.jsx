import React from 'react'
import { X } from 'lucide-react'
import Select from "react-select";

function Popup() {
    const [skillData, setSkillData] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
  
    useEffect(() => {
      const fetchSkills = async () => {
        const response = await axios.get("http://localhost:8000/api/skill");
        const fetchedData = response.data.data;
  
        const options = fetchedData.map((skill) => ({
          value: skill.skillId,
          label: skill.name,
        }));
  
        setSkillData(options);
      };
  
      fetchSkills();
    }, []);
  
  
    return(
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm">
        <div>
          <button><X/></button>
          <div>
            <h1>Select skills to apply filter</h1>
            <Select
                isMulti
                name="skills"
                options={skillData}
                className="basic-multi-select mb-4"
                classNamePrefix="select"
                value={selectedSkills}
                onChange={setSelectedSkills}
              />
            <p></p>
          </div>
        </div>
      </div>
    )
}

export default Popup