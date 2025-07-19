'use client'
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function ConfirmDelete({
    goBack = () => { }
}) {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        setError('');
        setDeleting(true);
        debugger;
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Not authenticated');

            const decoded = jwtDecode(token);
            debugger;
            const email = decoded.email || decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];

            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/Auth/delete-user`, {
                email,
                password,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert('Account deleted successfully');
            localStorage.removeItem('token');
            router.push('/');
        } catch (err) {
            setError(err.response?.data || 'Invalid password or error deleting account');
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-md w-full space-y-4">
                <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 text-center">
                    Delete Your Account
                </h2>
                <p className="text-center text-sm text-gray-700 dark:text-gray-300">
                    This action will permanently delete your account and all associated tasks. Please confirm your password to continue.
                </p>

                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />

                {error && (
                    <p className="text-sm text-red-500 text-center">{error}</p>
                )}

                <button
                    onClick={handleDelete}
                    disabled={deleting || !password}
                    className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-60"
                >
                    {deleting ? 'Deleting...' : 'Delete My Account'}
                </button>

                <button
                    onClick={goBack}
                    className="w-full text-sm text-gray-600 dark:text-gray-300 text-center hover:underline"
                >
                    Cancel and go back
                </button>
            </div>
        </div>
    );
}
