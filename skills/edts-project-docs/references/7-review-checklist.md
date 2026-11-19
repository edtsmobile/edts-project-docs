# Self-Review Checklist & Final Report

Run this checklist before telling the user you are done.

## Accuracy

- Every file path in the docs exists (`ls` or `test -e` each one).
- Every command was run, or is marked `> [!NOTE] Unverified:`.
- Every type, module, scheme, and flavor name matches the code exactly.
- Every arrow in a mermaid diagram corresponds to a call or dependency you found.

## Safety

- No secrets, tokens, keys, passwords, signing values, or private hostnames copied into docs.
- `docs` scope: `git diff --stat` lists no source files (`.swift`, `.kt`, `.java`, build files).
- `code` scope: `git diff` on source files shows comment lines only, and only in the task's module.
- No existing human-written docs deleted. Moved content is linked from its old location.

## Fitness

- `AGENTS.md` is 150 lines or fewer (`wc -l AGENTS.md`).
- `CLAUDE.md` starts with `@AGENTS.md`.
- Every doc in `docs/` is listed in `docs/README.md`, and `AGENTS.md` links to `docs/README.md`.
- If the project has `book.toml`, `docs/SUMMARY.md` lists the same docs as the index.
- No generic advice, no empty or "N/A" sections, no duplicated content between files.
- Mermaid blocks use the ` ```mermaid ` fence and valid syntax.
- Every module, service, and flow doc sits in its variant folder (`docs/<type>/<variant>/`), and the folder matches its row's **Type** in `docs/STATUS.md`.

## Status File

- `docs/STATUS.md` exists and the rows for this run's work are updated (status, owner, notes).
- New questions are in Open Questions with a `From` task ID.
- Newly discovered work is appended as `todo` rows.
- No rows were reordered, renumbered, or deleted.

## Final Report

End every run with this report in chat:

```
## Scope
docs (default) — code track not run; ask for DocC/KDoc comments to start it

## Tasks
- D01 AGENTS.md → done
- D02 docs/ARCHITECTURE.md → done
- D07 docs/modules/feature/cart.md → blocked (Q01)

## Docs updated
- AGENTS.md (created, 112 lines)
- docs/ARCHITECTURE.md (created)
- docs/modules/feature/cart.md (updated: Data, Gotchas)

## Unverified
- `./gradlew :app:assembleStagingDebug` — not run, needs local.properties

## Open questions (added to docs/STATUS.md)
- Q01 Why is `CartStore` a singleton?
- Q02 Is `LegacyPaymentModule` still used in production?

## Book
To read it as a book, run `/edts-docs-book`.   (only if the project has book.toml)

## Suggested next step
Next todo rows: D08 feature-checkout, D09 feature-profile
```

The open questions are the most valuable part of the report. They are the "why" knowledge that only the team has. Ask the user to answer them in the Answer column of `docs/STATUS.md` so the docs can be completed.
