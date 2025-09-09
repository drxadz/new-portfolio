import { Navbar } from "./components/Navbar";
import { Hero3D } from "./components/Hero3D";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Portfolio } from "./components/Portfolio";
import { Services } from "./components/Services";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero3D />
        <About />
        <Experience />
        <Portfolio />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}