import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { Outlet } from "react-router-dom";

const AuthContext = createContext();  //creating Context

export const AuthProvider = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            console.log("User updated:", user);
        }
    }, [user]);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            setLoading(false);
            return;
        }
        try {
            const decoded = jwtDecode(token);

            //  Check if token is expired
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                console.warn("Token expired");
                localStorage.removeItem("accessToken");
                setUser(null);
            } else {
                setUser({
                    username: decoded.username,
                    id: decoded.id,
                    email: decoded.email,
                });
              
            }
        } catch (error) {
            console.error("Error decoding token:", error);
            localStorage.removeItem("accessToken");
            setUser(null);
        }

        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            <Outlet />
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
