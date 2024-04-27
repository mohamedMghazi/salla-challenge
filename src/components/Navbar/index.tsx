import { FC } from "react";
import { Link } from "react-router-dom";
import UserActions from "components/UserActions";

const Navbar: FC = () => {
    return (
        <header className="md:py-6 py-4">
            <div className="flex justify-between flex-col sm:flex-row gap-4 items-center">
                <div className="flex flex-col sm:flex-row items-center gap-4 relative">
                    <Link to="/"
                          className="block w-[80px] h-[80px] bg-gray-50 p-2 rounded-full border-4 border-secondary-50">
                        <img src="/images/sallaLogo.png" alt="Sall Logo"/>
                    </Link>

                    <div className="flex flex-col">
                        <h1 className="text-xl">غازي ستور</h1>
                        <small className="text-gray-400">زورونا تجدوا ما يسركم 😀</small>
                    </div>
                </div>

                <UserActions />
            </div>
        </header>
    );
}

export default Navbar;
