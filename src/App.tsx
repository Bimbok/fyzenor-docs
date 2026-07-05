import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  BookOpen, 
  Download, 
  Keyboard, 
  Trash2, 
  Sliders, 
  Cpu, 
  HelpCircle, 
  Copy, 
  Check, 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  Sparkles,
  Info,
  Layers,
  FolderOpen
} from 'lucide-react';

// Documentation content structure
interface DocSection {
  id: string;
  title: string;
  icon: React.ReactNode;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Terminal Simulator State
  const [termInput, setTermInput] = useState<string>('');
  const [termLines, setTermLines] = useState<string[]>([
    'Fyzenor Terminal Simulator v3.0.0',
    'Type "help" or click one of the preset commands below to test.',
    ''
  ]);

  // Keyboard Helper State
  const [selectedKey, setSelectedKey] = useState<string>('d');

  // Color Configurator State
  const [themeConfig, setThemeConfig] = useState({
    bg: '#0b0c10',
    border: '#1e293b',
    activeText: '#10b981',
    normalText: '#f3f4f6',
    statusBar: '#13151c',
    accentGlow: 'rgba(16, 185, 129, 0.25)'
  });

  const sections: DocSection[] = [
    { id: 'overview', title: 'Overview & Features', icon: <BookOpen size={18} /> },
    { id: 'install', title: 'Quick Start & Install', icon: <Download size={18} /> },
    { id: 'keyboard', title: 'Keyboard Controls', icon: <Keyboard size={18} /> },
    { id: 'trash', title: 'Trash Deep Dive', icon: <Trash2 size={18} /> },
    { id: 'tasks', title: 'Task Controls & Smart Copy', icon: <Sliders size={18} /> },
    { id: 'architecture', title: 'Architecture & Threads', icon: <Cpu size={18} /> },
    { id: 'theming', title: 'Theme Configurator', icon: <Sparkles size={18} /> },
    { id: 'troubleshoot', title: 'Troubleshooting', icon: <HelpCircle size={18} /> }
  ];

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Handle Clipboard Copy helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Keyboard map metadata
  const keyMap: Record<string, { title: string; desc: string; category: string }> = {
    'k': { title: 'Move Up', desc: 'Moves file browser selection up by one item.', category: 'Navigation' },
    'j': { title: 'Move Down', desc: 'Moves file browser selection down by one item.', category: 'Navigation' },
    'h': { title: 'Parent Directory', desc: 'Goes to the parent directory, or clears the active search results.', category: 'Navigation' },
    'l': { title: 'Open / Enter', desc: 'Opens the highlighted file in its default opener or enters the selected directory.', category: 'Navigation' },
    'g': { title: 'Go to Top', desc: 'Instantly scrolls the file list to the very top.', category: 'Navigation' },
    'G': { title: 'Go to Bottom', desc: 'Instantly scrolls the file list to the very bottom.', category: 'Navigation' },
    '/': { title: 'Ripgrep Search', desc: 'Opens an interactive fuzzy content search inside files under the current folder using ripgrep.', category: 'Navigation' },
    'f': { title: 'Fuzzy Find', desc: 'Fuzzy searches file and folder names inside the current directory.', category: 'Navigation' },
    'w': { title: 'Tasks Window', desc: 'Opens the background tasks manager overlay to monitor or pause ongoing operations.', category: 'Navigation' },
    'y': { title: 'Yank (Copy)', desc: 'Yanks (copies) selected or current files to internal clipboard.', category: 'Operations' },
    'x': { title: 'Cut', desc: 'Cuts selected files to clipboard (moves them when pasted).', category: 'Operations' },
    'p': { title: 'Paste', desc: 'Pastes copied or cut files. Supports smart delta resumption if copying was interrupted.', category: 'Operations' },
    'Y': { title: 'Paste Symlink', desc: 'Creates absolute symlinks of copied files at the current location.', category: 'Operations' },
    'd': { title: 'Move to Trash', desc: 'Moves the selection to the Freedesktop-compliant home or partition-local trash folder. Permanently deletes items if pressed inside the Trash Manager.', category: 'Operations' },
    'D': { title: 'Delete Permanently', desc: 'Bypasses the Trash system entirely and deletes the selected files permanently after a confirmation.', category: 'Operations' },
    'T': { title: 'Trash Manager', desc: 'Toggles the unified Trash Manager view, collecting deleted files from all mounted drives.', category: 'Operations' },
    'u': { title: 'Undo Trash', desc: 'Instantly restores the last trashed file or folder back to its original path.', category: 'Operations' },
    'r': { title: 'Rename / Restore', desc: 'Renames the highlighted file (triggers bulk editor rename if multiple selected). If inside the Trash Manager, restores the item to its original location.', category: 'Operations' },
    'n': { title: 'New File', desc: 'Prompts to create a new blank file in the current directory.', category: 'Operations' },
    'N': { title: 'New Folder', desc: 'Prompts to create a new empty folder.', category: 'Operations' },
    'z': { title: 'Zip Selection', desc: 'Compresses selected files/folders into a zip archive asynchronously.', category: 'Operations' },
    'e': { title: 'Extract / Empty', desc: 'Extracts the highlighted archive. If inside the Trash Manager, empties all partition trash bins.', category: 'Operations' },
    'c': { title: 'Copy Path', desc: 'Copies the absolute path of the current file to the system clipboard.', category: 'Operations' },
    'Space': { title: 'Select File', desc: 'Toggles selection state of the highlighted file for bulk operations.', category: 'Selection' },
    'a': { title: 'Select All', desc: 'Selects all files in the current folder.', category: 'Selection' },
    'Esc': { title: 'Clear Selections', desc: 'Deselects all files and closes active search result views.', category: 'Selection' },
    '.': { title: 'Hidden Files', desc: 'Toggles visibility of dotfiles and hidden folders.', category: 'View' },
    's': { title: 'Cycle Sorting', desc: 'Cycles sorting criteria between Name, Size (Descending), and Date Modified (Descending).', category: 'View' },
    'P': { title: 'Pin Directory', desc: 'Saves the current path to persistent bookmarks (`~/.fm_pins`).', category: 'View' },
    'Tab': { title: 'Switch Focus', desc: 'Switches keyboard focus between the file browser pane and bookmarks sidebar, or switches active side in Dual-Pane.', category: 'View' },
    'F2': { title: 'Dual-Pane Mode', desc: 'Toggles dual vertical listings side-by-side for rapid drag-free copying and comparison.', category: 'View' },
    'F5': { title: 'Refresh Browser', desc: 'Forces a full refresh of the current listing, invalidating all size and preview caches.', category: 'View' },
    'i': { title: 'File Details', desc: 'Displays extensive metadata overlay (permissions, owner, GID, size, timestamps).', category: 'View' },
    'm': { title: 'Mount Manager', desc: 'Opens the block devices overlay to mount/unmount USB drives and Android mobile phones.', category: 'View' },
    ':': { title: 'Shell Command', desc: 'Opens a prompt to run shell commands (foreground suspends TUI, background uses `&`).', category: 'Operations' }
  };

