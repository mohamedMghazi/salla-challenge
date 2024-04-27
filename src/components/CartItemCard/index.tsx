import { memo } from "react";
import {Link} from "react-router-dom";
import { CartItem } from "utils/store/eCommerce";
import {useDispatch, useSelector} from "react-redux";
import {removeFromCart, updateCartAsync} from "utils/store/eCommerce/actions";

const CartItemCard = ({ item }: { item: CartItem }) => {
    const dispatch = useDispatch();
    const cartLoading = useSelector((state: any) => state.eCommerce.cartLoading);

    const { id, product, quantity } = item;

    const handleQuantityChange = (value: number) => {
        if (value < 1) {
            dispatch(removeFromCart({ id }) as any);
        } else {
            dispatch(updateCartAsync({ id, productId: item?.product?.id, quantity: Number(value) }) as any);
        }
    }

    return (
        <li className="flex items-start ms:items-center flex-col sm:flex-row justify-between gap-4 w-full p-4 rounded-md transition-all hover:bg-grayer-100">
            <Link to={`/product-details/${product?.id}`} className="flex items-start justify-center gap-2 flex-1">
                <img className="rounded-md w-[35px] object-cover shrink-0 overflow-hidden"
                     src={product?.imageURL} alt={product?.name} />
                <div className="flex flex-col flex-1 gap-1">
                    <h4>{product?.name}</h4>
                    <div className="flex items-center justify-start gap-2">
                        <b className="ltr">x {quantity}</b><span
                        className="text-xs text-gray-500">{product?.price} SAR</span>
                    </div>
                </div>
            </Link>
            <div className="flex items-center justify-center gap-4">
                <div
                    className="flex shrink-0 items-center justify-center p-2 border border-1 border-gray-200 rounded-lg">
                    <button
                        className={`shrink-0 px-2 text-md text-gray-500 ${quantity === 1 ? 'opacity-50' : ''}`}
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={cartLoading === "loading"}
                    >
                        +
                    </button>
                    <input type="number" value={quantity}
                           className="w-[50px] flex-1 text-center appearance-none bg-transparent"
                           disabled
                    />
                    <button
                        className={`shrink-0 px-2 text-md text-gray-500 ${quantity === 1 ? 'opacity-50' : ''}`}
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={cartLoading === "loading"}
                    >
                        -
                    </button>
                </div>
                <button
                    type="button"
                    className={`w-[28px] h-[28px] shrink-0 flex items-center justify-center text-xs border border-red-500 text-red-500 rounded-full p-1 hover:bg-red-500 hover:text-white transition-all ${cartLoading === "loading" ? 'opacity-50' : ''}`}
                    disabled={cartLoading === "loading"}
                    onClick={() => dispatch(removeFromCart({ id }) as any)}
                >
                    <i className="sicon-trash"></i>
                </button>
            </div>
        </li>
    );
}

export default memo(CartItemCard);
