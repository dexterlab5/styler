import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AuthPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const { login } = useAuth(); // Grab the refresh function

    const handleLogin = async (e: any) => {
        // 1. Prevents the browser from refreshing the page
        e.preventDefault();

        const loginRequest = {
            email,
            password,
        }
        
        try {
            await login(loginRequest);
            navigate("/");
        } catch (err) {
            setError("Error: Username and password are invalid")
        }
    }

    return (
        <main className="max-w-5xl mx-auto px-4 py-12 md:py-20">

            {/* Login */}
            <section className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                {/* Header */}
                <div className="p-8 border-b border-slate-100 text-center">
                    <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg rotate-3">
                        <span className="text-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"
                                className="size-10">
                                <path fillRule="evenodd" d="M8.128 9.155a3.751 3.751 0 1 1 .713-1.321l1.136.656a.75.75 0 0 1 .222 1.104l-.006.007a.75.75 0 0 1-1.032.157 1.421 1.421 0 0 0-.113-.072l-.92-.531Zm-4.827-3.53a2.25 2.25 0 0 1 3.994 2.063.756.756 0 0 0-.122.23 2.25 2.25 0 0 1-3.872-2.293ZM13.348 8.272a5.073 5.073 0 0 0-3.428 3.57 5.08 5.08 0 0 0-.165 1.202 1.415 1.415 0 0 1-.707 1.201l-.96.554a3.751 3.751 0 1 0 .734 1.309l13.729-7.926a.75.75 0 0 0-.181-1.374l-.803-.215a5.25 5.25 0 0 0-2.894.05l-5.325 1.629Zm-9.223 7.03a2.25 2.25 0 1 0 2.25 3.897 2.25 2.25 0 0 0-2.25-3.897ZM12 12.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                                <path d="M16.372 12.615a.75.75 0 0 1 .75 0l5.43 3.135a.75.75 0 0 1-.182 1.374l-.802.215a5.25 5.25 0 0 1-2.894-.051l-5.147-1.574a.75.75 0 0 1-.156-1.367l3-1.732Z" />
                            </svg>
                        </span>
                    </div>
                    <h2 className="text-2xl font-black text-slate-800">Welcome Back</h2>
                    <p className="text-sm text-slate-500 mt-1">Get in your Profile</p>
                </div>

                {/* Form */}
                <form className="p-8 space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="rusty@barber.com"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-400 transition-all"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2 ml-1">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Password
                            </label>
                            <a href="#" className="text-[10px] font-bold text-blue-600 hover:underline">Forgot?</a>
                        </div>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-400 transition-all"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <p className="text-red-500">{error}</p>

                    <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-xl transition-all shadow-md active:scale-[0.98] mt-2"
                        onClick={handleLogin}>
                        Sign In
                    </button>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400 font-medium">Or continue with</span></div>
                    </div>

                    <button type="button" className="w-full bg-white border border-slate-200 text-slate-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                        <img src="https://svgrepo.com" className="w-4 h-4" alt="Google" />
                        <span className="text-sm">Google</span>
                    </button>
                </form>

                {/* Footer */}
                <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
                    <p className="text-sm text-slate-600">
                        New to Rusty's?
                        <Link to="/register" className="text-blue-600 font-bold hover:underline">Create account</Link>
                    </p>
                </div>
            </section>
        </main>

    );
};

export default AuthPage;