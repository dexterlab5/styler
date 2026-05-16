const Footer = () => {
    return (
        <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1">
                        <h2 className="text-2xl font-serif font-bold text-amber-500 uppercase tracking-tighter mb-4">
                            Styler Munich
                        </h2>
                        <p className="text-sm leading-relaxed">
                            Premium Hairdressing for the modern man. Our Artist are out there
                            ready to perform the best hairstyles for you. We are based in Munich, Germany.
                        </p>
                    </div>

                    {/* Services Links */}
                    <div>
                        <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6">Services</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-amber-500 transition-colors">Signature Fades</a></li>
                            <li><a href="#" className="hover:text-amber-500 transition-colors">The Saloon Roll</a></li>
                            <li><a href="#" className="hover:text-amber-500 transition-colors">Beard Sculpting</a></li>
                            <li><a href="#" className="hover:text-amber-500 transition-colors">Straight Razor Shave</a></li>
                        </ul>
                    </div>

                    {/* Locations Links */}
                    <div>
                        <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6">Saloons</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-amber-500 transition-colors">Downtown HQ</a></li>
                            <li><a href="#" className="hover:text-amber-500 transition-colors">Old Town</a></li>
                            <li><a href="#" className="hover:text-amber-500 transition-colors">West End</a></li>
                        </ul>
                    </div>

                    {/* Social / Newsletter */}
                    <div>
                        <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6">Stay Sharp</h4>
                        <div className="flex gap-4 mb-6">
                            {/* Using simple placeholder divs for icons */}
                            <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-amber-500 cursor-pointer">
                                <span className="text-xs">IG</span>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-amber-500 cursor-pointer">
                                <span className="text-xs">FB</span>
                            </div>
                        </div>
                        <p className="text-xs">Join our list for grooming tips.</p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs uppercase tracking-widest">
                    <p>© 2024 Styler Collective. All Rights Reserved. Munich, Germany</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white">Privacy</a>
                        <a href="#" className="hover:text-white">Terms</a>
                    </div>
                </div>
            </div>
        </footer>

    );
};

export default Footer;