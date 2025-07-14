import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';

export default function LoginPage() {
    const router = useRouter();
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${baseUrl}/api/Auth/login`, {
                email,
                password,
            });
            localStorage.setItem('bearer', res?.data?.bearerFormat);
            localStorage.setItem('token', res?.data?.token);
            router.push('/home');
            setError(null)
        } catch (err) {
            setError(err.response?.data || 'Login failed')
        }
    }

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-semibold text-center">Login</h2>
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                    required
                />

                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-sm text-blue-500 ml-2"
                >
                    {showPassword ? "Hide" : "Show"}
                </button>


                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Log In
                </button>
                <p className="text-sm text-center">
                    Dont have an account?{' '}
                    <a href="/signup" className="text-blue-600 hover:underline">
                        Sign Up
                    </a>
                </p>
            </form>
        </div>
    )
}
