# Module and Flow Docs

Each doc type has variants. Pick one with the rules below, unless the user or the task row names one (e.g. "Do D14 with flow/journey"). **The folder is the template**: write the doc to `docs/<type folder>/<variant>/`, and write `<type>/<variant>` in the task's **Type** column in `docs/STATUS.md`. One project can use several variants of the same type.

If a doc moves to another variant, move the file and fix every link to it (`grep -rn <old-name> AGENTS.md docs/`).

## Module Docs — `docs/modules/<variant>/<name>.md`

| Template | Use when | File |
| --- | --- | --- |
| `module/feature` | The area has screens the user sees (login, cart, payment, profile) | [assets/templates/module/feature.template.md](../assets/templates/module/feature.template.md) |
| `module/core` | Shared code with no screens (base classes, helpers, design system, networking core) | [assets/templates/module/core.template.md](../assets/templates/module/core.template.md) |

- File name: kebab-case of the module or area (`FeatureCart` → `feature-cart.md`, `:feature:cart` → `feature-cart.md`).
- Read the entry points, ViewModels/UseCases, and the repositories before writing.
- **module/feature:** list every screen with its ViewModel; document navigation in and out, data sources, and loading/empty/error/logged-out states. Link to service docs instead of listing endpoints.
- **module/core:** list what other code uses (iOS: `public`/shared symbols; Android: non-`internal` symbols used across modules) with real usage counts from `grep`.
- Skip sections that do not apply. Do not write "N/A" sections.

Prioritise when there are many modules: Core/shared modules first, then the features with the most code or most recent churn (`git log --since=6.months --name-only`). Ask the user before documenting more than 5 modules in one run. Leave the rest as `todo` rows in `docs/STATUS.md`.

## Flows — `docs/flows/<variant>/<name>.md`

| Template | Use when | File |
| --- | --- | --- |
| `flow/sequence` | A process that crosses code layers or modules (login + token refresh, checkout, push handling) | [assets/templates/flow/sequence.template.md](../assets/templates/flow/sequence.template.md) |
| `flow/journey` | Mostly screens and user choices (onboarding, registration, first-time setup) | [assets/templates/flow/journey.template.md](../assets/templates/flow/journey.template.md) |

- Trace the flow through real code. Every arrow and step must correspond to code or an API value you found.
- Use real type names as diagram participants and screen names users see in journey steps.
- List failure paths and exits (expired token, network error, cancelled payment) — they are what people need the doc for.
- Good first flows: app launch, login/session refresh, the app's main transaction (checkout, booking, payment), deep link handling.

