import Navigation from "./navigation";
import Pfp from "./pfp/pfp";
import Certifications from "./certifications/certi";
import Footer from "./footer";



function App() {
  
  return(
    <>
      <div className="space" />
      <Navigation />
      <Pfp />
      <Certifications/>
      <Footer />
    </>
  )
}

export default App
