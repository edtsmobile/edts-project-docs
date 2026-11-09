# Module Docs, Flows, and ADRs

## Module Docs — `docs/modules/<module>.md`

One file per feature or core module. Use [assets/MODULE.template.md](../assets/MODULE.template.md).

- File name: the module name in kebab-case (`FeatureCart` → `feature-cart.md`, `:feature:cart` → `feature-cart.md`).
- Read the module's entry points, public API, ViewModels/UseCases, and its service/repository before writing.
- **Screens** table: every page/screen/fragment with its ViewModel and one-line purpose.
- **Public API**: what other modules use from this one (iOS: `public` symbols; Android: non-`internal` symbols used across modules). Check actual usages with `grep`.
- **Endpoints**: method + path + the service method that calls it. No hostnames, no auth headers.
- **State & side effects**: caches, singletons, notifications/broadcasts posted or observed, analytics events fired.
- **Gotchas**: module-specific traps.
- Skip sections that do not apply. Do not write "N/A" sections.

Prioritise when there are many modules: Core/shared modules first, then the features with the most code or most recent churn (`git log --since=6.months --name-only`). Ask the user before documenting more than 5 modules in one run. Leave the rest as `todo` rows in `docs/STATUS.md`.

## Flows — `docs/flows/<flow>.md`

A flow is a user journey or system process that crosses modules (login, checkout, push notification handling, deep links, token refresh). Use [assets/FLOW.template.md](../assets/FLOW.template.md).

- Trace the flow through real code. Every arrow in the diagram must correspond to a call you found.
- Use a mermaid `sequenceDiagram` with real type names as participants.
- List failure paths (expired token, network error, cancelled payment) — they are what people need the doc for.
- Good first flows: app launch, login/session refresh, the app's main transaction (checkout, booking, payment), deep link handling.

## ADRs — `docs/adr/NNNN-<title>.md`

An ADR records **why** a decision was made. Use [assets/ADR.template.md](../assets/ADR.template.md).

- The code shows *what* was decided, never *why*. Do not invent reasons.
- Only write an ADR when the reason comes from an existing doc, a commit message, a PR description, or the user.
- When the code shows a significant decision but no reason is available, write the ADR with status `Proposed — needs confirmation`, fill in Context and Decision from the code, and leave Consequences/Reason as a question for the team. Add the question to Open Questions in `docs/STATUS.md`.
- Number sequentially from `0001`. Never renumber existing ADRs.
- Good ADR candidates: UI framework choice per area (UIKit vs SwiftUI, XML vs Compose), reactive stack, DI framework, modularisation, intentional singletons, minimum OS version.
