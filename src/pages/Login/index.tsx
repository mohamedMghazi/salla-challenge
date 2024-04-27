import {FC, FormEvent, useEffect, useState} from "react";
import { useNavigate } from "react-router";
import API from "utils/API";
import { setCookie } from "utils/helpers/cookiesManager";

const ERRORS: { [key: string]: string } = {
    "please check the pass": "البريد الإلكتروني أو كلمة المرور غير صحيحة",
    "user not present": "البريد الإلكتروني غير مسجل",
}

const Login: FC = () => {
    const navigate = useNavigate();
    const [form, setForm] =
        useState<{ email: string, password: string }>({ email: "", password: "" });
    const [error, setError] = useState<string | undefined>();

    useEffect(() => {
        document.title = "متجر غازي | تسجيل الدخول";
    }, []);

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loginAPI = new API();
        loginAPI.postData("user/signIn", form)
            .then((response) => {
                console.log(response)
                if (response?.success) {
                    setCookie("token", response.data.token, 1);
                    navigate("/");
                } else {
                    setError(response.error);
                }
            });
    }

    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value });
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
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="p-2 border border-gray-200 rounded-lg"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className="text-sm">كلمة المرور</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="p-2 border border-gray-200 rounded-lg"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {error && <div className="text-red-500 text-sm">{ERRORS[error] ?? error}</div>}

                        <div className="flex flex-col gap-2">
                            <button
                                type="submit"
                                className={!form.email ? "p-2 bg-primary text-white rounded-lg opacity-65" : "p-2 bg-primary text-white rounded-lg"}
                                disabled={!form.email}
                            >
                                تسجيل الدخول
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Login;
