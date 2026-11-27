---
name: edts-project-docs
description: Generate or update human- and AI-readable documentation (AGENTS.md, CLAUDE.md, docs/ARCHITECTURE.md, module, service and flow docs, the docs index, docs/STATUS.md) for EDTS iOS and Android projects. Writes Markdown only, never source files. Use this whenever asked to document a project, module, feature, service, or flow, or when a change makes existing docs out of date. For DocC/KDoc comments in source, use edts-code-docs.
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
| [references/5-service-docs.md](references/5-service-docs.md)                   | Service docs: backend APIs and SDKs            |
| [references/6-status-tracking.md](references/6-status-tracking.md)             | docs/STATUS.md — shared task list              |
| [references/7-review-checklist.md](references/7-review-checklist.md)           | Self-review before finishing, final report     |

Templates live in [assets/templates/](assets/templates/), one folder per doc type, one file per variant. Always start from a template; never invent a new layout. Write each doc into the matching project folder and drop `.template` from the name:

| Template | Written to |
| --- | --- |
| `assets/templates/project/AGENTS.template.md` | `AGENTS.md` (`ARCHITECTURE`, `STATUS` → `docs/`) |
| `assets/templates/project/INDEX.template.md` | `docs/README.md` (the docs index) |
| `assets/templates/module/<variant>.template.md` | `docs/modules/<variant>/<name>.md` |
| `assets/templates/service/<variant>.template.md` | `docs/services/<variant>/<name>.md` |
| `assets/templates/flow/<variant>.template.md` | `docs/flows/<variant>/<name>.md` |

| Doc type | Variants (`<type>/<variant>`) |
| --- | --- |
| Module | `module/feature`, `module/core` |
| Flow | `flow/sequence`, `flow/journey` |
| Service | `service/rest`, `service/sdk` |

Pick the variant with the rules in references 4 and 5, unless the user or the task row names one. **The folder is the template**: a doc in `docs/flows/journey/` uses `flow/journey`. Write the same `<type>/<variant>` in the task's **Type** column. Several variants of one type can be used in the same project.

## Output Layout

```
<repo root>/
├── AGENTS.md              # entry point for agents and new engineers
├── CLAUDE.md              # one line: @AGENTS.md
└── docs/
    ├── README.md          # docs index: every doc, grouped by type and variant
    ├── SUMMARY.md         # only with edts-book-docs: book sidebar, same docs as README.md
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

This skill writes **Markdown only**: `AGENTS.md`, `CLAUDE.md`, and everything under `docs/`. **Never edit a source file**; read source, write docs.

Doc comments in source (DocC `///`, KDoc `/** */`), `.docc` catalogs, and Dokka belong to the `edts-code-docs` skill. If the user asks for them, say so and stop; do not write them here. `C` rows in `docs/STATUS.md` are also handled by `edts-code-docs`.

## Workflow

### Create mode (no docs yet, or the user asks to "document this project")

Work in this order. Stop where the user asked — "add AGENTS.md" means steps 1–2 only.

1. `docs/STATUS.md` — inventory of all tasks — [references/6-status-tracking.md](references/6-status-tracking.md)
2. `AGENTS.md` + `CLAUDE.md` — [references/2-agents-md.md](references/2-agents-md.md)
3. `docs/ARCHITECTURE.md` — [references/3-architecture.md](references/3-architecture.md)
4. `docs/modules/`, `docs/flows/` — [references/4-module-docs.md](references/4-module-docs.md)
5. `docs/services/` — [references/5-service-docs.md](references/5-service-docs.md)
6. `docs/README.md` — add every doc written in this run to the index (see below)

For a large project, finish after step 3, write the index, leave the rest as `todo` rows in `docs/STATUS.md`, and report. The team picks up the remaining rows in task mode.

### Task mode (the user names a task ID such as `D04` / `S02`, or asks for "the next task")

Follow [references/6-status-tracking.md](references/6-status-tracking.md). A `C` task ID belongs to `edts-code-docs`: tell the user to run it with that skill.

### Update mode (the user asks to update docs for a change or branch)

1. Read the diff: `git diff <base>...HEAD --stat`, then the changed files.
2. Find docs that mention the changed paths, types, or commands (`grep -rn` in `AGENTS.md` and `docs/`).
3. Edit only the affected sections. Do not rewrite unaffected docs.
4. If the change adds a module, create its `docs/modules/<variant>/<module>.md`, add it to `ARCHITECTURE.md`, and append its rows to `docs/STATUS.md`.
5. If an endpoint, request/response model, or SDK call changed, update its `docs/services/` doc.
6. Update `docs/README.md` (and `docs/SUMMARY.md` if the project has `book.toml`) if a doc was added, moved, or renamed.

### Docs index — `docs/README.md`

One page that lists every doc that exists, grouped by type and variant, with a one-line "Covers" summary each. GitHub, GitLab and Bitbucket show it automatically when someone opens `docs/`. Use [assets/templates/project/INDEX.template.md](assets/templates/project/INDEX.template.md).

- Update it in **every** run that adds, moves, renames, or removes a doc, including task mode.
- List only docs that exist. Planned docs stay in `docs/STATUS.md`.
- Drop sections and variant tables that have no docs yet.

**Book sidebar:** if the project has `book.toml` (it uses the `edts-book-docs` skill), make the same change in `docs/SUMMARY.md`: same docs and groups as the index, variant groups as unlinked entries (`- [Feature]()`) with docs indented under them. Then end the report with: "To read it as a book, run `/edts-book-docs`." Never run mdBook from this skill.

## Core Rules

- **Read before you write.** Never describe a file, type, command, or flow you have not opened or run. Guessing from names is how docs become wrong.
- **Document what the code cannot say.** Why a pattern exists, invariants, ordering, side effects, traps. Do not narrate what a reader sees by opening the file.
- **Use real paths and runnable commands.** `Modules/Core/Sources/Core/Network/APIClient.swift`, not "the network layer".
- **Prefer tables and lists over prose** for anything with structure: modules, paths, env configs, endpoints.
- **One topic per file.** An agent should be able to load only the doc it needs.
- **Mark uncertainty.** Anything inferred but not verified gets a `> [!NOTE] Unverified:` callout so a reviewer can confirm or fix it.
- **Never copy secrets.** No API keys, tokens, passwords, keystore/signing values, or `.xcconfig` / `local.properties` values. Name the file and key instead (e.g. "`API_KEY` in `Config/Dev.xcconfig`, ask the lead").
- **Never change code.** Source files are read-only, including comments.
- **Edit, don't replace.** If a doc already exists, update it in place and keep content written by humans unless it is provably wrong.

## AI Workflow Rules

- **Log every AI-made change** to `ai.log` in the project root — one line per change point, format: `[YYYY-MM-DD HH:MM:SS] <brief description>`. Create the file if it does not exist; never overwrite existing entries.
- **Ask the user about any unclear decision** before proceeding. "Why" questions the code cannot answer go into the Open Questions table in `docs/STATUS.md`, not into the docs as guesses.
- If the project is iOS and the `edts-ios-guidelines` skill is available, use it to understand the expected architecture, and document deviations from it as gotchas.
