# EDTS Project Docs

Documentation skill for EDTS iOS and Android projects. Generates and maintains docs that both engineers and coding agents can read: `AGENTS.md`, `docs/ARCHITECTURE.md`, module docs, flows, ADRs, and DocC/KDoc comments.

## Installation

Make sure Node.js are installed, then run:

```sh
npx skills add edtsmobile/edts-project-docs
```

### Update

```sh
npx skills update -g edts-project-docs
```

### Remove

```sh
npx skills remove -g edts-project-docs
```

## How to use?

The skill has two tracks:

| Track | Writes | When |
| --- | --- | --- |
| **docs** (default) | `AGENTS.md`, `CLAUDE.md`, `docs/` (Markdown only, never touches source) | Always, unless you ask otherwise |
| **code** | DocC `///` (iOS) / KDoc `/** */` (Android) comments in source | Only when you ask for doc comments, DocC, or KDoc |

Ask your agent in the project root:

```
Document this project using edts-project-docs                      # docs track
Add DocC comments to this project using edts-project-docs          # code track
Document this project, docs and DocC, using edts-project-docs      # both
Update the docs for the changes on this branch using edts-project-docs
```

### Working as a team

The first run creates `docs/STATUS.md`, a task list with one row per doc (`D01`, `D02`, …) and per module for doc comments (`C01`, …). To help:

1. Pick a `todo` row, put your name in Owner, set it to `in-progress`, commit and push that line.
2. Ask your agent: `Do D04 from docs/STATUS.md using edts-project-docs`
3. Open a PR. The agent sets the row to `review`; set it to `done` after merge.

Questions the agent cannot answer from code go into the Open Questions table in the same file. Answer them there.

Every generated doc must be reviewed in a PR by someone who knows the codebase. The agent lists anything it could not verify and the questions it could not answer at the end of each run.

## Structure

Follows the [Agent Skills](https://agentskills.io/specification) layout:

```
edts-project-docs/
├── SKILL.md          # entry point: scope, workflow, core rules
├── references/       # detailed rules, loaded only when a step needs them
│   ├── 1-platform-detection.md
│   ├── 2-agents-md.md
│   ├── 3-architecture.md
│   ├── 4-module-docs.md
│   ├── 5-doc-comments-ios.md
│   ├── 6-doc-comments-android.md
│   ├── 7-review-checklist.md
│   └── 8-status-tracking.md
└── assets/           # templates copied into the project
    ├── AGENTS.template.md
    ├── ARCHITECTURE.template.md
    ├── MODULE.template.md
    ├── FLOW.template.md
    ├── ADR.template.md
    └── STATUS.template.md
```

Templates are named `*.template.md` so agents don't mistake `assets/AGENTS.template.md` for real project instructions.
