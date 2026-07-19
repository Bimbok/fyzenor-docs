import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import {
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
  Users,
  ChevronUp,
  Hand,
  GitBranch,
} from "lucide-react";

interface DocSection {
  id: string;
  title: string;
  icon: React.ReactNode;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("overview");

  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [paletteQuery, setPaletteQuery] = useState<string>("");
  const [paletteSelectedIndex, setPaletteSelectedIndex] = useState<number>(0);
  const mainContentRef = React.useRef<HTMLDivElement>(null);

  // Terminal Simulator State
  const [termInput, setTermInput] = useState<string>("");
  const [termLines, setTermLines] = useState<string[]>([
    "Fyzenor Terminal Simulator v4.2.0",
    'Type "help" or click one of the preset commands below to test.',
    "",
  ]);

  // Keyboard Helper State
  const [selectedKey, setSelectedKey] = useState<string>("d");

  // Color Configurator State
  const [themeConfig, setThemeConfig] = useState({
    bg: "#0b0c10",
    border: "#1e293b",
    activeText: "#10b981",
    normalText: "#f3f4f6",
    statusBar: "#13151c",
    accentGlow: "rgba(16, 185, 129, 0.25)",
  });

  const sections: DocSection[] = [
    {
      id: "overview",
      title: "Overview & Features",
      icon: <BookOpen size={18} />,
    },
    {
      id: "install",
      title: "Quick Start & Install",
      icon: <Download size={18} />,
    },
    {
      id: "keyboard",
      title: "Keyboard Controls",
      icon: <Keyboard size={18} />,
    },
    { id: "trash", title: "Trash Deep Dive", icon: <Trash2 size={18} /> },
    {
      id: "dragdrop",
      title: "Drag & Drop Support",
      icon: <Hand size={18} />,
    },
    {
      id: "git",
      title: "Git & Lazygit",
      icon: <GitBranch size={18} />,
    },
    {
      id: "tasks",
      title: "Task Controls & Smart Copy",
      icon: <Sliders size={18} />,
    },
    {
      id: "architecture",
      title: "Architecture & Threads",
      icon: <Cpu size={18} />,
    },
    {
      id: "theming",
      title: "Configuration & Themes",
      icon: <Sparkles size={18} />,
    },
    {
      id: "community",
      title: "Community & License",
      icon: <Users size={18} />,
    },
    {
      id: "troubleshoot",
      title: "Troubleshooting",
      icon: <HelpCircle size={18} />,
    },
  ];

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Keyboard map metadata - fully expanded matching README and Help panel
  const keyMap: Record<
    string,
    { title: string; desc: string; category: string }
  > = {
    j: {
      title: "Navigate (Down)",
      desc: "Moves selection down inside the active directory listing or sidebar.",
      category: "Navigation",
    },
    k: {
      title: "Navigate (Up)",
      desc: "Moves selection up inside the active directory listing or sidebar.",
      category: "Navigation",
    },
    h: {
      title: "Back / Clear Search",
      desc: "Navigates back to the parent directory. If a content search view is open, clears search results.",
      category: "Navigation",
    },
    l: {
      title: "Open / Enter Directory",
      desc: "Opens the selected file in your terminal-based editor (or default viewer) / enters highlighted folder.",
      category: "Navigation",
    },
    g: {
      title: "Go to Top",
      desc: "Instantly scrolls the active listing to the first item.",
      category: "Navigation",
    },
    G: {
      title: "Go to Bottom",
      desc: "Instantly scrolls the active listing to the last item.",
      category: "Navigation",
    },
    "/": {
      title: "Search (ripgrep)",
      desc: "Launches an interactive file content search using ripgrep (rg) across the active folder.",
      category: "Navigation",
    },
    f: {
      title: "Fuzzy Find",
      desc: "Fuzzy searches file and directory names inside the current folder.",
      category: "Navigation",
    },
    w: {
      title: "Show Active Tasks",
      desc: "Opens the background task worker queue manager overlay to monitor, pause, or kill tasks.",
      category: "Navigation",
    },
    "Ctrl+O": {
      title: "Go Back",
      desc: "Navigates back to the previously visited directory in the active tab's history.",
      category: "Navigation",
    },
    "Ctrl+P": {
      title: "Go Forward",
      desc: "Navigates forward in the active tab's directory history.",
      category: "Navigation",
    },
    H: {
      title: "History Overlay",
      desc: "Opens a scrollable overlay of recently visited directory paths to jump to.",
      category: "Navigation",
    },
    y: {
      title: "Copy (Yank)",
      desc: "Copies selected items or current file path to internal clipboard.",
      category: "File Operations",
    },
    x: {
      title: "Cut",
      desc: "Cuts selected items to internal clipboard (items will be moved when pasted).",
      category: "File Operations",
    },
    p: {
      title: "Paste",
      desc: "Pastes items from the clipboard. Automatically handles smart block-level file copy resumption if interrupted.",
      category: "File Operations",
    },
    Y: {
      title: "Paste as Symlink",
      desc: "Creates absolute symlinks of clipboard items at the current directory.",
      category: "File Operations",
    },
    d: {
      title: "Move to Trash / Unpin Bookmark",
      desc: "Moves selected items to Freedesktop trash. If pressed inside the Trash Manager overlay, deletes highlighted items permanently. If Bookmarks panel is focused, removes (unpins) the highlighted bookmark.",
      category: "File Operations",
    },
    Delete: {
      title: "Move to Trash",
      desc: "Moves selected items to Freedesktop trash. (Same behavior as d).",
      category: "File Operations",
    },
    D: {
      title: "Delete Permanently",
      desc: "Bypasses the Trash bin completely and deletes selected files permanently after a confirmation prompt.",
      category: "File Operations",
    },
    T: {
      title: "Toggle Trash Manager",
      desc: "Opens the unified Trash Manager interface, scanning and listing all deleted items across partition trash folders.",
      category: "File Operations",
    },
    u: {
      title: "Undo Trash Action",
      desc: "Undoes the last move-to-trash action, restoring files back to their original partition paths.",
      category: "File Operations",
    },
    r: {
      title: "Rename / Restore",
      desc: "Renames current file (launches bulk editor renaming if multiple files are selected). If inside the Trash Manager, restores highlighted items to their original path.",
      category: "File Operations",
    },
    n: {
      title: "New File",
      desc: "Prompts to create a new blank file in the current directory.",
      category: "File Operations",
    },
    N: {
      title: "New Folder",
      desc: "Prompts to create a new empty directory.",
      category: "File Operations",
    },
    z: {
      title: "Zip",
      desc: "Asynchronously packs selected files and folders into a zip archive.",
      category: "File Operations",
    },
    e: {
      title: "Extract / Empty Trash",
      desc: "Extracts highlighted archive. If inside the Trash Manager, empties all partition trash bins.",
      category: "File Operations",
    },
    c: {
      title: "Copy Absolute Path",
      desc: "Copies the absolute path of the current file directly into the system clipboard.",
      category: "File Operations",
    },
    "Ctrl+D": {
      title: "Drag Out",
      desc: "Triggers drag-and-drop out of the terminal. Spawns ripdrag or dragon asynchronously to drag files into browsers or GUI folders.",
      category: "File Operations",
    },
    Space: {
      title: "Select Item",
      desc: "Toggles the selection state of the highlighted file/folder for bulk operations.",
      category: "Selection",
    },
    v: {
      title: "Select Item",
      desc: "Similar to Space, toggles selection of the highlighted item.",
      category: "Selection",
    },
    a: {
      title: "Select All",
      desc: "Selects all visible files and folders in the current directory.",
      category: "Selection",
    },
    Esc: {
      title: "Clear Selection",
      desc: "Deselects all files and closes active dialogs/searches.",
      category: "Selection",
    },
    ".": {
      title: "Toggle Hidden",
      desc: "Toggles visibility of hidden files and dotfolders.",
      category: "View",
    },
    s: {
      title: "Toggle Sorting",
      desc: "Cycles sorting criteria between Name, Size (Descending), and Date Modified (Descending).",
      category: "View",
    },
    P: {
      title: "Pin Directory",
      desc: "Pins current directory path to persistent bookmarks saved in <code>~/.fm_pins</code> (focused list panel).",
      category: "View",
    },
    Tab: {
      title: "Toggle Pinned / Switch Pane",
      desc: "Switches keyboard focus between Files list and Bookmarks sidebar. In Dual-Pane, switches active pane focus.",
      category: "View",
    },
    F2: {
      title: "Dual-Pane Mode",
      desc: "Toggles side-by-side vertical file browser panels for rapid navigation and copying.",
      category: "View",
    },
    "Ctrl+G": {
      title: "Open Lazygit / Grow Width",
      desc: "Launches lazygit in the active directory (normal mode) or increases the horizontal size of the currently focused pane (Dual-Pane mode).",
      category: "View",
    },
    "Ctrl+B": {
      title: "Shrink Active Pane Width",
      desc: "Decreases the horizontal size of the currently focused pane in Dual-Pane mode. (Alternative: <code>Ctrl+H</code>).",
      category: "View",
    },
    F3: {
      title: "Toggle Preview Pane",
      desc: "Toggles visibility of the rightmost file preview pane in normal view mode.",
      category: "View",
    },
    F4: {
      title: "Toggle Parent Pane",
      desc: "Toggles visibility of the leftmost parent directory navigation sidebar in normal view mode.",
      category: "View",
    },
    F6: {
      title: "Toggle Bookmarks Pane",
      desc: "Toggles visibility of the leftmost pinned bookmarks sidebar in normal view mode.",
      category: "View",
    },
    F5: {
      title: "Refresh Directory",
      desc: "Forces folder re-indexing, clears sizes caches, and redraws the UI.",
      category: "View",
    },
    "Ctrl+R": {
      title: "Refresh Directory",
      desc: "Forces folder re-indexing, clears sizes caches, and redraws the UI. (Alternative to F5).",
      category: "View",
    },
    i: {
      title: "Show File Details",
      desc: "Displays detailed metadata overlay (UID, GID, file permissions, dates, size).",
      category: "View",
    },
    I: {
      title: "Permissions & Ownership Editor",
      desc: "Opens an interactive modal to visually inspect and edit chmod/chown fields for the highlighted file.",
      category: "File Operations",
    },
    m: {
      title: "Mounts & External Devices",
      desc: "Opens block devices overlay to mount/unmount USB drives and Android mobile phones.",
      category: "View",
    },
    t: {
      title: "Create New Tab",
      desc: "Creates a new directory browser tab.",
      category: "Tabs",
    },
    W: {
      title: "Close Current Tab",
      desc: "Closes the current browser tab. (Alternative: Ctrl+W).",
      category: "Tabs",
    },
    "Ctrl+W": {
      title: "Close Current Tab",
      desc: "Closes the current browser tab. (Alternative to W).",
      category: "Tabs",
    },
    "[": {
      title: "Prev Tab",
      desc: "Switches focus to the previous active tab.",
      category: "Tabs",
    },
    "]": {
      title: "Next Tab",
      desc: "Switches focus to the next active tab.",
      category: "Tabs",
    },
    "?": {
      title: "Show Help Panel",
      desc: "Opens the built-in help and keybindings overlay panel.",
      category: "General",
    },
    ":": {
      title: "Shell Command Prompt",
      desc: "Launches prompt to execute shell commands globally (append & for background tasks).",
      category: "Operations",
    },
  };

