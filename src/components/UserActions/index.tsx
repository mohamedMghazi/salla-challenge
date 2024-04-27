import {Link, useLocation} from "react-router-dom";
import {getCookie, removeCookie} from "../../utils/helpers/cookiesManager";
import {FC} from "react";
import {useSelector} from "react-redux";

const UserActions: FC = () => {
    const location = useLocation();
    const token = getCookie('token');

    const cart = useSelector((state: any) => state.eCommerce.cart);

    if (location.pathname === "/login") return null;

    const handleLogout = () => {
        removeCookie('token');
        window.location.reload();
    }

    return (
        <div className="flex items-center gap-4">
            {!token && <Link to="/login" type="button"
                             className="w-[40px] h-[40px] rounded-full text-center flex items-center justify-center bg-secondary-50 text-primary">
                <i className="sicon-user"/>
            </Link>}

            <Link to="/cart" type="button"
                  className="w-[40px] h-[40px] rounded-full text-center flex items-center justify-center bg-secondary-50 text-primary relative">
                <i className="sicon-shopping-bag"/>
                {!!cart?.length && <span className="absolute top-0 right-0 bg-primary text-white text-xs rounded-full px-1">{cart?.length}</span>}
            </Link>

            {token && <button
                type="button"
                className="w-[40px] h-[40px] rounded-full text-center flex items-center justify-center bg-secondary-50 text-primary"
                onClick={handleLogout}
            >
                <i className="sicon-send-out"/>
            </button>}
        </div>
    );
}

export default UserActions;
