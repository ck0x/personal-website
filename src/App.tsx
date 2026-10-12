import { useState, useRef, type KeyboardEvent } from "react";
import { ScrambleText } from "./components/ScrambleText";
import { BlockFeed } from "./components/BlockFeed";

type Tab = "about" | "projects" | "contact";

interface LinkItem {
  name: string;
  href: string;
  label: string;
}

const TABS: Tab[] = ["about", "projects", "contact"];

const GREETINGS = ["Hey", "안녕", "おはよ"];

const PROJECTS: LinkItem[] = [
  { name: "Sagio", href: "https://www.sagio.io/", label: "sagio.io" },
  { name: "Rallihub", href: "https://www.rallihub.com/", label: "rallihub.com" },
  { name: "Web3UoA", href: "https://www.web3uoa.nz/", label: "web3uoa.nz" },
];

const CONTACTS: LinkItem[] = [
  { name: "GitHub", href: "https://github.com/ck0x", label: "github.com/ck0x" },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/chris-kwon-16aa19172/",
    label: "linkedin.com",
  },
];

const LinkList = ({ items }: { items: LinkItem[] }) => (
  <ul className="link-list">
    {items.map((item) => (
      <li key={item.href}>
        <a
          className="link-row"
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ScrambleText className="link-name" text={item.name} speed={50} />
          <span className="link-leader" aria-hidden="true" />
          <span className="link-meta">{item.label}</span>
          <span className="link-arrow" aria-hidden="true">
            ↗
          </span>
        </a>
      </li>
    ))}
  </ul>
);

function App() {
  const [activeTab, setActiveTab] = useState<Tab>("about");
  const [greeting] = useState(
    () => GREETINGS[Math.floor(Math.random() * GREETINGS.length)]
  );
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow keys move between tabs, per the WAI-ARIA tabs pattern
  const handleTabKeyDown = (e: KeyboardEvent, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const step = e.key === "ArrowRight" ? 1 : -1;
    const next = (index + step + TABS.length) % TABS.length;
    setActiveTab(TABS[next]);
    tabRefs.current[next]?.focus();
  };

  return (
    <>
      <BlockFeed />

      <div className="container">
        <header>
          <ScrambleText
            as="h1"
            text={`${greeting}, I'm Chris.`}
            speed={50}
          />
        </header>

        <nav className="nav" role="tablist" aria-label="Sections">
          {TABS.map((tab, index) => (
            <button
              key={tab}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={`tab-${tab}`}
              className="tab"
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls="tab-panel"
              tabIndex={activeTab === tab ? 0 : -1}
              onClick={() => setActiveTab(tab)}
              onKeyDown={(e) => handleTabKeyDown(e, index)}
            >
              <ScrambleText text={tab} speed={60} delay={400 + index * 100} />
            </button>
          ))}
        </nav>

        <main
          className="main-content"
          id="tab-panel"
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
        >
          <div key={activeTab} className="panel">
            {activeTab === "about" ? (
              <>
                <p>
                  I'm <strong>Chris Kwon</strong>, a software engineering
                  student at the University of Auckland.
                </p>
                <p>
                  I focus on blockchain development — building decentralised
                  applications and exploring what's next in Web3.
                </p>
                <p>Always learning about what's emerging in the crypto space.</p>
              </>
            ) : activeTab === "projects" ? (
              <>
                <p className="label">Selected work</p>
                <LinkList items={PROJECTS} />
              </>
            ) : (
              <>
                <p className="label">Reach out</p>
                <LinkList items={CONTACTS} />
              </>
            )}
          </div>
        </main>

        <footer className="footer">
          <ScrambleText
            text={`© ${new Date().getFullYear()} · ck0x`}
            speed={60}
            delay={900}
          />
        </footer>
      </div>
    </>
  );
}

export default App;
