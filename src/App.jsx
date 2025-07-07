import { BrowserRouter } from 'react-router-dom'
import { TwentyFirstToolbar } from '@21st-extension/toolbar-react'
import { ReactPlugin } from '@21st-extension/react'
import './App.css'
import MarketBackground from './components/MarketBackground'

function App() {
  console.log('🚀 App component rendering')
  
  return (
    <BrowserRouter>
      {/* 21st.dev Toolbar - Development Only */}
      <TwentyFirstToolbar 
        config={{
          plugins: [ReactPlugin]
        }}
      />

      <div className="app">
        {/* Header/Navigation */}
        <header className="header">
          <div className="header-content">
            <div className="logo">KYMA</div>
            <nav className="nav">
              <a href="#mission">Mission</a>
              <a href="#capabilities">Capabilities</a>
              <a href="#join" className="apply-now">Apply now</a>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="hero">
          <MarketBackground />
          <div className="techno-matrix-bg" aria-hidden="true"></div>
          <div className="hero-content">
            <div className="hero-text">
              {/* Early access parallelogram tag */}
              <a href="#join" className="apply-tag">Apply for Early Access</a>
              <h1>There's no such<br />thing as a day</h1>
              <h2>Without space<br />Operations</h2>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">9.4k</div>
                <div className="stat-label">Active Users</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">200+</div>
                <div className="stat-label">Successful Launches</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">6</div>
                <div className="stat-label">Core Features</div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mission">
          <div className="mission-content">
            <div className="header-accent"><span className="accent-line"></span><h3>Mission</h3></div>
            <p>KYMA protects your digital frontier and the freedom to operate in the cloud, keeping it secure, stable and accessible for modern applications and new waves of innovation.</p>
            <div className="mission-quote">
              <p>When our competitors ask "What if?", we will have an answer.</p>
            </div>
            <p>We're recruiting the brightest minds across technology, engineering and development to fulfill our mission and evolve our operations across the globe.</p>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="capabilities">
          <div className="capabilities-content">
            <div className="header-accent"><span className="accent-line"></span><h3>Our Capabilities</h3></div>
            <div className="header-accent"><span className="accent-line"></span><h2>Space now defines our daily lives and the modern way of war.</h2></div>
            <p>From cloud infrastructure to military operations and satellite protection, we defend the ultimate high ground.</p>
            <button className="explore-btn">Explore Our Capabilities</button>
          </div>
        </section>

        {/* Values Section */}
        <section className="values">
          <div className="values-content">
            <div className="header-accent"><span className="accent-line"></span><h3>Values</h3></div>
            <div className="values-grid">
              <div className="value-card">
                <div className="header-accent"><span className="accent-line"></span><h4>Character</h4></div>
                <p>We defend digital integrity and serve our users. Consequently, high ethical standards are the foundation of our operations. We act with integrity, remain accountable for our decisions and honor our obligations to our mission, fellow developers and loved ones.</p>
              </div>
              <div className="value-card">
                <div className="header-accent"><span className="accent-line"></span><h4>Connection</h4></div>
                <p>We're connected by a common purpose, knowing that we're stronger together than we are individually. We treat everyone with empathy and respect and harness different perspectives to fuel innovation. In doing so, we tap into the very best each of us has to offer.</p>
              </div>
              <div className="value-card">
                <div className="header-accent"><span className="accent-line"></span><h4>Commitment</h4></div>
                <p>We are committed to mastering ourselves, our profession and our domain. Where others see obstacles, we see opportunities to learn and grow as a team. And through making the best use of our teammates' diverse strengths, we will achieve feats considered impossible by our competitors.</p>
              </div>
              <div className="value-card">
                <div className="header-accent"><span className="accent-line"></span><h4>Courage</h4></div>
                <p>We are steadfast and stand up for what is right, regardless of the circumstances. We are biased toward action and accept risk, when necessary, to secure and defend our platform. We act and speak fearlessly, knowing our teammates and leadership are unwavering.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Join Section */}
        <section className="join">
          <div className="join-content">
            <div className="header-accent"><span className="accent-line"></span><h2>Channel your inner innovator and join the only platform that secures our nation's interests in, from, and to the cloud.</h2></div>
            <button className="join-btn">Join KYMA</button>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="newsletter">
          <div className="newsletter-content">
            <div className="header-accent"><span className="accent-line"></span><h2>get kyma updates in your email</h2></div>
            <p>Sign up and never miss out on what we're up to.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Email address" />
              <input type="text" placeholder="First name" />
              <input type="text" placeholder="Last name" />
              <button type="submit">sign up</button>
            </form>
            <p className="disclaimer">You must be 13 years or older to opt-in to KYMA emails.</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-sections">
              <div className="footer-section">
                <h4>About</h4>
                <a href="#">Mission</a>
                <a href="#">History</a>
                <a href="#">FAQs</a>
                <a href="#">News & Events</a>
              </div>
              <div className="footer-section">
                <h4>Careers</h4>
                <a href="#">Career Finder</a>
                <a href="#">Benefits</a>
                <a href="#">Education</a>
                <a href="#">Training</a>
              </div>
              <div className="footer-section">
                <h4>Capabilities</h4>
                <a href="#">Cloud Infrastructure</a>
                <a href="#">Security</a>
                <a href="#">Performance</a>
                <a href="#">Scalability</a>
              </div>
              <div className="footer-section">
                <h4>How To Join</h4>
                <a href="#">What to Expect</a>
                <a href="#">For Teams</a>
                <a href="#">Live Chat</a>
                <a href="#">Apply Now</a>
              </div>
            </div>
            <div className="footer-bottom">
              <div className="footer-links">
                <a href="#">KYMA.COM</a>
                <a href="#">PRIVACY POLICY</a>
                <a href="#">Accessibility</a>
                <a href="#">SITEMAP</a>
                <a href="#">ABOUT OUR ADS</a>
                <a href="#">COOKIE SETTINGS</a>
              </div>
              <div className="copyright">® 2025</div>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
