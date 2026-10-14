---
schema: 1
id: translate-code-comments-to-english
kind: prompt
title: Translate code comments to English
description: Translates comments, docstrings and developer log messages in a codebase into clear English, without touching code, identifiers or strings that users see.
category: docs
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, maintainer]
requires: [repo-read, file-write]
inputs: [repo, file]
output: [diff, report]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [code-comments, docstrings, comment-translation, codebase-handover]
args:
  - name: scope
    description: The files or directories to translate.
    type: text
    required: true
  - name: source_language
    description: The language the comments are written in, if known.
    type: string
  - name: include_logs
    description: Whether to also translate log and exception messages read only by developers.
    type: boolean
    default: false
output_contract:
  format: markdown
  sections: [Translated, Left untouched, Terms to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Codebases change hands across countries: an outsourced project comes back, a team is merged, an open-source project wants outside contributors. Translating its comments is not a word-for-word job. Domain terms often have a fixed English equivalent the team already uses in identifiers (the code may say `nota_fiscal` while the comment says "NF-e"), abbreviations and jokes do not survive literal translation, and some strings that look like comments are not: user-facing messages, i18n keys, log lines that alerting or log searches match on, and string literals compared in code. Changing any of those changes behaviour.
</context>

<task>
Translate the comments in {{scope}} into English{{#source_language}} from {{source_language}}{{/source_language}}.

1. Build a glossary first: scan identifiers, existing English docs and the comments for domain terms. Prefer the English term already used in code; keep legal or regulatory names (tax forms, agencies) in the original with an English gloss on first use.
2. Translate inline comments, block comments and doc comments into clear, idiomatic English. Translate meaning, not words: expand local abbreviations, drop jokes that do not carry over unless they explain something, and keep TODO owners and ticket ids as they are.
3. Keep doc-comment structure intact: tags such as `@param`, `:raises:` or `# Errors` stay, and parameter names stay exactly as in code.
4. Log and exception messages: translate them only if include_logs is true (it is {{include_logs}}). Before translating one, search the repo, dashboard config and alert rules for its text; if it is matched anywhere, leave it and list it. Otherwise leave every log and exception message unchanged.
5. Do not touch user-facing strings, i18n resources, identifiers, string literals used in comparisons, SQL, regexes or generated files.
6. Run the build or tests if cheap, to confirm nothing but comments changed, and check the diff contains comment lines only.
</task>

<constraints>
- No code changes, no renaming of identifiers, no reformatting.
- If a comment is ambiguous in the source language, translate the most likely meaning and list it under "Terms to confirm" with the original.
- Keep commented-out code as it is; do not translate it.
- Preserve the file encoding and line endings.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
Apply the edits. Then reply with:
## Translated
Files changed and the glossary you used (source term, English term).
## Left untouched
Strings that look like comments but were kept, with why (user-facing, matched by alerts, used in code).
## Terms to confirm
Ambiguous phrases with the original and your translation.
</output_format>
