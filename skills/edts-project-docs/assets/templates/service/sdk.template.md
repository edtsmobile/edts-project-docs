<!--
Option: service/sdk — a third-party or in-house SDK the app talks to (Firebase, payment SDK, maps, analytics).
Writes to docs/services/sdk/<sdk>.md. Never copy keys, tokens, or config file contents; name the file and key instead. Remove this comment.
-->
# <SDK Name>

<One or two sentences: what the app uses this SDK for.>

**Dependency:** `<pod / Gradle / SPM name>` (<version from lock file>) · **Initialised in:** `<Type.method>` · **Used by:** [<module>](../../modules/<variant>/<module>.md)

## Setup

| Item | Where | Per environment? |
| --- | --- | --- |
| <config file / key / entitlement / manifest entry> | `<path>` | <yes / no> |

## Features Used

| Feature | API used | Where | Notes |
| --- | --- | --- | --- |
| <e.g. remote config> | `<SDK call>` | `<Type.method>` | <defaults, fetch timing> |

## Data Sent

| Data | When | Personal data? |
| --- | --- | --- |
| <events / tokens / user id> | <trigger> | <yes / no> |

## Gotchas

- **<Short trap name>.** <What goes wrong, where, and what to do instead.>

## Related

- Modules: [<module>](../../modules/<variant>/<module>.md)
- Flows: [<flow>](../../flows/<variant>/<flow>.md)
