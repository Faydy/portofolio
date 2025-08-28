import { g } from "framer-motion/client";
import logo from "./assets/logo.png"
import {motion} from "framer-motion"

const gridContainerVariants = {
    hidden: {opacity:0}, show: {
         opacity: 1,
         transition: {
            staggerChildren: 0.23,
         }

        }
}

const gridSquareVariants = {
hidden: {opacity: 0, y: 100}, show: {opacity: 1, y: 0, transition: {type: "spring", stiffness: 100, damping: 10}}
}
function Navigation()
{
    const show = () => alert("Button clicked!");
    return(
        <motion.nav variants={gridContainerVariants} initial = "hidden" animate="show" className="navigation">
             <a href="#"><motion.img variants={gridSquareVariants} src={logo} draggable="false"  alt="Logo" className="logo" /></a>
            <ul className="nav-links">
                <motion.li variants={gridSquareVariants} className="certifications"><a href="#certifications">Certifications</a></motion.li>
                <motion.li variants={gridSquareVariants} className="projects"><a href="#">Projects</a></motion.li>
                <motion.li variants={gridSquareVariants} className="contact"><button onClick={show}>Contact</button></motion.li>
            </ul>
        </motion.nav>
    );
}

export default Navigation;