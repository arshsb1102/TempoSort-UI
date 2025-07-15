"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingTask, setEditingTask] = useState(null);
    const [deletingTaskId, setDeletingTaskId] = useState(null);
    const [form, setForm] = useState({ title: "", description: "", dueAt: "", priority: 0 });

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/Task`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(response.data);
        } catch (err) {
            setError("Failed to fetch tasks.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleEdit = (task) => {
        setEditingTask(task);
        setForm({
            title: task.title,
            description: task.description,
            dueAt: task.dueAt.slice(0, 16),
            priority: task.priority,
        });
    };

    const submitEdit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/Task/${editingTask.taskId}`, form, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEditingTask(null);
            fetchTasks();
        } catch (err) {
            alert("Update failed");
        }
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/Task/${deletingTaskId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDeletingTaskId(null);
            fetchTasks();
        } catch (err) {
            alert("Delete failed");
        }
    };

    if (loading) return <div className="p-4">Loading tasks...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {tasks.length === 0 ? (
                <p>No tasks found.</p>
            ) : (
                tasks.map((task) => (
                    <div key={task.id} className="bg-white shadow p-4 rounded-2xl relative">
                        <h2 className="text-xl font-bold">{task.title}</h2>
                        <p className="text-gray-600 mb-2">{task.description}</p>
                        <p className="text-sm text-blue-500">
                            Due: {new Date(task.dueAt).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                            Priority: {["Low", "Medium", "High"][task.priority]}
                        </p>
                        <div className="mt-4 flex gap-2">
                            <button
                                onClick={() => handleEdit(task)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => setDeletingTaskId(task.taskId)}
                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            )}

            {/* Edit Modal */}
            {editingTask && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg relative">
                        <button
                            onClick={() => setEditingTask(null)}
                            className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
                        <form onSubmit={submitEdit} className="space-y-4">
                            <input
                                name="title"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                className="w-full border p-2 rounded"
                                required
                            />
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                className="w-full border p-2 rounded"
                                required
                            />
                            <input
                                name="dueAt"
                                type="datetime-local"
                                value={form.dueAt}
                                onChange={(e) => setForm({ ...form, dueAt: e.target.value })}
                                className="w-full border p-2 rounded"
                                required
                            />
                            <select
                                name="priority"
                                value={form.priority}
                                onChange={(e) => setForm({ ...form, priority: parseInt(e.target.value) })}
                                className="w-full border p-2 rounded"
                            >
                                <option value={0}>Low</option>
                                <option value={1}>Medium</option>
                                <option value={2}>High</option>
                            </select>
                            <button
                                type="submit"
                                className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deletingTaskId && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm w-full">
                        <p className="text-lg font-semibold mb-4">
                            Are you sure you want to delete this task?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={confirmDelete}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setDeletingTaskId(null)}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskList;
