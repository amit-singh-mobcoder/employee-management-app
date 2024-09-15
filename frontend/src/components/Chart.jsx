import { PieChart } from '@mui/x-charts/PieChart';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Chart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/dashboard');
        const fetchedData = response.data.data;
        
        const formattedData = fetchedData.map((item, index) => ({
          id: index,            
          value: item.empCount,  
          label: item.name,      
        }));

        
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching the chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <PieChart
      series={[
        {
          data: chartData.length > 0
            ? chartData
            : [
                { id: 0, value: 10, label: 'series A' }, // Default values while waiting for API response
                { id: 1, value: 15, label: 'series B' },
                { id: 2, value: 20, label: 'series C' },
                { id: 3, value: 20, label: 'series D' },
                { id: 4, value: 20, label: 'series E' },
              ],
        },
      ]}
      width={600} // Set width of the chart
      height={300} // Set height of the chart
    />
  );
}

export default Chart;
