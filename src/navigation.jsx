import { g, li, s, u } from "framer-motion/client";
import logo from "./assets/logo.png"
import { motion } from "framer-motion"
import useIsMobile from "./mobile";
import emailjs from '@emailjs/browser';
import { useEffect, useState, useRef } from 'react';

const gridContainerVariants = {
    hidden: { opacity: 0 }, show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.23,
        }

    }
}

const formatDate = () => {
    const now = new Date();
    const zi = String(now.getDate()).padStart(2, "0");
    const luna = String(now.getMonth() + 1).padStart(2, "0"); // lunile sunt 0-11
    const an = now.getFullYear();
    const ore = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");

    return `${zi}.${luna}.${an} ${ore}:${minute}`;
};



const gridSquareVariants = {
    hidden: { opacity: 0, y: 100 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10 } }
}
function Navigation() {

    const [ip, setIp] = useState("");

    useEffect(() => {
        fetch("https://api.ipify.org?format=json")
            .then(res => res.json())
            .then(data => setIp(data.ip))
            .catch(err => console.error("Eroare IP:", err));
    }, []);
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        document.getElementById("contact-modal").checked = false; 

        emailjs
            .sendForm('service_l3urp9b', 'template_e6n72jp', form.current, {
                publicKey: '59vHXHAq-YCEJYj-Z',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    const large = <>
        <motion.li variants={gridSquareVariants} className="certifications"><a href="#certifications">Certifications</a></motion.li>
        <motion.li variants={gridSquareVariants} className="projects hidden"><a href="#">Projects</a></motion.li>
        <motion.li variants={gridSquareVariants} className="contact"><label htmlFor="contact-modal">Contact</label></motion.li>
        <input type="checkbox" id="contact-modal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Contact form</h3>
                <form ref={form} onSubmit={sendEmail} className="mt-4 space-y-3">
                    <input type="hidden" name="time" value={formatDate()} />
                    <input type="hidden" name="ip" value={ip} />
                    <input required name="name" type="text" placeholder="Full Name" className="input input-bordered w-full" />
                    <input required name="email" type="email" placeholder="Email address" className="input input-bordered w-full" />
                    <textarea required name="message" placeholder="Message" className="textarea textarea-bordered w-full"></textarea>
                    <div className="modal-action">
                        <label htmlFor="contact-modal" className="btn btn-ghost">Close</label>
                        <input htmlFor="contact-modal" type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    </>
    
    return (
        <motion.nav variants={gridContainerVariants} initial="hidden" animate="show" className="navigation">
            <a href="#"><motion.img variants={gridSquareVariants} src={logo} draggable="false" alt="Logo" className="logo" /></a>
            <ul className="nav-links">
                {!useIsMobile() ? large : null}
            </ul>
        </motion.nav>
    );
}

export default Navigation;