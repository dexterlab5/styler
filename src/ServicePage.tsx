import { useRef, useState } from "react";

// Functionality:
// 1. Slide hero
// 2. Select service
// 3. Select 



const images = ["/barbershop.jpg", "/rasta.png", "/hairsalon.jpg"];

const services = [
    {
        id: 1,
        name: "Cuts & Fades",
        time: "45 min",
        extra: "Includes wash and style",
        price: 25
    },
    {
        id: 2,
        name: "Beard Sculpting",
        time: "30 min",
        extra: "Hot towel finish",
        price: 15
    },
    {
        id: 3,
        name: "Razor shave",
        time: "25 min",
        extra: "Hot towel finish",
        price: 15
    }
];

const stylists = [
    {
        id: 1,
        name: "Alex Rivera",
        role: "Master Barber",
        yearsExp: 12,
        photo: "/barber1.png"
    },
    {
        id: 2,
        name: "Jordan Lee",
        role: "Young Barber",
        yearsExp: 3,
        photo: "/barber2.jpg"
    }
]


const available = [
    { hour: "12", minutes: "30" },
    { hour: "15", minutes: "00" }
]

const ServicePage = () => {
    // Hero
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1));
    };

    const [service, setService] = useState<number | null>(null);
    const [artist, setArtist] = useState<number | null>(null);


    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    // 1. Generate 14 days starting from today
    const days = Array.from({ length: 14 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return {
            id: date.toDateString(),
            dayNum: date.getDate(),
            weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
            isToday: i === 0
        };
    });

    // 2. Mouse Drag Logic
    const handleMouseDown = (e: React.MouseEvent) => {
        const slider = scrollRef.current;
        if (!slider) return;

        setIsDragging(true);
        const startX = e.pageX - slider.offsetLeft;
        const scrollLeft = slider.scrollLeft;

        const handleMouseMove = (mE: MouseEvent) => {
            const x = mE.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed
            slider.scrollLeft = scrollLeft - walk;
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };


    return (
        <main className="max-w-5xl mx-auto px-4 py-8">

            {/* { Images } */}
            <section className="relative w-full h-[300px] md:h-[600px] rounded-2xl overflow-hidden mb-8">
                {/* Sliding Container */}
                <div
                    className="flex w-full h-full transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Saloon ${index}`}
                            className="w-full h-full object-cover flex-shrink-0"
                        />
                    ))}
                </div>

                {/* Gradient Overlay - Fixed (Moved outside the sliding div) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                <div className="absolute bottom-0 left-0 p-8 w-full">
                    <h1 className="text-white text-4xl font-bold">Rusty's Barbershop</h1>
                </div>

                {/* Left Arrow */}
                {currentIndex > 0 &&
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full cursor-pointer transition-all z-10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 sm:size-6 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                }

                {/* Right Arrow */}
                {currentIndex < images.length - 1 &&
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full cursor-pointer transition-all z-10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 sm:size-6 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                }

                {/* Dots Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)} // Optional: make dots clickable
                            className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-white w-4' : 'bg-white/40'
                                }`}
                        />
                    ))}
                </div>
            </section>



            <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-8">
                <div className="p-6 border-b border-slate-100">
                    <h2 className="text-xl font-bold">Artists</h2>
                </div>
                {/* <!-- Stylist Roll Container --> */}
                <div className="p-6 flex gap-8 overflow-x-auto">

                    {/* <!-- Individual Stylist Item --> */}
                    <div className="flex flex-col items-center min-w-[120px]">
                        <img
                            src="/barber1.png"
                            alt="Stylist Name"
                            className="w-20 h-20 rounded-full object-cover border-2 border-slate-100 mb-3"
                        />
                        <h3 className="font-semibold text-slate-900 text-sm">Alex Rivera</h3>
                        <p className="text-xs text-slate-500">Master Barber</p>
                    </div>

                    {/* <!-- Copy this block for more stylists --> */}
                    <div className="flex flex-col items-center min-w-[120px]">
                        <img
                            src="/barber2.jpg"
                            alt="Stylist Name"
                            className="w-20 h-20 rounded-full object-cover border-2 border-slate-100 mb-3"
                        />
                        <h3 className="font-semibold text-slate-900 text-sm">Jordan Lee</h3>
                        <p className="text-xs text-slate-500">Young Barber</p>
                    </div>

                </div>
            </section>



            {service == null &&
                <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-8">
                    <div className="p-6 border-b border-slate-100">
                        <h2 className="text-xl font-bold">Services</h2>
                    </div>

                    {services.map((service, index) => (
                        <div className="flex justify-between items-center p-6 border-b border-slate-50 hover:bg-slate-50 cursor-default"
                            onClick={() => setService(index)}>
                            <div>
                                <h3 className="font-bold text-lg">{service.name}</h3>
                                <p className="text-slate-500 text-sm">{service.time} • {service.extra}</p>
                            </div>
                            <div className="text-right">
                                <span className="font-bold text-lg block">€{service.price}</span>
                                <button className="text-violet-600 font-bold text-sm uppercase mt-1 cursor-pointer">Select</button>
                            </div>
                        </div>
                    ))}
                </section>
            }

            {/* { Service Selected } */}
            {service != null &&
                <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-8">
                    <div className="p-6 border-b border-slate-100">
                        <h2 className="text-xl font-bold">Services</h2>
                    </div>
                    <div className="flex justify-between items-center p-6 border-b border-slate-50 cursor-default">
                        <div>
                            <h3 className="font-bold text-lg">{services[service].name}</h3>
                            <p className="text-slate-500 text-sm">{services[service].time} • {services[service].extra}</p>
                        </div>
                        <div className="text-right">
                            <span className="font-bold text-lg block">€{services[service].price}</span>
                            <button className="text-violet-600 font-bold text-sm uppercase mt-1">Selected</button>
                        </div>
                    </div>
                </section>
            }

            {service != null && artist == null &&
                <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-20">
                    <div className="p-6 border-b border-slate-100">
                        <h2 className="text-xl font-bold">Select Your Stylist</h2>
                    </div>

                    {stylists.map((stylist, index) => (
                        <div className="flex justify-between items-center p-6 border-b border-slate-50 hover:bg-slate-50 cursor-default"
                            onClick={() => setArtist(index)}>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-200 flex-shrink-0 overflow-hidden border border-slate-100">
                                    <img src={stylist.photo} alt="Jack" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg leading-tight">{stylist.name}</h3>
                                    <p className="text-slate-500 text-sm">{stylist.role} • {stylist.yearsExp}y Exp.</p>
                                </div>
                            </div>

                            <div className="flex gap-3 items-center">
                                {/* 3 Info Circles */}
                                {/* <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-[10px] font-bold">4.9</div>
                                    <span className="text-[9px] uppercase text-slate-400 mt-1">Stars</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-[10px] font-bold">2k</div>
                                    <span className="text-[9px] uppercase text-slate-400 mt-1">Cuts</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-[10px] font-bold">$$</div>
                                    <span className="text-[9px] uppercase text-slate-400 mt-1">Price</span>
                                </div> */}
                                <button className="ml-4 text-violet-600 font-bold text-sm uppercase cursor-pointer">Select</button>
                            </div>
                        </div>
                    ))}
                </section>
            }

            {/* { Artist Selected } */}
            {service != null && artist != null &&
                <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-20">
                    <div className="p-6 border-b border-slate-100">
                        <h2 className="text-xl font-bold">Select Your Stylist</h2>
                    </div>

                    <div className="flex justify-between items-center p-6 border-b border-slate-50 hover:bg-slate-50 cursor-default">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-slate-200 flex-shrink-0 overflow-hidden border border-slate-100">
                                <img src={stylists[artist].photo} alt="Jack" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg leading-tight">{stylists[artist].name}</h3>
                                <p className="text-slate-500 text-sm">{stylists[artist].role} • {stylists[artist].yearsExp}y Exp.</p>
                            </div>
                        </div>

                        <div className="flex gap-3 items-center">
                            {/* 3 Info Circles */}
                            {/* <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-[10px] font-bold">4.9</div>
                                <span className="text-[9px] uppercase text-slate-400 mt-1">Stars</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-[10px] font-bold">2k</div>
                                <span className="text-[9px] uppercase text-slate-400 mt-1">Cuts</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-[10px] font-bold">$$</div>
                                <span className="text-[9px] uppercase text-slate-400 mt-1">Price</span>
                            </div> */}
                            <button className="ml-4 text-violet-600 font-bold text-sm uppercase">Selected</button>
                        </div>
                    </div>
                </section>
            }


            {/* Date */}
            <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-8">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-slate-800">Select Date</h2>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Next 2 Weeks</span>
                </div>

                <div className="p-6">
                    <div
                        ref={scrollRef}
                        onMouseDown={handleMouseDown}
                        className={`
            flex gap-6 overflow-x-auto select-none no-scrollbar py-4
            ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
            snap-x snap-mandatory scroll-smooth
          `}
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {days.map((day) => {
                            const isSelected = selectedDate === day.id;

                            return (
                                <div
                                    key={day.id}
                                    className="flex flex-col items-center gap-3 flex-shrink-0 w-14 snap-center"
                                >
                                    {/* Weekday Label */}
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${day.isToday ? 'text-violet-600' : 'text-slate-400'}`}>
                                        {day.isToday ? 'Today' : day.weekday}
                                    </span>

                                    {/* Purple Circle */}
                                    <button
                                        onClick={() => setSelectedDate(day.id)}
                                        className={`
                    w-14 h-14 rounded-full font-bold text-lg transition-all duration-200
                    flex items-center justify-center border-2
                    ${isSelected
                                                ? 'bg-green-500 border-green-500 text-white scale-110 shadow-lg shadow-green-100'
                                                : 'bg-violet-600 border-violet-600 text-white hover:bg-violet-700 shadow-md shadow-violet-100 active:scale-95'}
                  `}
                                    >
                                        {day.dayNum}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Time */}
            <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-8">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-slate-800">Time</h2>
                </div>
                <div className="w-full overflow-x-auto flex gap-4 p-4">
                    {available.map((time, i) => (
                        <div key={i} className="flex-shrink-0 snap-center border border-slate-200 p-6 bg-gray-300">
                            {time.hour}:{time.minutes}
                        </div>
                    ))}
                </div>
            </section>

            {/* Note */}
            <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-8">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-slate-800">Note</h2>
                </div>
                <textarea
                    placeholder="e.g., Use low guard on sides, sensitive skin..."
                    className="w-full h-32 p-4 pl-6 bg-amber-50/50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all resize-none shadow-sm"
                />
            </section>

            <section className="flex items-center gap-5">
                <button className="p-6 bg-[var(--royal-purple)] text-white cursor-pointer">Make Termin</button>
                <h3 className="text-green-300">Thank you for your Appointment!</h3>
            </section>

            <div className="mb-40"></div>

        </main>
    );
};

export default ServicePage;