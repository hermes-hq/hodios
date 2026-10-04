# Step 1: Measure and plan

1. Run `{{type_check_command}}` as configured and record the error count. Read the checker config (tsconfig files and their `extends`, or mypy and pyright settings in pyproject, setup.cfg, mypy.ini or pyrightconfig).
2. Measure what strict would cost, per module, without changing the committed config: run the checker with strict settings into a scratch config and count errors by directory and by error kind.
   - TypeScript: the `strict` family (`noImplicitAny`, `strictNullChecks`, `strictFunctionTypes`, `strictBindCallApply`, `strictPropertyInitialization`, `noImplicitThis`, `useUnknownInCatchVariables`, `alwaysStrict`), plus `noUncheckedIndexedAccess` reported separately as optional.
   - Python: mypy `strict = true` (or its component flags) or pyright `strict`, plus missing stubs for third-party packages.
3. Build the module order: leaf modules (few internal dependents) with few errors first, shared core types early enough that later modules benefit, and the modules with the most runtime risk flagged for extra test attention. Start with {{first_module}} if given.
4. Choose the ratchet mechanism that fits the tooling:
   - TypeScript: a second config (for example `tsconfig.strict.json`) that extends the main one with strict flags and an `include` list that grows module by module, run in CI next to the normal check.
   - Python: per-module overrides that set strict for listed modules (mypy `[[tool.mypy.overrides]]` or pyright `strict` paths), with the global level unchanged.
   - Either way: a CI step that fails if the strict list shrinks or the suppression count grows.

Write the artifact: Baseline, Strict cost by module (Module | Errors | Top error kinds | Dependents), Order, Ratchet design, Third-party stub gaps. Stop and wait for approval.
