import { FC } from "react";

const Footer: FC = () => {
    return (
        <footer className="w-full h-[80px] flex items-center justify-center text-primary bg-secondary-50 mt-4 md:mt-6">
            <p className="text-sm">كافة الحقوق محفوظة لدى غازي ستور | {new Date().getFullYear()}</p>
        </footer>
    );
}

export default Footer;
