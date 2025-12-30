import { useState, useEffect } from "react";
import { ScrambleText } from "./components/ScrambleText";
import { BlockFeed } from "./components/BlockFeed";

function App() {
  const [openTab, setOpenTab] = useState<string | null>(null);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const greetings = ["Hey", "안녕", "おはよ"];

  const randomGreeting =
    greetings[Math.floor(Math.random() * greetings.length)];

  const [dots, setDots] = useState("...");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev === "." ? ".." : prev === ".." ? "..." : "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleTabHover = (tab: string) => {
    setHoveredTab(tab);
  };

  const closeTab = () => {
    setOpenTab(null);
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <BlockFeed />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          paddingRight: "250px",
        }}
      >
        <header>
          <ScrambleText as="h1" text={randomGreeting} speed={50} delay={0} />
          <ScrambleText
            as="div"
            text="Software Engineering Student at UoA // Blockchain Developer"
            speed={80}
            delay={1200}
            className="subtitle"
          />
        </header>

        <nav>
          <ul style={{ display: "flex", gap: "2rem" }}>
            <li
              onMouseEnter={() => handleTabHover("about")}
              onMouseLeave={() => setHoveredTab(null)}
              onClick={() => setOpenTab(openTab === "about" ? null : "about")}
              style={{
                cursor: "pointer",
                color:
                  hoveredTab === "about" || openTab === "about"
                    ? "#fff"
                    : "#888",
                transition: "color 0.25s",
                fontWeight: 500,
              }}
            >
              <ScrambleText text="[ ABOUT ME ]" speed={100} delay={2000} />
            </li>
            <li
              onMouseEnter={() => handleTabHover("contact")}
              onMouseLeave={() => setHoveredTab(null)}
              onClick={() =>
                setOpenTab(openTab === "contact" ? null : "contact")
              }
              style={{
                cursor: "pointer",
                color:
                  hoveredTab === "contact" || openTab === "contact"
                    ? "#fff"
                    : "#888",
                transition: "color 0.25s",
                fontWeight: 500,
              }}
            >
              <ScrambleText text="[ CONTACTS ]" speed={100} delay={2200} />
            </li>
          </ul>
        </nav>

        <main
          style={{
            maxWidth: "600px",
            marginTop: "1rem",
            minHeight: "300px",
            position: "relative",
          }}
        >
          {openTab === null ? (
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
                position: "relative",
                paddingTop: "2rem",
              }}
            >
              <button
                onClick={closeTab}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  background: "none",
                  border: "none",
                  color: "#555",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "0.8rem",
                  padding: "4px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
              >
                [ CLOSE X ]
              </button>

              {openTab === "about" ? (
                <>
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
                </>
              ) : openTab === "contact" ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                  }}
                >
                  <p style={{ color: "#888", marginBottom: "0.5rem" }}>
                    <ScrambleText
                      text="Connection established. Reach out via:"
                      speed={30}
                    />
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.8rem",
                    }}
                  >
                    <a
                      href="https://github.com/ck0x"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <ScrambleText text="> GITHUB" speed={50} />
                      <span style={{ fontSize: "0.7rem", color: "#444" }}>
                        [github.com/ck0x]
                      </span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/chris-kwon-16aa19172/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <ScrambleText text="> LINKEDIN" speed={50} />
                      <span style={{ fontSize: "0.7rem", color: "#444" }}>
                        [linkedin.com/in/chris-kwon-16aa19172]
                      </span>
                    </a>
                  </div>
                </div>
              ) : null}
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
