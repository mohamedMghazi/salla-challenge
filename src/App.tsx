import React, {useEffect} from 'react';
import { useDispatch } from "react-redux";
import { getCookie } from "utils/helpers/cookiesManager";
import { getCartItemsAsync, getProductsAsync } from "utils/store/eCommerce/actions";
import Layout from "layout";

const App: React.FC = () => {
    const dispatch = useDispatch();
    const token = getCookie("token");

    useEffect(() => {
        token && dispatch(getCartItemsAsync() as any);
    }, [dispatch, token]);

    useEffect(() => {
        dispatch(getProductsAsync() as any);
    }, [dispatch]);

    return (
        <Layout />
    );
}

export default App;
