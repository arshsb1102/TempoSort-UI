"use client";

import { useState } from "react";
import axios from "axios";

const CreateTask = () => {
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        title: "",
        description: "",
        dueAt: "",
        priority: 0,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "priority" ? parseInt(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Token not found");
            return;
        }

        setLoading(true);
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/Task`, form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setShowModal(false);
            setForm({ title: "", description: "", dueAt: "", priority: 0 });
            setError("");
        } catch (err) {
            console.error(err);
            setError("Failed to create task");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="my-5 flex items-center justify-center text-xl font-semibold">
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
                >
                    Create Task
                </button>
            </div>

            {
                showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg relative">
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
                            >
                                &times;
                            </button>
                            <h2 className="text-xl font-semibold mb-4">New Task</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    name="title"
                                    type="text"
                                    placeholder="Title"
                                    value={form.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full border p-2 rounded"
                                />
                                <textarea
                                    name="description"
                                    placeholder="Description"
                                    value={form.description}
                                    onChange={handleChange}
                                    required
                                    className="w-full border p-2 rounded"
                                />
                                <input
                                    name="dueAt"
                                    type="datetime-local"
                                    value={form.dueAt}
                                    onChange={handleChange}
                                    required
                                    className="w-full border p-2 rounded"
                                />
                                
                                <select
                                    name="priority"
                                    value={form.priority}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                >
                                    <option value={0}>Urgent</option>
                                    <option value={1}>Important</option>
                                    <option value={2}>Normal</option>
                                    <option value={3}>Suggestive</option>
                                </select>
                                {error && <div className="text-red-500 text-sm">{error}</div>}
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
                                    disabled={loading}
                                >
                                    {loading ? "Creating..." : "Create Task"}
                                </button>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default CreateTask;
