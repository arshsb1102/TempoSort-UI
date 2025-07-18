
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Settings } from 'lucide-react';
import SettingsModal from './SettingsModal';

const NavBar = () => {
    const [name, setName] = useState('');
    const router = useRouter();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login'); // Redirect if not logged in
        } else {
            try {
                const decoded = JSON.parse(atob(token.split('.')[1]));
                const username = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
                setName(username);
            } catch (e) {
                console.error("Invalid token");
                localStorage.removeItem('token');
                router.push('/login');
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <>
            <nav className="bg-gray-100 px-6 py-3 flex justify-between items-center shadow-md">
                <div className="text-xl font-bold text-blue-600">TempoSort</div>
                <div className="flex items-center gap-4">
                    <Settings
                        onClick={() => setIsSettingsOpen(true)}
                        className="h-5 w-5 text-gray-600 hover:text-gray-800 cursor-pointer"
                    />
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </div>
            </nav>
            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </>
    );
}

export default NavBar