  // Keyboard shortcut (Ctrl+K / Cmd+K) to open Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => {
          if (!prev) {
            setPaletteQuery("");
            setPaletteSelectedIndex(0);
          }
          return !prev;
        });
      }
      if (e.key === "Escape") {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Searchable page content index for fuzzy finding over all sections
  const searchableContent = [
    {
      id: "overview",
      title: "Overview & Features",
      keywords: "miller columns three column layout layout async media preview fast navigation copy paste delete move",
      content: "Fyzenor is a lightweight, high-performance terminal file manager engineered from the ground up with C++17. Focuses on async performance and responsive Miller columns."
    },
    {
      id: "overview",
      title: "Pinned Bookmarks & Saved Paths",
      keywords: "bookmarks pinned list pins pin directory p tab j k d unpin ~/.fm_pins",
      content: "Save and quickly jump to favorite folders. Pinned bookmarks are saved in ~/.fm_pins. Switch panel focus with Tab, navigate with j/k, and pin directories using P."
    },
    {
      id: "overview",
      title: "Shell Commands & Macro Variables",
      keywords: "shell macro macros global command prefix cmd $f $s & background execute launcher prompt",
      content: "Execute commands globally. Use macro variable $f for current file, $s for selections, and & to spawn background launches."
    },
    {
      id: "overview",
      title: "Block Drive & Android MTP Mounts",
      keywords: "mount block devices mount mobile android mtp mounts external gio mount f2",
      content: "Mount and browse block drives and Android mobile devices (via MTP). Press f2 to manage mount actions."
    },
    {
      id: "install",
      title: "Quick Start & Installation",
      keywords: "install debian fedora arch termux script curl build gcc make cmake dependencies pkg pacman apt dnf",
      content: "Run the single-line installation script or install manually on Arch Linux, Debian, Fedora, and Termux with pacman, apt, dnf, or pkg."
    },
    {
      id: "keyboard",
      title: "Keyboard Controls & Shortcuts",
      keywords: "keymap keycaps navigation operations selection tabs visual mode hjkl edit rename",
      content: "Vim-style keyboard layout controls. Navigate directories with h/j/k/l. Perform batch operations using visual selection."
    },
    {
      id: "trash",
      title: "Trash Deep Dive & Deletions",
      keywords: "trash local trash move to trash trashinfo specification path deletion date restore empty trash e r u asynctask thread",
      content: "Move items to local partition trash bins instantly. Complies with Freedesktop Desktop Trash Can Specification. Restore with r, empty with e, undo with u."
    },
    {
      id: "tasks",
      title: "Task Controls & Queue Manager",
      keywords: "asynchronous task manager w pause resume cancel workers zip copy delta overwrite replace skip sigstop sigcont",
      content: "Asynchronous task queue manager overlay. Monitor background copies, moves, compressions, and trashings with w. Pause with SIGSTOP and resume with SIGCONT."
    },
    {
      id: "tasks",
      title: "Smart Delta Copy Resumption",
      keywords: "smart copy overwrite prompt replace replace older skip resume delta",
      content: "Intelligent recovery for interrupted copies. Prompts options to replace, replace older, or skip. Resumes block-level writes where it left off."
    },
    {
      id: "architecture",
      title: "Architecture & Threads Concurrency",
      keywords: "threads std::thread thread safety concurrency activeTasks task completion handler loop ncurses boundary",
      content: "Decoupled multi-threaded C++ TUI architecture. Offloads file operations to background worker std::thread loops to prevent ncurses UI blockages."
    },
    {
      id: "theming",
      title: "Theme Configurator & Matugen",
      keywords: "matugen theme custom colors config theme.toml background text active accent status bar presets gallery tokyo night catppuccin gruvbox nord dracula",
      content: "Configure custom TUI colors and export theme.toml configurations. Choose from presets like Tokyo Night, Catppuccin, Gruvbox, Nord, and Dracula."
    },
    {
      id: "theming",
      title: "C++ Color Variables (Matugen Templates)",
      keywords: "colors variables 19 matugen active bg border statusbar accent glow",
      content: "Customize all 19 parsed C++ variables to skin your file manager to match Matugen color templates."
    },
    {
      id: "overview",
      title: "Archive Tree Previewer",
      keywords: "zip tar tgz gz rar 7z bz2 xz archive content listing popen unzip",
      content: "Inspect contents of .zip, .tar.gz, .rar, and .7z archives directly in the TUI preview pane asynchronously without blocking navigation."
    },
    {
      id: "overview",
      title: "Rich Media Metadata Reader",
      keywords: "mediainfo ffprobe ffmpeg audio video image metadata codec sample rate resolution bitrate",
      content: "Read codec names, bitrates, dimensions, sample rates, title, and artist metadata tags for images, audio, and video tracks."
    },
    {
      id: "theming",
      title: "Custom Keyboard Macros (keys.toml)",
      keywords: "custom keys keybinds config keys.toml macros $f $s shell subprocess def_prog_mode",
      content: "Map single-key shortcuts in ~/.config/fyzenor/keys.toml to execute shell commands with macro path variables $f and $s."
    },
    {
      id: "community",
      title: "Community & License",
      keywords: "license open source mit contributing github issues fork pull request",
      content: "Fyzenor is released under the MIT License. Contributions are welcome on GitHub! Open issues, submit pull requests, or star the repo."
    },
    {
      id: "troubleshoot",
      title: "Troubleshooting & FAQ",
      keywords: "crashes terminal size ncurses compilation errors filesystem filesystem library g++ gcc",
      content: "Fix filesystem library compilation errors. Check ncurses locale support for icons. Validate custom theme.toml syntax rules."
    }
  ];

  // Flatten shortcuts data map for Fuse.js searching
  const shortcutData = Object.entries(keyMap).map(([key, details]) => ({
    key,
    title: details.title,
    desc: details.desc,
  }));

  // Configure Fuse.js instances for weighted relevance searches
  const fusePages = new Fuse(searchableContent, {
    keys: [
      { name: "title", weight: 1.0 },
      { name: "keywords", weight: 0.7 },
      { name: "content", weight: 0.4 },
    ],
    threshold: 0.4,
    distance: 100,
  });

  const fuseShortcuts = new Fuse(shortcutData, {
    keys: [
      { name: "key", weight: 1.0 },
      { name: "title", weight: 0.8 },
      { name: "desc", weight: 0.4 },
    ],
    threshold: 0.4,
    distance: 100,
  });

  // Filter Command Palette search results using Fuse.js fuzzy matching
  const getPaletteResults = () => {
    const query = paletteQuery.trim();
    if (!query) {
      // Default placeholder list before typing queries
      const defaultResults: Array<{
        type: "Page" | "Shortcut";
        title: string;
        subtitle: string;
        action: () => void;
      }> = [];

      searchableContent.forEach((item) => {
        defaultResults.push({
          type: "Page",
          title: item.title,
          subtitle: item.content,
          action: () => {
            setActiveTab(item.id);
            setCommandPaletteOpen(false);
            setTimeout(() => {
              mainContentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
            }, 50);
          },
        });
      });

      shortcutData.forEach((item) => {
        defaultResults.push({
          type: "Shortcut",
          title: `${item.key} — ${item.title}`,
          subtitle: item.desc,
          action: () => {
            setActiveTab("keyboard");
            setSelectedKey(item.key);
            setCommandPaletteOpen(false);
            setTimeout(() => {
              mainContentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
            }, 50);
          },
        });
      });

      return defaultResults;
    }

    // Perform fuzzy weighted searches
    const pageResults = fusePages.search(query).map((res) => ({
      type: "Page" as const,
      title: res.item.title,
      subtitle: res.item.content,
      action: () => {
        setActiveTab(res.item.id);
        setCommandPaletteOpen(false);
        setTimeout(() => {
          mainContentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
        }, 50);
      },
    }));

    const shortcutResults = fuseShortcuts.search(query).map((res) => ({
      type: "Shortcut" as const,
      title: `${res.item.key} — ${res.item.title}`,
      subtitle: res.item.desc,
      action: () => {
        setActiveTab("keyboard");
        setSelectedKey(res.item.key);
        setCommandPaletteOpen(false);
        setTimeout(() => {
          mainContentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
        }, 50);
      },
    }));

    return [...pageResults, ...shortcutResults];
  };

  const filteredPaletteResults = getPaletteResults();

  // Reset selected index when query changes
  useEffect(() => {
    setPaletteSelectedIndex(0);
  }, [paletteQuery]);

  // Navigate Command Palette results using arrow keys and Enter
  useEffect(() => {
    if (!commandPaletteOpen) return;

    const handlePaletteKeys = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setPaletteSelectedIndex((prev) =>
          prev < filteredPaletteResults.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setPaletteSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredPaletteResults.length - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredPaletteResults[paletteSelectedIndex]) {
          filteredPaletteResults[paletteSelectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handlePaletteKeys);
    return () => window.removeEventListener("keydown", handlePaletteKeys);
  }, [commandPaletteOpen, filteredPaletteResults, paletteSelectedIndex]);

  const scrollToTop = () => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePresetCommand = (cmd: string) => {
    let output: string[] = [];
    if (cmd === "fyzenor --version") {
      output = ["$", "fyzenor --version", "Fyzenor version 4.2.0"];
    } else if (cmd === "fyzenor --help") {
      output = [
        "$",
        "fyzenor --help",
        "Fyzenor - The Blazing Fast, Modern C++ Terminal File Manager",
        "Usage: fyzenor [options]",
        "Options:",
        "  -v, --version         Show version information",
        "  -h, --help            Show this help message",
      ];
    } else if (cmd === "install") {
      output = [
        "$",
        "curl -fsSL https://raw.githubusercontent.com/Bimbok/fyzenor/main/install.sh | bash",
        "[*] Detecting system components...",
        "[*] Installing packages: cmake, ncursesw, ffmpeg, bat, ripgrep...",
        "[*] Building project binaries...",
        "[100%] Built target fyzenor",
        '[✔] Installation completed successfully! Run "fyzenor" to start.',
      ];
    } else if (cmd === "clear") {
      setTermLines(["Fyzenor Terminal Simulator v4.2.0", ""]);
      return;
    } else if (cmd === "help") {
      output = [
        "$ help",
        "Available commands:",
        "  fyzenor --version  - Check the current release version",
        "  fyzenor --help     - Show the help manual options",
        "  install            - Simulate installation steps",
        "  clear              - Clear this terminal output screen",
      ];
    } else {
      output = ["$", cmd, `sh: command not found: ${cmd}`];
    }
    setTermLines((prev) => [...prev, ...output, ""]);
  };

  const handleTermSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termInput.trim()) return;
    handlePresetCommand(termInput.trim());
    setTermInput("");
  };


  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className={`sidebar ${mobileMenuOpen ? "open" : ""}`}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "2rem",
          }}
        >
          <img
            src="/fyzenor.png"
            alt="Fyzenor Logo"
            className="logo-animated"
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          />
          <div>
            <h2
              style={{
                fontSize: "1.4rem",
                border: "none",
                padding: 0,
                margin: 0,
                fontWeight: 800,
                background: "linear-gradient(90deg, #fff, #9ca3af)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Fyzenor
            </h2>
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--accent-green)",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              DOCS • V4.2.0
            </span>
          </div>
        </div>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: "1.5rem" }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "0.85rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
            }}
          />
          <input
            type="text"
            placeholder="Search docs..."
            onClick={() => setCommandPaletteOpen(true)}
            onFocus={(e) => {
              e.currentTarget.blur();
              setCommandPaletteOpen(true);
            }}
            className="sidebar-search-input"
            readOnly
            style={{ cursor: "pointer", paddingRight: "2.5rem" }}
          />
          <div
            style={{
              position: "absolute",
              right: "0.85rem",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid var(--border-color)",
              padding: "0.15rem 0.35rem",
              borderRadius: "6px",
              fontSize: "0.7rem",
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
              pointerEvents: "none",
            }}
          >
            ⌘K
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="nav-menu">
          {sections.map((sec) => (
            <div
              key={sec.id}
              className={`nav-item ${activeTab === sec.id ? "active" : ""}`}
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
        <div
          style={{
            borderTop: "1px solid var(--border-color)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            style={{
              background: "transparent",
              border: "1px solid var(--border-color)",
              padding: "0.5rem",
              borderRadius: "12px",
              cursor: "pointer",
              color: "var(--text-secondary)",
            }}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a
            href="https://github.com/Bimbok/fyzenor"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--text-secondary)",
              textDecoration: "none",
              fontSize: "0.85rem",
              fontWeight: 500,
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
            GitHub
          </a>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Header */}
      <header className="mobile-header">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--text-primary)",
          }}
        >
          <Menu size={24} />
        </button>
        <span style={{ fontWeight: 800 }}>Fyzenor Docs</span>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--text-primary)",
          }}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      {/* Main Panel Content */}
      <main
        className="main-content"
        ref={mainContentRef}
        onScroll={(e) => {
          setShowScrollTop(e.currentTarget.scrollTop > 300);
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <div>
            <h1>The Blazing Fast C++ File Manager</h1>
            <p style={{ fontSize: "1.15rem" }}>
              Async workflows, robust task states, multi-partition trashing, and
              intelligent copy resumption.
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <span className="badge badge-green">v4.2.0</span>
            <span className="badge badge-purple">C++17</span>
            <span className="badge badge-cyan">Ncurses</span>
          </div>
        </div>

        {/* Tab Components */}
        {activeTab === "overview" && (
          <div className="animate-fade-in">

            <h2>Introduction</h2>
            <p>
              Fyzenor is a lightweight, high-performance terminal file manager
              engineered from the ground up with modern <strong>C++17</strong>. It is
              designed to bridge the gap between the raw power of the command
              line and the visual feedback of modern GUIs.
            </p>
            <p>
              With its asynchronous architecture, Fyzenor ensures that heavy
              operations like directory size calculation and media preview
              generation never block the UI, providing a "blazing fast"
              experience even on large filesystems. Whether you are a developer,
              a system administrator, or a power user, Fyzenor allows you to
              navigate and manage your files with the speed of thought.
            </p>

            <div className="alert-info-box">
              <Info size={20} style={{ flexShrink: 0 }} />
              <div>
                <strong>V4.2.0 Release Note:</strong> Integrates native <strong>Lazygit</strong> support (mapped to <code>Ctrl+G</code>) with centered floating popup overlays inside <code>tmux</code> sessions. Resolves several stability/robustness bugs including a critical UTF-8 safe truncation underflow, search thread path data races, scroll calculation math, and memory usage optimization via LRU image cache limits.
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
                    <td>
                      <strong>Three-Column Layout</strong>
                    </td>
                    <td>
                      Navigate with a Miller-style layout showing pinned items,
                      parent/current directories, and a live preview pane.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Asynchronous Tabs</strong>
                    </td>
                    <td>
                      Open multiple directories in native tabs, navigating
                      easily with <code>[</code>/<code>]</code> and number keys{" "}
                      <code>1</code>-<code>9</code>, preserving your selections.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Interactive Shell Commands</strong>
                    </td>
                    <td>
                      Execute shell commands globally with <code>:</code>.
                      Supports foreground utilities, background tasks (
                      <code>&amp;</code>), and path placeholders (
                      <code>$f</code>/<code>$s</code>).
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Bulk Rename via Editor</strong>
                    </td>
                    <td>
                      Select multiple files and press <code>r</code> to rename
                      them all at once inside your default text editor (e.g.{" "}
                      <code>nvim</code>, <code>nano</code>).
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Drag &amp; Drop Integration</strong>
                    </td>
                    <td>
                      Drop files directly into the terminal window to Copy/Move
                      them, or press <code>Ctrl+D</code> to drag files out into
                      GUI applications (via <code>ripdrag</code> or{" "}
                      <code>dragon</code>).
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Smart Copy Resumption</strong>
                    </td>
                    <td>
                      Resumes interrupted file copies block-by-block (
                      <code>seekg</code>/<code>seekp</code>) by comparing file
                      sizes and copying only the remaining bytes.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Task Play/Pause Controls</strong>
                    </td>
                    <td>
                      Suspend (pause) and resume background copy, move, delete,
                      zip, and extract tasks directly from the task list.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Freedesktop Trash System</strong>
                    </td>
                    <td>
                      Move items to trash (<code>d</code>) and restore/empty
                      them in-build. Integrates home trash and local partition
                      trash folders.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>
                        Undo Trash Action (<code>u</code>)
                      </strong>
                    </td>
                    <td>
                      Undo the last move-to-trash action instantly, restoring
                      items back to their original paths.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Dynamic Disk Space Status</strong>
                    </td>
                    <td>
                      Displays partition name, progress bar, percent used, and
                      free space dynamically for the current drive.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Dynamic Empty Folder Icons</strong>
                    </td>
                    <td>
                      Instantly identifies empty directories (<code></code>)
                      versus populated ones (<code></code>) using fast metadata
                      caching.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Simultaneous Multi-Open</strong>
                    </td>
                    <td>
                      Open all selected files simultaneously; code/text files
                      load in a single editor, media in an <code>mpv</code>{" "}
                      playlist, others in background launchers.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Robust Symlink Management</strong>
                    </td>
                    <td>
                      Custom link icons (<code>󰌹</code>), detailed resolution
                      preview (detects broken paths), and quick absolute symlink
                      pasting with Shift+Y (<code>Y</code>).
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Dynamic Sorting Modes</strong>
                    </td>
                    <td>
                      Toggle sorting order dynamically by pressing{" "}
                      <code>s</code>, cycling between <strong>Name</strong>, <strong>Size (Desc)</strong>,
                      and <strong>Date Modified (Desc)</strong>.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Async Media Preview</strong>
                    </td>
                    <td>
                      Generate image and video previews in the background using
                      the Kitty Graphics Protocol and <code>ffmpeg</code>,
                      without freezing navigation.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Modern &amp; Polished UI</strong>
                    </td>
                    <td>
                      A clean, minimal interface featuring rounded corners,
                      optimized spacing, and an elegant color palette designed
                      for long-term readability and comfort.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Syntax-Aware Text Preview</strong>
                    </td>
                    <td>
                      Preview code and text files with <code>bat</code> or{" "}
                      <code>batcat</code>, with fallback to plain text when
                      needed.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Background Folder Sizing</strong>
                    </td>
                    <td>
                      Directory sizes are calculated asynchronously and update
                      in place while you keep moving.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Vim-Style Navigation</strong>
                    </td>
                    <td>
                      Fast keyboard-driven navigation with <code>h</code>,{" "}
                      <code>j</code>, <code>k</code>, <code>l</code>,{" "}
                      <code>g</code>, <code>G</code>, arrow keys, and
                      enter-based traversal.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Nerd Fonts Integration</strong>
                    </td>
                    <td>
                      Rich iconography for directories, archives, media, and
                      code file formats for faster visual identification.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Multi-Selection &amp; Bulk Actions</strong>
                    </td>
                    <td>
                      Select multiple files and apply copy, cut, paste, delete,
                      and zip operations efficiently.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Persistent Pins</strong>
                    </td>
                    <td>
                      Save frequently used directories to{" "}
                      <code>~/.fm_pins</code> and jump back to them instantly.
                      Press <code>Tab</code> to focus the Bookmarks list,{" "}
                      <code>j</code>/<code>k</code> to navigate,{" "}
                      <code>Enter</code> to jump, and <code>d</code> to unpin.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Flicker-Free Rendering</strong>
                    </td>
                    <td>
                      Optimized redraw behavior keeps the interface smooth while
                      reducing unnecessary terminal updates.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Rich File Operations</strong>
                    </td>
                    <td>
                      Create files/folders, rename entries, zip selections, copy
                      absolute paths, and manage content without leaving the
                      TUI.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Theme Support</strong>
                    </td>
                    <td>
                      Customize the UI through{" "}
                      <code>~/.config/fyzenor/theme.toml</code>, with optional
                      Matugen-powered wallpaper theming.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Editor Integration</strong>
                    </td>
                    <td>
                      Opens text/code files with your configured editor via{" "}
                      <code>$EDITOR</code> or <code>$VISUAL</code>, with
                      sensible fallbacks.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Content Search (ripgrep)</strong>
                    </td>
                    <td>
                      Search for file contents under the current directory using{" "}
                      <code>ripgrep</code>, displaying relative paths and
                      supporting vim-like navigation.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Manual Cache Refresh</strong>
                    </td>
                    <td>
                      Refresh directory contents and invalidate sizes/previews
                      cache instantly using <code>F5</code> /{" "}
                      <code>Ctrl+R</code>.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Dual-Pane Mode</strong>
                    </td>
                    <td>
                      Toggle (<code>F2</code>) side-by-side active file listings
                      for drag-free copying, with easy tab focus switching (
                      <code>Tab</code>) and active column resizing (
                      <code>Ctrl+G</code> to grow, <code>Ctrl+B</code> / <code>Ctrl+H</code> to shrink).
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Device Detection &amp; Mounts</strong>
                    </td>
                    <td>
                      Detect, mount, unmount, and navigate connected USB block
                      drives and mobile phones (Android MTP) natively without
                      needing Nautilus.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Live Auto-Updates (inotify)</strong>
                    </td>
                    <td>
                      Automatically detects filesystem changes (creations,
                      deletions, renames) in the current directory and refreshes
                      the TUI instantly.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Archive Previewer</strong>
                    </td>
                    <td>
                      Inspect contents of <code>.zip</code>, <code>.tar.gz</code>,{" "}
                      <code>.rar</code>, and <code>.7z</code> archives directly in
                      the TUI preview pane without extracting them.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Media Metadata Inspector</strong>
                    </td>
                    <td>
                      Read codec names, bitrates, dimensions, sample rates, title,
                      and artist metadata tags for images, audio, and video tracks
                      using <code>mediainfo</code> or <code>ffprobe</code>.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Custom Key Macros</strong>
                    </td>
                    <td>
                      Map single-key binds in <code>~/.config/fyzenor/keys.toml</code>{" "}
                      to run shell commands with path placeholders (
                      <code>$f</code>, <code>$s</code>). Suspends TUI mode for full
                      interactive I/O, waiting for Enter before return.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Visual Permissions &amp; Ownership</strong>
                    </td>
                    <td>
                      Inspect and edit file permissions (Read/Write/Execute) and ownership (UID/GID) using an interactive checkbox grid overlay by pressing <code>I</code>.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Tab-Scoped Jump History</strong>
                    </td>
                    <td>
                      Navigate back and forth through visited directory paths independently per tab with <code>Ctrl+O</code> and <code>Ctrl+P</code>, or inspect the recent history panel using <code>H</code>.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>🔍 Rich Media & Archive Previews</h2>
            <p>
              Fyzenor uses an asynchronous background preview pipeline to inspect
              compressed archives and query multimedia metadata. This prevents navigation
              latency and removes binary file warning barriers.
            </p>

            <h3>1. Archive Tree Previewer</h3>
            <p>
              When navigating onto an archive file, the Preview pane invokes background
              listing processes to show contents without extraction.
            </p>
            <ul style={{ marginLeft: "1.5rem", marginBottom: "1.5rem" }}>
              <li style={{ margin: "0.4rem 0" }}>
                <strong>Supported Formats:</strong> <code>.zip</code>, <code>.tar</code>,{" "}
                <code>.tar.gz</code> (or <code>.tgz</code>), <code>.tar.bz2</code>,{" "}
                <code>.tar.xz</code>, <code>.rar</code>, and <code>.7z</code>.
              </li>
              <li style={{ margin: "0.4rem 0" }}>
                <strong>Utility Backends:</strong> Invokes system commands such as{" "}
                <code>unzip -l</code>, <code>tar -tf</code>, <code>unrar l</code>, or{" "}
                <code>7z l</code> via pipes, safe-rendering the stdout into the preview buffer.
              </li>
            </ul>

            <h3>2. Rich Media Metadata Reader</h3>
            <p>
              When highlighting audio tracks, movies, or image items, the previewer
              scans file headers and prints formatted tracks specification info.
            </p>
            <ul style={{ marginLeft: "1.5rem", marginBottom: "2rem" }}>
              <li style={{ margin: "0.4rem 0" }}>
                <strong>Preferred Engine:</strong> Uses <code>mediainfo</code> if installed to
                inspect video/audio codecs, container configurations, bitrates, audio
                channels, sample rates, metadata tags (Title, Artist, Album), and image boundaries.
              </li>
              <li style={{ margin: "0.4rem 0" }}>
                <strong>Fallback Engine:</strong> Leverages <code>ffprobe</code> (via ffmpeg)
                with search query filters to display similar metadata if <code>mediainfo</code> is
                missing.
              </li>
            </ul>

            <h3>3. PDF Text Layout Previewer</h3>
            <p>
              When navigating onto a Portable Document Format (<code>.pdf</code>) file, the previewer
              asynchronously reads the document text structures to present a layout-preserved preview.
            </p>
            <ul style={{ marginLeft: "1.5rem", marginBottom: "2rem" }}>
              <li style={{ margin: "0.4rem 0" }}>
                <strong>Formatted Extraction:</strong> Utilizes <code>pdftotext</code> (from the <code>poppler-utils</code> package)
                with layout-preservation parameters (<code>pdftotext -layout -l 3</code>) to parse the text lines of the first 3 pages of the PDF.
              </li>
              <li style={{ margin: "0.4rem 0" }}>
                <strong>No-Block Fallback:</strong> If <code>pdftotext</code> is not installed on your system, it displays a friendly status notice advising how to install it (<code>poppler-utils</code>), avoiding terminal freezes.
              </li>
            </ul>

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
                    <td>
                      <code>-v</code>
                    </td>
                    <td>
                      <code>--version</code>
                    </td>
                    <td>
                      Display the current release version of Fyzenor and exit.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>-h</code>
                    </td>
                    <td>
                      <code>--help</code>
                    </td>
                    <td>Show standard usage commands and syntax guidelines.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>💻 Shell Macros &amp; Background Execution</h2>
            <p>
              Toggling the command prompt (<code>:</code>) allows you to pass
              commands directly to your underlying shell. Fyzenor automatically
              handles variable evaluation and asynchronously offloads background
              processes:
            </p>
            <ul>
              <li>
                <strong>
                  Active File Macro (<code>$f</code>)
                </strong>
                : Expands dynamically to the absolute, shell-escaped file path
                of the currently highlighted file in the listing panel.
              </li>
              <li>
                <strong>
                  Selections List Macro (<code>$s</code>)
                </strong>
                : Expands to a space-separated list of all selected files. If no
                files are multi-selected, fallback parameters automatically
                direct the macro to evaluate as the active file (same as{" "}
                <code>$f</code>).
              </li>
              <li>
                <strong>
                  Background Tasks (<code>&amp;</code>)
                </strong>
                : Appending <code>&amp;</code> to the end of a command tells the
                C++ engine to execute the shell command asynchronously in a
                dedicated <code>std::thread</code>. The task is registered
                inside the Task Manager (<code>w</code>) where its completion
                status and exit codes are monitored live.
              </li>
            </ul>

            <h2>🔌 Natively Integrated Drive Mounting</h2>
            <p>
              Fyzenor avoids requiring graphical desktop environments or complex
              manual <code>mount</code> terminal setups by communicating
              directly with GLib's mount daemon:
            </p>
            <ul>
              <li>
                <strong>Unified Listing</strong>: Pressing <code>m</code> runs{" "}
                <code>gio mount -li</code> to scan and display connected block
                drives, digital cameras, and mobile phones.
              </li>
              <li>
                <strong>Mount Locations</strong>: Successfully mounted mobile
                phones (Android MTP) and camera devices are automatically mapped
                to <code>/run/user/&lt;uid&gt;/gvfs/mtp:...</code> or{" "}
                <code>/run/user/&lt;uid&gt;/gvfs/gphoto2:...</code>, allowing
                you to browse their folders like local filesystems.
              </li>
              <li>
                <strong>
                  Safe Unmounting (<code>u</code>)
                </strong>
                : Toggling unmount (<code>u</code>) issues a safe{" "}
                <code>gio mount -u</code> command. The file manager
                automatically validates your navigation state first, forcing
                your browser tabs to exit the device directory tree to prevent
                active lockups or data loss.
              </li>
            </ul>

            <h2>Interface Screenshots Gallery</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
                margin: "1.5rem 0",
              }}
            >
              <div className="card-premium" style={{ padding: "0.75rem" }}>
                <img
                  src="/Sample/1.png"
                  alt="Main Interface"
                  style={{
                    width: "100%",
                    borderRadius: "14px",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                />
                <h4
                  style={{
                    fontSize: "0.9rem",
                    marginTop: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  1. Main Browser Layout
                </h4>
              </div>
              <div className="card-premium" style={{ padding: "0.75rem" }}>
                <img
                  src="/Sample/2.png"
                  alt="Dual-Pane Mode"
                  style={{
                    width: "100%",
                    borderRadius: "14px",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                />
                <h4
                  style={{
                    fontSize: "0.9rem",
                    marginTop: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  2. Dual-Pane Side-by-Side Lists
                </h4>
              </div>
              <div className="card-premium" style={{ padding: "0.75rem" }}>
                <img
                  src="/Sample/3.png"
                  alt="Fuzzy Finder Overlay"
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                />
                <h4
                  style={{
                    fontSize: "0.9rem",
                    marginTop: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  3. Fuzzy Finder Search Window
                </h4>
              </div>
              <div className="card-premium" style={{ padding: "0.75rem" }}>
                <img
                  src="/Sample/4.png"
                  alt="Active Task Queues"
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                />
                <h4
                  style={{
                    fontSize: "0.9rem",
                    marginTop: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  4. Background Worker queue manager
                </h4>
              </div>
              <div className="card-premium" style={{ padding: "0.75rem" }}>
                <img
                  src="/Sample/5.png"
                  alt="Device Mounting"
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                />
                <h4
                  style={{
                    fontSize: "0.9rem",
                    marginTop: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  5. Device &amp; Block Mount Overlay
                </h4>
              </div>
              <div className="card-premium" style={{ padding: "0.75rem" }}>
                <img
                  src="/Sample/6.png"
                  alt="Metadata Inspector"
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                />
                <h4
                  style={{
                    fontSize: "0.9rem",
                    marginTop: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  6. Extensive Metadata Inspector
                </h4>
              </div>
            </div>

            <h2>Terminal Simulator Sandbox</h2>
            <p>
              Test out Fyzenor CLI arguments directly on our mock terminal
              console:
            </p>
            <div className="terminal-simulator">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <div className="terminal-dot terminal-dot-red"></div>
                  <div className="terminal-dot terminal-dot-yellow"></div>
                  <div className="terminal-dot terminal-dot-green"></div>
                </div>
                <div className="terminal-title">bash — fyzenor-simulator</div>
                <div style={{ width: "40px" }}></div>
              </div>
              <div className="terminal-body scroll-custom">
                {termLines.map((line, i) => (
                  <div key={i} className="terminal-line">
                    {line.startsWith("$") ? (
                      <span>
                        <span className="terminal-prompt">
                          bimbok@arch-box ~{" "}
                        </span>
                        {line.substring(1)}
                      </span>
                    ) : (
                      line
                    )}
                  </div>
                ))}
                <form
                  onSubmit={handleTermSubmit}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span className="terminal-prompt">bimbok@arch-box ~ </span>
                  <input
                    type="text"
                    value={termInput}
                    onChange={(e) => setTermInput(e.target.value)}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "inherit",
                      fontFamily: "inherit",
                      fontSize: "inherit",
                      outline: "none",
                      flexGrow: 1,
                      marginLeft: "0.5rem",
                    }}
                  />
                </form>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
                marginTop: "-1rem",
                marginBottom: "2rem",
              }}
            >
              <button
                className="terminal-interactive-btn"
                onClick={() => handlePresetCommand("fyzenor --version")}
              >
                Run --version
              </button>
              <button
                className="terminal-interactive-btn"
                onClick={() => handlePresetCommand("fyzenor --help")}
              >
                Run --help
              </button>
              <button
                className="terminal-interactive-btn"
                onClick={() => handlePresetCommand("install")}
              >
                Simulate installation
              </button>
              <button
                className="terminal-interactive-btn"
                onClick={() => handlePresetCommand("clear")}
              >
                Clear Screen
              </button>
            </div>

            <h2 style={{ marginTop: "2.5rem" }}>Tab-Scoped Navigation History</h2>
            <p>
              In Fyzenor, directory navigation is tracked independently inside each tab using a localized back and forward history stack.
            </p>
            <h3>Navigation Actions &amp; Hotkeys</h3>
            <ul>
              <li><strong>Go Back (<code>Ctrl+O</code>)</strong>: Jumps back to the previously visited directory. It pops from the active tab's back history stack and pushes the current path onto the forward history stack.</li>
              <li><strong>Go Forward (<code>Ctrl+P</code>)</strong>: Jumps forward in the history stack, restoring directory navigation.</li>
              <li><strong>Navigation History Panel (<code>H</code>)</strong>: Opens an overlay window listing all recently visited directory paths (newest first). You can scroll through the list and select any directory to jump directly to it.</li>
            </ul>
          </div>
        )}

        {activeTab === "install" && (
          <div className="animate-fade-in">
            <h2>Prerequisites</h2>
            <p>
              To unleash the full power of Fyzenor, especially image previews,
              your system needs a few core components.
            </p>

            <h3>1. A Compatible Terminal</h3>
            <ul>
              <li>
                <strong>Recommended:</strong>{" "}
                <a
                  href="https://sw.kovidgoyal.net/kitty/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Kitty
                </a>{" "}
                with native Kitty Graphics Protocol support.
              </li>
              <li>
                <strong>Others:</strong>{" "}
                <a
                  href="https://wezfurlong.org/wezterm/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WezTerm
                </a>{" "}
                or{" "}
                <a
                  href="https://konsole.kde.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Konsole
                </a>{" "}
                may work, but Kitty is the primary development and testing
                target.
              </li>
            </ul>

            <h3>2. System Dependencies</h3>
            <p>
              Install the required packages based on your Linux distribution:
            </p>

            <div className="code-container">
              <div className="code-header">
                <span>Debian / Ubuntu Package Installer</span>
                <button
                  className="copy-btn"
                  onClick={() =>
                    handleCopy(
                      "sudo apt update && sudo apt install build-essential libncursesw5-dev ffmpeg zip bat xclip wl-copy ripgrep",
                      "apt-install",
                    )
                  }
                >
                  {copiedText === "apt-install" ? (
                    <Check size={12} />
                  ) : (
                    <Copy size={12} />
                  )}
                  {copiedText === "apt-install" ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="code-block">{`sudo apt update
sudo apt install build-essential libncursesw5-dev ffmpeg zip bat xclip wl-copy ripgrep`}</div>
            </div>

            <div className="code-container">
              <div className="code-header">
                <span>Fedora Package Installer</span>
                <button
                  className="copy-btn"
                  onClick={() =>
                    handleCopy(
                      "sudo dnf update && sudo dnf install gcc gcc-c++ make ncurses-devel ffmpeg zip bat xclip wl-clipboard ripgrep",
                      "dnf-install",
                    )
                  }
                >
                  {copiedText === "dnf-install" ? (
                    <Check size={12} />
                  ) : (
                    <Copy size={12} />
                  )}
                  {copiedText === "dnf-install" ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="code-block">{`sudo dnf update
sudo dnf install gcc gcc-c++ make ncurses-devel ffmpeg zip bat xclip wl-clipboard ripgrep`}</div>
            </div>

            <div className="code-container">
              <div className="code-header">
                <span>Arch Linux Package Installer</span>
                <button
                  className="copy-btn"
                  onClick={() =>
                    handleCopy(
                      "sudo pacman -Sy && sudo pacman -S base-devel ncurses ffmpeg zip bat xclip wl-clipboard ripgrep",
                      "pacman-install",
                    )
                  }
                >
                  {copiedText === "pacman-install" ? (
                    <Check size={12} />
                  ) : (
                    <Copy size={12} />
                  )}
                  {copiedText === "pacman-install" ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="code-block">{`sudo pacman -Sy
sudo pacman -S base-devel ncurses ffmpeg zip bat xclip wl-clipboard ripgrep`}</div>
            </div>

            <div className="code-container">
              <div className="code-header">
                <span>Termux (Android) Package Installer</span>
                <button
                  className="copy-btn"
                  onClick={() =>
                    handleCopy(
                      "pkg update && pkg install clang cmake ndk-sysroot ncurses-utils ffmpeg zip bat ripgrep",
                      "termux-install",
                    )
                  }
                >
                  {copiedText === "termux-install" ? (
                    <Check size={12} />
                  ) : (
                    <Copy size={12} />
                  )}
                  {copiedText === "termux-install" ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="code-block">{`pkg update
pkg install clang cmake ndk-sysroot ncurses-utils ffmpeg zip bat ripgrep`}</div>
            </div>

            <h3>Package Descriptions:</h3>
            <ul>
              <li>
                <strong>libncursesw / ncurses-devel</strong>: Essential for
                wide-character terminal UI rendering.
              </li>
              <li>
                <strong>ffmpeg</strong>: Powers asynchronous thumbnail
                generation for images and videos.
              </li>
              <li>
                <strong>zip</strong>: Required for built-in archive creation.
              </li>
              <li>
                <strong>bat or batcat</strong>: Used for syntax-highlighted text
                previews.
              </li>
              <li>
                <strong>xclip / wl-copy / pbcopy</strong>: Used for system
                clipboard path copy feature.
              </li>
            </ul>

            <h2>⚙️ Installation &amp; Update</h2>
            <p>
              The easiest way to install or update Fyzenor is using the
              universal installation script.
            </p>

            <h3>One-Liner Install</h3>
            <div className="code-container">
              <div className="code-header">
                <span>Universal Script</span>
                <button
                  className="copy-btn"
                  onClick={() =>
                    handleCopy(
                      "curl -fsSL https://raw.githubusercontent.com/Bimbok/fyzenor/main/install.sh | bash",
                      "one-liner-script",
                    )
                  }
                >
                  {copiedText === "one-liner-script" ? (
                    <Check size={12} />
                  ) : (
                    <Copy size={12} />
                  )}
                  {copiedText === "one-liner-script" ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="code-block">{`curl -fsSL https://raw.githubusercontent.com/Bimbok/fyzenor/main/install.sh | bash`}</div>
            </div>

            <p>The installer does the following automatically:</p>
            <ol style={{ marginLeft: "1.5rem", marginBottom: "1.5rem" }}>
              <li>Compiles the C++ source into an optimized binary.</li>
              <li>
                Installs <code>fyzenor</code> into <code>/usr/local/bin/</code>.
              </li>
              <li>
                Creates an <code>fm</code> symlink for faster access.
              </li>
              <li>
                Installs the desktop application shortcut and branding icon
                globally.
              </li>
            </ol>

            <h3>Manual Compilation</h3>
            <p>
              If you prefer to build and run Fyzenor manually instead of using
              the installer:
            </p>
            <div className="code-container">
              <div className="code-header">
                <span>Build Commands</span>
                <button
                  className="copy-btn"
                  onClick={() =>
                    handleCopy(
                      "git clone https://github.com/Bimbok/fyzenor.git\ncd fyzenor\nmkdir -p build && cd build\ncmake ..\nmake\n./fyzenor",
                      "manual-compile-cmds",
                    )
                  }
                >
                  {copiedText === "manual-compile-cmds" ? (
                    <Check size={12} />
                  ) : (
                    <Copy size={12} />
                  )}
                  {copiedText === "manual-compile-cmds" ? "Copied!" : "Copy"}
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
            <p>
              Fyzenor requires a compiler with proper C++17 filesystem support.
            </p>
            <p>
              Older MinGW GCC versions (such as GCC 6.x) may fail during
              compilation with:
            </p>
            <div className="code-container">
              <div className="code-block">{`fatal error: filesystem: No such file or directory`}</div>
            </div>
            <p>Recommended environments for Windows users:</p>
            <ul>
              <li>MSYS2 MinGW-w64</li>
              <li>WSL (Windows Subsystem for Linux)</li>
            </ul>
            <p>
              Recommended compiler versions: <strong>GCC 8+</strong> or{" "}
              <strong>Clang 7+</strong>. Check yours using:
            </p>
            <div className="code-container">
              <div className="code-block">{`g++ --version`}</div>
            </div>

            <h2>🛠️ Tech Stack</h2>
            <ul>
              <li>
                <strong>Language</strong>: C++17
              </li>
              <li>
                <strong>UI Layer</strong>: <code>ncursesw</code>
              </li>
              <li>
                <strong>Concurrency</strong>: C++ standard threads with
                mutex-protected async workflows
              </li>
              <li>
                <strong>Filesystem</strong>: <code>std::filesystem</code>
              </li>
            </ul>
          </div>
        )}

        {activeTab === "keyboard" && (
          <div className="animate-fade-in">
            <h2>Interactive Keyboard Shortcut Guide</h2>
            <p>
              Click on any key below to inspect its detailed action and category
              within the Fyzenor interface:
            </p>

            {/* Virtual Keyboard */}
            <div className="keyboard-section">
              <div className="keyboard-grid scroll-custom">
                {/* Row 1 */}
                <div className="keyboard-row">
                  <div
                    className={`key-cap ${selectedKey === "Esc" ? "active" : ""}`}
                    onClick={() => setSelectedKey("Esc")}
                  >
                    Esc
                  </div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>
                    F1
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "F2" ? "active" : ""}`}
                    onClick={() => setSelectedKey("F2")}
                  >
                    F2
                  </div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>
                    F3
                  </div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>
                    F4
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "F5" ? "active" : ""}`}
                    onClick={() => setSelectedKey("F5")}
                  >
                    F5
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "Ctrl+R" ? "active" : ""}`}
                    onClick={() => setSelectedKey("Ctrl+R")}
                  >
                    Ctrl+R
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "Delete" ? "active" : ""}`}
                    onClick={() => setSelectedKey("Delete")}
                  >
                    Delete
                  </div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>
                    ...
                  </div>
                </div>
                {/* Row 2 */}
                <div className="keyboard-row">
                  <div className="key-cap" style={{ opacity: 0.3 }}>
                    `
                  </div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>
                    1
                  </div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>
                    2
                  </div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>
                    3
                  </div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>
                    4
                  </div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>
                    5
                  </div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>
                    6
                  </div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>
                    7
                  </div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>
                    8
                  </div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>
                    9
                  </div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>
                    0
                  </div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>
                    -
                  </div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>
                    =
                  </div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>
                    BS
                  </div>
                </div>
                {/* Row 3 */}
                <div className="keyboard-row">
                  <div
                    className={`key-cap spacer-tab ${selectedKey === "Tab" ? "active" : ""}`}
                    onClick={() => setSelectedKey("Tab")}
                  >
                    Tab
                  </div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>
                    q
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "w" ? "active" : ""}`}
                    onClick={() => setSelectedKey("w")}
                  >
                    w
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "e" ? "active" : ""}`}
                    onClick={() => setSelectedKey("e")}
                  >
                    e
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "r" ? "active" : ""}`}
                    onClick={() => setSelectedKey("r")}
                  >
                    r
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "t" ? "active" : ""}`}
                    onClick={() => setSelectedKey("t")}
                  >
                    t
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "y" ? "active" : ""}`}
                    onClick={() => setSelectedKey("y")}
                  >
                    y
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "u" ? "active" : ""}`}
                    onClick={() => setSelectedKey("u")}
                  >
                    u
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "i" ? "active" : ""}`}
                    onClick={() => setSelectedKey("i")}
                  >
                    i
                  </div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>
                    o
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "p" ? "active" : ""}`}
                    onClick={() => setSelectedKey("p")}
                  >
                    p
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "[" ? "active" : ""}`}
                    onClick={() => setSelectedKey("[")}
                  >
                    [
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "]" ? "active" : ""}`}
                    onClick={() => setSelectedKey("]")}
                  >
                    ]
                  </div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>
                    \
                  </div>
                </div>
                {/* Row 4 */}
                <div className="keyboard-row">
                  <div className="key-cap spacer-ctrl" style={{ opacity: 0.3 }}>
                    Ctrl
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "a" ? "active" : ""}`}
                    onClick={() => setSelectedKey("a")}
                  >
                    a
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "s" ? "active" : ""}`}
                    onClick={() => setSelectedKey("s")}
                  >
                    s
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "d" ? "active" : ""}`}
                    onClick={() => setSelectedKey("d")}
                  >
                    d
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "f" ? "active" : ""}`}
                    onClick={() => setSelectedKey("f")}
                  >
                    f
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "g" ? "active" : ""}`}
                    onClick={() => setSelectedKey("g")}
                  >
                    g
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "h" ? "active" : ""}`}
                    onClick={() => setSelectedKey("h")}
                  >
                    h
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "j" ? "active" : ""}`}
                    onClick={() => setSelectedKey("j")}
                  >
                    j
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "k" ? "active" : ""}`}
                    onClick={() => setSelectedKey("k")}
                  >
                    k
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "l" ? "active" : ""}`}
                    onClick={() => setSelectedKey("l")}
                  >
                    l
                  </div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>
                    ;
                  </div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>
                    '
                  </div>
                  <div
                    className="key-cap spacer-enter"
                    style={{ opacity: 0.3 }}
                  >
                    Enter
                  </div>
                </div>
                {/* Row 5 */}
                <div className="keyboard-row">
                  <div
                    className={`key-cap spacer-shift ${selectedKey === "D" ? "active" : ""}`}
                    onClick={() => setSelectedKey("D")}
                  >
                    Shift+D
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "z" ? "active" : ""}`}
                    onClick={() => setSelectedKey("z")}
                  >
                    z
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "x" ? "active" : ""}`}
                    onClick={() => setSelectedKey("x")}
                  >
                    x
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "c" ? "active" : ""}`}
                    onClick={() => setSelectedKey("c")}
                  >
                    c
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "v" ? "active" : ""}`}
                    onClick={() => setSelectedKey("v")}
                  >
                    v
                  </div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>
                    b
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "n" ? "active" : ""}`}
                    onClick={() => setSelectedKey("n")}
                  >
                    n
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "m" ? "active" : ""}`}
                    onClick={() => setSelectedKey("m")}
                  >
                    m
                  </div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>
                    ,
                  </div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>
                    .
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "/" ? "active" : ""}`}
                    onClick={() => setSelectedKey("/")}
                  >
                    /
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "?" ? "active" : ""}`}
                    onClick={() => setSelectedKey("?")}
                  >
                    ?
                  </div>
                  <div
                    className={`key-cap ${selectedKey === ":" ? "active" : ""}`}
                    onClick={() => setSelectedKey(":")}
                  >
                    :
                  </div>
                </div>
                {/* Row 6 */}
                <div className="keyboard-row">
                  <div className="key-cap spacer-ctrl" style={{ opacity: 0.3 }}>
                    Ctrl
                  </div>
                  <div className="key-cap" style={{ opacity: 0.3 }}>
                    Alt
                  </div>
                  <div
                    className={`key-cap spacer-space ${selectedKey === "Space" ? "active" : ""}`}
                    onClick={() => setSelectedKey("Space")}
                  >
                    Space
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "u" ? "active" : ""}`}
                    onClick={() => setSelectedKey("u")}
                  >
                    u
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "T" ? "active" : ""}`}
                    onClick={() => setSelectedKey("T")}
                  >
                    T
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "Y" ? "active" : ""}`}
                    onClick={() => setSelectedKey("Y")}
                  >
                    Y
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "W" ? "active" : ""}`}
                    onClick={() => setSelectedKey("W")}
                  >
                    W
                  </div>
                  <div
                    className={`key-cap ${selectedKey === "Ctrl+W" ? "active" : ""}`}
                    onClick={() => setSelectedKey("Ctrl+W")}
                  >
                    Ctrl+W
                  </div>
                </div>
              </div>

              {/* Key Details Display Box */}
              <div
                className="key-details-box animate-fade-in"
                key={selectedKey}
              >
                <div className="key-details-key">
                  {selectedKey === "Space" ? "␣" : selectedKey}
                </div>
                <div>
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "1.1rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    {keyMap[selectedKey]?.title || "Key Option"}
                    <span
                      style={{
                        fontSize: "0.75rem",
                        marginLeft: "0.75rem",
                        verticalAlign: "middle",
                      }}
                      className="badge badge-purple"
                    >
                      {keyMap[selectedKey]?.category || "General"}
                    </span>
                  </h4>
                  <p
                    style={{
                      margin: "0.25rem 0 0",
                      fontSize: "0.95rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {keyMap[selectedKey]?.desc ||
                      "Select a key above to view descriptions of its active binding inside Fyzenor."}
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
                  {Object.entries(keyMap)
                    .filter(([_, v]) => v.category === "Navigation")
                    .map(([k, item]) => (
                      <tr
                        key={k}
                        style={{ cursor: "pointer" }}
                        onClick={() => setSelectedKey(k)}
                      >
                        <td>
                          <code style={{ color: "var(--accent-cyan)" }}>
                            {k}
                          </code>
                        </td>
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
                  {Object.entries(keyMap)
                    .filter(
                      ([_, v]) =>
                        v.category === "File Operations" ||
                        v.category === "Operations",
                    )
                    .map(([k, item]) => (
                      <tr
                        key={k}
                        style={{ cursor: "pointer" }}
                        onClick={() => setSelectedKey(k)}
                      >
                        <td>
                          <code style={{ color: "var(--accent-cyan)" }}>
                            {k}
                          </code>
                        </td>
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
                  {Object.entries(keyMap)
                    .filter(([_, v]) => v.category === "Selection")
                    .map(([k, item]) => (
                      <tr
                        key={k}
                        style={{ cursor: "pointer" }}
                        onClick={() => setSelectedKey(k)}
                      >
                        <td>
                          <code style={{ color: "var(--accent-cyan)" }}>
                            {k}
                          </code>
                        </td>
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
                  {Object.entries(keyMap)
                    .filter(([_, v]) => v.category === "View")
                    .map(([k, item]) => (
                      <tr
                        key={k}
                        style={{ cursor: "pointer" }}
                        onClick={() => setSelectedKey(k)}
                      >
                        <td>
                          <code style={{ color: "var(--accent-cyan)" }}>
                            {k}
                          </code>
                        </td>
                        <td>{item.desc}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <h3>5. Tab Controls</h3>
            <div className="table-container">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Shortcut</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(keyMap)
                    .filter(([_, v]) => v.category === "Tabs")
                    .map(([k, item]) => (
                      <tr
                        key={k}
                        style={{ cursor: "pointer" }}
                        onClick={() => setSelectedKey(k)}
                      >
                        <td>
                          <code style={{ color: "var(--accent-cyan)" }}>
                            {k}
                          </code>
                        </td>
                        <td>{item.desc}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <h3>6. General Help</h3>
            <div className="table-container">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Shortcut</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(keyMap)
                    .filter(([_, v]) => v.category === "General")
                    .map(([k, item]) => (
                      <tr
                        key={k}
                        style={{ cursor: "pointer" }}
                        onClick={() => setSelectedKey(k)}
                      >
                        <td>
                          <code style={{ color: "var(--accent-cyan)" }}>
                            {k}
                          </code>
                        </td>
                        <td>{item.desc}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "trash" && (
          <div className="animate-fade-in">
            <h2>Compliance-Tested Multi-Partition Trash System</h2>
            <p>
              In compliance with the Freedesktop.org Desktop Trash Can
              Specification, Fyzenor v4.2.0 uses a highly optimized, local
              partition trash system to avoid slow byte-copying across drives.
              <strong> All trashing operations are offloaded to background AsyncTask worker threads</strong>. This prevents long TUI redraw freezes or input latency during large bulk operations (e.g. <code>Select All</code> to <code>Delete</code>). Trashing tasks can be monitored, paused, resumed, or cancelled live inside the task overlay (<code>w</code>).
            </p>

            <div className="card-grid">
              <div className="card-premium">
                <div
                  style={{
                    color: "var(--accent-green)",
                    fontWeight: 800,
                    fontSize: "1.25rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  1. Home Drive Folder
                </div>
                <p>
                  When trashing items on your primary OS partition, Fyzenor
                  moves files instantly to your home directory:{" "}
                  <code>~/.local/share/Trash/files/</code>. Associated deletion
                  metadata logs are saved under{" "}
                  <code>~/.local/share/Trash/info/[file].trashinfo</code>.
                </p>
              </div>
              <div className="card-premium">
                <div
                  style={{
                    color: "var(--accent-purple)",
                    fontWeight: 800,
                    fontSize: "1.25rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  2. Partition-Local folders
                </div>
                <p>
                  To prevent slow cross-device operations when trashing on
                  external drives (like USB sticks or mounted SSD partitions),
                  Fyzenor creates local trash folders:{" "}
                  <code>&lt;mount_root&gt;/.Trash-&lt;uid&gt;/files/</code>.
                  This utilizes constant time{" "}
                  <code>std::filesystem::rename</code>.
                </p>
              </div>
              <div className="card-premium">
                <div
                  style={{
                    color: "var(--accent-orange)",
                    fontWeight: 800,
                    fontSize: "1.25rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  3. External Fallbacks
                </div>
                <p>
                  On FAT, NTFS, or read-only filesystems that do not support
                  standard UNIX folder permission sets, local trash cannot be
                  initialized. Fyzenor handles this state gracefully and
                  prompts:{" "}
                  <code>"Trash not supported. Delete permanently? (y/n)"</code>.
                </p>
              </div>
            </div>

            <h2>Trash Manager Overlay (<code>T</code>)</h2>
            <p>
              Toggling <kbd>T</kbd> displays the aggregate Trash view. The
              manager performs several specific commands in the background:
            </p>
            <ul>
              <li>
                <strong>Scan Bins</strong>: Collects deleted items from the home
                folder and all mounted devices.
              </li>
              <li>
                <strong>Metadata Parsing</strong>: Resolves the original paths,
                filenames, and deletion dates from the associated{" "}
                <code>.trashinfo</code> files.
              </li>
              <li>
                <strong>Empty Trash (<code>e</code>)</strong>: Purges all files and
                metadata logs from all detected partition trash folders
                asynchronously in the background.
              </li>
              <li>
                <strong>Restore Item (<code>r</code>)</strong>: Moves files from the trash
                back to their original recorded locations. If a folder in the
                original path is missing, Fyzenor creates it dynamically. If a
                conflict occurs, it appends a <code>_restored</code> suffix to
                avoid data overwrite.
              </li>
            </ul>

            <h2>Trash Info File Specification</h2>
            <p>
              Fyzenor writes standard metadata logs that can be read by other
              Linux file managers (like Nautilus or Thunar):
            </p>
            <div className="code-container">
              <div className="code-header">
                <span>sample.trashinfo</span>
              </div>
              <div className="code-block">{`[Trash Info]
Path=/home/bimbok/shared/important_docs/invoice.pdf
DeletionDate=2026-07-05T20:14:05`}</div>
            </div>

            <h2 style={{ marginTop: "2.5rem" }}>Visual Permissions &amp; Ownership Editor (<code>I</code>)</h2>
            <p>
              In Fyzenor, you can inspect and modify file metadata directly from the TUI interface. By highlighting a file and pressing <kbd>I</kbd> (Shift+i), you open the <strong>Permissions &amp; Ownership Editor</strong> overlay, bypassing the need to suspend the TUI and execute shell commands manually.
            </p>
            <h3>Interactive Permission Matrix</h3>
            <p>
              The editor renders a 3x3 checkbox grid representing Unix permissions for the Owner, Group, and Others across Read, Write, and Execute bits:
            </p>
            <ul>
              <li><strong>Navigation</strong>: Use standard Vim keys (<code>h</code>/<code>j</code>/<code>k</code>/<code>l</code>) or the arrow keys to focus on checkboxes.</li>
              <li><strong>Toggling</strong>: Press <code>Space</code> or <code>Enter</code> to check or uncheck individual permission bits.</li>
              <li><strong>Applying Changes</strong>: Upon clicking <code>[ SAVE ]</code>, Fyzenor instantly calls <code>std::filesystem::permissions</code> to replace the old permission flags.</li>
            </ul>
            <h3>Ownership Modifications (chmod / chown)</h3>
            <p>
              You can also change the file's Owner and Group fields. Navigating to the Owner or Group rows and pressing <code>Enter</code> will prompt you to type the new user/group name or ID. When saving, Fyzenor uses the POSIX <code>chown</code> API to update the file ownership. If the application is running without sufficient privileges to change ownership, it displays a friendly <code>"Permission denied (run as root)"</code> status message rather than crashing.
            </p>
          </div>
        )}

        {activeTab === "dragdrop" && (
          <div className="animate-fade-in">
            <h2>Seamless GUI &amp; Terminal Drag-and-Drop Integration</h2>
            <p>
              Fyzenor bridges the gap between text-based terminals and graphical desktop environments. 
              You can drag files directly from your desktop into Fyzenor, or drag highlighted items out 
              of the terminal into external web browsers (e.g., Discord, GitHub, Gmail) or folder windows.
            </p>

            <div className="card-grid">
              <div className="card-premium">
                <div
                  style={{
                    color: "var(--accent-cyan)",
                    fontWeight: 800,
                    fontSize: "1.25rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  📥 1. Dropping Files INTO Fyzenor
                </div>
                <p>
                  Quickly transfer files from external desktop folders directly into your active terminal directory:
                </p>
                <ol style={{ paddingLeft: "1.2rem", margin: "0.5rem 0" }}>
                  <li>Open Fyzenor and navigate to the target directory.</li>
                  <li>Drag any file or folder from your GUI file manager (Nautilus, Dolphin, Finder, Desktop, etc.).</li>
                  <li>Drop the items anywhere onto the terminal window running Fyzenor.</li>
                  <li>An overlay dialog will immediately prompt you:
                    <ul style={{ paddingLeft: "1rem", marginTop: "0.25rem" }}>
                      <li>Press <kbd>c</kbd> to <strong>Copy</strong> the files here.</li>
                      <li>Press <kbd>m</kbd> to <strong>Move</strong> the files here.</li>
                      <li>Press <kbd>Esc</kbd> to <strong>Cancel</strong>.</li>
                    </ul>
                  </li>
                </ol>
                <p style={{ fontSize: "0.85rem", opacity: 0.8, marginTop: "0.5rem" }}>
                  💡 <strong>How it works:</strong> Fyzenor leverages <em>Bracketed Paste Mode</em> (ANSI escapes) to intercept files, URL-decodes percent encodings (converting <code>%20</code> back to spaces), tokenizes the file list, and triggers background AsyncTask jobs.
                </p>
              </div>

              <div className="card-premium">
                <div
                  style={{
                    color: "var(--accent-purple)",
                    fontWeight: 800,
                    fontSize: "1.25rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  📤 2. Dragging Files OUT of Fyzenor
                </div>
                <p>
                  Drag files out of your terminal list directly into browsers, chat clients, or GUI editors:
                </p>
                <ol style={{ paddingLeft: "1.2rem", margin: "0.5rem 0" }}>
                  <li>Highlight a file (or select multiple using <kbd>Space</kbd> or <kbd>v</kbd>).</li>
                  <li>Press <kbd>Ctrl+D</kbd> on your keyboard.</li>
                  <li>A tiny, floating drop-zone widget window will immediately pop up at your mouse cursor.</li>
                  <li>Click and hold this floating widget, drag it over to another app (e.g., Discord chat, Slack, a web browser uploader, or a GUI folder), and drop it.</li>
                  <li>The widget window automatically closes upon a successful drop.</li>
                </ol>
                <p style={{ fontSize: "0.85rem", opacity: 0.8, marginTop: "0.5rem" }}>
                  💡 <strong>How it works:</strong> Spawns a lightweight drag source utility asynchronously. The background job is completely decoupled from the TUI main loop, guaranteeing a fluid, freeze-free cursor response.
                </p>
              </div>
            </div>

            <h2 style={{ marginTop: "2.5rem" }}>🛠️ Installing Drag &amp; Drop Dependencies</h2>
            <p>
              To support dragging files <strong>out</strong> of the terminal, you must install one of the supported drag-and-drop helper utilities on your system path. We recommend <strong><code>ripdrag</code></strong> (modern Rust rewrite) or <strong><code>dragon</code></strong> (classic GTK3 version).
            </p>

            <div style={{ marginTop: "1rem" }}>
              <h3>Option A: `ripdrag` (Recommended - Rust)</h3>
              <p>Install via your package manager or Rust Cargo:</p>
              <pre className="code-block" style={{ position: "relative" }}>
                <code>
{`# Cargo (Works on any Linux/macOS distro)
cargo install ripdrag

# Arch Linux
yay -S ripdrag

# Fedora
sudo dnf install ripdrag`}
                </code>
              </pre>
            </div>

            <div style={{ marginTop: "1.5rem" }}>
              <h3>Option B: `dragon` (Alternative - GTK3)</h3>
              <p>Install via your package manager:</p>
              <pre className="code-block" style={{ position: "relative" }}>
                <code>
{`# Debian / Ubuntu
sudo apt install dragon-drag-and-drop

# Arch Linux
yay -S dragon-drag-and-drop-git

# Fedora
sudo dnf install dragon`}
                </code>
              </pre>
            </div>
          </div>
        )}

        {activeTab === "git" && (
          <div className="animate-fade-in">
            <h2>Native Git &amp; Lazygit Integration</h2>
            <p>
              Fyzenor includes built-in support for launching <strong>Lazygit</strong> (a popular, interactive Git TUI written in Go) directly inside your current directory. It is designed to provide a fluid, seamless Git workflow without leaving your file manager interface.
            </p>

            <div className="card-grid">
              <div className="card-premium">
                <div
                  style={{
                    color: "var(--accent-green)",
                    fontWeight: 800,
                    fontSize: "1.25rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  ⚡ Centered Tmux Popup Overlay
                </div>
                <p>
                  If Fyzenor is running inside an active <code>tmux</code> session, launching Lazygit uses <code>tmux display-popup</code> to create a floating overlay window:
                </p>
                <ul style={{ paddingLeft: "1.2rem", margin: "0.5rem 0" }}>
                  <li>It renders as a centered, double-bordered popup modal inside the terminal screen.</li>
                  <li>It has a configured size of <strong>85% width and height</strong>, leaving a gorgeous, desktop-like padding gap around it.</li>
                  <li>When you exit Lazygit (by pressing <kbd>q</kbd>), the popup window closes instantly, returning keyboard focus to Fyzenor cleanly.</li>
                </ul>
              </div>

              <div className="card-premium">
                <div
                  style={{
                    color: "var(--accent-purple)",
                    fontWeight: 800,
                    fontSize: "1.25rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  🖥️ Full-Screen Console Fallback
                </div>
                <p>
                  When running outside of a tmux session:
                </p>
                <ul style={{ paddingLeft: "1.2rem", margin: "0.5rem 0" }}>
                  <li>Fyzenor safely suspends its ncurses terminal state (restoring your shell terminal).</li>
                  <li>It launches Lazygit in full-screen mode, allowing it to claim full console input and draw correctly at coordinate <code>0,0</code>.</li>
                  <li>Once Lazygit exits, Fyzenor instantly resumes, restoring your layout state perfectly.</li>
                </ul>
              </div>
            </div>

            <h2 style={{ marginTop: "2.5rem" }}>⌨️ Launching and Auto-Reload</h2>
            <div className="alert-info-box" style={{ marginBottom: "1rem" }}>
              <Info size={20} style={{ flexShrink: 0 }} />
              <div>
                <strong>How to Launch:</strong> Press <kbd>Ctrl+G</kbd> in normal mode.
              </div>
            </div>
            <p>
              Upon exit, Fyzenor triggers an automatic <strong>full cache invalidation and reload</strong> (<code>reloadAll()</code>). Any Git commits, branch checkouts, resets, or file additions performed inside Lazygit reflect instantly in the browser list panels without needing to press manual refresh.
            </p>

            <h2 style={{ marginTop: "2.5rem" }}>🛠️ Installing Lazygit</h2>
            <p>
              To support this integration, ensure <code>lazygit</code> is installed and available in your system <code>PATH</code>:
            </p>
            <pre className="code-block" style={{ position: "relative" }}>
              <code>
{`# Debian / Ubuntu
sudo add-apt-repository ppa:lazygit-team/release
sudo apt update
sudo apt install lazygit

# Fedora / CentOS
sudo dnf copr enable atim/lazygit -y
sudo dnf install lazygit -y

# Arch Linux
yay -S lazygit

# macOS (Homebrew)
brew install lazygit`}
              </code>
            </pre>
          </div>
        )}

        {activeTab === "tasks" && (
          <div className="animate-fade-in">
            <h2>Asynchronous Task Manager (<code>w</code>)</h2>
            <p>
              Fyzenor offloads heavy operations (like copying, compression, and
              extraction) to background worker threads. Pressing <kbd>w</kbd>{" "}
              displays these tasks in the <strong>Active Tasks &amp; Workers</strong> window,
              where you can pause, resume, or cancel them:
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
                    <td>
                      <strong>Copy &amp; Move</strong>
                    </td>
                    <td>C++ background thread loop</td>
                    <td>
                      Suspends block iteration via condition variables (0% CPU).
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Zip &amp; Extract</strong>
                    </td>
                    <td>
                      External subprocesses (<code>zip</code>, <code>tar</code>)
                    </td>
                    <td>
                      Sends POSIX signals <code>SIGSTOP</code> and{" "}
                      <code>SIGCONT</code> to the process PID.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Deletion</strong>
                    </td>
                    <td>
                      C++ <code>std::filesystem::remove_all</code> loop
                    </td>
                    <td>Suspends folder iteration loops between items.</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Trash</strong>
                    </td>
                    <td>C++ background thread loop (calls <code>gio trash</code> or partition local Move)</td>
                    <td>Suspends folder iteration loops between items.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Smart Copy Resumption (Delta Overwrite)</h2>
            <p>
              If a copying or moving task is paused or cancelled, the incomplete
              file remains at the destination. When pasting the items again and
              selecting <strong><code>[r]eplace</code></strong>:
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                margin: "1.5rem 0",
              }}
            >
              <div
                className="card-premium"
                style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "var(--accent-green-glow)",
                    color: "var(--accent-green)",
                    flexShrink: 0,
                    fontWeight: 700,
                  }}
                >
                  1
                </div>
                <div>
                  <h4>Pre-Copy Size Analysis</h4>
                  <p style={{ margin: 0 }}>
                    Fyzenor inspects the file size of the existing destination
                    file and compares it to the source file size.
                  </p>
                </div>
              </div>

              <div
                className="card-premium"
                style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "var(--accent-purple-glow)",
                    color: "var(--accent-purple)",
                    flexShrink: 0,
                    fontWeight: 700,
                  }}
                >
                  2
                </div>
                <div>
                  <h4>Exact Skipping</h4>
                  <p style={{ margin: 0 }}>
                    If the sizes match exactly, the copy is skipped instantly to
                    avoid redundant writes.
                  </p>
                </div>
              </div>

              <div
                className="card-premium"
                style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(6, 182, 212, 0.1)",
                    color: "var(--accent-cyan)",
                    flexShrink: 0,
                    fontWeight: 700,
                  }}
                >
                  3
                </div>
                <div>
                  <h4>Block-Level Seeking &amp; Append</h4>
                  <p style={{ margin: 0 }}>
                    If the destination is smaller, Fyzenor opens it in
                    read/write mode, seeks to the offset matching the existing
                    bytes, seeks to the same position in the source, and appends
                    only the remaining bytes. Symlinks are automatically
                    replaced to prevent overwriting targets.
                  </p>
                </div>
              </div>
            </div>

            <h2 style={{ marginTop: "2.5rem" }}>Live Task Throughput &amp; History Log Panel</h2>
            <p>
              In Fyzenor v4.2.0, the Task Manager overlay (accessible via <kbd>w</kbd>) includes detailed timing, speed metrics, and a historical completion log panel.
            </p>
            <h3>1. Active Task Metrics &amp; Speed Tracking</h3>
            <p>
              When running active copy or move operations, Fyzenor tracks transfer rates dynamically:
            </p>
            <ul>
              <li><strong>Elapsed Time Tracker</strong>: Measures the exact task execution duration in seconds (e.g. <code>[12s]</code>) starting from task initiation.</li>
              <li><strong>Live Throughput Speed</strong>: Calculates data transfer speed dynamically in Megabytes per second (e.g. <code>(45.2 MB/s)</code>) by dividing bytes copied by elapsed time.</li>
              <li><strong>Time to Finish (ETA)</strong>: Calculates the estimated remaining execution duration based on total file size, bytes processed, and transfer rates (e.g. <code>ETA: 1m 24s</code>).</li>
            </ul>
            <h3>2. Completed Tasks History Log Panel</h3>
            <p>
              When background threads or subprocesses finish executing, they write their exit statuses and details into a persistent in-memory log list:
            </p>
            <ul>
              <li><strong>Detailed Logs</strong>: Records the operation type, task description, and result (e.g., <code>[Copy] Copying file.txt to dest - Finished (pasted 1 items)</code> or <code>[Delete] Deleting folder - Cancelled</code>).</li>
              <li><strong>Split-Pane TUI Layout</strong>: The task manager overlay is split into two panels, with active queues at the top and the last few completed logs at the bottom.</li>
              <li><strong>Log Clearing</strong>: Pressing <kbd>c</kbd> inside the task overlay cleans up finished background threads and clears all logged entries in the history panel.</li>
            </ul>
          </div>
        )}

        {activeTab === "architecture" && (
          <div className="animate-fade-in">
            <h2>Asynchronous Project Architecture</h2>
            <p>
              Fyzenor is structured as a compact terminal application with
              asynchronous jobs handling the expensive operations that would
              otherwise block UI updates.
            </p>
            <h3>How It Works</h3>
            <ol style={{ marginLeft: "1.5rem", marginBottom: "1.5rem" }}>
              <li>
                <strong>Navigation State:</strong> Tracks the current directory,
                parent context, selected entry, pins, and multi-selection state.
              </li>
              <li>
                <strong>Async Preview Pipeline:</strong> Generates media
                previews and text previews without freezing the navigation loop.
              </li>
              <li>
                <strong>Background Size Calculation:</strong> Directory sizes
                are resolved in the background and merged back into the UI.
              </li>
              <li>
                <strong>Command Handling:</strong> Keybindings trigger file
                operations, pin management, sorting, preview refresh, and shell
                integration behavior.
              </li>
            </ol>

            {/* Thread Architecture Diagram */}
            <div
              style={{
                backgroundColor: "var(--bg-terminal)",
                border: "1px solid var(--border-color)",
                borderRadius: "12px",
                padding: "2rem",
                margin: "2rem 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "var(--shadow-premium)",
              }}
            >
              <h3 style={{ marginTop: 0, color: "var(--accent-green)" }}>
                TUI &amp; Worker Lifecycle Diagram
              </h3>

              <svg
                width="100%"
                height="340"
                viewBox="0 0 600 340"
                style={{ maxWidth: "600px" }}
              >
                {/* Main event loop */}
                <rect
                  x="220"
                  y="20"
                  width="160"
                  height="50"
                  rx="8"
                  fill="var(--accent-green-glow)"
                  stroke="var(--accent-green)"
                  strokeWidth="2"
                />
                <text
                  x="300"
                  y="50"
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="12"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  Main event loop (TUI)
                </text>

                {/* Worker threads */}
                <rect
                  x="20"
                  y="160"
                  width="140"
                  height="50"
                  rx="8"
                  fill="rgba(6, 182, 212, 0.1)"
                  stroke="var(--accent-cyan)"
                  strokeWidth="2"
                />
                <text
                  x="90"
                  y="190"
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="11"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  Async Size Worker
                </text>

                <rect
                  x="180"
                  y="160"
                  width="140"
                  height="50"
                  rx="8"
                  fill="rgba(139, 92, 246, 0.1)"
                  stroke="var(--accent-purple)"
                  strokeWidth="2"
                />
                <text
                  x="250"
                  y="190"
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="11"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  Inotify Watcher Loop
                </text>

                <rect
                  x="340"
                  y="160"
                  width="140"
                  height="50"
                  rx="8"
                  fill="rgba(249, 115, 22, 0.1)"
                  stroke="var(--accent-orange)"
                  strokeWidth="2"
                />
                <text
                  x="410"
                  y="190"
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="11"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  Async Preview Worker
                </text>

                <rect
                  x="470"
                  y="270"
                  width="120"
                  height="50"
                  rx="8"
                  fill="rgba(239, 68, 68, 0.1)"
                  stroke="var(--accent-red)"
                  strokeWidth="2"
                />
                <text
                  x="530"
                  y="300"
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="11"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  Background Task
                </text>

                {/* Arrows */}
                <line
                  x1="300"
                  y1="70"
                  x2="300"
                  y2="120"
                  stroke="var(--text-muted)"
                  strokeWidth="2"
                  markerEnd="url(#arrow)"
                />
                <line
                  x1="300"
                  y1="120"
                  x2="90"
                  y2="120"
                  stroke="var(--text-muted)"
                  strokeWidth="2"
                />
                <line
                  x1="90"
                  y1="120"
                  x2="90"
                  y2="150"
                  stroke="var(--text-muted)"
                  strokeWidth="2"
                  markerEnd="url(#arrow)"
                />

                <line
                  x1="300"
                  y1="120"
                  x2="250"
                  y2="120"
                  stroke="var(--text-muted)"
                  strokeWidth="2"
                />
                <line
                  x1="250"
                  y1="120"
                  x2="250"
                  y2="150"
                  stroke="var(--text-muted)"
                  strokeWidth="2"
                  markerEnd="url(#arrow)"
                />

                <line
                  x1="300"
                  y1="120"
                  x2="410"
                  y2="120"
                  stroke="var(--text-muted)"
                  strokeWidth="2"
                />
                <line
                  x1="410"
                  y1="120"
                  x2="410"
                  y2="150"
                  stroke="var(--text-muted)"
                  strokeWidth="2"
                  markerEnd="url(#arrow)"
                />

                <line
                  x1="300"
                  y1="70"
                  x2="530"
                  y2="70"
                  stroke="var(--accent-red)"
                  strokeWidth="2"
                  strokeDasharray="4"
                />
                <line
                  x1="530"
                  y1="70"
                  x2="530"
                  y2="260"
                  stroke="var(--accent-red)"
                  strokeWidth="2"
                  strokeDasharray="4"
                  markerEnd="url(#arrow)"
                />

                <defs>
                  <marker
                    id="arrow"
                    viewBox="0 0 10 10"
                    refX="5"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--text-muted)" />
                  </marker>
                </defs>
              </svg>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                Dotted lines represent dynamically spawned background tasks
                (Copy, Zip, Delete). Solid lines represent persistent worker
                loops.
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

        {activeTab === "theming" && (
          <div className="animate-fade-in">
            <h2>⚙️ Configuration (`config.toml`)</h2>
            <p>
              Fyzenor loads its general settings, layout configurations, panel sizes, pane visibility rules, Nerd Font icon glyphs, and file extension categories from an external TOML file at: <code>~/.config/fyzenor/config.toml</code>.
            </p>

            <div className="code-container" style={{ marginBottom: "2rem" }}>
              <div className="code-header">
                <span>~/.config/fyzenor/config.toml</span>
                <button
                  className="copy-btn"
                  onClick={() =>
                    handleCopy(
                      `[general]\nshow_hidden = false\nsort_mode = "name"\n\n[layout]\nparent_width = 0.18\ncurrent_width = 0.32\nhide_preview = false\nhide_parent = false\n\n[icons]\ndir = " "\nvideo = " "\nimage = " "\ncore = " "\nfrontend = "󰖟 "\nconfig = " "\nscript = " "\ndocs = " "\nfont = " "\nfile = " "\nmusic = " "\npin = " "\nzip = "󰿺 "\nlink = "󰌹 "\n\n[categories]\nvideo = [".mp4", ".mkv", ".avi", ".mov", ".flv", ".wmv", ".webm", ".m4v", ".mpg", ".mpeg"]\nimage = [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp", ".svg", ".tiff", ".ico", ".psd", ".ai"]\nfrontend = [".js", ".jsx", ".ts", ".tsx", ".css", ".scss", ".sass", ".less", ".styl", ".vue", ".html", ".svelte", ".htm", ".astro", ".mjx", ".dart", ".swift"]\nscripts = [".sh", ".bash", ".zsh", ".fish", ".ksh", ".command", ".pl", ".pm", ".t", ".awk", ".ps1", ".psm1", ".bat", ".cmd", ".vbs", ".wsf"]\nconfig = [".json", ".json5", ".jsonc", ".xml", ".xsd", ".xsl", ".gpx", ".yaml", ".yml", ".toml", ".ini", ".conf", ".cfg", ".prefs", ".properties", ".lock", ".env", ".dockerfile", ".gitignore", ".gitconfig", ".gitattributes", ".gitmodules"]\ndocumentation = [".md", ".markdown", ".txt", ".text", ".log", ".pdf", ".doc", ".docx", ".odt", ".rtf", ".ppt", ".pptx", ".odp", ".xls", ".xlsx", ".ods", ".csv"]\ncore = [".py", ".pyw", ".ipynb", ".pyc", ".pyd", ".rb", ".ru", ".gemspec", ".php", ".cpp", ".cxx", ".cc", ".hpp", ".hxx", ".ixx", ".c", ".h", ".rs", ".java", ".class", ".jar", ".war", ".go", ".lua", ".sql", ".db", ".sqlite", ".sqlite3", ".db3", ".mdb", ".accdb", ".cmake", ".make", ".diff", ".patch", ".kt", ".kts", ".cs", ".csx", ".scala", ".sc", ".hs", ".lhs", ".clj", ".cljs", ".cljc", ".edn", ".r", ".rmd", ".jl", ".fs", ".fsi", ".fsx"]\nfont = [".woff", ".woff2", ".ttf", ".eot", ".otf"]\naudio = [".mp3", ".wav", ".flac", ".m4a", ".aac", ".ogg", ".wma", ".opus", ".mid", ".midi"]\narchive = [".zip", ".tar", ".gz", ".tgz", ".7z", ".rar", ".xz", ".bz2", ".tbz2", ".lzma", ".cab"]`,
                      "toml-vars-sample",
                    )
                  }
                >
                  {copiedText === "toml-vars-sample" ? (
                    <Check size={12} />
                  ) : (
                    <Copy size={12} />
                  )}
                  {copiedText === "toml-vars-sample" ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="code-block">{`[general]
# Show hidden files by default on startup
show_hidden = false

# Default sorting mode: "name", "size" (descending), or "date" (descending)
sort_mode = "name"

[layout]
# Proportional width of the left parent/pinned column in normal mode (ratio 0.0 to 1.0)
parent_width = 0.18

# Proportional width of the central files list column in normal mode
current_width = 0.32

# Set to true to hide the rightmost file preview pane by default (toggleable via F3)
hide_preview = false

# Set to true to hide the parent directory pane by default (toggleable via F4)
hide_parent = false

# Set to true to hide the pinned bookmarks pane by default (toggleable via F6)
hide_pinned = false

[icons]
# Glyph icons used for different file categories and states (Nerd Fonts required)
dir = " "
video = " "
image = " "
core = " "
frontend = "󰖟 "
config = " "
script = " "
docs = " "
font = " "
file = " "
music = " "
pin = " "
zip = "󰿺 "
link = "󰌹 "

[categories]
# Associate file extensions with styling and behavior groups
video = [".mp4", ".mkv", ".avi", ".mov", ".flv", ".wmv", ".webm", ".m4v", ".mpg", ".mpeg"]
image = [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp", ".svg", ".tiff", ".ico", ".psd", ".ai"]
frontend = [".js", ".jsx", ".ts", ".tsx", ".css", ".scss", ".sass", ".less", ".styl", ".vue", ".html", ".svelte", ".htm", ".astro", ".mjx", ".dart", ".swift"]
scripts = [".sh", ".bash", ".zsh", ".fish", ".ksh", ".command", ".pl", ".pm", ".t", ".awk", ".ps1", ".psm1", ".bat", ".cmd", ".vbs", ".wsf"]
config = [".json", ".json5", ".jsonc", ".xml", ".xsd", ".xsl", ".gpx", ".yaml", ".yml", ".toml", ".ini", ".conf", ".cfg", ".prefs", ".properties", ".lock", ".env", ".dockerfile", ".gitignore", ".gitconfig", ".gitattributes", ".gitmodules"]
documentation = [".md", ".markdown", ".txt", ".text", ".log", ".pdf", ".doc", ".docx", ".odt", ".rtf", ".ppt", ".pptx", ".odp", ".xls", ".xlsx", ".ods", ".csv"]
core = [".py", ".pyw", ".ipynb", ".pyc", ".pyd", ".rb", ".ru", ".gemspec", ".php", ".cpp", ".cxx", ".cc", ".hpp", ".hxx", ".ixx", ".c", ".h", ".rs", ".java", ".class", ".jar", ".war", ".go", ".lua", ".sql", ".db", ".sqlite", ".sqlite3", ".db3", ".mdb", ".accdb", ".cmake", ".make", ".diff", ".patch", ".kt", ".kts", ".cs", ".csx", ".scala", ".sc", ".hs", ".lhs", ".clj", ".cljs", ".cljc", ".edn", ".r", ".rmd", ".jl", ".fs", ".fsi", ".fsx"]
font = [".woff", ".woff2", ".ttf", ".eot", ".otf"]
audio = [".mp3", ".wav", ".flac", ".m4a", ".aac", ".ogg", ".wma", ".opus", ".mid", ".midi"]
archive = [".zip", ".tar", ".gz", ".tgz", ".7z", ".rar", ".xz", ".bz2", ".tbz2", ".lzma", ".cab"]`}</div>
            </div>

            <h2>🎨 Theme Customization</h2>
            <p>
              Fyzenor supports custom color themes loaded via{" "}
              <code>~/.config/fyzenor/theme.toml</code>. The default packaged
              theme is <strong>Catppuccin Mocha</strong>.
            </p>

            <h3>Configuration File Variables</h3>
            <p>
              Define hex colors inside your configuration file using this
              precise layout:
            </p>

            <div className="code-container">
              <div className="code-header">
                <span>~/.config/fyzenor/theme.toml</span>
                <button
                  className="copy-btn"
                  onClick={() =>
                    handleCopy(
                      "[colors]\ndir = \"#89b4fa\"\nfile = \"#cdd6f4\"\nsel_bg = \"#585b70\"\nmedia = \"#f9e2af\"\nimage = \"#f5c2e7\"\nborder = \"#b4befe\"\nsuccess = \"#a6e3a1\"\nerror = \"#f38ba8\"\nmulti = \"#f5e0dc\"\npin_bg = \"#cba6f7\"\npin_border = \"#89b4fa\"\nsec_sel_bg = \"#313244\"\ncore = \"#a6e3a1\"\narchive = \"#eba0ac\"\nfrontend = \"#fab387\"\nconfig = \"#94e2d5\"\nscript = \"#f9e2af\"\ndocs = \"#f2cdcd\"\nfont = \"#cba6f7\"",
                      "theme-vars-sample",
                    )
                  }
                >
                  {copiedText === "theme-vars-sample" ? (
                    <Check size={12} />
                  ) : (
                    <Copy size={12} />
                  )}
                  {copiedText === "theme-vars-sample" ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="code-block">{`# Fyzenor Theme Configuration File

[colors]
dir = "#89b4fa"
file = "#cdd6f4"
sel_bg = "#585b70"
media = "#f9e2af"
image = "#f5c2e7"
border = "#b4befe"
success = "#a6e3a1"
error = "#f38ba8"
multi = "#f5e0dc"
pin_bg = "#cba6f7"
pin_border = "#89b4fa"
sec_sel_bg = "#313244"
core = "#a6e3a1"
archive = "#eba0ac"
frontend = "#fab387"
config = "#94e2d5"
script = "#f9e2af"
docs = "#f2cdcd"
font = "#cba6f7"`}</div>
            </div>

            <h2>Wallpaper-Based Theming (Matugen)</h2>
            <p>
              You can leverage <strong>Matugen</strong> to generate color themes
              dynamically based on your current desktop wallpaper:
            </p>

            <h3>Step 1: Create the Matugen Template</h3>
            <p>
              Create a template at{" "}
              <code>~/.config/matugen/templates/fyzenor-colors.template</code>:
            </p>
            <div className="code-container">
              <div className="code-header">
                <span>fyzenor-colors.template</span>
                <button
                  className="copy-btn"
                  onClick={() =>
                    handleCopy(
                      "# Fyzenor Theme: Matugen Generated\n\n[colors]\ndir = \"{{colors.primary.default.hex}}\"\nfile = \"{{colors.on_surface.default.hex}}\"\nsel_bg = \"{{colors.surface_variant.default.hex}}\"\nmedia = \"{{colors.tertiary.default.hex}}\"\nimage = \"{{colors.secondary.default.hex}}\"\nborder = \"{{colors.outline.default.hex}}\"\nsuccess = \"{{colors.primary_fixed.default.hex}}\"\nerror = \"{{colors.error.default.hex}}\"\nmulti = \"{{colors.tertiary_container.default.hex}}\"\npin_bg = \"{{colors.secondary_container.default.hex}}\"\npin_border = \"{{colors.primary.default.hex}}\"\nsec_sel_bg = \"{{colors.surface_dim.default.hex}}\"",
                      "matugen-temp",
                    )
                  }
                >
                  {copiedText === "matugen-temp" ? (
                    <Check size={12} />
                  ) : (
                    <Copy size={12} />
                  )}
                  {copiedText === "matugen-temp" ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="code-block">{`# Fyzenor Theme: Matugen Generated

[colors]
dir = "{{colors.primary.default.hex}}"
file = "{{colors.on_surface.default.hex}}"
sel_bg = "{{colors.surface_variant.default.hex}}"
media = "{{colors.tertiary.default.hex}}"
image = "{{colors.secondary.default.hex}}"
border = "{{colors.outline.default.hex}}"
success = "{{colors.primary_fixed.default.hex}}"
error = "{{colors.error.default.hex}}"
multi = "{{colors.tertiary_container.default.hex}}"
pin_bg = "{{colors.secondary_container.default.hex}}"
pin_border = "{{colors.primary.default.hex}}"
sec_sel_bg = "{{colors.surface_dim.default.hex}}"`}</div>
            </div>

            <h3>Step 2: Update Matugen Config</h3>
            <p>
              Add this configuration to your{" "}
              <code>~/.config/matugen/config.toml</code> file:
            </p>
            <div className="code-container">
              <div className="code-header">
                <span>config.toml</span>
                <button
                  className="copy-btn"
                  onClick={() =>
                    handleCopy(
                      '[templates.fyzenor]\ninput_path = "~/.config/matugen/templates/fyzenor-colors.template"\noutput_path = "~/.config/fyzenor/theme.toml"',
                      "matugen-config",
                    )
                  }
                >
                  {copiedText === "matugen-config" ? (
                    <Check size={12} />
                  ) : (
                    <Copy size={12} />
                  )}
                  {copiedText === "matugen-config" ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="code-block">{`[templates.fyzenor]
input_path = "~/.config/matugen/templates/fyzenor-colors.template"
output_path = "~/.config/fyzenor/theme.toml"`}</div>
            </div>

            <h3>Step 3: Generate the Colors</h3>
            <p>
              Execute this command to extract colors from your wallpaper and
              apply them to Fyzenor:
            </p>
            <div className="code-container">
              <div className="code-block">{`matugen image /path/to/your/wallpaper.jpg`}</div>
            </div>

            <h2>Live TUI Color Previewer</h2>
            <p>
              Configure custom shades using pickers and copy the exported
              properties below:
            </p>

            <div className="color-picker-grid">
              <div className="configurator-panel">
                <div className="color-option">
                  <span className="color-option-label">Background</span>
                  <div className="color-option-inputs">
                    <input
                      type="color"
                      value={themeConfig.bg}
                      onChange={(e) =>
                        setThemeConfig({ ...themeConfig, bg: e.target.value })
                      }
                      className="color-swatch"
                    />
                    <input
                      type="text"
                      value={themeConfig.bg}
                      onChange={(e) =>
                        setThemeConfig({ ...themeConfig, bg: e.target.value })
                      }
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
                      onChange={(e) =>
                        setThemeConfig({
                          ...themeConfig,
                          border: e.target.value,
                        })
                      }
                      className="color-swatch"
                    />
                    <input
                      type="text"
                      value={themeConfig.border}
                      onChange={(e) =>
                        setThemeConfig({
                          ...themeConfig,
                          border: e.target.value,
                        })
                      }
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
                      onChange={(e) =>
                        setThemeConfig({
                          ...themeConfig,
                          activeText: e.target.value,
                          accentGlow: `${e.target.value}40`,
                        })
                      }
                      className="color-swatch"
                    />
                    <input
                      type="text"
                      value={themeConfig.activeText}
                      onChange={(e) =>
                        setThemeConfig({
                          ...themeConfig,
                          activeText: e.target.value,
                        })
                      }
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
                      onChange={(e) =>
                        setThemeConfig({
                          ...themeConfig,
                          normalText: e.target.value,
                        })
                      }
                      className="color-swatch"
                    />
                    <input
                      type="text"
                      value={themeConfig.normalText}
                      onChange={(e) =>
                        setThemeConfig({
                          ...themeConfig,
                          normalText: e.target.value,
                        })
                      }
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
                      onChange={(e) =>
                        setThemeConfig({
                          ...themeConfig,
                          statusBar: e.target.value,
                        })
                      }
                      className="color-swatch"
                    />
                    <input
                      type="text"
                      value={themeConfig.statusBar}
                      onChange={(e) =>
                        setThemeConfig({
                          ...themeConfig,
                          statusBar: e.target.value,
                        })
                      }
                      className="color-code-input"
                    />
                  </div>
                </div>

                <button
                  className="terminal-interactive-btn"
                  onClick={() =>
                    handleCopy(
                      `# Fyzenor theme config\n\n[colors]\ndir = "${themeConfig.activeText}"\nfile = "${themeConfig.normalText}"\nborder = "${themeConfig.border}"\nsel_bg = "${themeConfig.statusBar}"\nsec_sel_bg = "${themeConfig.statusBar}"`,
                      "colors-fz-copy",
                    )
                  }
                  style={{
                    marginTop: "1rem",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                >
                  {copiedText === "colors-fz-copy" ? (
                    <Check size={16} />
                  ) : (
                    <Copy size={16} />
                  )}
                  {copiedText === "colors-fz-copy"
                    ? "Copied Config!"
                    : "Copy theme.toml"}
                </button>
              </div>

              <div
                className="preview-tui-box"
                style={{
                  backgroundColor: themeConfig.bg,
                  borderColor: themeConfig.border,
                }}
              >
                <div
                  className="tui-header"
                  style={{
                    borderBottomColor: themeConfig.border,
                    color: themeConfig.normalText,
                  }}
                >
                  <span>1 shared</span>
                  <span>2 Download</span>
                  <span>3 config</span>
                </div>
                <div className="tui-columns">
                  <div
                    className="tui-column"
                    style={{
                      borderRightColor: themeConfig.border,
                      color: themeConfig.normalText,
                    }}
                  >
                    <div style={{ opacity: 0.5 }}>📁 src/</div>
                    <div style={{ opacity: 0.5 }}>📁 build/</div>
                    <div style={{ opacity: 0.5 }}>📁 docs/</div>
                  </div>
                  <div
                    className="tui-column"
                    style={{
                      borderRightColor: themeConfig.border,
                      color: themeConfig.normalText,
                    }}
                  >
                    <div
                      className="tui-item-active"
                      style={{
                        backgroundColor: themeConfig.accentGlow,
                        color: themeConfig.activeText,
                      }}
                    >
                      <FolderOpen size={12} /> main.cpp
                    </div>
                    <div>file_manager.h</div>
                    <div>async_task.h</div>
                    <div>utils.cpp</div>
                  </div>
                  <div
                    className="tui-column"
                    style={{ color: themeConfig.normalText }}
                  >
                    <div
                      style={{
                        color: themeConfig.activeText,
                        fontWeight: "bold",
                      }}
                    >
                      main.cpp
                    </div>
                    <div style={{ fontSize: "0.7rem", opacity: 0.6 }}>
                      Size: 2.1 KB
                    </div>
                    <div style={{ fontSize: "0.7rem", opacity: 0.6 }}>
                      Type: Source code
                    </div>
                  </div>
                </div>
                <div
                  className="tui-footer"
                  style={{
                    backgroundColor: themeConfig.statusBar,
                    borderTopColor: themeConfig.border,
                    color: themeConfig.normalText,
                  }}
                >
                  <span>Fyzenor /home/bimbok/fyzenor</span>
                </div>
              </div>
            </div>
            <h2 style={{ marginTop: "3rem" }}>🛠️ Custom Keyboard Macros</h2>
            <p>
              Fyzenor allows you to map single-key shortcuts to run shell
              commands globally on currently highlighted or selected files. These
              are configured in a keybind macro settings file.
            </p>
            <h3>Configuration File Path</h3>
            <p>
              Settings are loaded from: <code>~/.config/fyzenor/keys.toml</code>.
              If the file does not exist, Fyzenor generates a default template
              containing helpful comments on launch.
            </p>

            <div className="code-container">
              <div className="code-header">
                <span>~/.config/fyzenor/keys.toml</span>
                <button
                  className="copy-btn"
                  onClick={() =>
                    handleCopy(
                      "[macros]\nv = 'nvim \"$f\"'\ng = 'git status'\nl = 'ls -la'",
                      "keys-macro-sample",
                    )
                  }
                >
                  {copiedText === "keys-macro-sample" ? (
                    <Check size={12} />
                  ) : (
                    <Copy size={12} />
                  )}
                  {copiedText === "keys-macro-sample" ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="code-block">{`# Fyzenor Custom Keys Macro Configuration
# Macros allow you to execute shell command shortcuts using single keystrokes.
# Use single quotes for command strings in TOML.
# Place them under the [macros] section.
#   $f - expands to the currently highlighted file's absolute path
#   $s - expands to space-separated paths of all selected files

[macros]
v = 'nvim "$f"'
g = 'git status'
l = 'ls -la'`}</div>
            </div>

            <h3>Macro Execution Behavior</h3>
            <p>
              When a bound key (e.g. <code>v</code>) is pressed inside the file
              list panel, the following operations run:
            </p>
            <ul style={{ marginLeft: "1.5rem", marginBottom: "2rem" }}>
              <li style={{ margin: "0.5rem 0" }}>
                <strong>NCurses Suspension:</strong> NCurses screen state is cleanly
                saved and suspended via <code>def_prog_mode()</code> and{" "}
                <code>endwin()</code>.
              </li>
              <li style={{ margin: "0.5rem 0" }}>
                <strong>Placeholder Expansion:</strong> Path placeholders (
                <code>$f</code>, <code>$s</code>) are replaced with the correct
                absolute paths.
              </li>
              <li style={{ margin: "0.5rem 0" }}>
                <strong>Directory Scope:</strong> The subprocess executes directly
                within the working directory currently browsed inside the active
                panel.
              </li>
              <li style={{ margin: "0.5rem 0" }}>
                <strong>Subprocess Execution:</strong> The command executes in the
                foreground shell with standard terminal I/O (meaning programs like{" "}
                <code>nvim</code> or <code>git diff</code> run interactively).
              </li>
              <li style={{ margin: "0.5rem 0" }}>
                <strong>TUI Restoration:</strong> After completion, Fyzenor prompts{" "}
                <em>"Press Enter to return..."</em>, calls{" "}
                <code>reset_prog_mode()</code>, redraws the interface, and reloads
                the file list to reflect any changes.
              </li>
            </ul>
          </div>
        )}

        {activeTab === "community" && (
          <div className="animate-fade-in">
            <h2>🤝 Contributing</h2>
            <p>Contributions are welcome to make Fyzenor even better!</p>
            <ol style={{ marginLeft: "1.5rem", marginBottom: "1.5rem" }}>
              <li>Fork the repository on GitHub.</li>
              <li>
                Create a descriptive feature branch (
                <code>git checkout -b feature/cool-idea</code>).
              </li>
              <li>Implement and test your changes locally.</li>
              <li>
                Submit a clear pull request describing the implementation
                details.
              </li>
            </ol>
            <p>
              Detailed workflow instructions can be found inside{" "}
              <a
                href="https://github.com/Bimbok/fyzenor/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                CONTRIBUTING.md
              </a>
              , and community participation is governed by{" "}
              <a
                href="https://github.com/Bimbok/fyzenor/blob/main/CODE_OF_CONDUCT.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                CODE_OF_CONDUCT.md
              </a>
              .
            </p>

            <h2>📞 Contact &amp; Support</h2>
            <ul>
              <li>
                <strong>GitHub Profile</strong>:{" "}
                <a
                  href="https://github.com/Bimbok"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @Bimbok
                </a>
              </li>
              <li>
                <strong>Issues &amp; Requests</strong>:{" "}
                <a
                  href="https://github.com/Bimbok/fyzenor/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Submit an Issue
                </a>
              </li>
            </ul>

            <h2>⚖️ License</h2>
            <p>Distributed under the MIT License. See standard terms below:</p>
            <div
              className="code-container"
              style={{ maxHeight: "200px", overflowY: "auto" }}
            >
              <div
                className="code-block"
                style={{ fontSize: "0.8rem", whiteSpace: "pre-wrap" }}
              >
                MIT License Copyright (c) 2026 Bimbok Permission is hereby
                granted, free of charge, to any person obtaining a copy of this
                software and associated documentation files (the "Software"), to
                deal in the Software without restriction, including without
                limitation the rights to use, copy, modify, merge, publish,
                distribute, sublicense, and/or sell copies of the Software, and
                to permit persons to whom the Software is furnished to do so,
                subject to the following conditions: The above copyright notice
                and this permission notice shall be included in all copies or
                substantial portions of the Software. THE SOFTWARE IS PROVIDED
                "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
                INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO
                EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
                CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
                CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
                CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                SOFTWARE.
              </div>
            </div>
          </div>
        )}

        {activeTab === "troubleshoot" && (
          <div className="animate-fade-in">
            <h2>Frequently Asked Questions &amp; Troubleshooting</h2>
            <p>
              Here are answers to the most common configuration and compilation
              questions regarding Fyzenor:
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <div className="card-premium">
                <h4
                  style={{
                    color: "var(--accent-green)",
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                  }}
                >
                  <HelpCircle size={18} />
                  My directory size calculations are slow/laggy. How can I fix
                  this?
                </h4>
                <p style={{ margin: "0.5rem 0 0" }}>
                  Fyzenor recursively queries items to compile directory sizes.
                  If you are browsing massive nested folders (like a project
                  directory containing millions of <code>node_modules</code>),
                  calculations are queued onto background worker threads.
                  Browsing remains completely non-blocking, but size updates
                  might take a few seconds to populate.
                </p>
              </div>

              <div className="card-premium">
                <h4
                  style={{
                    color: "var(--accent-green)",
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                  }}
                >
                  <HelpCircle size={18} />
                  Images do not display or render as corrupt characters. What is
                  wrong?
                </h4>
                <p style={{ margin: "0.5rem 0 0" }}>
                  Fyzenor uses the native{" "}
                  <strong>Kitty Graphics Protocol</strong>. Pixel-perfect
                  rendering is only supported inside terminal emulators that
                  fully implement this protocol (e.g. Kitty, WezTerm, Ghostty).
                  If you run Fyzenor in standard Alacritty, GNOME Terminal, or
                  xterm, it will gracefully fallback to standard text metadata
                  layouts in the preview pane.
                </p>
              </div>

              <div className="card-premium">
                <h4
                  style={{
                    color: "var(--accent-green)",
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                  }}
                >
                  <HelpCircle size={18} />
                  Compilation fails with "std::filesystem has no member..."
                  error.
                </h4>
                <p style={{ margin: "0.5rem 0 0" }}>
                  Fyzenor requires a C++ compiler that fully supports the{" "}
                  <strong>C++17</strong> specification. On older systems (e.g.,
                  GCC 7 or earlier, or older MinGW versions on Windows),{" "}
                  <code>std::filesystem</code> was experimental or require
                  linking <code>-lstdc++fs</code>. Update your compiler to GCC
                  8+ or Clang 7+ and rebuild.
                </p>
              </div>

              <div className="card-premium">
                <h4
                  style={{
                    color: "var(--accent-green)",
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                  }}
                >
                  <HelpCircle size={18} />
                  My theme changes in theme.toml are not loading.
                </h4>
                <p style={{ margin: "0.5rem 0 0" }}>
                  Make sure your theme config is written to the exact location:{" "}
                  <code>~/.config/fyzenor/theme.toml</code>. If the syntax
                  contains errors, Fyzenor falls back to the default Terminal
                  Dark theme without crashing. You can validate the
                  configuration format by copying it from the{" "}
                  <strong>Configuration & Themes</strong> tab.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top-btn"
          title="Scroll to Top"
        >
          <ChevronUp size={22} />
        </button>
      )}

      {/* Interactive Command Palette Modal */}
      {commandPaletteOpen && (
        <div
          className="command-palette-backdrop"
          onClick={() => setCommandPaletteOpen(false)}
        >
          <div
            className="command-palette-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="command-palette-search-container">
              <Search size={18} className="command-palette-search-icon" />
              <input
                type="text"
                className="command-palette-input"
                placeholder="Search shortcuts (e.g. d, Ctrl+R) or pages (e.g. Trash)..."
                value={paletteQuery}
                onChange={(e) => setPaletteQuery(e.target.value)}
                autoFocus
              />
              <span className="command-palette-kbd">ESC</span>
            </div>
            <div className="command-palette-results scroll-custom">
              {filteredPaletteResults.length > 0 ? (
                filteredPaletteResults.map((item, idx) => (
                  <div
                    key={idx}
                    className={`command-palette-item ${
                      idx === paletteSelectedIndex ? "selected" : ""
                    }`}
                    onClick={item.action}
                    onMouseEnter={() => setPaletteSelectedIndex(idx)}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", width: "100%" }}>
                      <span className={`command-palette-badge ${item.type === "Page" ? "badge-page" : "badge-shortcut"}`}>
                        {item.type}
                      </span>
                      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, minWidth: 0 }}>
                        <span className="command-palette-item-title">{item.title}</span>
                        <span className="command-palette-item-subtitle">{item.subtitle}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="command-palette-no-results">
                  No results found for "{paletteQuery}"
                </div>
              )}
            </div>
            <div className="command-palette-footer">
              <span>Use <kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
              <span>Press <kbd>Enter</kbd> to select</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
