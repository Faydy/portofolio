import styles from './certi.module.css'
import Certificate from './certificate';
import c1 from "./assets/1.jpg"
import c2 from "./assets/2.jpg"
import c3 from "./assets/3.png"
import c4 from "./assets/4.png"
import c5 from "./assets/5.jpg"
import c6 from "./assets/6.png"
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

function Certifications() {
    return (
        <motion.div id="certifications" variants={gridContainerVariants} initial="hidden" animate="show" className={styles.certifications}>
            <motion.h1 variants={gridSquareVariants} className="Certifications">Certifications</motion.h1>
            <motion.div  variants={gridSquareVariants} className={styles.certificationsGrid} >
                <motion.div variants={gridSquareVariants}>
                    <Certificate src={c1} issuer={"Freecodecamp"} title="Responsive Web Design" link={"https://www.freecodecamp.org/certification/f4dy/responsive-web-design"} />
                </motion.div>
                <motion.div variants={gridSquareVariants}>
                    <Certificate src={c2} issuer={"Freecodecamp"} title="Foundational C# with Microsoft" link={"https://www.freecodecamp.org/certification/f4dy/foundational-c-sharp-with-microsoft"} />
                </motion.div>
                <motion.div variants={gridSquareVariants}>
                    <Certificate src={c4} issuer={"Certiport"} title="	
 IC3 Certification - Global Standard 5" link={"https://www.certiport.com/portal/pages/credentialverification.aspx"} />
                </motion.div>
                <motion.div variants={gridSquareVariants}>
                    <Certificate src={c6} issuer={"Wordskills"} title="Web Development" link={"https://worldskills.org/"} />
                </motion.div>
                <motion.div variants={gridSquareVariants}>
                    <Certificate src={c3} issuer={"Coursera"} title="Foundations of Project Management" link={"https://www.coursera.org/account/accomplishments/verify/9FKWN36DW5NS"} />
                </motion.div> 
                <motion.div variants={gridSquareVariants}>
                    <Certificate src={c5} issuer={"ITLevel"} title="Concursul National 'CGame - poveste si provocare" link={"https://www.itlevel.ro/"} />
                </motion.div>
                
            </motion.div>
            </motion.div>
    )
}

export default Certifications;
