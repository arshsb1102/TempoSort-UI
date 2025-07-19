<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
    <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md space-y-4"
    >
        <h2 className="text-2xl font-semibold text-center text-violet-700 dark:text-violet-400">
            Create an Account
        </h2>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />

        <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />

        <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
        />
        <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-sm text-blue-500 dark:text-blue-400 ml-2"
        >
            {showPassword ? "Hide" : "Show"}
        </button>

        <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
        />

        {form.password && confirmPassword && form.password !== confirmPassword && (
            <p className="text-red-500 text-sm">Passwords do not match</p>
        )}

        <button
            disabled={form.password !== confirmPassword || !form.email || !form.name || !form.password}
            type="submit"
            className="w-full bg-violet-600 dark:bg-violet-500 hover:bg-violet-700 hover:dark:bg-violet-600 text-white py-2 rounded"
        >
            Sign Up
        </button>

        <p className="text-sm text-center dark:text-gray-300">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
                Login
            </a>
        </p>
    </form>
</div>
