import { createAsyncThunk } from '@reduxjs/toolkit';
import API from "../../API";
import { getCookie } from "../../helpers/cookiesManager";
import {toast} from "react-toastify";

export const getCartItemsAsync = createAsyncThunk(
    'eCommerce/getCartItemsAsync',
    async () => {
        const api = new API();
        const cartResponse = await api.getData(`cart/?token=${getCookie("token")}`);
        return cartResponse.data?.cartItems || [];
    }
);

export const addToCartAsync = createAsyncThunk(
    'eCommerce/addToCartAsync',
    async ({ productId, quantity }: { productId: number, quantity: number }, thunkAPI) => {
        const api = new API();
        const res = await api.postData(`cart/add/?token=${getCookie("token")}`, { productId, quantity });

        if (!res.success) {
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
        return productsResponse.data?.slice(0, 10) || [];
    }
);
