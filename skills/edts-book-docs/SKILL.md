---
name: edts-book-docs
description: Read an EDTS project's Markdown docs as a searchable book with mdBook. Sets up book.toml and docs/SUMMARY.md, installs mdBook only with the user's permission, builds the book, serves it on localhost, opens pages in the built-in browser, and stops the server. Use only when the user asks to open, preview, build, serve, refresh, or stop the docs book. Never run it on your own after edts-project-docs writes docs.
---

# EDTS Docs Book

Turns the docs written by `edts-project-docs` (`AGENTS.md`, `docs/`) into a book with a sidebar, search, and light/dark themes, using [mdBook](https://rust-lang.github.io/mdBook/). The Markdown stays the source of truth; this skill never edits doc content.

Run everything from the **project root** (the folder with `AGENTS.md` and `docs/`). If `docs/README.md` does not exist, stop and tell the user to document the project first with `edts-project-docs`.

## Modes

Pick the mode from the user's words. The default is **Preview**.

| Mode | Trigger words | Steps |
| --- | --- | --- |
| **Setup** | "set up the book", or no `book.toml` yet | Setup → Sync → Preview |
| **Preview** (default) | "open", "preview", "show", "run", "serve", "rebuild", or `/edts-book-docs` with no words | Sync → Preview |
| **Stop** | "stop", "kill", "close the book" | Stop |

## Files

| File | Template | Purpose |
| --- | --- | --- |
| `book.toml` (project root) | [assets/templates/book.template.toml](assets/templates/book.template.toml) | mdBook settings: title, `src = "docs"`, output folder, plain sidebar titles |
| `docs/SUMMARY.md` | [assets/templates/SUMMARY.template.md](assets/templates/SUMMARY.template.md) | Sidebar order. mdBook only renders pages listed here |
| `docs/theme/mermaid-init.js` | [assets/templates/mermaid-init.js](assets/templates/mermaid-init.js) | Renders ` ```mermaid ` blocks as diagrams (loads mermaid from a CDN; offline, diagrams stay as code) |
| `book/` | — | Generated output. In `.gitignore`; never commit it |

`docs/README.md` (the docs index) becomes the book's home page automatically.

## Setup

1. Check whether mdBook is installed: `mdbook --version`.
2. If it is missing, **ask the user** before installing anything:
   > mdBook is not installed. It lets the team read these docs as a searchable book. Install it with Homebrew (`brew install mdbook`)?
   - **Yes:** run `brew install mdbook`. If Homebrew is missing, say so and stop; do not install Homebrew.
   - **No:** write the files below anyway, skip Preview, and say the book was not built.
   Never install without the user's yes, and ask once per run.
3. Copy the three templates into the project. Set the title in `book.toml` to `<App Name> Docs`.
4. Add `book/` to the project's `.gitignore` if it is not there.

## Sync — `docs/SUMMARY.md`

`SUMMARY.md` lists the same docs as `docs/README.md`, in the same groups. Rebuild it from the index on every run, so docs written without this skill still appear.

- One part per type (`# Modules`, `# Services`, `# Flows`), and variant groups as unlinked entries (`- [Feature]()`) with their docs indented under them.
- `[Docs Index](README.md)` first, then `Architecture` and `Documentation Status`.
- List every doc in `docs/README.md`; leave out parts and groups with no docs. Pages listed but missing on disk make the build fail (`create-missing = false`).
- `book.toml`, `SUMMARY.md`, and `docs/theme/` are not docs: never list them in `docs/README.md`.

## Preview

1. **Build first.** Run `mdbook build` and fix any error before previewing. Errors come from `SUMMARY.md` or `book.toml`; never change doc content to fix them. If a doc itself is broken, report it.
2. **Reuse a running server.** Check port 3000: `lsof -nP -iTCP:3000 -sTCP:LISTEN`. If an `mdbook` process is listening there, reuse it; `mdbook serve` already rebuilds on every save.
3. **Otherwise start one in the background**, bound to localhost only:
   ```sh
   mdbook serve -n 127.0.0.1 -p 3000
   ```
   Run it as a background process so the run is not blocked. If port 3000 is taken by something else, use the next free port (3001, 3002, …). Never start a second server for the same project.
4. **Open the right page.** Use `localhost` in the URL (a server the user started may listen on IPv6 only, which `127.0.0.1` would miss). Map a doc path to its page: `docs/flows/journey/warehouse-selection.md` → `http://localhost:3000/flows/journey/warehouse-selection.html`.
   - Right after docs were written or changed: open the first changed doc and list the other URLs in the report.
   - Otherwise: open the home page, `http://localhost:3000/`.
   - With a built-in browser (for example the Claude desktop app's browser pane), open it there. Without one, print the URLs. Do not open the user's own browser unless they ask.
5. **Leave the server running** and say so, with how to stop it: ask to stop the book, press `Ctrl+C` in its terminal, or stop the background process.

## Stop

1. Find the server: `lsof -nP -iTCP:3000 -sTCP:LISTEN` (and the next ports if a different one was used), or `pgrep -fl "mdbook serve"`.
2. Stop only `mdbook` processes for this project. Never stop other processes on the port.
3. Confirm nothing is listening anymore.

## Limits

- Only files inside `docs/` appear in the book. Links from docs to `../AGENTS.md` or to source files work on GitHub but not in the book, so `docs/README.md` mentions `AGENTS.md` as code text, not a link.
- The book is for reading, not a deliverable: never commit `book/`. Publishing it (CI, GitHub Pages) is outside this skill.

## AI Workflow Rules

- **Log every change** to project files (`book.toml`, `docs/SUMMARY.md`, `docs/theme/`, `.gitignore`) in `ai.log` in the project root, one line each: `[YYYY-MM-DD HH:MM:SS] <brief description>`. Starting or stopping the server is not a file change.
- **End with a short report:** what was set up or synced, the build result, the URL(s) opened, and whether a server is still running.
