import {useState, useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkLoginStatus = async () => {
        const accessToken = Cookies.get('accessToken');
        const refreshToken = Cookies.get('refreshToken');

        if(!accessToken || !refreshToken) {
            setIsLoggedIn(false);
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get('/api/auth/verify', {
                headers: {Authorization: `Bearer ${accessToken}`},
            });
            if (response.status === 200) {
                setIsLoggedIn(true);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                try {
                    const refreshResponse = await axios.post('/api/auth/refresh-token', {
                        refreshToken,
                    });
                    if (refreshResponse.data.accessToken) {
                        Cookies.set('accessToken', refreshResponse.data.accessToken);
                        setIsLoggedIn(true);
                    } else {
                        setIsLoggedIn(false);
                    }
                } catch {
                    setIsLoggedIn(false);
                }
            }
        };
        setLoading(false);
    };

    const login = (accessToken, refreshToken) => {
        Cookies.set('accessToken', accessToken, { expires: 7 });
        Cookies.set('refreshToken', refreshToken, { expires: 7 });
        setIsLoggedIn(true);
    };
    
    const logout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        setIsLoggedIn(false);
    };

    useEffect(() => {
        checkLoginStatus();
    }, []);

    return {
        isLoggedIn,
        loading,
        login,
        logout,
        checkLoginStatus,
    };
};

export default useAuth;