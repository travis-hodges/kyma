import { useState } from "react";
import { FiSun, FiMoon, FiGithub } from "react-icons/fi";
import Tilt from "react-parallax-tilt";
import "./index.css";

export default function App() {
  const [dark, setDark] = useState(false);

  return (
    <div data-theme={dark ? "darkkyma" : "kyma"} className="min-h-screen flex flex-col font-sans">
      {/* NAVBAR */}
      <nav className="navbar bg-base-100 shadow-md">
        <a className="btn btn-ghost normal-case text-xl">Kyma</a>
        <div className="ml-auto flex gap-2">
          <a
            href="https://github.com/kyma-project"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost btn-circle"
            aria-label="GitHub"
          >
            <FiGithub size={20} />
          </a>
          {/* theme toggle */}
          <label className="swap swap-rotate btn btn-ghost btn-circle">
            <input type="checkbox" onChange={() => setDark((d) => !d)} />
            <FiSun className="swap-off" size={20} />
            <FiMoon className="swap-on" size={20} />
          </label>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative text-center text-base-100 py-24 bg-techy overflow-hidden">
        <h1 className="text-6xl font-extrabold tracking-tight drop-shadow-xl">
          Powering Cloud-Native Extensions
        </h1>
        <p className="max-w-xl mx-auto mt-6 text-lg opacity-90 font-light">
          Kyma is an open, composable platform for building modern, tech-forward applications on Kubernetes.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <button className="btn btn-primary btn-wide">Get Started</button>
          <button className="btn btn-outline btn-wide">Documentation</button>
        </div>
        {/* Decorative diagonal stripes */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[length:3px_100%] opacity-40 pointer-events-none" />
      </section>

      {/* STATS */}
      <section className="my-16 container mx-auto px-4">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">GitHub Stars</div>
            <div className="stat-value text-primary">9.7k</div>
            <div className="stat-desc">Community love</div>
          </div>
          <div className="stat">
            <div className="stat-title">Docker Pulls</div>
            <div className="stat-value text-secondary">1.2M</div>
            <div className="stat-desc">Stable &amp; trusted</div>
          </div>
          <div className="stat">
            <div className="stat-title">Contributors</div>
            <div className="stat-value">320+</div>
            <div className="stat-desc">Open-source first</div>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="grid lg:grid-cols-3 gap-8 px-8 mb-24">
        {[
          { title: "Event-Driven", desc: "Native support for CloudEvents & NATS." },
          { title: "Extensible API", desc: "SDKs, GraphQL gateway, and Webhooks." },
          { title: "Enterprise-grade", desc: "OAuth2, OIDC, RBAC & operator tooling." }
        ].map((f, i) => (
          <Tilt key={i} className="rounded-xl">
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition">
              <div className="card-body">
                <h2 className="card-title">{f.title}</h2>
                <p>{f.desc}</p>
              </div>
            </div>
          </Tilt>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="footer footer-center p-8 bg-neutral text-base-100">
        <p>© {new Date().getFullYear()} Kyma Project • Built with ❤️ & open source</p>
      </footer>
    </div>
  );
}