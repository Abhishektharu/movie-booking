import { useState } from 'react';
import axios from 'axios';

const AdminLogin = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        
        
        try {
            const res = await axios.post(`${API_BASE_URL}/api/auth/admin/login`, formData);

            console.log("Login Successful:", res.data);

            // Handle login success (e.g., redirect or store token in state/context)
            if(res !== null ){

                localStorage.setItem("access-admin", res.data.token);
                localStorage.setItem("admin", JSON.stringify(res.data.user));
            }

        } catch (error) {
            console.error("Login Failed:", error.response?.data || error.message);
        }
    };

    return (
        <div>
            <h2>Admin Login</h2>
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

export default AdminLogin;
