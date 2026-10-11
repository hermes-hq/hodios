---
schema: 1
id: analyze-malicious-office-document
kind: prompt
title: Analyse a suspicious Office or PDF document
description: Analyses a suspicious Office, RTF or PDF attachment statically for macros, remote templates, embedded objects and exploit traits, extracting defanged indicators and a verdict.
category: security-operations
version: 1.0.0
status: incubating
stage: [operate, review]
role: [security-engineer]
requires: [none]
inputs: [text, file]
output: [report, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [maldoc, oletools, vba-macros, pdf-analysis, iocs, static-analysis]
pairs_with:
  prompts: [investigate-reported-phishing, analyze-suspicious-script, triage-sandbox-report, write-yara-rule]
  personas: [soc-analyst]
args:
  - name: sample_info
    description: Output from tools such as file, oleid, olevba, mraptor, oleobj, rtfobj, msodde, pdfid or pdf-parser, plus file name, size and SHA256. Paste text output, not the file.
    type: text
    required: true
  - name: delivery_context
    description: How it arrived - sender, subject, who opened it, whether macros were enabled, and any EDR alerts on the recipient's machine.
    type: text
output_contract:
  format: markdown
  sections: [File identity, Static findings, Likely behaviour, Indicators, Verdict, Response actions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Malicious documents work through a small set of mechanisms. VBA macros with auto-execution entry points (`AutoOpen`, `Document_Open`, `Workbook_Open`) that call `Shell`, `CreateObject("WScript.Shell")`, WMI or download APIs. Excel 4.0 (XLM) macros hidden on very hidden sheets. Remote template injection in OOXML, where `word/_rels/settings.xml.rels` points `attachedTemplate` at an external URL, so the file itself has no macro. Embedded OLE objects, packaged executables or LNK files. RTF files carrying exploit objects for old Equation Editor flaws. DDE fields. PDFs with `/OpenAction`, `/JavaScript`, `/Launch` or `/EmbeddedFile`, or that are just a link to a credential page. VBA stomping removes the source and leaves only p-code, so `olevba` source can look clean while `pcodedmp` shows the real logic. File extension often disagrees with the real type: check the magic bytes (OLE `D0 CF 11 E0`, ZIP `PK`, RTF `{\rtf`, PDF `%PDF`). Since Office blocks macros by default in files carrying the Mark of the Web, many campaigns moved to ISO, ZIP, OneNote or LNK wrappers, so the document may be one stage of a chain.
</context>

<task>
Analyse this document from the tool output:

<sample_info>
{{sample_info}}
</sample_info>
{{#delivery_context}}

<delivery_context>
{{delivery_context}}
</delivery_context>
{{/delivery_context}}

1. File identity: real type from magic bytes or tool output versus the extension, hashes, and whether it was inside an archive or container.
2. Static findings: list each mechanism present (auto-exec macros, suspicious keywords, XLM, remote template, external relationships, OLE objects, DDE, PDF actions, encryption), quoting the tool line that shows it. Note what the output does not cover (for example stomped VBA, encrypted documents) and which tool to run next.
3. Likely behaviour: describe in plain words what happens when a user opens it and enables content, staged by step, and what the next stage is likely to be. Label inference as inference.
4. Indicators: URLs, domains, IPs, file paths, dropped file names, registry keys, all defanged (`hxxp`, `[.]`), with where each came from.
5. Verdict: malicious, suspicious or benign with confidence and reasoning.
6. Response actions: given the delivery context, whether the recipient's machine needs investigation (macros enabled or EDR alert), mail purge and search for the same hash or sender, blocks for the indicators, and whether to submit to a sandbox.
</task>

<constraints>
- Analysis must be static and in an isolated analysis environment. Never tell the user to open the file in Office on a normal workstation or enable content.
- Never output a live, clickable URL from the sample. Defang every indicator.
- Do not deobfuscate into a working payload or reproduce a weaponised macro. Summarise what the code does.
- Do not invent indicators or malware family names. If a family is suggested, mark it as a hypothesis.
{{> output/uncertainty}}
</constraints>

<output_format>
## File identity
Bullets: claimed type, real type, hashes, container.

## Static findings
Table: Mechanism | Evidence (tool line) | Meaning.

## Likely behaviour
Numbered stages.

## Indicators
Table: Type | Value (defanged) | Source.

## Verdict
One line plus two to four sentences.

## Response actions
Ordered checklist.
</output_format>
