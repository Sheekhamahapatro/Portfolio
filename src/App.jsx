import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ScrollProgress from './components/ScrollProgress'
import CustomCursor from './components/CustomCursor'
import CursorGlow from './components/CursorGlow'
import FloatingChat from './components/FloatingChat'
import SectionGuide from './components/SectionGuide'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-bg text-text selection:bg-accent selection:text-accent-fg">
        <CursorGlow />
        <ScrollProgress />
        <CustomCursor />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <SectionGuide />
        <ScrollToTop />
        <FloatingChat />
      </div>
    </ThemeProvider>
  )
}

export default App
