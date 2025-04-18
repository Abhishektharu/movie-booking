import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { getBackend } from "../utils/api";
import { FiUsers, FiFilm, FiDollarSign, FiCalendar } from "react-icons/fi";
import {showDate} from "../utils/api";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMovies: 0,
    totalRevenue: 0,
    totalBookings: 0,
  });
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTimes, setShowTimes] = useState([]);
  console.log(showTimes);
  

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [usersRes, moviesRes, bookingsRes] = await Promise.all([
          axios.get(getBackend("/api/showUsers")),
          axios.get(getBackend("/api/movies")),
          axios.get(getBackend("/api/bookings/getAllBookings")),
        ]);

        setStats({
          totalUsers: usersRes.data.length,
          totalMovies: moviesRes.data.length,
          totalBookings: bookingsRes.data.length,
          totalRevenue: bookingsRes.data.reduce(
            (acc, booking) => acc + booking.price,
            0
          ),
        });

        // Mock monthly revenue data
        setMonthlyRevenue([12000, 15000, 18000, 20000, 22000, 25000]);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(()=>{
    const fetchShowTimes = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/showtimes/allshowtimes`);
        setShowTimes(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchShowTimes();
  },[]);
  

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="p-6  bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<FiUsers className="text-blue-500 text-3xl" />}
        />
        <StatCard
          title="Total Movies"
          value={stats.totalMovies}
          icon={<FiFilm className="text-purple-500 text-3xl" />}
        />
        {/* <StatCard
          title="Total Revenue"
          value={`RS ${stats.totalRevenue}`}
          icon={<FiDollarSign className="text-green-500 text-3xl" />}
        /> */}
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={<FiCalendar className="text-orange-500 text-3xl" />}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Monthly Revenue Chart */}
        <div className="bg-white rounded-xl shadow-md p-6 w-full lg:w-1/2">
          <h2 className="text-xl font-semibold mb-4">Monthly Revenue</h2>
          <Bar
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              datasets: [
                {
                  label: "Revenue",
                  data: monthlyRevenue,
                  backgroundColor: "rgba(59, 130, 246, 0.5)",
                  borderColor: "rgb(59, 130, 246)",
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: { display: true, text: "Monthly Revenue Overview" },
              },
            }}
          />
        </div>

        {/* Recent Bookings Table */}
        <div className="bg-white rounded-xl shadow-md p-6 w-full lg:w-1/2">
          <h2 className="text-xl font-semibold mb-4">Recent Shows</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Movie</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {showTimes.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">RS {item.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{showDate(item.show_date)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.show_time}</td>
                  </tr>
                ))}
                {showTimes.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No shows available
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
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center">
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
    {icon}
  </div>
);

export default AdminDashboard;
