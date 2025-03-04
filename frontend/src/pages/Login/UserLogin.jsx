import { useState } from "react";
import axios from "axios";

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success messages

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData, {
        withCredentials: true //allow cookie to store 
      });

      setSuccess("Login successful");
      console.log("User Logged In:", res.data);

      // Store user data (if needed)
      localStorage.setItem("user", JSON.stringify(res.data.user));  

      // Example: Redirect user to dashboard (if using React Router)
      // navigate("/dashboard");

    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
      console.log(error);
      
    }
  };

  return (
    <div>
      <h2>User Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default UserLogin;
