import { Pie } from "react-chartjs-2";

const PieChart = ({ chartData, options }: any) => {
  return <Pie data={chartData} options={options} />;
};

export default PieChart;
