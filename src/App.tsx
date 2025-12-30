import { ScrambleText } from './components/ScrambleText';

function App() {
  const links = [
    { label: 'Short Bio', href: '#bio' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
      <header>
        <ScrambleText 
          as="h1" 
          text="CHRIS KWON" 
          speed={60} 
          delay={0}
        />
        <ScrambleText 
          as="div" 
          text="Creative Developer // Web Enthusiast" 
          speed={80} 
          delay={1200}
          className="subtitle"
        />
      </header>

      <nav>
        <ul>
          {links.map((link, index) => (
            <li key={link.label}>
              <a href={link.href}>
                <ScrambleText 
                  text={`[ ${link.label.toUpperCase()} ]`} 
                  speed={100} 
                  delay={2500 + (index * 400)} 
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main style={{ maxWidth: '600px', marginTop: '2rem' }}>
        <p style={{ lineHeight: '1.6', color: '#888' }}>
          <ScrambleText 
            text="Welcome to my digital playground." 
            speed={120} 
            delay={4000} 
          />
          <br />
          <span style={{ fontSize: '0.9em', display: 'block', marginTop: '1rem' }}>
             This site is a work in progress. Minimalist by design.
          </span>
        </p>
      </main>

      <footer style={{ marginTop: 'auto', paddingTop: '4rem', fontSize: '0.8rem', color: '#444' }}>
        <ScrambleText text="© 2025 // SYSTEM READY" speed={150} delay={6000} />
      </footer>


    </div>
  );
}

export default App;
