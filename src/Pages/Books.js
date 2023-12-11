import React, { useState, useEffect } from "react";
import { generateClient } from 'aws-amplify/api';
import { listBooks } from "../graphql/queries";
import { uploadData, getUrl, remove } from 'aws-amplify/storage';

import {
    Button,
    Flex,
    Heading,
    Text,
    TextField,
    View,
    Image,
} from "@aws-amplify/ui-react";
import {
    createBook as createBookMutation,
    deleteBook as deleteBookMutation,
} from "../graphql/mutations";
import Hero from "../Component/Hero";
const client = generateClient();


const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    async function fetchBooks() {
        const apiData = await client.graphql({ query: listBooks });
        const booksFromAPI = apiData.data.listBooks.items;
        await Promise.all(
            booksFromAPI.map(async (book) => {
                if (book.image) {
                    //const url = await Storage.get(book.name);


                    try {
                        const url = await getUrl({
                            key: book.image
                        });
                        console.log('File URL ', url);
                        book.image = url.url;

                    } catch (error) {
                        console.log('Error ', error);
                    }

                }
                return book;
            })
        );
        setBooks(booksFromAPI);
    }
    async function deleteBook({ id, name }) {
        const newBooks = books.filter((book) => book.id !== id);
        setBooks(newBooks);


        try {
            await remove({ key: newBooks });
        } catch (error) {
            console.log('Error ', error);
        }

        //await Storage.remove(name);
        await client.graphql({
            query: deleteBookMutation,
            variables: { input: { id } },
        });
    }
    return (
        <>
            <h1 className="add-books-heading">Available Books</h1>
            <View margin="3rem 0">
                <Flex
                    direction="row"
                    justifyContent="centre"
                    alignItems="centre"
                    style={{ fontWeight: 'bold' }}
                >
                    <div style={{ width: '20%', textAlign: 'left', fontSize: '20px', paddingLeft: '70px' }}>Book Name</div>
                    <div style={{ width: '30%', textAlign: 'left', fontSize: '20px', paddingLeft: '60px' }}>Book Description</div>
                    <div style={{ width: '30%', textAlign: 'left', fontSize: '20px', paddingLeft: '70px' }}>Book Cover</div>
                    <div style={{ width: '10%', textAlign: 'left', fontSize: '20px', paddingLeft: '80px' }}>Delete</div>

                </Flex>

                {books.map((book) => (
                    <Flex
                        key={book.id || book.name}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Text as="strong" fontWeight={600} style={{ width: '20%', textAlign: 'left', fontSize: '15px' }}>
                            {book.name}
                        </Text>
                        <Text as="span" style={{ width: '30%', textAlign: 'left', fontSize: '15px' }}>
                            {book.description}
                        </Text>
                        <div style={{ width: '30%', textAlign: 'left', fontSize: '15px' }}>
                            {book.image && (
                                <Image
                                    src={book.image}
                                    alt={`visual aid for ${book.name}`}
                                    style={{ width: 100 }}
                                />
                            )}
                        </div>
                        <Button style={{ width: '10%' }} className="customButton" variation="link" onClick={() => deleteBook(book)}>
                            Delete book
                        </Button>
                    </Flex>
                ))}
            </View>




        </>
    )
}

export default Books;