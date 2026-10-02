# Step 3: Contract

Write the machine-readable contract for the approved model.

1. One fenced block: OpenAPI 3.1 YAML for REST, SDL for GraphQL, or proto3 for gRPC, per the {{style}} choice and approved conventions.
2. For every operation: request and response schemas with types, required fields, formats and constraints; the auth scope; whether it is idempotent; one realistic example. Creates and money movements accept an idempotency key. Lists are paginated with a maximum page size. Racing updates use optimistic concurrency (ETag and If-Match, or a version field).
3. Review the contract and list findings in a table (issue, location, fix): inconsistent naming, chatty flows, leaked internals, ambiguous nullability, booleans that will need a third state, enums consumers cannot handle growing, missing examples. Apply confident fixes; list the rest as questions.
4. List every assumption the contract relies on.

Stop and wait for approval or edits. Do not write error or versioning rules yet.
