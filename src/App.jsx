import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import MarketBackground from './components/MarketBackground'
import EnhancedMarketLanes from './components/EnhancedMarketLanes'
import KymaBentoGrid from './components/KymaBentoGrid'
import NeuralNetwork from './components/NeuralNetwork'
import "tailwindcss"

function App() {
  console.log('🚀 App component rendering')
  
  // Form refs for uncontrolled components
  const firstNameRef = React.useRef(null)
  const lastNameRef = React.useRef(null)
  const emailRef = React.useRef(null)
  const activeTraderRef = React.useRef(null)
  
  const [submitState, setSubmitState] = React.useState('idle') // 'idle', 'submitting', 'complete'
  
  // Optimized form handler - no re-renders on input
  const handleSubmit = React.useCallback((e) => {
    e.preventDefault()
    
    // Get form data from refs
    const formData = {
      firstName: firstNameRef.current?.value || '',
      lastName: lastNameRef.current?.value || '',
      email: emailRef.current?.value || '',
      isActiveTrader: activeTraderRef.current?.checked || false
    }
    
    // Client-side validation
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      alert('Please fill in all required fields')
      return
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address')
      return
    }
    
    setSubmitState('submitting')
    
    // Simulate API call
    setTimeout(() => {
      setSubmitState('complete')
      
      // Reset after animation
      setTimeout(() => {
        setSubmitState('idle')
        // Clear form
        if (firstNameRef.current) firstNameRef.current.value = ''
        if (lastNameRef.current) lastNameRef.current.value = ''
        if (emailRef.current) emailRef.current.value = ''
        if (activeTraderRef.current) activeTraderRef.current.checked = false
      }, 2000)
    }, 1500)
  }, [])
  
  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }
  
  // Header scroll behavior
  React.useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false
    
    const updateHeader = () => {
      const header = document.querySelector('.kyma-floating-header')
      if (!header) return
      
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide header
        header.classList.add('header-hidden')
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show header
        header.classList.remove('header-hidden')
      }
      
      lastScrollY = currentScrollY
      ticking = false
    }
    
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader)
        ticking = true
      }
    }
    
    window.addEventListener('scroll', onScroll)
    
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  
  return (
    <BrowserRouter>
      <div className="app">
        {/* Kyma Glassmorphic Header */}
        <header className="kyma-floating-header relative overflow-hidden">
          <NeuralNetwork 
            intensity="low" 
            color="orange" 
            connectionDistance={120}
            baseOpacity={0.15}
            style={{ zIndex: 0 }}
          />
          <div className="kyma-header-content relative z-10">
            <button onClick={() => scrollToSection('hero')} className="kyma-logo">
              <img src="/KymaLogo.png" alt="Kyma Logo" className="kyma-logo-img" />
              <span className="kyma-logo-text">KYMA</span>
            </button>
            <nav className="kyma-nav">
              <button onClick={() => scrollToSection('hero')} className="kyma-nav-link">Home</button>
              <button onClick={() => scrollToSection('capabilities')} className="kyma-nav-link">Capabilities</button>
              <button onClick={() => scrollToSection('mission')} className="kyma-nav-link">Mission</button>
              <button onClick={() => scrollToSection('values')} className="kyma-nav-link">Values</button>
              <button onClick={() => scrollToSection('join')} className="kyma-nav-link kyma-apply-btn">Apply now</button>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section id="hero" className="hero relative overflow-hidden min-h-screen bg-zinc-900">
          {/* Layer 1: HUD Grid Background */}
          <div className="absolute inset-0 z-0">
            <MarketBackground />
          </div>
          
          {/* Layer 2: Floating Market Cards */}
          <div className="absolute inset-0 z-10">
            <EnhancedMarketLanes />
          </div>
          
          {/* Layer 3: Headline + CTA (Front) */}
          <div className="hero-content relative z-20">
            <div className="hero-text">
              {/* Early access parallelogram tag */}
              <button onClick={() => scrollToSection('join')} className="apply-tag">Apply for Early Access</button>
              <h1>Financial Markets<br />Move Fast.</h1>
              <h2>Kyma Moves Faster.</h2>
              <p className="mt-6 text-lg text-zinc-300 max-w-2xl mx-auto">
              Experience AI-driven intelligence that distills billions of data points into real-time insight. Kyma allows traders to execute before markets can even react.
              </p>
            </div>
          </div>
        </section>

        {/* Kyma Bento Grid Section - Directly beneath hero */}
        <section id="capabilities" className="kyma-bento-section">
          <KymaBentoGrid />
        </section>

        {/* Mission Section */}
        <section id="mission" className="mission relative overflow-hidden">
          <NeuralNetwork 
            intensity="low" 
            color="blue" 
            connectionDistance={200}
            baseOpacity={0.3}
            style={{ zIndex: 0 }}
          />
          <div className="mission-content relative z-10">
            <div className="header-accent"><span className="accent-line"></span><h3>Mission</h3></div>
            <p>KYMA protects your digital frontier and the freedom to operate in the cloud, keeping it secure, stable and accessible for modern applications and new waves of innovation.</p>
            <div className="mission-quote">
              <p>When our competitors ask "What if?", we will have an answer.</p>
            </div>
            <p>We're recruiting the brightest minds across technology, engineering and development to fulfill our mission and evolve our operations across the globe.</p>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="capabilities relative overflow-hidden">
          <NeuralNetwork 
            intensity="medium" 
            color="green" 
            connectionDistance={240}
            baseOpacity={0.4}
            style={{ zIndex: 0 }}
          />
          <div className="capabilities-content relative z-10">
            <div className="header-accent"><span className="accent-line"></span><h3>Our Capabilities</h3></div>
            <div className="header-accent"><span className="accent-line"></span><h2>Space now defines our daily lives and the modern way of war.</h2></div>
            <p>From cloud infrastructure to military operations and satellite protection, we defend the ultimate high ground.</p>
            <button className="explore-btn">Explore Our Capabilities</button>
          </div>
        </section>

        {/* Values Section */}
        <section id="values" className="values relative overflow-hidden">
          <NeuralNetwork 
            intensity="low" 
            color="purple" 
            connectionDistance={180}
            baseOpacity={0.25}
            style={{ zIndex: 0 }}
          />
          <div className="values-content relative z-10">
            <div className="header-accent"><span className="accent-line"></span><h3>Our Values</h3></div>
            <div className="values-grid">
              <div className="value-card">
                <h4>Innovation</h4>
                <p>Pushing the boundaries of what's possible in space operations and cloud technology.</p>
              </div>
              <div className="value-card">
                <h4>Security</h4>
                <p>Protecting critical infrastructure and ensuring mission success in any environment.</p>
              </div>
              <div className="value-card">
                <h4>Excellence</h4>
                <p>Maintaining the highest standards in every operation and technological advancement.</p>
              </div>
              <div className="value-card">
                <h4>Collaboration</h4>
                <p>Working together across disciplines to achieve breakthrough solutions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Join Section */}
                 <section id="join" className="join relative overflow-hidden">
           <NeuralNetwork 
             intensity="medium" 
             color="orange" 
             connectionDistance={220}
             baseOpacity={0.35}
             style={{ zIndex: 0 }}
           />
          <div className="join-content relative z-10">
            <h2>Join Kyma</h2>
            <p>AI-driven intelligence that moves faster than markets</p>
            
            <form className="kyma-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                  ref={firstNameRef}
                  type="text"
                  name="firstName"
                  placeholder="First Name *"
                />
                <input
                  ref={lastNameRef}
                  type="text"
                  name="lastName"
                  placeholder="Last Name *"
                />
              </div>
              
              <input
                ref={emailRef}
                type="email"
                name="email"
                placeholder="Email Address *"
              />
              
              <div className="checkbox-container">
                <input
                  ref={activeTraderRef}
                  type="checkbox"
                  id="activeTrader"
                  name="isActiveTrader"
                />
                <label htmlFor="activeTrader">
                  I spend more than 10 hours a week trading
                </label>
              </div>
              
              <button 
                type="submit" 
                className={`kyma-submit-btn ${submitState}`}
                disabled={submitState !== 'idle'}
              >
                <span className="btn-text">
                  {submitState === 'complete' ? 'Application Submitted!' : 
                   submitState === 'submitting' ? 'Processing...' : 
                   'Apply For Early Access'}
                </span>
                <span className="btn-loader"></span>
                <span className="btn-checkmark">✓</span>
              </button>
            </form>
            <p className="form-note">Messages will be purely related to the early access program, and will not contain marketing or promotional content.</p>
          </div>
        </section>

        

        {/* Kyma Footer */}
        <footer className="kyma-footer">
          <div className="kyma-footer-glow"></div>
          <div className="kyma-footer-content">
            <div className="kyma-footer-left">
              <div className="kyma-footer-logo">
                <img src="/KymaLogo.png" alt="Kyma Logo" className="kyma-footer-logo-img" />
                <span className="kyma-footer-logo-text">KYMA</span>
              </div>
              <span className="kyma-copyright">© 2025</span>
            </div>
            <div className="kyma-footer-right">
              <a href="mailto:info@trykyma.com" className="kyma-footer-email">info@trykyma.com</a>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
