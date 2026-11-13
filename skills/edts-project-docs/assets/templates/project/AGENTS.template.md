<!--
Template for AGENTS.md. Replace every <placeholder>. Delete the platform block that does not apply.
Max 150 lines. Remove this comment.
-->
# <App Name> <iOS|Android>

<One or two sentences: what the app does and who uses it.>

## Build & Test

<!-- iOS -->
- Open `<Name>.xcworkspace`, scheme `<Scheme>`
- Build: `xcodebuild build -workspace <Name>.xcworkspace -scheme <Scheme> -destination 'generic/platform=iOS Simulator'`
- Test: `xcodebuild test -workspace <Name>.xcworkspace -scheme <Scheme> -destination 'platform=iOS Simulator,name=<Simulator>'`

<!-- Android -->
- Open the repo root in Android Studio
- Build: `./gradlew :app:assemble<Flavor>Debug`
- Test: `./gradlew :app:test<Flavor>DebugUnitTest`

## Configuration

| File | Purpose | Provided by |
| --- | --- | --- |
| `<path>` | <what it configures> | <committed / ask the lead / CI secret> |

## Architecture

<Pattern in one or two lines, e.g. "SwiftUI + MVVM, Clean Architecture, 1 feature = 1 SPM package, Combine end-to-end.">

Details: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

## Where Things Live

| Path | Contents |
| --- | --- |
| `<path>/` | <contents> |

## Conventions

- Follow the `<edts-ios-guidelines | Android guideline skill>` skill.
- <Project-specific rule that differs from or adds to the guidelines.>

## Gotchas

- <Specific trap and what to do about it.>

## More Docs

- [docs/README.md](docs/README.md) — index of every doc: modules, services, flows
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- [docs/STATUS.md](docs/STATUS.md) — documentation tasks and open questions
