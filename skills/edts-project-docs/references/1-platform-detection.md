# Platform & Existing Docs Detection

Before writing anything, detect the platform, the project shape, and what docs already exist.

## 1. Detect the platform

**iOS** when the repo root (or one level down) contains:

- `*.xcodeproj` or `*.xcworkspace`
- `Package.swift`
- `Podfile`

**Android** when the repo root contains:

- `settings.gradle` or `settings.gradle.kts`
- `build.gradle` or `build.gradle.kts`
- `app/src/main/AndroidManifest.xml`

If both are present (e.g. a KMP or monorepo), document each platform in its own section of `AGENTS.md` and ask the user whether they want one `ARCHITECTURE.md` or one per platform.

## 2. Detect the project shape

### iOS

| Signal | Shape |
| --- | --- |
| `struct ...: View`, `@main struct ...: App` | SwiftUI |
| `UIViewController`, `*.storyboard`, `*.xib` | UIKit |
| `Modules/` folder with local SPM packages | SwiftUI modular |
| Single app target, no local packages | SwiftUI monolithic |
| `Podfile` / `Pods/` | CocoaPods dependencies |

If `edts-ios-guidelines` is available, follow its `rules/1-project-detection.md` for the exact rules.

Collect build facts by running, not guessing:

```sh
xcodebuild -list -workspace <Name>.xcworkspace   # or -project <Name>.xcodeproj
```

### Android

| Signal | Shape |
| --- | --- |
| `include(":...")` lines in `settings.gradle(.kts)` | Module list |
| `@Composable` functions | Jetpack Compose |
| `res/layout/*.xml`, `Fragment`, `Activity` with `setContentView` | XML views |
| `@HiltAndroidApp`, `@Module @InstallIn` | Hilt DI |
| `startKoin`, `module { }` | Koin DI |
| `res/navigation/*.xml` or `NavHost` | Navigation component |
| `productFlavors` / `buildTypes` in `app/build.gradle(.kts)` | Build variants |

Collect build facts by running, not guessing:

```sh
./gradlew projects
./gradlew :app:tasks --group=build
```

If a command cannot run (missing JDK, missing secrets), read the build files instead and mark the commands `> [!NOTE] Unverified:` in the docs.

## 3. Detect existing docs

Check for all of these before creating anything:

- `README.md`, `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`
- `docs/`, `Documentation/`, `wiki/`
- `*.docc` catalogs (iOS), `dokka` blocks in Gradle files (Android)
- Existing doc comments (`///`, `/** */`) in shared modules

Rules:

- If `AGENTS.md` or `CLAUDE.md` exists, switch to **update mode** for that file.
- If `CLAUDE.md` exists with real content and no `AGENTS.md`, move the shared content into `AGENTS.md` and leave Claude-only notes in `CLAUDE.md` below the `@AGENTS.md` line. Ask before doing this.
- If other agent files exist (`.cursorrules`, `copilot-instructions.md`), do not delete them. Mention in the final report that they could point to `AGENTS.md`.
- Existing human-written docs are the most trusted source of "why". Read them first and reuse their facts.
