import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import { Showcase } from "./components/Showcase";
import { CommunitySection } from "./components/CommunitySection";
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
  Puzzle,
  Terminal,
  HardDrive,
  FolderPlus,
  Monitor,
  MousePointer,
  History,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  LayoutGrid,
} from "lucide-react";

export type ChapterType = "essentials" | "v4.3" | "engine" | "reference";

interface DocSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  chapter: ChapterType;
  chapterNum: string;
  chapterTitle: string;
  description: string;
  badge?: string;
  isBeta?: boolean;
}

const chapters: {
  id: "all" | ChapterType;
  label: string;
  count: number;
}[] = [
  { id: "all", label: "All Topics", count: 19 },
  { id: "v4.3", label: "v4.3.0", count: 8 },
  { id: "essentials", label: "Essentials", count: 5 },
  { id: "engine", label: "Engine", count: 4 },
  { id: "reference", label: "Reference", count: 2 },
];

const sections: DocSection[] = [
  // Chapter 01: Core Essentials
  {
    id: "overview",
    title: "Overview & Features",
    icon: <BookOpen size={17} />,
    chapter: "essentials",
    chapterNum: "01",
    chapterTitle: "CORE ESSENTIALS",
    description: "Modern C++17 dual-pane terminal file manager engineered for speed, safety, and zen.",
  },
  {
    id: "install",
    title: "Quick Start & Install",
    icon: <Download size={17} />,
    chapter: "essentials",
    chapterNum: "01",
    chapterTitle: "CORE ESSENTIALS",
    description: "Single-command curl scripts, distro packages (Arch, Debian, Alpine), and CMake source build.",
  },
  {
    id: "keyboard",
    title: "Keyboard Controls",
    icon: <Keyboard size={17} />,
    chapter: "essentials",
    chapterNum: "01",
    chapterTitle: "CORE ESSENTIALS",
    description: "Intuitive Vim keybindings, directional navigation, and interactive key inspector.",
  },
  {
    id: "trash",
    title: "Trash Deep Dive",
    icon: <Trash2 size={17} />,
    chapter: "essentials",
    chapterNum: "01",
    chapterTitle: "CORE ESSENTIALS",
    description: "Cross-partition safety with XDG-compliant multi-partition trashing and instant undo.",
  },
  {
    id: "dragdrop",
    title: "Drag & Drop Support",
    icon: <Hand size={17} />,
    chapter: "essentials",
    chapterNum: "01",
    chapterTitle: "CORE ESSENTIALS",
    description: "Seamless terminal-to-desktop drag-and-drop file transfers via OSC 52 and desktop portals.",
  },

  // Chapter 02: What's New in v4.3.0
  {
    id: "gridview",
    title: "2D Grid View",
    icon: <LayoutGrid size={17} />,
    chapter: "v4.3",
    chapterNum: "02",
    chapterTitle: "WHAT'S NEW IN v4.3.0",
    description: "Adaptive 2D thumbnail card grid with aspect-ratio letterboxing, TrueColor ANSI fallback, and safe in-memory previews.",
    badge: "v4.3.0",
  },
  {
    id: "neovim",
    title: "Neovim Plugin",
    icon: <Terminal size={17} />,
    chapter: "v4.3",
    chapterNum: "02",
    chapterTitle: "WHAT'S NEW IN v4.3.0",
    description: "Native Neovim Lua integration with oil.nvim-style floating buffers and directional window management.",
    badge: "v4.3.0",
  },
  {
    id: "plugins",
    title: "Lua Plugins",
    icon: <Puzzle size={17} />,
    chapter: "v4.3",
    chapterNum: "02",
    chapterTitle: "WHAT'S NEW IN v4.3.0",
    description: "Lightweight embedded Lua 5.4 scripting engine to automate tasks and bind custom shortcuts.",
    badge: "v4.3.0",
  },
  {
    id: "diskusage",
    title: "Visual Disk Usage",
    icon: <HardDrive size={17} />,
    chapter: "v4.3",
    chapterNum: "02",
    chapterTitle: "WHAT'S NEW IN v4.3.0",
    description: "Real-time visual disk usage explorer with colorized gauge bars and instant sub-directory navigation.",
    badge: "v4.3.0",
  },
  {
    id: "modals",
    title: "Creation & Modals",
    icon: <FolderPlus size={17} />,
    chapter: "v4.3",
    chapterNum: "02",
    chapterTitle: "WHAT'S NEW IN v4.3.0",
    description: "Centered interactive modal dialogs featuring dynamic Nerd Font icon morphing as you type.",
    badge: "v4.3.0",
  },
  {
    id: "terminals",
    title: "Terminals & Truecolor",
    icon: <Monitor size={17} />,
    chapter: "v4.3",
    chapterNum: "02",
    chapterTitle: "WHAT'S NEW IN v4.3.0",
    description: "Universal 256-color matching and DEC 2026 synchronized terminal rendering.",
    badge: "v4.3.0",
  },
  {
    id: "mouse",
    title: "Mouse & Pane Scroll",
    icon: <MousePointer size={17} />,
    chapter: "v4.3",
    chapterNum: "02",
    chapterTitle: "WHAT'S NEW IN v4.3.0",
    description: "Pane-aware mouse hovering and independent scroll tracking without moving cursor.",
    badge: "v4.3.0",
  },
  {
    id: "cursormemory",
    title: "Cursor Memory",
    icon: <History size={17} />,
    chapter: "v4.3",
    chapterNum: "02",
    chapterTitle: "WHAT'S NEW IN v4.3.0",
    description: "Persistent filename tracking that preserves cursor selection across sort and filter changes.",
    badge: "v4.3.0",
  },

  // Chapter 03: Engine & Architecture
  {
    id: "git",
    title: "Git & Lazygit",
    icon: <GitBranch size={17} />,
    chapter: "engine",
    chapterNum: "03",
    chapterTitle: "ENGINE & ARCHITECTURE",
    description: "Asynchronous git status monitoring, staged visual diffs, and instant lazygit invocation.",
  },
  {
    id: "tasks",
    title: "Task Controls & Smart Copy",
    icon: <Sliders size={17} />,
    chapter: "engine",
    chapterNum: "03",
    chapterTitle: "ENGINE & ARCHITECTURE",
    description: "Dedicated background worker threads, pause/resume controls, and delta resumption.",
  },
  {
    id: "architecture",
    title: "Architecture & Threads",
    icon: <Cpu size={17} />,
    chapter: "engine",
    chapterNum: "03",
    chapterTitle: "ENGINE & ARCHITECTURE",
    description: "Decoupled multithreaded design separating ncurses render loop from filesystem I/O.",
  },
  {
    id: "theming",
    title: "Configuration & Themes",
    icon: <Sparkles size={17} />,
    chapter: "engine",
    chapterNum: "03",
    chapterTitle: "ENGINE & ARCHITECTURE",
    description: "Fine-tune UI color schemes, border styles, Nerd Font glyph presets, and shortcuts.",
  },

  // Chapter 04: Reference & Community
  {
    id: "troubleshoot",
    title: "Troubleshooting",
    icon: <HelpCircle size={17} />,
    chapter: "reference",
    chapterNum: "04",
    chapterTitle: "REFERENCE & COMMUNITY",
    description: "Resolution guides for terminal rendering glitches, missing glyphs, and permission errors.",
  },
  {
    id: "community",
    title: "Community & License",
    icon: <Users size={17} />,
    chapter: "reference",
    chapterNum: "04",
    chapterTitle: "REFERENCE & COMMUNITY",
    description: "Open-source GPLv3 license, contributing guidelines, GitHub discussions, and roadmap.",
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [viewMode, setViewMode] = useState<"showcase" | "docs">(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (hash && hash !== "manifesto" && hash !== "in-motion" && hash !== "features") {
        return "docs";
      }
    }
    return "showcase";
  });

  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("fyzenor-theme");
      if (saved === "dark" || saved === "light") return saved;
    }
    return "light";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const [sidebarFilter, setSidebarFilter] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<"all" | ChapterType>("all");
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [paletteQuery, setPaletteQuery] = useState<string>("");
  const [paletteSelectedIndex, setPaletteSelectedIndex] = useState<number>(0);
  const mainContentRef = React.useRef<HTMLDivElement>(null);

  // Terminal Simulator State
  const [termInput, setTermInput] = useState<string>("");
  const [termLines, setTermLines] = useState<string[]>([
    "Fyzenor Terminal Simulator v4.3.0",
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


  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("fyzenor-theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        if (hash === "manifesto" || hash === "in-motion" || hash === "features") {
          setViewMode("showcase");
        } else {
          const match = sections.find((s) => s.id === hash);
          if (match) {
            setActiveTab(match.id);
            setViewMode("docs");
          }
        }
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleNavigateToDoc = (secId: string) => {
    setActiveTab(secId);
    setViewMode("docs");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      mainContentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

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
      title: "Create File or Folder",
      desc: "Prompts to create a new item with dynamic extension/type Nerd Font indicator (shows file icon , dynamically changes to language glyphs like  for .c,  for .cc/.cpp,  for .py,  for .rs, or folder icon  when ending with / or \\).",
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
    V: {
      title: "2D Grid View Mode",
      desc: "Toggles between 3-column Miller mode and 2D visual thumbnail card grid with aspect-ratio letterboxing, TrueColor ANSI fallback, and safe in-memory previews. (Alternative: Shift+V).",
      category: "View",
    },
    P: {
      title: "Pin Directory",
      desc: "Pins current directory path to persistent bookmarks saved in <code>~/.fm_pins</code> (focused list panel).",
      category: "View",
    },
    U: {
      title: "Visual Disk Usage (ncdu Mode)",
      desc: "Toggles interactive disk usage view with real-time proportional Unicode bar graphs (<code>[████████░░]</code>), directory percentages, and descending size hierarchy. (Alternative: <code>Space+u</code>).",
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
    "Ctrl+E": {
      title: "Scroll Preview Down",
      desc: "Scrolls the preview pane downwards through long text, code, or directory listings without moving file cursor.",
      category: "Navigation",
    },
    "Ctrl+Y": {
      title: "Scroll Preview Up",
      desc: "Scrolls the preview pane upwards through long text, code, or directory listings without moving file cursor.",
      category: "Navigation",
    },
    "Wheel": {
      title: "Pane-Aware Mouse Scrolling",
      desc: "Hover over the middle pane to virtually scroll files; hover over the preview pane to scroll text, code, or folder contents; hover over the bookmarks pane to scroll pins.",
      category: "Navigation",
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
      title: "Show Keybindings Modal",
      desc: "Opens the spacious 2-column keybindings overlay with smooth scrolling.",
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
      id: "overview",
      title: "Kitty Graphics & Terminal Previews",
      keywords: "kitty ghostty wezterm konsole terminal compatibility graphics protocol image preview video thumbnail dec mode 2026",
      content: "High-resolution image and video previews using the Kitty Graphics Protocol across Kitty, Ghostty, and WezTerm with zero flicker and memory-safe caching."
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
      id: "gridview",
      title: "2D Grid View & Visual Media Explorer (V) (v4.3.0)",
      keywords: "grid view 2d grid visual media explorer card grid thumbnails aspect ratio letterbox kitty graphics ansi half block truecolor safe cache in-memory preview V Shift+V prominence cardW cardH view_mode grid_thumbnails",
      content: "Adaptive 2D card grid for visual media exploration. High-res 280x160 RGBA letterboxed Kitty image thumbnails with padding, 24-bit TrueColor ANSI half-block fallback, high-contrast double border selection, and safe in-memory cache/trash previews."
    },
    {
      id: "neovim",
      title: "Neovim Plugin (fyzenor.nvim) (v4.3.0)",
      keywords: "neovim nvim plugin yazi.nvim floating window split tab edit netrw hijack buffer args buflisted lazy.nvim packer vim-plug",
      content: "Native Neovim integration inspired by yazi.nvim. Centered floating window, netrw hijacking, multi-file buffer loading across splits/tabs/args, and cwd sync."
    },
    {
      id: "plugins",
      title: "Lua Plugin Engine (v4.3.0)",
      keywords: "lua plugin plugins engine v4.3.0 keymaps keybindings extensions custom previewer fyzenor.add_keymap fyzenor.register_previewer fyzenor.shell_output fyzenor.prompt fyzenor.change_directory fyzenor.get_version",
      content: "Embedded Lua plugin engine. Build custom keybindings, interactive fast-jumps, status bar extensions, and previewers without recompiling C++."
    },
    {
      id: "diskusage",
      title: "Visual Disk Usage & Ncdu Mode (U) (v4.3.0)",
      keywords: "disk usage ncdu visual bar graph U size analyze space storage directory background scan symlink",
      content: "Built-in visual disk usage mode with proportional unicode bar graphs, non-blocking background folder calculation, and circular symlink protection."
    },
    {
      id: "modals",
      title: "Unified Creation & Centered Modals (n & r) (v4.3.0)",
      keywords: "create file folder n dynamic nerd font icon indicator morph centered modal active border utf-8 codepoint paste clipboard",
      content: "Unified file and folder creation under 'n' with real-time extension icon morphing, centered modals with theme accent borders, UTF-8 codepoint navigation, and clipboard paste."
    },
    {
      id: "terminals",
      title: "Terminal Compatibility & Truecolor Engine (v4.3.0)",
      keywords: "terminal truecolor 24-bit 256 colors hexto256 kitty ghostty wezterm tmux neovim alacritty synchronized updates dec 2026",
      content: "Consistent theme rendering across Kitty, Ghostty, WezTerm, Alacritty, Tmux, and Neovim with universal 256-color matching and DEC 2026 synchronized updates."
    },
    {
      id: "mouse",
      title: "Mouse Controls & Pane-Aware Scrolling (v4.3.0)",
      keywords: "mouse scroll hover pane wheel preview scrolling click dragon drag drop",
      content: "Pane-aware mouse wheel hovering to scroll any pane without changing focus, smooth preview scrolling (Ctrl+E/Ctrl+Y), and drag-and-drop support."
    },
    {
      id: "cursormemory",
      title: "Cursor Tracking & Navigation Memory (v4.3.0)",
      keywords: "cursor tracking sort memory per-directory history navigation selection scroll preserve safe recovery",
      content: "Persistent cursor tracking across sorting modes, per-directory selection memory across back/forward navigation (Ctrl+O/Ctrl+P), and safe directory recovery."
    },
    {
      id: "install",
      title: "Smart Installer Script",
      keywords: "install installer smart installer channel bash script curl main",
      content: "Universal smart installer script. Installs v4.3.0 production release or optional cutting-edge beta development channel."
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
            setViewMode("docs");
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
            setViewMode("docs");
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
        setViewMode("docs");
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
        setViewMode("docs");
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
      output = ["$", "fyzenor --version", "Fyzenor version 4.3.0"];
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
        '[OK] Installation completed successfully! Run "fyzenor" to start.',
      ];
    } else if (cmd === "clear") {
      setTermLines(["Fyzenor Terminal Simulator v4.3.0", ""]);
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
      output = [
        `$ ${cmd}`,
        `command not found: ${cmd}`,
        'Type "help" to see available commands.',
      ];
    }
    setTermLines((prev) => [...prev, ...output, ""]);
  };

  const handleTermSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termInput.trim()) return;
    handlePresetCommand(termInput.trim());
    setTermInput("");
  };

  const currentSection = sections.find((s) => s.id === activeTab) || sections[0];

  const visibleSections = sections.filter((sec) => {
    const matchesChapter = selectedChapter === "all" || sec.chapter === selectedChapter;
    const matchesQuery =
      !sidebarFilter.trim() ||
      sec.title.toLowerCase().includes(sidebarFilter.toLowerCase()) ||
      sec.description.toLowerCase().includes(sidebarFilter.toLowerCase()) ||
      sec.chapterTitle.toLowerCase().includes(sidebarFilter.toLowerCase());
    return matchesChapter && matchesQuery;
  });

  const groupedSections = [
    {
      key: "essentials" as const,
      num: "01",
      title: "CORE ESSENTIALS",
      badge: undefined,
      items: visibleSections.filter((s) => s.chapter === "essentials"),
    },
    {
      key: "v4.3" as const,
      num: "02",
      title: "WHAT'S NEW IN v4.3.0",
      badge: "v4.3.0",
      items: visibleSections.filter((s) => s.chapter === "v4.3"),
    },
    {
      key: "engine" as const,
      num: "03",
      title: "ENGINE & ARCHITECTURE",
      badge: undefined,
      items: visibleSections.filter((s) => s.chapter === "engine"),
    },
    {
      key: "reference" as const,
      num: "04",
      title: "REFERENCE & COMMUNITY",
      badge: undefined,
      items: visibleSections.filter((s) => s.chapter === "reference"),
    },
  ].filter((g) => g.items.length > 0);

  const isCompactRail = sidebarCollapsed && !mobileMenuOpen;

  return (
    <>
      {viewMode === "showcase" ? (
        <Showcase
          onNavigateToDoc={handleNavigateToDoc}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          theme={theme}
          onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
          copiedText={copiedText}
          onCopy={handleCopy}
        />
      ) : (
        <div className="editorial-canvas docs-editorial-canvas">
          {/* Calm Integrated Reader Topbar */}
          <div className="doc-reader-topbar">
            <div className="topbar-left">
              <button
                className="doc-back-pill"
                onClick={() => {
                  setViewMode("showcase");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                ← Back to Showcase
              </button>
              <button
                className="sidebar-rail-btn"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                title={sidebarCollapsed ? "Expand chapter navigator" : "Collapse into icon rail (Zen mode)"}
              >
                {sidebarCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
              </button>
            </div>

            <div className="doc-reader-breadcrumb">
              <span className="breadcrumb-pill">Chapter {currentSection.chapterNum}</span>
              <span className="breadcrumb-divider">/</span>
              <span className="breadcrumb-chapter">{currentSection.chapterTitle}</span>
              <span className="breadcrumb-divider">/</span>
              <span className="breadcrumb-title">{currentSection.title}</span>
            </div>

            <div className="topbar-right">
              <button
                onClick={() => setCommandPaletteOpen(true)}
                className="editorial-search-pill"
              >
                <Search size={14} />
                <span className="search-pill-label">Search Docs</span>
                <kbd className="cmd-kbd">⌘K</kbd>
              </button>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="editorial-theme-btn"
                title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              >
                {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
              </button>
              <button
                className="mobile-sidebar-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Integrated Split Layout */}
          <div className="docs-split-layout">
            {/* Zen Chapter Navigator Sidebar */}
            <aside className={`docs-sidebar-panel ${isCompactRail ? "collapsed" : ""} ${mobileMenuOpen ? "open" : ""}`}>
              {/* Header inside sidebar */}
              <div className="zen-sidebar-header">
                <div
                  className="zen-sidebar-brand"
                  onClick={() => isCompactRail && setSidebarCollapsed(false)}
                  style={{ cursor: isCompactRail ? "pointer" : "default" }}
                  title={isCompactRail ? "Click to expand sidebar" : undefined}
                >
                  <img
                    src="/fyzenor.png"
                    alt="Fyzenor Logo"
                    className="zen-brand-logo"
                  />
                  {!isCompactRail && (
                    <div className="zen-brand-info">
                      <span className="zen-brand-name">Fyzenor</span>
                      <span className="zen-brand-sub">CHAPTER NAVIGATOR</span>
                    </div>
                  )}
                </div>

                {/* Mobile Drawer Close Button */}
                {mobileMenuOpen && (
                  <button
                    className="mobile-drawer-close"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close navigation"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {!isCompactRail && (
                <>
                  {/* Topic Quick Filter */}
                  <div className="zen-search-wrapper">
                    <Search size={13} className="zen-search-icon" />
                    <input
                      type="text"
                      placeholder="Filter topics..."
                      value={sidebarFilter}
                      onChange={(e) => setSidebarFilter(e.target.value)}
                      className="zen-search-input"
                    />
                    {sidebarFilter && (
                      <button
                        className="zen-search-clear"
                        onClick={() => setSidebarFilter("")}
                        title="Clear filter"
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>

                  {/* Chapter Filter Pills */}
                  <div className="zen-chapter-pills">
                    {chapters.map((ch) => (
                      <button
                        key={ch.id}
                        className={`zen-chapter-pill ${selectedChapter === ch.id ? "active" : ""}`}
                        onClick={() => setSelectedChapter(ch.id)}
                      >
                        <span>{ch.label}</span>
                        <span className="zen-pill-count">{ch.count}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Chapter & Topics Tree */}
              <nav className="zen-nav-tree">
                {groupedSections.length === 0 ? (
                  <div className="zen-nav-empty">
                    <p>No topics matching &ldquo;{sidebarFilter}&rdquo;</p>
                    <button
                      className="zen-reset-filter-btn"
                      onClick={() => {
                        setSidebarFilter("");
                        setSelectedChapter("all");
                      }}
                    >
                      Reset filters
                    </button>
                  </div>
                ) : (
                  groupedSections.map((group) => (
                    <div key={group.key} className="zen-chapter-group">
                      {!isCompactRail && (
                        <div className="zen-chapter-header">
                          <span className="zen-chapter-num">{group.num}</span>
                          <span className="zen-chapter-label">{group.title}</span>
                          {group.badge && (
                            <span className="zen-chapter-badge">{group.badge}</span>
                          )}
                        </div>
                      )}
                      <div className="zen-chapter-items">
                        {group.items.map((sec) => {
                          const isActive = activeTab === sec.id;
                          return (
                            <button
                              key={sec.id}
                              className={`zen-nav-btn ${isActive ? "active" : ""}`}
                              onClick={() => {
                                setActiveTab(sec.id);
                                setMobileMenuOpen(false);
                                window.location.hash = sec.id;
                                setTimeout(() => {
                                  mainContentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
                                }, 30);
                              }}
                              title={isCompactRail ? `${sec.title} (${sec.chapterTitle})` : undefined}
                            >
                              <div className="zen-nav-icon">{sec.icon}</div>
                              {!isCompactRail && (
                                <>
                                  <span className="zen-nav-title">{sec.title}</span>
                                  {sec.chapter === "v4.3" && !isActive && (
                                    <span className="zen-nav-micro-badge">v4.3</span>
                                  )}
                                  {isActive && (
                                    <span className="zen-nav-active-dot" />
                                  )}
                                </>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}
              </nav>

              {/* Zen Footer */}
              {!isCompactRail && (
                <div className="zen-sidebar-footer">
                  <div className="zen-footer-version">
                    <span className="zen-status-dot" />
                    <span>v4.3.0 Stable • C++17</span>
                  </div>
                  <a
                    href="https://github.com/Bimbok/fyzenor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="zen-footer-github"
                  >
                    GitHub ↗
                  </a>
                </div>
              )}
            </aside>

            {/* Mobile Backdrop */}
            {mobileMenuOpen && (
              <div
                className="mobile-backdrop"
                onClick={() => setMobileMenuOpen(false)}
              />
            )}

            {/* Main Reading Panel */}
            <main
              className="docs-reader-panel"
              ref={mainContentRef}
              onScroll={(e) => {
                setShowScrollTop(e.currentTarget.scrollTop > 300);
              }}
            >
              {/* Dynamic Article Hero Header */}
              <div className="docs-hero-banner">
                <div className="docs-hero-meta-strip">
                  <span className="docs-meta-chapter">
                    CHAPTER {currentSection.chapterNum} // {currentSection.chapterTitle}
                  </span>
                  {currentSection.badge && (
                    <span className="badge badge-green">{currentSection.badge}</span>
                  )}
                  {currentSection.chapter === "v4.3" && (
                    <span className="badge badge-purple">NEW RELEASE</span>
                  )}
                  <span className="badge badge-cyan">C++17</span>
                </div>
                <h1 className="docs-hero-title">{currentSection.title}</h1>
                <p className="docs-hero-description">{currentSection.description}</p>
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
                <strong>v4.3.0 Release Highlights:</strong> Includes official native Neovim integration (<code>fyzenor.nvim</code>), embedded Lua plugin engine (<code>~/.config/fyzenor/plugins/</code>), visual disk usage analyzer (<code>U</code>), centered dynamic modals with real-time extension icon morphing (<code>n</code>/<code>r</code>), universal 256-color matching &amp; DEC 2026 synchronized updates, pane-aware mouse wheel hovering, and persistent cursor tracking across sort modes.
              </div>
            </div>

            <h2>Key Features</h2>
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
                      Generate high-resolution image and video previews asynchronously using
                      the Kitty Graphics Protocol with zero flicker across <strong>Kitty</strong>,{" "}
                      <strong>Ghostty</strong>, and <strong>WezTerm</strong>.
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
                      <strong>Context-Aware Mouse Scrolling</strong>
                    </td>
                    <td>
                      Hover and scroll your mouse wheel over any pane: middle pane scrolls file listings, preview pane scrolls long code, text, archives, or directories with dynamic range indicators (e.g. <code>[1-40/350]</code>), and the pinned pane scrolls bookmarks.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Visual Disk Usage Mode (<code>U</code> / <code>Space+u</code>)</strong>
                    </td>
                    <td>
                      Interactive <strong>ncdu / gdu-style</strong> disk usage visualizer with dynamic proportional Unicode bar meters (<code>[████████░░] 74.2%</code>), directory percentages, and background multi-threaded size calculations.
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

            <h2>Rich Media & Archive Previews</h2>
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

            <h3>4. High-Resolution Visual Previews (Kitty Graphics Protocol)</h3>
            <p>
              Fyzenor incorporates a high-performance, asynchronous media preview engine built on the{" "}
              <a
                href="https://sw.kovidgoyal.net/kitty/graphics-protocol/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent-blue)", fontWeight: 600 }}
              >
                Kitty Graphics Protocol
              </a>
              , delivering true-color image and video thumbnails without slowing down directory navigation:
            </p>
            <ul style={{ marginLeft: "1.5rem", marginBottom: "2rem" }}>
              <li style={{ margin: "0.4rem 0" }}>
                <strong>Zero-Flicker Synchronized Updates:</strong> Utilizes DEC Mode 2026 (<code>\033[?2026h</code> / <code>\033[?2026l</code>)
                to batch graphics placement and TUI redraws into single atomic frame passes. This completely eliminates cursor jumping and visual tearing across fast GPU-accelerated terminals like <strong>Kitty</strong> and <strong>Ghostty</strong>.
              </li>
              <li style={{ margin: "0.4rem 0" }}>
                <strong>Memory-Safe Texture Lifecycle:</strong> Employs targeted Kitty graphics commands (<code>a=T,i=1</code>) to swap image previews directly in-place, and explicit image ID deletion (<code>d=A</code>)
                to purge stale image buffers from GPU memory. This prevents runaway VRAM consumption and terminal freezes during rapid browsing in memory-sensitive emulators like <strong>WezTerm</strong>.
              </li>
              <li style={{ margin: "0.4rem 0" }}>
                <strong>Selective Cell Preservation:</strong> Selectively refreshes only the preview viewport while keeping unaffected panes (file list, parent tree, status bar) perfectly stable.
              </li>
              <li style={{ margin: "0.4rem 0" }}>
                <strong>Non-Blocking Worker Engine:</strong> High-resolution thumbnails are generated in background threads via <code>ffmpeg</code> and cached in an in-memory LRU session cache for instant recall.
              </li>
              <li style={{ margin: "0.4rem 0" }}>
                <strong>Graceful Fallback:</strong> If opened in terminals without graphics protocol support (e.g. Alacritty, GNOME Terminal, Foot, xterm), Fyzenor automatically falls back to rich text metadata and layout inspection without corrupted character artifacts.
              </li>
            </ul>

            <h2>CLI Arguments & Usage</h2>
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

            <h2>Shell Macros &amp; Background Execution</h2>
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

            <h2>Natively Integrated Drive Mounting</h2>
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
            <p>
              To experience high-resolution image and video previews directly inside the TUI,
              use a modern terminal emulator supporting the Kitty Graphics Protocol:
            </p>
            <ul style={{ marginLeft: "1.5rem", marginBottom: "1.5rem" }}>
              <li style={{ margin: "0.4rem 0" }}>
                <a
                  href="https://sw.kovidgoyal.net/kitty/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--accent-blue)", fontWeight: 600 }}
                >
                  Kitty
                </a>{" "}
                — First-class support with native Kitty Graphics Protocol, synchronized frame updates (DEC Mode 2026), and smart cell preservation for a zero-flicker experience.
              </li>
              <li style={{ margin: "0.4rem 0" }}>
                <a
                  href="https://ghostty.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--accent-blue)", fontWeight: 600 }}
                >
                  Ghostty
                </a>{" "}
                — Native Kitty Graphics Protocol support with GPU-accelerated tear-free rendering.
              </li>
              <li style={{ margin: "0.4rem 0" }}>
                <a
                  href="https://wezfurlong.org/wezterm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--accent-blue)", fontWeight: 600 }}
                >
                  WezTerm
                </a>{" "}
                — Full native support with memory-safe GPU texture pruning (<code>d=A</code>) and atomic in-place image swapping (<code>a=T,i=1</code>).
              </li>
              <li style={{ margin: "0.4rem 0" }}>
                <a
                  href="https://konsole.kde.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--accent-blue)", fontWeight: 600 }}
                >
                  Konsole
                </a>{" "}
                — Compatible with the Kitty Graphics protocol.
              </li>
            </ul>

            <div
              style={{
                padding: "0.85rem 1.25rem",
                borderRadius: "8px",
                background: "rgba(59, 130, 246, 0.08)",
                border: "1px solid rgba(59, 130, 246, 0.2)",
                marginBottom: "1.5rem",
              }}
            >
              <strong>Note for other terminals:</strong> If you use Alacritty, GNOME Terminal, Foot, xterm, or another terminal without Kitty Graphics support, Fyzenor works out-of-the-box! Media previews gracefully fall back to detailed file metadata and syntax-highlighted text previews without any visual artifacts.
            </div>

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
              <pre className="code-block">{`sudo apt update
sudo apt install build-essential libncursesw5-dev ffmpeg zip bat xclip wl-copy ripgrep`}</pre>
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
              <pre className="code-block">{`sudo dnf update
sudo dnf install gcc gcc-c++ make ncurses-devel ffmpeg zip bat xclip wl-clipboard ripgrep`}</pre>
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
              <pre className="code-block">{`sudo pacman -Sy
sudo pacman -S base-devel ncurses ffmpeg zip bat xclip wl-clipboard ripgrep`}</pre>
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
              <pre className="code-block">{`pkg update
pkg install clang cmake ndk-sysroot ncurses-utils ffmpeg zip bat ripgrep`}</pre>
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

            <h2>Installation &amp; Update</h2>
            <p>
              The easiest way to install or update Fyzenor is using the
              universal installation script.
            </p>

            <h3>Smart One-Liner Installer</h3>
            <div className="code-container">
              <div className="code-header">
                <span>Install Stable Release (v4.3.0 - Default)</span>
                <button
                  className="copy-btn"
                  onClick={() =>
                    handleCopy(
                      "curl -fsSL https://raw.githubusercontent.com/Bimbok/fyzenor/main/install.sh | bash",
                      "install-stable",
                    )
                  }
                >
                  {copiedText === "install-stable" ? (
                    <Check size={12} />
                  ) : (
                    <Copy size={12} />
                  )}
                  {copiedText === "install-stable" ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="code-block">{`curl -fsSL https://raw.githubusercontent.com/Bimbok/fyzenor/main/install.sh | bash`}</pre>
            </div>

            <div className="code-container">
              <div className="code-header">
                <span>Install Development Channel (Beta)</span>
                <button
                  className="copy-btn"
                  onClick={() =>
                    handleCopy(
                      "curl -fsSL https://raw.githubusercontent.com/Bimbok/fyzenor/main/install.sh | bash -s -- --beta",
                      "install-beta",
                    )
                  }
                >
                  {copiedText === "install-beta" ? (
                    <Check size={12} />
                  ) : (
                    <Copy size={12} />
                  )}
                  {copiedText === "install-beta" ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="code-block">{`curl -fsSL https://raw.githubusercontent.com/Bimbok/fyzenor/main/install.sh | bash -s -- --beta`}</pre>
            </div>

            <p>The installer does the following automatically:</p>
            <ol style={{ marginLeft: "1.5rem", marginBottom: "1.5rem" }}>
              <li>Compiles the C++ source using parallel jobs (-j$(nproc)).</li>
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
              <li>
                Initializes configuration and themes in <code>~/.config/fyzenor/</code>.
              </li>
            </ol>

            <h3>Uninstallation</h3>
            <p>
              To remove Fyzenor, its desktop shortcut, icon, and <code>fm</code> symlink cleanly:
            </p>
            <div className="code-container">
              <div className="code-header">
                <span>Uninstall Command</span>
                <button
                  className="copy-btn"
                  onClick={() =>
                    handleCopy(
                      "./uninstall.sh",
                      "uninstall-cmd",
                    )
                  }
                >
                  {copiedText === "uninstall-cmd" ? (
                    <Check size={12} />
                  ) : (
                    <Copy size={12} />
                  )}
                  {copiedText === "uninstall-cmd" ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="code-block">{`# Standard uninstall (keeps ~/.config/fyzenor)
./uninstall.sh

# Complete purge (removes binaries, configs, and bookmarks)
./uninstall.sh --purge

# Or via curl:
curl -fsSL https://raw.githubusercontent.com/Bimbok/fyzenor/main/uninstall.sh | bash`}</pre>
            </div>

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
              <pre className="code-block">{`git clone https://github.com/Bimbok/fyzenor.git
cd fyzenor
mkdir -p build && cd build
cmake ..
make
./fyzenor`}</pre>
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
              <pre className="code-block">{`fatal error: filesystem: No such file or directory`}</pre>
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
              <pre className="code-block">{`g++ --version`}</pre>
            </div>

            <h2>Tech Stack</h2>
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

            <h2>Complete Key Bindings Map</h2>

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
              Specification, Fyzenor uses a highly optimized, local
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
              <pre className="code-block">{`[Trash Info]
Path=/home/bimbok/shared/important_docs/invoice.pdf
DeletionDate=2026-07-05T20:14:05`}</pre>
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

            <h2 style={{ marginTop: "2.5rem" }}>Safe In-Memory Media Previewing &amp; Cache Protection</h2>
            <p>
              When navigating trash directories (<code>~/.local/share/Trash</code> or external partition <code>.Trash-&lt;uid&gt;</code>), 
              Fyzenor automatically applies strict in-memory preview isolation via <code>isTrashPath(path)</code>:
            </p>
            <div className="card-grid">
              <div className="card-premium">
                <div style={{ color: "var(--accent-green)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  Zero Disk Cache Pollution
                </div>
                <p>
                  Media preview generation for trashed files runs entirely in-memory or directly parses pre-existing thumbnails. 
                  Fyzenor refuses to write new <code>.png</code> or <code>.gthumb</code> cache files to disk while viewing trash, preventing trash quota inflation and unwanted disk bloat.
                </p>
              </div>
              <div className="card-premium">
                <div style={{ color: "var(--accent-cyan)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  Loop-Free inotify Safety
                </div>
                <p>
                  Writing preview files to disk while monitoring a directory creates filesystem events that trigger directory reloads. 
                  In-memory generation prevents recursive inotify event loops, keeping the Trash browser completely calm and responsive.
                </p>
              </div>
            </div>
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
                  1. Dropping Files INTO Fyzenor
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
                  <strong>How it works:</strong> Fyzenor leverages <em>Bracketed Paste Mode</em> (ANSI escapes) to intercept files, URL-decodes percent encodings (converting <code>%20</code> back to spaces), tokenizes the file list, and triggers background AsyncTask jobs.
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
                  2. Dragging Files OUT of Fyzenor
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
                  <strong>How it works:</strong> Spawns a lightweight drag source utility asynchronously. The background job is completely decoupled from the TUI main loop, guaranteeing a fluid, freeze-free cursor response.
                </p>
              </div>
            </div>

            <h2 style={{ marginTop: "2.5rem" }}>Installing Drag &amp; Drop Dependencies</h2>
            <p>
              To support dragging files <strong>out</strong> of the terminal, you must install one of the supported drag-and-drop helper utilities on your system path. We recommend <strong><code>ripdrag</code></strong> (modern Rust rewrite) or <strong><code>dragon</code></strong> (classic GTK3 version).
            </p>

            <div style={{ marginTop: "1.5rem" }}>
              <h3>Option A: <code>ripdrag</code> (Recommended &mdash; Rust)</h3>
              <p>Install via your package manager or Rust Cargo:</p>
              <div className="code-container">
                <div className="code-header">
                  <div className="terminal-dots">
                    <span className="dot red" />
                    <span className="dot yellow" />
                    <span className="dot green" />
                  </div>
                  <span className="code-title">ripdrag installation</span>
                  <button
                    className="copy-btn"
                    onClick={() =>
                      handleCopy(
                        `# Cargo (Works on any Linux/macOS distro)\ncargo install ripdrag\n\n# Arch Linux\nyay -S ripdrag\n\n# Fedora\nsudo dnf install ripdrag`,
                        "ripdrag-install"
                      )
                    }
                  >
                    {copiedText === "ripdrag-install" ? <Check size={14} /> : <Copy size={14} />}
                    {copiedText === "ripdrag-install" ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="code-block">
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
            </div>

            <div style={{ marginTop: "2rem" }}>
              <h3>Option B: <code>dragon</code> (Alternative &mdash; GTK3)</h3>
              <p>Install via your package manager:</p>
              <div className="code-container">
                <div className="code-header">
                  <div className="terminal-dots">
                    <span className="dot red" />
                    <span className="dot yellow" />
                    <span className="dot green" />
                  </div>
                  <span className="code-title">dragon installation</span>
                  <button
                    className="copy-btn"
                    onClick={() =>
                      handleCopy(
                        `# Debian / Ubuntu\nsudo apt install dragon-drag-and-drop\n\n# Arch Linux\nyay -S dragon-drag-and-drop-git\n\n# Fedora\nsudo dnf install dragon`,
                        "dragon-install"
                      )
                    }
                  >
                    {copiedText === "dragon-install" ? <Check size={14} /> : <Copy size={14} />}
                    {copiedText === "dragon-install" ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="code-block">
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
                  Centered Tmux Popup Overlay
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
                  Full-Screen Console Fallback
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

            <h2 style={{ marginTop: "2.5rem" }}>Launching and Auto-Reload</h2>
            <div className="alert-info-box" style={{ marginBottom: "1rem" }}>
              <Info size={20} style={{ flexShrink: 0 }} />
              <div>
                <strong>How to Launch:</strong> Press <kbd>Ctrl+G</kbd> in normal mode.
              </div>
            </div>
            <p>
              Upon exit, Fyzenor triggers an automatic <strong>full cache invalidation and reload</strong> (<code>reloadAll()</code>). Any Git commits, branch checkouts, resets, or file additions performed inside Lazygit reflect instantly in the browser list panels without needing to press manual refresh.
            </p>

            <h2 style={{ marginTop: "2.5rem" }}>Installing Lazygit</h2>
            <p>
              To support this integration, ensure <code>lazygit</code> is installed and available in your system <code>PATH</code>:
            </p>
            <div className="code-container">
              <div className="code-header">
                <div className="terminal-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <span className="code-title">lazygit installation</span>
                <button
                  className="copy-btn"
                  onClick={() =>
                    handleCopy(
                      `# Debian / Ubuntu\nsudo add-apt-repository ppa:lazygit-team/release\nsudo apt update\nsudo apt install lazygit\n\n# Fedora / CentOS\nsudo dnf copr enable atim/lazygit -y\nsudo dnf install lazygit -y\n\n# Arch Linux\nyay -S lazygit\n\n# macOS (Homebrew)\nbrew install lazygit`,
                      "lazygit-install"
                    )
                  }
                >
                  {copiedText === "lazygit-install" ? <Check size={14} /> : <Copy size={14} />}
                  {copiedText === "lazygit-install" ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="code-block">
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
          </div>
        )}

        {activeTab === "gridview" && (
          <div className="animate-fade-in">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
              <h2>2D Grid View &amp; Visual Media Explorer (<code>V</code> / <code>Shift+V</code>)</h2>
              <span className="badge badge-green">v4.3.0</span>
              <span className="badge badge-cyan">NEW</span>
              <span className="badge badge-purple">GPU ACCELERATED</span>
              <span className="badge badge-yellow">STABLE</span>
            </div>
            <p>
              Fyzenor introduces a native <strong>2D Grid View</strong> mode designed for fast, modern, and beautiful visual exploration of wallpapers, photos, media archives, video clips, and directory hierarchies. 
              Pressing <kbd>V</kbd> or <kbd>Shift+V</kbd> (or clicking the <code>[󰕰 Grid: V]</code> header badge) instantly transitions the interface from the classic 3-column Miller browsing view into an adaptive 2D thumbnail card matrix.
            </p>

            <div className="alert-info-box" style={{ marginBottom: "1.5rem" }}>
              <Info size={20} style={{ flexShrink: 0 }} />
              <div>
                <strong>Single-Key Mode Switching:</strong> Press <kbd>V</kbd> (or <kbd>Shift+V</kbd>) in normal mode to toggle between 3-Column Miller View and 2D Grid View. You can also click the <code>[󰕰 Grid: V]</code> or <code>[󰕰 Columns: V]</code> badge in the header top bar.
              </div>
            </div>

            <div className="card-grid">
              <div className="card-premium">
                <div style={{ color: "var(--accent-green)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  1. Adaptive 2D Card Grid Geometry
                </div>
                <p>
                  Calculates columns dynamically based on terminal width (<code>cardW = 16</code>, <code>cardH = 7</code>). Cards pack neatly into rows and columns with responsive margin centering. When resizing the terminal, grid geometry recalculates seamlessly.
                </p>
              </div>

              <div className="card-premium">
                <div style={{ color: "var(--accent-purple)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  2. True Aspect-Ratio Letterbox Padding
                </div>
                <p>
                  High-resolution 280x160 RGBA Kitty image thumbnails are rendered with automatic aspect-ratio letterboxing and padding. Eliminates stretched or squished thumbnails across portrait photos, 16:9 widescreen wallpapers, 4:3 camera captures, and 1:1 square avatars.
                </p>
              </div>

              <div className="card-premium">
                <div style={{ color: "var(--accent-cyan)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  3. Universal 24-Bit TrueColor ANSI Fallback
                </div>
                <p>
                  In terminals without Kitty graphics support (e.g. Alacritty, Foot, xterm, macOS Terminal), Fyzenor automatically renders high-fidelity 4-row Unicode half-block (<code>▀</code>) thumbnail fallbacks using full 24-bit TrueColor RGB foreground and background styling (<code>\033[38;2;...;48;2;...m</code>).
                </p>
              </div>

              <div className="card-premium">
                <div style={{ color: "var(--accent-pink)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  4. High-Visibility Selection Prominence
                </div>
                <p>
                  Active cards feature bold double-line borders (<code>╔═◆═╗</code>), a centered cyan selection diamond (<code>◆</code>), and a full-width high-contrast filename selection pill (<code>▸ name ◂</code>). Inactive cards maintain subtle single borders (<code>┌─────┐</code>).
                </p>
              </div>

              <div className="card-premium">
                <div style={{ color: "var(--accent-yellow)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  5. Zero-Flicker Focus Transitions
                </div>
                <p>
                  Direct Kitty graphics placements are tracked per terminal cell with atomic DEC Mode 2026 frames (<code>\033[?2026h</code> / <code>\033[?2026l</code>). Shifting focus between the Bookmarks/Pinned menu (<kbd>Tab</kbd>) and the Grid View completely eliminates screen blanking and texture flashing.
                </p>
              </div>

              <div className="card-premium">
                <div style={{ color: "var(--accent-orange)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  6. Safe In-Memory Cache &amp; Trash Previews
                </div>
                <p>
                  Browsing <code>~/.cache/fyzenor/previews</code> or <code>~/.local/share/Trash</code> activates strict in-memory preview isolation. Fyzenor reads existing cache artifacts directly or renders in-memory without generating recursive disk files or triggering inotify reload loops.
                </p>
              </div>
            </div>

            <h2 style={{ marginTop: "2.5rem" }}>Visual Terminal Mockup: 2D Grid Mode</h2>
            <p>
              Here is how 2D Grid View displays media assets and directories in your terminal:
            </p>

            <div className="terminal-simulator" style={{ margin: "1.5rem 0", padding: "1.5rem", borderRadius: "12px", background: "var(--bg-card)", border: "1px solid var(--border-color)", fontFamily: "var(--font-mono)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>
                <span style={{ color: "var(--accent-green)", fontWeight: 700 }}>Fyzenor v4.3.0 — ~/Pictures/Wallpapers</span>
                <span style={{ background: "rgba(16, 185, 129, 0.2)", color: "var(--accent-green)", padding: "2px 8px", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 700 }}>󰕰 Grid: V</span>
              </div>

              {/* Grid cards visual representation */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem", marginBottom: "1rem" }}>
                {/* Active Card */}
                <div style={{ border: "2px solid var(--accent-cyan)", borderRadius: "8px", background: "rgba(6, 182, 212, 0.08)", padding: "8px", textAlign: "center", position: "relative" }}>
                  <div style={{ position: "absolute", top: "-10px", left: "50%", transform: "translateX(-50%)", background: "var(--bg-card)", padding: "0 6px", color: "var(--accent-cyan)", fontSize: "0.75rem", fontWeight: 800 }}>◆ ACTIVE</div>
                  <div style={{ height: "65px", background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px", border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden" }}>
                    <div style={{ width: "80%", height: "45px", background: "linear-gradient(45deg, #06b6d4, #8b5cf6)", borderRadius: "2px", opacity: 0.85, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", color: "#fff", fontWeight: 700 }}>
                      16:9 Letterbox
                    </div>
                  </div>
                  <div style={{ background: "var(--accent-cyan)", color: "#000", fontWeight: 800, padding: "2px 4px", borderRadius: "4px", fontSize: "0.75rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    ▸ cyberpunk_4k.png ◂
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "4px" }}>3840x2160 • 3.8 MB</div>
                </div>

                {/* Card 2: Normal Image */}
                <div style={{ border: "1px solid var(--border-color)", borderRadius: "8px", background: "var(--bg-surface)", padding: "8px", textAlign: "center" }}>
                  <div style={{ height: "65px", background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ width: "60%", height: "55px", background: "linear-gradient(45deg, #10b981, #059669)", borderRadius: "2px", opacity: 0.8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", color: "#fff", fontWeight: 700 }}>
                      4:3 Photo
                    </div>
                  </div>
                  <div style={{ color: "var(--text-primary)", fontWeight: 600, padding: "2px 4px", fontSize: "0.75rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    forest_mist.jpg
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "4px" }}>2048x1536 • 2.1 MB</div>
                </div>

                {/* Card 3: Directory */}
                <div style={{ border: "1px solid var(--border-color)", borderRadius: "8px", background: "var(--bg-surface)", padding: "8px", textAlign: "center" }}>
                  <div style={{ height: "65px", background: "rgba(6, 182, 212, 0.05)", borderRadius: "4px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "8px", border: "1px dashed var(--border-color)" }}>
                    <span style={{ fontSize: "1.8rem" }}>📁</span>
                    <span style={{ fontSize: "0.65rem", color: "var(--accent-cyan)", fontWeight: 700 }}>[DIR] 42 items</span>
                  </div>
                  <div style={{ color: "var(--accent-cyan)", fontWeight: 700, padding: "2px 4px", fontSize: "0.75rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Screenshots/
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "4px" }}>Directory • 42 items</div>
                </div>

                {/* Card 4: Normal Image */}
                <div style={{ border: "1px solid var(--border-color)", borderRadius: "8px", background: "var(--bg-surface)", padding: "8px", textAlign: "center" }}>
                  <div style={{ height: "65px", background: "linear-gradient(135deg, #31103f 0%, #701a75 100%)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ width: "50px", height: "50px", background: "linear-gradient(45deg, #f43f5e, #fb923c)", borderRadius: "2px", opacity: 0.85, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", color: "#fff", fontWeight: 700 }}>
                      1:1 Square
                    </div>
                  </div>
                  <div style={{ color: "var(--text-primary)", fontWeight: 600, padding: "2px 4px", fontSize: "0.75rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    retro_sunset.webp
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "4px" }}>1080x1080 • 850 KB</div>
                </div>
              </div>

              {/* Status footer line */}
              <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "0.5rem", display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                <span>[1/12] cyberpunk_4k.png • 3840x2160 • 3.8 MB</span>
                <span style={{ color: "var(--accent-cyan)" }}>[Kitty 280x160 RGBA letterboxed]</span>
              </div>
            </div>

            <h2 style={{ marginTop: "2.5rem" }}>Configuration Options (<code>config.toml</code>)</h2>
            <p>
              You can configure the initial launch view mode and toggle high-resolution thumbnail generation in <code>~/.config/fyzenor/config.toml</code>:
            </p>

            <div className="code-container">
              <div className="code-header">
                <div className="dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <span className="code-title">~/.config/fyzenor/config.toml</span>
                <button
                  className="copy-btn"
                  onClick={() =>
                    handleCopy(
                      `[general]\n# Set default view mode on boot:\n# "columns" = Standard 3-column Miller browsing\n# "grid"    = 2D visual thumbnail card grid\nview_mode = "columns"\n\n# Enable or disable high-resolution media thumbnails in 2D Grid View\n# (true = render Kitty/ANSI thumbnails; false = render fast icon cards)\ngrid_thumbnails = true`,
                      "grid-config"
                    )
                  }
                >
                  {copiedText === "grid-config" ? <Check size={14} /> : <Copy size={14} />}
                  {copiedText === "grid-config" ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="code-block">
                <code>
{`[general]
# Set default view mode on boot:
# "columns" = Standard 3-column Miller browsing
# "grid"    = 2D visual thumbnail card grid
view_mode = "columns"

# Enable or disable high-resolution media thumbnails in 2D Grid View
# (true = render Kitty/ANSI thumbnails; false = render fast icon cards)
grid_thumbnails = true`}
                </code>
              </pre>
            </div>

            <h2 style={{ marginTop: "2.5rem" }}>2D Directional Navigation &amp; Shortcuts</h2>
            <p>
              In 2D Grid View mode, navigation keys adapt automatically to 2D directional geometry:
            </p>

            <div className="table-container">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Action</th>
                    <th>Behavior in 2D Grid</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>h</code> / <code>←</code></td>
                    <td>Move Selection Left</td>
                    <td>Selects the card immediately to the left. If at the first column, wraps to previous row.</td>
                  </tr>
                  <tr>
                    <td><code>l</code> / <code>→</code></td>
                    <td>Move Selection Right</td>
                    <td>Selects the card immediately to the right. If at the last column, wraps to next row.</td>
                  </tr>
                  <tr>
                    <td><code>j</code> / <code>↓</code></td>
                    <td>Move Selection Down</td>
                    <td>Jumps selection down by one full grid row (increments index by <code>numColumns</code>).</td>
                  </tr>
                  <tr>
                    <td><code>k</code> / <code>↑</code></td>
                    <td>Move Selection Up</td>
                    <td>Jumps selection up by one full grid row (decrements index by <code>numColumns</code>).</td>
                  </tr>
                  <tr>
                    <td><code>Home</code> / <code>g</code></td>
                    <td>Jump to Start</td>
                    <td>Immediately focuses the first card in the directory.</td>
                  </tr>
                  <tr>
                    <td><code>End</code> / <code>G</code></td>
                    <td>Jump to End</td>
                    <td>Immediately focuses the last card in the directory.</td>
                  </tr>
                  <tr>
                    <td><code>PgUp</code> / <code>PgDn</code></td>
                    <td>Page Up / Down</td>
                    <td>Scrolls the grid viewport up or down by the number of visible rows.</td>
                  </tr>
                  <tr>
                    <td><code>Enter</code> / <code>l</code></td>
                    <td>Open / Enter</td>
                    <td>Opens the highlighted file in default editor/viewer, or navigates into subfolder.</td>
                  </tr>
                  <tr>
                    <td><code>Backspace</code> / <code>h</code></td>
                    <td>Parent Directory</td>
                    <td>Navigates up to parent directory while staying in 2D Grid View.</td>
                  </tr>
                  <tr>
                    <td><code>V</code> / <code>Shift+V</code></td>
                    <td>Toggle View Mode</td>
                    <td>Switches back to classic 3-column Miller browsing mode.</td>
                  </tr>
                  <tr>
                    <td><code>Left Click</code></td>
                    <td>Mouse Selection</td>
                    <td>Directly selects any clicked card in the grid.</td>
                  </tr>
                  <tr>
                    <td><code>Double Click</code></td>
                    <td>Mouse Activation</td>
                    <td>Opens the clicked file or enters the clicked folder immediately.</td>
                  </tr>
                  <tr>
                    <td><code>Mouse Wheel</code></td>
                    <td>Smooth Grid Scroll</td>
                    <td>Scrolls the card grid smoothly up or down.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "neovim" && (
          <div className="animate-fade-in">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <h2>Neovim Native Integration (<code>fyzenor.nvim</code>)</h2>
              <span className="badge badge-green">v4.3.0</span>
              <span className="badge badge-cyan">STABLE</span>
            </div>
            <p>
              Fyzenor includes an official, native <strong>Neovim integration plugin</strong> inspired by <em>yazi.nvim</em>. 
              It provides an ultra-fast, modal file manager running inside a centered floating terminal window with background backdrop dimming, 
              seamless <code>netrw</code> directory hijacking, multi-file buffer loading, split/tab window placement, and automatic <code>cwd</code> synchronization.
            </p>

            <div className="alert-info-box" style={{ marginBottom: "1.5rem" }}>
              <Info size={20} style={{ flexShrink: 0 }} />
              <div>
                <strong>v4.3.0 Release:</strong> The Neovim plugin is included natively in the <code>main</code> branch of the repository. Works out of the box with any package manager without needing to pin a branch.
              </div>
            </div>

            <div className="card-grid">
              <div className="card-premium">
                <div style={{ color: "var(--accent-green)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  1. Centered Floating Terminal
                </div>
                <p>
                  Spawns in a centered floating window with configurable dimensions (default 90% width, 85% height), customizable border styles (<code>rounded</code>, <code>single</code>, <code>double</code>), and background dimming.
                </p>
              </div>

              <div className="card-premium">
                <div style={{ color: "var(--accent-purple)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  2. Netrw Directory Hijacking
                </div>
                <p>
                  Optionally replaces default <code>netrw</code> when opening directory paths (e.g. <code>nvim .</code> or <code>:edit src/</code>). Seamlessly swaps directory buffers with an interactive Fyzenor session.
                </p>
              </div>

              <div className="card-premium">
                <div style={{ color: "var(--accent-cyan)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  3. Multi-Buffer &amp; Split Loading
                </div>
                <p>
                  Select multiple files with <kbd>Tab</kbd> or <kbd>Space</kbd>. Pressing <kbd>Enter</kbd> loads all chosen files into Neovim's buffer list (<code>buflisted = true</code>) and populates the argument list (<code>:args</code>). Or tile them across vertical (<kbd>Ctrl+V</kbd>) or horizontal (<kbd>Ctrl+X</kbd>) splits!
                </p>
              </div>

              <div className="card-premium">
                <div style={{ color: "var(--accent-yellow)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  4. CWD Auto-Synchronization
                </div>
                <p>
                  When enabled (<code>change_neovim_cwd_on_close = true</code>), closing Fyzenor automatically updates Neovim's working directory (<code>:cd</code>) to match the last folder you navigated to in Fyzenor.
                </p>
              </div>
            </div>

            <h2 style={{ marginTop: "2.5rem" }}>Installation &amp; Setup</h2>
            <p>Install <code>Bimbok/fyzenor</code> using your favorite Neovim package manager:</p>

            <h3 style={{ marginTop: "1.5rem" }}>Using <code>lazy.nvim</code> (Recommended)</h3>
            <div className="code-container">
              <div className="code-header">
                <div className="terminal-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <span className="code-title">~/.config/nvim/lua/plugins/fyzenor.lua</span>
                <button
                  onClick={() =>
                    handleCopy(
                      `-- ~/.config/nvim/lua/plugins/fyzenor.lua
return {
  "Bimbok/fyzenor",
  event = "VeryLazy",
  opts = {
    open_for_directories = true,
    change_neovim_cwd_on_close = true,
    window_opts = {
      border = "rounded",
      width_ratio = 0.90,
      height_ratio = 0.85,
    },
  },
  keys = {
    { "<leader>e", "<cmd>Fyzenor<cr>", desc = "Open Fyzenor (current file)" },
    { "<leader>E", "<cmd>Fyzenor cwd<cr>", desc = "Open Fyzenor (project root)" },
    { "<leader>fe", "<cmd>FyzenorToggle<cr>", desc = "Toggle Fyzenor" },
  },
}`,
                      "lazy-nvim"
                    )
                  }
                  className="copy-btn"
                >
                  {copiedText === "lazy-nvim" ? <Check size={14} /> : <Copy size={14} />}
                  {copiedText === "lazy-nvim" ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="code-block">
                <code>
{`-- ~/.config/nvim/lua/plugins/fyzenor.lua
return {
  "Bimbok/fyzenor",
  event = "VeryLazy",
  opts = {
    open_for_directories = true,
    change_neovim_cwd_on_close = true,
    window_opts = {
      border = "rounded",
      width_ratio = 0.90,
      height_ratio = 0.85,
    },
  },
  keys = {
    { "<leader>e", "<cmd>Fyzenor<cr>", desc = "Open Fyzenor (current file)" },
    { "<leader>E", "<cmd>Fyzenor cwd<cr>", desc = "Open Fyzenor (project root)" },
    { "<leader>fe", "<cmd>FyzenorToggle<cr>", desc = "Toggle Fyzenor" },
  },
}`}
                </code>
              </pre>
            </div>

            <h3 style={{ marginTop: "1.5rem" }}>Using <code>packer.nvim</code></h3>
            <div className="code-container">
              <div className="code-header">
                <div className="terminal-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <span className="code-title">packer.nvim specification</span>
                <button
                  onClick={() =>
                    handleCopy(
                      `use({
  "Bimbok/fyzenor",
  config = function()
    require("fyzenor").setup({
      open_for_directories = true,
      change_neovim_cwd_on_close = true,
    })
  end,
})`,
                      "packer-nvim"
                    )
                  }
                  className="copy-btn"
                >
                  {copiedText === "packer-nvim" ? <Check size={14} /> : <Copy size={14} />}
                  {copiedText === "packer-nvim" ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="code-block">
                <code>
{`use({
  "Bimbok/fyzenor",
  config = function()
    require("fyzenor").setup({
      open_for_directories = true,
      change_neovim_cwd_on_close = true,
    })
  end,
})`}
                </code>
              </pre>
            </div>

            <h3 style={{ marginTop: "1.5rem" }}>Using <code>vim-plug</code></h3>
            <div className="code-container">
              <div className="code-header">
                <div className="terminal-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <span className="code-title">vim-plug specification</span>
                <button
                  onClick={() =>
                    handleCopy(
                      `Plug 'Bimbok/fyzenor'\n\n" Inside init.lua:\nrequire("fyzenor").setup({\n  open_for_directories = true,\n  change_neovim_cwd_on_close = true,\n})`,
                      "vimplug-nvim"
                    )
                  }
                  className="copy-btn"
                >
                  {copiedText === "vimplug-nvim" ? <Check size={14} /> : <Copy size={14} />}
                  {copiedText === "vimplug-nvim" ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="code-block">
                <code>
{`Plug 'Bimbok/fyzenor'

" Inside init.lua:
require("fyzenor").setup({
  open_for_directories = true,
  change_neovim_cwd_on_close = true,
})`}
                </code>
              </pre>
            </div>

            <h2 style={{ marginTop: "2.5rem" }}>In-Terminal Floating Keymaps</h2>
            <p>When the Fyzenor floating window is open inside Neovim, the following dedicated shortcuts are active:</p>

            <div className="table-container" style={{ marginTop: "1rem" }}>
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Action</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><kbd>Enter</kbd></td>
                    <td><strong>Open in Active Buffer</strong></td>
                    <td>Opens the highlighted file in the active window. If multiple files were selected, opens the first file and registers all selected files in Neovim's <code>:args</code> list.</td>
                  </tr>
                  <tr>
                    <td><kbd>Ctrl+V</kbd></td>
                    <td><strong>Open in Vertical Split</strong></td>
                    <td>Opens chosen files side-by-side using vertical splits (<code>:vsplit</code>). Tiles all selected files simultaneously.</td>
                  </tr>
                  <tr>
                    <td><kbd>Ctrl+X</kbd></td>
                    <td><strong>Open in Horizontal Split</strong></td>
                    <td>Opens chosen files in horizontal splits (<code>:split</code>).</td>
                  </tr>
                  <tr>
                    <td><kbd>Ctrl+T</kbd></td>
                    <td><strong>Open in New Tab(s)</strong></td>
                    <td>Opens each chosen file in its own dedicated Neovim tab page (<code>:tabedit</code>).</td>
                  </tr>
                  <tr>
                    <td><kbd>Ctrl+Q</kbd></td>
                    <td><strong>Send to Quickfix</strong></td>
                    <td>Populates Neovim's quickfix list (<code>setqflist</code>) with all chosen files and opens the quickfix window (<code>:copen</code>).</td>
                  </tr>
                  <tr>
                    <td><kbd>Ctrl+Y</kbd></td>
                    <td><strong>Yank Relative Paths</strong></td>
                    <td>Copies the relative path(s) of highlighted/selected items to both the system clipboard (<code>+</code>) and default register (<code>"</code>).</td>
                  </tr>
                  <tr>
                    <td><kbd>Ctrl+F</kbd></td>
                    <td><strong>Live Grep in Directory</strong></td>
                    <td>Closes the Fyzenor popup and immediately launches live grep (via Telescope, fzf-lua, or vimgrep) in the current directory.</td>
                  </tr>
                  <tr>
                    <td><kbd>Tab</kbd> / <kbd>Space</kbd></td>
                    <td><strong>Toggle Selection &amp; Down</strong></td>
                    <td>Toggles multi-selection for the highlighted file and advances cursor to the next item.</td>
                  </tr>
                  <tr>
                    <td><kbd>Shift+Tab</kbd></td>
                    <td><strong>Toggle Selection &amp; Up</strong></td>
                    <td>Toggles multi-selection for the highlighted file and moves cursor up.</td>
                  </tr>
                  <tr>
                    <td><kbd>v</kbd></td>
                    <td><strong>Toggle Selection (In-Place)</strong></td>
                    <td>Toggles multi-selection without moving the cursor.</td>
                  </tr>
                  <tr>
                    <td><kbd>q</kbd></td>
                    <td><strong>Close / Cancel</strong></td>
                    <td>Dismisses the Fyzenor floating window without opening files.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 style={{ marginTop: "2.5rem" }}>Complete Configuration Options</h2>
            <p>All options supported by <code>require("fyzenor").setup(opts)</code>:</p>

            <div className="table-container" style={{ marginTop: "1rem" }}>
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Option</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>fyzenor_path</code></td>
                    <td><code>string</code></td>
                    <td><code>"fyzenor"</code></td>
                    <td>Executable name or absolute path to the Fyzenor binary. Auto-detects <code>~/.local/bin/fyzenor</code>.</td>
                  </tr>
                  <tr>
                    <td><code>open_for_directories</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Hijacks directory buffers when opening folders in Neovim (e.g. <code>nvim .</code>), replacing netrw.</td>
                  </tr>
                  <tr>
                    <td><code>change_neovim_cwd_on_close</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Synchronizes Neovim working directory (<code>:cd</code>) to the last directory visited in Fyzenor upon closing.</td>
                  </tr>
                  <tr>
                    <td><code>open_file_default_command</code></td>
                    <td><code>string</code></td>
                    <td><code>"edit"</code></td>
                    <td>Default command used when pressing Enter: <code>"edit"</code>, <code>"vsplit"</code>, <code>"split"</code>, or <code>"tabedit"</code>.</td>
                  </tr>
                  <tr>
                    <td><code>window_opts.border</code></td>
                    <td><code>string</code></td>
                    <td><code>"rounded"</code></td>
                    <td>Floating window border style: <code>"rounded"</code>, <code>"single"</code>, <code>"double"</code>, <code>"solid"</code>, <code>"shadow"</code>, or <code>"none"</code>.</td>
                  </tr>
                  <tr>
                    <td><code>window_opts.width_ratio</code></td>
                    <td><code>number</code></td>
                    <td><code>0.90</code></td>
                    <td>Width of the popup window relative to Neovim screen width (0.1 to 1.0).</td>
                  </tr>
                  <tr>
                    <td><code>window_opts.height_ratio</code></td>
                    <td><code>number</code></td>
                    <td><code>0.85</code></td>
                    <td>Height of the popup window relative to Neovim screen height (0.1 to 1.0).</td>
                  </tr>
                  <tr>
                    <td><code>window_opts.zindex</code></td>
                    <td><code>integer</code></td>
                    <td><code>50</code></td>
                    <td>Z-index layer order for the floating window.</td>
                  </tr>
                  <tr>
                    <td><code>hooks.on_file_opened</code></td>
                    <td><code>function(path)</code></td>
                    <td><code>nil</code></td>
                    <td>Custom Lua callback hook invoked whenever a file is selected and opened.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 style={{ marginTop: "2.5rem" }}>Ex Commands Reference</h2>
            <div className="table-container" style={{ marginTop: "1rem" }}>
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Command</th>
                    <th>Arguments</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>:Fyzenor</code></td>
                    <td><code>[path]</code> (optional)</td>
                    <td>Opens Fyzenor. If a path or <code>"cwd"</code> is provided, opens there; otherwise highlights current buffer's file.</td>
                  </tr>
                  <tr>
                    <td><code>:FyzenorToggle</code></td>
                    <td><code>[path]</code> (optional)</td>
                    <td>Toggles the Fyzenor floating window (opens if closed, closes if currently open).</td>
                  </tr>
                  <tr>
                    <td><code>:FyzenorCwd</code></td>
                    <td>None</td>
                    <td>Opens Fyzenor explicitly rooted at Neovim's current project working directory (<code>getcwd()</code>).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "plugins" && (
          <div className="animate-fade-in">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <h2>Embedded Lua Plugin Engine</h2>
              <span className="badge badge-green">v4.3.0</span>
              <span className="badge badge-cyan">STABLE</span>
            </div>
            <p>
              Fyzenor includes an embedded <strong>Lua Plugin Engine</strong> (inspired by <em>Yazi</em> and <em>Neovim</em>). 
              This allows community developers and power users to build custom keybindings, interactive fast-jumps, status bar extensions, 
              and custom file previewers <strong>without modifying or recompiling C++ source code</strong>.
            </p>

            <div className="alert-info-box" style={{ marginBottom: "1.5rem" }}>
              <Info size={20} style={{ flexShrink: 0 }} />
              <div>
                <strong>Zero-Recompile Architecture:</strong> Plugins execute inside an in-memory Lua state initialized on application boot. Drop any script into <code>~/.config/fyzenor/plugins/&lt;plugin_name&gt;/init.lua</code> and Fyzenor automatically discovers and binds it.
              </div>
            </div>

            <div className="card-grid">
              <div className="card-premium">
                <div style={{ color: "var(--accent-green)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  1. Zero-Recompile Extensibility
                </div>
                <p>
                  Plugins run in-memory using an embedded Lua state. Drop any Lua script into <code>~/.config/fyzenor/plugins/&lt;plugin_name&gt;/init.lua</code> and Fyzenor will discover and execute it automatically upon boot.
                </p>
              </div>

              <div className="card-premium">
                <div style={{ color: "var(--accent-purple)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  2. Hotkeys, Previews &amp; UI Prompts
                </div>
                <p>
                  Plugins can map custom hotkeys (e.g., <code>Ctrl+S</code>, <code>z</code>, <code>Alt+Z</code>), register custom text previewers for unsupported file extensions, open modal text prompts, and run async shell utilities.
                </p>
              </div>

              <div className="card-premium">
                <div style={{ color: "var(--accent-cyan)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  3. Official Plugins Repository
                </div>
                <p>
                  Browse and install ready-made plugins from the official community repository: <a href="https://github.com/Bimbok/fyzenor-plugins" target="_blank" rel="noreferrer" style={{ color: "var(--accent-cyan)", fontWeight: 600 }}>github.com/Bimbok/fyzenor-plugins</a>.
                </p>
              </div>

              <div className="card-premium">
                <div style={{ color: "var(--accent-yellow)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  4. Thread-Safe Sandbox
                </div>
                <p>
                  UI operations, directory changes, and status updates communicate through safe mutex-locked C++ API boundaries, ensuring plugins never crash the main rendering loop.
                </p>
              </div>
            </div>

            <h2 style={{ marginTop: "2.5rem" }}>Official Plugins Repository</h2>
            <p>
              The official Fyzenor plugins are maintained in a dedicated repository: <a href="https://github.com/Bimbok/fyzenor-plugins" target="_blank" rel="noreferrer" style={{ color: "var(--accent-cyan)", fontWeight: 600 }}>github.com/Bimbok/fyzenor-plugins</a>.
            </p>
            <div className="code-container">
              <div className="code-header">
                <div className="terminal-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <span className="code-title">clone official plugins</span>
                <button
                  className="copy-btn"
                  onClick={() =>
                    handleCopy(
                      "git clone https://github.com/Bimbok/fyzenor-plugins.git ~/.config/fyzenor/plugins",
                      "clone-plugins"
                    )
                  }
                >
                  {copiedText === "clone-plugins" ? <Check size={14} /> : <Copy size={14} />}
                  {copiedText === "clone-plugins" ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="code-block">
                <code>
{`# Install all official plugins via single-command clone
git clone https://github.com/Bimbok/fyzenor-plugins.git ~/.config/fyzenor/plugins`}
                </code>
              </pre>
            </div>

            <h2 style={{ marginTop: "2.5rem" }}>Included Official Plugins</h2>
            <p>Fyzenor official plugins available in <code>~/.config/fyzenor/plugins/</code>:</p>

            <div className="table-container" style={{ marginTop: "1rem" }}>
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Plugin</th>
                    <th>Location</th>
                    <th>Hotkeys</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Git Status &amp; Staging</strong></td>
                    <td><code>plugins/git/init.lua</code></td>
                    <td><kbd>Ctrl+B</kbd> / <kbd>Ctrl+S</kbd> / <kbd>Ctrl+K</kbd></td>
                    <td>Parses Git branch status, toggles <code>git add</code> / <code>git restore --staged</code> for highlighted files, and displays instant <code>git diff</code> stats in the status bar.</td>
                  </tr>
                  <tr>
                    <td><strong>Zoxide Fast Jump</strong></td>
                    <td><code>plugins/zoxide/init.lua</code></td>
                    <td><kbd>z</kbd> / <kbd>Alt+Z</kbd></td>
                    <td>Opens a modal query prompt and queries <code>zoxide query &lt;keyword&gt;</code> to jump directly to your most used directories.</td>
                  </tr>
                  <tr>
                    <td><strong>JSON Custom Previewer</strong></td>
                    <td><code>plugins/json_previewer/init.lua</code></td>
                    <td>Automatic</td>
                    <td>Overrides standard text previews for <code>.json</code> files with formatted layout streams.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 style={{ marginTop: "2.5rem" }}>Complete Lua C++ API Reference</h2>
            <p>The global <code>fyzenor</code> Lua module exposes the following C++ engine bindings:</p>

            <div className="table-container" style={{ marginTop: "1rem" }}>
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Lua Method</th>
                    <th>Return Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>fyzenor.get_current_file()</code></td>
                    <td><code>table / nil</code></td>
                    <td>Returns table containing <code>{`{ path, name, extension, size, is_dir, is_symlink }`}</code> for the highlighted item.</td>
                  </tr>
                  <tr>
                    <td><code>fyzenor.get_selected_files()</code></td>
                    <td><code>array of tables</code></td>
                    <td>Returns list of file tables for all multi-selected items in the active pane.</td>
                  </tr>
                  <tr>
                    <td><code>fyzenor.get_current_path()</code></td>
                    <td><code>string</code></td>
                    <td>Returns absolute path string of the current active directory.</td>
                  </tr>
                  <tr>
                    <td><code>fyzenor.set_status(message)</code></td>
                    <td><code>void</code></td>
                    <td>Updates the bottom status bar message text.</td>
                  </tr>
                  <tr>
                    <td><code>fyzenor.prompt(title, defaultVal)</code></td>
                    <td><code>string</code></td>
                    <td>Spawns a centered modal input dialog window in TUI and returns user typed text.</td>
                  </tr>
                  <tr>
                    <td><code>fyzenor.change_directory(path)</code></td>
                    <td><code>void</code></td>
                    <td>Programmatically navigates Fyzenor to target path.</td>
                  </tr>
                  <tr>
                    <td><code>fyzenor.shell_output(cmd)</code></td>
                    <td><code>string</code></td>
                    <td>Runs shell command synchronously and returns stdout output text.</td>
                  </tr>
                  <tr>
                    <td><code>fyzenor.exec(cmd)</code></td>
                    <td><code>void</code></td>
                    <td>Forks and executes shell command asynchronously in the background.</td>
                  </tr>
                  <tr>
                    <td><code>fyzenor.read_file(path, maxLines)</code></td>
                    <td><code>string / nil</code></td>
                    <td>Reads up to <code>maxLines</code> from target file.</td>
                  </tr>
                  <tr>
                    <td><code>fyzenor.reload()</code></td>
                    <td><code>void</code></td>
                    <td>Triggers directory cache invalidation and UI reloads.</td>
                  </tr>
                  <tr>
                    <td><code>fyzenor.add_keymap(key, function)</code></td>
                    <td><code>void</code></td>
                    <td>Maps key combination (e.g. <code>"Ctrl+S"</code>, <code>"z"</code>, <code>"Alt+Z"</code>) to a Lua callback function.</td>
                  </tr>
                  <tr>
                    <td><code>fyzenor.register_previewer(ext, function)</code></td>
                    <td><code>void</code></td>
                    <td>Registers a custom preview formatter callback for file extension <code>ext</code>.</td>
                  </tr>
                  <tr>
                    <td><code>fyzenor.get_version()</code></td>
                    <td><code>string</code></td>
                    <td>Returns the current Fyzenor engine version (e.g. <code>"4.3.0"</code>).</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 style={{ marginTop: "2.5rem" }}>Real-World Plugin Example: Interactive Zoxide Fast Jump</h2>
            <p>Create a file at <code>~/.config/fyzenor/plugins/zoxide/init.lua</code>:</p>

            <div className="code-container">
              <div className="code-header">
                <div className="terminal-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <span className="code-title">~/.config/fyzenor/plugins/zoxide/init.lua</span>
                <button
                  className="copy-btn"
                  onClick={() =>
                    handleCopy(
                      `-- Zoxide Fast Jump Plugin (~/.config/fyzenor/plugins/zoxide/init.lua)
fyzenor.add_keymap("z", function()
    local query = fyzenor.prompt("Zoxide Jump: ", "")
    if not query or query == "" then
        return
    end

    local target = fyzenor.shell_output("zoxide query " .. query .. " 2>/dev/null")
    if target and target ~= "" then
        -- Trim trailing newline
        target = target:gsub("%s+$", "")
        fyzenor.change_directory(target)
        fyzenor.set_status("Jumped to " .. target)
    else
        fyzenor.set_status("No match found for '" .. query .. "'")
    end
end)`,
                      "zoxide-plugin"
                    )
                  }
                >
                  {copiedText === "zoxide-plugin" ? <Check size={14} /> : <Copy size={14} />}
                  {copiedText === "zoxide-plugin" ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="code-block">
                <code>
{`-- Zoxide Fast Jump Plugin (~/.config/fyzenor/plugins/zoxide/init.lua)
fyzenor.add_keymap("z", function()
    local query = fyzenor.prompt("Zoxide Jump: ", "")
    if not query or query == "" then
        return
    end

    local target = fyzenor.shell_output("zoxide query " .. query .. " 2>/dev/null")
    if target and target ~= "" then
        -- Trim trailing newline
        target = target:gsub("%s+$", "")
        fyzenor.change_directory(target)
        fyzenor.set_status("Jumped to " .. target)
    else
        fyzenor.set_status("No match found for '" .. query .. "'")
    end
end)`}
                </code>
              </pre>
            </div>
          </div>
        )}

        {activeTab === "diskusage" && (
          <div className="animate-fade-in">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <h2>Visual Disk Usage &amp; Bar Graph Mode (<code>U</code>)</h2>
              <span className="badge badge-green">v4.3.0</span>
              <span className="badge badge-cyan">STABLE</span>
            </div>
            <p>
              Fyzenor features a built-in <code>ncdu</code>-style <strong>Visual Disk Usage Analyzer</strong>. 
              Pressing a single key (<kbd>U</kbd>) transforms the file listing into a rich storage breakdown with proportional unicode bar graphs, 
              real-time background folder size calculation, and automatic size sorting.
            </p>

            <div className="alert-info-box" style={{ marginBottom: "1.5rem" }}>
              <Info size={20} style={{ flexShrink: 0 }} />
              <div>
                <strong>How to Toggle:</strong> Press <kbd>U</kbd> in normal mode. Pressing <kbd>U</kbd> again returns instantly to standard file browsing.
              </div>
            </div>

            <div className="card-grid">
              <div className="card-premium">
                <div style={{ color: "var(--accent-green)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  1. Proportional Visual Bar Graphs
                </div>
                <p>
                  Every directory and file displays high-contrast unicode bar graphs (e.g. <code>██████░░░░ 60%</code>) dynamically scaled relative to the largest item in the current directory.
                </p>
              </div>

              <div className="card-premium">
                <div style={{ color: "var(--accent-purple)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  2. Non-Blocking Background Scanning
                </div>
                <p>
                  Folder sizes are calculated recursively on dedicated worker threads. Massive directories (12GB+) calculate smoothly in the background while you continue navigating with zero UI latency.
                </p>
              </div>

              <div className="card-premium">
                <div style={{ color: "var(--accent-cyan)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  3. Circular Symlink Protection
                </div>
                <p>
                  The traversal algorithm actively tracks visited inodes and excludes symlinked directories from recursive size sums, preventing infinite loops and filesystem hangs.
                </p>
              </div>

              <div className="card-premium">
                <div style={{ color: "var(--accent-yellow)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  4. Interactive Storage Drill-Down
                </div>
                <p>
                  Spot a bloated folder? Press <kbd>Enter</kbd> or <kbd>l</kbd> to step inside, press <kbd>U</kbd> to analyze its subfolders, and press <kbd>d</kbd> to trash or delete bloated caches and <code>node_modules</code>.
                </p>
              </div>
            </div>

            <h2 style={{ marginTop: "2.5rem" }}>Visual Breakdown Example</h2>
            <div className="terminal-simulator" style={{ margin: "1.5rem 0", padding: "1.5rem", borderRadius: "12px", background: "var(--bg-card)", border: "1px solid var(--border-color)", fontFamily: "var(--font-mono)" }}>
              <div style={{ color: "var(--accent-cyan)", fontWeight: 700, marginBottom: "1rem" }}>
                󰋚 Active Mode: Visual Disk Usage (Total: 14.8 GB)
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.9rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span> node_modules</span>
                  <span style={{ color: "var(--accent-pink)" }}>██████████ 100% (8.4 GB)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span> .cache</span>
                  <span style={{ color: "var(--accent-yellow)" }}>█████░░░░░  52% (4.4 GB)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span> build</span>
                  <span style={{ color: "var(--accent-green)" }}>██░░░░░░░░  18% (1.5 GB)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span> dist</span>
                  <span style={{ color: "var(--accent-cyan)" }}>█░░░░░░░░░   6% (480 MB)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span> bundle.js</span>
                  <span style={{ color: "var(--text-muted)" }}>░░░░░░░░░░   1% (18 MB)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "modals" && (
          <div className="animate-fade-in">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <h2>Unified Creation &amp; Dynamic Modals (<code>n</code> / <code>r</code>)</h2>
              <span className="badge badge-green">v4.3.0</span>
              <span className="badge badge-cyan">STABLE</span>
            </div>
            <p>
              Fyzenor introduces a completely modernized modal input system for file creation (<kbd>n</kbd>), renaming (<kbd>r</kbd>), and search. 
              Featuring real-time dynamic Nerd Font icon and color morphing, centered dialog placement with active theme accent borders, 
              full multi-byte UTF-8 codepoint navigation, and native clipboard pasting.
            </p>

            <div className="card-grid">
              <div className="card-premium">
                <div style={{ color: "var(--accent-green)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  1. Unified 'n' Creation
                </div>
                <p>
                  No need for separate shortcuts for files and folders! Press <kbd>n</kbd> to open the creation dialog. 
                  Typing a trailing slash (<code>/</code>) dynamically converts the prompt into folder creation mode instantly.
                </p>
              </div>

              <div className="card-premium">
                <div style={{ color: "var(--accent-yellow)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  2. Real-Time Extension Morphing
                </div>
                <p>
                  As you type file extensions, the prompt icon morphs dynamically: generic file (<code style={{ color: "var(--accent-yellow)" }}></code>), 
                  C/C++ (<code style={{ color: "var(--accent-green)" }}></code>/<code></code>), Python (<code style={{ color: "var(--accent-green)" }}></code>), 
                  Rust (<code style={{ color: "var(--accent-orange)" }}></code>), TypeScript (<code style={{ color: "var(--accent-cyan)" }}></code>), 
                  JSON (<code style={{ color: "var(--accent-orange)" }}></code>), Markdown (<code style={{ color: "var(--accent-cyan)" }}></code>), or folder (<code style={{ color: "var(--accent-cyan)" }}></code>).
                </p>
              </div>

              <div className="card-premium">
                <div style={{ color: "var(--accent-cyan)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  3. Centered Modals &amp; Active Accent Borders
                </div>
                <p>
                  Dialogs are centered both horizontally and vertically on screen. Borders dynamically adopt your theme's <code>active_border</code> or <code>pin_border</code> color, and cleanly re-center on terminal resize (<code>KEY_RESIZE</code>).
                </p>
              </div>

              <div className="card-premium">
                <div style={{ color: "var(--accent-pink)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  4. Multi-Byte UTF-8 Codepoint Navigation
                </div>
                <p>
                  Arrow navigation, Backspace, and Delete operate on full UTF-8 codepoints rather than raw bytes. Emojis (, ) and non-ASCII characters (Japanese, Chinese, Cyrillic) edit smoothly without screen corruption or partial-byte artifacts.
                </p>
              </div>

              <div className="card-premium">
                <div style={{ color: "var(--accent-purple)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  5. Universal Clipboard Pasting
                </div>
                <p>
                  Paste file paths and text directly into any prompt using <kbd>Ctrl+V</kbd>, <kbd>Ctrl+Shift+V</kbd>, or terminal bracketed paste mode sequences.
                </p>
              </div>

              <div className="card-premium">
                <div style={{ color: "var(--accent-orange)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  6. Smart Nested Path Creation
                </div>
                <p>
                  Type deep nested paths like <code>src/components/ui/Button.tsx</code> and Fyzenor recursively creates missing parent folders (<code>mkdir -p</code>) while automatically selecting the newly created file upon completion.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "terminals" && (
          <div className="animate-fade-in">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <h2>Terminal Compatibility &amp; Truecolor Engine</h2>
              <span className="badge badge-green">v4.3.0</span>
              <span className="badge badge-cyan">STABLE</span>
            </div>
            <p>
              Fyzenor guarantees <strong>pixel-perfect consistency</strong> across every major terminal emulator. 
              Whether running in Kitty, Ghostty, WezTerm, Alacritty, Foot, Tmux, or inside the Neovim built-in terminal, 
              colors, borders, and image previews render identically.
            </p>

            <div className="card-grid">
              <div className="card-premium">
                <div style={{ color: "var(--accent-green)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  1. Universal 256-Color Engine (hexTo256)
                </div>
                <p>
                  Uses a perceptual weighted Euclidean distance formula in RGB color space to match hex color codes to the closest ANSI 256 palette index. Ensures beautiful theme colors inside Tmux and Neovim terminals.
                </p>
              </div>

              <div className="card-premium">
                <div style={{ color: "var(--accent-cyan)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  2. Native Truecolor (24-bit RGB)
                </div>
                <p>
                  Detects <code>COLORTERM=truecolor</code> and <code>24bit</code> to emit direct 24-bit ANSI escapes (<code>\033[38;2;R;G;Bm</code>) for rich gradients and subtle theme tones.
                </p>
              </div>

              <div className="card-premium">
                <div style={{ color: "var(--accent-purple)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  3. Atomic Synchronized Updates (DEC 2026)
                </div>
                <p>
                  Implements the DEC 2026 synchronized update protocol (<code>\033[?2026h</code> and <code>\033[?2026l</code>) supported by Kitty, Ghostty, and WezTerm. Redraws frames atomically, eliminating preview tearing and flicker during fast scrolling.
                </p>
              </div>

              <div className="card-premium">
                <div style={{ color: "var(--accent-yellow)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  4. Pristine Terminal State Restoration
                </div>
                <p>
                  Properly cleans up alternate screens, mouse tracking (<code>\033[?1000l</code>), cursor visibility, and bracketed paste modes upon exit or process suspension (<kbd>Ctrl+Z</kbd>).
                </p>
              </div>
            </div>

            <h2 style={{ marginTop: "2.5rem" }}>Verified Terminal Matrix</h2>
            <div className="table-container" style={{ marginTop: "1rem" }}>
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Terminal</th>
                    <th>Color Support</th>
                    <th>Image Protocol</th>
                    <th>Flicker-Free Sync</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Ghostty</strong></td>
                    <td>24-bit Truecolor</td>
                    <td>Kitty Graphics Protocol</td>
                    <td>DEC 2026 Synchronized</td>
                  </tr>
                  <tr>
                    <td><strong>Kitty</strong></td>
                    <td>24-bit Truecolor</td>
                    <td>Kitty Graphics Protocol</td>
                    <td>DEC 2026 Synchronized</td>
                  </tr>
                  <tr>
                    <td><strong>WezTerm</strong></td>
                    <td>24-bit Truecolor</td>
                    <td>Kitty Graphics Protocol / Sixel</td>
                    <td>DEC 2026 Synchronized</td>
                  </tr>
                  <tr>
                    <td><strong>Alacritty</strong></td>
                    <td>24-bit Truecolor</td>
                    <td>Chafa / Überzug fallback</td>
                    <td>Standard ANSI buffer</td>
                  </tr>
                  <tr>
                    <td><strong>Neovim Terminal</strong></td>
                    <td>256 Colors / Truecolor</td>
                    <td>Text &amp; Code Syntax</td>
                    <td>Terminal PTY Sync</td>
                  </tr>
                  <tr>
                    <td><strong>Tmux Multiplexer</strong></td>
                    <td>Universal 256 Matching</td>
                    <td>Passthrough enabled</td>
                    <td>Tmux Window Buffer</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "mouse" && (
          <div className="animate-fade-in">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <h2>Mouse Controls &amp; Pane-Aware Scrolling</h2>
              <span className="badge badge-green">v4.3.0</span>
              <span className="badge badge-cyan">STABLE</span>
            </div>
            <p>
              Fyzenor delivers a fluid mouse workflow tailored for modern terminal emulators. 
              Featuring <strong>pane-aware mouse wheel hovering</strong>, smooth preview scrolling, click navigation, and drag-and-drop file operations.
            </p>

            <div className="card-grid">
              <div className="card-premium">
                <div style={{ color: "var(--accent-green)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  1. Pane-Aware Hover Scrolling
                </div>
                <p>
                  Hover your cursor over the Left (Pinned/Parent), Center (Current), or Right (Preview) pane and scroll the wheel: 
                  Fyzenor detects window boundaries at coordinate <code>(x, y)</code> and scrolls that pane directly without clicking or switching active focus!
                </p>
              </div>

              <div className="card-premium">
                <div style={{ color: "var(--accent-cyan)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  2. Preview Pane Scrolling
                </div>
                <p>
                  Scroll through long source code, markdown documentation, or directory tree previews using the mouse wheel or keyboard shortcuts (<kbd>Ctrl+E</kbd> down / <kbd>Ctrl+Y</kbd> up).
                </p>
              </div>

              <div className="card-premium">
                <div style={{ color: "var(--accent-purple)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  3. Click Navigation &amp; Tabs
                </div>
                <p>
                  Left-click any file to select it, double-click a directory to enter, click pinned bookmarks to jump immediately, or click tabs on the top bar to switch tabs.
                </p>
              </div>

              <div className="card-premium">
                <div style={{ color: "var(--accent-yellow)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  4. Drag-and-Drop Workflow
                </div>
                <p>
                  Seamlessly drag files out of Fyzenor into web browsers, Slack, Discord, or GUI file managers by pressing <kbd>Ctrl+D</kbd> (Dragon integration).
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "cursormemory" && (
          <div className="animate-fade-in">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <h2>Cursor Tracking &amp; Navigation Memory</h2>
              <span className="badge badge-green">v4.3.0</span>
              <span className="badge badge-cyan">STABLE</span>
            </div>
            <p>
              Inspired by <em>Yazi</em>, Fyzenor features intelligent <strong>persistent cursor tracking</strong> across sorting changes, 
              per-directory selection history memory, and resilient filesystem recovery.
            </p>

            <div className="card-grid">
              <div className="card-premium">
                <div style={{ color: "var(--accent-green)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  1. Persistent Cursor Tracking Across Sorting
                </div>
                <p>
                  When you press <kbd>s</kbd> to cycle sort modes (Name → Date → Size → Extension), Fyzenor memorizes your highlighted item. 
                  After the list re-orders, your cursor stays glued to that same file rather than resetting to index 0.
                </p>
              </div>

              <div className="card-premium">
                <div style={{ color: "var(--accent-purple)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  2. Per-Directory Navigation Memory
                </div>
                <p>
                  Every directory you explore remembers its exact cursor index and scroll offset. Step inside a subfolder and return back with <kbd>h</kbd> or <kbd>Ctrl+O</kbd>: your cursor is restored exactly where you left off.
                </p>
              </div>

              <div className="card-premium">
                <div style={{ color: "var(--accent-cyan)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  3. Full History Jumps (Ctrl+O / Ctrl+P)
                </div>
                <p>
                  Navigate backward (<kbd>Ctrl+O</kbd>) and forward (<kbd>Ctrl+P</kbd>) through your directory history stack. Or press <kbd>H</kbd> to open a scrollable visual history overlay and jump directly.
                </p>
              </div>

              <div className="card-premium">
                <div style={{ color: "var(--accent-yellow)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  4. Safe Directory Recovery
                </div>
                <p>
                  If an active folder is renamed or deleted outside Fyzenor by an external process, the engine gracefully catches the inotify deletion event and auto-recovers to the nearest existing ancestor directory without crashing.
                </p>
              </div>
            </div>
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
              In Fyzenor, the Task Manager overlay (accessible via <kbd>w</kbd>) includes detailed timing, speed metrics, and a historical completion log panel.
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

            <h2>Repository Structure</h2>
            <div className="code-container">
              <pre className="code-block">{`fyzenor/
├── src/               # Core C++ source files (file_manager, utils, plugins)
├── install.sh         # Universal installer, updater, and manager
├── uninstall.sh       # Standalone uninstaller script
├── fyzenor.png        # Branding asset used in desktop entry and README
└── Sample/            # Showcase screenshots`}</pre>
            </div>
          </div>
        )}

        {activeTab === "theming" && (
          <div className="animate-fade-in">
            <h2>Configuration (`config.toml`)</h2>
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
              <pre className="code-block">{`[general]
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
archive = [".zip", ".tar", ".gz", ".tgz", ".7z", ".rar", ".xz", ".bz2", ".tbz2", ".lzma", ".cab"]`}</pre>
            </div>

            <h2>Theme Customization</h2>
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
                      "[colors]\ndir = \"#89b4fa\"\nfile = \"#cdd6f4\"\nsel_bg = \"#585b70\"\nmedia = \"#f9e2af\"\nimage = \"#f5c2e7\"\nborder = \"#b4befe\"\nactive_border = \"#89b4fa\"\nsuccess = \"#a6e3a1\"\nerror = \"#f38ba8\"\nmulti = \"#f5e0dc\"\npin_bg = \"#cba6f7\"\npin_border = \"#89b4fa\"\nsec_sel_bg = \"#313244\"\ncore = \"#a6e3a1\"\narchive = \"#eba0ac\"\nfrontend = \"#fab387\"\nconfig = \"#94e2d5\"\nscript = \"#f9e2af\"\ndocs = \"#f2cdcd\"\nfont = \"#cba6f7\"",
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
              <pre className="code-block">{`# Fyzenor Theme Configuration File

[colors]
dir = "#89b4fa"
file = "#cdd6f4"
sel_bg = "#585b70"
media = "#f9e2af"
image = "#f5c2e7"
border = "#b4befe"
active_border = "#89b4fa"
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
font = "#cba6f7"`}</pre>
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
                      "# Fyzenor Theme: Matugen Generated\n\n[colors]\ndir = \"{{colors.primary.default.hex}}\"\nfile = \"{{colors.on_surface.default.hex}}\"\nsel_bg = \"{{colors.surface_variant.default.hex}}\"\nmedia = \"{{colors.tertiary.default.hex}}\"\nimage = \"{{colors.secondary.default.hex}}\"\nborder = \"{{colors.outline.default.hex}}\"\nactive_border = \"{{colors.primary.default.hex}}\"\nsuccess = \"{{colors.primary_fixed.default.hex}}\"\nerror = \"{{colors.error.default.hex}}\"\nmulti = \"{{colors.tertiary_container.default.hex}}\"\npin_bg = \"{{colors.secondary_container.default.hex}}\"\npin_border = \"{{colors.primary.default.hex}}\"\nsec_sel_bg = \"{{colors.surface_dim.default.hex}}\"",
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
              <pre className="code-block">{`# Fyzenor Theme: Matugen Generated

[colors]
dir = "{{colors.primary.default.hex}}"
file = "{{colors.on_surface.default.hex}}"
sel_bg = "{{colors.surface_variant.default.hex}}"
media = "{{colors.tertiary.default.hex}}"
image = "{{colors.secondary.default.hex}}"
border = "{{colors.outline.default.hex}}"
active_border = "{{colors.primary.default.hex}}"
success = "{{colors.primary_fixed.default.hex}}"
error = "{{colors.error.default.hex}}"
multi = "{{colors.tertiary_container.default.hex}}"
pin_bg = "{{colors.secondary_container.default.hex}}"
pin_border = "{{colors.primary.default.hex}}"
sec_sel_bg = "{{colors.surface_dim.default.hex}}"`}</pre>
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
              <pre className="code-block">{`[templates.fyzenor]
input_path = "~/.config/matugen/templates/fyzenor-colors.template"
output_path = "~/.config/fyzenor/theme.toml"`}</pre>
            </div>

            <h3>Step 3: Generate the Colors</h3>
            <p>
              Execute this command to extract colors from your wallpaper and
              apply them to Fyzenor:
            </p>
            <div className="code-container">
              <pre className="code-block">{`matugen image /path/to/your/wallpaper.jpg`}</pre>
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
                    <div style={{ opacity: 0.5 }}>src/</div>
                    <div style={{ opacity: 0.5 }}>build/</div>
                    <div style={{ opacity: 0.5 }}>docs/</div>
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
            <h2 style={{ marginTop: "3rem" }}>Custom Keyboard Macros</h2>
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
              <pre className="code-block">{`# Fyzenor Custom Keys Macro Configuration
# Macros allow you to execute shell command shortcuts using single keystrokes.
# Use single quotes for command strings in TOML.
# Place them under the [macros] section.
#   $f - expands to the currently highlighted file's absolute path
#   $s - expands to space-separated paths of all selected files

[macros]
v = 'nvim "$f"'
g = 'git status'
l = 'ls -la'`}</pre>
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

        {activeTab === "community" && <CommunitySection />}

        {activeTab === "troubleshoot" && (
          <div className="animate-fade-in community-section-wrapper">
            <div className="community-section-title-wrap">
              <div className="community-kicker">
                <HelpCircle size={13} />
                <span>DIAGNOSTICS &amp; FAQ</span>
              </div>
              <h2 className="community-heading">Frequently Asked Questions &amp; Troubleshooting</h2>
              <p className="community-subheading">
                Comprehensive resolutions for common terminal configurations, protocol rendering, compilation questions, and Neovim integration.
              </p>
            </div>

            {/* Quick Diagnostic Checker Card */}
            <div className="diagnostic-hero-card">
              <div className="diagnostic-hero-header">
                <div className="diagnostic-header-left">
                  <Terminal size={18} className="diagnostic-icon" />
                  <div>
                    <h3 className="diagnostic-title">Quick Terminal Diagnostics</h3>
                    <p className="diagnostic-desc">Run these one-liners in your shell to verify system capabilities and configuration paths.</p>
                  </div>
                </div>
              </div>
              <div className="diagnostic-commands-grid">
                <div className="diagnostic-cmd-item">
                  <span className="cmd-purpose">Verify Terminal Capabilities</span>
                  <div className="cmd-box">
                    <code>echo "$TERM | $COLORTERM"</code>
                    <button className="cmd-copy-btn" onClick={() => handleCopy('echo "$TERM | $COLORTERM"', 'diag1')}>
                      {copiedText === 'diag1' ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                    </button>
                  </div>
                </div>
                <div className="diagnostic-cmd-item">
                  <span className="cmd-purpose">Validate Config Paths</span>
                  <div className="cmd-box">
                    <code>ls -la ~/.config/fyzenor/</code>
                    <button className="cmd-copy-btn" onClick={() => handleCopy('ls -la ~/.config/fyzenor/', 'diag2')}>
                      {copiedText === 'diag2' ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                    </button>
                  </div>
                </div>
                <div className="diagnostic-cmd-item">
                  <span className="cmd-purpose">Inspect Kitty Protocol Support</span>
                  <div className="cmd-box">
                    <code>kitty +kitten icat --print-window-size</code>
                    <button className="cmd-copy-btn" onClick={() => handleCopy('kitty +kitten icat --print-window-size', 'diag3')}>
                      {copiedText === 'diag3' ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Structured FAQ Cards */}
            <div className="faq-grid">
              <div className="faq-card">
                <div className="faq-card-header">
                  <span className="faq-category-tag">PERFORMANCE</span>
                  <span className="faq-id-pill">Q1</span>
                </div>
                <h3 className="faq-question">My directory size calculations are slow or laggy. How can I fix this?</h3>
                <p className="faq-answer">
                  Fyzenor recursively traverses items to compile exact folder sizes. When browsing massive directories containing millions of nested items (such as deeply nested <code>node_modules</code> or build caches), calculations are dispatched to asynchronous background worker threads.
                </p>
                <div className="faq-tip-box">
                  <strong>Tip:</strong> Browsing and navigation remain 100% responsive and non-blocking. Symlinks are safely ignored during scans to avoid recursive circular loops.
                </div>
              </div>

              <div className="faq-card">
                <div className="faq-card-header">
                  <span className="faq-category-tag">GRAPHICS &amp; PREVIEWS</span>
                  <span className="faq-id-pill">Q2</span>
                </div>
                <h3 className="faq-question">Images do not display or render as corrupted character artifacts. What is wrong?</h3>
                <p className="faq-answer">
                  Fyzenor uses the native <strong>Kitty Graphics Protocol</strong> for true-color image previews. High-resolution rendering is supported in modern emulators including <strong>Kitty</strong>, <strong>Ghostty</strong>, and <strong>WezTerm</strong> with DEC Mode 2026 atomic frame synchronization.
                </p>
                <p className="faq-answer">
                  Terminals without graphics support (e.g. Alacritty, GNOME Terminal, Foot, xterm) gracefully fallback to rich textual metadata without visual tearing. Ensure <code>ffmpeg</code> or <code>mediainfo</code> is installed for thumbnail extraction.
                </p>
              </div>

              <div className="faq-card">
                <div className="faq-card-header">
                  <span className="faq-category-tag">COMPILATION &amp; BUILD</span>
                  <span className="faq-id-pill">Q3</span>
                </div>
                <h3 className="faq-question">Compilation fails with "std::filesystem has no member..." error.</h3>
                <p className="faq-answer">
                  Fyzenor requires a modern C++ compiler supporting the <strong>C++17</strong> specification. Older compilers (such as GCC 7 or earlier, or outdated MinGW versions) placed filesystem utilities in experimental namespaces.
                </p>
                <div className="faq-tip-box">
                  Update to <strong>GCC 8+</strong> or <strong>Clang 7+</strong> and build using CMake:
                  <code>cmake -B build -G Ninja &amp;&amp; ninja -C build</code>
                </div>
              </div>

              <div className="faq-card">
                <div className="faq-card-header">
                  <span className="faq-category-tag">THEMES &amp; CONFIG</span>
                  <span className="faq-id-pill">Q4</span>
                </div>
                <h3 className="faq-question">My theme changes in theme.toml are not loading.</h3>
                <p className="faq-answer">
                  Verify that your theme configuration is saved at the exact path:
                  <code>~/.config/fyzenor/theme.toml</code>. If TOML syntax contains parse errors, Fyzenor falls back to the default Terminal Dark theme without crashing.
                </p>
                <div className="faq-tip-box">
                  You can test and copy a valid configuration from the <strong>Configuration &amp; Themes</strong> chapter.
                </div>
              </div>

              <div className="faq-card">
                <div className="faq-card-header">
                  <span className="faq-category-tag">NEOVIM INTEGRATION</span>
                  <span className="faq-id-pill">Q5</span>
                </div>
                <h3 className="faq-question">How do I open multiple selected files simultaneously in Neovim?</h3>
                <p className="faq-answer">
                  Press <code>Tab</code> or <code>Shift+Tab</code> to multi-select files across directories in Fyzenor, then press <code>Enter</code> or <code>l</code>. When running inside Neovim (via <code>fyzenor.nvim</code>), all selected buffers are seamlessly opened into your editor window stack.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  </div>
)}

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
    </>
  );
}
