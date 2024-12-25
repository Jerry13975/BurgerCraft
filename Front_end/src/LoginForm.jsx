import {useState} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './styles/Login.css';

const LoginForm = ({onLoginSuccess}) => {
    const [formData, setFormData] = useState({email: '', password: ''});
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/auth/login', formData, {
                withCredentials: true,
            });
            const {accessToken, refreshToken} = response.data;
            onLoginSuccess(accessToken, refreshToken);
        } catch {
            setError('Invalid login credentials');
        }
    };

    return (
        <div className="login-form">
            <input
                className="input-field"
                type="text"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
                className="input-field"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button className="login-button" onClick={handleLogin}>Login</button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

LoginForm.propTypes = {
    onLoginSuccess: PropTypes.func.isRequired
}

export default LoginForm;