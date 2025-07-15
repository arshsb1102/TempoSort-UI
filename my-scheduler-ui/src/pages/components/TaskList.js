"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const fetchTasks = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("No token found. Please login.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/Task`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setTasks(response.data); // assuming API returns array of tasks
        } catch (err) {
            setError("Failed to fetch tasks.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchTasks();

        const interval = setInterval(() => {
            fetchTasks();
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    if (loading) return <div className="p-4">Loading tasks...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {tasks.length === 0 ? (
                <p>No tasks found.</p>
            ) : (
                tasks.map((task) => (
                    <div key={task.id} className="bg-white shadow p-4 rounded-2xl">
                        <h2 className="text-xl font-bold">{task.title}</h2>
                        <p className="text-gray-600 mb-2">{task.description}</p>
                        <p className="text-sm text-blue-500">
                            Due: {new Date(task.dueAt).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                            Priority: {["Low", "Medium", "High"][task.priority]}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
};

export default TaskList;
