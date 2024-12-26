import {Link, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';


const Nav = ({onAccClick}) => {
    const location = useLocation();
    return(
        <nav className="nav">
            <ul>
                <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
                <li><Link to="/customize" className={location.pathname === '/customize' ? 'active' : ''}>Customize Burger</Link></li>
                <li><Link to="/order" className={location.pathname === '/order' ? 'active' : ''}>Order Summary</Link></li>
                <li>
                    <a 
                        href="/acc"
                        className={location.pathname === '/acc' ? 'active' : ''}
                        onClick={(e) => {
                            e.preventDefault();
                            onAccClick();
                        }}
                        >
                            Your Account
                        </a>
                </li>
            </ul>
        </nav>
    )
}

Nav.propTypes = {
    onAccClick: PropTypes.func.isRequired,
}

export default Nav