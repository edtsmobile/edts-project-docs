# EDTS Project Docs

Agent skills for documenting EDTS iOS and Android projects so both engineers and coding agents can read the docs.

| Skill | What it does |
| --- | --- |
| [`edts-project-docs`](skills/edts-project-docs/) | Writes and maintains the docs: `AGENTS.md`, `docs/ARCHITECTURE.md`, module, service and flow docs, the docs index, and a shared `docs/STATUS.md` task list. Markdown only |
| [`edts-code-docs`](skills/edts-code-docs/) | Optional. Writes in-code docs: DocC `///` (Swift) and KDoc `/** */` (Kotlin) comments on shared code, comment lines only. Does the `C` rows in `docs/STATUS.md` |
| [`edts-book-docs`](skills/edts-book-docs/) | Optional. Reads those docs as a searchable book with mdBook: sets it up, builds, serves on localhost, opens pages in the agent's browser, and stops it |

## Install

```sh
npx skills add edtsmobile/edts-project-docs -s edts-project-docs
```

Optional companions:

```sh
npx skills add edtsmobile/edts-project-docs -s edts-code-docs
npx skills add edtsmobile/edts-project-docs -s edts-book-docs
```

Usage: [edts-project-docs](skills/edts-project-docs/README.md) · [edts-code-docs](skills/edts-code-docs/README.md) · [edts-book-docs](skills/edts-book-docs/README.md)
