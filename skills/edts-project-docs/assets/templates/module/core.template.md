<!--
Option: module/core — shared code with no screens of its own (base classes, helpers, networking core, design system).
Writes to docs/modules/core/<module>.md. Replace every <placeholder>. Remove sections that do not apply. Remove this comment.
-->
# <Module Name>

<One or two sentences: what this module provides to the rest of the app.>

**Path:** `<path>` · **Depends on:** <libraries / modules> · **Used by:** <modules, or "every module">

## Public API

What other code uses from this module. "Used by" counts files that reference the symbol.

| Symbol | Kind | Used by |
| --- | --- | --- |
| `<Symbol>` | <class / protocol / function / enum> — <one-line purpose> | <N files / module names> |

## State & Side Effects

- <What happens implicitly: work done in init, values persisted, notifications posted, singletons, threads.>

## Gotchas

- **<Short trap name>.** <What goes wrong, where (`Type.method`), and what to do instead.>

## Related

- Architecture: [ARCHITECTURE.md](../../ARCHITECTURE.md)
- Services: [<service>](../../services/<rest|sdk>/<service>.md)
- Flows: [<flow>](../../flows/<variant>/<flow>.md)
