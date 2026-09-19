import React, { useState, useEffect } from "react";
import {
  GitCommit,
  GitBranch,
  ExternalLink,
  Copy,
  Check,
  RotateCw,
  User,
  Globe,
  MapPin,
  Search,
  FolderGit2,
  Users,
  GitPullRequest,
  FileText,
  ShieldCheck,
  AlertCircle,
  MessageSquare,
  Shield,
} from "lucide-react";

interface CommitItem {
  sha: string;
  fullSha: string;
  message: string;
  authorName: string;
  authorLogin: string;
  authorAvatar: string;
  date: string;
  htmlUrl: string;
}

interface UserProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  blog: string;
  location: string;
  public_repos: number;
  followers: number;
  following: number;
  bio?: string | null;
}

// Initial fallback data from repository git log
const initialCommits: CommitItem[] = [
  {
    sha: "9eca1a0",
    fullSha: "9eca1a0505e0d49341252c2b142ec25f8abe53c2",
    message: "Merge branch 'beta' into main (v4.3.0 Release)",
    authorName: "Bimbok",
    authorLogin: "Bimbok",
    authorAvatar: "https://avatars.githubusercontent.com/u/132834022?v=4",
    date: "2026-09-19T13:30:30Z",
    htmlUrl: "https://github.com/Bimbok/fyzenor/commit/9eca1a0505e0d49341252c2b142ec25f8abe53c2",
  },
  {
    sha: "6706274",
    fullSha: "670627473dbedaa206621ced976b8b46f6166bdf",
    message: "chore(release): bump version to 4.3.0 and update documentation for stable release",
    authorName: "Bimbok",
    authorLogin: "Bimbok",
    authorAvatar: "https://avatars.githubusercontent.com/u/132834022?v=4",
    date: "2026-09-19T13:29:52Z",
    htmlUrl: "https://github.com/Bimbok/fyzenor/commit/670627473dbedaa206621ced976b8b46f6166bdf",
  },
  {
    sha: "87b3ea9",
    fullSha: "87b3ea9cd476be35b5e8b1699dc7f171f3551ac7",
    message: "fix(multiselect): open all selected files in nvim and support Tab/Shift-Tab selection",
    authorName: "Bimbok",
    authorLogin: "Bimbok",
    authorAvatar: "https://avatars.githubusercontent.com/u/132834022?v=4",
    date: "2026-09-19T09:12:46Z",
    htmlUrl: "https://github.com/Bimbok/fyzenor/commit/87b3ea9cd476be35b5e8b1699dc7f171f3551ac7",
  },
  {
    sha: "0916ae1",
    fullSha: "0916ae1fe122fda407f7e7d8298c6f169ec6d397",
    message: "fix(nvim): fix empty blank buffer when opening files and improve directory hijack",
    authorName: "Bimbok",
    authorLogin: "Bimbok",
    authorAvatar: "https://avatars.githubusercontent.com/u/132834022?v=4",
    date: "2026-09-19T08:25:51Z",
    htmlUrl: "https://github.com/Bimbok/fyzenor/commit/0916ae1fe122fda407f7e7d8298c6f169ec6d397",
  },
  {
    sha: "dfaa555",
    fullSha: "dfaa5552dec5cef68e52079f4bdf7d07dbaa3861",
    message: "docs: add branch = 'beta' to lazy.nvim installation snippet",
    authorName: "Bimbok",
    authorLogin: "Bimbok",
    authorAvatar: "https://avatars.githubusercontent.com/u/132834022?v=4",
    date: "2026-09-19T07:58:41Z",
    htmlUrl: "https://github.com/Bimbok/fyzenor/commit/dfaa5552dec5cef68e52079f4bdf7d07dbaa3861",
  },
  {
    sha: "6dc4c03",
    fullSha: "6dc4c038c2d16b8543c4671499b884d860cf9382",
    message: "feat(nvim): integrate Fyzenor into Neovim as a native plugin like yazi.nvim",
    authorName: "Bimbok",
    authorLogin: "Bimbok",
    authorAvatar: "https://avatars.githubusercontent.com/u/132834022?v=4",
    date: "2026-09-19T07:30:39Z",
    htmlUrl: "https://github.com/Bimbok/fyzenor/commit/6dc4c038c2d16b8543c4671499b884d860cf9382",
  },
  {
    sha: "0666806",
    fullSha: "066680689a4da7f8f47442251e0c9f6fccfe3c9b",
    message: "fix: ensure consistent theme rendering across all terminals including Neovim",
    authorName: "Bimbok",
    authorLogin: "Bimbok",
    authorAvatar: "https://avatars.githubusercontent.com/u/132834022?v=4",
    date: "2026-09-19T07:08:30Z",
    htmlUrl: "https://github.com/Bimbok/fyzenor/commit/066680689a4da7f8f47442251e0c9f6fccfe3c9b",
  },
  {
    sha: "1004082",
    fullSha: "1004082967ff644c1064aea5d450714c91b02117",
    message: "fix: ignore symlinks during folder size scans and validate watch paths",
    authorName: "Bimbok",
    authorLogin: "Bimbok",
    authorAvatar: "https://avatars.githubusercontent.com/u/132834022?v=4",
    date: "2026-09-13T13:27:02Z",
    htmlUrl: "https://github.com/Bimbok/fyzenor/commit/1004082967ff644c1064aea5d450714c91b02117",
  },
];

