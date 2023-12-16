import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { Cartcontext } from "../Context/Cartcontext";




const Cart = () => {
    const history = useNavigate();
    const { cart, increaseAmount, decreaseAmount, total } = useContext(Cartcontext);


    console.log(cart);
    if (cart == undefined || !cart.length) {
        return <h3>Empty Cart</h3>

    }
    return (
        <section className="cart">
            <header>
                <h2>My Cart</h2>
            </header>
            <div className="cart-wrapper">
                {cart.map(({ id, title, price, image, amount }) => (
                    <article key={id} className="cart-item">
                        <div className="image">
                            <img src={image} alt="cart item" />
                        </div>
                        <div className="details">
                            <p>{title}</p>
                            <p>$ {price}</p>
                        </div>
                        <div className="amount">
                            <button onClick={() => increaseAmount(id)}></button>
                            <p>{amount}</p>
                            <button onClick={() => decreaseAmount(id, amount)}></button>
                        </div>
                    </article>
                ))}
            </div>
            <div>
                <h3>Total: $ {total}</h3>
            </div>
            <div>
                <button className="customButton" onClick={() => history.push("/checkout")}>Checkout</button>
            </div>
        </section>
    );
};

export default Cart;
