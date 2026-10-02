<!-- hodios:typescript-strict-rules -->
## TypeScript strict rules

Apply these rules to files matching: `**/*.ts`, `**/*.tsx`.

- Never use `any`. Use `unknown` and narrow it.
- Do not silence the compiler with `@ts-ignore`; fix the type or use `@ts-expect-error` with a reason.
- Prefer `readonly` data and exhaustive `switch` statements over defaults that hide new cases.
<!-- /hodios:typescript-strict-rules -->
