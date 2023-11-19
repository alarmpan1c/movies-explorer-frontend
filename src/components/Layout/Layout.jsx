import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


function Layout({ openMenu, isLoading, isLoggedIn }) {
    return (
    <>
        <Header isLoggedIn = { isLoggedIn } openMenu={openMenu} />
        <Outlet />
        <Footer />
    </>
    );
}

export default Layout;
