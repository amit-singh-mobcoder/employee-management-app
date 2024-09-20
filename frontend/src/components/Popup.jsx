import React, { useEffect, useState, useContext, useRef } from "react";
import { X, Filter } from "lucide-react";
import Select from "react-select";
import { EmployeeContext } from "../context/EmployeeContext";
import axios from "axios";
import { PrevSelectedSkillContext } from "../context/PrevSelectedSkill";

function Popup({ onClose }) {
  const popupRef = useRef();
  const closePopup = (e) => {
    if (popupRef.current === e.target) {
      onClose();
    }
  };

  const { setEmployeesList } = useContext(EmployeeContext);
  const [skillData, setSkillData] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const {prevSelectedSkill, setPrevSelectedSkill} = useContext(PrevSelectedSkillContext)

  useEffect(() => {
    const fetchSkills = async () => {
      const response = await axios.get("http://localhost:8000/api/skill");
      const fetchedData = response.data.data;

      const options = fetchedData.map((skill) => ({
        value: skill.skillId,
        label: skill.name,
      }));

      setSkillData(options);

      if(prevSelectedSkill?.length > 0){
        setSelectedSkills(prevSelectedSkill);
      }
    };

    fetchSkills();
  }, []);

  const handleApplyFilter = async () => {
    try {
      if (selectedSkills.length === 0) {
        onClose();
      }

      let customURL = "";
      let customIdNo = 1;
      for (let i = 0; i < selectedSkills.length; i++) {
        if (i === selectedSkills.length - 1) {
          customURL = customURL + `id${customIdNo}=${selectedSkills[i].value}`;
        } else {
          customURL = customURL + `id${customIdNo}=${selectedSkills[i].value}&`;
        }
        customIdNo++;
      }

      const response = await axios.get(`http://localhost:8000/api/employees?${customURL}`);
      const responseData = response.data.data;
      setEmployeesList(responseData.filter((emp) => emp.isDeleted === false));
      setPrevSelectedSkill(selectedSkills);
      onClose();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      ref={popupRef}
      onClick={closePopup}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-24"
    >
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-8">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* Popup Content */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">Filter Employees by Skills</h2>
          <Select
            isMulti
            name="skills"
            options={skillData}
            className="basic-multi-select"
            classNamePrefix="select"
            value={selectedSkills} 
            onChange={setSelectedSkills}
          />
          <button
            className="flex items-center justify-center gap-2 text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-800 px-4 py-2 rounded-lg"
            onClick={handleApplyFilter}
          >
            <Filter size={18} />
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
