import React from 'react';
import { Link } from 'react-router-dom';
import Item from './Item';

const Portfolio = (props) => {
    console.log(props)

    return (
        <div>
            <h1>My Work</h1>
            <p>Checkout the following things I've done</p>
            <Link to="/portfolio/1">Item One</Link>
            <Link to="/portfolio/2">Item Two</Link>
        </div>
    );
}

export default Portfolio;