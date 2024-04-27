import React, { Suspense } from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import Loading from "components/Loading/Loading";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

const LazyLoadingPlaceholder: React.FC = () => {
    return <div className="min-h-screen min-w-full flex justify-center items-center">
        <Loading />
    </div>
}

const Root: React.FC = () => {
    return <Suspense fallback={<LazyLoadingPlaceholder />}>
        <ToastContainer />
        <div className="w-full min-h-screen bg-gray-50 flex flex-col items-start justify-start">
            <div className="w-full flex justify-center flex-auto">
                <main className="container">
                    <Navbar />
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    </Suspense>
}

export default Root;
