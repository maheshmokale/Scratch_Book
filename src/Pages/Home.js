import React, { useContext } from "react";
import { generateClient } from 'aws-amplify/api';
import Hero from "../Component/Hero";
const client = generateClient();


const Home = () => {




    return (
        <>
            <Hero />
            <section className="featured">
                <header className="featured-head">
                    <h3>Featured Collection</h3>
                </header>

            </section>
        </>
    )
}

export default Home;