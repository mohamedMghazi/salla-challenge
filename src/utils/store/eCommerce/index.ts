import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Product} from "components/ProductCard";

interface CartItem extends Product {
    quantity: number;
}

interface ApiState {
    products: Product[];
    loading: boolean;
    error: string | null;
    cart: { [id: string | number]: CartItem };
}

const eCommerceSlice = createSlice({
    name: 'eCommerce',
    initialState: {
        products: [],
        loading: false,
        error: null,
        cart: {},
    } as ApiState,
    reducers: {
        fetchDataStart: state => {
            state.loading = true;
            state.error = null;
        },
        fetchDataSuccess: (state, action: PayloadAction<Product[]>) => {
            state.loading = false;
            state.products = action.payload;
        },
        fetchDataFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        addToCart: (state, action: PayloadAction<{ id: string; product: Product }>) => {
            const { id, product } = action.payload;
            if (state.cart[id]) {
                state.cart[id].quantity += 1;
            } else {
                state.cart[id] = { ...product, quantity: 1 };
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            delete state.cart[id];
        },
        increaseQuantity: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            state.cart[id].quantity += 1;
        },
        decreaseQuantity: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            if (state.cart[id].quantity > 1) {
                state.cart[id].quantity -= 1;
            }
        },
    },
});

export const {
    fetchDataStart,
    fetchDataSuccess,
    fetchDataFailure,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
} = eCommerceSlice.actions;
export default eCommerceSlice.reducer;
