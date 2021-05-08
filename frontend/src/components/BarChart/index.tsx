import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleSuccessRate } from 'types/sale';
import { round } from 'utils/format';
import { BASE_URL } from 'utils/requests';

type SeriesData = {
  name: string;
  data: number[];
}

type ChartData = {
  labels: { 
    categories: string[] 
  };
  series: SeriesData[];
}

function BarChart() {
  const [chartData, setChartData] = useState<ChartData>(
    {
      labels: {categories: []},
        series: [
          {
            name: '% Success',
            data: []
          }
        ]
    }
  );

  const options = {
    plotOptions: {
      bar: {
        horizontal: true,
      }
    },
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/sales/success-by-seller`)
    .then(response => {
      const listSalesSuccessRate = response.data as SaleSuccessRate[];

      const categories = listSalesSuccessRate.map(item => item.sellerName);
      const data = listSalesSuccessRate.map(item => round(
        ( 100.0 * item.deals / item.visited ), 1
      ));

      setChartData({
        labels: {categories},
        series: [{ name: '% Success', data }]
      });
    });
  }, []);
  
  return (
    <Chart
      options={{ ...options, xaxis: chartData.labels }}
      series={chartData.series}
      type="bar"
      height="240"
    />
  );
}

export default BarChart;