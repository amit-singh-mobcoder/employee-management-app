import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import TuneIcon from "@mui/icons-material/Tune";
import { EmployeeContext } from "../context/EmployeeContext";
import Popup from "../components/Popup";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import UpdateEmployee from "./UpdateEmployee";
import DeleteConfirm from "../components/DeleteConfirm";

function Employees() {
  const { employeesList, setEmployeesList } = useContext(EmployeeContext);
  const [isLoading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteConfirmModal, setDeleteConfirmModel] = useState(false);

  useEffect(() => {
    const fetchEmployeesList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/employees/skills"
        );
        console.log(response.data.data);
        const responseData = response.data.data;
        setEmployeesList(responseData.filter((emp) => emp.isDeleted === false));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchEmployeesList();
  }, []);

  // to send employee details on the updateEmployee and delete confirm modal 
  const [empDetails, setEmpDetails] = useState({
    id: "",
    name: "",
    email: "",
    skills: [],
  });

  /**
   * Pagination logic
   */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = employeesList.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Filter Button */}
          <div className="flex justify-end">
            <div className="flex items-center gap-2 border rounded-lg px-2 py-1 hover:border-indigo-500 duration-200 cursor-pointer">
              <TuneIcon
                className="text-gray-500 hover:text-indigo-500"
                onClick={() => setShowModal(true)}
              />
              <button
                className="text-sm font-medium text-gray-700 hover:text-indigo-500 focus:outline-none"
                onClick={() => setShowModal(true)}
              >
                Filters
              </button>
            </div>
          </div>

          {/* Table content */}
          <div className="overflow-x-auto shadow-md rounded-lg bg-white dark:bg-gray-800 mt-2">
            {showModal && <Popup onClose={() => setShowModal(false)} />}
            {showUpdateModal && (
              <UpdateEmployee
                employee={empDetails}
                onClose={() => setShowUpdateModal(false)}
              />
            )}
            {showDeleteConfirmModal && (
              <DeleteConfirm
                employee={empDetails}
                onClose={() => setDeleteConfirmModel(false)}
              />
            )}

            <table className="min-w-full text-left text-sm font-light">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 border-b font-semibold">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3 border-b font-semibold">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 border-b font-semibold">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 border-b font-semibold">
                    Skills
                  </th>
                  <th scope="col" className="px-6 py-3 border-b font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="text-center px-6 py-4">
                      Loading...
                    </td>
                  </tr>
                ) : currentData.length > 0 ? (
                  currentData.map((employee, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {indexOfFirstItem + index + 1} {/* Adjusted index */}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {employee.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {employee.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex gap-2 flex-wrap items-center justify-start">
                          {/* Show first 3 skills */}
                          {employee.skills.slice(0, 3).map((skill, idx) => (
                            <span
                              key={idx}
                              className="border border-indigo-500 text-indigo-500 rounded-full px-3 py-1 text-xs"
                            >
                              {skill}
                            </span>
                          ))}

                          {/* View More' if there are more than 3 skills */}
                          {employee.skills.length > 3 && (
                            <div className="relative group">
                              <span className="border text-indigo-500 rounded-full px-3 py-1 text-xs cursor-pointer">
                                More
                              </span>

                              {/* remaining skills on hover */}
                              <div className="absolute hidden group-hover:flex gap-4 bg-white border border-indigo-500 rounded-full p-2 shadow-lg top-full left-0 mt-1 z-10">
                                {employee.skills.slice(3).map((skill, idx) => (
                                  <span
                                    key={idx}
                                    className="text-indigo-500 text-xs"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        {/* employee edit and delete button */}
                        {employee.isDeleted ? (
                          // <button className="">Deleted</button>

                          <span className="px-4 py-2 cursor-not-allowed  bg-gray-500 text-white text-xs font-semibold rounded-lg">
                            Deleted
                          </span>
                        ) : (
                          <div className="flex gap-2 justify-start">
                            <button
                              className="px-4 py-2 bg-yellow-500 text-white text-xs font-semibold rounded-lg"
                              onClick={() => {
                                setShowUpdateModal(true),
                                  setEmpDetails({
                                    id: employee._id,
                                    name: employee.name,
                                    email: employee.email,
                                    skills: employee.skills,
                                  });
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                setDeleteConfirmModel(true),
                                  setEmpDetails({
                                    id: employee._id,
                                    name: employee.name,
                                    email: employee.email,
                                    skills: employee.skills,
                                  });
                              }}
                              className="px-4 py-2 bg-red-500 text-white text-xs font-semibold rounded-lg"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-6 py-4 text-center" colSpan="5">
                      No employees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-center mt-10">
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(employeesList.length / itemsPerPage)} // Total pages
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                color="primary"
              />
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employees;
