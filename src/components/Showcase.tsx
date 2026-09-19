import React, { useState, useEffect } from "react";
import {
  Terminal,
  HardDrive,
  FolderPlus,
  Puzzle,
  ChevronRight,
  Check,
  Search,
  Sun,
  Moon,
  ArrowUpRight,
  Play,
  Pause,
  Zap,
  Menu,
  X,
  FileCode,
  Folder,
} from "lucide-react";

interface ShowcaseProps {
  onNavigateToDoc: (sectionId: string) => void;
  onOpenCommandPalette: () => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
  copiedText: string | null;
  onCopy: (text: string, id: string) => void;
}

export const Showcase: React.FC<ShowcaseProps> = ({
  onNavigateToDoc,
  onOpenCommandPalette,
  theme,
  onToggleTheme,
  copiedText,
  onCopy,
}) => {
  const [motionTab, setMotionTab] = useState<
    "diskusage" | "neovim" | "modals" | "plugins" | "tasks"
  >("diskusage");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dynamic modal simulation state
  const [modalInput, setModalInput] = useState<string>("main.rs");

  // Disk usage interactive state
  const [ncduActive, setNcduActive] = useState<boolean>(true);
  const [selectedFolder, setSelectedFolder] = useState<string>("projects");

  // Task simulation state
  const [taskRunning, setTaskRunning] = useState<boolean>(true);
  const [taskProgress, setTaskProgress] = useState<number>(64);
  const [taskSpeed, setTaskSpeed] = useState<number>(68.4);

  // Terminal simulator state inside showcase
  const [showcaseTermLines, setShowcaseTermLines] = useState<string[]>([
    "Fyzenor v4.3.0 (x86_64-linux)",
    'Type "help" or click one of the preset commands below.',
  ]);

  // Handle task simulation progress animation
  useEffect(() => {
    if (!taskRunning) return;
    const interval = setInterval(() => {
      setTaskProgress((prev) => (prev >= 98 ? 12 : prev + 1));
      setTaskSpeed(+(65 + Math.sin(Date.now() / 1000) * 8).toFixed(1));
    }, 400);
    return () => clearInterval(interval);
  }, [taskRunning]);

  // Dynamic file icon and category resolver based on input
  const resolveFileBadge = (filename: string) => {
    const trimmed = filename.trim();
    if (trimmed.endsWith("/")) {
      return {
        icon: <Folder size={18} style={{ color: "var(--accent-cyan)" }} />,
        label: "Directory",
        glyph: "",
        color: "var(--accent-cyan)",
        type: "Folder",
      };
    }
    const ext = trimmed.includes(".") ? trimmed.split(".").pop()?.toLowerCase() : "";
    switch (ext) {
      case "rs":
        return {
          icon: <FileCode size={18} style={{ color: "var(--accent-orange)" }} />,
          label: "Rust Source",
          glyph: "",
          color: "var(--accent-orange)",
          type: "Rust",
        };
      case "py":
        return {
          icon: <FileCode size={18} style={{ color: "var(--accent-green)" }} />,
          label: "Python Script",
          glyph: "",
          color: "var(--accent-green)",
          type: "Python",
        };
      case "ts":
      case "tsx":
        return {
          icon: <FileCode size={18} style={{ color: "var(--accent-cyan)" }} />,
          label: "TypeScript React",
          glyph: "",
          color: "var(--accent-cyan)",
          type: "TypeScript",
        };
      case "cpp":
      case "c":
      case "hpp":
      case "h":
        return {
          icon: <FileCode size={18} style={{ color: "var(--accent-purple)" }} />,
          label: "C++ Module",
          glyph: "",
          color: "var(--accent-purple)",
          type: "C++",
        };
      case "json":
        return {
          icon: <FileCode size={18} style={{ color: "var(--accent-yellow)" }} />,
          label: "JSON Config",
          glyph: "",
          color: "var(--accent-yellow)",
          type: "JSON",
        };
      case "md":
        return {
          icon: <FileCode size={18} style={{ color: "var(--accent-terracotta)" }} />,
          label: "Markdown Document",
          glyph: "",
          color: "var(--accent-terracotta)",
          type: "Markdown",
        };
      default:
        return {
          icon: <FileCode size={18} style={{ color: "var(--text-secondary)" }} />,
          label: "Generic File",
          glyph: "",
          color: "var(--text-secondary)",
          type: "File",
        };
    }
  };

  const currentBadge = resolveFileBadge(modalInput);

  const handleShowcaseCommand = (cmd: string) => {
    let output: string[] = [];
    if (cmd === "fyzenor --version") {
      output = ["$ fyzenor --version", "Fyzenor version 4.3.0 (built with C++17, DEC 2026 sync)"];
    } else if (cmd === "install") {
      output = [
        "$ curl -fsSL https://raw.githubusercontent.com/Bimbok/fyzenor/main/install.sh | bash",
        "[*] Detecting platform... Linux x86_64",
        "[*] Packages verified: cmake, ncursesw, ffmpeg, bat, ripgrep",
        "[*] Compiling fyzenor engine v4.3.0...",
        "[100%] Built target fyzenor",
        "[✔] Installation complete! Binary installed to ~/.local/bin/fyzenor",
      ];
    } else if (cmd === "ncdu") {
      output = [
        "$ fyzenor -U",
        "Visual disk usage initialized. Proportional unicode graphs calculated.",
        "Total scanned: 12.4 GB across 42,108 files. Press 'U' to return.",
      ];
    } else if (cmd === "clear") {
      setShowcaseTermLines(["Fyzenor v4.3.0 (x86_64-linux)", ""]);
      return;
    } else {
      output = ["$ " + cmd, "Command acknowledged in simulation."];
    }
    setShowcaseTermLines((prev) => [...prev, ...output]);
  };

  return (
    <div className="editorial-canvas">
      {/* 1. Serene Top Navigation Bar (Inspired by Tide Island) */}
      <header className="editorial-nav">
        <div className="editorial-nav-left">
          <div className="brand-dot-wrapper">
            <span className="brand-dot-pulse"></span>
            <span className="brand-dot-core"></span>
          </div>
          <span className="brand-title">Fyzenor</span>
          <span className="brand-version-pill">v4.3.0</span>
        </div>

        {/* Desktop Links */}
        <nav className="editorial-nav-links">
          <a href="#manifesto" className="nav-text-link">
            Manifesto
          </a>
          <a href="#in-motion" className="nav-text-link">
            In Motion
          </a>
          <a href="#features" className="nav-text-link">
            Features
          </a>
          <button
            onClick={() => onNavigateToDoc("neovim")}
            className="nav-text-link nav-btn-link"
          >
            Neovim
          </button>
          <button
            onClick={() => onNavigateToDoc("plugins")}
            className="nav-text-link nav-btn-link"
          >
            Lua Plugins
          </button>
          <button
            onClick={() => onNavigateToDoc("overview")}
            className="nav-text-link nav-btn-link highlight"
          >
            Documentation
          </button>
          <a
            href="https://github.com/Bimbok/fyzenor"
            target="_blank"
            rel="noreferrer"
            className="nav-text-link"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
          >
            GitHub
            <ArrowUpRight size={13} style={{ opacity: 0.7 }} />
          </a>
        </nav>

        {/* Right action triggers */}
        <div className="editorial-nav-right">
          <button
            onClick={onOpenCommandPalette}
            className="editorial-search-pill"
            title="Search documentation (⌘K)"
          >
            <Search size={14} />
            <span>Search</span>
            <kbd className="cmd-kbd">⌘K</kbd>
          </button>

          <button
            onClick={onToggleTheme}
            className="editorial-theme-btn"
            title={`Switch to ${theme === "dark" ? "Linen (Light)" : "Obsidian (Dark)"} mode`}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Mobile hamburger */}
          <button
            className="editorial-mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="editorial-mobile-drawer">
          <a
            href="#manifesto"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-drawer-link"
          >
            Manifesto
          </a>
          <a
            href="#in-motion"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-drawer-link"
          >
            In Motion
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-drawer-link"
          >
            Features
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigateToDoc("neovim");
            }}
            className="mobile-drawer-link"
          >
            Neovim Plugin (fyzenor.nvim)
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigateToDoc("plugins");
            }}
            className="mobile-drawer-link"
          >
            Lua Plugin Engine
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigateToDoc("overview");
            }}
            className="mobile-drawer-link"
            style={{ color: "var(--accent-primary)", fontWeight: 700 }}
          >
            Full Documentation Handbook
          </button>
          <a
            href="https://github.com/Bimbok/fyzenor"
            target="_blank"
            rel="noreferrer"
            className="mobile-drawer-link"
          >
            View on GitHub ↗
          </a>
        </div>
      )}

      {/* 2. Hero Section (Inspired by Screenshot 1) */}
      <section className="editorial-hero">
        <div className="editorial-hero-content">
          <div className="editorial-hero-badge">
            <span className="dot-pulse"></span>
            <span>Version 4.3.0 Stable Release</span>
          </div>

          <h1 className="editorial-hero-title">
            A calm, blazing fast<br />
            file manager for your terminal.
          </h1>

          <p className="editorial-hero-sub">
            Fyzenor brings asynchronous background queues, visual disk analysis, native Neovim
            integration, and embedded Lua scripting into one harmonious, distraction-free interface.
          </p>

          <div className="editorial-hero-actions">
            <button
              className="editorial-pill-dark"
              onClick={() =>
                onCopy(
                  "curl -fsSL https://raw.githubusercontent.com/Bimbok/fyzenor/main/install.sh | bash",
                  "hero-install"
                )
              }
            >
              {copiedText === "hero-install" ? (
                <>
                  <Check size={16} />
                  <span>Copied curl command!</span>
                </>
              ) : (
                <>
                  <Terminal size={16} />
                  <span>Install v4.3.0</span>
                </>
              )}
            </button>

            <a href="#in-motion" className="editorial-pill-light">
              <span>See the demo</span>
            </a>

            <button
              onClick={() => onNavigateToDoc("overview")}
              className="editorial-pill-light"
            >
              <span>Explore Docs</span>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* 3. The Manifesto / Rhythm Section (Inspired by Screenshot 2) */}
      <section id="manifesto" className="manifesto-section">
        <div className="manifesto-inner">
          <p className="manifesto-quote">
            Fyzenor is not a feature — it's a rhythm.<br />
            It brings tranquility to your screen.<br />
            What comes, comes. What goes, goes.
          </p>
          <div className="manifesto-divider"></div>
        </div>
      </section>

      {/* 4. "The terminal, in motion." (Inspired by Screenshot 2) */}
      <section id="in-motion" className="in-motion-section">
        <div className="in-motion-header">
          <h2 className="in-motion-title">The terminal, in motion.</h2>
          <p className="in-motion-desc">
            A code-built interactive preview of actual Fyzenor states: visual disk usage,
            centered dynamic modals, Neovim floating buffers, Lua plugin engine, and async task throughput.
          </p>
        </div>

        {/* Interactive Code-Built Motion Container */}
        <div className="in-motion-widget-frame">
          {/* Tab Switcher */}
          <div className="in-motion-tabs">
            <button
              className={`motion-tab-btn ${motionTab === "diskusage" ? "active" : ""}`}
              onClick={() => setMotionTab("diskusage")}
            >
              <HardDrive size={15} />
              <span>Disk Usage (U)</span>
            </button>
            <button
              className={`motion-tab-btn ${motionTab === "neovim" ? "active" : ""}`}
              onClick={() => setMotionTab("neovim")}
            >
              <Terminal size={15} />
              <span>Neovim Plugin</span>
            </button>
            <button
              className={`motion-tab-btn ${motionTab === "modals" ? "active" : ""}`}
              onClick={() => setMotionTab("modals")}
            >
              <FolderPlus size={15} />
              <span>Dynamic Modals</span>
            </button>
            <button
              className={`motion-tab-btn ${motionTab === "plugins" ? "active" : ""}`}
              onClick={() => setMotionTab("plugins")}
            >
              <Puzzle size={15} />
              <span>Lua Engine</span>
            </button>
            <button
              className={`motion-tab-btn ${motionTab === "tasks" ? "active" : ""}`}
              onClick={() => setMotionTab("tasks")}
            >
              <Zap size={15} />
              <span>Async Tasks</span>
            </button>
          </div>

          {/* Interactive Stage */}
          <div className="in-motion-stage">
            {/* 1. Disk Usage Simulator */}
            {motionTab === "diskusage" && (
              <div className="motion-pane animate-fade-in">
                <div className="motion-toolbar">
                  <div className="motion-status-text">
                    <span>MODE: {ncduActive ? "VISUAL STORAGE ANALYZER (ncdu)" : "STANDARD BROWSER"}</span>
                    <span className="dot-divider">•</span>
                    <span>PATH: /home/bimbok</span>
                  </div>
                  <button
                    className="motion-action-pill"
                    onClick={() => setNcduActive(!ncduActive)}
                  >
                    Press <kbd className="mini-kbd">U</kbd> Toggle
                  </button>
                </div>

                <div className="disk-usage-list">
                  <div
                    className={`disk-row ${selectedFolder === "projects" ? "selected" : ""}`}
                    onClick={() => setSelectedFolder("projects")}
                  >
                    <span className="disk-name">~/Projects</span>
                    <span className="disk-size">4.2 GB</span>
                    <div className="disk-bar-track">
                      <div className="disk-bar-fill" style={{ width: "68%" }}></div>
                    </div>
                    <span className="disk-percent">68%</span>
                  </div>

                  <div
                    className={`disk-row ${selectedFolder === "downloads" ? "selected" : ""}`}
                    onClick={() => setSelectedFolder("downloads")}
                  >
                    <span className="disk-name">~/Downloads</span>
                    <span className="disk-size">1.8 GB</span>
                    <div className="disk-bar-track">
                      <div className="disk-bar-fill" style={{ width: "22%" }}></div>
                    </div>
                    <span className="disk-percent">22%</span>
                  </div>

                  <div
                    className={`disk-row ${selectedFolder === "cache" ? "selected" : ""}`}
                    onClick={() => setSelectedFolder("cache")}
                  >
                    <span className="disk-name">~/.cache</span>
                    <span className="disk-size">540 MB</span>
                    <div className="disk-bar-track">
                      <div className="disk-bar-fill" style={{ width: "7%" }}></div>
                    </div>
                    <span className="disk-percent">7%</span>
                  </div>

                  <div
                    className={`disk-row ${selectedFolder === "docs" ? "selected" : ""}`}
                    onClick={() => setSelectedFolder("docs")}
                  >
                    <span className="disk-name">~/Documents</span>
                    <span className="disk-size">190 MB</span>
                    <div className="disk-bar-track">
                      <div className="disk-bar-fill" style={{ width: "3%" }}></div>
                    </div>
                    <span className="disk-percent">3%</span>
                  </div>
                </div>

                <div className="motion-footer-info">
                  <span>Calculated asynchronously on background std::thread workers. Safe from circular symlinks.</span>
                  <button
                    onClick={() => onNavigateToDoc("diskusage")}
                    className="motion-read-link"
                  >
                    Read ncdu documentation →
                  </button>
                </div>
              </div>
            )}

            {/* 2. Neovim Integration Simulator */}
            {motionTab === "neovim" && (
              <div className="motion-pane animate-fade-in">
                <div className="motion-nvim-window">
                  <div className="nvim-header">
                    <span className="nvim-pill">fyzenor.nvim (Floating Terminal Overlay)</span>
                    <span className="nvim-coords">Geometry: 80% x 80% Centered</span>
                  </div>

                  <div className="nvim-body-split">
                    <div className="nvim-pane-left">
                      <div className="nvim-pane-title">󰈙 BUFFER ARGUMENTS (:args)</div>
                      <div className="nvim-file-item active">● src/utils.cpp [modified]</div>
                      <div className="nvim-file-item">  src/main.cpp</div>
                      <div className="nvim-file-item">  include/config.h</div>
                    </div>
                    <div className="nvim-pane-right">
                      <div className="nvim-pane-title">󰞘 FYZENOR INTEGRATION SHORTCUTS</div>
                      <div className="nvim-shortcut-row">
                        <kbd>&lt;Enter&gt;</kbd>
                        <span>Open highlighted file into current buffer</span>
                      </div>
                      <div className="nvim-shortcut-row">
                        <kbd>&lt;C-v&gt;</kbd>
                        <span>Open file in vertical split</span>
                      </div>
                      <div className="nvim-shortcut-row">
                        <kbd>&lt;C-x&gt;</kbd>
                        <span>Open file in horizontal split</span>
                      </div>
                      <div className="nvim-shortcut-row">
                        <kbd>&lt;C-t&gt;</kbd>
                        <span>Open file in new tab</span>
                      </div>
                    </div>
                  </div>

                  <div className="nvim-statusline">
                    <span className="nvim-mode">NORMAL</span>
                    <span className="nvim-filepath">~/shared/code/working_on/fyzenor</span>
                    <span className="nvim-branch"> main</span>
                    <span className="nvim-pos">utf-8 | 100%</span>
                  </div>
                </div>

                <div className="motion-footer-info">
                  <span>Direct lazy.nvim / packer / vim-plug support. Netrw directory replacement &amp; automatic CWD sync.</span>
                  <button
                    onClick={() => onNavigateToDoc("neovim")}
                    className="motion-read-link"
                  >
                    Read Neovim setup guide →
                  </button>
                </div>
              </div>
            )}

            {/* 3. Dynamic Modals Simulator */}
            {motionTab === "modals" && (
              <div className="motion-pane animate-fade-in">
                <div className="motion-modal-box">
                  <div className="modal-title-bar">
                    <span>CREATE FILE / DIRECTORY (Press &apos;n&apos;)</span>
                    <span className="modal-badge-indicator" style={{ color: currentBadge.color }}>
                      {currentBadge.glyph} {currentBadge.label}
                    </span>
                  </div>

                  <div className="modal-input-row" style={{ borderColor: currentBadge.color }}>
                    <span className="modal-icon-prefix" style={{ color: currentBadge.color }}>
                      {currentBadge.glyph}
                    </span>
                    <input
                      type="text"
                      className="modal-text-input"
                      value={modalInput}
                      onChange={(e) => setModalInput(e.target.value)}
                      placeholder="Type filename or trailing / for folder..."
                    />
                  </div>

                  <div className="modal-helper-presets">
                    <span>Quick presets:</span>
                    {["main.rs", "server.py", "Button.tsx", "engine.cpp", "data.json", "components/"].map(
                      (preset) => (
                        <button
                          key={preset}
                          className="modal-chip-btn"
                          onClick={() => setModalInput(preset)}
                        >
                          {preset}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className="motion-footer-info">
                  <span>Real-time Nerd Font glyph adaptation. Centered on terminal resize with multi-byte UTF-8 navigation.</span>
                  <button
                    onClick={() => onNavigateToDoc("modals")}
                    className="motion-read-link"
                  >
                    Read Creation &amp; Modals guide →
                  </button>
                </div>
              </div>
            )}

            {/* 4. Lua Plugin Engine Simulator */}
            {motionTab === "plugins" && (
              <div className="motion-pane animate-fade-in">
                <div className="lua-code-card">
                  <div className="lua-code-header">
                    <span>󰢱 ~/.config/fyzenor/plugins/zoxide/init.lua</span>
                    <span className="lua-zero-recompile">ZERO RECOMPILE ARCHITECTURE</span>
                  </div>
                  <pre className="lua-code-body">
{`fyzenor.add_keymap("z", function()
    local query = fyzenor.prompt("Zoxide Jump: ", "")
    if query and query ~= "" then
        local target = fyzenor.shell_output("zoxide query " .. query)
        if target and target ~= "" then
            fyzenor.change_directory(target:gsub("%s+$", ""))
            fyzenor.set_status("Jumped to " .. target)
        end
    end
end)`}
                  </pre>
                </div>

                <div className="lua-test-bar">
                  <button
                    className="lua-run-btn"
                    onClick={() => alert("Simulation: fyzenor.get_version() => '4.3.0'")}
                  >
                    Run fyzenor.get_version()
                  </button>
                  <button
                    className="lua-run-btn"
                    onClick={() => {
                      const q = prompt("Simulation: Zoxide Jump Query", "fyzenor");
                      if (q) alert(`Jumped to ~/shared/code/working_on/${q}`);
                    }}
                  >
                    Test Zoxide Fast Jump (z)
                  </button>
                </div>

                <div className="motion-footer-info">
                  <span>Community repository: github.com/Bimbok/fyzenor-plugins. Extend without recompiling C++.</span>
                  <button
                    onClick={() => onNavigateToDoc("plugins")}
                    className="motion-read-link"
                  >
                    Read Lua C++ API reference →
                  </button>
                </div>
              </div>
            )}

            {/* 5. Async Tasks Simulator */}
            {motionTab === "tasks" && (
              <div className="motion-pane animate-fade-in">
                <div className="task-sim-card">
                  <div className="task-sim-header">
                    <span className="task-sim-title">TASK QUEUE OVERLAY (w)</span>
                    <span className="task-sim-state">
                      {taskRunning ? "RUNNING (std::thread)" : "PAUSED (SIGSTOP)"}
                    </span>
                  </div>

                  <div className="task-sim-details">
                    <div className="task-sim-file">
                      <span>Copying:</span> linux-6.10-archive.tar.xz (4.8 GB)
                    </div>
                    <div className="task-sim-metrics">
                      <span>Speed: {taskSpeed} MB/s</span>
                      <span>Progress: {taskProgress}%</span>
                      <span>ETA: 24s</span>
                    </div>
                  </div>

                  <div className="task-sim-bar-track">
                    <div className="task-sim-bar-fill" style={{ width: `${taskProgress}%` }}></div>
                  </div>

                  <div className="task-sim-controls">
                    <button
                      className="task-sim-btn"
                      onClick={() => setTaskRunning(!taskRunning)}
                    >
                      {taskRunning ? <Pause size={14} /> : <Play size={14} />}
                      <span>{taskRunning ? "Pause Task (SIGSTOP)" : "Resume Task (SIGCONT)"}</span>
                    </button>
                    <button
                      className="task-sim-btn secondary"
                      onClick={() => setTaskProgress(15)}
                    >
                      <span>Simulate Delta Copy Resume</span>
                    </button>
                  </div>
                </div>

                <div className="motion-footer-info">
                  <span>Decoupled background tasks prevent TUI latency during multi-gigabyte transfers and trashing.</span>
                  <button
                    onClick={() => onNavigateToDoc("tasks")}
                    className="motion-read-link"
                  >
                    Read Task Queue &amp; Smart Copy guide →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Curated Bento Feature Grid */}
      <section id="features" className="editorial-features-section">
        <div className="section-header-editorial">
          <span className="section-eyebrow">Crafted for Speed</span>
          <h2 className="section-heading-editorial">Engineered for absolute focus.</h2>
          <p className="section-sub-editorial">
            Every feature in Fyzenor is designed to be frictionless, lightweight, and deeply integrated into your terminal workflow.
          </p>
        </div>

        <div className="editorial-bento-grid">
          {/* Card 1 */}
          <div
            className="editorial-bento-card"
            onClick={() => onNavigateToDoc("neovim")}
          >
            <div className="card-top-row">
              <span className="card-index">01</span>
              <span className="card-pill">v4.3.0 STABLE</span>
            </div>
            <h3 className="card-title">Native Neovim Integration</h3>
            <p className="card-desc">
              Floating terminal window inspired by <em>yazi.nvim</em>. Netrw directory replacement, split &amp; tab opening, multi-file buffer loading, and automatic CWD sync.
            </p>
            <div className="card-footer-link">
              <span>Explore Neovim Setup</span>
              <ChevronRight size={14} />
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="editorial-bento-card"
            onClick={() => onNavigateToDoc("plugins")}
          >
            <div className="card-top-row">
              <span className="card-index">02</span>
              <span className="card-pill">LUA ENGINE</span>
            </div>
            <h3 className="card-title">Embedded Lua Scripting</h3>
            <p className="card-desc">
              Zero-recompile extensibility. Drop scripts into <code>~/.config/fyzenor/plugins/</code> to map hotkeys, register custom file format previewers, or query Zoxide.
            </p>
            <div className="card-footer-link">
              <span>View Lua API Reference</span>
              <ChevronRight size={14} />
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="editorial-bento-card"
            onClick={() => onNavigateToDoc("diskusage")}
          >
            <div className="card-top-row">
              <span className="card-index">03</span>
              <span className="card-pill">VISUAL MODE</span>
            </div>
            <h3 className="card-title">Visual Disk Usage (U)</h3>
            <p className="card-desc">
              Single-key <code>ncdu</code>-style storage breakdown with proportional unicode bar graphs, non-blocking background folder calculation, and circular symlink protection.
            </p>
            <div className="card-footer-link">
              <span>Learn Visual Disk Usage</span>
              <ChevronRight size={14} />
            </div>
          </div>

          {/* Card 4 */}
          <div
            className="editorial-bento-card"
            onClick={() => onNavigateToDoc("modals")}
          >
            <div className="card-top-row">
              <span className="card-index">04</span>
              <span className="card-pill">DYNAMIC TUI</span>
            </div>
            <h3 className="card-title">Dynamic Creation Modals</h3>
            <p className="card-desc">
              Unified creation under <code>n</code> with real-time Nerd Font extension icon morphing, centered theme accent borders, UTF-8 codepoint navigation, and clipboard paste.
            </p>
            <div className="card-footer-link">
              <span>Inspect Modals &amp; Inputs</span>
              <ChevronRight size={14} />
            </div>
          </div>

          {/* Card 5 */}
          <div
            className="editorial-bento-card"
            onClick={() => onNavigateToDoc("terminals")}
          >
            <div className="card-top-row">
              <span className="card-index">05</span>
              <span className="card-pill">DEC 2026 SYNC</span>
            </div>
            <h3 className="card-title">Pixel-Perfect Terminals</h3>
            <p className="card-desc">
              Verified across Ghostty, Kitty, WezTerm, Tmux, and Neovim. Truecolor 24-bit RGB with perceptual 256-color matching (hexTo256) and DEC 2026 atomic updates.
            </p>
            <div className="card-footer-link">
              <span>Check Terminal Matrix</span>
              <ChevronRight size={14} />
            </div>
          </div>

          {/* Card 6 */}
          <div
            className="editorial-bento-card"
            onClick={() => onNavigateToDoc("cursormemory")}
          >
            <div className="card-top-row">
              <span className="card-index">06</span>
              <span className="card-pill">NAVIGATION</span>
            </div>
            <h3 className="card-title">Cursor Tracking &amp; Memory</h3>
            <p className="card-desc">
              Cursor stays glued to highlighted items when cycling sort modes. Remembers per-directory selection history across back/forward navigation and recovers from deleted paths.
            </p>
            <div className="card-footer-link">
              <span>View Navigation Architecture</span>
              <ChevronRight size={14} />
            </div>
          </div>

          {/* Card 7 */}
          <div
            className="editorial-bento-card"
            onClick={() => onNavigateToDoc("tasks")}
          >
            <div className="card-top-row">
              <span className="card-index">07</span>
              <span className="card-pill">SMART COPY</span>
            </div>
            <h3 className="card-title">Task Controls &amp; Delta Resume</h3>
            <p className="card-desc">
              Offloaded worker threads with live throughput speed meters (MB/s). Intelligent delta resumption continues partial file copies from where they were interrupted.
            </p>
            <div className="card-footer-link">
              <span>Inspect Worker Threads</span>
              <ChevronRight size={14} />
            </div>
          </div>

          {/* Card 8 */}
          <div
            className="editorial-bento-card"
            onClick={() => onNavigateToDoc("trash")}
          >
            <div className="card-top-row">
              <span className="card-index">08</span>
              <span className="card-pill">FREEDESKTOP SPEC</span>
            </div>
            <h3 className="card-title">Multi-Partition Trash</h3>
            <p className="card-desc">
              Complies with Freedesktop.org trash specifications. Moves items to local mount partition trash bins to avoid slow cross-drive byte copying.
            </p>
            <div className="card-footer-link">
              <span>Read Trash Specifications</span>
              <ChevronRight size={14} />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Interactive Terminal Simulator Strip */}
      <section className="editorial-terminal-section">
        <div className="terminal-editorial-card">
          <div className="term-card-header">
            <div className="term-header-dots">
              <span className="term-dot red"></span>
              <span className="term-dot yellow"></span>
              <span className="term-dot green"></span>
            </div>
            <span className="term-card-title">Interactive Terminal Simulator</span>
            <button
              className="term-clear-btn"
              onClick={() => handleShowcaseCommand("clear")}
            >
              Clear
            </button>
          </div>

          <div className="term-card-screen">
            {showcaseTermLines.map((line, idx) => (
              <div key={idx} className="term-screen-line">
                {line}
              </div>
            ))}
          </div>

          <div className="term-card-presets">
            <span className="preset-label">Test Commands:</span>
            <button
              className="term-preset-pill"
              onClick={() => handleShowcaseCommand("fyzenor --version")}
            >
              fyzenor --version
            </button>
            <button
              className="term-preset-pill"
              onClick={() => handleShowcaseCommand("ncdu")}
            >
              fyzenor -U (ncdu)
            </button>
            <button
              className="term-preset-pill"
              onClick={() => handleShowcaseCommand("install")}
            >
              simulate install
            </button>
            <button
              className="term-preset-pill docs-jump"
              onClick={() => onNavigateToDoc("overview")}
            >
              Launch Full Docs Handbook →
            </button>
          </div>
        </div>
      </section>

      {/* 7. Editorial Colophon / Footer */}
      <footer className="editorial-footer">
        <div className="footer-top">
          <div className="footer-brand-block">
            <div className="brand-dot-wrapper">
              <span className="brand-dot-core"></span>
            </div>
            <span className="footer-brand-name">Fyzenor</span>
            <p className="footer-brand-desc">
              The modern, calm, blazing fast terminal file manager engineered in C++17.
            </p>
          </div>

          <div className="footer-links-grid">
            <div className="footer-col">
              <span className="footer-col-title">DOCUMENTATION</span>
              <button onClick={() => onNavigateToDoc("overview")}>Overview</button>
              <button onClick={() => onNavigateToDoc("install")}>Quick Start</button>
              <button onClick={() => onNavigateToDoc("neovim")}>Neovim Plugin</button>
              <button onClick={() => onNavigateToDoc("plugins")}>Lua Engine</button>
              <button onClick={() => onNavigateToDoc("keyboard")}>Keyboard Map</button>
            </div>
            <div className="footer-col">
              <span className="footer-col-title">FEATURES</span>
              <button onClick={() => onNavigateToDoc("diskusage")}>Visual Disk Usage</button>
              <button onClick={() => onNavigateToDoc("modals")}>Dynamic Modals</button>
              <button onClick={() => onNavigateToDoc("terminals")}>Terminal Engine</button>
              <button onClick={() => onNavigateToDoc("cursormemory")}>Cursor Memory</button>
              <button onClick={() => onNavigateToDoc("tasks")}>Async Tasks</button>
            </div>
            <div className="footer-col">
              <span className="footer-col-title">COMMUNITY</span>
              <a href="https://github.com/Bimbok/fyzenor" target="_blank" rel="noreferrer">
                GitHub Repository ↗
              </a>
              <a href="https://github.com/Bimbok/fyzenor-plugins" target="_blank" rel="noreferrer">
                Official Lua Plugins ↗
              </a>
              <a href="/llms.txt" target="_blank" rel="noreferrer">
                llms.txt Specification ↗
              </a>
              <button onClick={() => onNavigateToDoc("community")}>MIT License</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Fyzenor Engine. Released under the MIT License.</span>
          <span>Designed with calm editorial aesthetics.</span>
        </div>
      </footer>
    </div>
  );
};
