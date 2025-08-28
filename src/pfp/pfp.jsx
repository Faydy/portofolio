import { div } from "framer-motion/client"
import pfp from "../assets/pfp.jpg"
import styles from "./pfp.module.css"
import {motion} from "framer-motion"
import useIsMobile from "../mobile"
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
function Pfp()
{
    return(
        <motion.div initial="hidden" animate="show" variants={gridContainerVariants}>
        <div className={styles.profileMain}>
            <motion.div variants={gridSquareVariants} className={styles.profilePic}>
                <img src={pfp} alt="Profile" />
            </motion.div>
        </div>
        <motion.h1 variants={gridSquareVariants} className={styles.description}>
            Hi,{useIsMobile() ? <br></br> : null} I’m <span className={styles.nume}>Fady Samman</span> — passionate about creating intuitive and aesthetic digital products.
        </motion.h1>
        
        </motion.div>
        
    );
}

export default Pfp;
