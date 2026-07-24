import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Articles from './components/Articles';
import Certificates from './components/Certificates';
import Events from './components/Events';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import AdminModal from './components/AdminModal';
import TerminalLoader from './components/TerminalLoader';
import ScrollProgress from './components/ScrollProgress';
import CursorTrail from './components/CursorTrail';
import ParticleBackground from './components/ParticleBackground';
import { useCMSData } from './hooks/useCMSData';

export default function App() {
  const cms = useCMSData();
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <>
      <ParticleBackground />
      <TerminalLoader />
      <ScrollProgress />
      <CursorTrail />
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Projects projects={cms.projects} />
        <Articles articles={cms.articles} />
        <Certificates certificates={cms.certificates} />
        <Events events={cms.events} />
        <Skills />
        <Contact />
      </main>
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
      <AIAssistant />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        cms={cms}
      />
    </>
  );
}
