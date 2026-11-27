---
name: edts-code-docs
description: Write in-code documentation for EDTS iOS and Android projects - DocC `///` comments in Swift, KDoc `/** */` comments in Kotlin - on shared code and non-obvious behavior. Edits comment lines only. Use when asked for doc comments, DocC, KDoc, Dokka, API docs, Quick Help, or a C task from docs/STATUS.md.
---

# EDTS Code Docs

You are adding **doc comments to source code** in an EDTS mobile project. Agents read them straight from the source, and Xcode Quick Help / Android Studio Quick Documentation show them to engineers. Markdown docs (`AGENTS.md`, `docs/`) belong to the `edts-project-docs` skill, not this one.

| File | Topic |
| --- | --- |
| [references/1-doc-comments-ios.md](references/1-doc-comments-ios.md) | Swift doc comments and DocC |
| [references/2-doc-comments-android.md](references/2-doc-comments-android.md) | KDoc and Dokka |

## Detect the Platform

| Platform | Signals at the repo root (or one level down) | Use |
| --- | --- | --- |
| iOS | `*.xcodeproj`, `*.xcworkspace`, `Package.swift`, `Podfile` | Reference 1 |
| Android | `settings.gradle(.kts)`, `build.gradle(.kts)`, `app/src/main/AndroidManifest.xml` | Reference 2 |

Both present (KMP, monorepo): ask which platform to work on. Before writing, check for existing doc comments in the target module and match their style.

## Modes

| Mode | Trigger | Steps |
| --- | --- | --- |
| **Task** | A `C` task ID (`Do C02 …`) or "the next code doc task" | Status → Write → Check → Report |
| **Plan** | "add the code doc tasks", "plan doc comments" | Fill the Code Doc Tasks table only, write no comments |
| **Direct** | A path or type, e.g. "add DocC comments to `Cores/Base`" | Write → Check → Report. Update a matching `C` row if one exists |

## Status — Code Doc Tasks in `docs/STATUS.md`

This skill owns only the **Code Doc Tasks** table (`C01`, `C02`, …). It never changes Docs Tasks, Service Tasks, or other docs; the Open Questions table is shared.

- **No `docs/STATUS.md`:** in Task or Plan mode, create it with only a `# Documentation Status` heading, a Code Doc Tasks table, and an Open Questions table. `edts-project-docs` adds its own tables later.
- **No Code Doc Tasks table, or only the "Not started" line:** fill it (Plan mode, or before the first task). One row per module with shared or cross-module API, shared modules first. Skip modules with none. Columns: `| ID | Module | Path | Status | Owner | PR | Notes |`. Remove the "Not started" line.
- **Doing a task:**
  1. If the row is `in-progress` with a different owner, stop and ask.
  2. Set **Owner** (ask, or use `git config user.name`) and **Status** `in-progress`. Tell the user to commit and push that one line, so others see the claim.
  3. Write the comments (below).
  4. Set **Status** `done` once the check passes. There is no review status; review happens in the PR.
  5. Questions the code cannot answer go into Open Questions with **From** = the task ID. If the task cannot be finished without the answer, set it to `blocked` and name the question in Notes.
- **Editing rules:** one row per line; never reorder, renumber, or delete rows; append at the end of the table; change only your own task's row.

Statuses: `todo`, `in-progress`, `done`, `blocked`.

## Write

Follow reference 1 (iOS) or 2 (Android) for where comments go and their format. In short:

- Comment shared code first: base classes, services, repositories, storages, helpers, public extensions.
- Say what the signature cannot: side effects, threading, ordering, failure behavior, invariants. Skip comments that only restate the name.
- **Read before you write.** Open the implementation and its callers; never describe behavior from the name alone.
- A `.docc` catalog (iOS) or Dokka setup (Android) only if the user asks for it.

## Check

Run before reporting:

- `git diff --stat` lists only source files in the task's module, plus `docs/STATUS.md`.
- `git diff` on those source files adds or changes **comment lines only**: no code, no blank-line or whitespace changes, no reformatting. Some editors strip trailing whitespace on save; restore it if they did.
- Every symbol a comment links (` ``Symbol`` ` / `[Symbol]`) exists.
- No task or question IDs in comments: `git diff | grep -E '^\+.*(///|\*).*\b[CDSQ][0-9]{2}\b'` finds nothing.
- No secrets in comments.
- Build docs only if the user asks (commands in references 1 and 2); otherwise note "docbuild not run" in the row's Notes.

## Report

```
## Task
- C02 EDTSCode/Cores/Helpers/ → done

## Files commented
- EDTSCode/Cores/Helpers/DateHelper.swift (6 symbols)

## Not commented
- `LegacyFormatter`: unused, see Q21

## Open questions (added to docs/STATUS.md)
- Q21 Is `LegacyFormatter` still used?

## Suggested next step
Next todo rows: C03 Extensions, C04 Services
```

## Core Rules

- **Comment lines only.** Never change code behavior, signatures, formatting, or file layout.
- **Never copy secrets** into comments: no keys, tokens, passwords, or config values. Name the config key instead.
- **Edit, don't replace.** Keep existing human-written comments unless they are provably wrong.
- **Describe behavior, not tracking.** No task or question IDs (`C03`, `Q12`), no `docs/STATUS.md` links, no "unused" or "called from X" notes in comments: they go stale. Put those in Open Questions or the report instead.
- **Mark uncertainty.** Write `- Note: Unverified: …` (Swift) or `Unverified: …` (KDoc) for anything inferred, so a reviewer can confirm it.
- If the project is iOS and `edts-ios-guidelines` is available, use it to understand the expected architecture.

## AI Workflow Rules

- **Log every AI-made change** to `ai.log` in the project root, one line per change point: `[YYYY-MM-DD HH:MM:SS] <brief description>`. Create it if missing; never overwrite entries.
- **Ask the user about any unclear decision** before proceeding.
- Never commit or push; the user decides what goes in each commit.
