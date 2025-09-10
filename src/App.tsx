import { Navbar } from "./components/Navbar";
import { Hero3D } from "./components/Hero3D";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Certifications } from "./components/Certifications";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { QuickNav } from "./components/QuickNav";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero3D />
        <About />
        <Skills />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <QuickNav />
    </>
  );
}