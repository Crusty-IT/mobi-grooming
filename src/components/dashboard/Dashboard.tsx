'use client';

import React, { useState } from 'react';
import { Menu, X, Phone, MapPin, Clock, Star, Heart, Scissors, Sparkles, Calendar, ChevronRight, Facebook, Instagram, Mail, Award } from 'lucide-react';
import Informations from "../informations/Informations";
import Opinions from "../opinions/Opinions";

export default function Dashboard({ announcements }: { announcements: Array<{ slug: string; title: string; date?: string; body: string }> }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const services = [
        {
            icon: <Scissors className="w-8 h-8" />,
            title: "Trymowanie",
            description: "Bezbolesne usuwanie martwego podszerstka u psów szorstkowłosych (np. terierów). Niezbędne dla zachowania zdrowej skóry i prawidłowej struktury sierści.",
            price: "od 90 zł" // Przykładowa cena, dostosuj
        },
        {
            icon: <Sparkles className="w-8 h-8" />,
            title: "Strzyżenie i Modelowanie",
            description: "Profesjonalne strzyżenie maszynką i nożyczkami, dostosowane do standardu rasy lub Twoich preferencji. Usługa obejmuje precyzyjne nadanie pupilowi idealnej fryzury.",
            price: "od 80 zł" // Przykładowa cena, dostosuj
        },
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Kąpiele Specjalistyczne",
            description: "Profesjonalne mycie z użyciem specjalistycznych kosmetyków: pielęgnacyjnych, leczniczych lub koloryzujących. Dbamy o zdrowie i kondycję skóry oraz sierści.",
            price: "od 60 zł" // Przykładowa cena, dostosuj
        },
        {
            icon: <Star className="w-8 h-8" />,
            title: "Wyczesywanie Obfitej Sierści",
            description: "Intensywny zabieg usunięcia martwego podszerstka i rozczesywania sfilcowanej sierści. Pomaga zredukować linienie i przywraca komfort zwierzęciu.",
            price: "od 70 zł" // Przykładowa cena, dostosuj
        }
    ];

    const stats = [
        { number: "1000+", label: "Zadowolonych pupili" },
        { number: "13 lat", label: "Doświadczenia" },
        { number: "100%", label: "Miłości do zwierząt" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-blue-50">
            {/* Navigation - FIXED TOP */}
            <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50 border-b-4 border-pink-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-24">
                        {/* Logo */}
                        <div className="flex items-center space-x-4">
                            <img
                                src="https://github.com/Crusty-IT/mobi-grooming/blob/main/public/pictures/logo.jpg?raw=true"
                                alt="Mobi Logo"
                                className="h-16 w-16 rounded-full object-cover shadow-lg border-2 border-pink-200"
                            />
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">Mobi</h1>
                                <p className="text-sm text-gray-500 font-medium">Grooming Salon</p>
                            </div>
                        </div>

                        {/* Desktop Menu - LARGER & MORE VISIBLE */}
                        <div className="hidden lg:flex items-center space-x-2">
                            <a href="#onas" className="px-6 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition font-semibold rounded-lg text-lg">
                                O Nas
                            </a>
                            <a href="#uslugi" className="px-6 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition font-semibold rounded-lg text-lg">
                                Usługi
                            </a>
                            <a href="#certyfikaty" className="px-6 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition font-semibold rounded-lg text-lg">
                                Certyfikaty
                            </a>
                            <a href="#galeria" className="px-6 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition font-semibold rounded-lg text-lg">
                                Galeria
                            </a>
                            <a href="#opinie" className="px-5 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition font-semibold rounded-lg text-lg">
                                Opinie
                            </a>
                            <a href="#aktualnosci" className="px-5 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition font-semibold rounded-lg text-lg">
                                Aktualności
                            </a>
                            <a href="#kontakt" className="px-5 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition font-semibold rounded-lg text-lg">
                                Kontakt
                            </a>
                            <a
                                href="tel:+48690011396"
                                className="ml-4 flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full font-bold hover:shadow-xl transition transform hover:scale-105"
                            >
                                <Phone className="w-5 h-5" />
                                <span>690 011 396</span>
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-3 rounded-lg bg-pink-100 hover:bg-pink-200 transition"
                        >
                            {mobileMenuOpen ? <X className="w-7 h-7 text-pink-600" /> : <Menu className="w-7 h-7 text-pink-600" />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="lg:hidden py-6 space-y-2 border-t-2 border-pink-100 bg-white">
                            <a href="#onas" className="block py-3 px-4 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition font-semibold rounded-lg">
                               O Nas
                            </a>
                            <a href="#uslugi" className="block py-3 px-4 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition font-semibold rounded-lg">
                                Usługi
                            </a>
                            <a href="#certyfikaty" className="block py-3 px-4 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition font-semibold rounded-lg">
                                Certyfikaty
                            </a>
                            <a href="#galeria" className="block py-3 px-4 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition font-semibold rounded-lg">
                                Galeria
                            </a>
                            <a href="#opinie" className="block py-3 px-4 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition font-semibold rounded-lg">
                                Opinie
                            </a>
                            <a href="#aktualnosci" className="block py-3 px-4 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition font-semibold rounded-lg">
                                Aktualności
                            </a>
                            <a href="#kontakt" className="block py-3 px-4 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition font-semibold rounded-lg">
                                Kontakt
                            </a>
                            <a
                                href="tel:+48690011396"
                                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full font-bold mt-4"
                            >
                                <Phone className="w-5 h-5" />
                                <span>690 011 396</span>
                            </a>
                        </div>
                    )}
                </div>
            </nav>

            {/* Spacer for fixed nav */}
            <div className="h-24"></div>

            {/* Hero Section */}
            <section id="onas" className="relative overflow-hidden pt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h1 className="text-5xl md:text-5xl font-bold text-gray-900 leading-tight">
                                Twój pupil zasługuje na
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"> najlepszą </span>
                                pielęgnację
                            </h1>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                W 2012 roku, z pasji do zwierząt i przekonania, że każdy pupil zasługuje na wyjątkową troskę,
                                narodził się salon Mobi. Dzisiaj jesteśmy rozpoznawalnym salonem pielęgnacji psów, któremu zaufało ponad 1000 właścicieli.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Przez 13 lat nie tylko doskonaliliśmy nasze umiejętności, ale przede wszystkim budowaliśmy
                                relacje oparte na zaufaniu. Każdy pies, który przekracza próg naszego salonu, jest traktowany
                                jak członek rodziny. Wiemy, że to wyjątkowe miejsce – pełne cierpliwości, spokoju
                                i profesjonalizmu.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="tel:+48690011396" className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 flex items-center justify-center space-x-2">
                                    <Phone className="w-5 h-5" />
                                    <span>Umów wizytę</span>
                                </a>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                                <div className="aspect-square bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center">
                                    <div className="text-center text-gray-400">
                                        <img
                                            src="/sciezka/do/pliku/zdjecie-pupila.jpg"
                                            alt="Zdjęcie szczęśliwego pupila"
                                            className="w-24 h-24 mx-auto mb-4 object-cover"
                                        />
                                        <p className="text-lg">Zdjęcie szczęśliwego pupila</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-10 -right-10 w-40 h-40 bg-pink-300 rounded-full opacity-20 blur-3xl"></div>
                            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-purple-300 rounded-full opacity-20 blur-3xl"></div>
                        </div>
                    </div>

                    {/* Stats */}
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-20 pt-12 border-t border-gray-200"> {/* Zmniejszony odstęp (gap) */}
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                {/* Zmniejszony rozmiar czcionki na mobile */}
                                <div className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 mt-2">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="uslugi" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Nasze usługi
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Kompleksowa pielęgnacja dostosowana do indywidualnych potrzeb Twojego pupila
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="group bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-3xl hover:shadow-xl transition transform hover:-translate-y-2 cursor-pointer border border-pink-100 text-center flex flex-col h-full"
                            >
                                {/* Treść górna */}
                                <div>
                                    <div className="text-pink-500 mb-4 group-hover:scale-110 transition inline-block">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                                    <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                                </div>

                                {/* Cena wypchnięta na dół */}
                                <div className="flex items-center justify-center mt-auto">
                                    <span className="text-2xl font-bold text-pink-500">{service.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>


                </div>
            </section>

            {/* Why Mobi Section */}
            <section className="py-20 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Dlaczego Mobi?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Łączymy profesjonalizm z pasją do zwierząt
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
                            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Heart className="w-8 h-8 text-pink-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Indywidualne podejście</h3>
                            <p className="text-gray-600">Każdy pupil jest dla nas wyjątkowy. Dostosowujemy usługi do jego charakteru i potrzeb.</p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Sparkles className="w-8 h-8 text-purple-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Premium kosmetyki</h3>
                            <p className="text-gray-600">Używamy wyłącznie najwyższej jakości produktów bezpiecznych dla zwierząt.</p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Star className="w-8 h-8 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Doświadczenie</h3>
                            <p className="text-gray-600">13 lat praktyki i setki zadowolonych klientów. Twój pupil jest w dobrych rękach.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Certyfikaty Section - Placeholder */}
            <section id="certyfikaty" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-block mb-6">
                            <Award className="w-16 h-16 text-pink-500 mx-auto" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Nasze certyfikaty
                        </h2>
                        <p className="text-xl text-gray-600 mb-12">
                            Profesjonalizm potwierdzony kwalifikacjami
                        </p>
                        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-20 border-2 border-dashed border-pink-300">
                            <Award className="w-20 h-20 text-pink-300 mx-auto mb-4" />
                            <p className="text-gray-400 text-xl font-medium">Komponent certyfikatów zostanie dodany tutaj</p>
                            <p className="text-gray-300 text-sm mt-2">Miejsce na Twój własny komponent z certyfikatami</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Galeria Section - Placeholder */}
            <section id="galeria" className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-block mb-6">
                            <Sparkles className="w-16 h-16 text-purple-500 mx-auto" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Galeria
                        </h2>
                        <p className="text-xl text-gray-600 mb-12">
                            Zobacz efekty naszej pracy
                        </p>
                        <div className="bg-white rounded-3xl p-20 border-2 border-dashed border-purple-300">
                            <Heart className="w-20 h-20 text-purple-300 mx-auto mb-4" />
                            <p className="text-gray-400 text-xl font-medium">Komponent galerii zostanie dodany tutaj</p>
                            <p className="text-gray-300 text-sm mt-2">Miejsce na Twój własny komponent z galerią zdjęć</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <Opinions />

            {/* News Section */}
            <Informations announcements={announcements} />

            {/* Contact Section */}
            <section id="kontakt" className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Skontaktuj się z nami
                        </h2>
                        <p className="text-xl text-gray-600">
                            Chętnie odpowiemy na wszystkie pytania
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Informacje kontaktowe - bez zmian */}
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-2xl shadow-md flex items-start space-x-4">
                                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-6 h-6 text-pink-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Telefon</h3>
                                    <a href="tel:+48690011396" className="text-pink-500 hover:text-pink-600 transition">
                                        +48 690 011 396
                                    </a>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-md flex items-start space-x-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6 text-purple-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                                    <a href="mailto:kontakt@mobi-grooming.pl" className="text-purple-500 hover:text-purple-600 transition">
                                        kontakt@mobi-grooming.pl
                                    </a>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-md flex items-start space-x-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-blue-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Adres</h3>
                                    <p className="text-gray-600">ul. Szczecińska 26<br />73-110 Stargard</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-md flex items-start space-x-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-6 h-6 text-green-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Godziny otwarcia</h3>
                                    <p className="text-gray-600">
                                        Pn-Pt: 9:00 - 18:00<br />
                                        Sobota: 10:00 - 16:00<br />
                                        Niedziela: Zamknięte
                                    </p>
                                </div>
                            </div>

                            <div className="flex space-x-4 pt-6">
                                <a href="https://www.facebook.com/MOBISalonikPielegnacjiPsow" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white hover:bg-pink-600 transition transform hover:scale-110">
                                    <Facebook className="w-6 h-6" />
                                </a>
                                <a href="https://www.instagram.com/mobi_salon_pielegnacji_psow" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white hover:bg-purple-600 transition transform hover:scale-110">
                                    <Instagram className="w-6 h-6" />
                                </a>
                            </div>
                        </div>

                        {/* --- POCZĄTEK ZINTEGROWANEJ MAPY --- */}
                        {/* Zastosowano responsywne proporcje, czysty kod i dbano o dostępność */}
                        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2382.2099979581826!2d15.021344213383317!3d53.33949697217173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4700b9bba5bec0f3%3A0x9a30e2e233d42ef7!2sMobi.%20Salonik%20piel%C4%99gnacji%20ps%C3%B3w.%20Grzemska%20B.!5e0!3m2!1spl!2spl!4v1760907404988!5m2!1spl!2spl"
                                className="w-full h-full border-0 aspect-[4/3] md:aspect-video"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Lokalizacja salonu Mobi na mapie Google"
                            />
                        </div>
                        {/* --- KONIEC ZINTEGROWANEJ MAPY --- */}

                    </div>
                </div>
            </section>

            <footer className="bg-gray-900 text-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="border-t border-gray-800 pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-y-4 text-xs">

                            {/* Kolumna 1: Twórca strony - Z NOWĄ, NAJLEPSZĄ TECHNIKĄ */}
                            <div className="flex justify-center md:justify-start">
                                <a
                                    href="https://crusty-it.github.io/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-gray-400 hover:text-gray-200 transition-colors"
                                    aria-label="Strona wykonana przez Crusty IT"
                                >
                                    <span className="text-sm">Stworzone przez</span>


                                    <div className="relative h-4 w-24">

                                        <img
                                            src="https://raw.githubusercontent.com/shellupski/Moja-strona/main/images/logo_horizontaly.svg"
                                            alt="Crusty IT Logo"
                                            className="absolute top-1/2 left-0 -translate-y-1/2 h-15 w-auto"
                                        />
                                    </div>
                                </a>
                            </div>

                            {/* Kolumna 2: Prawa autorskie */}
                            <p className="text-gray-400 text-center">
                                © {new Date().getFullYear()} Mobi Grooming Salon. Wszystkie prawa zastrzeżone.
                            </p>

                            {/* Kolumna 3: Placeholder */}
                            <div className="hidden md:block"></div>

                        </div>
                    </div>
                </div>
            </footer>


            {/* Floating CTA Button */}
            <a
                href="tel:+48690011396"
                className="fixed bottom-6 right-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition transform hover:scale-110 z-50 flex items-center space-x-3"
            >
                <Phone className="w-6 h-6" />
                <span className="hidden sm:inline font-semibold">Zadzwoń teraz</span>
            </a>
        </div>
    );
}