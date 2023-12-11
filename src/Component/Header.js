import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <header className="main-head">
            <nav>
                <h1 className='website-heading'>Bookish Delights</h1>
                <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
                    <li style={{ marginRight: '15px' }}>
                        <Link to="/">Home</Link>
                    </li>
                    <li style={{ marginRight: '15px' }}>
                        <Link to="/books">Books</Link>
                    </li>
                    <li style={{ marginRight: '15px' }}>
                        <Link to="/cart">Cart</Link>
                    </li>
                    <li style={{ marginRight: '15px' }}>
                        <Link to="/checkout">Checkout</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;


