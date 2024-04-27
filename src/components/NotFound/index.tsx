import { FC } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

const NotFound: FC = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen w-full">
            <Loading />
            <h1 className="text-4xl mt-7">الرابط غير متوفر</h1>
            <Link to="/" className="text-primary mt-4">العودة للصفحة الرئيسية</Link>
        </div>
    );
}

export default NotFound;
