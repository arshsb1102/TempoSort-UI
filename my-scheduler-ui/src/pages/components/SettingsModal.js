import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Switch } from '@headlessui/react';
import axios from 'axios';
import { DateTime } from 'luxon';

export default function SettingsModal({
    isOpen = false,
    onClose = () => { }
}) {
    const [digestEnabled, setDigestEnabled] = useState(false);
    const [digestTime, setDigestTime] = useState('09:00'); // default local time
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            const fetchSettings = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/getInfo`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    setDigestEnabled(res.data.isDigestEnabled);

                    if (res.data.digestTime) {
                        // Convert UTC time (e.g., "03:30:00") to user's local time
                        const utc = DateTime.fromFormat(res.data.digestTime, 'HH:mm:ss', { zone: 'utc' });
                        const local = utc.setZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
                        setDigestTime(local.toFormat('HH:mm'));
                    }
                } catch (err) {
                    console.error("Failed to fetch user settings", err);
                    onClose();
                } finally {
                    setLoading(false);
                }
            };
            fetchSettings();
        }
    }, [isOpen]);

    const handleSave = async () => {
        const token = localStorage.getItem('token');

        // Convert selected local time to UTC
        const local = DateTime.fromFormat(digestTime, 'HH:mm', {
            zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        });
        const utc = local.toUTC().toFormat('HH:mm:ss');

        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/user/preferences`, {
            isDigestEnabled: digestEnabled,
            digestTime: utc,
        }, {
            headers: { Authorization: `Bearer ${token}` },
        });

        onClose();
    };

    const timeOptions = Array.from({ length: 24 }, (_, h) => {
        const hr = h.toString().padStart(2, '0');
        return `${hr}:00`;
    });

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
                    <Dialog.Title className="text-lg font-bold mb-4">User Settings</Dialog.Title>

                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-medium text-gray-700">Daily Digest</span>
                                <Switch
                                    checked={digestEnabled}
                                    onChange={setDigestEnabled}
                                    className={`${digestEnabled ? 'bg-blue-600' : 'bg-gray-300'
                                        } relative inline-flex h-6 w-11 items-center rounded-full`}
                                >
                                    <span
                                        className={`${digestEnabled ? 'translate-x-6' : 'translate-x-1'
                                            } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                                    />
                                </Switch>
                            </div>

                            {digestEnabled && (
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Digest Time (your local time)
                                    </label>
                                    <select
                                        value={digestTime}
                                        onChange={(e) => setDigestTime(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    >
                                        {timeOptions.map((time) => (
                                            <option key={time} value={time}>
                                                {time}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </>
                    )}

                    <div className="mt-6 flex justify-end gap-2">
                        <button onClick={onClose} className="text-gray-600 px-4 py-2 hover:underline">
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}
