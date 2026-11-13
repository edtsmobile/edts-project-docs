# Service Docs — `docs/services/<variant>/<name>.md`

A service doc describes the contract between the app and something outside it: the app's backend API or an SDK. Module docs describe screens and link here instead of listing endpoints.

| Template | Use when | File |
| --- | --- | --- |
| `service/rest` | The app's own backend API | [assets/templates/service/rest.template.md](../assets/templates/service/rest.template.md) |
| `service/sdk` | A third-party or in-house SDK (Firebase, payment SDK, maps, analytics) | [assets/templates/service/sdk.template.md](../assets/templates/service/sdk.template.md) |

Write the doc to `docs/services/rest/` or `docs/services/sdk/` (the folder is the template), and write `service/rest` or `service/sdk` in the task's **Type** column.

## One Doc per What?

- **service/rest:** one doc per service class or API client (iOS `*Service`, Android Retrofit interface). If one class mixes unrelated domains, still one doc, with endpoint groups as `###` headings.
- **service/sdk:** one doc per SDK, even when several of its products are used (Firebase Messaging + Remote Config + Crashlytics = one `firebase.md`).
- File name: kebab-case of the class or SDK (`OrderService` → `order-service.md`).

## What to Read

| Topic | iOS | Android |
| --- | --- | --- |
| Endpoints | `*Service.swift`, endpoint enums/constants | Retrofit interfaces, Ktor clients |
| Request/response models | `Codable` structs | `@Serializable` / Moshi / Gson data classes |
| Headers & auth | Base service, interceptors, `URLRequest` setup | OkHttp interceptors, authenticators |
| Error mapping | Status checks in the service and its callers | `Response` handling, `Result` wrappers, error mappers |
| SDK setup | `AppDelegate`, `Podfile.lock` / `Package.resolved`, config plists | `Application`, `libs.versions.toml` / Gradle files, `google-services.json` |

## Rules

- Path column: the path as written in code (constant name or literal path). **Never** write hostnames, base URLs, keys, or tokens. Name the config key (`HOST_URL` in `Info.plist`).
- Request/Response columns: the real type names, so readers can jump to them.
- Response Handling: state the success rule exactly as the code checks it (e.g. HTTP 200 **and** `status == "00"`), then every failure branch the code handles, including decode failures.
- Endpoint Details: only for endpoints with non-obvious fields (enums, units, date formats, optional vs required). Do not copy whole models.
- SDKs: list the data sent to the SDK (events, user IDs, tokens) and whether it is personal data.
- Mark anything inferred, such as a field's meaning, with `> [!NOTE] Unverified:`.
