import { Link } from "react-router-dom";

const MainPage = () => {
    return (
        <main className="max-w-5xl mx-auto px-4 py-8">

            {/* <!-- 2. HERO / IMAGE CONTAINER --> */}
            <div className="relative w-full h-[450px] rounded-2xl overflow-hidden shadow-lg mb-8">
                <img src="/hairartisten.jpg" alt="artist" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                </div>
            </div>

            <section className="p-6 bg-slate-50 min-h-screen">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-serif font-bold text-slate-800 mb-8 text-center uppercase tracking-wide">
                        Our Hair Dressers
                    </h2>

                    {/* The Grid / Table of Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* Card 1 */}
                        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <Link to="/service">
                                <div className="relative h-48 bg-slate-200">
                                    <img src="/barbershop.jpg" alt="Vintage Saloon" className="w-full h-full object-cover" />
                                    <span className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                                        Featured
                                    </span>
                                </div>
                            </Link>
                            <div className="p-5">
                                <h3 className="font-bold text-xl text-slate-900 cursor-pointer">Rusty's Barbershop</h3>
                                <p className="text-slate-500 text-sm mt-1">Downtown • 1.2 miles away</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-violet-600 font-semibold text-sm">Open until 9 PM</span>
                                    <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors  cursor-pointer">
                                        Book Seat
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-48 bg-slate-200">
                                <img src="/saloon.jpg" alt="Modern Saloon" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-5">
                                <h3 className="font-bold text-xl text-slate-900">Modern Hairstylist Salon</h3>
                                <p className="text-slate-500 text-sm mt-1">West End • 3.5 miles away</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-slate-400 font-semibold text-sm">Next opening: 2 PM</span>
                                    <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors">
                                        Book Seat
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-48 bg-slate-200 relative">
                                <img src="/rasta.png" alt="Classic Saloon" className="w-full h-full object-cover" />
                                <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                                    New
                                </span>
                            </div>
                            <div className="p-5">
                                <h3 className="font-bold text-xl text-slate-900">Rasta Workshop</h3>
                                <p className="text-slate-500 text-sm mt-1">Old Town • 0.8 miles away</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-violet-600 font-semibold text-sm">Open Now</span>
                                    <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors">
                                        Book Seat
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


        </main>
    );
};

export default MainPage;
