import {FC, useEffect} from "react";
import { useSelector } from "react-redux";

import ProductSearch from "components/ProductSearch";
import ProductCard, { Product } from "components/ProductCard";
import Spinner from "components/Spinner";

const ProductsSection = ({ loading, products }: { loading: boolean, products: Product[] }) => {
    if (loading) {
        return <Spinner />;
    }

    if (!products?.length) {
        return <div className="w-full flex justify-center items-center">
            <h2 className="text-lg text-gray-500">لا توجد منتجات</h2>
        </div>;
    }

    return (
        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 sm:gap-4">
            {products.map((product: Product) => <ProductCard product={product} key={product.id}/>)}
        </div>
    );
}

const Home: FC = () => {
    const { products, loading } = useSelector((state: any) => state.eCommerce);

    useEffect(() => {
        document.title = "متجر غازي | الرئيسية";
    }, []);



    return (
        <div className="p-2 sm:p-4 bg-white rounded-lg shadow-4xl">
            <div className="w-full  bg-gray-100 rounded-lg mb-8">
                <img src="/images/main-slider/01.png" className="w-full aspect-video rounded-lg" alt=""/>
            </div>

            <ProductSearch />

            <ProductsSection loading={loading} products={products} />
        </div>
    );
}

export default Home;
