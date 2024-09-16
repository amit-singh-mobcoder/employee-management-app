import { NavLink } from "react-router-dom";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";
import PeopleAltSharpIcon from "@mui/icons-material/PeopleAltSharp";
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';

function Navbar() {
  return (
    <div className="bg-[#4F46E5] min-w-[280px] max-w-[280px] min-h-screen border-r-2 p-4">
      <div className="flex flex-col gap-2">
        {/* Dashboard */}
        <div>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "flex gap-3 items-center bg-[#4338CA] text-white font-semibold rounded-md p-2"
                : "flex gap-3 items-center hover:bg-[#4338CA] text-white font-medium rounded-md p-2"
            }
          >
            <SpaceDashboardRoundedIcon fontSize="large" className="text-white" />
            Dashboard
          </NavLink>
        </div>

        {/* Employees */}
        <div>
          <NavLink
            to="/employees"
            className={({ isActive }) =>
              isActive
                ? "flex gap-3 items-center bg-[#4338CA] text-white font-semibold rounded-md p-2"
                : "flex gap-3 items-center hover:bg-[#4338CA] text-white font-medium rounded-md p-2"
            }
          >
            <PeopleAltSharpIcon fontSize="large" className="text-white" />
            Employees
          </NavLink>
        </div>

        {/* Add Employee */}
        <div>
          <NavLink
            to="/addemployee"
            className={({ isActive }) =>
              isActive
                ? "flex gap-3 items-center bg-[#4338CA] text-white font-semibold rounded-md p-2"
                : "flex gap-3 items-center hover:bg-[#4338CA] text-white font-medium rounded-md p-2"
            }
          >
            <PersonAddAltRoundedIcon fontSize="large" className="text-white" />
            Add Employee
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
