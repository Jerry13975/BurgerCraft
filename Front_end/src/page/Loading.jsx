import '../styles/Loading.css';
import {useEffect} from 'react';

const Loading = () => {
    useEffect(() => {
        const letters = document.querySelectorAll('.loading__title span');
        letters.forEach((letter, index) => {
            letter.style.animationDelay = `${index * 0.1}s`;
        });
    }, []);
    return (
        <div className="loading">
            <h2 className='loading__title'>
                <span>B</span>
                <span>u</span>
                <span>i</span>
                <span>l</span>
                <span>d</span>
                <span> Y</span>
                <span>o</span>
                <span>u</span>
                <span>r </span>
                <span>B</span>
                <span>u</span>
                <span>r</span>
                <span>g</span>
                <span>e</span>
                <span>r</span>
            </h2>
        </div>
    )
}

export default Loading;