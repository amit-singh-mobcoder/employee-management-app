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

  const handleSubmit = async () => {
    const skills = selectedSkills.map((skill) => skill.value);

    try {
      const response = await axios.post("http://localhost:8000/api/employee", {
        name,
        email,
        skills,
      });
      setSuccessMessage(response.data.message);
      setBackendError("");
    } catch (error) {
      setBackendError(error.response.data.message);
      setSuccessMessage("");
    }
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
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
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
            <p className="mt-4 text-green-500 font-semibold">{successMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
