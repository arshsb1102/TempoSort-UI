<div className="flex flex-col items-center justify-center min-h-screen px-4 dark:bg-gray-900 dark:text-white">
    <h1 className="text-2xl font-semibold mb-4">Verify Your Email</h1>
    <p className="mb-6 text-center text-gray-600 dark:text-gray-400">
        Please verify your email to continue using TempoSort.
    </p>

    <input
        type="email"
        placeholder="Enter your email"
        className="border px-4 py-2 rounded w-full max-w-sm mb-4 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        value={email}
        onChange={e => setEmail(e.target.value)}
    />

    <button
        onClick={resendVerification}
        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 hover:dark:bg-blue-600 text-white px-6 py-2 rounded"
    >
        Resend Verification Email
    </button>

    <p className="text-sm text-green-600 dark:text-green-400 mt-4">{message}</p>

    <a href="/login" className="text-blue-500 dark:text-blue-400 mt-6 underline text-sm">
        Already verified? Login
    </a>
</div>
