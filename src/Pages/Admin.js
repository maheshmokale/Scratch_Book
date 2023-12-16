

import '@aws-amplify/ui-react/styles.css';

import React, { useState, useEffect } from "react";
import { generateClient } from 'aws-amplify/api';
import { listBooks } from "../graphql/queries";
import { uploadData, getUrl } from 'aws-amplify/storage';

import { Button, Flex, TextField, View, Authenticator } from "@aws-amplify/ui-react";
import { createBook as createBookMutation, deleteBook as deleteBookMutation, } from "../graphql/mutations";

const client = generateClient();


function Admin() {
    //const { user, signOut } = useAuthenticator((context) => [context.user]);

    const [books, setBooks] = useState([]);

    useEffect(() => { fetchBooks(); }, []);



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
    async function createBook(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const image = form.get("image");
        const data = {
            name: form.get("name"),
            description: form.get("description"),
            image: image.name,
        };
        if (!!data.image) {
            try {
                const result = await uploadData({
                    key: image.name,
                    data: image,

                    options: {
                        contentType: 'image/jpeg'
                    }
                }).result;
            } catch (error) {
                console.log('Error : ', error);
            }
        }

        //await Storage.put(data.name, image);

        await client.graphql({
            query: createBookMutation,
            variables: { input: data },
        });
        fetchBooks();
        event.target.reset();
    }

    return (



        <>
            <Authenticator loginMechanisms={['username']} signUpAttributes={['email']}>
                {({ signOut, user }) => (
                    <View className="Admin">
                        <h1 className="add-books-heading">Add Books</h1>
                        <Button onClick={signOut} className='customButton'>Sign Out</Button>

                        <View as="form" margin="3rem 0" onSubmit={createBook}>
                            <Flex direction="row" justifyContent="center">
                                <TextField
                                    name="name"
                                    placeholder="Book Name"
                                    label="Book Name"
                                    labelHidden
                                    variation="quiet"
                                    required
                                    style={{ fontSize: "20px", paddingTop: '20px', paddingLeft: '50px', paddingRight: '50px' }}

                                />
                                <TextField
                                    name="description"
                                    placeholder="Book Description"
                                    label="Book Description"
                                    labelHidden
                                    variation="quiet"
                                    required
                                    style={{ fontSize: "20px", paddingTop: '20px', paddingLeft: '50px', paddingRight: '200px' }}

                                />
                                <View
                                    name="image"
                                    as="input"
                                    type="file"
                                    style={{ fontSize: "20px", paddingTop: '25px', paddingLeft: '50px', paddingRight: '50px' }}
                                />
                                <Button className="customButton" type="submit" variation="primary">
                                    Add Book
                                </Button>
                            </Flex>
                        </View>

                    </View>
                )}
            </Authenticator>


        </>
    );
}

export default Admin;

