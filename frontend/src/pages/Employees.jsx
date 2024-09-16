import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import TuneIcon from "@mui/icons-material/Tune";

function Employees() {
  const [employeesList, setEmployeesList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeesList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/employees/skills"
        );
        setEmployeesList(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchEmployeesList();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="overflow-x-auto shadow-md rounded-lg bg-white dark:bg-gray-800">
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
                    {/* <Modal/> */}
                    <div className="flex items-center gap-2 border rounded px-2 py-1 hover:border-indigo-500 duration-200 cursor-pointer">
                      <TuneIcon className="text-gray-500 hover:text-indigo-500" />
                      <button className="text-sm font-medium text-gray-700 hover:text-indigo-500 focus:outline-none">
                        Filters
                      </button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="4" className="text-center px-6 py-4">
                      Loading...
                    </td>
                  </tr>
                ) : employeesList.length > 0 ? (
                  employeesList.map((employee, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {employee.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {employee.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex gap-2 flex-wrap">
                          {employee.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="border border-indigo-500 text-indigo-500 rounded-full px-3 py-1 text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-6 py-4 text-center" colSpan="4">
                      No employees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employees;
