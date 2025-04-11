import React, { useState } from 'react';
import { getBackend } from '../../utils/api';
import axios from 'axios';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email) {
            setStatus({
                type: 'error',
                message: 'Please enter an email address'
            });
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(getBackend('/api/email'), { email });
            
            setStatus({
                type: 'success',
                message: 'Thank you for subscribing!'
            });
            setEmail('');
            
        } catch (error) {
            setStatus({
                type: 'error',
                message: error.response?.data?.message || 'Failed to subscribe. Please try again.'
            });
            console.error('Newsletter subscription error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-900 py-12 px-4">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                    Subscribe to Our Newsletter
                </h2>
                <p className="text-gray-400 mb-8">
                    Stay updated with new movies and exclusive offers
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full sm:w-96 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={loading}
                    />
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:bg-blue-800 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {loading ? (
                            <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
                        ) : (
                            'Subscribe'
                        )}
                    </button>
                </form>

                {status.message && (
                    <div className={`mt-4 p-3 rounded-lg ${
                        status.type === 'success' 
                            ? 'bg-green-800 text-green-100' 
                            : 'bg-red-800 text-red-100'
                    }`}>
                        {status.message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Newsletter;