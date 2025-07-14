// pages/index.js
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-4xl font-bold text-violet-700 mb-4">Welcome to TempoSort</h1>
      <p className="text-lg text-gray-700 mb-8">Your personal task scheduler</p>
      <div className="space-x-4">
        <Link href="/signup" className="bg-violet-600 text-white px-6 py-2 rounded hover:bg-violet-700">
          Sign Up
        </Link>
        <Link href="/login" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Login
        </Link>
      </div>
    </div>
  )
}
