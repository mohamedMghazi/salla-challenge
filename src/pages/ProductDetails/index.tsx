import {FC, useEffect} from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from "components/Spinner";
import AddToCartButton from "../../components/AddToCartButton";

const ProductDetails: FC = () => {
    const { id } = useParams();

    const products = useSelector((state: any) => state.eCommerce.products);
    const loading = useSelector((state: any) => state.eCommerce.loading);
    const product = products.find((p: any) => p.id === Number(id ?? "0"));

    useEffect(() => {
        document.title = product?.name ? `متجر غازي | ${product?.name}` : "متجر غازي | Product Details";
    }, [product?.name]);

    if (loading) {
        return <Spinner />
    }

    return (
        <div className="p-2 sm:p-4 bg-white rounded-lg shadow-4xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-4">
                <img src={product?.imageURL} className="w-full aspect-4/3 object-cover rounded-lg mb-8 sm:mb-0"
                     alt={product?.name} />
                <div className="flex flex-col gap-4 col-span-2">
                    <article className="text-sm text-darker-300 leading-[1.8] ">
                        <div className="flx flex-col mb-6 gap-2">
                            <h1 className="text-xl md:text-3xl">{product?.name}</h1>
                            <small className="text-xs text-gray-500">الاصدار الاحدث و الافضل حتى اليوم</small>
                        </div>
                        <div className="flex flex-col sm:flex-row w-full my-4 gap-0 sm:gap-2">
                            <span className="font-medium text-md">{product?.price} SAR</span>
                        </div>
                        <p>{product?.description}</p>
                    </article>
                    <div className="flex items-center justify-center gap-4">
                        <div
                            className="flex shrink-0 items-center justify-center p-2 border border-1 border-gray-200 rounded-lg">
                            <button className="shrink-0 px-2 text-md text-gray-500">+</button>
                            <input type="number" value="1"
                                   className="w-[50px] flex-1 text-center appearance-none bg-transparent"/>
                            <button className="shrink-0 px-2 text-md text-gray-500">-</button>
                        </div>
                        <AddToCartButton product={product} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;
