import Navbar from "../components/Navbar";
import Chart from "../components/Chart";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Dashboard Content */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border rounded-lg shadow-md p-6">
            {/* Title */}
            <h2 className="text-2xl font-semibold mb-4">Employee Skills Ratio</h2>
            
            {/* Chart */}
            <div className="flex justify-center">
              <Chart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
