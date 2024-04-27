import { memo } from "react";
import { useSelector } from "react-redux";

import ProductCard, {Product} from "components/ProductCard";
import Spinner from "components/Spinner";

const ProductsSection = () => {
    const { products, loading } = useSelector((state: any) => state.eCommerce);

    if (loading === "loading") {
        return <Spinner />;
    }

    if (!products?.length) {
        return <div className="w-full flex justify-center items-center p-8">
            <h2 className="text-lg text-gray-500">لا توجد منتجات</h2>
        </div>;
    }

    return (
        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 sm:gap-4">
            {products.map((product: Product) => <ProductCard product={product} key={product.id}/>)}
        </div>
    );
}

export default memo(ProductsSection);
