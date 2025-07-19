import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import NavBar from './components/NavBar';

export default function HomePage() {
    const [name, setName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            const name = decoded?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
            setName(name);
        }
    }, []);

    return (
        <>
            <NavBar />
            <div className="my-5 flex items-center justify-center text-xl font-semibold text-gray-900 dark:text-gray-100">
                <p>Hi {name || 'there'} 👋</p>
            </div>
            <CreateTask />
            <TaskList />
        </>
    );
}
