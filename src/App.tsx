import { useState, useEffect } from "react";
import { ScrambleText } from "./components/ScrambleText";
import { BlockFeed } from "./components/BlockFeed";

function App() {
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const greetings = ["Hey", "안녕", "おはよ"];

  const randomGreeting =
    greetings[Math.floor(Math.random() * greetings.length)];

  const [dots, setDots] = useState('...');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev === '.' ? '..' : prev === '..' ? '...' : '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <BlockFeed />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4rem",
          paddingRight: "250px",
        }}
      >
        <header>
          <ScrambleText as="h1" text={randomGreeting} speed={15} delay={0} />
          <ScrambleText
            as="div"
            text="Software Engineering Student at UoA // Blockchain Developer"
            speed={80}
            delay={1200}
            className="subtitle"
          />
        </header>

        <nav>
          <ul>
            <li
              onMouseEnter={() => setIsAboutHovered(true)}
              onMouseLeave={() => setIsAboutHovered(false)}
              style={{
                cursor: "pointer",
                color: isAboutHovered ? "#fff" : "#888",
                transition: "color 0.25s",
                fontWeight: 500,
                display: "inline-block",
              }}
            >
              <ScrambleText text="[ ABOUT ME ]" speed={100} delay={2000} />
            </li>
          </ul>
        </nav>

        <main
          style={{ maxWidth: "600px", marginTop: "2rem", minHeight: "200px" }}
        >
          {!isAboutHovered ? (
            <p style={{ lineHeight: "1.6", color: "#888" }}>
              <ScrambleText
                key="welcome"
                text="Welcome."
                speed={120}
                delay={3000}
              />
              <br />
              <span
                style={{
                  fontSize: "0.9em",
                  display: "block",
                  marginTop: "1rem",
                }}
              >
                ck0x is a work in progress ⟠{dots}
              </span>
            </p>
          ) : (
            <div
              style={{
                lineHeight: "1.6",
                color: "#eee",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <ScrambleText
                key="about-1"
                text="I'm Chris Kwon, a passionate Software Engineering student at the University of Auckland."
                speed={20}
                delay={0}
                revealFactor={0.02}
              />
              <ScrambleText
                key="about-2"
                text="My focus is on blockchain development, where I build decentralised applications and explore Web3 innovations."
                speed={20}
                delay={100}
                revealFactor={0.02}
              />
              <ScrambleText
                key="about-3"
                text="I'm constantly learning about emerging technologies in the crypto space."
                speed={20}
                delay={200}
                revealFactor={0.02}
              />
            </div>
          )}
        </main>

        <footer
          style={{
            marginTop: "auto",
            paddingTop: "4rem",
            fontSize: "0.8rem",
            color: "#444",
          }}
        >
          <ScrambleText
            text="© 2025 // SYSTEM READY"
            speed={150}
            delay={6000}
          />
        </footer>
      </div>
    </div>
  );
}

export default App;
