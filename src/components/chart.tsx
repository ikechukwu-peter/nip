import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  labels: string[];
  data: number[];
}

export const AnalyticsChart: React.FC<ChartProps> = ({ labels, data }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Number of Clicks",
        data: data,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "transparent",
        pointBorderColor: "transparent",
        tension: 0.5,
      },
    ],
  };

  const options = {
    plugins: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: "Number of Clicks",
      },
      legend: {
        display: false,
        position: "bottom" as const,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        grid: { display: false },
        title: {
          display: true,
          text: "URLs",
          font: {
            size: 2,
          },
        },
      },
    },
  };

  return (
    <div className=" w-full h-full bg-900 rounded-md shadow-md shadow-800 p-[0.9rem] text-md border-2 border-200">
      <Line data={chartData} options={options} />
    </div>
  );
};
