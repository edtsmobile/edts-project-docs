---
name: edts-project-docs
description: Generate or update human- and AI-readable documentation (AGENTS.md, CLAUDE.md, docs/ARCHITECTURE.md, module, service and flow docs, DocC/KDoc comments) for EDTS iOS and Android projects. Use this whenever asked to document a project, module, feature, or public API, or when a change makes existing docs out of date.
---

# EDTS Project Documentation

You are documenting an **EDTS mobile project** (iOS or Android). The output must be useful to two readers at once: a new engineer and a coding agent starting with no context. These rules are mandatory — follow them without being reminded.

**First, always detect the platform and existing docs** using [references/1-platform-detection.md](references/1-platform-detection.md), then apply the matching rules below.

| File                                                                 | Topic                                          |
| -------------------------------------------------------------------- | ---------------------------------------------- |
| [references/1-platform-detection.md](references/1-platform-detection.md)       | Detecting iOS vs. Android and existing docs    |
| [references/2-agents-md.md](references/2-agents-md.md)                         | AGENTS.md and CLAUDE.md — the entry point      |
| [references/3-architecture.md](references/3-architecture.md)                   | docs/ARCHITECTURE.md                           |
| [references/4-module-docs.md](references/4-module-docs.md)                     | Module and flow docs — template variants       |
| [references/5-doc-comments-ios.md](references/5-doc-comments-ios.md)           | Swift doc comments and DocC                    |
| [references/6-doc-comments-android.md](references/6-doc-comments-android.md)   | KDoc and Dokka                                 |
| [references/7-review-checklist.md](references/7-review-checklist.md)           | Self-review before finishing, final report     |
| [references/8-status-tracking.md](references/8-status-tracking.md)             | docs/STATUS.md — shared task list              |
| [references/9-service-docs.md](references/9-service-docs.md)                   | Service docs: backend APIs and SDKs            |
| [references/10-mdbook.md](references/10-mdbook.md)                             | Reading the docs as a book with mdBook         |

Templates live in [assets/templates/](assets/templates/), one folder per doc type, one file per variant. Always start from a template; never invent a new layout. Write each doc into the matching project folder and drop `.template` from the name:

| Template | Written to |
| --- | --- |
| `assets/templates/project/AGENTS.template.md` | `AGENTS.md` (`ARCHITECTURE`, `STATUS` → `docs/`) |
| `assets/templates/project/INDEX.template.md` | `docs/README.md` (the docs index) |
| `assets/templates/project/SUMMARY.template.md`, `book.template.toml`, `mermaid-init.js` | `docs/SUMMARY.md`, `book.toml`, `docs/theme/mermaid-init.js` (mdBook) |
| `assets/templates/module/<variant>.template.md` | `docs/modules/<variant>/<name>.md` |
| `assets/templates/service/<variant>.template.md` | `docs/services/<variant>/<name>.md` |
| `assets/templates/flow/<variant>.template.md` | `docs/flows/<variant>/<name>.md` |

| Doc type | Variants (`<type>/<variant>`) |
| --- | --- |
| Module | `module/feature`, `module/core` |
| Flow | `flow/sequence`, `flow/journey` |
| Service | `service/rest`, `service/sdk` |

Pick the variant with the rules in references 4 and 9, unless the user or the task row names one. **The folder is the template**: a doc in `docs/flows/journey/` uses `flow/journey`. Write the same `<type>/<variant>` in the task's **Type** column. Several variants of one type can be used in the same project.

## Output Layout

```
<repo root>/
├── AGENTS.md              # entry point for agents and new engineers
├── CLAUDE.md              # one line: @AGENTS.md
└── docs/
    ├── README.md          # docs index: every doc, grouped by type and variant
    ├── SUMMARY.md         # mdBook sidebar, same docs as README.md
    ├── STATUS.md          # shared task list + open questions
    ├── ARCHITECTURE.md
    ├── modules/
    │   ├── feature/<area>.md      # screens users see
    │   └── core/<module>.md       # shared code
    ├── services/
    │   ├── rest/<service>.md      # own backend API
    │   └── sdk/<sdk>.md           # Firebase, payment, analytics…
    └── flows/
        ├── sequence/<flow>.md     # code calls across layers
        └── journey/<flow>.md      # screens and user choices
```

## Scope

There are two separate tracks. Pick the scope from the user's words. **The default is `docs`.**

| Scope | Writes | References |
| --- | --- | --- |
| `docs` (default) | `AGENTS.md`, `CLAUDE.md`, everything under `docs/` | 2, 3, 4, 9, 10 |
| `code` | Doc comments in source: DocC `///` (iOS) or KDoc `/** */` (Android). A `.docc` catalog or Dokka setup only if explicitly asked | 5 or 6 |
| `all` | Both tracks | 2–6, 9, 10 |

