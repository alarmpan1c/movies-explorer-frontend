import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';


function Layout({ openMenu, isLoading, isLoggedIn }) {
    return (
    <>
        <Header isLoggedIn = { isLoggedIn } openMenu={openMenu} />
        { isLoading ? <Preloader /> : <Outlet /> }
        <Footer />
    </>
    );
}

export default Layout;
