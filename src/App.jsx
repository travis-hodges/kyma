import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import MarketBackground from './components/MarketBackground'
import FloatingCardLanes from './components/FloatingCardLanes'
import KymaBentoGrid from './components/KymaBentoGrid'
import MissionBentoGrid from './components/MissionBentoGrid'
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
            {/* Desktop Navigation */}
            <nav className="kyma-nav hidden md:flex">
              <button onClick={() => scrollToSection('hero')} className="kyma-nav-link">Home</button>
              <button onClick={() => scrollToSection('capabilities')} className="kyma-nav-link">Features</button>
              <button onClick={() => scrollToSection('mission')} className="kyma-nav-link">Mission</button>
              <button onClick={() => scrollToSection('values')} className="kyma-nav-link">Benefits</button>
              <button onClick={() => scrollToSection('join')} className="kyma-nav-link kyma-apply-btn">Apply now</button>
            </nav>
            {/* Mobile Hamburger Menu */}
          </div>
        </header>

        {/* Hero Section */}
        <section id="hero" className="hero relative overflow-hidden min-h-screen bg-zinc-900">
          {/* Layer 1: HUD Grid Background */}
          <div className="absolute inset-0 z-0">
            <MarketBackground />
          </div>
          
          {/* Layer 2: Floating Market Cards */}
          <div className="absolute inset-0 z-10 hidden md:block">
            <FloatingCardLanes />
          </div>
          
          {/* Layer 3: Headline + CTA (Front) */}
          <div className="hero-content relative z-20">
            <div className="hero-text">
              {/* Early access parallelogram tag */}
              <button onClick={() => scrollToSection('join')} className="apply-tag">
                Apply for Early Access
                <span className="arrow-icon">→</span>
              </button>
              <h1>Financial Markets<br />Move Fast.</h1>
              <h2>Kyma Moves Faster.</h2>
              <h3 className="mt-6 text-lg text-zinc-300 max-w-2xl mx-auto hero-subtitle">
              Experience AI-driven intelligence that distills billions of data points into real-time insight. Kyma allows traders to execute before markets can even react.
              </h3>
            </div>
          </div>
        </section>

        {/* Kyma Bento Grid Section - Directly beneath hero */}
        <section id="capabilities" className="kyma-bento-section relative overflow-hidden">
          <NeuralNetwork 
            intensity="low" 
            color="orange" 
            connectionDistance={150}
            baseOpacity={0.3}
            style={{ zIndex: 5 }}
          />
          <div className="relative z-10">
            <KymaBentoGrid />
          </div>
        </section>

        {/* Mission Section */}
        <section id="mission" className="relative overflow-hidden">
          <NeuralNetwork 
            intensity="low" 
            color="orange" 
            connectionDistance={160}
            baseOpacity={0.3}
            style={{ zIndex: 5 }}
          />
          <div className="relative z-10">
            <MissionBentoGrid />
          </div>
        </section>



        {/* Values Section */}
        <section id="values" className="values relative overflow-hidden">
          <NeuralNetwork 
            intensity="low" 
            color="orange" 
            connectionDistance={180}
            baseOpacity={0.25}
            style={{ zIndex: 0 }}
          />
          <div className="values-content relative z-10">
            {/* Header Section */}
            <div className="values-header">
              <div className="values-tag">
                <svg className="values-tag-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="values-tag-text">
                  Why Choose Kyma
                </span>
              </div>
              
              <h1 className="values-title">
                Built for{' '}
                <span className="values-title-highlight">
                  Every Trader
                </span>
              </h1>
              
              <p className="values-subtitle">
                Whether you're a professional trader or just getting started, Kyma adapts to your needs with transparent pricing and universal compatibility.
              </p>
            </div>

            {/* Values Cards Grid */}
            <div className="values-grid">
              <div className="value-feature-card platform-card">
                <div className="value-feature-gradient"></div>
                <div className="value-feature-icon">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="value-feature-title">Universal Platform Support</h3>
                <p className="value-feature-description">
                  Works seamlessly with any trading platform. No switching required - use Kyma alongside your existing tools and brokers.
                </p>
                <div className="value-feature-list">
                  <div className="value-feature-item">✓ All major brokers</div>
                  <div className="value-feature-item">✓ Web & mobile apps</div>
                  <div className="value-feature-item">✓ API integrations</div>
                </div>
              </div>

              <div className="value-feature-card privacy-card">
                <div className="value-feature-gradient"></div>
                <div className="value-feature-icon">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="value-feature-title">Privacy by Design</h3>
                <p className="value-feature-description">
                  Your trading data stays yours. Built-in encryption and privacy controls ensure your strategies remain confidential.
                </p>
                <div className="value-feature-list">
                  <div className="value-feature-item">✓ End-to-end encryption</div>
                  <div className="value-feature-item">✓ Zero data selling</div>
                  <div className="value-feature-item">✓ Anonymous analytics</div>
                </div>
              </div>

              <div className="value-feature-card pricing-card">
                <div className="value-feature-gradient"></div>
                <div className="value-feature-icon">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="value-feature-title">Transparent Pricing</h3>
                <p className="value-feature-description">
                  Start free, scale as you grow. No hidden fees, no surprise charges. Pay only for what you use.
                </p>
                <div className="value-feature-list">
                  <div className="value-feature-item">✓ Free tier available</div>
                  <div className="value-feature-item">✓ Usage-based scaling</div>
                  <div className="value-feature-item">✓ No long-term contracts</div>
                </div>
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
