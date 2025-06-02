// src/layouts/MainLayout.jsx


import Navbar from '../views/Navbar';
// import Footer from '../components/Footer'; // optional
import { Outlet } from 'react-router-dom'; // if using nested routes

const MainLayout = () => {

    return (
        <>
            <Navbar />
            <main className='p-6 bg-gray-200'>
                <Outlet /> {/* This renders the current page component */}
            </main>
            {/* <Footer /> */}
        </>
    );
};

export default MainLayout;
