<!--
Option: service/rest — the app's own backend API, one doc per service class or API domain.
Writes to docs/services/rest/<service>.md. Replace every <placeholder>. Never copy hostnames, keys, or tokens; name the config key instead. Remove this comment.
-->
# <ServiceName>

<One or two sentences: which backend domain this covers (orders, points, auth) and what the app uses it for.>

**Code:** `<path to service>` · **Repository:** `<Repository>` · **Base URL:** `<config key, e.g. HOST_URL>` · **Used by:** [<module>](../../modules/<variant>/<module>.md)

## Endpoints

| Name | Method | Path | Request | Response | Called from |
| --- | --- | --- | --- | --- | --- |
| <short name> | `GET` | `<path constant or literal path>` | `<RequestType>` / query params | `<ResponseType>` | `<Service.method>` |

## Headers & Auth

| Header | Value | Set by |
| --- | --- | --- |
| `<Header>` | <what it contains, never a real value> | `<Type.method>` |

## Response Handling

**Success rule:** <e.g. HTTP 200 and body `status == "00"`>

| Condition | App behaviour | Code |
| --- | --- | --- |
| <HTTP 401> | <refresh token, retry> | `<Type.method>` |
| <non-200 with message> | <show message> | `<Type.method>` |
| <no data / decode error> | <what happens> | `<Type.method>` |

## Endpoint Details

<Only for endpoints with non-obvious fields. Repeat per endpoint.>

### <Endpoint name>

| Field | In | Type | Notes |
| --- | --- | --- | --- |
| `<field>` | <body / query / response> | `<Type>` | <meaning, allowed values, units> |

## Caching & Retries

- <Local copies, sync rules, retry or polling behaviour. "None" if none.>

## Gotchas

- **<Short trap name>.** <What goes wrong, where, and what to do instead.>

## Related

- Flows: [<flow>](../../flows/<variant>/<flow>.md)
- Models: `<path to request/response models>`
