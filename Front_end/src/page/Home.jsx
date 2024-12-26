import { Link } from 'react-router-dom';
import bunImage from '../images/Burger buns.jpg';
import pattyImage from '../images/patty types.jpg';
import toppingsImage from '../images/topping.jpg';
import saucesImage from '../images/sauces.jpg';
import '../styles/Home.css';

const Home = () => {
    return (
        <div className='body__size'>
            <h1 className='body__title'>Create Your Perfect Burger</h1>
                <div className='body__options'>
                <Link to="/customize">
                    <div>
                        <img src={bunImage} alt="bun" />
                        <h3>Choose Your Bun</h3>
                        <span>Slect from a variety of buns including sesame, whole wheat, and gluten-free options.</span>
                    </div>
                </Link>
                <Link to="/customize">
                    <div>
                        <img src={pattyImage} alt="patty" />
                        <h3>Choose Your Patty</h3>
                        <span>Pick from beef, chicken, veggie, or plant-based patties to suit your taste.</span>
                    </div>
                </Link>
                <Link to="/customize">
                    <div>
                        <img src={toppingsImage} alt="toppings" />
                        <h3>Choose Your toppings</h3>
                        <span>Add fresh toppings like lettuce, tomato, cheese, and pickles to your burger.</span>
                    </div>
                </Link>
                <Link to="/customize">
                    <div>
                        <img src={saucesImage} alt="sauces" />
                        <h3>Choose Your Sauces</h3>
                        <span>Complement your burger with sauces like ketchup, mustard, mayo, and BBQ sauce.</span>
                    </div>
                </Link>
                </div>
                <Link to="/customize">
                    <button className="navigate-button">Build Your Burger</button>
                </Link>
        </div>
    );
}

export default Home;
