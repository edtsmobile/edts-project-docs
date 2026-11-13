# AGENTS.md and CLAUDE.md

`AGENTS.md` is the entry point. Codex, Cursor, Copilot, Gemini CLI and other agents read it automatically, and new engineers should read it first. It is loaded into every agent session, so every line costs context.

Use [assets/templates/project/AGENTS.template.md](../assets/templates/project/AGENTS.template.md).

## CLAUDE.md

Claude Code reads `CLAUDE.md`. Create it with exactly one line so both files stay in sync:

```
@AGENTS.md
```

Claude-only notes, if any, go below that line. Never duplicate `AGENTS.md` content in `CLAUDE.md`.

## Line Budget

- **Maximum 150 lines.** Detail belongs in `docs/` and is linked from the "More docs" section.
- If an existing `AGENTS.md` is over budget, move detail into `docs/` instead of deleting it.

## Required Sections (in this order)

| Section | Content | How to get it |
| --- | --- | --- |
| Title + summary | App name, platform, 1–2 sentences on what the app does and for whom | `README.md`, app display name, main screens |
| Build & test | Workspace/project, schemes or variants, exact build and test commands | `xcodebuild -list`, `./gradlew tasks`; run them |
| Configuration | Which config files are needed and who provides them (names only, never values) | `.xcconfig`, `Info.plist` keys, `local.properties`, `google-services.json` |
| Architecture | Pattern in one or two lines, link to `docs/ARCHITECTURE.md` | [3-architecture.md](3-architecture.md) |
| Where things live | Table of top-level paths and what they contain | Folder listing, opened files |
| Conventions | Link to the guideline skill, plus project-specific rules | `edts-ios-guidelines`, lint configs, existing code |
| Gotchas | Traps a new engineer or agent would hit | Code comments, `// FIXME`, `// HACK`, team answers |
| More docs | Link to the docs index `docs/README.md`, plus `ARCHITECTURE.md` and `STATUS.md` | — |

## Writing Rules

- Commands go in code blocks and must be copy-pasteable. Run every command you document; mark any you could not run as unverified.
- Use the real scheme, target, flavor, and module names.
- "Where things live" lists folders, not every file. 5–12 rows.
- Gotchas must be specific and actionable: "Staging rejects requests without `X-App-Version`", not "Be careful with the API".
- Do not list dependencies with versions — they rot. Name only the ones that shape how code is written (Swinject, Combine, RxSwift, Hilt, Compose, Retrofit).
- Do not write generic advice ("write clean code", "add tests"). Only what is true for this repo.

## Conventions Section

- **iOS:** always include `Follow the edts-ios-guidelines skill.` plus anything this repo does differently.
- **Android:** link the team's Android guideline skill if one exists; otherwise list the conventions you observed (DI framework, UI toolkit, module naming) and ask the user to confirm them.
