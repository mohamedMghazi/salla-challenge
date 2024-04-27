import { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router";
import {useLocation} from "react-router-dom";
import {getCookie} from "../utils/helpers/cookiesManager";

const PUBLIC_ROUTES = ['login', '', 'product-details'];

const RouteGuard = ({ children }: { children: ReactElement }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = getCookie('token');

    useEffect(() => {
        if (!token && !PUBLIC_ROUTES.includes(location.pathname.replace('/', '').split('/')[0])) {
            navigate('/login');
        }

        if (token && location.pathname === '/login') {
            navigate('/');
        }
    }, [token, navigate, location.pathname]);

    return children;
}

export default RouteGuard;
