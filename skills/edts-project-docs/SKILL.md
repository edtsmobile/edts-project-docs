---
name: edts-project-docs
description: Generate or update human- and AI-readable documentation (AGENTS.md, CLAUDE.md, docs/ARCHITECTURE.md, module docs, flows, ADRs, DocC/KDoc comments) for EDTS iOS and Android projects. Use this whenever asked to document a project, module, feature, or public API, or when a change makes existing docs out of date.
---

# EDTS Project Documentation

You are documenting an **EDTS mobile project** (iOS or Android). The output must be useful to two readers at once: a new engineer and a coding agent starting with no context. These rules are mandatory — follow them without being reminded.

**First, always detect the platform and existing docs** using [references/1-platform-detection.md](references/1-platform-detection.md), then apply the matching rules below.

| File                                                                 | Topic                                          |
| -------------------------------------------------------------------- | ---------------------------------------------- |
| [references/1-platform-detection.md](references/1-platform-detection.md)       | Detecting iOS vs. Android and existing docs    |
| [references/2-agents-md.md](references/2-agents-md.md)                         | AGENTS.md and CLAUDE.md — the entry point      |
| [references/3-architecture.md](references/3-architecture.md)                   | docs/ARCHITECTURE.md                           |
| [references/4-module-docs.md](references/4-module-docs.md)                     | Module docs, flows, and ADRs                   |
| [references/5-doc-comments-ios.md](references/5-doc-comments-ios.md)           | Swift doc comments and DocC                    |
| [references/6-doc-comments-android.md](references/6-doc-comments-android.md)   | KDoc and Dokka                                 |
| [references/7-review-checklist.md](references/7-review-checklist.md)           | Self-review before finishing, final report     |
| [references/8-status-tracking.md](references/8-status-tracking.md)             | docs/STATUS.md — shared task list              |

Templates live in [assets/](assets/) as `<NAME>.template.md`. Always start from a template; never invent a new layout. Drop the `.template` part when writing the file into the project (e.g. `assets/AGENTS.template.md` → `AGENTS.md`).

## Output Layout

```
<repo root>/
├── AGENTS.md              # entry point for agents and new engineers
├── CLAUDE.md              # one line: @AGENTS.md
└── docs/
    ├── STATUS.md          # shared task list + open questions
    ├── ARCHITECTURE.md
    ├── modules/<module>.md
    ├── flows/<flow>.md
    └── adr/NNNN-<title>.md
```

## Scope

There are two separate tracks. Pick the scope from the user's words. **The default is `docs`.**

| Scope | Writes | References |
| --- | --- | --- |
| `docs` (default) | `AGENTS.md`, `CLAUDE.md`, everything under `docs/` | 2, 3, 4 |
| `code` | Doc comments in source: DocC `///` (iOS) or KDoc `/** */` (Android). A `.docc` catalog or Dokka setup only if explicitly asked | 5 or 6 |
| `all` | Both tracks | 2–6 |

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
4. **docs track:** `docs/modules/*.md`, `docs/flows/*.md`, ADRs — [references/4-module-docs.md](references/4-module-docs.md)
5. **code track** (`code` / `all` scope only): doc comments per module, shared modules first — references 5 or 6

For a large project, finish after step 3, leave the rest as `todo` rows in `docs/STATUS.md`, and report. The team picks up the remaining rows in task mode.

### Task mode (the user names a task ID such as `D04` / `C02`, or asks for "the next task")

Follow [references/8-status-tracking.md](references/8-status-tracking.md). The task ID decides the track: `D` = docs track, `C` = code track.

### Update mode (the user asks to update docs for a change or branch)

1. Read the diff: `git diff <base>...HEAD --stat`, then the changed files.
2. Find docs that mention the changed paths, types, or commands (`grep -rn` in `AGENTS.md` and `docs/`).
3. Edit only the affected sections. Do not rewrite unaffected docs.
4. If the change adds a module, create its `docs/modules/<module>.md`, add it to `ARCHITECTURE.md`, and append its rows to `docs/STATUS.md`.
5. In `code` / `all` scope, also update doc comments on changed public symbols.

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
