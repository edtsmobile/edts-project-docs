<!--
Template for docs/modules/<module>.md. Replace every <placeholder>. Remove sections that do not apply. Remove this comment.
-->
# <Module Name>

<One or two sentences: what this module is responsible for.>

**Path:** `<path to module root>` · **Depends on:** `<Module>`, `<Module>` · **Used by:** `<Module>`

## Screens

| Screen | ViewModel | Purpose |
| --- | --- | --- |
| `<Page/Fragment>` | `<ViewModel>` | <one line> |

## Public API

What other modules use from this one.

| Symbol | Kind | Used by |
| --- | --- | --- |
| `<Symbol>` | <protocol / class / function> | `<Module>` |

## Endpoints

| Method | Path | Called from |
| --- | --- | --- |
| `GET` | `/v1/<path>` | `<Service.method>` |

## State & Side Effects

- <Caches, singletons, persisted values, notifications/broadcasts posted or observed, analytics events.>

## Gotchas

- <Module-specific trap and what to do about it.>

## Related

- Flows: [<flow>](../flows/<flow>.md)
- Decisions: [ADR <NNNN>](../adr/<NNNN>-<title>.md)
