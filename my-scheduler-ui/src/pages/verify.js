import { useState } from "react";
import axios from "axios";

export default function VerifyEmail() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const resendVerification = async () => {
        try {
            await axios.post(`${baseUrl}/api/Auth/resend-verification?Email=${email}`);
            setMessage("Verification email sent. Please check your inbox.");
        } catch (err) {
            setMessage(err.response?.data || "Failed to resend.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <h1 className="text-2xl font-semibold mb-4">Verify Your Email</h1>
            <p className="mb-6 text-center text-gray-600">
                Please verify your email to continue using TempoSort.
            </p>

            <input
                type="email"
                placeholder="Enter your email"
                className="border px-4 py-2 rounded w-full max-w-sm mb-4"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />

            <button
                onClick={resendVerification}
                className="bg-blue-600 text-white px-6 py-2 rounded"
            >
                Resend Verification Email
            </button>

            <p className="text-sm text-green-600 mt-4">{message}</p>

            <a href="/login" className="text-blue-500 mt-6 underline text-sm">
                Already verified? Login
            </a>
        </div>
    );
}
