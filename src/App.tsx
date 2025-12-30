import { useState } from "react";
import { ScrambleText } from "./components/ScrambleText";
import { BlockFeed } from "./components/BlockFeed";

function App() {
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const greetings = ["Hey", "안녕", "おはよ"];

  const randomGreeting =
    greetings[Math.floor(Math.random() * greetings.length)];

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
                ck0x is a work in progress ⟠
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
                text="I'm a Software Engineering student at the University of Auckland with a passion for blockchain technology and decentralized systems."
                speed={20}
                delay={0}
                revealFactor={0.02}
              />
              <ScrambleText
                key="about-2"
                text="I enjoy building minimalist, efficient tools and exploring the frontiers of Web3."
                speed={20}
                delay={100}
                revealFactor={0.02}
              />
              <ScrambleText
                key="about-3"
                text="When I'm not coding, I'm usually researching the latest developments in Ethereum and L2 scaling solutions."
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
