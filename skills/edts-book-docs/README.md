# EDTS Docs Book

Read the docs written by [`edts-project-docs`](../edts-project-docs/) as a searchable book: sidebar, search, light/dark themes, and rendered mermaid diagrams, using [mdBook](https://rust-lang.github.io/mdBook/). The docs stay plain Markdown; this skill only adds the files mdBook needs and runs it.

## Installation

Requires Node.js and read access to the `edtsmobile/edts-project-docs` repository:

```sh
npx skills add edtsmobile/edts-project-docs -s edts-book-docs
```

mdBook itself is installed on first use. The agent asks before running `brew install mdbook`; say no and nothing is installed.

## How to Use

From the project root, after the project has docs (`docs/README.md`):

| Goal | Prompt |
| --- | --- |
| Open the book | `/edts-book-docs` or `Open the docs book` |
| Set it up in a new project | `Set up the docs book using edts-book-docs` |
| Show a page you just wrote | `/edts-book-docs` right after `/edts-project-docs`: it opens the changed page |
| Stop the server | `Stop the docs book` |

The agent:

1. Writes `book.toml`, `docs/SUMMARY.md`, and `docs/theme/mermaid-init.js` the first time, and adds `book/` to `.gitignore`.
2. Rebuilds `docs/SUMMARY.md` from the docs index (`docs/README.md`) on every run, so every doc appears in the sidebar.
3. Builds the book, starts `mdbook serve` on `http://localhost:3000` (or reuses one already running), and opens the page in its built-in browser. Agents without a browser give you the link.

To run it yourself:

```sh
mdbook serve --open
```

## What It Adds to a Project

| File | Purpose | Commit it? |
| --- | --- | --- |
| `book.toml` | mdBook settings: title, `src = "docs"`, plain sidebar titles | Yes |
| `docs/SUMMARY.md` | Sidebar: same docs and groups as `docs/README.md` | Yes |
| `docs/theme/mermaid-init.js` | Renders mermaid diagrams (loads mermaid from a CDN; offline they show as code) | Yes |
| `book/` | Generated HTML | No, it's ignored |

## Structure

```
edts-book-docs/
├── SKILL.md            # modes: setup, sync, preview, stop
└── assets/templates/
    ├── book.template.toml
    ├── SUMMARY.template.md
    └── mermaid-init.js
```
