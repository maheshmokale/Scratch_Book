import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { processOrder } from "../graphql/mutations";
import { generateClient } from 'aws-amplify/api';

import { listBooks } from '../graphql/queries';


const client = generateClient();
const Bookcontext = createContext();

const Bookprovider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [featured, setFeatured] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchBooks();
    }, []);

    const checkout = async (orderDetails) => {

        const payload = {
            id: uuidv4(),
            ...orderDetails
        };
        try {

            await client.graphql({
                query: processOrder,
                variables: {
                    input: payload
                }
            });
            //await client.graphql(graphqlOperation(processOrder, { input: payload }));
            console.log("Order is successful");
        } catch (err) {
            console.log(err);
        }
    };

    const fetchBooks = async () => {
        try {
            setLoading(true);
            // Switch authMode to API_KEY for public access
            const result = await client.graphql({ query: listBooks });
            console.log(result);

            const books = result.data.listBooks.items;
            const featured = books.filter((book) => {
                return !!book.featured;
            });
            setBooks(books);
            setFeatured(featured);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Bookcontext.Provider value={{ books, featured, loading, checkout }}>
            {children}
        </Bookcontext.Provider>
    );
};

export { Bookcontext, Bookprovider };