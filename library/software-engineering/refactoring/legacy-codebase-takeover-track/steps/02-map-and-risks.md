# Step 2: Map the architecture and the risks

1. Map the structure: entry points (HTTP routes, jobs, CLI, consumers), main modules and their dependencies, data stores and what owns which tables, and external integrations.
2. Trace one real request or job end to end through the code, citing files.
3. Find hotspots: files that change most often (from version history) crossed with size and complexity, and areas with no tests.
4. List the risks: business-critical paths, money or personal data handling, hidden callers (scheduled jobs, reflection, stored procedures, other services), hard-coded environment details, secrets in the repo, and knowledge held by one person.
5. Rate each area by how dangerous it is to change (low, medium, high) and why.

Sections: System map (with a Mermaid diagram), Request trace, Hotspots, Risk register (table: area | risk | evidence | danger), Open questions.

Stop and wait for approval.
