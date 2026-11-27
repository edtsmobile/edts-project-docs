# EDTS Project Docs

Documentation skill for EDTS iOS and Android projects. Generates and maintains docs that both engineers and coding agents can read: `AGENTS.md`, `docs/ARCHITECTURE.md`, module, service and flow docs, a docs index, and a shared task list. Markdown only: it never edits source files.

Companion skills: [`edts-code-docs`](../edts-code-docs/) writes DocC/KDoc comments in source; [`edts-book-docs`](../edts-book-docs/) reads these docs as a searchable book.

## Installation

Requires Node.js and read access to the `edtsmobile/edts-project-docs` repository. Then run:

```sh
npx skills add edtsmobile/edts-project-docs -s edts-project-docs
```

### Update

```sh
npx skills update -g edts-project-docs
```

### Remove

```sh
npx skills remove -g edts-project-docs
```

## What It Produces

Everything is plain Markdown inside the project's repo, so it is readable on GitHub/GitLab/Bitbucket, in any editor, and by coding agents. Each file starts from a template in [assets/templates/](assets/templates/).

```
<project root>/
├── AGENTS.md                      ← start here
├── CLAUDE.md                      ← one line: @AGENTS.md
└── docs/
    ├── README.md                  ← index of every doc
    ├── SUMMARY.md                 ← only with edts-book-docs: book sidebar
    ├── STATUS.md                  ← task list + open questions
    ├── ARCHITECTURE.md            ← how the app is built
    ├── modules/
    │   ├── feature/<area>.md      ← a screen area (cart, payment, login)
    │   └── core/<module>.md       ← shared code (base classes, helpers)
    ├── services/
    │   ├── rest/<service>.md      ← one backend service class
    │   └── sdk/<sdk>.md           ← one SDK (Firebase, payment, analytics)
    └── flows/
        ├── sequence/<flow>.md     ← code calls across layers
        └── journey/<flow>.md      ← screens and user choices
```

**Reading order for a new engineer or agent:** `AGENTS.md` → `docs/ARCHITECTURE.md` → `docs/README.md` → the module, service, or flow doc for the area they are working on.

### Project docs

Written once per project and kept up to date.

| File | Template | Purpose | Sections |
| --- | --- | --- | --- |
| `AGENTS.md` | `project/AGENTS` | The entry point. Read automatically by Codex, Cursor, Copilot, Gemini CLI and others; Claude reads it through `CLAUDE.md`. At most 150 lines. | Build & Test (schemes/variants, exact commands) · Configuration (config files and who provides them, never values) · Architecture (2 lines + link) · Where Things Live (folder table) · Conventions · Gotchas · More Docs |
| `CLAUDE.md` | — | Makes Claude Code read `AGENTS.md`. | One line: `@AGENTS.md` |
| `docs/README.md` | `project/INDEX` | The docs index. Git hosts show it when someone opens `docs/`. Lists only docs that exist. | Overview · Modules (Feature, Core) · Services (REST, SDK) · Flows (Sequence, Journey), each a table of doc + one-line summary |
| `docs/STATUS.md` | `project/STATUS` | Shared task list so several people can document one project in parallel, and a place for questions only the team can answer. | Docs Tasks (`D01`…) · Service Tasks (`S01`…) · Code Doc Tasks (`C01`…) · Open Questions (`Q01`…). Each task row has Doc, Type, Status, Owner, PR, Notes |
| `docs/ARCHITECTURE.md` | `project/ARCHITECTURE` | How the app is put together, built from the real build files and code. | Overview · Module Map (table + mermaid dependency graph) · Layers (owns / must not / base types) · Data Flow (one request as a sequence diagram) · Cross-Cutting Concerns (DI, navigation, networking, persistence, auth & session, analytics & logging, feature flags) · Environments · Deviations from the EDTS guidelines |

### Module docs — `docs/modules/`

One doc per area of the app. Pick the variant by asking: does it have screens?

