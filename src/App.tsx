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
  FolderOpen,
  Users
} from 'lucide-react';

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
    { id: 'community', title: 'Community & License', icon: <Users size={18} /> },
    { id: 'troubleshoot', title: 'Troubleshooting', icon: <HelpCircle size={18} /> }
  ];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Keyboard map metadata - fully expanded matching README
  const keyMap: Record<string, { title: string; desc: string; category: string }> = {
    'k': { title: 'Move Up', desc: 'Moves selection up inside the active directory listing or sidebar.', category: 'Navigation' },
    'j': { title: 'Move Down', desc: 'Moves selection down inside the active directory listing or sidebar.', category: 'Navigation' },
    'h': { title: 'Go to Parent / Clear Search', desc: 'Navigates back to the parent directory. If a content search view is open, clears search results.', category: 'Navigation' },
    'l': { title: 'Open File / Enter Directory', desc: 'Opens the selected file in your terminal-based editor (or default viewer) / enters highlighted folder.', category: 'Navigation' },
    'g': { title: 'Go to Top', desc: 'Instantly scrolls the active listing to the first item.', category: 'Navigation' },
    'G': { title: 'Go to Bottom', desc: 'Instantly scrolls the active listing to the last item.', category: 'Navigation' },
    '/': { title: 'Search Content', desc: 'Launches an interactive file content search using ripgrep (rg) across the active folder.', category: 'Navigation' },
    'f': { title: 'Fuzzy Find', desc: 'Fuzzy searches file and directory names inside the current folder.', category: 'Navigation' },
    'w': { title: 'Active Tasks Overlay', desc: 'Opens the background task worker queue manager overlay to monitor, pause, or kill tasks.', category: 'Navigation' },
    'y': { title: 'Yank (Copy)', desc: 'Copies selected items or current file path to internal clipboard.', category: 'File Operations' },
    'x': { title: 'Cut', desc: 'Cuts selected items to internal clipboard (items will be moved when pasted).', category: 'File Operations' },
    'p': { title: 'Paste', desc: 'Pastes items from the clipboard. Automatically handles smart block-level file copy resumption if interrupted.', category: 'File Operations' },
    'Y': { title: 'Paste as Symlink', desc: 'Creates absolute symlinks of clipboard items at the current directory.', category: 'File Operations' },
    'd': { title: 'Move to Trash / Delete', desc: 'Moves selected items to Freedesktop trash. If pressed inside the Trash Manager overlay, deletes highlighted items permanently.', category: 'File Operations' },
    'D': { title: 'Delete Permanently', desc: 'Bypasses the Trash bin completely and deletes selected files permanently after a confirmation prompt.', category: 'File Operations' },
    'T': { title: 'Toggle Trash Manager', desc: 'Opens the unified Trash Manager interface, scanning and listing all deleted items across partition bins.', category: 'File Operations' },
    'u': { title: 'Undo Trash', desc: 'Undoes the last move-to-trash action, restoring files back to their original partition paths.', category: 'File Operations' },
    'r': { title: 'Rename / Restore', desc: 'Renames current file (launches bulk editor renaming if multiple files are selected). If inside the Trash Manager, restores highlighted items to their original path.', category: 'File Operations' },
    'n': { title: 'New File', desc: 'Prompts to create a new blank file in the current directory.', category: 'File Operations' },
    'N': { title: 'New Folder', desc: 'Prompts to create a new empty directory.', category: 'File Operations' },
    'z': { title: 'Zip Selection', desc: 'Asynchronously packs selected files and folders into a zip archive.', category: 'File Operations' },
    'e': { title: 'Extract / Empty Trash', desc: 'Extracts highlighted archive. If inside the Trash Manager, empties all partition trash bins.', category: 'File Operations' },
    'c': { title: 'Copy Absolute Path', desc: 'Copies the absolute path of the current file directly into the system clipboard.', category: 'File Operations' },
    'Space': { title: 'Select Item', desc: 'Toggles the selection state of the highlighted file/folder for bulk operations.', category: 'Selection' },
    'v': { title: 'Toggle Selection', desc: 'Similar to Space, toggles selection of the highlighted item.', category: 'Selection' },
    'a': { title: 'Select All', desc: 'Selects all visible files and folders in the current directory.', category: 'Selection' },
    'Esc': { title: 'Clear Selections', desc: 'Deselects all files and closes active dialogs/searches.', category: 'Selection' },
    '.': { title: 'Toggle Hidden Files', desc: 'Toggles visibility of hidden files and dotfolders.', category: 'View' },
    's': { title: 'Cycle Sorting Modes', desc: 'Cycles sorting criteria between Name, Size (Descending), and Date Modified (Descending).', category: 'View' },
    'P': { title: 'Pin Directory', desc: 'Pins current directory path to persistent bookmarks saved in `~/.fm_pins`.', category: 'View' },
    'Tab': { title: 'Switch Focus', desc: 'Switches keyboard focus between Files list and Bookmarks sidebar. In Dual-Pane, switches active pane focus.', category: 'View' },
    'F2': { title: 'Dual-Pane Mode', desc: 'Toggles side-by-side vertical file browser panels for rapid navigation and copying.', category: 'View' },
    'F5': { title: 'Refresh Browser', desc: 'Forces folder re-indexing, clears sizes caches, and redraws the UI.', category: 'View' },
    'i': { title: 'File Details Overlay', desc: 'Displays detailed metadata overlay (UID, GID, file permissions, dates, size).', category: 'View' },
    'm': { title: 'Mounts Manager', desc: 'Opens block devices overlay to mount/unmount USB drives and Android mobile phones.', category: 'View' },
    ':': { title: 'Shell Command Prompt', desc: 'Launches prompt to execute shell commands globally (append & for background tasks).', category: 'Operations' }
  };

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

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div className="mobile-backdrop" onClick={() => setMobileMenuOpen(false)} />
      )}

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
              **Fyzenor** is a lightweight, high-performance terminal file manager engineered from the ground up with modern **C++17**. It is designed to bridge the gap between the raw power of the command line and the visual feedback of modern GUIs.
            </p>
            <p>
              With its asynchronous architecture, Fyzenor ensures that heavy operations like directory size calculation and media preview generation never block the UI, providing a "blazing fast" experience even on large filesystems. Whether you are a developer, a system administrator, or a power user, Fyzenor allows you to navigate and manage your files with the speed of thought.
            </p>

            <div className="alert-info-box">
              <Info size={20} style={{ flexShrink: 0 }} />
              <div>
                <strong>V3.0.0 Release Note:</strong> This version is a major upgrade. We replaced raw file operations with a Freedesktop-compliant Trash subsystem, implemented smart block-level file recovery, and introduced complete task pause/resume toggling.
              </div>
            </div>

            <h2>🚀 Key Features</h2>
            <div className="table-container">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Detailed Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Three-Column Layout</strong></td>
                    <td>Navigate with a Miller-style layout showing pinned items, parent/current directories, and a live preview pane.</td>
                  </tr>
                  <tr>
                    <td><strong>Asynchronous Tabs</strong></td>
                    <td>Open multiple directories in native tabs, navigating easily with <code>[</code>/<code>]</code> and number keys <code>1</code>-<code>9</code>, preserving your selections.</td>
                  </tr>
                  <tr>
                    <td><strong>Interactive Shell Commands</strong></td>
                    <td>Execute shell commands globally with <code>:</code>. Supports foreground utilities, background tasks (<code>&amp;</code>), and path placeholders (<code>$f</code>/<code>$s</code>).</td>
                  </tr>
                  <tr>
                    <td><strong>Bulk Rename via Editor</strong></td>
                    <td>Select multiple files and press <code>r</code> to rename them all at once inside your default text editor (e.g. <code>nvim</code>, <code>nano</code>).</td>
                  </tr>
                  <tr>
                    <td><strong>Smart Copy Resumption</strong></td>
                    <td>Resumes interrupted file copies block-by-block (<code>seekg</code>/<code>seekp</code>) by comparing file sizes and copying only the remaining bytes.</td>
                  </tr>
                  <tr>
                    <td><strong>Task Play/Pause Controls</strong></td>
                    <td>Suspend (pause) and resume background copy, move, delete, zip, and extract tasks directly from the task list.</td>
                  </tr>
                  <tr>
                    <td><strong>Freedesktop Trash System</strong></td>
                    <td>Move items to trash (<code>d</code>) and restore/empty them in-build. Integrates home trash and local partition trash folders.</td>
                  </tr>
                  <tr>
                    <td><strong>Undo Trash Action (<code>u</code>)</strong></td>
                    <td>Undo the last move-to-trash action instantly, restoring items back to their original paths.</td>
                  </tr>
                  <tr>
                    <td><strong>Dynamic Disk Space Status</strong></td>
                    <td>Displays partition name, progress bar, percent used, and free space dynamically for the current drive.</td>
                  </tr>
                  <tr>
                    <td><strong>Dynamic Empty Folder Icons</strong></td>
                    <td>Instantly identifies empty directories (<code></code>) versus populated ones (<code></code>) using fast metadata caching.</td>
                  </tr>
                  <tr>
                    <td><strong>Simultaneous Multi-Open</strong></td>
                    <td>Open all selected files simultaneously; code/text files load in a single editor, media in an <code>mpv</code> playlist, others in background launchers.</td>
                  </tr>
                  <tr>
                    <td><strong>Robust Symlink Management</strong></td>
                    <td>Custom link icons (<code>󰌹</code>), detailed resolution preview (detects broken paths), and quick absolute symlink pasting with Shift+Y (<code>Y</code>).</td>
                  </tr>
                  <tr>
                    <td><strong>Dynamic Sorting Modes</strong></td>
                    <td>Toggle sorting order dynamically by pressing <code>s</code>, cycling between **Name**, **Size (Desc)**, and **Date Modified (Desc)**.</td>
                  </tr>
                  <tr>
                    <td><strong>Async Media Preview</strong></td>
                    <td>Generate image and video previews in the background using the Kitty Graphics Protocol and <code>ffmpeg</code>, without freezing navigation.</td>
                  </tr>
                  <tr>
                    <td><strong>Modern &amp; Polished UI</strong></td>
                    <td>A clean, minimal interface featuring rounded corners, optimized spacing, and an elegant color palette designed for long-term readability and comfort.</td>
                  </tr>
                  <tr>
                    <td><strong>Syntax-Aware Text Preview</strong></td>
                    <td>Preview code and text files with <code>bat</code> or <code>batcat</code>, with fallback to plain text when needed.</td>
                  </tr>
                  <tr>
                    <td><strong>Background Folder Sizing</strong></td>
                    <td>Directory sizes are calculated asynchronously and update in place while you keep moving.</td>
                  </tr>
                  <tr>
                    <td><strong>Vim-Style Navigation</strong></td>
                    <td>Fast keyboard-driven navigation with <code>h</code>, <code>j</code>, <code>k</code>, <code>l</code>, <code>g</code>, <code>G</code>, arrow keys, and enter-based traversal.</td>
                  </tr>
                  <tr>
                    <td><strong>Nerd Fonts Integration</strong></td>
                    <td>Rich iconography for directories, archives, media, and code file formats for faster visual identification.</td>
                  </tr>
                  <tr>
                    <td><strong>Multi-Selection &amp; Bulk Actions</strong></td>
                    <td>Select multiple files and apply copy, cut, paste, delete, and zip operations efficiently.</td>
                  </tr>
                  <tr>
                    <td><strong>Persistent Pins</strong></td>
                    <td>Save frequently used directories to <code>~/.fm_pins</code> and jump back to them instantly.</td>
                  </tr>
                  <tr>
                    <td><strong>Flicker-Free Rendering</strong></td>
                    <td>Optimized redraw behavior keeps the interface smooth while reducing unnecessary terminal updates.</td>
                  </tr>
                  <tr>
                    <td><strong>Rich File Operations</strong></td>
                    <td>Create files/folders, rename entries, zip selections, copy absolute paths, and manage content without leaving the TUI.</td>
                  </tr>
                  <tr>
                    <td><strong>Theme Support</strong></td>
                    <td>Customize the UI through <code>~/.config/fyzenor/colors.fz</code>, with optional Matugen-powered wallpaper theming.</td>
                  </tr>
                  <tr>
                    <td><strong>Editor Integration</strong></td>
                    <td>Opens text/code files with your configured editor via <code>$EDITOR</code> or <code>$VISUAL</code>, with sensible fallbacks.</td>
                  </tr>
                  <tr>
                    <td><strong>Content Search (ripgrep)</strong></td>
                    <td>Search for file contents under the current directory using <code>ripgrep</code>, displaying relative paths and supporting vim-like navigation.</td>
                  </tr>
                  <tr>
                    <td><strong>Manual Cache Refresh</strong></td>
                    <td>Refresh directory contents and invalidate sizes/previews cache instantly using <code>F5</code> / <code>Ctrl+R</code>.</td>
                  </tr>
                  <tr>
                    <td><strong>Dual-Pane Mode</strong></td>
                    <td>Toggle (<code>F2</code>) side-by-side active file listings for drag-free copying, with easy tab focus switching (<code>Tab</code>).</td>
                  </tr>
                  <tr>
                    <td><strong>Device Detection &amp; Mounts</strong></td>
                    <td>Detect, mount, unmount, and navigate connected USB block drives and mobile phones (Android MTP) natively without needing Nautilus.</td>
                  </tr>
                  <tr>
                    <td><strong>Live Auto-Updates (inotify)</strong></td>
                    <td>Automatically detects filesystem changes (creations, deletions, renames) in the current directory and refreshes the TUI instantly.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>🛠️ CLI Arguments & Usage</h2>
            <p>Fyzenor supports the following command-line flags on launch:</p>
            <div className="table-container">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Option Flag</th>
                    <th>Alternative</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>-v</code></td>
                    <td><code>--version</code></td>
                    <td>Display the current release version of Fyzenor and exit.</td>
                  </tr>
                  <tr>
                    <td><code>-h</code></td>
                    <td><code>--help</code></td>
                    <td>Show standard usage commands and syntax guidelines.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Interface Screenshots Gallery</h2>
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
                <h4 style={{ fontSize: '0.9rem', marginTop: '0.5rem', textAlign: 'center' }}>5. Device &amp; Block Mount Overlay</h4>
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
            <h2>Prerequisites</h2>
            <p>To unleash the full power of Fyzenor, especially image previews, your system needs a few core components.</p>
            
            <h3>1. A Compatible Terminal</h3>
            <ul>
              <li><strong>Recommended:</strong> <a href="https://sw.kovidgoyal.net/kitty/" target="_blank" rel="noopener noreferrer">Kitty</a> with native Kitty Graphics Protocol support.</li>
              <li><strong>Others:</strong> <a href="https://wezfurlong.org/wezterm/" target="_blank" rel="noopener noreferrer">WezTerm</a> or <a href="https://konsole.kde.org/" target="_blank" rel="noopener noreferrer">Konsole</a> may work, but Kitty is the primary development and testing target.</li>
            </ul>

            <h3>2. System Dependencies</h3>
            <p>Install the required packages based on your Linux distribution:</p>

            <div className="code-container">
              <div className="code-header">
                <span>Debian / Ubuntu Package Installer</span>
                <button className="copy-btn" onClick={() => handleCopy('sudo apt update && sudo apt install build-essential libncursesw5-dev ffmpeg zip bat xclip wl-copy ripgrep', 'apt-install')}>
                  {copiedText === 'apt-install' ? <Check size={12} /> : <Copy size={12} />}
                  {copiedText === 'apt-install' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="code-block">{`sudo apt update
sudo apt install build-essential libncursesw5-dev ffmpeg zip bat xclip wl-copy ripgrep`}</div>
            </div>

            <div className="code-container">
              <div className="code-header">
                <span>Fedora Package Installer</span>
                <button className="copy-btn" onClick={() => handleCopy('sudo dnf update && sudo dnf install gcc gcc-c++ make ncurses-devel ffmpeg zip bat xclip wl-clipboard ripgrep', 'dnf-install')}>
                  {copiedText === 'dnf-install' ? <Check size={12} /> : <Copy size={12} />}
                  {copiedText === 'dnf-install' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="code-block">{`sudo dnf update
sudo dnf install gcc gcc-c++ make ncurses-devel ffmpeg zip bat xclip wl-clipboard ripgrep`}</div>
            </div>

            <h3>Package Descriptions:</h3>
            <ul>
              <li><strong>libncursesw / ncurses-devel</strong>: Essential for wide-character terminal UI rendering.</li>
              <li><strong>ffmpeg</strong>: Powers asynchronous thumbnail generation for images and videos.</li>
              <li><strong>zip</strong>: Required for built-in archive creation.</li>
              <li><strong>bat or batcat</strong>: Used for syntax-highlighted text previews.</li>
              <li><strong>xclip / wl-copy / pbcopy</strong>: Used for system clipboard path copy feature.</li>
            </ul>

            <h2>⚙️ Installation &amp; Update</h2>
            <p>The easiest way to install or update Fyzenor is using the universal installation script.</p>

            <h3>One-Liner Install</h3>
            <div className="code-container">
              <div className="code-header">
                <span>Universal Script</span>
                <button className="copy-btn" onClick={() => handleCopy('curl -fsSL https://raw.githubusercontent.com/Bimbok/fyzenor/main/install.sh | bash', 'one-liner-script')}>
                  {copiedText === 'one-liner-script' ? <Check size={12} /> : <Copy size={12} />}
                  {copiedText === 'one-liner-script' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="code-block">{`curl -fsSL https://raw.githubusercontent.com/Bimbok/fyzenor/main/install.sh | bash`}</div>
            </div>

            <p>The installer does the following automatically:</p>
            <ol style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li>Compiles the C++ source into an optimized binary.</li>
              <li>Installs <code>fyzenor</code> into <code>/usr/local/bin/</code>.</li>
              <li>Creates an <code>fm</code> symlink for faster access.</li>
              <li>Installs the desktop application shortcut and branding icon globally.</li>
            </ol>

            <h3>Manual Compilation</h3>
            <p>If you prefer to build and run Fyzenor manually instead of using the installer:</p>
            <div className="code-container">
              <div className="code-header">
                <span>Build Commands</span>
                <button className="copy-btn" onClick={() => handleCopy('git clone https://github.com/Bimbok/fyzenor.git\ncd fyzenor\nmkdir -p build && cd build\ncmake ..\nmake\n./fyzenor', 'manual-compile-cmds')}>
                  {copiedText === 'manual-compile-cmds' ? <Check size={12} /> : <Copy size={12} />}
                  {copiedText === 'manual-compile-cmds' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="code-block">{`git clone https://github.com/Bimbok/fyzenor.git
cd fyzenor
mkdir -p build && cd build
cmake ..
make
./fyzenor`}</div>
            </div>

            <h2>Windows Compiler Compatibility</h2>
            <p>Fyzenor requires a compiler with proper C++17 filesystem support.</p>
            <p>Older MinGW GCC versions (such as GCC 6.x) may fail during compilation with:</p>
            <div className="code-container">
              <div className="code-block">{`fatal error: filesystem: No such file or directory`}</div>
            </div>
            <p>Recommended environments for Windows users:</p>
            <ul>
              <li>MSYS2 MinGW-w64</li>
              <li>WSL (Windows Subsystem for Linux)</li>
            </ul>
            <p>Recommended compiler versions: <strong>GCC 8+</strong> or <strong>Clang 7+</strong>. Check yours using:</p>
            <div className="code-container">
              <div className="code-block">{`g++ --version`}</div>
            </div>

            <h2>🛠️ Tech Stack</h2>
            <ul>
              <li><strong>Language</strong>: C++17</li>
              <li><strong>UI Layer</strong>: <code>ncursesw</code></li>
              <li><strong>Concurrency</strong>: C++ standard threads with mutex-protected async workflows</li>
              <li><strong>Filesystem</strong>: <code>std::filesystem</code></li>
            </ul>
          </div>
        )}

        {activeTab === 'keyboard' && (
          <div className="animate-fade-in">
            <h2>Interactive Keyboard Shortcut Guide</h2>
            <p>Click on any key below to inspect its detailed action and category within the Fyzenor interface:</p>

            {/* Virtual Keyboard */}
            <div className="keyboard-section">
              <div className="keyboard-grid scroll-custom">
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

            <h2>⌨️ Complete Key Bindings Map</h2>
            
            <h3>1. Navigation</h3>
            <div className="table-container">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Shortcut</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(keyMap).filter(([_, v]) => v.category === 'Navigation').map(([k, item]) => (
                    <tr key={k} style={{ cursor: 'pointer' }} onClick={() => setSelectedKey(k)}>
                      <td><code style={{ color: 'var(--accent-cyan)' }}>{k}</code></td>
                      <td>{item.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3>2. File Operations</h3>
            <div className="table-container">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Shortcut</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(keyMap).filter(([_, v]) => v.category === 'File Operations' || v.category === 'Operations').map(([k, item]) => (
                    <tr key={k} style={{ cursor: 'pointer' }} onClick={() => setSelectedKey(k)}>
                      <td><code style={{ color: 'var(--accent-cyan)' }}>{k}</code></td>
                      <td>{item.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3>3. Selection Actions</h3>
            <div className="table-container">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Shortcut</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(keyMap).filter(([_, v]) => v.category === 'Selection').map(([k, item]) => (
                    <tr key={k} style={{ cursor: 'pointer' }} onClick={() => setSelectedKey(k)}>
                      <td><code style={{ color: 'var(--accent-cyan)' }}>{k}</code></td>
                      <td>{item.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3>4. View Customizations</h3>
            <div className="table-container">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Shortcut</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(keyMap).filter(([_, v]) => v.category === 'View').map(([k, item]) => (
                    <tr key={k} style={{ cursor: 'pointer' }} onClick={() => setSelectedKey(k)}>
                      <td><code style={{ color: 'var(--accent-cyan)' }}>{k}</code></td>
                      <td>{item.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'trash' && (
          <div className="animate-fade-in">
            <h2>Compliance-Tested Multi-Partition Trash System</h2>
            <p>
              In compliance with the Freedesktop.org Desktop Trash Can Specification, Fyzenor v3.0.0 uses a highly optimized, local partition trash system to avoid slow byte-copying across drives.
            </p>

            <div className="card-grid">
              <div className="card-premium">
                <div style={{ color: 'var(--accent-green)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>1. Home Drive Folder</div>
                <p>When trashing items on your primary OS partition, Fyzenor moves files instantly to your home directory: <code>~/.local/share/Trash/files/</code>. Associated deletion metadata logs are saved under <code>~/.local/share/Trash/info/[file].trashinfo</code>.</p>
              </div>
              <div className="card-premium">
                <div style={{ color: 'var(--accent-purple)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>2. Partition-Local folders</div>
                <p>To prevent slow cross-device operations when trashing on external drives (like USB sticks or mounted SSD partitions), Fyzenor creates local trash folders: <code>&lt;mount_root&gt;/.Trash-&lt;uid&gt;/files/</code>. This utilizes constant time <code>std::filesystem::rename</code>.</p>
              </div>
              <div className="card-premium">
                <div style={{ color: 'var(--accent-orange)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>3. External Fallbacks</div>
                <p>On FAT, NTFS, or read-only filesystems that do not support standard UNIX folder permission sets, local trash cannot be initialized. Fyzenor handles this state gracefully and prompts: <code>"Trash not supported. Delete permanently? (y/n)"</code>.</p>
              </div>
            </div>

            <h2>Trash Manager Overlay (`T`)</h2>
            <p>Toggling <kbd>T</kbd> displays the aggregate Trash view. The manager performs several specific commands in the background:</p>
            <ul>
              <li><strong>Scan Bins</strong>: Collects deleted items from the home folder and all mounted devices.</li>
              <li><strong>Metadata Parsing</strong>: Resolves the original paths, filenames, and deletion dates from the associated <code>.trashinfo</code> files.</li>
              <li><strong>Empty Trash (`e`)</strong>: Purges all files and metadata logs from all detected partition trash folders asynchronously in the background.</li>
              <li><strong>Restore Item (`r`)</strong>: Moves files from the trash back to their original recorded locations. If a folder in the original path is missing, Fyzenor creates it dynamically. If a conflict occurs, it appends a <code>_restored</code> suffix to avoid data overwrite.</li>
            </ul>

            <h2>Trash Info File Specification</h2>
            <p>Fyzenor writes standard metadata logs that can be read by other Linux file managers (like Nautilus or Thunar):</p>
            <div className="code-container">
              <div className="code-header">
                <span>sample.trashinfo</span>
              </div>
              <div className="code-block">{`[Trash Info]
Path=/home/bimbok/shared/important_docs/invoice.pdf
DeletionDate=2026-07-05T20:14:05`}</div>
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
                    <td><strong>Copy &amp; Move</strong></td>
                    <td>C++ background thread loop</td>
                    <td>Suspends block iteration via condition variables (0% CPU).</td>
                  </tr>
                  <tr>
                    <td><strong>Zip &amp; Extract</strong></td>
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
                  <h4>Block-Level Seeking &amp; Append</h4>
                  <p style={{ margin: 0 }}>If the destination is smaller, Fyzenor opens it in read/write mode, seeks to the offset matching the existing bytes, seeks to the same position in the source, and appends only the remaining bytes. Symlinks are automatically replaced to prevent overwriting targets.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="animate-fade-in">
            <h2>Asynchronous Project Architecture</h2>
            <p>
              Fyzenor is structured as a compact terminal application with asynchronous jobs handling the expensive operations that would otherwise block UI updates.
            </p>
            <h3>How It Works</h3>
            <ol style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li><strong>Navigation State:</strong> Tracks the current directory, parent context, selected entry, pins, and multi-selection state.</li>
              <li><strong>Async Preview Pipeline:</strong> Generates media previews and text previews without freezing the navigation loop.</li>
              <li><strong>Background Size Calculation:</strong> Directory sizes are resolved in the background and merged back into the UI.</li>
              <li><strong>Command Handling:</strong> Keybindings trigger file operations, pin management, sorting, preview refresh, and shell integration behavior.</li>
            </ol>

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
              <h3 style={{ marginTop: 0, color: 'var(--accent-green)' }}>TUI &amp; Worker Lifecycle Diagram</h3>
              
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

            <h2>🏗️ Repository Structure</h2>
            <div className="code-container">
              <div className="code-block">{`fyzenor/
├── file_manager.cpp   # Core application logic, UI rendering, preview pipeline
├── install.sh         # Installer and shell integration bootstrap
├── fyzenor.png        # Branding asset used in the README
├── src/               # Code headers and classes
└── Sample/            # Showcase screenshots`}</div>
            </div>
          </div>
        )}

        {activeTab === 'theming' && (
          <div className="animate-fade-in">
            <h2>🎨 Theme Customization</h2>
            <p>
              Fyzenor supports custom color themes loaded via <code>~/.config/fyzenor/colors.fz</code>. The default packaged theme is <strong>Catppuccin Mocha</strong>.
            </p>

            <h3>Configuration File Variables</h3>
            <p>Define hex colors inside your configuration file using this precise layout:</p>
            
            <div className="code-container">
              <div className="code-header">
                <span>~/.config/fyzenor/colors.fz</span>
                <button className="copy-btn" onClick={() => handleCopy('DIR: #89b4fa\nFILE: #cdd6f4\nSEL_BG: #585b70\nMEDIA: #f9e2af\nIMAGE: #f5c2e7\nBORDER: #b4befe\nSUCCESS: #a6e3a1\nERROR: #f38ba8\nMULTI: #fab387\nPIN_BG: #cba6f7\nPIN_BORDER: #89b4fa\nSEC_SEL_BG: #313244\nCODE: #a6e3a1\nARCHIVE: #eba0ac', 'theme-vars-sample')}>
                  {copiedText === 'theme-vars-sample' ? <Check size={12} /> : <Copy size={12} />}
                  {copiedText === 'theme-vars-sample' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="code-block">{`DIR: #89b4fa
FILE: #cdd6f4
SEL_BG: #585b70
MEDIA: #f9e2af
IMAGE: #f5c2e7
BORDER: #b4befe
SUCCESS: #a6e3a1
ERROR: #f38ba8
MULTI: #fab387
PIN_BG: #cba6f7
PIN_BORDER: #89b4fa
SEC_SEL_BG: #313244
CODE: #a6e3a1
ARCHIVE: #eba0ac`}</div>
            </div>

            <h2>Wallpaper-Based Theming (Matugen)</h2>
            <p>You can leverage <strong>Matugen</strong> to generate color themes dynamically based on your current desktop wallpaper:</p>

            <h3>Step 1: Create the Matugen Template</h3>
            <p>Create a template at <code>~/.config/matugen/templates/fyzenor-colors.template</code>:</p>
            <div className="code-container">
              <div className="code-header">
                <span>fyzenor-colors.template</span>
                <button className="copy-btn" onClick={() => handleCopy('# Fyzenor Theme: Matugen Generated\nDIR: {{colors.primary.default.hex}}\nFILE: {{colors.on_surface.default.hex}}\nSEL_BG: {{colors.surface_variant.default.hex}}\nMEDIA: {{colors.tertiary.default.hex}}\nIMAGE: {{colors.secondary.default.hex}}\nBORDER: {{colors.outline.default.hex}}\nSUCCESS: {{colors.primary_fixed.default.hex}}\nERROR: {{colors.error.default.hex}}\nMULTI: {{colors.tertiary_container.default.hex}}\nPIN_BG: {{colors.secondary_container.default.hex}}\nPIN_BORDER: {{colors.primary.default.hex}}\nSEC_SEL_BG: {{colors.surface_dim.default.hex}}', 'matugen-temp')}>
                  {copiedText === 'matugen-temp' ? <Check size={12} /> : <Copy size={12} />}
                  {copiedText === 'matugen-temp' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="code-block">{`# Fyzenor Theme: Matugen Generated
DIR: {{colors.primary.default.hex}}
FILE: {{colors.on_surface.default.hex}}
SEL_BG: {{colors.surface_variant.default.hex}}
MEDIA: {{colors.tertiary.default.hex}}
IMAGE: {{colors.secondary.default.hex}}
BORDER: {{colors.outline.default.hex}}
SUCCESS: {{colors.primary_fixed.default.hex}}
ERROR: {{colors.error.default.hex}}
MULTI: {{colors.tertiary_container.default.hex}}
PIN_BG: {{colors.secondary_container.default.hex}}
PIN_BORDER: {{colors.primary.default.hex}}
SEC_SEL_BG: {{colors.surface_dim.default.hex}}`}</div>
            </div>

            <h3>Step 2: Update Matugen Config</h3>
            <p>Add this configuration to your <code>~/.config/matugen/config.toml</code> file:</p>
            <div className="code-container">
              <div className="code-header">
                <span>config.toml</span>
                <button className="copy-btn" onClick={() => handleCopy('[templates.fyzenor]\ninput_path = "~/.config/matugen/templates/fyzenor-colors.template"\noutput_path = "~/.config/fyzenor/colors.fz"', 'matugen-config')}>
                  {copiedText === 'matugen-config' ? <Check size={12} /> : <Copy size={12} />}
                  {copiedText === 'matugen-config' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="code-block">{`[templates.fyzenor]
input_path = "~/.config/matugen/templates/fyzenor-colors.template"
output_path = "~/.config/fyzenor/colors.fz"`}</div>
            </div>

            <h3>Step 3: Generate the Colors</h3>
            <p>Execute this command to extract colors from your wallpaper and apply them to Fyzenor:</p>
            <div className="code-container">
              <div className="code-block">{`matugen image /path/to/your/wallpaper.jpg`}</div>
            </div>

            <h2>Live TUI Color Previewer</h2>
            <p>Configure custom shades using pickers and copy the exported properties below:</p>

            <div className="color-picker-grid">
              <div className="configurator-panel">
                <div className="color-option">
                  <span className="color-option-label">Background</span>
                  <div className="color-option-inputs">
                    <input type="color" value={themeConfig.bg} onChange={(e) => setThemeConfig({ ...themeConfig, bg: e.target.value })} className="color-swatch" />
                    <input type="text" value={themeConfig.bg} onChange={(e) => setThemeConfig({ ...themeConfig, bg: e.target.value })} className="color-code-input" />
                  </div>
                </div>

                <div className="color-option">
                  <span className="color-option-label">Border Line</span>
                  <div className="color-option-inputs">
                    <input type="color" value={themeConfig.border} onChange={(e) => setThemeConfig({ ...themeConfig, border: e.target.value })} className="color-swatch" />
                    <input type="text" value={themeConfig.border} onChange={(e) => setThemeConfig({ ...themeConfig, border: e.target.value })} className="color-code-input" />
                  </div>
                </div>

                <div className="color-option">
                  <span className="color-option-label">Active Text Accent</span>
                  <div className="color-option-inputs">
                    <input type="color" value={themeConfig.activeText} onChange={(e) => setThemeConfig({ ...themeConfig, activeText: e.target.value, accentGlow: `${e.target.value}40` })} className="color-swatch" />
                    <input type="text" value={themeConfig.activeText} onChange={(e) => setThemeConfig({ ...themeConfig, activeText: e.target.value })} className="color-code-input" />
                  </div>
                </div>

                <div className="color-option">
                  <span className="color-option-label">Normal Text</span>
                  <div className="color-option-inputs">
                    <input type="color" value={themeConfig.normalText} onChange={(e) => setThemeConfig({ ...themeConfig, normalText: e.target.value })} className="color-swatch" />
                    <input type="text" value={themeConfig.normalText} onChange={(e) => setThemeConfig({ ...themeConfig, normalText: e.target.value })} className="color-code-input" />
                  </div>
                </div>

                <div className="color-option">
                  <span className="color-option-label">Status Bar</span>
                  <div className="color-option-inputs">
                    <input type="color" value={themeConfig.statusBar} onChange={(e) => setThemeConfig({ ...themeConfig, statusBar: e.target.value })} className="color-swatch" />
                    <input type="text" value={themeConfig.statusBar} onChange={(e) => setThemeConfig({ ...themeConfig, statusBar: e.target.value })} className="color-code-input" />
                  </div>
                </div>

                <button 
                  className="terminal-interactive-btn"
                  onClick={() => handleCopy(`# Fyzenor colors config\nDIR: ${themeConfig.activeText}\nFILE: ${themeConfig.normalText}\nBORDER: ${themeConfig.border}\nSEL_BG: ${themeConfig.statusBar}\nSEC_SEL_BG: ${themeConfig.statusBar}`, 'colors-fz-copy')}
                  style={{ marginTop: '1rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  {copiedText === 'colors-fz-copy' ? <Check size={16} /> : <Copy size={16} />}
                  {copiedText === 'colors-fz-copy' ? 'Copied Config!' : 'Copy colors.fz'}
                </button>
              </div>

              <div className="preview-tui-box" style={{ backgroundColor: themeConfig.bg, borderColor: themeConfig.border }}>
                <div className="tui-header" style={{ borderBottomColor: themeConfig.border, color: themeConfig.normalText }}>
                  <span>1 shared</span>
                  <span>2 Download</span>
                  <span>3 config</span>
                </div>
                <div className="tui-columns">
                  <div className="tui-column" style={{ borderRightColor: themeConfig.border, color: themeConfig.normalText }}>
                    <div style={{ opacity: 0.5 }}>📁 src/</div>
                    <div style={{ opacity: 0.5 }}>📁 build/</div>
                    <div style={{ opacity: 0.5 }}>📁 docs/</div>
                  </div>
                  <div className="tui-column" style={{ borderRightColor: themeConfig.border, color: themeConfig.normalText }}>
                    <div className="tui-item-active" style={{ backgroundColor: themeConfig.accentGlow, color: themeConfig.activeText }}>
                      <FolderOpen size={12} /> main.cpp
                    </div>
                    <div>file_manager.h</div>
                    <div>async_task.h</div>
                    <div>utils.cpp</div>
                  </div>
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

        {activeTab === 'community' && (
          <div className="animate-fade-in">
            <h2>🤝 Contributing</h2>
            <p>Contributions are welcome to make Fyzenor even better!</p>
            <ol style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li>Fork the repository on GitHub.</li>
              <li>Create a descriptive feature branch (<code>git checkout -b feature/cool-idea</code>).</li>
              <li>Implement and test your changes locally.</li>
              <li>Submit a clear pull request describing the implementation details.</li>
            </ol>
            <p>Detailed workflow instructions can be found inside <a href="https://github.com/Bimbok/fyzenor/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">CONTRIBUTING.md</a>, and community participation is governed by <a href="https://github.com/Bimbok/fyzenor/blob/main/CODE_OF_CONDUCT.md" target="_blank" rel="noopener noreferrer">CODE_OF_CONDUCT.md</a>.</p>

            <h2>📞 Contact &amp; Support</h2>
            <ul>
              <li><strong>GitHub Profile</strong>: <a href="https://github.com/Bimbok" target="_blank" rel="noopener noreferrer">@Bimbok</a></li>
              <li><strong>Issues &amp; Requests</strong>: <a href="https://github.com/Bimbok/fyzenor/issues" target="_blank" rel="noopener noreferrer">Submit an Issue</a></li>
            </ul>

            <h2>⚖️ License</h2>
            <p>Distributed under the MIT License. See standard terms below:</p>
            <div className="code-container" style={{ maxHeight: '200px', overflowY: 'auto' }}>
              <div className="code-block" style={{ fontSize: '0.8rem', whiteSpace: 'pre-wrap' }}>
                MIT License

                Copyright (c) 2026 Bimbok

                Permission is hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the "Software"), to deal
                in the Software without restriction, including without limitation the rights
                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                copies of the Software, and to permit persons to whom the Software is
                furnished to do so, subject to the following conditions:

                The above copyright notice and this permission notice shall be included in all
                copies or substantial portions of the Software.

                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                SOFTWARE.
              </div>
            </div>
          </div>
        )}

        {activeTab === 'troubleshoot' && (
          <div className="animate-fade-in">
            <h2>Frequently Asked Questions &amp; Troubleshooting</h2>
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
