import { u } from "motion/react-client";
import emailjs from '@emailjs/browser';
import useIsMobile from "./mobile";
import { useEffect, useState, useRef } from 'react';

const formatDate = () => {
    const now = new Date();
    const zi = String(now.getDate()).padStart(2, "0");
    const luna = String(now.getMonth() + 1).padStart(2, "0"); // lunile sunt 0-11
    const an = now.getFullYear();
    const ore = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");

    return `${zi}.${luna}.${an} ${ore}:${minute}`;
};


function Footer() {
    const [ip, setIp] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        fetch("https://api.ipify.org?format=json")
            .then(res => res.json())
            .then(data => setIp(data.ip))
            .catch(err => console.error("Eroare IP:", err));


    }, []);

    useEffect(() => {
        // După 2.5 secunde începem fade-out
        const fadeTimer = setTimeout(() => setFadeOut(true), 2500);

        // După 3 secunde ascundem complet popup-ul
        const hideTimer = setTimeout(() => setShowPopup(false), 3000);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    const popup = (
        <div
            className={`flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"
                }`}
        >
            <div className="flex items-center justify-center w-12 bg-emerald-500">
                <svg
                    className="w-6 h-6 text-white fill-current"
                    viewBox="0 0 40 40"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
                </svg>
            </div>

            <div className="px-4 py-2 -mx-3">
                <div className="mx-3">
                    <span className="font-semibold text-emerald-500 dark:text-emerald-400">Success</span>
                    <p className="text-sm text-gray-600 dark:text-gray-200">Your account was registered!</p>
                </div>
            </div>
        </div>
    );

    const triggerPopup = () => {
        setShowPopup(true);
        setFadeOut(false);

        // Fade-out după 2.5 secunde
        setTimeout(() => setFadeOut(true), 2500);

        // Ascunde complet după 3 secunde
        setTimeout(() => setShowPopup(false), 3000);
    };




    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();


        emailjs
            .sendForm('service_l3urp9b', 'template_e6n72jp', form.current, {
                publicKey: '59vHXHAq-YCEJYj-Z',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                    triggerPopup();
                    form.current.reset();
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };
    const small = (
        <section className="bg-white dark:bg-gray-900 lg:flex">
            {/* Text Section */}
            <div className="w-full p-8 pb-0 lg:bg-gray-100 lg:dark:bg-gray-800 lg:px-12 xl:px-32 lg:w-1/2 flex flex-col">
                <h1 className="text-2xl font-semibold text-gray-800 capitalize dark:text-white lg:text-3xl">
                    Contact me.
                </h1>
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                    Ask me everything and I would love to hear from you
                </p>
            </div>

            {/* Form Section */}
            <div className="w-full p-8 lg:w-1/2 lg:px-12 xl:px-24 flex flex-col">
                <form ref={form} onSubmit={sendEmail}>
                    <input type="hidden" name="time" value={formatDate()} />
                    <input type="hidden" name="ip" value={ip} />

                    <div className="-mx-2 md:items-center md:flex">
                        <div className="flex-1 px-2">
                            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                                Full Name
                            </label>
                            <input
                                required
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>

                        <div className="flex-1 px-2 mt-4 md:mt-0">
                            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                                Email address
                            </label>
                            <input
                                required
                                type="email"
                                name="email"
                                placeholder="johndoe@example.com"
                                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                    </div>

                    <div className="w-full mt-4">
                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                            Message
                        </label>
                        <textarea
                            required
                            className="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:h-56 dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                            name="message"
                            placeholder="Message"
                        ></textarea>
                    </div>

                    <button className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        get in touch
                    </button>
                </form>
            </div>
        </section>
    );


    return (

        <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
            {useIsMobile() ? small : null}
            <aside className="grid-flow-col items-center">
                <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
            </aside>
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/faydy">
                    <span className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-[#fff]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                            <path
                                d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                        </svg>
                    </span>
                </a>
                <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/fady-samman-b228692b2/">
                    <span className="[&>svg]:h-7 [&>svg]:w-7">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 448 512">
                            <path
                                d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                        </svg>
                    </span>
                </a>
                <a target="_blank" rel="noopener noreferrer" href="https://www.fiverr.com/fadysamman">
                    <span className="[&>svg]:h-7 [&>svg]:w-7">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 50 50"
                            fill="currentColor">
                            <path d="M 25 2 C 12.309288 2 2 12.309297 2 25 C 2 37.690703 12.309288 48 25 48 C 37.690712 48 48 37.690703 48 25 C 48 12.309297 37.690712 2 25 2 z M 25 4 C 36.609833 4 46 13.390175 46 25 C 46 36.609825 36.609833 46 25 46 C 13.390167 46 4 36.609825 4 25 C 4 13.390175 13.390167 4 25 4 z M 26.5 11 C 21.579 11 18.409109 14.037 18.037109 19 L 14 19 L 14 25 L 18 25 L 18 36 L 24 36 L 24 25 L 28 25 L 28 36 L 34 36 L 34 19 L 24.066406 19 C 24.360406 17.001 25.579 17 26.5 17 L 29.03125 17 L 29.03125 11 L 26.5 11 z"></path>
                        </svg>
                    </span>
                </a>
            </nav>
            {showPopup && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
                    <div
                        className={`flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"
                            }`}
                    >
                        <div className="flex items-center justify-center w-12 bg-emerald-500">
                            <svg
                                className="w-6 h-6 text-white fill-current"
                                viewBox="0 0 40 40"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
                            </svg>
                        </div>

                        <div className="px-4 py-2 -mx-3">
                            <div className="mx-3">
                                <span className="font-semibold text-emerald-500 dark:text-emerald-400">Success</span>
                                <p className="text-sm text-gray-600 dark:text-gray-200">Your message has been sent!</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </footer>

    );
}

export default Footer;
