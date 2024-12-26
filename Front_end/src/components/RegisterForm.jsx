import {useState} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../styles/Register.css';

const RegisterForm = ({onRegisterSuccess}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if(formData.password !== formData.confirmPassword){
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('/api/auth/register', formData, {
                withCredentials: true,
            });
            const {accessToken, refreshToken} = response.data;
            onRegisterSuccess(accessToken, refreshToken);
        } catch (err) {
            if (err.response && err.response.data.message === 'Email already exists') {
                setError('Email is already taken');
            } else {
                setError('Error creating account');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-form">
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
            <input
                className="input-field"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
            <button className="register-button" onClick={handleRegister} disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
            </button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

RegisterForm.propTypes = {
    onRegisterSuccess: PropTypes.func.isRequired
}

export default RegisterForm;