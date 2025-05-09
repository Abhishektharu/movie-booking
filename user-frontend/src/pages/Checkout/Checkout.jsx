import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getBackend } from '../../utils/api';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showtimeId, selectedSeats } = location.state || {};
  const [showDetails, setShowDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  console.log(showDetails);
  

  useEffect(() => {
    if (!showtimeId || !selectedSeats) {
      navigate('/');
      return;
    }

    const fetchShowDetails = async () => {
      try {
        const response = await axios.get(getBackend(`/api/showtimes/${showtimeId}/details`));
        setShowDetails(response.data);
      } catch (err) {
        setError('Failed to fetch show details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShowDetails();
  }, [showtimeId, selectedSeats, navigate]);

  const handlePayment = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('user')).id;
      const response = await axios.post(getBackend('/api/bookings'), {
        userId,
        showtimeId,
        seatIds: selectedSeats
      });

      if (response.data.success) {
        navigate('/booking-confirmation', { 
          state: { bookingId: response.data.bookingId }
        });
      }
    } catch (err) {
      setError('Failed to process payment');
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        
        {showDetails && (
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h2 className="font-semibold">Movie Details</h2>
              <p>{showDetails.movie_title}</p>
              <p>{new Date(showDetails.show_date).toLocaleDateString()} at {showDetails.show_time}</p>
            </div>

            <div className="border-b pb-4">
              <h2 className="font-semibold">Selected Seats</h2>
              <p>{selectedSeats.length} seats selected</p>
              <p className="text-sm text-gray-600">
                {selectedSeats.map(seatId => 
                  showDetails.seats.find(s => s.id === seatId)?.seat_number
                ).join(', ')}
              </p>
            </div>

            <div className="border-b pb-4">
              <h2 className="font-semibold">Price Details</h2>
              <p>Price per ticket: Rs. {showDetails.price}</p>
              <p>Total Amount: Rs. {showDetails.price * selectedSeats.length}</p>
            </div>

            <button
              onClick={handlePayment}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Pay Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;