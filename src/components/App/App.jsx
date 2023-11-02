import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
// import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import Layout from '../Layout/Layout';
import Menu from '../Menu/Menu';

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  const openMenu = () => {
    setIsMenuOpen(true);
    console.log('эххъ')
  }
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    } , 7000)
  })
  return (
    <div className="App">
      {/* <Header isLoggedIn = {false}  /> */}
      <Routes>
        <Route element={<Layout openMenu={openMenu} isLoading={isLoading} isLoggedIn={isLoggedIn}/>}>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
        </Route>
        {/* <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} /> */}
        <Route path="/signin" element={<Login />} />
        <Route path="/profile" element={<>
                                          <Header isLoggedIn={isLoggedIn} openMenu={openMenu}/>
                                          <Profile />
                                        </>} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      { isMenuOpen && <Menu isOpen={isMenuOpen} onClose={closeMenu} />}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
