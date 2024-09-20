import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";

function AddEmployee() {
  const [skillData, setSkillData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [backendError, setBackendError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [nameValidationError, setNameValidationError] = useState("");
  const [emailValidationError, setEmailValidationError] = useState("");

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

  const handleOnBlur = () => {
    setNameValidationError("");
    setEmailValidationError("");
  };

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

  const handleSubmit = async () => {
    const skills = selectedSkills.map((skill) => skill.value);
    if (skills.length === 0) {
      setBackendError("Employee should have at least 1 skill");
    }
    if (
      !nameValidationError &&
      !emailValidationError &&
      !(skills.length === 0)
    ) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/employee",
          {
            name,
            email,
            skills,
          }
        );
        setSuccessMessage(response.data.message);
        setBackendError("");
        handleAfterSubmit();
      } catch (error) {
        setBackendError(error.response.data.message);
        setSuccessMessage("");
      }
    }
  };

  const handleAfterSubmit = () => {
    setName("");
    setEmail("");
    setSelectedSkills([]);

    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Form Container */}
      <div className="flex-1 flex justify-center items-center p-6">
        <div className="w-full max-w-lg bg-white border rounded-lg shadow-md p-6">
          {/* Name and Email Fields */}
          <h2 className="text-2xl font-semibold mb-6">Employee Information</h2>
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
              fullWidth
              required
            />
            {emailValidationError && (
              <p className="text-red-500">{emailValidationError}</p>
            )}
          </Box>

          {/* Skills Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Skills</h3>
            <Select
              isMulti
              name="skills"
              options={skillData}
              className="basic-multi-select mb-4"
              classNamePrefix="select"
              value={selectedSkills}
              onChange={setSelectedSkills}
            />
          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-indigo-600 text-white text-lg px-4 py-2 rounded hover:bg-indigo-700 transition-colors duration-300"
            onClick={handleSubmit}
          >
            Submit
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

export default AddEmployee;
