# Swift Doc Comments & DocC

Doc comments are read by agents straight from source and shown by Xcode in Quick Help (Option-click). DocC renders them into browsable docs.

## Where to Add Them

Add doc comments to:

- `public` / `open` symbols in shared SPM modules (`Core`, networking, design system, any package used by more than one feature)
- Protocols that define a contract (`*RepositoryProtocol`, `*UseCase`, `*ViewModelProtocol`)
- Functions with non-obvious behavior: caching, side effects, threading, retries, required call order

Do **not** add them to:

- `private` / `fileprivate` helpers
- SwiftUI `body` properties, simple initialisers, or properties whose name says everything
- Code you have not read end to end

Never change code while adding comments. If you spot a bug, list it in the final report.

## Format

Use `///` (not `/** */`). First line is a one-sentence summary. Blank `///` line before details.

```swift
/// Loads the signed-in member's order history.
///
/// Calls `GET /v1/orders` and caches the first page for 5 minutes.
/// Call ``refresh()`` to bypass the cache after checkout.
///
/// - Parameter page: Zero-based page index.
/// - Returns: A publisher emitting orders sorted newest first.
/// - Note: Emits on a background queue; receive on main before updating UI.
func fetchOrders(page: Int) -> AnyPublisher<[Order], APIError>
```

| Element | Syntax |
| --- | --- |
| One parameter | `- Parameter name: ...` |
| Several parameters | `- Parameters:` then indented `- name: ...` |
| Return value | `- Returns: ...` |
| Errors | `- Throws: ...` |
| Extra notes | `- Note:`, `- Important:`, `- Warning:` |
| Link to a symbol | ` ``TypeName`` `, ` ``TypeName/method(_:)`` ` |

Rules:

- Describe behavior and contract, not implementation steps.
- For Combine publishers, say what is emitted, on which queue if it matters, and when it completes or fails.
- For RxSwift (UIKit projects), say whether the observable is hot or cold and if it replays.
- Keep the summary line under ~100 characters.

## DocC Catalog (optional)

Only create a catalog when the user asks for a browsable site, or the module is consumed by other teams.

- Add `Sources/<Module>/<Module>.docc/<Module>.md` with a `# ``<Module>`` ` title, a summary, and `## Topics` groups.
- Long-form articles go in the same `.docc` folder as Markdown. Link them from `docs/modules/<variant>/<module>.md` rather than duplicating content.

## Building

Do not add `swift-docc-plugin` to `Package.swift` unless the user asks — it is a dependency change.

```sh
# Xcode project / workspace
xcodebuild docbuild -scheme <Scheme> -destination 'generic/platform=iOS' -derivedDataPath build

# Swift package (requires swiftlang/swift-docc-plugin in Package.swift)
swift package generate-documentation --target <Module>
```

In Xcode: Product ▸ Build Documentation (⌃⇧⌘D). Run a docbuild after adding comments when possible — DocC warns about broken ` `` ` symbol links.
