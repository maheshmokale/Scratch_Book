// App.js
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import Error from './Pages/Error';
import Books from './Pages/Books';
import "./App.css";
import BookDetails from './Pages/BookDetails';
import Header from './Component/Header';

import { Amplify } from 'aws-amplify';
import { Button, withAuthenticator } from '@aws-amplify/ui-react';
import 'bootstrap/dist/css/bootstrap.css';
import '@aws-amplify/ui-react/styles.css';
import config from './amplifyconfiguration.json';
Amplify.configure(config);

function App({ signOut, user }) {
  return (
    <>
      <>
        <Header></Header>

        <Button onClick={signOut} className='customButton'>Sign Out</Button>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/error" element={<Error />} />
          <Route path="/bookdetails" element={<BookDetails />} />
          <Route path="/books" element={<Books />} />

        </Routes>
      </>
    </>
  );
}

export default withAuthenticator(App);

