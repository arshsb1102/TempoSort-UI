import { useEffect, useState } from 'react';

export default function HomePage() {
  const [name, setName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setName(payload.name);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
      Hi {name || 'there'} 👋
    </div>
  );
}