const initialProfile: UserProfile = {
  login: "Bimbok",
  avatar_url: "https://avatars.githubusercontent.com/u/132834022?v=4",
  html_url: "https://github.com/Bimbok",
  blog: "https://bratikmkj.vercel.app",
  location: "terminal",
  public_repos: 45,
  followers: 24,
  following: 14,
  bio: "Creator & Lead Maintainer of Fyzenor",
};

function formatRelativeTime(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffSec < 60) return "just now";
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return dateStr;
  }
}

const mitLicenseText = `MIT License

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
SOFTWARE.`;

export const CommunitySection: React.FC = () => {
  const [commits, setCommits] = useState<CommitItem[]>(initialCommits);
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(8);
  const [copiedSha, setCopiedSha] = useState<string | null>(null);
  const [licenseCopied, setLicenseCopied] = useState<boolean>(false);

  const handleCopyLicense = () => {
    navigator.clipboard.writeText(mitLicenseText);
    setLicenseCopied(true);
    setTimeout(() => setLicenseCopied(false), 2000);
  };

  const fetchGitHubData = async () => {
    setLoading(true);
    try {
      // 1. Fetch live user profile
      const userRes = await fetch("https://api.github.com/users/Bimbok", {
        headers: { Accept: "application/vnd.github.v3+json" },
      });
      if (userRes.ok) {
        const userData = await userRes.json();
        setProfile((prev) => ({
          ...prev,
          ...userData,
          avatar_url: userData.avatar_url || prev.avatar_url,
          blog: userData.blog || prev.blog,
        }));
      }

      // 2. Fetch live commits
      const commitsRes = await fetch("https://api.github.com/repos/Bimbok/fyzenor/commits?per_page=30", {
        headers: { Accept: "application/vnd.github.v3+json" },
      });
      if (commitsRes.ok) {
        const commitsData = await commitsRes.json();
        if (Array.isArray(commitsData) && commitsData.length > 0) {
          const parsed: CommitItem[] = commitsData.map((item: any) => ({
            sha: item.sha.substring(0, 7),
            fullSha: item.sha,
            message: item.commit?.message || "Commit",
            authorName: item.commit?.author?.name || item.author?.login || "Bimbok",
            authorLogin: item.author?.login || "Bimbok",
            authorAvatar: item.author?.avatar_url || "https://avatars.githubusercontent.com/u/132834022?v=4",
            date: item.commit?.author?.date || item.commit?.committer?.date || "",
            htmlUrl: item.html_url || `https://github.com/Bimbok/fyzenor/commit/${item.sha}`,
          }));
          setCommits(parsed);
          setIsLive(true);
        }
      }
    } catch {
      // Graceful fallback to initial commits if network or rate limit hit
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubData();
  }, []);

  const handleCopy = (sha: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSha(sha);
    setTimeout(() => setCopiedSha(null), 2000);
  };

  const filteredCommits = commits.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      c.message.toLowerCase().includes(q) ||
      c.sha.toLowerCase().includes(q) ||
      c.authorName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="animate-fade-in community-section-wrapper">
      {/* 1. Author & Maintainer Profile Card */}
      <div className="maintainer-profile-card">
        <div className="maintainer-avatar-wrapper">
          <img
            src={profile.avatar_url}
            alt={profile.login}
            className="maintainer-avatar"
          />
          <span className="maintainer-status-indicator" title="Active Core Maintainer"></span>
        </div>

        <div className="maintainer-details">
          <div className="maintainer-header-row">
            <div>
              <h3 className="maintainer-name">@{profile.login}</h3>
              <span className="maintainer-role-badge">Creator &amp; Lead Architect</span>
            </div>
            <div className="maintainer-actions">
              <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-cta-btn primary"
              >
                <span>GitHub Profile</span>
                <ExternalLink size={13} />
              </a>
              {profile.blog && (
                <a
                  href={profile.blog.startsWith("http") ? profile.blog : `https://${profile.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="profile-cta-btn secondary"
                >
                  <Globe size={13} />
                  <span>Portfolio</span>
                </a>
              )}
            </div>
          </div>

          <p className="maintainer-bio">
            Engineering modern C++ terminal systems, asynchronous Miller columns, and seamless Neovim developer workflows.
          </p>

          <div className="maintainer-stats-grid">
            <div className="maintainer-stat-item">
              <FolderGit2 size={14} className="stat-icon" />
              <span className="stat-value">{profile.public_repos}</span>
              <span className="stat-label">Repositories</span>
            </div>
            <div className="maintainer-stat-item">
              <Users size={14} className="stat-icon" />
              <span className="stat-value">{profile.followers}</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="maintainer-stat-item">
              <User size={14} className="stat-icon" />
              <span className="stat-value">{profile.following}</span>
              <span className="stat-label">Following</span>
            </div>
            {profile.location && (
              <div className="maintainer-stat-item">
                <MapPin size={14} className="stat-icon" />
                <span className="stat-value">{profile.location}</span>
                <span className="stat-label">Location</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Dynamic Repository Commits Feed */}
      <div className="commits-section-header">
        <div>
          <h2>Repository Commits</h2>
          <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-muted)" }}>
            Real-time commit stream directly from GitHub repository <code>Bimbok/fyzenor</code>
          </p>
        </div>

        <div className="commits-header-controls">
          <div className="commits-stream-badge">
            <span className={`live-pulse-dot ${isLive ? "active" : ""}`} />
            <span>{isLive ? "LIVE GITHUB FEED" : "RECENT COMMITS"}</span>
          </div>
          <button
            className={`commits-refresh-btn ${loading ? "spinning" : ""}`}
            onClick={fetchGitHubData}
            title="Refresh commit history"
            disabled={loading}
          >
            <RotateCw size={13} />
            <span>{loading ? "Syncing..." : "Sync"}</span>
          </button>
        </div>
      </div>

      {/* Filter search bar */}
      <div className="commits-filter-bar">
        <div className="commits-search-box">
          <Search size={14} className="commits-search-icon" />
          <input
            type="text"
            placeholder="Filter commits by message, SHA, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="commits-search-input"
          />
        </div>
        <a
          href="https://github.com/Bimbok/fyzenor/commits/main"
          target="_blank"
          rel="noopener noreferrer"
          className="commits-view-all-link"
        >
          <GitBranch size={13} />
          <span>Branch: main</span>
          <ExternalLink size={11} />
        </a>
      </div>

      {/* Commit List Cards */}
      <div className="commits-stream-list">
        {filteredCommits.slice(0, visibleCount).map((commit) => {
          const lines = commit.message.split("\n").filter(Boolean);
          const headline = lines[0] || commit.message;
          const body = lines.slice(1).join(" ");
          const isCopied = copiedSha === commit.sha;

          return (
            <div key={commit.fullSha} className="commit-entry-card">
              <div className="commit-entry-leading">
                <GitCommit size={16} className="commit-glyph" />
                <span className="commit-timeline-line" />
              </div>

              <div className="commit-entry-content">
                <div className="commit-entry-top">
                  <span className="commit-headline">{headline}</span>
                  <div className="commit-badges">
                    <a
                      href={commit.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="commit-sha-pill"
                      title="View commit diff on GitHub"
                    >
                      <code>{commit.sha}</code>
                      <ExternalLink size={10} />
                    </a>
                    <button
                      className="commit-copy-btn"
                      onClick={() => handleCopy(commit.sha, commit.fullSha)}
                      title="Copy full commit SHA"
                    >
                      {isCopied ? <Check size={12} color="var(--accent-green)" /> : <Copy size={12} />}
                    </button>
                  </div>
                </div>

                {body && <p className="commit-body-text">{body}</p>}

                <div className="commit-entry-meta">
                  <div className="commit-author-chip">
                    <img
                      src={commit.authorAvatar}
                      alt={commit.authorName}
                      className="commit-author-avatar"
                    />
                    <span className="commit-author-name">@{commit.authorLogin}</span>
                  </div>
                  <span className="commit-meta-separator">•</span>
                  <span className="commit-timestamp">{formatRelativeTime(commit.date)}</span>
                </div>
              </div>
            </div>
          );
        })}

        {filteredCommits.length === 0 && (
          <div className="commits-empty-state">
            <p>No commits found matching &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => setSearchQuery("")}
              className="zen-reset-filter-btn"
              style={{ marginTop: "0.5rem" }}
            >
              Clear filter
            </button>
          </div>
        )}
      </div>

      {visibleCount < filteredCommits.length && (
        <div className="commits-load-more-wrapper">
          <button
            className="commits-load-more-btn"
            onClick={() => setVisibleCount((prev) => prev + 10)}
          >
            Show More Commits ({filteredCommits.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {/* 3. Contributing Guidelines */}
      <div className="community-contribute-section">
        <div className="community-section-title-wrap">
          <div className="community-kicker">
            <GitPullRequest size={13} />
            <span>CONTRIBUTION GUIDE</span>
          </div>
          <h2 className="community-heading">Contributing to Fyzenor</h2>
          <p className="community-subheading">
            Whether optimizing Miller column rendering, writing Lua bindings for Neovim, or polishing documentation, we welcome your code and ideas.
          </p>
        </div>

        {/* 4 Steps Flow Grid */}
        <div className="contribute-steps-grid">
          <div className="contribute-step-card">
            <div className="step-card-header">
              <span className="step-number-badge">01</span>
              <span className="step-action-tag">FORK</span>
            </div>
            <h3 className="step-title">Fork the Repository</h3>
            <p className="step-desc">
              Create your personal fork of <code>Bimbok/fyzenor</code> on GitHub and clone it locally to your machine.
            </p>
            <div className="step-code-snippet">
              <code>git clone https://github.com/YOUR_USER/fyzenor.git</code>
            </div>
          </div>

          <div className="contribute-step-card">
            <div className="step-card-header">
              <span className="step-number-badge">02</span>
              <span className="step-action-tag">BRANCH</span>
            </div>
            <h3 className="step-title">Create a Feature Branch</h3>
            <p className="step-desc">
              Branch off <code>main</code> with a concise, descriptive branch naming convention.
            </p>
            <div className="step-code-snippet">
              <code>git checkout -b feature/fast-miller-scroll</code>
            </div>
          </div>

          <div className="contribute-step-card">
            <div className="step-card-header">
              <span className="step-number-badge">03</span>
              <span className="step-action-tag">BUILD &amp; TEST</span>
            </div>
            <h3 className="step-title">Implement &amp; Test</h3>
            <p className="step-desc">
              Compile using modern C++20 and Ninja. Run terminal test scenarios to ensure zero regressions.
            </p>
            <div className="step-code-snippet">
              <code>cmake -B build -G Ninja &amp;&amp; ninja -C build</code>
            </div>
          </div>

          <div className="contribute-step-card">
            <div className="step-card-header">
              <span className="step-number-badge">04</span>
              <span className="step-action-tag">PULL REQUEST</span>
            </div>
            <h3 className="step-title">Submit Pull Request</h3>
            <p className="step-desc">
              Open a pull request describing the rationale, benchmarks, or terminal screenshots.
            </p>
            <div className="step-code-snippet">
              <code>git push origin feature/fast-miller-scroll</code>
            </div>
          </div>
        </div>

        {/* Policy and workflow links */}
        <div className="contribute-guidelines-row">
          <a
            href="https://github.com/Bimbok/fyzenor/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
            className="guideline-link-card"
          >
            <div className="guideline-card-icon">
              <FileText size={18} />
            </div>
            <div className="guideline-card-text">
              <span className="guideline-card-title">Contribution Guidelines</span>
              <span className="guideline-card-sub">Read CONTRIBUTING.md for C++ conventions &amp; commit guidelines</span>
            </div>
            <ExternalLink size={14} className="guideline-arrow" />
          </a>

          <a
            href="https://github.com/Bimbok/fyzenor/blob/main/CODE_OF_CONDUCT.md"
            target="_blank"
            rel="noopener noreferrer"
            className="guideline-link-card"
          >
            <div className="guideline-card-icon">
              <ShieldCheck size={18} />
            </div>
            <div className="guideline-card-text">
              <span className="guideline-card-title">Code of Conduct</span>
              <span className="guideline-card-sub">Governed by standard Contributor Covenant expectations</span>
            </div>
            <ExternalLink size={14} className="guideline-arrow" />
          </a>
        </div>
      </div>

      {/* 4. Contact & Support */}
      <div className="community-support-section">
        <div className="community-section-title-wrap">
          <div className="community-kicker">
            <Users size={13} />
            <span>COMMUNITY &amp; SUPPORT</span>
          </div>
          <h2 className="community-heading">Contact &amp; Support</h2>
          <p className="community-subheading">
            Connect directly with the maintainer, report terminal anomalies, or discuss new feature ideas.
          </p>
        </div>

        <div className="support-channels-grid">
          <div className="support-channel-card">
            <div className="channel-icon-wrap issues">
              <AlertCircle size={20} />
            </div>
            <div className="channel-info">
              <h3 className="channel-title">Issue Tracker</h3>
              <p className="channel-desc">
                Found an issue or have a feature proposal? File a ticket with reproduction details.
              </p>
            </div>
            <a
              href="https://github.com/Bimbok/fyzenor/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="channel-action-btn"
            >
              <span>Submit an Issue</span>
              <ExternalLink size={12} />
            </a>
          </div>

          <div className="support-channel-card">
            <div className="channel-icon-wrap discussions">
              <MessageSquare size={20} />
            </div>
            <div className="channel-info">
              <h3 className="channel-title">GitHub Discussions</h3>
              <p className="channel-desc">
                Ask questions, share configuration setups, and discuss terminal ergonomics with the community.
              </p>
            </div>
            <a
              href="https://github.com/Bimbok/fyzenor/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="channel-action-btn"
            >
              <span>Join Discussions</span>
              <ExternalLink size={12} />
            </a>
          </div>

          <div className="support-channel-card">
            <div className="channel-icon-wrap author">
              <User size={20} />
            </div>
            <div className="channel-info">
              <h3 className="channel-title">Maintainer Profile</h3>
              <p className="channel-desc">
                Connect directly with @Bimbok on GitHub for collaboration or architectural discussions.
              </p>
            </div>
            <a
              href="https://github.com/Bimbok"
              target="_blank"
              rel="noopener noreferrer"
              className="channel-action-btn"
            >
              <span>@Bimbok on GitHub</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* 5. License */}
      <div className="community-license-section">
        <div className="community-section-title-wrap">
          <div className="community-kicker">
            <Shield size={13} />
            <span>OPEN SOURCE LICENSE</span>
          </div>
          <h2 className="community-heading">License</h2>
          <p className="community-subheading">
            Fyzenor is completely free, permissive, and open source software distributed under the MIT License.
          </p>
        </div>

        <div className="license-card">
          <div className="license-card-top">
            <div className="license-badge-cluster">
              <div className="license-type-pill">
                <ShieldCheck size={14} />
                <span>MIT Permissive License</span>
              </div>
              <span className="license-summary-tag">Commercial &amp; Private Use Permitted</span>
            </div>

            <div className="license-permissions-list">
              <span className="permission-item"><Check size={12} /> Commercial Use</span>
              <span className="permission-item"><Check size={12} /> Modification</span>
              <span className="permission-item"><Check size={12} /> Distribution</span>
              <span className="permission-item"><Check size={12} /> Private Use</span>
            </div>
          </div>

          <div className="license-terminal-window">
            <div className="license-window-header">
              <div className="terminal-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <span className="license-window-title">LICENSE — MIT</span>
              <button
                className="license-copy-btn"
                onClick={handleCopyLicense}
                title="Copy MIT License text"
              >
                {licenseCopied ? (
                  <>
                    <Check size={12} color="#10b981" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy License</span>
                  </>
                )}
              </button>
            </div>
            <pre className="license-text-block">
              <code>{mitLicenseText}</code>
            </pre>
          </div>

          <div className="license-card-footer">
            <span>Copyright &copy; 2026 Bimbok. Published under the terms of the MIT License.</span>
            <a
              href="https://github.com/Bimbok/fyzenor/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="license-repo-link"
            >
              <span>View LICENSE on GitHub</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
