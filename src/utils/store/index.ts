import {combineReducers, configureStore} from '@reduxjs/toolkit';
import eCommerceSlice from 'utils/store/eCommerce';

const reducer = combineReducers({
    eCommerce: eCommerceSlice,
});

const store = configureStore({ reducer });

export default store;
