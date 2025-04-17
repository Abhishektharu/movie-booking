import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiFilm, FiClock, FiCalendar, FiDollarSign } from "react-icons/fi";
import { showDate } from "../utils/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const UserDashboard = () => {
  const [userStats, setUserStats] = useState({
    totalBookings: 0,
    totalSpent: 0,
    upcomingMovies: 0,
    watchedMovies: 0,
  });
  const [bookingHistory, setBookingHistory] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem('user')).id;
        const [bookingsRes, upcomingRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/bookings/user/${userId}`),
          axios.get(`${API_BASE_URL}/api/bookings/user/${userId}/upcoming`)
        ]);

        // Calculate user statistics
        setUserStats({
          totalBookings: bookingsRes.data.length,
          totalSpent: bookingsRes.data.reduce((acc, booking) => acc + booking.price, 0),
          upcomingMovies: upcomingRes.data.length,
          watchedMovies: bookingsRes.data.filter(booking => new Date(booking.show_date) < new Date()).length
        });

        setBookingHistory(bookingsRes.data);
        setUpcomingBookings(upcomingRes.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Bookings"
          value={userStats.totalBookings}
          icon={<FiCalendar className="text-blue-500 text-3xl" />}
        />
        <StatCard
          title="Total Spent"
          value={`RS ${userStats.totalSpent}`}
          icon={<FiDollarSign className="text-green-500 text-3xl" />}
        />
        <StatCard
          title="Upcoming Movies"
          value={userStats.upcomingMovies}
          icon={<FiClock className="text-purple-500 text-3xl" />}
        />
        <StatCard
          title="Watched Movies"
          value={userStats.watchedMovies}
          icon={<FiFilm className="text-orange-500 text-3xl" />}
        />
      </div>

      {/* Upcoming Bookings */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Bookings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Movie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seats</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {upcomingBookings.map((booking, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.movie_title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{showDate(booking.show_date)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.show_time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.seats.join(', ')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">RS {booking.price}</td>
                </tr>
              ))}
              {upcomingBookings.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No upcoming bookings</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking History */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Booking History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Movie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seats</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookingHistory.map((booking, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.movie_title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{showDate(booking.show_date)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.show_time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.seats.join(', ')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">RS {booking.price}</td>
                </tr>
              ))}
              {bookingHistory.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No booking history</td>
                </tr>
              )}
            </tbody>
          </table>
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

export default UserDashboard;
