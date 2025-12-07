
const { Fragment, useState, useEffect } = React;


// ZONA DE JOACĂ (sus) – SLIDESHOW
function PlayZone() {
    const gameImages = [
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&h=400&w=600",
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&h=400&w=600",
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&h=400&w=600"
    ];

    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % gameImages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return React.createElement(
        "section",
        { className: "bg-yellow-100 py-20 px-6 mt-12 rounded-t-3xl" },
        // titlu
        React.createElement(
            "h2",
            { className: "ff-title text-5xl text-center mb-6 text-red-500" },
            React.createElement(
                "span",
                { className: "text-green-500 animate-bounce inline-block mr-2" },
                "NOU!"
            ),
            "Mănânci, te joci, te distrezi!"
        ),
        // slider container
        React.createElement(
            "div",
            {
                className: "mx-auto mb-4 w-full max-w-4xl rounded-2xl overflow-hidden relative bg-gray-100"
            },
            React.createElement(
                "div",
                {
                    className: "flex transition-transform duration-1000",
                    style: { transform: `translateX(-${currentIndex * 100}%)` }
                },
                gameImages.map((img, index) =>
                    React.createElement("img", {
                        key: index,
                        src: img,
                        alt: `Joc ${index + 1}`,
                        className: "w-full flex-shrink-0 object-contain"
                    })
                )
            )
        ),
        // descriere
        React.createElement(
            "p",
            { className: "text-center text-lg max-w-2xl mx-auto text-gray-800" },
            "La CuSos ai acces la jocuri de societate, o zonă cosy și un vibe relaxant. Perfect pentru prieteni, familie și energie bună."
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


function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const placeholderImg = "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&h=400&w=600";

    const menuData = [
        {
            category: "KEBAB", items: [
                { name: "Piatto Kebab (550g)", price: "21 lei", desc: "carne shaorma, cartofi prăjiți, salată, sosuri, castraveți, ceapă, roșii" },
                { name: "Kebab (400g / 330g / 290g)", price: "18 / 16 / 14 lei", desc: "pită mare / medie / mică, carne shaorma, salată, sosuri, castraveți, ceapă, roșii" },
                { name: "Roll Kebab (500g / 400g / 300g)", price: "20 / 17 / 14 lei", desc: "lipie mare / medie / mică, carne shaorma, salată, castraveți, ceapă, sosuri" },
                { name: "Crispy Kebab (350g)", price: "17 lei", desc: "3 buc. crispy stick, shaorma, verdețe, 2 sosuri" },
                { name: "Crispy Roll (350g)", price: "17 lei", desc: "3 buc. crispy, salată verde, castraveți, ceapă, 2 sosuri" },
                { name: "Hamburger (350g)", price: "12 lei", desc: "pită arabă, hamburger vegetal, salată verde, roșii, castraveți, ceapă" },
                { name: "Sandwich Pui (330g)", price: "17 / 13 lei", desc: "1 piept pui / piept pui mic, pită, salată, roșii, castraveți, ceapă, 1 sos" },
            ]
        },
        {
            category: "MENIURI", items: [
                { name: "Meniu Kebab + Cola (380g)", price: "18 lei", desc: "—" },
                { name: "Meniu Crispy 3 buc. (400g)", price: "17 lei", desc: "crispy stick, cartofi, pită + 1 sos" },
                { name: "Meniu Crispy 5 buc. (570g)", price: "20 lei", desc: "crispy, salată, cartofi, pită + 2 sosuri" },
                { name: "Meniu Șnitel Pui (430g)", price: "19 lei", desc: "1 șnitel de pui, cartofi, salată, pită + 1 sos" },
                { name: "Meniu Nuggets (400g)", price: "19 lei", desc: "8 buc. nuggets, cartofi, salată, pită + 1 sos" },
                { name: "Meniu Aripioare (400g)", price: "20 lei", desc: "5 bucăți aripioare, cartofi, salată, pită + 1 sos" },
                { name: "Meniu Kids (300g)", price: "17 lei", desc: "nuggets, cartofi, sos" },
            ]
        },
        {
            category: "SALATE", items: [
                { name: "Salată Cusos / Crispy (300g / 350g)", price: "16 lei", desc: "carne rotațivă / 3 bucăți crispy, salată verde, roșii, castraveți, ceapă, măsline, feta, sos tzatziki" },
            ]
        },
        {
            category: "VEGETARIAN", items: [
                { name: "Piatto Falafel 6 buc. (550g)", price: "20 lei (mare)", desc: "—" },
                { name: "Roll Falafel 4 buc. (400g)", price: "19 lei", desc: "lipie, falafel, cartofi, salată, roșii, castraveți, ceapă, sos" },
                { name: "Sandwich (350g)", price: "14 lei", desc: "pită, ardei vegetarian, salată, roșii, castraveți, ceapă, sos" },
                { name: "Hamburger (350g)", price: "14 lei", desc: "pită, hamburger vegetal, cartofi, salată, roșii, castraveți, ceapă" },
            ]
        },
        {
            category: "GARNITURI", items: [
                { name: "Cartofi pai (230g)", price: "7 lei", desc: "—" },
                { name: "Pitã", price: "2 lei", desc: "—" },
                { name: "Sos extra", price: "2 lei", desc: "original, usturoi, picant, dressing, ketchup" },
            ]
        },
        {
            category: "BĂUTURI", items: [
                { name: "Sucuri naturale", price: "6 lei", desc: "—" },
                { name: "Sucuri", price: "10 lei", desc: "—" },
                { name: "Limonadă", price: "10 lei", desc: "—" },
                { name: "Apă", price: "4 lei", desc: "—" },
                { name: "Băuturi calde", price: "5 lei", desc: "—" },
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
                React.createElement("h1", { className: "ff-title text-3xl text-red-500" }, "CuSos"),
                React.createElement("button", { className: "md:hidden text-gray-700 text-3xl", onClick: () => setMenuOpen(true) }, "☰"),
                React.createElement("ul", { className: "hidden md:flex gap-6" },
                    sections.map(sec =>
                        React.createElement("li", { key: sec },
                            React.createElement("a", { href: `#${sec}`, className: "text-gray-700 hover:text-red-500 font-semibold block py-2" }, sec)
                        )
                    )
                )
            )
        ),

        React.createElement(PlayZone),

        // SECTIUNI MENIU
        menuData.map(category =>
            React.createElement("section", { key: category.category, id: category.category, className: "max-w-6xl mx-auto px-6 py-16" },
                React.createElement("h2", { className: "ff-title text-4xl mb-8 text-center text-red-600" }, category.category),
                React.createElement("div", { className: "grid md:grid-cols-3 gap-8" },
                    category.items.map(item =>
                        React.createElement("div", { key: item.name, className: "bg-white shadow-lg rounded-2xl p-4 hover:shadow-2xl transition transform hover:scale-105 flex flex-col justify-between" },
                            React.createElement("img", { src: placeholderImg, alt: item.name, className: "w-full h-48 object-cover rounded-xl mb-4" }),
                            React.createElement("h3", { className: "text-2xl ff-title text-gray-900 text-center mb-2" }, item.name),
                            React.createElement("p", { className: "text-gray-700 text-center mb-4" }, item.desc),
                            React.createElement("p", { className: "text-red-500 font-bold text-xl text-center" }, item.price)
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
                        "contact@cusos.ro"
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
        React.createElement(GoogleReviewsSlider, { placeId: "ChIJsfm07DlHNUcRX5dRXMY4WZU" }),

        // FOOTER
        React.createElement("footer", { className: "bg-gray-800 text-white py-12" },
            React.createElement("div", { className: "max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8" },

                // Brand
                React.createElement("div", { className: "text-center md:text-left" },
                    React.createElement("h1", { className: "text-2xl font-bold mb-1" }, "CuSos"),
                    React.createElement("p", { className: "text-gray-300 text-sm" }, "Fast Food Târgu Neamț")
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
                "© 2025 CuSos. Toate drepturile rezervate."
            )
        ),

        // MODAL HAMBURGER
        menuOpen && React.createElement("div", { className: "fixed inset-0 bg-black bg-opacity-95 z-50 flex flex-col justify-center items-center gap-8 p-6" },
            sections.map(sec =>
                React.createElement("button", {
                    key: sec,
                    className: "text-3xl text-white font-bold hover:text-yellow-400 transition",
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