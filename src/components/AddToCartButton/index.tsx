import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {existsInCart} from "utils/helpers/cart";
import {addToCartAsync} from "utils/store/eCommerce/actions";
import { Product } from "components/ProductCard";

const AddToCartButton = ({ product, quantity = 1 }: { product: Product, quantity?: number }) => {
    const dispatch = useDispatch();
    const { cartLoading } = useSelector((state: any) => state.eCommerce);

    const handleAddToCart = () => {
        if (existsInCart(product)) {
            toast("هذا المنتج موجود بالفعل في السلة", { type: "info" });
        } else {
            dispatch(addToCartAsync( { productId: product?.id, quantity }) as any);
        }
    }

    return (
        <button
            disabled={cartLoading === "loading"}
            type="button"
            className={`w-full bg-primary text-white p-2 text-md rounded-md ${cartLoading === "loading" ? "opacity-80" : ""}`}
            onClick={handleAddToCart}
        >
            أضف إلى السلة
        </button>
    );
}

export default AddToCartButton;
