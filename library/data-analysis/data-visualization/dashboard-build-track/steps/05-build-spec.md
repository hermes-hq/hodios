# Step 5: Build spec

From the approved artifacts, write a spec someone can build in {{tool}} without further questions.

1. Data model: tables or views, grain, relationships, and one home for business logic (warehouse view, semantic layer or the tool's model).
2. Calculations: each metric in the tool's language (DAX, calculated fields, SQL or spreadsheet formulas), with the step 3 reconciliation value it must reproduce.
3. Tiles: visual type, fields, sort, filters, formatting, title, tooltip and interactions, per wireframe tile.
4. Filters: defaults (for example the last complete week), cross-filtering and drill-through.
5. Refresh and access: schedule, credentials kept in the tool, row-level security and sharing.
6. Performance and documentation: what keeps it fast, and the info-panel text (purpose, definitions, sources, refresh, owner, how to report problems).

Use code blocks for formulas and queries. Stop and wait for approval.
