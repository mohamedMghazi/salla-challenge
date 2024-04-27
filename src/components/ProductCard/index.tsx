import {Link} from "react-router-dom";

type Product = {
    id: number;
    title: string;
    description: string;
    image: string;
    categories: any[];
    old_price: number;
    price: number;
}

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <div
            className="rounded-lg border-2 border-gray-50 flex flex-col items-start justify-start md:p-3 p-2 relative">
            <Link to={`/product-details/${product.id}`} className="block w-full relative mb-4">
                <img src={product.image} className="w-full aspect-4/3 object-cover rounded-lg" alt="product"/>
            </Link>
            <div className="w-full flex flex-col flex-1 items-start justify-start gap-4">
                <div className="flex items-center justify-center flex-col gap-1">
                    <Link to="/" className="block w-full text-primary text-center">
                        <h2 className="text-sm">{product.title}</h2>
                    </Link>
                    <small className="block text-xs w-full text-center">{product.description}</small>
                </div>
                <div className="flex items-center justify-center flex-wrap gap-2 text-gray-300 w-full">
                    {product.categories.map((category: any) => (
                        <Link key={category.id} className="text-xs text-gray-500 underline" to="/">{category.title}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center w-full my-4 gap-0 sm:gap-2">
                <span className="font-medium text-md">{product.old_price} SAR</span>
                <span className="font-medium text-sm line-through text-gray-300">{product.price} SAR</span>
            </div>
            <button type="button" className="w-full bg-primary text-white p-2 text-md rounded-md">إضافة للسلة
            </button>
        </div>
    );
}

export default ProductCard;
