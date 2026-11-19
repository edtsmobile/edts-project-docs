# EDTS Project Docs

Agent skills for documenting EDTS iOS and Android projects so both engineers and coding agents can read the docs.

| Skill | What it does |
| --- | --- |
| [`edts-project-docs`](skills/edts-project-docs/) | Writes and maintains the docs: `AGENTS.md`, `docs/ARCHITECTURE.md`, module, service and flow docs, the docs index, a shared `docs/STATUS.md` task list, and (on request) DocC/KDoc comments |
| [`edts-docs-book`](skills/edts-docs-book/) | Optional. Reads those docs as a searchable book with mdBook: sets it up, builds, serves on localhost, opens pages in the agent's browser, and stops it |

## Install

```sh
npx skills add edtsmobile/edts-project-docs -s edts-project-docs
```

Add the book reader too (optional):

```sh
npx skills add edtsmobile/edts-project-docs -s edts-docs-book
```

Usage: [edts-project-docs](skills/edts-project-docs/README.md) · [edts-docs-book](skills/edts-docs-book/README.md)
