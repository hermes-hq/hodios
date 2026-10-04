---
schema: 1
id: implement-locale-aware-sorting-and-search
kind: prompt
title: Implement locale-aware sorting and search
description: Implements locale-aware sorting, comparison and search with ICU collation, Unicode normalisation, case folding, accent-insensitive matching and database collations, plus tests that break naive code.
category: localization
version: 1.0.0
status: incubating
stage: [build, verify]
role: [backend-engineer, frontend-engineer, fullstack-engineer, dba]
requires: [none]
inputs: [file, schema, text]
output: [code, tests]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [collation, unicode-normalization, case-folding, icu, accent-insensitive, full-text-search]
pairs_with:
  prompts: [review-i18n-readiness, implement-locale-formatting]
  personas: [localization-engineer]
args:
  - name: code
    description: The sorting, comparison, search, uniqueness or deduplication code, plus the relevant table definitions or index settings.
    type: text
    required: true
  - name: languages
    description: Languages your users write in, for example "German, Swedish, Turkish, Japanese, Spanish". Leave empty to test against a broad set.
    type: string
  - name: database
    description: The database and version, for example "PostgreSQL 16", "MySQL 8.0", "SQL Server 2022", "Elasticsearch 8", "SQLite". Leave empty if sorting happens only in application code.
    type: string
output_contract:
  format: markdown
  sections: [Findings, Fixed code, Database changes, Tests]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Code that sorts and searches by byte or code point works for ASCII English and fails everywhere else. Swedish sorts "ö" after "z", German sorts it with "o"; Spanish users expect "ñ" after "n"; "Zoë" typed on a Mac (NFD, decomposed) does not match "Zoë" stored from Windows (NFC); uppercasing "i" in Turkish gives "İ", so a case-insensitive login can lock out users; "straße" should match "STRASSE"; and Japanese users expect full-width and half-width katakana to match. The fixes are well known (ICU collation with the right locale and strength, normalisation at the boundary, case folding rather than lowercasing, and database collations and analysers chosen on purpose), but each has trade-offs for indexes, uniqueness and performance.
</context>

<task>
Fix sorting, comparison and search in this code.

<code>
{{code}}
</code>

Languages: {{languages}} (if empty, use German, Swedish, Turkish, Spanish, French, Japanese and Arabic as stress cases). Database: {{database}}.

1. Classify each operation in the code: display sorting, equality or uniqueness (usernames, emails, slugs), case-insensitive lookup, search or filtering, and deduplication. They need different tools.
2. Display sorting: use locale-aware collation (`Intl.Collator(locale, { sensitivity, numeric: true })`, ICU4J or `java.text.Collator`, Python PyICU or `locale.strxfrm` with caveats, .NET `CompareInfo`), with the user's locale, not the server's. Sort numbers in strings naturally where users expect it ("file 2" before "file 10").
3. Equality and identifiers: normalise to NFC at input boundaries; for identifiers that must be unique regardless of case, use Unicode case folding (not `toLowerCase`) and consider NFKC_Casefold or the PRECIS profile for usernames to block confusable look-alikes. Never use locale-specific case mapping for identifiers (Turkish dotless i), and use locale-specific mapping only for display text.
4. Search: decide the matching strength the product wants (accent-insensitive, case-insensitive, width-insensitive) and implement it consistently in code and in the index: collator with base or accent sensitivity for in-memory filtering; database or search-engine analysers (for example ICU folding, language stemmers, CJK tokenisation) for full-text.
5. Database: choose or change collations explicitly (for example ICU or nondeterministic collations in PostgreSQL, `utf8mb4_0900_ai_ci` in MySQL, `_CI_AI` collations in SQL Server). Explain the effect on existing indexes, unique constraints, `LIKE` behaviour and query plans, and give a migration that rebuilds affected indexes. Flag where the database's collation library version can change sort order on upgrade.
6. Write tests with strings that break naive code, chosen from the target languages: Turkish `"I"`/`"ı"`/`"İ"`/`"i"`, German `"ß"` vs `"SS"`, Swedish `"Ö"` vs `"Z"`, NFC vs NFD `"é"`, Spanish `"ñ"`, Japanese half-width and full-width forms, Arabic with and without diacritics, numbers in strings, and emoji with modifiers.
</task>

<constraints>
- Do not change behaviour that is deliberately binary (for example password comparison or cryptographic tokens). Say so if the code mixes them.
- Do not claim a specific collation exists in a database version unless you are sure; mark [check version].
- Point out data migration risks before proposing changes to unique constraints.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Findings
Table: Location | Operation type | What breaks | Example input and wrong result | Fix.

## Fixed code
The corrected functions with comments.

## Database changes
Collation or analyser choices, the migration, and its effect on indexes and constraints. "None" if not applicable.

## Tests
Table-driven tests with the input pairs and the expected order or match result per locale.
</output_format>
