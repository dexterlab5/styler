import { useEffect, useRef, useState } from "react";

interface Studio {
    id: number;
    name: string;
    user_id: number;
    description: string;
}

interface Artist {
    id: number;
    name: string;
    studio_id: number;
    img: string;
    role: string;
}

interface Service_db {
    id: number;
    name: string;
    time: string;
    extra: string;
    price: string;
    studio_id: number;
}

interface FreeAppointment_db {
    id: number;
    date: string;
    hour: string;
    minute: string;
    artist_id: number;
    studio_id: number;
}


interface StudioImageDb {
    id: number;
    img: string;
    studio_id: number;
}

interface Img_db {
    id: number;
    img: string;
    studio_id: number;
}

interface Img_local {
    file: File;
    url: string;
}

interface Hairstylist {
    id: string;
    url: string;
    img: File;
    name: string;
    role: string;
}

interface Service {
    id: number | null;
    name: string;
    time: string;
    extra: string;
    price: string;
}

interface Termin {
    hour: string;
    minute: string;
}

interface FreeAppointment {
    id: number;
    date: string;
    hour: string;
    minute: string;
    artist_id: number;
}

interface FreeAppointment_db {       // <- delete
    id: number;
    date: string;
    hour: string;
    minute: string;
    artist: Artist;
}


const schedule = [
    { hour: "9", minute: "00" },
    { hour: "9", minute: "30" },
    { hour: "10", minute: "00" },
    { hour: "10", minute: "30" },
    { hour: "11", minute: "00" },
    { hour: "11", minute: "30" },
    { hour: "12", minute: "00" },
    { hour: "12", minute: "30" },
    { hour: "13", minute: "00" },
    { hour: "13", minute: "30" },
    { hour: "14", minute: "00" },
    { hour: "14", minute: "30" },
    { hour: "15", minute: "00" },
    { hour: "15", minute: "30" },
    { hour: "16", minute: "00" },
    { hour: "16", minute: "30" },
    { hour: "17", minute: "00" },
    { hour: "17", minute: "30" },
    { hour: "18", minute: "00" },
    { hour: "18", minute: "30" }
];

