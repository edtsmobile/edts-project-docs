# KDoc & Dokka

KDoc comments are read by agents straight from source and shown by Android Studio in Quick Documentation (F1 / Ctrl+Q). Dokka renders them into browsable docs.

## Where to Add Them

Add KDoc to:

- Public API of shared modules (`:core`, `:network`, `:designsystem`, any module used by more than one feature)
- Interfaces that define a contract (repositories, use cases, data sources)
- Functions with non-obvious behavior: caching, side effects, dispatcher/threading, retries, required call order

Do **not** add them to:

- `private` helpers, simple data classes whose property names say everything, `@Preview` functions
- Code you have not read end to end

Never change code while adding comments. If you spot a bug, list it in the final report.

## Format

First sentence is the summary. Blank line before details. Use block tags after the description.

```kotlin
/**
 * Loads the signed-in member's order history.
 *
 * Calls `GET /v1/orders` and caches the first page for 5 minutes.
 * Call [refresh] to bypass the cache after checkout.
 *
 * @param page Zero-based page index.
 * @return Orders sorted newest first.
 * @throws UnauthorizedException when the session token has expired.
 */
suspend fun fetchOrders(page: Int): List<Order>
```

| Element | Syntax |
| --- | --- |
| Parameter | `@param name ...` |
| Return value | `@return ...` |
| Exception | `@throws ExceptionType ...` |
| Constructor property | `@property name ...` (on the class) |
| Link to a symbol | `[TypeName]`, `[TypeName.method]` |
| See also | `@see TypeName` |

Rules:

- Describe behavior and contract, not implementation steps.
- For `suspend` functions, say which dispatcher the work runs on if the function switches context.
- For `Flow`, say whether it is hot or cold, when it emits, and whether it completes.
- Keep the summary line under ~100 characters.

## Module Docs for Dokka (optional)

Dokka can include a Markdown file per module. Only add this when the user asks for a browsable site.

```kotlin
// <module>/build.gradle.kts
dokka {
    dokkaSourceSets.configureEach {
        includes.from("Module.md")
    }
}
```

`Module.md` starts with `# Module <gradle module name>`. Link it from `docs/modules/<variant>/<module>.md` rather than duplicating content.

## Building

Only add the Dokka plugin when the user asks — it is a build change.

```kotlin
plugins { id("org.jetbrains.dokka") version "<latest 2.x>" }
```

```sh
./gradlew :<module>:dokkaGenerate
```
