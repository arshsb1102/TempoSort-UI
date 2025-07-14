import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

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
        <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
            Hi {name || 'there'} 👋
        </div>
    );
}
