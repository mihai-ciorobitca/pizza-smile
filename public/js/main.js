const { Fragment, useState, useEffect } = React;

// SLIDESHOW BURGERI
function HeroBanner() {
    const burgerImages = [
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&h=400&w=600",
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&h=400&w=600",
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&h=400&w=600"
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % burgerImages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return React.createElement(
        "section",
        { className: "bg-yellow-100 py-20 px-6 mt-12 rounded-t-3xl text-center" },
        // titlu animat
        React.createElement(
            "h2",
            { className: "ff-title text-5xl mb-6" },
            React.createElement("span", { className: "text-yellow-400 mr-2" }, "Burger"),
            React.createElement("span", { className: "text-red-500 animate-bounce inline-block" }, "Time")
        ),
        // slider
        React.createElement(
            "div",
            { className: "mx-auto mb-4 w-full max-w-4xl rounded-2xl overflow-hidden relative bg-gray-100" },
            React.createElement(
                "div",
                {
                    className: "flex transition-transform duration-1000",
                    style: { transform: `translateX(-${currentIndex * 100}%)` }
                },
                burgerImages.map((img, index) =>
                    React.createElement("img", {
                        key: index,
                        src: img,
                        alt: `Burger ${index + 1}`,
                        className: "w-full flex-shrink-0 object-contain"
                    })
                )
            )
        ),
        // descriere
        React.createElement(
            "p",
            { className: "text-center text-lg max-w-2xl mx-auto text-gray-800" },
            "Descoperă burgeri suculenți și meniuri delicioase. Cartofi crocanți și băuturi răcoritoare completează experiența Burger Time!"
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
    const placeholderImg = "https://images.unsplash.com/photo-1550547660-d9450f859349?crop=entropy&cs=tinysrgb&fit=max&h=400&w=600";

    const menuData = [
        {
            category: "MENIU BURGERI", items: [
                { name: "CheeseBurger", price: "Singur: 20,90 lei / Combo: 31 lei", desc: "Chiflă cu susan, carne de vită 100 g, cașcaval, salată iceberg, roșii, ceapă, castraveți murați, sos BurgerTime, maioneză, ketchup" },
                { name: "Double CheeseBurger", price: "Singur: 29,90 lei / Combo: 39 lei", desc: "Chiflă cu susan, 2 x carne de vită 100 g, 2 felii cașcaval, salată iceberg, roșii, ceapă, castraveți murați, sos BurgerTime, maioneză, ketchup" },
                { name: "X-Burger", price: "Singur: 25,90 lei / Combo: 35 lei", desc: "Chiflă cu susan, carne de vită 150 g, cașcaval, bacon crocant, salată iceberg, roșii, ceapă roșie, castraveți murați, sos BurgerTime, maioneză" },
                { name: "CrispyBurger Mare", price: "Singur: 19,90 lei / Combo: 29 lei", desc: "Chiflă cu susan, piept de pui crispy, salată iceberg, maioneză, sos dulce-acrișor" },
                { name: "CrispyBurger Mic", price: "Singur: 16,90 lei / Combo: ~26 lei", desc: "Aceeași compoziție ca mai sus, porție mai mică de pui" },
            ]
        },
        {
            category: "CARTOFI PRAJITI", items: [
                { name: "Cartofi prăjiți Mică", price: "9 lei", desc: "Porție mică, crocanți și delicioși" },
                { name: "Cartofi prăjiți Mare", price: "12 lei", desc: "Porție mare, crocanți și delicioși" },
            ]
        },
        {
            category: "BĂUTURI", items: [
                { name: "Băuturi răcoritoare 0,4 l", price: "4,90 lei", desc: "Cola, Fanta, Sprite" },
                { name: "Băuturi răcoritoare 0,5 l", price: "6 lei", desc: "Cola, Fanta, Sprite" },
                { name: "Băuturi calde", price: "8-14 lei", desc: "Cafea, cappuccino, ceai etc." },
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
                React.createElement("h1", { className: "ff-title text-3xl text-red-500" }, "Burger Time"),
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

        React.createElement(HeroBanner),

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

        // CONTACT
        React.createElement("section", { className: "max-w-4xl mx-auto px-6 py-16" },
            React.createElement("h2", { className: "ff-title text-5xl text-center mb-8 text-red-600" }, "Contact"),
            React.createElement("div", { className: "bg-white p-10 shadow-lg rounded-2xl border border-gray-200 grid md:grid-cols-2 gap-6" },

                React.createElement("div", null,
                    React.createElement("p", { className: "text-lg mb-4 flex items-center gap-3" },
                        React.createElement("img", { src: "https://cdn-icons-png.flaticon.com/512/684/684908.png", alt: "Locație", className: "w-6 h-6" }),
                        "Târgu Neamț, Str. Principală 10"
                    ),
                    React.createElement("p", { className: "text-lg mb-4 flex items-center gap-3" },
                        React.createElement("img", { src: "https://cdn-icons-png.flaticon.com/512/159/159832.png", alt: "Telefon", className: "w-6 h-6" }),
                        "0740 987 654"
                    ),
                    React.createElement("p", { className: "text-lg mb-4 flex items-center gap-3 whitespace-pre-line" },
                        React.createElement("img", { src: "https://cdn-icons-png.flaticon.com/512/565/565313.png", alt: "Program", className: "w-6 h-6" }),
                        "Luni – Vineri: 10:00 – 22:00\nSâmbătă – Duminică: 12:00 – 22:00"
                    ),
                    React.createElement("p", { className: "text-lg flex items-center gap-3" },
                        React.createElement("img", { src: "https://cdn-icons-png.flaticon.com/512/732/732200.png", alt: "Email", className: "w-6 h-6" }),
                        "contact@burgertime.ro"
                    )
                ),

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
        React.createElement(GoogleReviewsSlider, { placeId: "ChIJZUUJMX9HNUcR45rsgPTiKuM" }),


        // FOOTER
        React.createElement("footer", { className: "bg-gray-800 text-white py-12" },
            React.createElement("div", { className: "max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8" },
                React.createElement("div", { className: "text-center md:text-left" },
                    React.createElement("h1", { className: "text-2xl font-bold mb-1" }, "Burger Time"),
                    React.createElement("p", { className: "text-gray-300 text-sm" }, "Fast Food Târgu Neamț")
                ),
                React.createElement("div", { className: "text-center" },
                    React.createElement("h2", { className: "text-lg font-semibold mb-1" }, "Program"),
                    React.createElement("p", { className: "text-gray-300 text-sm" }, "Luni – Vineri: 10:00 – 22:00"),
                    React.createElement("p", { className: "text-gray-300 text-sm" }, "Sâmbătă – Duminică: 12:00 – 22:00")
                ),
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
            React.createElement("div", { className: "mt-8 text-center text-gray-400 text-sm" },
                "© 2025 Burger Time. Toate drepturile rezervate."
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