| | `module/feature` | `module/core` |
| --- | --- | --- |
| **Use for** | A user-facing area made of screens: login, cart, payment, profile | Shared code with no screens: base classes, helpers, networking core, design system |
| **Answers** | "What does the user see here, and where does the data come from?" | "What can I reuse, and what will bite me?" |
| **Sections** | Header (folders, services, entry points) · Screens · Navigation (from → to, trigger, code) · Data (loaded by, service, cache) · Screen States (loading / empty / error / logged out) · State & Side Effects · Gotchas · Related | Header (path, depends on, used by) · Public API (symbol, kind, usage count from `grep`) · State & Side Effects · Gotchas · Related |
| **Emart example** | `feature/cart.md` | `core/core-base-and-helpers.md` |

Module docs link to service docs instead of repeating endpoints.

### Service docs — `docs/services/`

The contract between the app and something outside it. Pick the variant by asking: is it our backend or someone's SDK?

| | `service/rest` | `service/sdk` |
| --- | --- | --- |
| **Use for** | The app's own backend: one doc per service class or API client (`CartService`, Retrofit interface) | A third-party or in-house SDK: one doc per SDK, even if several of its products are used |
| **Answers** | "Which endpoint, what goes in and out, and how are errors handled?" | "How is it set up per environment, what do we use, and what data leaves the app?" |
| **Sections** | Header (code, repository, base URL config key, used by) · Endpoints (method, path, request/response types, caller) · Headers & Auth · Response Handling (exact success rule + every failure branch) · Endpoint Details (only non-obvious fields) · Caching & Retries · Gotchas · Related | Header (dependency + version, where initialised) · Setup (config files, keys, per environment) · Features Used · Data Sent (and whether it is personal data) · Gotchas · Related |
| **Emart example** | `rest/login-service.md` | `sdk/firebase.md` |

Hostnames, keys, and tokens are never copied. Docs name the config key (e.g. `HOST_URL` in `Info.plist`) instead.

### Flow docs — `docs/flows/`

Something that crosses modules. Pick the variant by asking: is the reader following code calls or screens?

| | `flow/sequence` | `flow/journey` |
| --- | --- | --- |
| **Use for** | A process across code layers: login + token refresh, push handling, checkout | Mostly screens and user choices: onboarding, registration, scanning a rack |
| **Answers** | "Which code calls which, and what happens when it fails?" | "What does the user do, step by step, and where can it branch?" |
| **Sections** | Trigger + modules/services involved · Happy Path (mermaid sequence diagram + numbered steps) · Failure Paths (failure, detected in, what happens) · Gotchas | Entry points + modules · Map (mermaid flowchart of screens) · Steps (screen, user does, app does, code) · Branches & Exits · Gotchas |
| **Emart example** | `sequence/login-and-token-refresh.md` | `journey/warehouse-selection.md` |

Every arrow and step must match code the agent actually opened.

### Rules every doc follows

- Written from code the agent opened and commands it ran, never from file names alone.
- Real paths, type names, and runnable commands; tables over prose.
- Anything inferred is marked `> [!NOTE] Unverified:` for a reviewer to confirm.
- "Why" questions the code can't answer go to Open Questions in `STATUS.md`, never into the docs as guesses.
- Sections that don't apply are left out, not written as "N/A".

## How to Use

Run every prompt from the **project root** (the folder with the `.xcodeproj` / `.xcworkspace` or `settings.gradle`), on a **new branch**. Mention the skill by name so the agent loads it.

### 1. First run (one person, once per project)

```
Document this project using edts-project-docs
```

The agent detects the platform (iOS or Android) and the existing docs, then writes:

| File | What it is |
| --- | --- |
| `docs/STATUS.md` | Task list for every doc the project needs, plus open questions |
| `AGENTS.md` + `CLAUDE.md` | Entry point: build commands, config, architecture summary, gotchas |
| `docs/ARCHITECTURE.md` | Layers, module map, data flow, environments |
| `docs/README.md` | Index of every doc |

