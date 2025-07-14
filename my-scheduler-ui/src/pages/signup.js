// pages/signup.js
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Signup() {
    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");

    const router = useRouter()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('https://localhost:7177/api/Auth/signup', form)
            alert('Signed up successfully! Please verify your email.')
            router.push('/login')
        } catch (err) {
            setError(err?.response?.data || 'Something went wrong')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-semibold text-center text-violet-700">Create an Account</h2>

                {error && <p className="text-red-600 text-sm text-center">{error}</p>}

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded"
                />

                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
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

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                    required
                />

                {form.password && confirmPassword && form.password !== confirmPassword && (
                    <p className="text-red-500 text-sm">Passwords do not match</p>
                )}
                <button
                    disabled={form.password !== confirmPassword || !form.email || !form.name || !form.password}
                    type="submit"
                    className="w-full bg-violet-600 text-white py-2 rounded hover:bg-violet-700"
                >
                    Sign Up
                </button>

                <p className="text-sm text-center">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Login
                    </a>
                </p>
            </form>
        </div>
    )
}
