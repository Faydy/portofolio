import { div, img } from "framer-motion/client";
import c2 from "./assets/2.jpg"
function Certificate(name) {
    return (
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
    );
}
export default Certificate;