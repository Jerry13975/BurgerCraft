import FavoritesPage from './Favorite';
import History from './History';
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles/Acc.css';

const Acc = ({isLoggedIn, logout}) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    return(
        <div>
            {isLoggedIn ? (
            <>
            <div className='acc-page-container'>
                <FavoritesPage isLoggedIn={isLoggedIn}/>
                <History isLoggedIn={isLoggedIn}/>
            </div>
            <button className='log-out-button'onClick={handleLogout}>Log Out</button>
            </>
        ) : (
            <p>You are not logged in.</p>
        )}
        </div>
    ) 
}

Acc.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
}

export default Acc;