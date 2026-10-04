# Step 1: Measure and design the ratchet

1. Run `{{type_check_command}}` and record the error count. Read the checker config: every tsconfig with its `extends` chain and references, or the mypy and pyright settings, including existing overrides and excludes.
2. Without changing the committed config, run the checker once with strict settings in a scratch config and count errors by file, directory and error code. TypeScript: the `strict` family, with `noUncheckedIndexedAccess` reported separately as optional. Python: mypy `--strict` or pyright `strict`, plus third-party packages without types or stubs.
3. Order modules bottom up from the internal import graph: modules that import few other internal modules first, since typing them gives everything above precise types. Within a level, fewer errors first; flag high-risk modules (money, auth, data writes) for extra test attention. Start with {{first_module}} if given, and say if it sits high in the graph.
4. Design a ratchet that fails CI when a converted module gains a strict error, the converted set shrinks, or the suppression count grows:
   - TypeScript: `tsc` checks every file reachable through imports, so a second tsconfig with a growing `include` list also reports errors in unconverted imported files. Instead, run strict over the project and fail only on diagnostics in files on a committed list (a small filter script or an established strict-files tool), keep a per-file error baseline that may only fall, or use a strict tsconfig per package where project references already exist.
   - mypy: `strict` is global only and ignored in per-module sections. Prefer `strict = true` globally with one override listing unconverted modules and the individual strict flags turned off, so new code starts strict and the list only shrinks; otherwise enable the individual flags per converted module.
   - pyright: grow the `strict` path list, or set strict globally and list unconverted paths under a weaker mode.
5. Plan stubs: community stub packages to add, and local minimal stubs or targeted per-package ignores for the rest, never a global `ignore_missing_imports` or `skipLibCheck` change made to hide errors.

Write the artifact: Baseline, Strict cost (Module | Errors | Top error codes | Imports | Imported by), Order, Ratchet design and CI command, Stubs. Stop and wait for approval.
