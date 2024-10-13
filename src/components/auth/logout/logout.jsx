import React from 'react';
import { useAuth } from '../../../contexts/authContext';

const LogoutButton = () => {
    const { logout } = useAuth();

    const handleLogout = async () => {
    try {
        await logout();
    } catch (error) {
        console.error('Failed to log out', error);
    }
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
        >
        Log Out
        </button>
    );
};

export default LogoutButton;