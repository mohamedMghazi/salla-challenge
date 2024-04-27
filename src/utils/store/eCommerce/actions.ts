import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from "react-toastify";
import API from "utils/API";
import { getCookie } from "utils/helpers/cookiesManager";

export const getCartItemsAsync = createAsyncThunk(
    'eCommerce/getCartItemsAsync',
    async () => {
        const api = new API();
        const cartResponse = await api.getData("cart/", { params: { token: getCookie("token") } });
        return cartResponse.data?.cartItems || [];
    }
);

export const addToCartAsync = createAsyncThunk(
    'eCommerce/addToCartAsync',
    async ({ productId, quantity }: { productId: number, quantity: number }, thunkAPI) => {
        const api = new API();
        const res = await api.postData("cart/add/",
            { productId, quantity },
            {
                params:
                    { token: getCookie("token") }
            }
        );

        if (!res.success) {
            if (res.error === "authentication token not valid") {
                toast("يرجى تسجيل الدخول أولاً", { type: "error" });
            } else {
                toast("حدث خطأ أثناء إضافة المنتج إلى السلة", {type: "error"});
            }

            return thunkAPI.rejectWithValue(res.error);
        }
        toast("تمت الإضافة إلى السلة", { type: "success" });
        thunkAPI.dispatch(getCartItemsAsync());

        return {};
    }
);

export const updateCartAsync = createAsyncThunk(
    'eCommerce/updateCartAsync',
    async ({ id, productId, quantity }: { id: number, productId: number, quantity: number }, thunkAPI) => {
        const api = new API();
        const res = await api.putData(`cart/update/{cartItemId}`,
            { id, productId, quantity },
            { params: { token: getCookie("token") } }
        );

        if (!res.success) {
            return thunkAPI.rejectWithValue(res.error);
        }

        toast("تم تحديث السلة", { type: "info" });

        return { productId, quantity };
    }
);

export const removeFromCart = createAsyncThunk(
    'eCommerce/removeFromCart',
    async ({ id }: { id: number }, thunkAPI) => {
        const api = new API();
        const res = await api.deleteData(`cart/delete/${id}`,
            { params: { token: getCookie("token") } }
        );

        if (!res.success) {
            return thunkAPI.rejectWithValue(res.error);
        }

        toast("تمت إزالة المنتج من السلة", { type: "info" });
        thunkAPI.dispatch(getCartItemsAsync());

        return { id };
    }
);

export const getProductsAsync = createAsyncThunk(
    'eCommerce/getProductsAsync',
    async () => {
        const api = new API();
        const productsResponse = await api.getData("product/");
        const categories = await api.getData("category/");

        const products = productsResponse.data?.slice(0, process.env.REACT_APP_PRODUCTS_COUNT) || [];

        return { products, categories };
    }
);

export const searchForProducts = createAsyncThunk(
    'eCommerce/searchForProducts',
    async ({ query, category }: { query?: string, category?: string }) => {
        return { query, category };
    }
);
