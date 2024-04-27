import { Product } from "components/ProductCard";
import { CartItem } from "utils/store/eCommerce";
import store from "utils/store";

export const existsInCart = (product: Product) => {
    const cart: CartItem[] = store.getState().eCommerce.cart;
    return cart.some((item) => item.product.id === product.id);
}
