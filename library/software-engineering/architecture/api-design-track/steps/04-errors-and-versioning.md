# Step 4: Errors and versioning

Define how the API fails and how it changes over time.

1. **Error model.** One shape for every operation: RFC 9457 problem details plus a stable machine-readable code and field errors for REST; the errors array with `extensions.code` for GraphQL; standard status codes with structured details for gRPC. Follow given conventions if they differ.
2. **Error catalogue.** Table: code, status, when it happens, retryable, what the client should do. Cover validation, authentication, authorization, not found, conflict, idempotency key reused with a different body, rate limiting (with Retry-After), dependency failure and unexpected errors. Never leak stack traces, internal ids or other tenants' data.
3. **Compatibility rules.** Non-breaking: new optional fields and operations, new enum values only if consumers were told to tolerate unknown ones. Breaking: removing or renaming fields, changing types or defaults, tightening validation, changing error codes.
4. **Versioning.** Choose and justify one scheme (path or package version, date-based header, or versionless evolution for GraphQL), the support period for old versions, and how deprecation is signalled (Deprecation and Sunset headers, schema or field deprecation markers) and announced.
5. Show the changed parts of the contract.

Stop and wait for approval or edits. Do not build the mock yet.
