# Status Tracking — `docs/STATUS.md`

`docs/STATUS.md` is the shared task list. It lets several engineers document one project in parallel with the same skill, and it keeps open questions in the repo instead of losing them in chat. Use [assets/templates/project/STATUS.template.md](../assets/templates/project/STATUS.template.md).

## Structure

Four tables, each with its own ID prefix:

| Table | ID prefix | Track | Contents |
| --- | --- | --- | --- |
| Docs Tasks | `D01`, `D02`, … | docs | `AGENTS.md`, `ARCHITECTURE.md`, module docs, flows |
| Service Tasks | `S01`, `S02`, … | docs | One row per backend service class or SDK |
| Code Doc Tasks | `C01`, `C02`, … | code | DocC / KDoc comments, one row per module |
| Open Questions | `Q01`, `Q02`, … | — | "Why" questions only the team can answer |

Statuses are plain text, exactly one of: `todo`, `in-progress`, `review`, `done`, `blocked`.

The **Type** column holds `<type>/<variant>` (`module/feature`, `flow/journey`, `service/rest`, …; see SKILL.md), which is also the doc's folder. For `todo` rows it is the planned variant; whoever does the task may change it if the code says otherwise, and then updates the **Doc** path too.

## Creating the Inventory (create mode, step 1)

If `docs/STATUS.md` does not exist, create it before writing any other doc.

**Docs Tasks** — always fill:

1. `AGENTS.md` + `CLAUDE.md`
2. `docs/ARCHITECTURE.md`
3. One row per module from the build files (see [1-platform-detection.md](1-platform-detection.md)), Core/shared modules first
4. Flow candidates found in code: app launch, login/session refresh, the main transaction, deep links, push notifications — only those that exist

**Service Tasks** — always fill: one row per backend service class or API client, then one row per SDK with app-wide impact (see [9-service-docs.md](9-service-docs.md)).

**Code Doc Tasks** — fill only when the scope is `code` or `all`. In `docs` scope, leave the table with the template's "Not started" line. One row per module with public API, shared modules first. Skip modules with no public/cross-module API. When filling it, remove the "Not started" line. The user can also ask to fill this table later without doing any code task yet.

## Task Mode

When the user names a task ID or asks for "the next task":

1. Read `docs/STATUS.md`. For "the next task", pick the first `todo` row in the track that matches the scope (default: Docs Tasks, then Service Tasks).
2. If the row is `in-progress` with a different owner, stop and ask the user.
3. Set **Owner** (ask the user for their handle, or use `git config user.name`) and **Status** `in-progress`. Tell the user to commit this one-line change on its own and push it, so others see the claim.
4. Do the work with the track's rules only:
   - `D` task: references 2, 3, or 4. Never edit source files.
   - `S` task: reference 9. Never edit source files.
   - `C` task: reference 5 (iOS) or 6 (Android). Only comment lines, only in that row's module.
5. Add the new doc to `docs/README.md` (the docs index) and `docs/SUMMARY.md` (the book sidebar); run `mdbook build` if mdBook is installed. Set **Status** `review`. Fill **PR** if the user gives the PR link.
6. Add any new questions to Open Questions with **From** = the task ID. If the task cannot be finished without an answer, set the task to `blocked` and name the question ID in the Notes column.
7. If you discovered work that has no row (a missing module, service, or flow), append a new `todo` row.

The user, not the agent, sets `done` after the PR is merged.

## Open Questions

- Append new questions with the next free ID. Phrase each as one concrete question.
- When a question has an answer, the next task that touches that area uses it (in a gotcha, a flow, or ARCHITECTURE.md's Deviations), then appends ` (applied in Dxx)` (or `Sxx`) to the Answer cell.
- `blocked` tasks whose questions are now answered go back to `todo`.

## Editing Rules (merge-friendly)

- One row per line. Never wrap a row across lines.
- Never reorder, renumber, or delete rows. Append new rows at the end of their table.
- Change only the rows for your own task, plus appended rows.
- Keep cells short. Detail belongs in the doc itself or the PR.
