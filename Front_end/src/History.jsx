import {useEffect, useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import './styles/Acc.css';

const History = ({isLoggedIn}) => {
    const [orders, setOrder] = useState([]);
    const [isHistoryVisible, setIsHistoryVisible] = useState(false);

    const token = Cookies.get('accessToken');

    useEffect(() => {
        if(isLoggedIn && token) {
            axios.get('/api/history', {
                headers: {Authorization: `Bearer ${token}`},
            }).then((response) => {
                setOrder(response.data);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [isLoggedIn, token]);

    const toggleHistoryVisibility = () => {
        setIsHistoryVisible(!isHistoryVisible); 
    };

    return (
        <div>
            <h1 onClick={toggleHistoryVisibility} className={`toggle_acc ${isHistoryVisible ? 'clicked' : ''}`}>
                History
            </h1>
            {isHistoryVisible && (
                <div className='acc-containers'>
                {orders.length > 0 ? (
                    orders.map((order, index) => (
                        <div key={index} className="order-item">
                            <h3>Order {index + 1}</h3>
                            <div className="order-details">
                                <p><strong>Bun:</strong> {order.burger.bun}</p>
                                <p><strong>Patty:</strong> {order.burger.patties.join(", ")}</p>
                                <p><strong>Toppings:</strong> {order.burger.toppings.join(", ")}</p>
                                <p><strong>Sauces:</strong> {order.burger.sauces.join(", ")}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty">
                        <p>No History Yet</p>
                    </div>
                )}
            </div>
            )}
        </div>
    );
}

History.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default History;