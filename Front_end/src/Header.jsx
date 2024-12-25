import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({title}) => {
    return (
        <header className="sub_header">
            <Link to='/'>
                <h1>{title}</h1>
            </Link>
        </header>
    )
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header