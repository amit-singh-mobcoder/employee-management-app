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
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StatusConfirmModal from "../components/StatusConfirmModal";
import { CircleCheck, CirclePause } from 'lucide-react';

function Employees() {
  const { employeesList, setEmployeesList } = useContext(EmployeeContext);
  const [isLoading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteConfirmModal, setDeleteConfirmModel] = useState(false);
  const [showStatusConfirmModal, setStatusConfirmModel] = useState(false);

  useEffect(() => {
    const fetchEmployeesList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/employees/skills"
        );
        const responseData = response.data.data;
        setEmployeesList(responseData.filter((emp) => !emp.isDeleted));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchEmployeesList();
  }, [setEmployeesList]);

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
            <div
              className="flex items-center gap-2 border rounded-lg px-2 py-1 hover:border-indigo-500 duration-200 cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <TuneIcon className="text-gray-500 hover:text-indigo-500" />
              <button className="text-sm font-medium text-gray-700 hover:text-indigo-500">
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

            {showStatusConfirmModal && (
              <StatusConfirmModal
                employee={empDetails}
                onClose={() => setStatusConfirmModel(false)}
              />
            )}

            <table className="min-w-full text-left text-sm font-light">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 border-b font-semibold">#</th>
                  <th className="px-6 py-3 border-b font-semibold">Name</th>
                  <th className="px-6 py-3 border-b font-semibold">Email</th>
                  <th className="px-6 py-3 border-b font-semibold">Skills</th>
                  <th className="px-6 py-3 border-b font-semibold">Status</th>
                  <th className="px-6 py-3 border-b font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="6" className="text-center px-6 py-4">
                      Loading...
                    </td>
                  </tr>
                ) : currentData.length > 0 ? (
                  currentData.map((employee, index) => (
                    <tr
                      key={employee._id}
                      className="border-b hover:bg-gray-50 "
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {indexOfFirstItem + index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {employee.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {employee.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex gap-2 flex-wrap items-center">
                          {employee.skills.slice(0, 3).map((skill, idx) => (
                            <span
                              key={idx}
                              className="border border-indigo-500 text-indigo-500 rounded-full px-3 py-1 text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                          {employee.skills.length > 3 && (
                            <div className="relative group">
                              <span className="border text-indigo-500  rounded-full px-3 py-1 text-xs cursor-pointer">
                                More
                              </span>
                              <div className="absolute hidden group-hover:flex gap-4 bg-white  border border-indigo-500 rounded p-2 shadow-lg top-full left-0 mt-1 z-10">
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
                        <Menu
                          as="div"
                          className="relative inline-block text-left "
                        >
                          <MenuButton className="min-w-[140px] inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300">
                            {employee.status === "active"
                              ? <p className="text-gray-500 inline-flex gap-2"><CircleCheck size={20} color="green"/>Active</p>
                              : <p className="text-gray-500 inline-flex gap-2"><CirclePause size={20} color="red"/>Inactive</p>}
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="ml-2 h-5 w-5 text-gray-400"
                            />
                          </MenuButton>
                          <MenuItems className="absolute left-0 max-w-[140px]  z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              <MenuItem>
                                {employee.status === "active" ? (
                                  <button
                                    onClick={() => {
                                      setStatusConfirmModel(true),
                                        setEmpDetails({
                                          id: employee._id,
                                          name: employee.name,
                                          email: employee.email,
                                          skills: employee.skills,
                                        });
                                    }}
                                    className="flex gap-2 justify-center items-center px-4 py-2 text-md text-gray-700  "
                                  >
                                    <FiberManualRecordIcon
                                      style={{ color: "red" }}
                                    />
                                    Inactive
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => {
                                      setStatusConfirmModel(true),
                                        setEmpDetails({
                                          id: employee._id,
                                          name: employee.name,
                                          email: employee.email,
                                          skills: employee.skills,
                                        });
                                    }}
                                    className="flex gap-2 justify-center items-center px-4 py-2 text-md text-gray-700 "
                                  >
                                    <FiberManualRecordIcon
                                      style={{ color: "green" }}
                                    />
                                    Active
                                  </button>
                                )}
                              </MenuItem>
                            </div>
                          </MenuItems>
                        </Menu>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {employee.isDeleted ? (
                          <span className="px-4 py-2 bg-gray-500 text-white text-xs font-semibold rounded-lg cursor-not-allowed">
                            Deleted
                          </span>
                        ) : (
                          <div className="flex gap-2">
                            <button
                              className="px-4 py-2 bg-yellow-500 text-white text-xs font-semibold rounded-lg"
                              onClick={() => {
                                setShowUpdateModal(true);
                                setEmpDetails({
                                  id: employee._id,
                                  name: employee.name,
                                  email: employee.email,
                                  skills: employee.skills,
                                });
                              }}
                            >
                              Update
                            </button>
                            <button
                              className="px-4 py-2 bg-red-500 text-white text-xs font-semibold rounded-lg"
                              onClick={() => {
                                setDeleteConfirmModel(true);
                                setEmpDetails({
                                  id: employee._id,
                                  name: employee.name,
                                  email: employee.email,
                                  skills: employee.skills,
                                });
                              }}
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
                    <td colSpan="6" className="text-center px-6 py-4">
                      No employees found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center py-4">
              <Stack spacing={2}>
                <Pagination
                  count={Math.ceil(employeesList.length / itemsPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employees;