  // Terminal Preset Commands
  const handlePresetCommand = (cmd: string) => {
    let output: string[] = [];
    if (cmd === 'fyzenor --version') {
      output = ['$', 'fyzenor --version', 'Fyzenor version 3.0.0'];
    } else if (cmd === 'fyzenor --help') {
      output = [
        '$', 'fyzenor --help',
        'Fyzenor - The Blazing Fast, Modern C++ Terminal File Manager',
        'Usage: fyzenor [options]',
        'Options:',
        '  -v, --version         Show version information',
        '  -h, --help            Show this help message'
      ];
    } else if (cmd === 'install') {
      output = [
        '$', 'curl -fsSL https://raw.githubusercontent.com/Bimbok/fyzenor/main/install.sh | bash',
        '[*] Detecting system components...',
        '[*] Installing packages: cmake, ncursesw, ffmpeg, bat, ripgrep...',
        '[*] Building project binaries...',
        '[100%] Built target fyzenor',
        '[✔] Installation completed successfully! Run "fyzenor" to start.'
      ];
    } else if (cmd === 'clear') {
      setTermLines(['Fyzenor Terminal Simulator v3.0.0', '']);
      return;
    } else if (cmd === 'help') {
      output = [
        '$ help',
        'Available commands:',
        '  fyzenor --version  - Check the current release version',
        '  fyzenor --help     - Show the help manual options',
        '  install            - Simulate installation steps',
        '  clear              - Clear this terminal output screen'
      ];
    } else {
      output = ['$', cmd, `sh: command not found: ${cmd}`];
    }
    setTermLines(prev => [...prev, ...output, '']);
  };

