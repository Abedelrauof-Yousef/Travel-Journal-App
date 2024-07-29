import { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { useNavigate } from "react-router-dom";

function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
                navigate('/login');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleClick = () => {
        signOut(auth).then(() => {
            navigate('/login');
        });
    };

    if (!user) {
        return null;
    }

    // Extract the first name from displayName
    const getFirstName = (displayName) => {
        return displayName ? displayName.split(' ')[0] : 'User';
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px',
    };

    const contentStyle = {
        textAlign: 'center',
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };

    const welcomeMessageStyle = {
        fontSize: '24px',
        color: '#333',
        marginBottom: '20px',
    };

    const buttonStyle = {
        color: '#fff',
        border: 'none',
        padding: '12px 24px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
        backgroundColor: '#007bff',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
        width: '120px',
    };

    const buttonHoverStyle = {
        backgroundColor: '#0056b3',
    };

    return (
        <div style={containerStyle}>
            <div style={contentStyle}>
                <h1 style={welcomeMessageStyle}>Welcome, {getFirstName(user.displayName)}</h1>
                <button
                    onClick={handleClick}
                    style={buttonStyle}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Profile;
