import { ScrambleText } from "./components/ScrambleText";
import { BlockFeed } from "./components/BlockFeed";

function App() {
  const greetings = ["Hey", "안녕", "おはよ"];

  const randomGreeting =
    greetings[Math.floor(Math.random() * greetings.length)];

  const links = [
    { label: "Short Bio", href: "#bio" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

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
            {links.map((link, index) => (
              <li key={link.label}>
                <a href={link.href}>
                  <ScrambleText
                    text={`[ ${link.label.toUpperCase()} ]`}
                    speed={100}
                    delay={2500 + index * 400}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <main style={{ maxWidth: "600px", marginTop: "2rem" }}>
          <p style={{ lineHeight: "1.6", color: "#888" }}>
            <ScrambleText
              text="Welcome to my digital playground."
              speed={120}
              delay={4000}
            />
            <br />
            <span
              style={{ fontSize: "0.9em", display: "block", marginTop: "1rem" }}
            >
              This site is a work in progress. Minimalist by design.
            </span>
          </p>
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