  const handleTermSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termInput.trim()) return;
    handlePresetCommand(termInput.trim());
    setTermInput('');
  };

  const filteredSections = sections.filter(sec => 
    sec.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div className="mobile-backdrop" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar Navigation */}
      <aside className={`sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--accent-green) 0%, var(--accent-purple) 100%)',
            padding: '0.5rem',
            borderRadius: '10px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)'
          }}>
            <Terminal size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', border: 'none', padding: 0, margin: 0, fontWeight: 800, background: 'linear-gradient(90deg, #fff, #9ca3af)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Fyzenor</h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 600, letterSpacing: '0.05em' }}>DOCS • V3.0.0</span>
          </div>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 1rem 0.65rem 2.25rem',
              backgroundColor: 'var(--bg-terminal)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          />
        </div>

        {/* Navigation Menu */}
        <nav className="nav-menu">
          {filteredSections.map((sec) => (
            <div 
              key={sec.id} 
              className={`nav-item ${activeTab === sec.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(sec.id);
                setMobileMenuOpen(false);
              }}
            >
              {sec.icon}
              {sec.title}
            </div>
          ))}
        </nav>

        {/* Bottom Socials */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-color)',
              padding: '0.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              color: 'var(--text-secondary)'
            }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a 
            href="https://github.com/Bimbok/fyzenor" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 500
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            GitHub
          </a>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="mobile-header">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)' }}>
          <Menu size={24} />
        </button>
        <span style={{ fontWeight: 800 }}>Fyzenor Docs</span>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)' }}>
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      {/* Main Panel Content */}
      <main className="main-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <h1>The Blazing Fast C++ File Manager</h1>
            <p style={{ fontSize: '1.15rem' }}>Async workflows, robust task states, multi-partition trashing, and intelligent copy resumption.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <span className="badge badge-green">v3.0.0</span>
            <span className="badge badge-purple">C++17</span>
            <span className="badge badge-cyan">Ncurses</span>
          </div>
        </div>

        {/* Tab Components */}
        {activeTab === 'overview' && (
          <div className="animate-fade-in">
            {/* Logo Banner */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
              <img 
                src="/fyzenor.png" 
                alt="Fyzenor Logo" 
                style={{ 
                  width: '100%', 
                  maxWidth: '220px', 
                  borderRadius: '12px', 
                  border: '1px solid var(--border-color)', 
                  boxShadow: 'var(--shadow-premium), 0 5px 25px rgba(16, 185, 129, 0.06)' 
                }} 
              />
            </div>

            <h2>Introduction</h2>
            <p>
              <strong>Fyzenor</strong> is an asynchronous terminal file manager built on C++17, designed to execute demanding filesystem activities without locking up the UI. Version 3.0.0 delivers structural features that allow for robust file operations, detailed trash tracking, thread suspension, and safe error restoration.
            </p>

            <div className="alert-info-box">
              <Info size={20} style={{ flexShrink: 0 }} />
              <div>
                <strong>V3.0.0 Release Note:</strong> This version is a major upgrade. We replaced raw file operations with a Freedesktop-compliant Trash subsystem, implemented smart block-level file recovery, and introduced complete task pause/resume toggling.
              </div>
            </div>

            <h2>Visual Showcase</h2>
            <div className="card-grid">
              <div className="card-premium neon-glow-card">
                <div style={{ color: 'var(--accent-green)', marginBottom: '0.75rem' }}><Layers size={24} /></div>
                <h3>Three-Column Miller Layout</h3>
                <p>Features a visual sidebar displaying bookmarks, a center listing panel, and a media-heavy preview panel on the right.</p>
              </div>
              <div className="card-premium neon-glow-card">
                <div style={{ color: 'var(--accent-purple)', marginBottom: '0.75rem' }}><Sliders size={24} /></div>
                <h3>Fully Asynchronous Engine</h3>
                <p>Calculates sizes, displays image previews, and watches block files on background threads, keeping browsing smooth.</p>
              </div>
              <div className="card-premium neon-glow-card">
                <div style={{ color: 'var(--accent-cyan)', marginBottom: '0.75rem' }}><Cpu size={24} /></div>
                <h3>Delta Copy Resumption</h3>
                <p>Resumes interrupted file transfers by checking matching sizes or seeking to target offsets block-by-block.</p>
              </div>
            </div>

            <h2>Interface Screenshots Gallery</h2>
            <p>Take a tour of the native C++ terminal layouts in action:</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', margin: '1.5rem 0' }}>
              <div className="card-premium" style={{ padding: '0.75rem' }}>
                <img src="/Sample/1.png" alt="Main Interface" style={{ width: '100%', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }} />
                <h4 style={{ fontSize: '0.9rem', marginTop: '0.5rem', textAlign: 'center' }}>1. Main Browser Layout</h4>
              </div>
              <div className="card-premium" style={{ padding: '0.75rem' }}>
                <img src="/Sample/2.png" alt="Dual-Pane Mode" style={{ width: '100%', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }} />
                <h4 style={{ fontSize: '0.9rem', marginTop: '0.5rem', textAlign: 'center' }}>2. Dual-Pane Side-by-Side Lists</h4>
              </div>
              <div className="card-premium" style={{ padding: '0.75rem' }}>
                <img src="/Sample/3.png" alt="Fuzzy Finder Overlay" style={{ width: '100%', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }} />
                <h4 style={{ fontSize: '0.9rem', marginTop: '0.5rem', textAlign: 'center' }}>3. Fuzzy Finder Search Window</h4>
              </div>
              <div className="card-premium" style={{ padding: '0.75rem' }}>
                <img src="/Sample/4.png" alt="Active Task Queues" style={{ width: '100%', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }} />
                <h4 style={{ fontSize: '0.9rem', marginTop: '0.5rem', textAlign: 'center' }}>4. Background Worker queue manager</h4>
              </div>
              <div className="card-premium" style={{ padding: '0.75rem' }}>
                <img src="/Sample/5.png" alt="Device Mounting" style={{ width: '100%', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }} />
                <h4 style={{ fontSize: '0.9rem', marginTop: '0.5rem', textAlign: 'center' }}>5. Device & Block Mount Overlay</h4>
              </div>
              <div className="card-premium" style={{ padding: '0.75rem' }}>
                <img src="/Sample/6.png" alt="Metadata Inspector" style={{ width: '100%', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }} />
                <h4 style={{ fontSize: '0.9rem', marginTop: '0.5rem', textAlign: 'center' }}>6. Extensive Metadata Inspector</h4>
              </div>
            </div>

            <h2>Terminal Simulator Sandbox</h2>
            <p>Test out Fyzenor CLI arguments directly on our mock terminal console:</p>
            <div className="terminal-simulator">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <div className="terminal-dot terminal-dot-red"></div>
                  <div className="terminal-dot terminal-dot-yellow"></div>
                  <div className="terminal-dot terminal-dot-green"></div>
                </div>
                <div className="terminal-title">bash — fyzenor-simulator</div>
                <div style={{ width: '40px' }}></div>
              </div>
              <div className="terminal-body scroll-custom">
                {termLines.map((line, i) => (
                  <div key={i} className="terminal-line">
                    {line.startsWith('$') ? (
                      <span>
                        <span className="terminal-prompt">bimbok@arch-box ~ </span>
                        {line.substring(1)}
                      </span>
                    ) : line}
                  </div>
                ))}
                <form onSubmit={handleTermSubmit} style={{ display: 'flex', alignItems: 'center' }}>
                  <span className="terminal-prompt">bimbok@arch-box ~ </span>
                  <input 
                    type="text" 
                    value={termInput}
                    onChange={(e) => setTermInput(e.target.value)}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: 'inherit',
                      fontFamily: 'inherit',
                      fontSize: 'inherit',
                      outline: 'none',
                      flexGrow: 1,
                      marginLeft: '0.5rem'
                    }}
                    autoFocus
                  />
                </form>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '-1rem', marginBottom: '2rem' }}>
              <button className="terminal-interactive-btn" onClick={() => handlePresetCommand('fyzenor --version')}>Run --version</button>
              <button className="terminal-interactive-btn" onClick={() => handlePresetCommand('fyzenor --help')}>Run --help</button>
              <button className="terminal-interactive-btn" onClick={() => handlePresetCommand('install')}>Simulate installation</button>
              <button className="terminal-interactive-btn" onClick={() => handlePresetCommand('clear')}>Clear Screen</button>
            </div>
          </div>
        )}

        {activeTab === 'install' && (
          <div className="animate-fade-in">
            <h2>System Prerequisites</h2>
            <p>Before launching, ensure your system has the following CLI tools installed for full feature support:</p>
            
            <div className="table-container">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Component</th>
                    <th>Utility</th>
                    <th>Importance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Syntax Highlighting</strong></td>
                    <td><code>bat</code> or <code>batcat</code></td>
                    <td>Recommended for rendering syntax highlighted code previews inside the right column.</td>
                  </tr>
                  <tr>
                    <td><strong>File Search</strong></td>
                    <td><code>ripgrep (rg)</code></td>
                    <td>Required for the global folder content matching system.</td>
                  </tr>
                  <tr>
                    <td><strong>Media Previews</strong></td>
                    <td><code>ffmpeg</code></td>
                    <td>Required to generate cached frame thumbnails for image/video files.</td>
                  </tr>
                  <tr>
                    <td><strong>Clipboard Integration</strong></td>
                    <td><code>xclip</code> or <code>wl-clipboard</code></td>
                    <td>Required to copy absolute file paths into the system's global clipboard.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>One-Liner Installation</h2>
            <p>Execute our auto-installation script directly from your terminal to resolve dependencies and build Fyzenor:</p>
            <div className="code-container">
              <div className="code-header">
                <span>Bash Shell</span>
                <button 
                  className="copy-btn" 
                  onClick={() => handleCopy('curl -fsSL https://raw.githubusercontent.com/Bimbok/fyzenor/main/install.sh | bash', 'install-script')}
                >
                  {copiedText === 'install-script' ? <Check size={12} /> : <Copy size={12} />}
                  {copiedText === 'install-script' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="code-block">
                <span className="code-block-keyword">curl</span> -fsSL https://raw.githubusercontent.com/Bimbok/fyzenor/main/install.sh | <span className="code-block-keyword">bash</span>
              </div>
            </div>

            <h2>Manual Build Instructions</h2>
            <p>If you prefer to compile manually from source, follow this sequence:</p>
            
            <div className="code-container">
              <div className="code-header">
                <span>Shell Commands</span>
                <button 
                  className="copy-btn" 
                  onClick={() => handleCopy('git clone https://github.com/Bimbok/fyzenor.git\ncd fyzenor\nmkdir build && cd build\ncmake ..\nmake -j$(nproc)\nsudo make install', 'manual-build')}
                >
                  {copiedText === 'manual-build' ? <Check size={12} /> : <Copy size={12} />}
                  {copiedText === 'manual-build' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="code-block">
                <span className="code-block-comment"># Clone the repository</span>
                git clone https://github.com/Bimbok/fyzenor.git
                <span className="code-block-keyword">cd</span> fyzenor

                <span className="code-block-comment"># Create build folder and compile</span>
                <span className="code-block-keyword">mkdir</span> build && <span className="code-block-keyword">cd</span> build
                cmake ..
                make -j$(nproc)

                <span className="code-block-comment"># Install to binary path</span>
                sudo make install
              </div>
            </div>
          </div>
        )}

        {activeTab === 'keyboard' && (
          <div className="animate-fade-in">
            <h2>Interactive Keyboard Shortcut Guide</h2>
            <p>Click on any key below to inspect its detailed action and category within the Fyzenor interface:</p>

            {/* Virtual Keyboard */}
            <div className="keyboard-section">
              <div className="keyboard-grid">
                {/* Row 1 */}
                <div className="keyboard-row">
                  <div className={`key-cap ${selectedKey === 'Esc' ? 'active' : ''}`} onClick={() => setSelectedKey('Esc')}>Esc</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>F1</div>
                  <div className={`key-cap ${selectedKey === 'F2' ? 'active' : ''}`} onClick={() => setSelectedKey('F2')}>F2</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>F3</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>F4</div>
                  <div className={`key-cap ${selectedKey === 'F5' ? 'active' : ''}`} onClick={() => setSelectedKey('F5')}>F5</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>F6</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>F7</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>...</div>
                </div>
                {/* Row 2 */}
                <div className="keyboard-row">
                  <div className="key-cap" style={{ opacity: 0.3 }}>`</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>1</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>2</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>3</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>4</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>5</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>6</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>7</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>8</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>9</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>0</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>-</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>=</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>BS</div>
                </div>
                {/* Row 3 */}
                <div className="keyboard-row">
                  <div className={`key-cap spacer-tab ${selectedKey === 'Tab' ? 'active' : ''}`} onClick={() => setSelectedKey('Tab')}>Tab</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>Q</div>
                  <div className={`key-cap ${selectedKey === 'w' ? 'active' : ''}`} onClick={() => setSelectedKey('w')}>W</div>
                  <div className={`key-cap ${selectedKey === 'e' ? 'active' : ''}`} onClick={() => setSelectedKey('e')}>E</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>R</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>T</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>Y</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>U</div>
                  <div className={`key-cap ${selectedKey === 'i' ? 'active' : ''}`} onClick={() => setSelectedKey('i')}>I</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>O</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>P</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>[</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>]</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>\</div>
                </div>
                {/* Row 4 */}
                <div className="keyboard-row">
                  <div className="key-cap spacer-ctrl" style={{ opacity: 0.3 }}>Ctrl</div>
                  <div className={`key-cap ${selectedKey === 'a' ? 'active' : ''}`} onClick={() => setSelectedKey('a')}>A</div>
                  <div className={`key-cap ${selectedKey === 's' ? 'active' : ''}`} onClick={() => setSelectedKey('s')}>S</div>
                  <div className={`key-cap ${selectedKey === 'd' ? 'active' : ''}`} onClick={() => setSelectedKey('d')}>D</div>
                  <div className={`key-cap ${selectedKey === 'f' ? 'active' : ''}`} onClick={() => setSelectedKey('f')}>F</div>
                  <div className={`key-cap ${selectedKey === 'g' ? 'active' : ''}`} onClick={() => setSelectedKey('g')}>G</div>
                  <div className={`key-cap ${selectedKey === 'h' ? 'active' : ''}`} onClick={() => setSelectedKey('h')}>H</div>
                  <div className={`key-cap ${selectedKey === 'j' ? 'active' : ''}`} onClick={() => setSelectedKey('j')}>J</div>
                  <div className={`key-cap ${selectedKey === 'k' ? 'active' : ''}`} onClick={() => setSelectedKey('k')}>K</div>
                  <div className={`key-cap ${selectedKey === 'l' ? 'active' : ''}`} onClick={() => setSelectedKey('l')}>L</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>;</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>'</div>
                  <div className="key-cap spacer-enter" style={{ opacity: 0.3 }}>Enter</div>
                </div>
                {/* Row 5 */}
                <div className="keyboard-row">
                  <div className={`key-cap spacer-shift ${selectedKey === 'D' ? 'active' : ''}`} onClick={() => setSelectedKey('D')}>Shift+D</div>
                  <div className={`key-cap ${selectedKey === 'z' ? 'active' : ''}`} onClick={() => setSelectedKey('z')}>Z</div>
                  <div className={`key-cap ${selectedKey === 'x' ? 'active' : ''}`} onClick={() => setSelectedKey('x')}>X</div>
                  <div className={`key-cap ${selectedKey === 'c' ? 'active' : ''}`} onClick={() => setSelectedKey('c')}>C</div>
                  <div className={`key-cap ${selectedKey === 'v' ? 'active' : ''}`} onClick={() => setSelectedKey('v')}>V</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>B</div>
                  <div className={`key-cap ${selectedKey === 'n' ? 'active' : ''}`} onClick={() => setSelectedKey('n')}>N</div>
                  <div className={`key-cap ${selectedKey === 'm' ? 'active' : ''}`} onClick={() => setSelectedKey('m')}>M</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>,</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>.</div>
                  <div className={`key-cap ${selectedKey === '/' ? 'active' : ''}`} onClick={() => setSelectedKey('/')}>/</div>
                  <div className={`key-cap ${selectedKey === ':' ? 'active' : ''}`} onClick={() => setSelectedKey(':')}>:</div>
                </div>
                {/* Row 6 */}
                <div className="keyboard-row">
                  <div className="key-cap" style={{ opacity: 0.3 }}>Ctrl</div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>Alt</div>
                  <div className={`key-cap spacer-space ${selectedKey === 'Space' ? 'active' : ''}`} onClick={() => setSelectedKey('Space')}>Space</div>
                  <div className={`key-cap ${selectedKey === 'u' ? 'active' : ''}`} onClick={() => setSelectedKey('u')}>U</div>
                  <div className={`key-cap ${selectedKey === 'T' ? 'active' : ''}`} onClick={() => setSelectedKey('T')}>T</div>
                  <div className={`key-cap ${selectedKey === 'Y' ? 'active' : ''}`} onClick={() => setSelectedKey('Y')}>Y</div>
                </div>
              </div>

              {/* Key Details Display Box */}
              <div className="key-details-box animate-fade-in" key={selectedKey}>
                <div className="key-details-key">{selectedKey === 'Space' ? '␣' : selectedKey}</div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                    {keyMap[selectedKey]?.title || 'Key Option'} 
                    <span style={{ fontSize: '0.75rem', marginLeft: '0.75rem', verticalAlign: 'middle' }} className="badge badge-purple">
                      {keyMap[selectedKey]?.category || 'General'}
                    </span>
                  </h4>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                    {keyMap[selectedKey]?.desc || 'Select a key above to view descriptions of its active binding inside Fyzenor.'}
                  </p>
                </div>
              </div>
            </div>

            <h2>Comprehensive Key Map</h2>
            <div className="table-container">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Shortcut</th>
                    <th>Action Summary</th>
                    <th>Context Scope</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(keyMap).map(([key, item]) => (
                    <tr key={key} style={{ cursor: 'pointer' }} onClick={() => setSelectedKey(key)}>
                      <td><code style={{ color: 'var(--accent-cyan)' }}>{key}</code></td>
                      <td><strong>{item.title}</strong> — {item.desc}</td>
                      <td><span className="badge badge-green">{item.category}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'trash' && (
          <div className="animate-fade-in">
            <h2>Freedesktop Compliance & Multi-Partition Logic</h2>
            <p>
              One of the major features in Fyzenor v3.0.0 is the compliance-tested partition-aware Trash subsystem. Moving files across different physical partitions is slow because it requires full write/read processes. Fyzenor resolves this by creating localized partition trash bins.
            </p>

            <div className="card-grid">
              <div className="card-premium">
                <div style={{ color: 'var(--accent-green)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>1. Home Drive Trashing</div>
                <p>Files located on the primary home partition are moved instantly to <code>~/.local/share/Trash/files/</code>. Metadata, including the deletion date and original path, is written to <code>~/.local/share/Trash/info/[file].trashinfo</code>.</p>
              </div>
              <div className="card-premium">
                <div style={{ color: 'var(--accent-purple)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>2. Partition-Local Bins</div>
                <p>For items on separate filesystems (like <code>/mnt/shared/</code> or <code>/run/media/usb</code>), Fyzenor creates a hidden directory at the mount root: <code>&lt;mount_point&gt;/.Trash-&lt;uid&gt;/</code>. This allows using <code>rename</code> (constant time O(1)) instead of slow byte-copying.</p>
              </div>
              <div className="card-premium">
                <div style={{ color: 'var(--accent-orange)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>3. Safety Delete Fallbacks</div>
                <p>On filesystems that are read-only or do not support folder creation (e.g. FAT/NTFS drives without Unix permissions), local trash isn't available. Fyzenor catches this error and prompts the user for permanent deletion confirmation.</p>
              </div>
            </div>

            <h2>The Trash Manager TUI (`T`)</h2>
            <p>Pressing <kbd>T</kbd> displays the aggregate Trash view. The manager performs several specific commands in the background:</p>
            <ul>
              <li><strong>Scan Bins</strong>: Collects deleted items from the home folder and all mounted devices.</li>
              <li><strong>Metadata Parsing</strong>: Resolves the original paths, filenames, and deletion dates from the associated <code>.trashinfo</code> files.</li>
              <li><strong>Empty Trash (`e`)</strong>: Purges all files and metadata logs from all detected partition trash folders asynchronously in the background.</li>
              <li><strong>Restore Item (`r`)</strong>: Moves files from the trash back to their original recorded locations. If a folder in the original path is missing, Fyzenor creates it dynamically. If a conflict occurs, it appends a <code>_restored</code> suffix to avoid data overwrite.</li>
            </ul>

            <h2>Trash Info File Format</h2>
            <p>Fyzenor writes standard metadata logs that can be read by other Linux file managers (like Nautilus or Thunar):</p>
            <div className="code-container">
              <div className="code-header">
                <span>sample.trashinfo</span>
              </div>
              <div className="code-block">
                [Trash Info]
                Path=/home/bimbok/shared/important_docs/invoice.pdf
                DeletionDate=2026-07-05T20:14:05
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="animate-fade-in">
            <h2>Asynchronous Task Manager (`w`)</h2>
            <p>
              Fyzenor offloads heavy operations (like copying, compression, and extraction) to background worker threads. Pressing <kbd>w</kbd> displays these tasks in the **Active Tasks & Workers** window, where you can pause, resume, or cancel them:
            </p>

            <div className="table-container">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Task Type</th>
                    <th>Underlying Mechanism</th>
                    <th>Pause Behavior</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Copy & Move</strong></td>
                    <td>C++ background thread loop</td>
                    <td>Suspends block iteration via condition variables (0% CPU).</td>
                  </tr>
                  <tr>
                    <td><strong>Zip & Extract</strong></td>
                    <td>External subprocesses (<code>zip</code>, <code>tar</code>)</td>
                    <td>Sends POSIX signals <code>SIGSTOP</code> and <code>SIGCONT</code> to the process PID.</td>
                  </tr>
                  <tr>
                    <td><strong>Deletion</strong></td>
                    <td>C++ <code>std::filesystem::remove_all</code> loop</td>
                    <td>Suspends folder iteration loops between items.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Smart Copy Resumption (Delta Overwrite)</h2>
            <p>
              If a copying or moving task is paused or cancelled, the incomplete file remains at the destination. When pasting the items again and selecting <strong>`[r]eplace`</strong>:
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1.5rem 0' }}>
              <div className="card-premium" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--accent-green-glow)', color: 'var(--accent-green)', flexShrink: 0, fontWeight: 700 }}>1</div>
                <div>
                  <h4>Pre-Copy Size Analysis</h4>
                  <p style={{ margin: 0 }}>Fyzenor inspects the file size of the existing destination file and compares it to the source file size.</p>
                </div>
              </div>
              
              <div className="card-premium" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--accent-purple-glow)', color: 'var(--accent-purple)', flexShrink: 0, fontWeight: 700 }}>2</div>
                <div>
                  <h4>Exact Skipping</h4>
                  <p style={{ margin: 0 }}>If the sizes match exactly, the copy is skipped instantly to avoid redundant writes.</p>
                </div>
              </div>

              <div className="card-premium" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(6, 182, 212, 0.1)', color: 'var(--accent-cyan)', flexShrink: 0, fontWeight: 700 }}>3</div>
                <div>
                  <h4>Block-Level Seeking & Append</h4>
                  <p style={{ margin: 0 }}>If the destination is smaller, Fyzenor opens it in read/write mode, seeks to the offset matching the existing bytes, seeks to the same position in the source, and appends only the remaining bytes.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="animate-fade-in">
            <h2>Fyzenor Multithreading Architecture</h2>
            <p>
              Fyzenor utilizes a fully asynchronous, message-driven architecture to keep the UI responsive. The application runs multiple persistent threads and dynamically spawns task workers:
            </p>

            {/* Thread Architecture Diagram */}
            <div style={{ 
              backgroundColor: 'var(--bg-terminal)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '12px', 
              padding: '2rem', 
              margin: '2rem 0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: 'var(--shadow-premium)'
            }}>
              <h3 style={{ marginTop: 0, color: 'var(--accent-green)' }}>TUI & Worker Lifecycle Diagram</h3>
              
              <svg width="100%" height="340" viewBox="0 0 600 340" style={{ maxWidth: '600px' }}>
                {/* Main event loop */}
                <rect x="220" y="20" width="160" height="50" rx="8" fill="var(--accent-green-glow)" stroke="var(--accent-green)" strokeWidth="2" />
                <text x="300" y="50" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold" fontFamily="monospace">Main event loop (TUI)</text>

                {/* Worker threads */}
                <rect x="20" y="160" width="140" height="50" rx="8" fill="rgba(6, 182, 212, 0.1)" stroke="var(--accent-cyan)" strokeWidth="2" />
                <text x="90" y="190" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="monospace">Async Size Worker</text>

                <rect x="180" y="160" width="140" height="50" rx="8" fill="rgba(139, 92, 246, 0.1)" stroke="var(--accent-purple)" strokeWidth="2" />
                <text x="250" y="190" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="monospace">Inotify Watcher Loop</text>

                <rect x="340" y="160" width="140" height="50" rx="8" fill="rgba(249, 115, 22, 0.1)" stroke="var(--accent-orange)" strokeWidth="2" />
                <text x="410" y="190" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="monospace">Async Preview Worker</text>

                <rect x="470" y="270" width="120" height="50" rx="8" fill="rgba(239, 68, 68, 0.1)" stroke="var(--accent-red)" strokeWidth="2" />
                <text x="530" y="300" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="monospace">Background Task</text>

                {/* Arrows */}
                <line x1="300" y1="70" x2="300" y2="120" stroke="var(--text-muted)" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="300" y1="120" x2="90" y2="120" stroke="var(--text-muted)" strokeWidth="2" />
                <line x1="90" y1="120" x2="90" y2="150" stroke="var(--text-muted)" strokeWidth="2" markerEnd="url(#arrow)" />
                
                <line x1="300" y1="120" x2="250" y2="120" stroke="var(--text-muted)" strokeWidth="2" />
                <line x1="250" y1="120" x2="250" y2="150" stroke="var(--text-muted)" strokeWidth="2" markerEnd="url(#arrow)" />

                <line x1="300" y1="120" x2="410" y2="120" stroke="var(--text-muted)" strokeWidth="2" />
                <line x1="410" y1="120" x2="410" y2="150" stroke="var(--text-muted)" strokeWidth="2" markerEnd="url(#arrow)" />

                <line x1="300" y1="70" x2="530" y2="70" stroke="var(--accent-red)" strokeWidth="2" strokeDasharray="4" />
                <line x1="530" y1="70" x2="530" y2="260" stroke="var(--accent-red)" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrow)" />

                {/* Markers */}
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--text-muted)" />
                  </marker>
                </defs>
              </svg>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
                Dotted lines represent dynamically spawned background tasks (Copy, Zip, Delete). Solid lines represent persistent worker loops.
              </p>
            </div>

            <h2>Thread Roles & Synchronization</h2>
            <div className="table-container">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Thread</th>
                    <th>Type</th>
                    <th>Role & Loop details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Main event loop</strong></td>
                    <td>Main Thread</td>
                    <td>Handles keyboard input, terminal redraws, and controls the double-buffered ncurses interface.</td>
                  </tr>
                  <tr>
                    <td><strong>Async Size Worker</strong></td>
                    <td>Persistent Thread</td>
                    <td>Pops folders from a thread-safe task queue to recursively calculate size metrics, pushing size updates back to the UI.</td>
                  </tr>
                  <tr>
                    <td><strong>Inotify Watcher</strong></td>
                    <td>Persistent Thread</td>
                    <td>Leverages Linux <code>inotify</code> system calls to watch the active folder, sending instant refresh signals upon additions or edits.</td>
                  </tr>
                  <tr>
                    <td><strong>Async Preview</strong></td>
                    <td>Persistent Thread</td>
                    <td>Generates image/video frames in the background via ffmpeg to keep the Kitty Graphics render buffer filled.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'theming' && (
          <div className="animate-fade-in">
            <h2>Interactive Theme Configurator</h2>
            <p>
              Fyzenor loads custom themes from <code>~/.config/fyzenor/colors.fz</code>. Adjust the parameters below to preview a TUI mockup in real-time, then copy the configuration output:
            </p>

            <div className="color-picker-grid">
              {/* Controls */}
              <div className="configurator-panel">
                <h3 style={{ marginTop: 0 }}>Color Settings</h3>
                
                <div className="color-option">
                  <span className="color-option-label">Background</span>
                  <div className="color-option-inputs">
                    <input 
                      type="color" 
                      value={themeConfig.bg} 
                      onChange={(e) => setThemeConfig({ ...themeConfig, bg: e.target.value })}
                      className="color-swatch"
                    />
                    <input 
                      type="text" 
                      value={themeConfig.bg}
                      onChange={(e) => setThemeConfig({ ...themeConfig, bg: e.target.value })}
                      className="color-code-input"
                    />
                  </div>
                </div>

                <div className="color-option">
                  <span className="color-option-label">Border Line</span>
                  <div className="color-option-inputs">
                    <input 
                      type="color" 
                      value={themeConfig.border} 
                      onChange={(e) => setThemeConfig({ ...themeConfig, border: e.target.value })}
                      className="color-swatch"
                    />
                    <input 
                      type="text" 
                      value={themeConfig.border}
                      onChange={(e) => setThemeConfig({ ...themeConfig, border: e.target.value })}
                      className="color-code-input"
                    />
                  </div>
                </div>

                <div className="color-option">
                  <span className="color-option-label">Active Text Accent</span>
                  <div className="color-option-inputs">
                    <input 
                      type="color" 
                      value={themeConfig.activeText} 
                      onChange={(e) => setThemeConfig({ 
                        ...themeConfig, 
                        activeText: e.target.value,
                        accentGlow: `${e.target.value}40`
                      })}
                      className="color-swatch"
                    />
                    <input 
                      type="text" 
                      value={themeConfig.activeText}
                      onChange={(e) => setThemeConfig({ ...themeConfig, activeText: e.target.value })}
                      className="color-code-input"
                    />
                  </div>
                </div>

                <div className="color-option">
                  <span className="color-option-label">Normal Text</span>
                  <div className="color-option-inputs">
                    <input 
                      type="color" 
                      value={themeConfig.normalText} 
                      onChange={(e) => setThemeConfig({ ...themeConfig, normalText: e.target.value })}
                      className="color-swatch"
                    />
                    <input 
                      type="text" 
                      value={themeConfig.normalText}
                      onChange={(e) => setThemeConfig({ ...themeConfig, normalText: e.target.value })}
                      className="color-code-input"
                    />
                  </div>
                </div>

                <div className="color-option">
                  <span className="color-option-label">Status Bar</span>
                  <div className="color-option-inputs">
                    <input 
                      type="color" 
                      value={themeConfig.statusBar} 
                      onChange={(e) => setThemeConfig({ ...themeConfig, statusBar: e.target.value })}
                      className="color-swatch"
                    />
                    <input 
                      type="text" 
                      value={themeConfig.statusBar}
                      onChange={(e) => setThemeConfig({ ...themeConfig, statusBar: e.target.value })}
                      className="color-code-input"
                    />
                  </div>
                </div>

                <button 
                  className="terminal-interactive-btn"
                  onClick={() => handleCopy(`# Fyzenor Colors config\nbackground = "${themeConfig.bg}"\nborder = "${themeConfig.border}"\naccent = "${themeConfig.activeText}"\ntext = "${themeConfig.normalText}"\nstatus_bar = "${themeConfig.statusBar}"`, 'colors-config')}
                  style={{ marginTop: '1rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  {copiedText === 'colors-config' ? <Check size={16} /> : <Copy size={16} />}
                  {copiedText === 'colors-config' ? 'Config Copied!' : 'Copy colors.fz'}
                </button>
              </div>

              {/* Real-time TUI Mockup */}
              <div className="preview-tui-box" style={{ backgroundColor: themeConfig.bg, borderColor: themeConfig.border }}>
                <div className="tui-header" style={{ borderBottomColor: themeConfig.border, color: themeConfig.normalText }}>
                  <span>1 shared</span>
                  <span>2 Download</span>
                  <span>3 config</span>
                </div>
                <div className="tui-columns">
                  {/* Left Column */}
                  <div className="tui-column" style={{ borderRightColor: themeConfig.border, color: themeConfig.normalText }}>
                    <div style={{ opacity: 0.5 }}>📁 src/</div>
                    <div style={{ opacity: 0.5 }}>📁 build/</div>
                    <div style={{ opacity: 0.5 }}>📁 docs/</div>
                  </div>
                  {/* Center Column */}
                  <div className="tui-column" style={{ borderRightColor: themeConfig.border, color: themeConfig.normalText }}>
                    <div className="tui-item-active" style={{ backgroundColor: themeConfig.accentGlow, color: themeConfig.activeText }}>
                      <FolderOpen size={12} /> main.cpp
                    </div>
                    <div>file_manager.h</div>
                    <div>async_task.h</div>
                    <div>utils.cpp</div>
                  </div>
                  {/* Right Column */}
                  <div className="tui-column" style={{ color: themeConfig.normalText }}>
                    <div style={{ color: themeConfig.activeText, fontWeight: 'bold' }}>main.cpp</div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>Size: 2.1 KB</div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>Type: Source code</div>
                  </div>
                </div>
                <div className="tui-footer" style={{ backgroundColor: themeConfig.statusBar, borderTopColor: themeConfig.border, color: themeConfig.normalText }}>
                  <span>Fyzenor /home/bimbok/fyzenor</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'troubleshoot' && (
          <div className="animate-fade-in">
            <h2>Frequently Asked Questions & Troubleshooting</h2>
            <p>Here are answers to the most common configuration and compilation questions regarding Fyzenor:</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="card-premium">
                <h4 style={{ color: 'var(--accent-green)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <HelpCircle size={18} />
                  My directory size calculations are slow/laggy. How can I fix this?
                </h4>
                <p style={{ margin: '0.5rem 0 0' }}>
                  Fyzenor recursively queries items to compile directory sizes. If you are browsing massive nested folders (like a project directory containing millions of <code>node_modules</code>), calculations are queued onto background worker threads. Browsing remains completely non-blocking, but size updates might take a few seconds to populate.
                </p>
              </div>

              <div className="card-premium">
                <h4 style={{ color: 'var(--accent-green)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <HelpCircle size={18} />
                  Images do not display or render as corrupt characters. What is wrong?
                </h4>
                <p style={{ margin: '0.5rem 0 0' }}>
                  Fyzenor uses the native <strong>Kitty Graphics Protocol</strong>. Pixel-perfect rendering is only supported inside terminal emulators that fully implement this protocol (e.g. Kitty, WezTerm, Ghostty). If you run Fyzenor in standard Alacritty, GNOME Terminal, or xterm, it will gracefully fallback to standard text metadata layouts in the preview pane.
                </p>
              </div>

              <div className="card-premium">
                <h4 style={{ color: 'var(--accent-green)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <HelpCircle size={18} />
                  Compilation fails with "std::filesystem has no member..." error.
                </h4>
                <p style={{ margin: '0.5rem 0 0' }}>
                  Fyzenor requires a C++ compiler that fully supports the <strong>C++17</strong> specification. On older systems (e.g., GCC 7 or earlier, or older MinGW versions on Windows), <code>std::filesystem</code> was experimental or require linking <code>-lstdc++fs</code>. Update your compiler to GCC 8+ or Clang 7+ and rebuild.
                </p>
              </div>

              <div className="card-premium">
                <h4 style={{ color: 'var(--accent-green)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <HelpCircle size={18} />
                  My theme changes in colors.fz are not loading.
                </h4>
                <p style={{ margin: '0.5rem 0 0' }}>
                  Make sure your theme config is written to the exact location: <code>~/.config/fyzenor/colors.fz</code>. If the syntax contains errors, Fyzenor falls back to the default Terminal Dark theme without crashing. You can validate the configuration format by copying it from the <strong>Theme Configurator</strong> tab.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
