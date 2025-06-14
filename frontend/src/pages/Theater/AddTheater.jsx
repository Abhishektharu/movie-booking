import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getBackend } from "../../utils/api";

const AddTheater = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null); // "success" or "error"

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(getBackend("/api/theaters/addTheater"), data);
      console.log("Response:", res.data);

      // Show success message
      setMessage(res.data.message);
      setMessageType("success");

      reset(); // Clear form fields
      setTimeout(() => navigate("/admin/dashboard"), 2000);
    } catch (error) {
      console.error("Error adding theater:", error.response?.data || error.message);

      // Show error message
      const errorMessage = error.response?.data?.message || "Failed to add theater!";
      setMessage(errorMessage);
      setMessageType("error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 p-4">
      <div className="bg-gray-100 p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Add Theater</h2>

        {/* Display Backend Message */}
        {message && (
          <div
            className={`text-center font-semibold mb-4 p-2 rounded-lg ${
              messageType === "success" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium">Theater Name</label>
            <input
              type="text"
              {...register("name", { required: "Theater name is required" })}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter theater name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Location</label>
            <input
              type="text"
              {...register("location", { required: "Location is required" })}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter location"
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Total Seats</label>
            <input
              type="number"
              {...register("total_screens", {
                required: "Total screens is required",
                min: { value: 1, message: "Must have at least 1 screen" },
              })}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Total seats"
            />
            {errors.total_screens && <p className="text-red-500 text-sm">{errors.total_screens.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all font-semibold flex justify-center items-center"
          >
            Add Theater
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTheater;
