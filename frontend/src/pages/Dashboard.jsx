import Navbar from "../components/Navbar"
import Chart from "../components/Chart"

function Dashboard() {
  return (
    <>
    <div className="flex">
        <div><Navbar/></div>
        <div className="flex justify-center min-w-[800px] mt-2">
          <div><Chart/></div>
        </div>
    </div>
    </>
    
  )
}

export default Dashboard