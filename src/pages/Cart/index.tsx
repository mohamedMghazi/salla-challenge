import { FC } from "react";
import {useSelector} from "react-redux";
import { CartItem } from "utils/store/eCommerce";
import CartItemCard from "components/CartItemCard";
import {Link} from "react-router-dom";

const Cart: FC = () => {
    const cart = useSelector((state: any) => state.eCommerce.cart);

    const cartTotal = cart.reduce((acc: number, item: CartItem) => acc + item.product.price, 0);

    if (!cart.length) return (
        <main className="w-full main flex-auto">
            <div className="container">
                <div className="p-4 bg-white rounded-lg shadow-4xl">
                    <div className="flex flex-col mb-6">
                        <h2 className="text-lg flex items-center justify-start gap-2">سلة المشتريات</h2>
                    </div>
                    <div className="flex items-center justify-center gap-4 p-8">
                        <h3 className="text-lg">السلة فارغة</h3>
                    </div>
                    <Link to="/" className="text-primary block text-center">تسوق الان</Link>
                </div>
            </div>
        </main>
    );

    return (
        <main className="w-full main flex-auto">
            <div className="container">
                <div className="p-4 bg-white rounded-lg shadow-4xl">
                    <div className="flex flex-col mb-6">
                        <h2 className="text-lg flex items-center justify-start gap-2">سلة المشتريات</h2>
                    </div>
                    <ul className="flex flex-col">
                        {cart.map((item: CartItem) => <CartItemCard key={item.id} item={item} />)}
                    </ul>
                    <div className="flex items-center justify-between px-4 py-8 border-gray-100 border-t border-b-1">
                        <h3 className="font-bold text-xl">اجمالي السلة</h3>
                        <span className="text-xl font-bold">{cartTotal} SAR</span>
                    </div>
                    <button type="button" className="w-full bg-primary text-white p-3 text-md rounded-md">اتمام عملية
                        الدفع
                    </button>
                </div>
            </div>
        </main>
    );
}

export default Cart;
