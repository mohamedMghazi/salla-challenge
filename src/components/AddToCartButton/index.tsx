import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {existsInCart} from "utils/helpers/cart";
import {addToCartAsync} from "utils/store/eCommerce/actions";
import { Product } from "components/ProductCard";

const AddToCartButton = ({ product }: { product: Product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        if (existsInCart(product)) {
            toast("هذا المنتج موجود بالفعل في السلة", { type: "info" });
        } else {
            dispatch(addToCartAsync( { productId: product?.id, quantity: 1 }) as any);
        }
    }

    return (
        <button
            type="button"
            className="w-full bg-primary text-white p-2 text-md rounded-md"
            onClick={handleAddToCart}
        >
            أضف إلى السلة
        </button>
    );
}

export default AddToCartButton;
