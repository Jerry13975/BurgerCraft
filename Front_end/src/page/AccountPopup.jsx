import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import PropTypes from 'prop-types';
import '../styles/Popup.css';

const AccountPopup = ({onClose, onLoginSuccess}) => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => setIsLogin(!isLogin);

    return (
        <div className="popup-overlay">
          <div className="popup-content">
            <button onClick={onClose} className="close-btn">X</button>
            {isLogin ? (
              <LoginForm onLoginSuccess={onLoginSuccess} />
            ) : (
              <RegisterForm onRegisterSuccess={onLoginSuccess} />
            )}
            <div className="switch-form">
              {isLogin ? (
                <p>
                  {`Don't have an account? `}
                  <button onClick={toggleForm} className="toggle-btn">
                    Create an account
                  </button>
                </p>
              ) : (
                <p>
                  {`Already have an account? `}
                  <button onClick={toggleForm} className="toggle-btn">
                    Login
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      );
};

AccountPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onLoginSuccess: PropTypes.func.isRequired
}

export default AccountPopup;