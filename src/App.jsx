import Nav from './components/Nav.jsx';
import BackgroundFX from './components/BackgroundFX.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import TableOfContents from './components/TableOfContents.jsx';
import Education from './components/Education.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink-950 text-paper">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ember focus:px-5 focus:py-3 focus:font-display focus:text-sm focus:uppercase focus:tracking-wider focus:text-ink-950"
      >
        Skip to content
      </a>

      <BackgroundFX />
      <Nav />

      <main id="main" className="relative">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <TableOfContents />
        <Education />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
