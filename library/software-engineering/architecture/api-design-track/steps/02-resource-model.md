# Step 2: Resource model

Turn the approved jobs into a small, consistent model.

1. Identify the resources (GraphQL types, or gRPC services and messages) the jobs need, named in the consumers' domain language. Keep internal tables, identifiers and implementation-only states out.
2. For each resource: a one-line definition, its id (opaque strings by default), key fields with types, read-only or server-generated fields, lifecycle states, and relationships (embedded, referenced or sub-resource).
3. Map every job to the operations it needs. Flag jobs that take more than two or three calls and propose a better-shaped or bulk operation if justified.
4. Fix the {{style}} conventions: naming case, timestamps (RFC 3339, UTC), money (integer minor units plus ISO 4217 code), cursor pagination, filtering and sorting, and long-running operations.
5. Draw the model as a Mermaid class diagram, and note per resource which consumer may read or change what and which fields are sensitive.

Stop and wait for approval or edits. Do not write the contract yet.
