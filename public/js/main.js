const { Fragment, useState, useEffect } = React;

// SLIDESHOW PIZZA
function HeroBanner() {
    const pizzaImages = [
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&h=400&w=600",
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&h=400&w=600"
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % pizzaImages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return React.createElement(
        "section",
        { className: "bg-yellow-100 py-20 px-6 mt-12 rounded-t-3xl text-center shadow-inner" },
        React.createElement(
            "h2",
            { className: "ff-title text-5xl mb-6 text-brown-700" },
            React.createElement("span", { className: "text-red-700 mr-2" }, "Pizza"),
            React.createElement("span", { className: "text-orange-500 animate-bounce inline-block mx-1" }, "Smile"),
        ),
        React.createElement(
            "div",
            { className: "mx-auto mb-4 w-full max-w-4xl rounded-2xl overflow-hidden relative bg-gray-100 shadow-lg" },
            React.createElement(
                "div",
                {
                    className: "flex transition-transform duration-1000",
                    style: { transform: `translateX(-${currentIndex * 100}%)` }
                },
                pizzaImages.map((img, index) =>
                    React.createElement("img", {
                        key: index,
                        src: img,
                        alt: `Pizza ${index + 1}`,
                        className: "w-full flex-shrink-0 object-cover"
                    })
                )
            )
        ),
        React.createElement(
            "p",
            { className: "text-center text-lg max-w-2xl mx-auto text-brown-800" },
            "Descoperă pizza delicioasă, burgeri suculenți și deserturi de casă. Livrăm direct la tine!"
        )
    );
}

function GoogleReviewsSlider({ placeId }) {
    const [reviews, setReviews] = React.useState([]);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [averageRating, setAverageRating] = React.useState(0);
    const [totalRatings, setTotalRatings] = React.useState(0);

    React.useEffect(() => {
        const map = new google.maps.Map(document.createElement("div"));
        const service = new google.maps.places.PlacesService(map);

        service.getDetails(
            {
                placeId: placeId,
                fields: ["name", "rating", "reviews", "user_ratings_total", "url"]
            },
            (place, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    const positiveReviews = place.reviews.filter(r => r.rating >= 3);
                    setReviews(positiveReviews);

                    setAverageRating(place.rating);
                    setTotalRatings(place.user_ratings_total);
                }
            }
        );
    }, [placeId]);

    React.useEffect(() => {
        if (!reviews.length) return;
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % reviews.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [reviews]);

    if (!reviews.length) return null;

    const currentReview = reviews[currentIndex];

    const renderStars = (rating) =>
        Array.from({ length: 5 }, (_, i) =>
            React.createElement("span", {
                key: i,
                className: `text-2xl ${i < rating ? "text-yellow-400" : "text-gray-300"}`,
                dangerouslySetInnerHTML: { __html: "&#9733;" }
            })
        );

    return React.createElement(
        "section",
        { className: "px-4 sm:px-6 lg:px-12 py-16" },
        React.createElement(
            "h2",
            { className: "ff-title text-5xl text-center mb-8 text-red-600" },
            "Recenzii"
        ),
        React.createElement(
            "div",
            { className: "max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10" },
            // Media recenziilor în interiorul cardului
            React.createElement(
                "div",
                { className: "text-center mb-6" },
                React.createElement(
                    "div",
                    { className: "flex items-center justify-center mb-2" },
                    renderStars(Math.round(averageRating))
                ),
                React.createElement(
                    "p",
                    { className: "text-gray-700 font-semibold" },
                    `${averageRating.toFixed(1)} din 5`
                ),
                React.createElement(
                    "p",
                    { className: "text-gray-400 text-sm" },
                    `(${totalRatings} recenzii reale)`
                )
            ),
            // Review individual
            React.createElement(
                "div",
                { className: "text-center" },
                React.createElement(
                    "p",
                    { className: "text-gray-700 text-xl mb-4 font-semibold" },
                    currentReview.author_name
                ),
                React.createElement(
                    "div",
                    { className: "flex justify-center mb-4" },
                    renderStars(currentReview.rating)
                ),
                React.createElement(
                    "p",
                    { className: "text-gray-700 italic mb-4 leading-relaxed break-words text-lg" },
                    currentReview.text
                ),
                React.createElement(
                    "span",
                    { className: "text-gray-400 text-sm block mb-4" },
                    `acum ${Math.floor((Date.now() - new Date(currentReview.time * 1000)) / (1000 * 60 * 60 * 24))} zile`
                ),
                React.createElement(
                    "p",
                    { className: "text-gray-400 text-xs text-center" },
                    "Powered by Google"
                )
            )
        )
    );
}


// MENIU PIZZA SMILE
function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const placeholderImg = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?crop=entropy&cs=tinysrgb&fit=max&h=400&w=600";

    const menuData = [
        {
            category: "PIZZA",
            items: [
                { name: "Pizza Casei", price: "28 / 35 LEI" },
                { name: "Pizza Napoli", price: "28 / 35 LEI" },
                { name: "Pizza țărănească", price: "28 / 35 LEI" },
                { name: "Pizza Quattro Formaggi", price: "28 / 35 LEI" },
                { name: "Pizza Prosciutto Crudo", price: "28 / 35 LEI" },
                { name: "Pizza Salami", price: "27 / 32 LEI" },
                { name: "Pizza Quatro Stagione", price: "27 / 32 LEI" },
                { name: "Pizza Capriciosa", price: "27 / 32 LEI" },
                { name: "Pizza O Sole Mio", price: "27 / 32 LEI" },
                { name: "Pizza Pesci", price: "27 / 32 LEI" },
                { name: "Pizza Funghi", price: "27 / 32 LEI" }
            ]
        },
        {
            category: "CARNE",
            items: [
                { name: "Hamburger 300 g", price: "18 LEI" },
                { name: "Cheeseburger 300 g", price: "18 LEI" },
                { name: "Cartofi prăjiți 250 g", price: "11 LEI" },
                { name: "Smile burger 500 g", price: "37 LEI" },
                { name: "Chicken burger 300 g", price: "30 LEI" },
                { name: "Crispy chicken 350 g", price: "37 LEI" },
                { name: "Aripioare crispy picante 450 g", price: "37 LEI" },
                { name: "Coaste de porc cu sos barbecue 550 g", price: "55 LEI" }
            ]
        },
        {
            category: "DESERT",
            items: [
                { name: "Brownie 150 g", price: "20 LEI" },
                { name: "Lava cake 180 g", price: "22 LEI" },
                { name: "Tiramisu 130 g", price: "20 LEI" },
                { name: "Înghețată 150 g", price: "15 LEI" }
            ]
        },
        {
            category: "BERE",
            items: [
                { name: "Heineken 400 ml", price: "11 LEI" },
                { name: "Heineken Silver 400 ml", price: "11 LEI" },
                { name: "Silas Moretti 330 ml", price: "8 LEI" },
                { name: "Birra Moretti 500 ml", price: "10 LEI" },
                { name: "Ciuc Premium Lager 500 ml", price: "9 LEI" },
                { name: "Golden Brau 500 ml", price: "8 LEI" },
                { name: "Silva Strong Dark Lager 500 ml", price: "13 LEI" },
                { name: "Desperados 400 ml", price: "16 LEI" },
                { name: "Ciuc Premium Lager Draught 400 ml", price: "8 LEI" },
                { name: "Heineken 0,0% 330 ml", price: "11 LEI" },
                { name: "Ciuc Radler Lemon 0,0% 500 ml", price: "10 LEI" },
                { name: "Ciuc Radler Zmeură 0,0% 500 ml", price: "10 LEI" }
            ]
        },
        {
            category: "RĂCORITOARE",
            items: [
                { name: "Pepsi Cola / Pepsi Twist / Mirinda / 7UP / Prigat suc / Mountain Dew 250–500 ml", price: "8–11 LEI" },
                { name: "Pepsi Max Zero Zahăr 500 ml", price: "11 LEI" },
                { name: "Ice Tea Lipton 500 ml (lămâie, piersică, zmeură, fructul pasiunii)", price: "11 LEI" },
                { name: "Nectar & Juice Prigat 250 ml (Căpșună-Banană, Piersici, Kiwi, Portocale)", price: "11 LEI" },
                { name: "Natural 500 ml", price: "11 LEI" },
                { name: "Cătină Yugo 250 ml", price: "15 LEI" },
                { name: "Aloe Vera 500 ml", price: "14 LEI" },
                { name: "Fresh natural 330 ml", price: "15 LEI" },
                { name: "Limonadă, Mere, Portocale, Grapefruit, Pink lemonade, Mint lemonade, Socată", price: "" },
                { name: "Aqua Carpatica plată/minerală 330–750 ml", price: "8–13 LEI" },
                { name: "Everess Tonic 250 ml", price: "8 LEI" },
                { name: "Rockstar Original / Xdurance 250 ml", price: "8 LEI" },
                { name: "Hard Seltzer Wet 330 ml (4,5%) – Mango, Grapefruit, Lime și Mentă, Piersică, Zmeură", price: "12 LEI" }
            ]
        },
        {
            category: "VINURI",
            items: [
                { name: "Purcari Chardonnay / Roze", price: "70 LEI" },
                { name: "Jidvei Mysterium Blanc / Rose", price: "70 LEI" },
                { name: "Dry Muscat “Fata în iarbă”", price: "36 LEI" },
                { name: "Jidvei Roze Grigorescu / Fetească Regală", price: "36 LEI" },
                { name: "Riunite Lambrusco Rose", price: "45 LEI" },
                { name: "Cricova Chardonnay / “Orasul subteran”", price: "30–40 LEI" },
                { name: "Grasă de Cotnari / Tămârnave Cotnari", price: "33 LEI" }
            ]
        },
        {
            category: "ALCOOLICE",
            items: [
                { name: "Jack Daniel’s", price: "24 LEI" },
                { name: "The Famous Grouse", price: "21 LEI" },
                { name: "J&B Rare", price: "22 LEI" },
                { name: "Jägermeister", price: "16 LEI" },
                { name: "Alexandrion 5* / 7*", price: "14–18 LEI" },
                { name: "Angelli", price: "18 LEI" },
                { name: "Bicken’s Gin / Wembley Gin", price: "16–18 LEI" },
                { name: "Absolut / Finlandia", price: "16–18 LEI" },
                { name: "Stalinskaya", price: "12 LEI" },
                { name: "Afinată Amigo / Vișinată Amigo", price: "12 LEI" }
            ]
        }
    ];

    const sections = menuData.map(cat => cat.category);

    const handleScrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setMenuOpen(false);
        }
    }

    return React.createElement(Fragment, null,
        // NAVBAR
        React.createElement("nav", { className: "fixed top-0 w-full bg-white shadow z-50" },
            React.createElement("div", { className: "max-w-6xl mx-auto px-6 py-4 flex justify-between items-center" },
                React.createElement("h1", { className: "ff-title text-3xl text-red-700" }, "Pizza Smile"),
                React.createElement("div", { className: "flex items-center gap-6" },
                    React.createElement("button", { className: "md:hidden text-brown-800 text-3xl", onClick: () => setMenuOpen(true) }, "☰")
                ),
                React.createElement("ul", { className: "hidden md:flex gap-6" },
                    sections.map(sec =>
                        React.createElement("li", { key: sec },
                            React.createElement("a", { href: `#${sec}`, className: "text-brown-800 hover:text-red-700 font-semibold block py-2" }, sec)
                        )
                    )
                )
            )
        ),

        React.createElement(HeroBanner),

        // SECTIUNI MENIU
        menuData.map(category =>
            React.createElement(
                "section",
                { key: category.category, id: category.category, className: "max-w-6xl mx-auto px-6 py-16" },

                React.createElement(
                    "h2",
                    { className: "ff-title text-4xl mb-8 text-center text-red-700" },
                    category.category
                ),

                React.createElement(
                    "div",
                    { className: "grid md:grid-cols-3 gap-8" },

                    category.items.map(item =>
                        React.createElement(
                            "div",
                            {
                                key: item.name,
                                className:
                                    "bg-cream shadow-lg rounded-2xl p-4 hover:shadow-2xl transition transform hover:scale-105 flex flex-col justify-between border border-brown-200"
                            },

                            // imagine
                            React.createElement("img", {
                                src: placeholderImg,
                                alt: item.name,
                                className: "w-full h-48 object-cover rounded-xl mb-4"
                            }),

                            // TITLU + PREȚ
                            React.createElement(
                                "h3",
                                { className: "text-2xl ff-title text-brown-900 text-center mb-2" },
                                item.name
                            ),

                            React.createElement(
                                "p",
                                { className: "text-red-700 font-bold text-xl text-center mt-auto" },
                                item.price || ""
                            )
                        )
                    )
                )
            )
        ),

        // CONTACT - Modern & Clean
        React.createElement("section", { className: "max-w-4xl mx-auto px-6 py-16" },
            React.createElement("h2", { className: "ff-title text-5xl text-center mb-8 text-red-600" }, "Contact"),
            React.createElement("div", { className: "bg-white p-10 shadow-lg rounded-2xl border border-gray-200 grid md:grid-cols-2 gap-6" },

                // Contact Info
                React.createElement("div", null,
                    // Locație
                    React.createElement("p", { className: "text-lg mb-4 flex items-center gap-3" },
                        React.createElement("img", {
                            src: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // locație
                            alt: "Locație",
                            className: "w-6 h-6"
                        }),
                        "Târgu Neamț, zona Centrală"
                    ),
                    // Telefon
                    React.createElement("p", { className: "text-lg mb-4 flex items-center gap-3" },
                        React.createElement("img", {
                            src: "https://cdn-icons-png.flaticon.com/512/159/159832.png", // telefon mai modern
                            alt: "Telefon",
                            className: "w-6 h-6"
                        }),
                        "0740 123 456"
                    ),
                    // Program
                    React.createElement("p", { className: "text-lg mb-4 flex items-center gap-3 whitespace-pre-line" },
                        React.createElement("img", {
                            src: "https://cdn-icons-png.flaticon.com/512/565/565313.png", // ceas modern
                            alt: "Program",
                            className: "w-6 h-6"
                        }),
                        "Luni – Vineri: 08:00 – 20:00\nSâmbătă – Duminică: 10:00 – 16:00"
                    ),
                    // Email
                    React.createElement("p", { className: "text-lg flex items-center gap-3" },
                        React.createElement("img", {
                            src: "https://cdn-icons-png.flaticon.com/512/732/732200.png", // email
                            alt: "Email",
                            className: "w-6 h-6"
                        }),
                        "contact@pizza-smile.ro"
                    )
                ),

                // Harta
                React.createElement("div", null,
                    React.createElement("iframe", {
                        className: "w-full h-64 rounded-xl border-0",
                        src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2730.555!2d26.9200!3d46.9150!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x474bb2cfb0b2c08f%3A0xabcdef1234567890!2sTârgu%20Neamț!5e0!3m2!1sro!2sro!4v1690000000000!5m2!1sro!2sro",
                        allowFullScreen: "",
                        loading: "lazy"
                    })
                )
            )
        ),


        // Reviews
        React.createElement(GoogleReviewsSlider, { placeId: "ChIJ7zbEdDpHNUcRiX1o_tyEVAA" }),


        // FOOTER
        React.createElement("footer", { className: "bg-gray-800 text-white py-12" },
            React.createElement("div", { className: "max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8" },

                // Brand
                React.createElement("div", { className: "text-center md:text-left" },
                    React.createElement("h1", { className: "text-2xl font-bold mb-1" }, "Pizza Smile"),
                    React.createElement("p", { className: "text-gray-300 text-sm" }, "Pizzerie Târgu Neamț")
                ),

                // Orar
                React.createElement("div", { className: "text-center" },
                    React.createElement("h2", { className: "text-lg font-semibold mb-1" }, "Program"),
                    React.createElement("p", { className: "text-gray-300 text-sm" }, "Luni – Vineri: 08:00 – 20:00"),
                    React.createElement("p", { className: "text-gray-300 text-sm" }, "Sâmbătă – Duminică: 10:00 – 16:00")
                ),

                // Social Media - Clean React Version
                React.createElement("div", { className: "text-center space-y-4" },
                    React.createElement("h2", { className: "text-xl font-bold uppercase tracking-wide" }, "URMĂREȘTE-NE"),
                    React.createElement("div", { className: "flex justify-center gap-6" },
                        React.createElement("a", { href: "https://www.facebook.com", target: "_blank", rel: "noopener noreferrer", className: "hover:opacity-80 transition-opacity" },
                            React.createElement("img", { src: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png", alt: "Facebook", className: "w-8 h-8" })
                        ),
                        React.createElement("a", { href: "https://www.instagram.com", target: "_blank", rel: "noopener noreferrer", className: "hover:opacity-80 transition-opacity" },
                            React.createElement("img", { src: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg", alt: "Instagram", className: "w-8 h-8" })
                        )
                    )
                )

            ),

            // Copyright
            React.createElement("div", { className: "mt-8 text-center text-gray-400 text-sm" },
                "© 2025 Pizza Smile. Toate drepturile rezervate."
            )
        ),

        // MODAL HAMBURGER
        menuOpen && React.createElement("div", { className: "fixed inset-0 bg-black bg-opacity-95 z-50 flex flex-col justify-center items-center gap-8 p-6" },
            sections.map(sec =>
                React.createElement("button", {
                    key: sec,
                    className: "text-3xl text-white font-bold hover:text-orange-400 transition",
                    onClick: () => handleScrollTo(sec)
                }, sec)
            ),
            React.createElement("button", { className: "absolute top-6 right-6 text-white text-4xl", onClick: () => setMenuOpen(false) }, "✕")
        )
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(
    React.createElement(App)
);
