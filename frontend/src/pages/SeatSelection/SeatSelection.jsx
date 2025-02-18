import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BookBtn from "../../components/Buttons/BookBtn";

function SeatSelectionPage() {
  const { showtimeId } = useParams();
  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/seats?showtime_id=${showtimeId}`)
      .then(response => setSeats(response.data))
      .catch(error => console.error("Error fetching seats:", error));
  }, [showtimeId]);
  console.log(seats);
  

  const toggleSeatSelection = (seatId) => {
    setSelectedSeats(prev =>
      prev.includes(seatId) ? prev.filter(id => id !== seatId) : [...prev, seatId]
    );
  };

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    navigate("/checkout", { state: { showtimeId, selectedSeats } });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Select Your Seats</h1>

      <div className="grid grid-cols-5 gap-2">
        {seats.length > 0 ? (
          seats.map(seat => (
            <button
              key={seat.id}
              className={`p-2 w-16 text-center rounded 
                ${seat.status === "booked" ? "bg-red-500 cursor-not-allowed" : ""}
                ${selectedSeats.includes(seat.id) ? "bg-blue-500 text-white" : "bg-gray-200"}
              `}
              onClick={() => seat.status !== "booked" && toggleSeatSelection(seat.id)}
              disabled={seat.status === "booked"}
            >
              {seat.seat_number}
            </button>
          ))
        ) : (
          <p>Loading seats...</p>
        )}
      </div>

      <div className="mt-4">
        <BookBtn label="Proceed to Payment" onClick={handleProceed} />
      </div>
    </div>
  );
}

export default SeatSelectionPage;
