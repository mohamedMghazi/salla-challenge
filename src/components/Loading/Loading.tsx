import {FC} from "react";

const Loading: FC = () => {
    return (
        <div className="block w-[80px] h-[80px] bg-gray-50 p-2 rounded-full border-4 border-secondary-50">
            <img src="/images/sallaLogo.png" alt="Salla Logo" />
        </div>
    );
}

export default Loading;
