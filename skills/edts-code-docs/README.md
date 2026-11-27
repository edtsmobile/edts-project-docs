# EDTS Code Docs

Writes in-code documentation for EDTS iOS and Android projects: DocC `///` comments in Swift and KDoc `/** */` comments in Kotlin. Engineers see them in Xcode Quick Help and Android Studio Quick Documentation; coding agents read them straight from the source.

The Markdown docs (`AGENTS.md`, `docs/`) come from the companion skill [`edts-project-docs`](../edts-project-docs/).

## Installation

Requires Node.js and read access to the `edtsmobile/edts-project-docs` repository:

```sh
npx skills add edtsmobile/edts-project-docs -s edts-code-docs
```

## What It Produces

Comment lines in source, nothing else. Only shared code (base classes, services, repositories, storages, helpers) and functions with non-obvious behavior get comments:

```swift
/// Refreshes the access token after a 401.
///
/// Sends the saved refresh token through `KeyRepository`. With no saved
/// refresh token, calls ``onUnauthorizedRequest()`` immediately.
func requestRefreshToken()
```

It also keeps the **Code Doc Tasks** table (`C01`, `C02`, …) in `docs/STATUS.md`, one row per module. A `.docc` catalog or Dokka setup is added only if you ask for it.

## How to Use

From the project root:

| Goal | Prompt |
| --- | --- |
| Plan the work | `Add the code doc tasks to docs/STATUS.md using edts-code-docs` |
| Do one task | `Do C02 from docs/STATUS.md using edts-code-docs` |
| Do the next task | `Do the next code doc task using edts-code-docs` |
| Comment one folder or type | `Add DocC comments to Cores/Base using edts-code-docs` |
| Build the DocC / Dokka site | `Add a DocC catalog and build it using edts-code-docs` |

Team split works like the docs: claim a `todo` C row (Owner + `in-progress`), commit and push that line, then ask your agent. The agent sets the row to `done` when the comments pass the check.

### Reviewing a doc-comment PR

- `git diff` shows comment lines only: no code, whitespace, or formatting changes.
- Comments match what the code does, including failure paths.
- Every `Unverified:` note is confirmed or corrected.
- No secrets in comments.

### Good to know

- The agent never commits or pushes.
- Each change is logged to `ai.log` in the project root.
- Run it with or without `edts-project-docs`. If `docs/STATUS.md` doesn't exist yet, it creates one with only its own table.

## Structure

```
edts-code-docs/
├── SKILL.md                         # modes, STATUS C rows, check, report
└── references/
    ├── 1-doc-comments-ios.md        # Swift doc comments, DocC
    └── 2-doc-comments-android.md    # KDoc, Dokka
```
