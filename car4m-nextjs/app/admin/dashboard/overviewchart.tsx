import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Doanh thu theo tháng",
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          const value = context.raw; // Giá trị dữ liệu
          return `${value}VNĐ`; // Thêm đơn vị $
        },
      },
    },
  },
  
};

type Renevue = {
  month: number
  renevue: number
}

interface RevenueProps {
  list: Renevue[]
}

const OverviewChart: React.FC<RevenueProps> = ({ list }) => {
  // Chuẩn bị labels và data
  const chartData = useMemo(() => {
    // Tạo danh sách 12 tháng từ 1 đến 12
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    // Map doanh thu từ list sang dữ liệu biểu đồ
    const data = months.map((month) => {
      const found = list.find((item) => item.month === month);
      return found ? found.renevue : 0; // Nếu không có dữ liệu, mặc định là 0
    });

    return {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Revenue",
          data, // Thay bằng dữ liệu đã xử lý
          backgroundColor: "rgba(51, 187, 255, 0.5)",
        },
      ],
    };
  }, [list]); // Chỉ cập nhật khi `list` thay đổi

  return <Bar data={chartData} options={options} />;
};

export default OverviewChart;
