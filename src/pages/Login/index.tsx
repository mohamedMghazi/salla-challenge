import {FC, FormEvent} from "react";

const Login: FC = () => {
    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <main className="w-full main flex-auto">
            <div className="container">
                <div className="p-4 bg-white rounded-lg shadow-4xl">
                    <div className="flex flex-col mb-6">
                        <h2 className="text-lg flex items-center justify-start gap-2">تسجيل الدخول</h2>
                    </div>
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm">البريد الإلكتروني</label>
                            <input type="email" id="email" name="email" className="p-2 border border-gray-200 rounded-lg"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className="text-sm">كلمة المرور</label>
                            <input type="password" id="password" name="password" className="p-2 border border-gray-200 rounded-lg"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button type="submit" className="p-2 bg-primary text-white rounded-lg">تسجيل الدخول</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Login;
