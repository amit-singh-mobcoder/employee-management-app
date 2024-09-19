import React, { useState, useEffect, useRef } from "react";
import { X, Filter } from "lucide-react";
import Select from "react-select";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

function UpdateEmployee({ onClose, employee }) {
  const popupRef = useRef();
  const closePopup = (e) => {
    if (popupRef.current === e.target) {
      onClose();
    }
  };

  const navigate = useNavigate();
  const [skillData, setSkillData] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameValidationError, setNameValidationError] = useState("");
  const [emailValidationError, setEmailValidationError] = useState("");
  const [backendError, setBackendError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      const response = await axios.get("http://localhost:8000/api/skill");
      const fetchedData = response.data.data;
      console.log(fetchedData);

      const options = fetchedData.map((skill) => ({
        value: skill.skillId,
        label: skill.name,
      }));

      setSkillData(options);
      setEmail(employee.email);
      setName(employee.name);

      const skillMap = new Map(
        options.map((skill) => [skill.label, skill.value])
      );
      const existedSkills = employee.skills.map((skillName) => {
        const skillId = skillMap.get(skillName);
        return { value: skillId, label: skillName };
      });
      //   console.log("employee existed skill",existedSkills);
      setSelectedSkills(existedSkills);
    };

    fetchSkills();
  }, []);

  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);

    const namePattern = /^[A-Za-z\s'-]+$/;

    if (val.trim() === "") {
      setNameValidationError("Name is required");
    } else if (!namePattern.test(val.trim())) {
      setNameValidationError("Invalid Name");
    } else {
      setNameValidationError("");
    }
  };

  // Validation logic for email format
  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };
  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);

    if (val.trim() === "") {
      setEmailValidationError("Email is required");
    } else if (!isEmailValid(val)) {
      setEmailValidationError("Invalid email format");
    } else {
      setEmailValidationError("");
    }
  };

  const handleOnBlur = () => {
    setNameValidationError("")
    setEmailValidationError("")
  }

  const handleUpdate = async () => {
    const skills = selectedSkills.map((skill) => skill.value);
    if(skills.length === 0){
        setBackendError("Employee should have at least 1 skill")
    }
    if (
      !nameValidationError &&
      !emailValidationError &&
      !(skills.length === 0)
    ) {
      console.log("haaaaaa");
      try {
        const response = await axios.patch(
          `http://localhost:8000/api/employee/${employee.id}`,
          { name, email, skills }
        );
        setSuccessMessage(response.data.message);
        setBackendError("");
        // console.log(response.data);
        if (response.data.StatusCode === 200) {
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
      } catch (error) {
        setBackendError(error.response.data.message);
        setSuccessMessage("");
      }
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
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400"
        >
          <X size={24} />
        </button>

        {/* Popup Content */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">
            Update Employee Details
          </h2>

          <Box
            component="form"
            sx={{ "& > :not(style)": { mb: 3, width: "100%" } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="name"
              type="text"
              label="Name"
              variant="outlined"
              value={name}
              onChange={handleNameChange}
              onBlur={handleOnBlur}
              placeholder={employee.name}
              fullWidth
              required
            />
            {nameValidationError && (
              <p className="text-red-500">{nameValidationError}</p>
            )}
            <TextField
              id="email"
              type="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleOnBlur}
              placeholder={employee.email}
              fullWidth
              required
            />
            {emailValidationError && (
              <p className="text-red-500">{emailValidationError}</p>
            )}
          </Box>
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
            onClick={handleUpdate}
            className="flex items-center justify-center gap-2 text-white bg-yellow-600 hover:bg-green-600 focus:ring-4 focus:ring-yellow-300  px-4 py-2 rounded-lg duration-200"
          >
            Update
          </button>
          {/* Error or Success Message */}
          {backendError && (
            <p className="mt-4 text-red-500 font-semibold">{backendError}</p>
          )}
          {successMessage && (
            <p className="mt-4 text-green-500 font-semibold">
              {successMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpdateEmployee;
