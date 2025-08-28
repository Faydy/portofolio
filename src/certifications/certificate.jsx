import { div, img } from "framer-motion/client";
import c2 from "./assets/2.jpg"
import useIsMobile from "../mobile";
function Certificate(name) {
  const large = <>
    <div className="card bg-base-100 h-210 w-280 shadow-sm mb-20">
      <div className="card-body">
        <h2 className="card-title hover:text-blue-100 duration-300 ease-out hover:text-2xl">{name.title}</h2>
        <p className="hover:text-blue-100 duration-300 ease-out hover:text-base"><a href={name.link} target="_blank">{name.issuer}</a></p>
      </div>
      <figure>
        <img
          draggable="false"
          src={name.src}
          alt="Certificate" />
      </figure>
    </div>
  </>
  const small = <>
    <div className="card bg-base-100 w-[90vw] shadow-sm mb-10 ">
      <div className="card-body flex justify-center items-center">
        <h2 className="card-title hover:text-blue-100 duration-300 ease-out hover:text-xl">{name.title}</h2>
        <p className="hover:text-blue-100 duration-300 ease-out hover:text-base"><a href={name.link} target="_blank">{name.issuer}</a></p>
      </div>
      <figure>
        <img
          draggable="false"
          src={name.src}
          alt="Certificate" />
      </figure>
    </div>
  </>


  return (
      <>
        {useIsMobile() ? small : large}
      </>
    );
}
export default Certificate;