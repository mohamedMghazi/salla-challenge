import {lazy} from "react";
import Root from "layout/Root";
import NotFound from "components/NotFound";
import RouteGuard from "./RouteGuard";


// lazy pages
const Home = lazy(() => import("pages/Home"));
const Cart = lazy(() => import("pages/Cart"));
const Login = lazy(() => import("pages/Login"));
const ProductDetails = lazy(() => import("pages/ProductDetails"));

export const PATHS = [
    {
        path: "/",
        element: <RouteGuard>
            <Root />
        </RouteGuard>,
        errorElement: <NotFound />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/cart", element: <Cart /> },
            { path: "/login", element: <Login /> },
            { path: "/product-details/:id", element: <ProductDetails /> },
        ]
    }
];
