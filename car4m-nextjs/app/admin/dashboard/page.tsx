'use client'

import { useEffect, useState } from "react";
import OverviewChart from "./overviewchart";
import { fetchRevenueMonth, fetchTopCar } from "@/app/services/OrderService";
import { fetchAllCar } from "@/app/services/CarServices";
import { fetchAllUser } from "@/app/services/UserServices";

const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

type Renevue = {
  month: number
  renevue: number
}

type TopRent = {
  userId: number
  name: string
  rentalCount: number
}

const Dashboard = () => {
  const [total, setTotal] = useState(0)
  const [countUser, setCountUser] = useState(0)
  const [countCar, setCountCar] = useState(0)
  const [countOrder, setCountOrder] = useState(0)
  const [listRevenue, setListRevenue] = useState<Renevue[]>([])
  const [top, setTop] = useState<TopRent[]>([])
  const year = new Date().getFullYear()

  const fetchRevenueData = async () => {
    // Tạo danh sách các tháng từ 1 đến 12
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    // Lấy doanh thu từng tháng bằng cách gọi fetchRevenueMonth
    const revenueData = await Promise.all(
      months.map(async (month) => {
        const respone = await fetchRevenueMonth(year, month);
        const renevue = respone.data
        return { month, renevue };
      })
    );

    return revenueData;
  };

  const fetchAndLogRevenue = async () => {
    let count = 0
    const data = await fetchRevenueData();
    data.map((item) => {
      if (item.renevue) count += item.renevue
      return item
    })
    setTotal(count)
    setListRevenue(data)
    //console.log(data);
  };

  const getAllCar = async () => {
    try {
      const respone = await fetchAllCar()
      setCountCar(respone.data.totalElements)
    } catch (error) {
      console.log('Loi khi lay so luong car', error)
    }
  }

  const getAllUser = async () => {
    try {
      const respone = await fetchAllUser()
      setCountUser(respone.data.totalElements)
    } catch (error) {
      console.log('Loi khi lay so luong user', error)
    }
  }

  const getAllRent = async () => {
    try {
      const respone = await fetchAllUser()
      setCountUser(respone.data.totalElements)
    } catch (error) {
      console.log('Loi khi lay so luong user', error)
    }
  }

  const getTopRenevue = async () => {
    try {
      const respone = await fetchTopCar()
      setTop(respone.data)
    } catch (error) {
      console.log('Loi khi lay so luong user', error)
    }
  }

  useEffect(() => {
    fetchAndLogRevenue()
    getAllCar()
    getAllUser()
    getTopRenevue()
  }, [])

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xxl font-medium">Dashboard</h1>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {[
          { title: "Tổng doanh thu", value: total, change: "+20.1%" },
          { title: "Người dùng", value: countUser, change: "+180.1%" },
          { title: "Xe cho thuê", value: countCar, change: "+19%" },
          { title: "Lượt thuê", value: countOrder, change: "+201" },
        ].map((stat, index) => (
          <div
            key={index}
            className="p-4 bg-white shadow rounded-lg text-center"
          >
            <h2 className="text-md font- text-gray-500">{stat.title}</h2>
            <p className="text-xx font-medium text-lowblue">{stat.value}</p>
            {/* <span className="text-sm text-green-500">{stat.change}</span> */}
          </div>
        ))}
      </div>

      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-xx font-medium mb-4">Overview</h2>
          <OverviewChart list={listRevenue} />
        </div>

        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-xx font-medium mb-4">Top doanh thu</h2>
          <ul>
            {top.map((sale, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-2 border-b border-line"
              >
                <span>{sale.name}</span>
                <span className="text-green-500">+{sale.rentalCount} VNĐ</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