const Dashboard = () => {
    // const [studioImages_db, setStudioImages_db] = useState<StudioImageDb[]>([]);
    // const [studioImages_db, setStudioImages_db] = useState<string[]>([]);

    // const [studio, setStudio] = useState<Studio>();

    useEffect(() => {
        const fetchStudio = async () => {
            const res = await fetch("http://localhost:8080/api/v1/dashboard/get-studio", {
                credentials: "include"
            });
            const data: Studio = await res.json();
            // setStudio(data);
            setStudioName_name(data.name);
            setDescription_new(data.description)
        }

        fetchStudio();
    }, [])

    const [images_db, setImages_db] = useState<Img_db[]>([]);


    useEffect(() => {
        const fetchStudioImages = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/v1/dashboard/get-images",
                    { credentials: "include" }
                );
                const data: Img_db[] | null = await res.json();
                if (data) {
                    setImages_db([...data]);
                }

            } catch (err: any) {
                console.error("Error fetching images: ", err)
            }
        }

        fetchStudioImages();

    }, []);

    const [artists, setArtists] = useState<Artist[]>([]);

    useEffect(() => {
        const fetchArtists = async () => {
            const res = await fetch("http://localhost:8080/api/v1/dashboard/get-artists", {
                credentials: "include"
            });

            const data: Artist[] = await res.json();
            setArtists(data);
        }

        fetchArtists();
    }, [])

    const [services_db, setServices_db] = useState<Service[]>([]);

    useEffect(() => {
        const fetchServices = async () => {
            const res = await fetch("http://localhost:8080/api/v1/dashboard/get-services", {
                credentials: "include"
            });

            const data: Service[] = await res.json();
            setServices_db(data);
        }

        fetchServices();
    }, []);

    const [freeAppointments_db, setFreeAppointments_db] = useState<FreeAppointment_db[]>([]);

    useEffect(() => {

        const fetchFreeAppointments = async () => {
            const res = await fetch("http://localhost:8080/api/v1/dashboard/get-appointments", {
                credentials: "include"
            });
            const data: FreeAppointment_db[] = await res.json();
            console.log(data);
            setFreeAppointments_db(data);
        }

        fetchFreeAppointments();
    }, []);

    const [img_local, setImg_local] = useState<Img_local[]>([]);

    const handleUpload = (e: any) => {
        // 2. Convert to a typed File array
        const files = Array.from(e.target.files) as File[];

        if (files.length > 3) {
            alert("Error: You can only upload up to 3 images.");
            return;
        }

        const newImages: Img_local[] = files.map((file: File) => ({
            file,
            url: URL.createObjectURL(file)
        }));

        setImg_local(prev => [...prev, ...newImages].slice(0, 3));
    };

    const removeImage = (url: string) => {
        setImg_local(prev => prev.filter(img => img.url !== url)); // if you do not have an identification variable you can id every element with UIID or Crypto
    };

    const sendImages = async () => {
        const formData = new FormData();

        img_local.forEach((img, index) => {
            formData.append(`images`, img.file);
        });

        const response = await fetch('http://localhost:8080/api/v1/dashboard/upload-images', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });

        if (!response.ok) {
            setError("Error: Images update failed")
            throw new Error('Error: Images update failed');
        }

        const data = await response.json();
        setImages_db(data);
        setImg_local([]);
    }

    const [studioName_new, setStudioName_name] = useState("");
    const [description_new, setDescription_new] = useState("");
    const [successDetails, setSuccessDetails] = useState("");

    const sendDetails = async () => {
        const detailsReq = {
            name: studioName_new,
            description: description_new
        }

        const res = await fetch(`http://localhost:8080/api/v1/dashboard/send-details`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(detailsReq)
        })

        if (!res.ok) {
            console.error("Error: sendDetails failed");
            throw new Error('Error: sendDetails failed');
        }
        setSuccessDetails("Details updated successfully!");
    }

    const [stylists, setStylists] = useState<Hairstylist[]>([]);

    // Local state for the "New Card" inputs
    const [newArtistName, setNewArtistName] = useState("");
    const [newArtistRole, setNewArtistRole] = useState("");
    const [newArtistImg, setNewArtistImg] = useState<File | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const postArtist = async () => {
        if (!newArtistName || !newArtistRole) {
            alert("Artist name and role cannot be empty.");
            return;
        }
        const formData = new FormData();

        formData.append('name', newArtistName);
        formData.append('role', newArtistRole);
        if (newArtistImg)
            formData.append('img', newArtistImg);

        const res = await fetch(`http://localhost:8080/api/v1/dashboard/send-artist`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        })

        if (!res.ok) {
            console.error("Error: postArtist failed");
            throw new Error('Error: postArtist failed');
        }

        const data = await res.json();
        artists.push(data);
        setArtists([...artists]);
    }

    const removeArtist = async (id: number) => {
        const res = await fetch(`http://localhost:8080/api/v1/dashboard/remove-artist/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        if (!res.ok) {
            console.error("Error: removeArtist failed");
            throw new Error('Error: removeArtist failed');
        }

        setArtists(prev => prev.filter(a => a.id !== id));
    };

    const [newServiceName, setNewServiceName] = useState("");
    const [newServiceTime, setNewServiceTime] = useState("");
    const [newServiceExtra, setNewServiceExtra] = useState("");
    const [newServicePrice, setNewServicePrice] = useState("");

    const sendService = async () => {
        const newService: Service = {
            id: null,
            name: newServiceName,
            time: newServiceTime,
            extra: newServiceExtra,
            price: newServicePrice
        };

        const res = await fetch(`http://localhost:8080/api/v1/dashboard/add-service`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(newService)
        });

        if (!res.ok) {
            console.log("Error: sendService")
            throw new Error('Error: sendService failed');
        }
        const data = await res.json();
        services_db.push(data);
        setServices_db([...services_db]);

    };

    const removeService = async (id: number) => {
        console.log("hello")
        const res = await fetch(`http://localhost:8080/api/v1/dashboard/remove-service/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if (!res.ok) {
            console.log("Error: removeService")
            throw new Error('Error: removeService failed');
        }

        setServices_db(prev => prev.filter(s => s.id !== id));
    };

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

    const [selectArtist, setSelectArtist] = useState<Artist | null>(null);

    const [freeAppointments, setFreeAppointments] = useState<FreeAppointment[]>([])
    // const [freeAppointments_db, setFreeAppointments_db] = useState<FreeAppointment_db[]>([])


    const addTime = (day: string, newTime: Termin) => {
        freeAppointments.push({ date: day, hour: newTime.hour, minute: newTime.minute, artist_id: 0, id: 0 });
        setFreeAppointments([...freeAppointments]);
    }

    const deleteTime = (day: string, termin: Termin) => {
        const idx = freeAppointments.findIndex(item =>
            item.date === day && item.hour === termin.hour && item.minute === termin.minute
        );

        freeAppointments.splice(idx, 1);

        setFreeAppointments([...freeAppointments]);
    }

    const checkIfTerminIsTaken = (day: string, termin: Termin) => {
        const idx = freeAppointments.findIndex(item => item.date === day && item.hour === termin.hour && item.minute === termin.minute);
        return idx != -1; // idx = -1 termin not taken && idx != -1 termin taken
    }

    // Free Appointments POST request
    const setNewAppointments = async () => {
        freeAppointments.forEach(freeApp => freeApp.artist_id = selectArtist!.id);


        const res = await fetch(`http://localhost:8080/api/v1/dashboard/set-appointments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(freeAppointments)
        });

        if (res.status === 400) {
            setErrorFreeAppointements("Appointment already exists.");
            return;
        }

        if (!res.ok) {
            console.log("Internal Server Error: setNewAppointments")
            throw new Error('Internal Server Error: setNewAppointments failed');
            
        }

        const data = await res.json();
        console.log(data)
        setFreeAppointments_db(data);
    }

    const handleCancelAppointment = async (id: number) => {
        const res = await fetch(`http://localhost:8080/api/v1/dashboard/cancel-appointment/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if (!res.ok) {
            console.log("Error: cancel appointment failed")
            throw new Error('Error: cancel appointment failed');
        }

        setFreeAppointments_db(prev => prev.filter(app => app.id !== id));
    }

    const [errorFreeAppointments, setErrorFreeAppointements] = useState("");
    const [success, setSuccess] = useState("");

    console.log(freeAppointments_db);
    return (
        <main className="max-w-5xl mx-auto px-4 py-8">

            <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-8">
                <div className="p-6 border-b border-slate-100">
                    <h2 className="text-xl font-bold">Dashboard</h2>
                    <h5>Here is where the Magic happens. You as a Proffesional Hairstylist will style your
                        Studio Page and make it look awesome! Upload your pictures, fill in the details
                        (like Barbers and Hairstyles) and set your free schedule.</h5>
                    <h5 className="mt-5 font-bold text-sm">Caution: crop the images to make them fit your Design since we do not have the Fancy Google, Facebook image drag drop ... blah blah blah</h5>
                </div>

                <section>
                    <div className="p-6 border-b border-slate-100">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-l font-bold">Studio Images</h3>

                            <div>
                                <label className="block text-yellow-300 mb-3">Warning: this will delete currently uploaded images.</label>
                                <label className="block text-red-400 mb-3">Max 3 images.</label>
                                {/* Hidden file input triggered by custom button */}
                                <label className="bg-slate-800 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-slate-700 transition">
                                    Upload Photos
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleUpload}
                                        disabled={images_db.length >= 3}
                                    />
                                </label>

                            </div>
                        </div>

                        {/* Image Grid */}
                        {img_local.length > 0 ?
                            <div>
                                <div className="flex gap-4">
                                    {img_local.map((image, i) => (
                                        <div key={i} className="relative w-24 h-24 border border-slate-200 rounded-md overflow-hidden">
                                            <img
                                                src={image.url}
                                                alt="preview"
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                onClick={() => removeImage(image.url)}
                                                className="absolute top-1 right-1 bg-white/80 rounded-full p-1 hover:bg-white">
                                                <div className="text-slate-800">X</div>
                                            </button>
                                        </div>
                                    ))}

                                    {/* Empty slots placeholders */}
                                    {[...Array(3 - img_local.length)].map((_, i) => (
                                        <div key={i} className="w-24 h-24 border-2 border-dashed border-slate-100 rounded-md flex items-center justify-center text-slate-300">
                                            +
                                        </div>
                                    ))}
                                </div>
                                <section className="flex items-center gap-5 mt-8 ">
                                    <button className="p-3 w-30 bg-[var(--royal-purple)] text-white cursor-pointer rounded-sm"
                                        onClick={sendImages}>Send</button>
                                    <h3 className="text-green-300">{success}</h3>
                                </section>
                            </div>
                            :
                            <div className="flex gap-4">
                                {images_db.map((image, i) => (
                                    <div key={i} className="relative w-24 h-24 border border-slate-200 rounded-md overflow-hidden">
                                        <img
                                            src={image.img}
                                            alt="preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}

                                {/* Empty slots placeholders */}
                                {[...Array(3 - images_db.length)].map((_, i) => (
                                    <div key={i} className="w-24 h-24 border-2 border-dashed border-slate-100 rounded-md flex items-center justify-center text-slate-300">
                                        +
                                    </div>
                                ))}
                            </div>
                        }

                    </div>


                </section>

                <div className="p-6 border-b border-slate-100">
                    <h3 className="text-l font-bold mb-8">Details</h3>
                    <div className="flex flex-col gap-1.5 mb-5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-tight ml-1">
                            Studio name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. John Doe"
                            className="w-full px-4 py-3 bg-white border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-100 focus:border-slate-400 transition-all"
                            value={studioName_new}
                            onChange={e => setStudioName_name(e.target.value)}
                        />
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-tight ml-1 mt-5">
                            Descritpion
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. John Doe"
                            className="w-full px-4 py-3 bg-white border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-100 focus:border-slate-400 transition-all"
                            value={description_new}
                            onChange={e => setDescription_new(e.target.value)}
                        />
                        <section className="flex items-center gap-5 mt-8">
                            <button className="p-3 w-30 bg-[var(--royal-purple)] text-white cursor-pointer rounded-sm"
                                onClick={sendDetails}>Send</button>
                            <h3 className="text-green-300">{successDetails}</h3>
                        </section>
                    </div>
                </div>


                <div>
                    <div className="p-6 space-y-8">
                        {/* 1. INPUT CARD (The Form) */}
                        <div className="max-w-sm p-4 border-2 border-slate-800 rounded-xl bg-slate-50">
                            <h3 className="text-sm font-bold mb-3 uppercase tracking-wider text-slate-500">Add New Stylist</h3>
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full p-2 border rounded-md"
                                    value={newArtistName}
                                    onChange={(e) => setNewArtistName(e.target.value)}
                                />
                                <p className="text-xs text-slate-500">* mandatory</p>
                                <input
                                    type="text"
                                    placeholder="Role (e.g. Master Barber)"
                                    className="w-full p-2 border rounded-md"
                                    value={newArtistRole}
                                    onChange={(e) => setNewArtistRole(e.target.value)}
                                />
                                <p className="text-xs text-slate-500">* mandatory</p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="text-xs text-slate-500 cursor-pointer"
                                    onChange={(e) => setNewArtistImg(e.target.files?.[0] || null)}
                                />
                                <button
                                    onClick={postArtist}
                                    className="w-full bg-slate-800 text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-slate-700">
                                    + Add to List
                                </button>
                            </div>
                        </div>

                        <hr />

                        {/* 2. Artists from DB */}
                        <div className="flex gap-4">
                            {artists.map((a) => (
                                <div key={self.crypto.randomUUID()} className="relative w-48 p-4 border rounded-xl shadow-sm text-center">
                                    <button
                                        onClick={() => removeArtist(a.id)}
                                        className="absolute top-2 right-2 text-slate-400 hover:text-red-500">
                                        X
                                    </button>
                                    <img src={a.img} className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border" alt="" />
                                    <h4 className="font-bold text-slate-800">{a.name}</h4>
                                    <p className="text-xs text-slate-500 uppercase">{a.role}</p>
                                </div>
                            ))}

                            {/* Empty Placeholder Slots */}
                            {[...Array(3 - stylists.length)].map((_, i) => (
                                <div key={i} className="w-48 h-40 border-2 border-dashed border-slate-100 rounded-xl flex items-center justify-center text-slate-200">
                                    {/* <ImageIcon size={32} /> */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <div className="p-6 border-b border-slate-100">


                    <div className="relative p-5 border border-slate-200 rounded-xl bg-white shadow-sm hover:border-slate-300 transition-colors w-1/2 mb-8">
                        {/* Clear Button */}
                        <button
                            className="absolute top-3 right-3 text-slate-300 hover:text-red-500 transition">
                            X
                        </button>

                        <div className="space-y-4">
                            {/* Service Name */}
                            <div>
                                <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Service Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Skin Fade"
                                    className="w-full text-sm font-semibold border-b border-slate-100 focus:border-slate-800 outline-none pb-1 mt-1"
                                    value={newServiceName}
                                    onChange={e => setNewServiceName(e.target.value)}
                                />
                            </div>

                            {/* Time & Price Row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                                        Time
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="30 min"
                                        className="w-full text-sm border-b border-slate-100 focus:border-slate-800 outline-none pb-1 mt-1"
                                        value={newServiceTime}
                                        onChange={e => setNewServiceTime(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                                        $Price
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="$25"
                                        className="w-full text-sm border-b border-slate-100 focus:border-slate-800 outline-none pb-1 mt-1 font-medium text-emerald-600"
                                        value={newServicePrice}
                                        onChange={e => setNewServicePrice(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Extra Info */}
                            <div>
                                <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                                    + Extra Info
                                </label>
                                <input
                                    type="text"
                                    placeholder="Includes wash & style"
                                    className="w-full text-xs text-slate-500 border-b border-slate-100 focus:border-slate-800 outline-none pb-1 mt-1"
                                    value={newServiceExtra}
                                    onChange={e => setNewServiceExtra(e.target.value)}
                                />
                            </div>
                            <button className="text-green-300 cursor-pointer" onClick={sendService}>Save</button>
                        </div>
                    </div>

                    <label className="text-xs font-bold text-slate-500 uppercase tracking-tight ml-1">
                        Service
                    </label>
                    <div className="flex gap-4 flex-wrap flex-col sm:flex-row">
                        {services_db.map((s) => (
                            <div id={self.crypto.randomUUID()} className="relative p-5 border border-slate-200 rounded-xl bg-white shadow-sm hover:border-slate-300 transition-colors w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] mb-8">
                                {/* Clear Button */}
                                <button
                                    onClick={async () => await removeService(s.id!)}
                                    className="absolute top-3 right-3 text-slate-300 hover:text-red-500 transition">
                                    X
                                </button>

                                <div className="space-y-4">
                                    {/* Service Name */}
                                    <div>
                                        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Service Name</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Skin Fade"
                                            className="w-full text-sm font-semibold border-b border-slate-100 focus:border-slate-800 outline-none pb-1 mt-1"
                                            value={s.name}
                                            readOnly
                                        />
                                    </div>

                                    {/* Time & Price Row */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                                                Time
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="30 min"
                                                className="w-full text-sm border-b border-slate-100 focus:border-slate-800 outline-none pb-1 mt-1"
                                                value={s.time}
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                                                $Price
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="$25"
                                                className="w-full text-sm border-b border-slate-100 focus:border-slate-800 outline-none pb-1 mt-1 font-medium text-emerald-600"
                                                value={s.price}
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    {/* Extra Info */}
                                    <div>
                                        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                                            + Extra Info
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Includes wash & style"
                                            className="w-full text-xs text-slate-500 border-b border-slate-100 focus:border-slate-800 outline-none pb-1 mt-1"
                                            value={s.extra}
                                            readOnly
                                        />
                                    </div>
                                    <button className="text-green-300 cursor-pointer">Save</button>
                                </div>
                            </div>
                        ))}

                    </div>

                </div>


                <section>
                    {freeAppointments_db.length > 0 && (
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-slate-800">Active Appointments</h2>
                            <div className="flex gap-6 overflow-x-auto select-none no-scrollbar py-4">
                                {freeAppointments_db.map((appointment) => (
                                    <div key={appointment.id} className="flex flex-col items-center gap-3 flex-shrink-0 w-14 snap-center">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                            {appointment.date}
                                        </span>
                                        <button className="w-14 h-14 rounded-full font-bold text-lg transition-all duration-200 flex items-center justify-center border-2 bg-green-600 border-green-600 text-white hover:bg-violet-700 shadow-md shadow-violet-100 active:scale-95">
                                            {appointment.hour}:{appointment.minute}
                                        </button>
                                        <p className="text-md text-red-400 cursor-pointer" onClick={() => handleCancelAppointment(appointment.id)}>
                                            Cancel
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-slate-800">Select Date</h2>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Next 2 Weeks</span>
                    </div>



                    {artists.length > 0 ?
                        <div className="p-6">
                            <div ref={scrollRef} onMouseDown={handleMouseDown} className={`flex gap-6 overflow-x-auto select-none no-scrollbar py-4 
                                ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
                                snap-x snap-mandatory scroll-smooth h-30`} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                {days.map((day) => {
                                    const isSelected = selectedDate === day.id;

                                    return (
                                        <>
                                            {isSelected ?
                                                <div
                                                    key={day.id}
                                                    className="flex flex-col items-center gap-3 flex-shrink-0 w-14 snap-center">
                                                    {/* Weekday Label */}
                                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${day.isToday ? 'text-violet-600' : 'text-slate-400'}`}>
                                                        {day.isToday ? 'Today' : day.weekday}
                                                    </span>

                                                    {/* Purple Circle */}
                                                    <button
                                                        onClick={() => setSelectedDate(day.id)}
                                                        className={`w-14 h-14 rounded-full font-bold text-lg transition-all duration-200 flex items-center justify-center border-2
                                                    bg-green-500 border-green-500 text-white scale-110 shadow-lg shadow-green-100`}>
                                                        {day.dayNum}
                                                    </button>
                                                </div>
                                                :
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
                                                        className={`w-14 h-14 rounded-full font-bold text-lg transition-all duration-200 flex items-center justify-center border-2
                                                    bg-violet-600 border-violet-600 text-white hover:bg-violet-700 shadow-md shadow-violet-100 active:scale-95`}>
                                                        {day.dayNum}
                                                    </button>
                                                </div>
                                            }
                                        </>
                                    );
                                })}
                            </div>



                            {selectedDate &&
                                <div className="p-6 border-b border-slate-100">
                                    {/* // for the next week */}
                                    <h3 className="text-l font-bold mb-4">Free Apointments</h3>
                                    <div className="w-full flex gap-4 p-4 flex-wrap">
                                        {schedule.map((time, i) => {

                                            return (
                                                <div>
                                                    {checkIfTerminIsTaken(selectedDate, time) ?
                                                        <div key={i} className="flex-shrink-0 snap-center border border-slate-200 p-6 bg-green-300 text-black"
                                                            onClick={() => deleteTime(selectedDate, time)}>
                                                            {time.hour}:{time.minute}
                                                        </div>
                                                        :
                                                        <div key={i} className="flex-shrink-0 snap-center border border-slate-200 p-6 bg-gray-300"
                                                            onClick={() => addTime(selectedDate, time)}>
                                                            {time.hour}:{time.minute}
                                                        </div>
                                                    }
                                                </div>
                                            );
                                        })
                                        }

                                    </div>
                                </div>
                            }

                            {freeAppointments.length > 0 &&
                                <div className="w-full py-4">
                                    <h2 className="text-xl font-bold mb-4 px-2">{artists.length == 0 ? "You have to add Artist first" : "Select Artists"}</h2>
                                    <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide px-2">
                                        {artists.map((artist) => (
                                            <div className="flex flex-col items-center gap-2 flex-shrink-0">
                                                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm transition-transform hover:scale-105
                                                    ${selectArtist == artist && "border-green-400"}`}
                                                    onClick={() => setSelectArtist(artist)}>
                                                    <img
                                                        src={artist.img}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700 truncate w-24 text-center">
                                                    {artist.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }

                            {selectArtist &&
                                <div className="p-6 flex items-center gap-5">
                                    <button className="p-3 w-30 bg-[var(--royal-purple)] text-white cursor-pointer rounded-sm"
                                        onClick={setNewAppointments}>Save</button>
                                    {errorFreeAppointments &&
                                        <p className="text-red-500">{errorFreeAppointments}</p>
                                    }
                                </div>
                            }


                        </div>
                        :
                        <div className="p-6">
                            <h3 className="text-l font-bold mb-4">You have to add Artist first</h3>
                        </div>
                    }


                </section>
            </section>
        </main>
    );
};

export default Dashboard;