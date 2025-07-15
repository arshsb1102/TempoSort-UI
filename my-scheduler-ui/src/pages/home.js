import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';

export default function HomePage() {
    const [name, setName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            const name = decoded?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]; // or decoded.sub / decoded.email etc.
            setName(name);
        }
    }, []);

    return (
        <>
            <div className="my-5 flex items-center justify-center text-xl font-semibold">
                <p>Hi {name || 'there'} 👋</p>
            </div>
            <CreateTask />
            <TaskList />
        </>
    );
}
