<!--
Template for docs/STATUS.md. Replace the example rows with the real inventory. Remove this comment.
Statuses: todo | in-progress | done | blocked
Type: <type>/<variant>, the template and folder (module/feature, module/core, flow/sequence, flow/journey, service/rest, service/sdk)
-->
# Documentation Status

Shared task list for documenting this project with the `edts-project-docs` skill.

**How to help:** pick a `todo` row, put your name in Owner, set it to `in-progress`, commit and push that one line, then ask your agent:

```
Do D04 from docs/STATUS.md using edts-project-docs
```

## Docs Tasks

Markdown in `AGENTS.md` and `docs/`. Never touches source files.

| ID | Doc | Type | Status | Owner | PR | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| D01 | `AGENTS.md` + `CLAUDE.md` | entry | todo | | | |
| D02 | `docs/ARCHITECTURE.md` | architecture | todo | | | |
| D03 | `docs/modules/core/<module>.md` | module/core | todo | | | |
| D04 | `docs/modules/feature/<area>.md` | module/feature | todo | | | |
| D05 | `docs/flows/sequence/<flow>.md` | flow/sequence | todo | | | |

## Service Tasks

One doc per backend service class (`docs/services/rest/`) or SDK (`docs/services/sdk/`). Never touches source files.

| ID | Doc | Type | Status | Owner | PR | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| S01 | `docs/services/rest/<service>.md` | service/rest | todo | | | `<path to service class>` |
| S02 | `docs/services/sdk/<sdk>.md` | service/sdk | todo | | | `<pod / Gradle dependency>` |

## Code Doc Tasks

DocC `///` comments (iOS) or KDoc `/** */` comments (Android) in source. Comment lines only.

_Not started. Ask your agent to "add the code doc tasks to docs/STATUS.md using edts-code-docs" to fill this table._

| ID | Module | Path | Status | Owner | PR | Notes |
| --- | --- | --- | --- | --- | --- | --- |

## Open Questions

Answer these in the Answer column. The next task in that area turns the answer into docs.

| ID | Question | From | Answer |
| --- | --- | --- | --- |