On a large project it stops here and leaves the module, service, and flow docs as `todo` rows for the team. It ends with a report: files written, anything it could not verify, and open questions.

Review the docs, fix anything wrong, then commit and open a PR.

### 2. Split the rest with the team

Each row in `docs/STATUS.md` is one doc. `D` rows are docs, `S` rows are services, `C` rows are doc comments.

1. Pick a `todo` row. Put your name in **Owner**, set **Status** to `in-progress`, then commit and push that one line, so nobody else takes it.
2. Ask your agent:
   ```
   Do D07 from docs/STATUS.md using edts-project-docs
   ```
3. The agent writes the doc, adds it to `docs/README.md`, and sets the row to `done`.
4. Review it and open a PR. If the reviewer finds problems, fix the doc; the row stays `done`.

Not sure what to take? Ask for `the next task from docs/STATUS.md using edts-project-docs`.

### 3. Answer open questions

The agent never guesses why the code is the way it is. Those questions go into the **Open Questions** table in `docs/STATUS.md` (`Q01`, `Q02`, …). Anyone who knows the answer writes it in the **Answer** column. The next task in that area turns the answer into docs.

### 4. Keep docs current

After a change that affects documented behavior, before or during the PR:

```
Update the docs for the changes on this branch using edts-project-docs
```

The agent reads the branch diff, edits only the affected sections, adds docs for new modules or services, and updates the index.

### Prompt cheat sheet

| Goal | Prompt |
| --- | --- |
| Document a new project | `Document this project using edts-project-docs` |
| Only the entry point | `Add AGENTS.md using edts-project-docs` |
| Do one task | `Do D07 from docs/STATUS.md using edts-project-docs` |
| Do the next open task | `Do the next task from docs/STATUS.md using edts-project-docs` |
| Choose the template variant | `Do D18 from docs/STATUS.md with flow/journey using edts-project-docs` |
| Document one service | `Document CartService using edts-project-docs` |
| Update after code changes | `Update the docs for the changes on this branch using edts-project-docs` |

### Doc comments in source

DocC `///` and KDoc `/** */` comments are a separate skill, [`edts-code-docs`](../edts-code-docs/). It fills and does the Code Doc Tasks (`C01`…) in the same `docs/STATUS.md`. This skill leaves those rows alone.

### Reviewing a docs PR

Every generated doc must be reviewed by someone who knows the codebase. Check:

- Facts match the code: class names, paths, commands, screen names.
- Every `> [!NOTE] Unverified:` callout: confirm it, or correct it and remove the note.
- No secrets: API keys, tokens, and base URLs appear only as config key names, never values.
- `git diff --stat` shows no source files.

### Reading as a book

To read the docs as a website with a sidebar and search, install the companion skill [`edts-book-docs`](../edts-book-docs/) and run `/edts-book-docs`. This skill keeps `docs/SUMMARY.md` in sync when the project has `book.toml`, but never runs mdBook itself.

### Good to know

- The agent never commits or pushes. You decide what goes in each commit.
- Each change is logged to `ai.log` in the project root. Many repos ignore `*.log`, so it may stay local.
- For iOS projects, install `edts-ios-guidelines` too. The agent then records where the project differs from the EDTS guidelines.

## Structure

Follows the [Agent Skills](https://agentskills.io/specification) layout:

```
edts-project-docs/
├── SKILL.md            # entry point: workflow, core rules
├── references/         # detailed rules, loaded only when a step needs them
│   └── 1-platform-detection.md … 7-review-checklist.md
└── assets/
    └── templates/      # one folder per doc type, one file per variant
        ├── project/    # AGENTS, ARCHITECTURE, STATUS, INDEX
        ├── module/     # feature, core
        ├── service/    # rest, sdk
        └── flow/       # sequence, journey
```

Templates are named `*.template.md` so agents don't mistake `assets/templates/project/AGENTS.template.md` for real project instructions.
