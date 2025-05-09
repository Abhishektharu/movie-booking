import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getBackend } from '../../utils/api';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId } = location.state || {};
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookingId) {
      navigate('/');
      return;
    }

    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(getBackend(`/api/bookings/${bookingId}`));
        setBooking(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId, navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-600 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Your tickets have been booked successfully</p>
        </div>

        {booking && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="font-semibold text-lg mb-2">Movie Details</h2>
              <p className="text-gray-700">{booking.movie_title}</p>
              <p className="text-gray-600">{booking.theater_name}</p>
              <p className="text-gray-600">
                {new Date(booking.show_date).toLocaleDateString()} at {booking.show_time}
              </p>
            </div>

            <div className="border-b pb-4">
              <h2 className="font-semibold text-lg mb-2">Seat Information</h2>
              <p className="text-gray-600">Seats: {booking.seats}</p>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => navigate('/user/dashboard')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingConfirmation;