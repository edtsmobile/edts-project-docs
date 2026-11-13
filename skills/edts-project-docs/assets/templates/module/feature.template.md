<!--
Option: module/feature — a user-facing area made of screens (login, cart, payment, profile).
Writes to docs/modules/feature/<area>.md. Replace every <placeholder>. Remove sections that do not apply. Remove this comment.
-->
# <Feature Area>

<One or two sentences: what the user can do here and why it matters to the app.>

**Folders:** `<path>`, `<path>` · **Services:** [<service>](../../services/<rest|sdk>/<service>.md) · **Entry from:** <screen / tab / deep link / push>

## Screens

| Screen | ViewController / Fragment / View | ViewModel | Purpose |
| --- | --- | --- | --- |
| <Name users see> | `<Type>` | `<ViewModel>` | <one line> |

## Navigation

| From | To | Trigger | Code |
| --- | --- | --- | --- |
| <Screen> | <Screen> | <tap / success / push> | `<Type.method>` |

## Data

| Data | Loaded by | Service | Cached / stored |
| --- | --- | --- | --- |
| <e.g. cart items> | `<ViewModel.method>` | [<service>](../../services/<rest|sdk>/<service>.md) | <Core Data / Room / none> |

## Screen States

| Screen | Loading | Empty | Error | Logged out |
| --- | --- | --- | --- | --- |
| <Screen> | <shimmer / spinner> | <what shows> | <banner / alert / retry> | <redirect / prompt> |

## State & Side Effects

- <Values persisted, notifications posted or observed, analytics events, timers.>

## Gotchas

- **<Short trap name>.** <What goes wrong, where (`Type.method`), and what to do instead.>

## Related

- Flows: [<flow>](../../flows/<variant>/<flow>.md)