- Use `code` only when the user mentions doc comments, DocC, KDoc, Dokka, or API docs. Use `all` only when they ask for both.
- In `docs` scope, **never edit a source file**. Read source, write only Markdown.
- In `code` scope, edit only comment lines in source. Do not create or change files in `docs/` except `docs/STATUS.md`.
- When unsure, use `docs` and mention in the final report that the `code` track is available.

## Workflow

### Create mode (no docs yet, or the user asks to "document this project")

Work in this order. Stop where the user asked — "add AGENTS.md" means steps 1–2 only.

1. `docs/STATUS.md` — inventory of all tasks — [references/8-status-tracking.md](references/8-status-tracking.md)
2. **docs track:** `AGENTS.md` + `CLAUDE.md` — [references/2-agents-md.md](references/2-agents-md.md)
3. **docs track:** `docs/ARCHITECTURE.md` — [references/3-architecture.md](references/3-architecture.md)
4. **docs track:** `docs/modules/`, `docs/flows/` — [references/4-module-docs.md](references/4-module-docs.md)
5. **docs track:** `docs/services/` — [references/9-service-docs.md](references/9-service-docs.md)
6. **code track** (`code` / `all` scope only): doc comments per module, shared modules first — references 5 or 6
7. **docs track:** `docs/README.md` — add every doc written in this run to the index (see below)
8. **docs track:** mdBook — `book.toml`, `docs/SUMMARY.md`, `docs/theme/mermaid-init.js`; ask before installing mdBook — [references/10-mdbook.md](references/10-mdbook.md)

For a large project, finish after step 3, write the index and the mdBook files, leave the rest as `todo` rows in `docs/STATUS.md`, and report. The team picks up the remaining rows in task mode.

### Task mode (the user names a task ID such as `D04` / `S02` / `C02`, or asks for "the next task")

Follow [references/8-status-tracking.md](references/8-status-tracking.md). The task ID decides the track: `D` and `S` = docs track, `C` = code track.

### Update mode (the user asks to update docs for a change or branch)

1. Read the diff: `git diff <base>...HEAD --stat`, then the changed files.
2. Find docs that mention the changed paths, types, or commands (`grep -rn` in `AGENTS.md` and `docs/`).
3. Edit only the affected sections. Do not rewrite unaffected docs.
4. If the change adds a module, create its `docs/modules/<variant>/<module>.md`, add it to `ARCHITECTURE.md`, and append its rows to `docs/STATUS.md`.
5. If an endpoint, request/response model, or SDK call changed, update its `docs/services/` doc.
6. In `code` / `all` scope, also update doc comments on changed public symbols.
7. Update `docs/README.md` and `docs/SUMMARY.md` if a doc was added, moved, or renamed. If mdBook is installed, run `mdbook build`.

### Docs index — `docs/README.md`

One page that lists every doc that exists, grouped by type and variant, with a one-line "Covers" summary each. GitHub, GitLab and Bitbucket show it automatically when someone opens `docs/`. Use [assets/templates/project/INDEX.template.md](assets/templates/project/INDEX.template.md).

- Update it in **every** run that adds, moves, renames, or removes a doc, including task mode. Make the same change in `docs/SUMMARY.md` (reference 10).
- List only docs that exist. Planned docs stay in `docs/STATUS.md`.
- Drop sections and variant tables that have no docs yet.

## Core Rules

- **Read before you write.** Never describe a file, type, command, or flow you have not opened or run. Guessing from names is how docs become wrong.
- **Document what the code cannot say.** Why a pattern exists, invariants, ordering, side effects, traps. Do not narrate what a reader sees by opening the file.
- **Use real paths and runnable commands.** `Modules/Core/Sources/Core/Network/APIClient.swift`, not "the network layer".
- **Prefer tables and lists over prose** for anything with structure: modules, paths, env configs, endpoints.
- **One topic per file.** An agent should be able to load only the doc it needs.
- **Mark uncertainty.** Anything inferred but not verified gets a `> [!NOTE] Unverified:` callout so a reviewer can confirm or fix it.
- **Never copy secrets.** No API keys, tokens, passwords, keystore/signing values, or `.xcconfig` / `local.properties` values. Name the file and key instead (e.g. "`API_KEY` in `Config/Dev.xcconfig`, ask the lead").
- **Never change code behavior.** In `docs` scope, source files are read-only. In `code` scope, doc comments are the only source edits allowed.
- **Edit, don't replace.** If a doc already exists, update it in place and keep content written by humans unless it is provably wrong.

## AI Workflow Rules

- **Log every AI-made change** to `ai.log` in the project root — one line per change point, format: `[YYYY-MM-DD HH:MM:SS] <brief description>`. Create the file if it does not exist; never overwrite existing entries.
- **Ask the user about any unclear decision** before proceeding. "Why" questions the code cannot answer go into the Open Questions table in `docs/STATUS.md`, not into the docs as guesses.
- If the project is iOS and the `edts-ios-guidelines` skill is available, use it to understand the expected architecture, and document deviations from it as gotchas.
