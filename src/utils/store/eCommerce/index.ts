import { createSlice } from '@reduxjs/toolkit';
import {Product} from "components/ProductCard";
import {
    addToCartAsync,
    getCartItemsAsync,
    getProductsAsync,
    removeFromCart, searchForProducts,
    updateCartAsync
} from "utils/store/eCommerce/actions";

export interface CartItem {
    quantity: number;
    id: number;
    product: Product;
}

export type Category = {
    id: number,
    categoryName: string,
    description: string,
    imageURL: string | null
}

interface ApiState {
    products: Product[];
    loading: boolean;
    error: string | null;
    cart: CartItem[];
    cartLoading: boolean;
    categories: Category[];
    allProducts: Product[];
}

const eCommerceSlice = createSlice({
    name: 'eCommerce',
    initialState: {
        dummyProducts: [
            {
                id: 1,
                title: "سماعات apple AirPods Max الاصدار الجديد",
                description: "الاصدار الاحدث و الافضل حتى اليوم",
                image: "/images/products/01.png",
                categories: [
                    {id: 1, title: "تصنيف اول"},
                    {id: 2, title: "تصنيف ثاني"},
                ],
                old_price: 2500.00,
                price: 2250.00,
            },
            {
                id: 2,
                title: "سماعات apple AirPods Max الاصدار الجديد",
                description: "الاصدار الاحدث و الافضل حتى اليوم",
                image: "/images/products/02.png",
                categories: [
                    {id: 1, title: "تصنيف اول"},
                    {id: 2, title: "تصنيف ثاني"},
                ],
                old_price: 2500.00,
                price: 2250.00
            },
            {
                id: 3,
                title: "سماعات apple AirPods Max الاصدار الجديد",
                description: "الاصدار الاحدث و الافضل حتى اليوم",
                image: "/images/products/03.png",
                categories: [
                    {id: 1, title: "تصنيف اول"},
                    {id: 2, title: "تصنيف ثاني"},
                ],
                old_price: 2500.00,
                price: 2250.00
            },
            {
                id: 4,
                title: "سماعات apple AirPods Max الاصدار الجديد",
                description: "الاصدار الاحدث و الافضل حتى اليوم",
                image: "/images/products/04.png",
                categories: [
                    {id: 1, title: "تصنيف اول"},
                    {id: 2 , title: "تصنيف ثاني"},
                ],
                old_price: 2500.00,
                price: 2250.00
            }
        ],
        allProducts: [],
        products: [],
        categories: [],
        loading: true,
        cartLoading: false,
        error: null,
        cart: [],
    } as ApiState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getProductsAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload?.products;
                state.categories = action.payload?.categories;
            })
            .addCase(getProductsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to fetch products';
            })
            .addCase(getCartItemsAsync.pending, (state) => {
                state.cartLoading = true;
                state.error = null;
            })
            .addCase(getCartItemsAsync.fulfilled, (state, action) => {
                state.cartLoading = false;
                state.cart = action.payload;
            })
            .addCase(getCartItemsAsync.rejected, (state, action) => {
                state.cartLoading = false;
                state.error = action.error.message ?? 'Failed to fetch cart items';
            })
            .addCase(addToCartAsync.pending, (state) => {
                state.cartLoading = true;
                state.error = null;
            })
            .addCase(addToCartAsync.fulfilled, (state, action) => {
                state.cartLoading = false;
            })
            .addCase(addToCartAsync.rejected, (state, action) => {
                state.cartLoading = false;
                state.error = action.error.message ?? 'Failed to add item to cart';
            })
            .addCase(updateCartAsync.pending, (state) => {
                state.cartLoading = true;
                state.error = null;
            })
            .addCase(updateCartAsync.fulfilled, (state, action) => {
                state.cartLoading = false;
                state.cart = state.cart.map(i => i.product.id === Number(action.payload.productId) ? {...i, quantity: action.payload.quantity} : i);
            })
            .addCase(updateCartAsync.rejected, (state, action) => {
                state.cartLoading = false;
                state.error = action.error.message ?? 'Failed to update cart';
            })
            .addCase(removeFromCart.pending, (state, action) => {
                state.cartLoading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.cartLoading = false;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.cartLoading = false;
                state.error = action.error.message ?? 'Failed to remove item from cart';
            })
            .addCase(searchForProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchForProducts.fulfilled, (state, action) => {
                state.loading = false;

                if (!state.allProducts.length) {
                    state.allProducts = state.products;
                }

                const { query, category } = action.payload;

                if (query && category !== 'all') {
                    state.products = state.allProducts.filter((product) =>
                        product.name.toLowerCase().includes(query.toLowerCase()) &&
                        Number(product.categoryId) === Number(category)
                    );
                } else if (query) {
                    state.products = state.allProducts.filter((product) =>
                        product.name.toLowerCase().includes(query.toLowerCase())
                    );
                } else if (category !== 'all') {
                    state.products = state.allProducts.filter((product) =>
                        Number(product.categoryId) === Number(category)
                    );
                } else {
                    state.products = state.allProducts;
                }
            })
            .addCase(searchForProducts.rejected, (state, action) => {
                state.loading = false;
                state.allProducts = [];
                state.error = action.error.message ?? 'Failed to search for products';
            });
    },
});

export default eCommerceSlice.reducer;
