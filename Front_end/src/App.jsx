import {useState} from 'react';
import BurgerProvider from './BurgerContext';
import Header from './Header';
import Home from './Home';
import Customize from './Customize';
import Order from './Order';
import AccountPopup from './AccountPopup';
import useAuth from './hooks/useAuth';
import Acc from './Acc';
import Nav from './Nav';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';


import {useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';
import Loading from './Loading';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2400);

    return () => clearTimeout(timer);
  }, []);


  const {isLoggedIn, login, logout} = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'auto'; 
    }
    return () => {
      document.body.style.overflow = 'auto'; 
    };
  }, [showPopup]);

  const handlAccClick = () => {
    if(!isLoggedIn) {
      setShowPopup(true);
    } else {
      navigate('/acc');
    }
  };

  return (
    <div className="app">
      {isLoading ? (
        <Loading />
      ) : (
        <>
        <div className="grid">
          <div className="header">
            <Header title="BurgerBuilder"/>
            <Nav onAccClick={handlAccClick}/>
          </div>
          <BurgerProvider>
            <div className='body'>
              <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/customize' element={<Customize setShowPopup={setShowPopup} isLoggedIn={isLoggedIn} />} />
                <Route path='/order' element={<Order setShowPopup={setShowPopup} isLoggedIn={isLoggedIn} />} />
                <Route path='/acc' element={<Acc isLoggedIn={isLoggedIn} logout={logout}/>} />
              </Routes>
            </div>
          </BurgerProvider>
          <div className='footer'>
            <Footer />
          </div>

          {showPopup && (
            <AccountPopup
              onClose={() => setShowPopup(false)}
              onLoginSuccess={(accessToken, refreshToken) => {
                login(accessToken, refreshToken);
                setShowPopup(false);
                navigate('/acc');
              }}
            />
          )}
        </div>
        </>
      )}
    </div>
  );
}

export default App;
