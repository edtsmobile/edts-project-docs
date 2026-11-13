# Docs Book — mdBook

The docs can also be read as a book with a sidebar, search, and light/dark themes, using [mdBook](https://rust-lang.github.io/mdBook/). mdBook reads the same Markdown in `docs/`; nothing about the docs changes. The book is optional: the docs stay complete and readable on GitHub without it.

## Files

| File | Template | Purpose |
| --- | --- | --- |
| `book.toml` (project root) | [assets/templates/project/book.template.toml](../assets/templates/project/book.template.toml) | mdBook settings: title, `src = "docs"`, output folder |
| `docs/SUMMARY.md` | [assets/templates/project/SUMMARY.template.md](../assets/templates/project/SUMMARY.template.md) | Sidebar order. mdBook only renders pages listed here |
| `docs/theme/mermaid-init.js` | [assets/templates/project/mermaid-init.js](../assets/templates/project/mermaid-init.js) | Renders ` ```mermaid ` blocks as diagrams (loads mermaid from a CDN; without internet, diagrams stay as code) |
| `book/` | — | Generated output. Add `book/` to `.gitignore`; never commit it |

`docs/README.md` (the docs index) becomes the book's home page automatically.

## Setup (create mode, or when the user asks for the book)

1. Check whether mdBook is installed: `mdbook --version`.
2. If it is missing, **ask the user** before installing anything:
   > mdBook is not installed. It lets the team read these docs as a searchable book. Install it with Homebrew (`brew install mdbook`)?
   - **Yes:** run `brew install mdbook`. If Homebrew is missing, say so and stop the book setup; do not install Homebrew.
   - **No:** skip the build steps below, still write the files, and say in the final report that the book was not built.
   Never install it without the user's yes, and ask once per run, not per file.
3. Copy the three templates into the project and fill the title and `SUMMARY.md` entries.
4. Add `book/` to the project's `.gitignore` if it is not there.
5. If mdBook is installed, run `mdbook build` from the project root and fix any error it reports.

## Keeping `SUMMARY.md` in Sync

`SUMMARY.md` and `docs/README.md` list the same docs in the same groups. Whenever you add, move, rename, or remove a doc in `docs/README.md`, make the same change in `SUMMARY.md`, in the same run.

- Every doc in `docs/` must be listed, or it is missing from the book. Pages listed but not on disk make the build fail (`create-missing = false`).
- Variant groups (`Feature`, `Core`, `REST`, `SDK`, `Sequence`, `Journey`) are written as unlinked entries (`- [Feature]()`), with their docs indented under them.
- Leave out parts and groups with no docs yet.
- `book.toml`, `SUMMARY.md`, and `docs/theme/` are not docs: do not list them in `docs/README.md`.

## Limits

- Only files inside `docs/` appear in the book. Links from docs to `../AGENTS.md` or to source files work on GitHub but not in the book. Mention `AGENTS.md` as code text (`` `AGENTS.md` ``) instead of a link in `docs/README.md`.
- Building the book is a check, not a deliverable: never commit `book/`. Publishing it (CI, GitHub Pages) is outside this skill.

## Reading the Book

```sh
mdbook serve --open
```

Run from the project root. It opens the book in the browser and reloads on every save.
