import {FC, useEffect} from "react";

import ProductSearch from "components/ProductSearch";
import ProductsSection from "components/ProductsSection";

const Home: FC = () => {
    useEffect(() => {
        document.title = "غازي ستور | الرئيسية";
    }, []);

    return (
        <div className="p-2 sm:p-4 bg-white rounded-lg shadow-4xl">
            <div className="w-full  bg-gray-100 rounded-lg mb-8">
                <img src="/images/main-slider/01.png" className="w-full aspect-video rounded-lg" alt=""/>
            </div>

            <ProductSearch />

            <ProductsSection />
        </div>
    );
}

export default Home;
