---
schema: 1
id: triage-suspicious-executable
kind: prompt
title: Triage a suspicious executable
description: Triages a suspicious Windows or Linux executable with static checks - hashes, signature, packing, imports, strings and capabilities - and decides benign, suspicious or malicious and what to do next.
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
depth: specific
tags: [malware-triage, static-analysis, pe-file, elf, capa, code-signing]
pairs_with:
  prompts: [triage-sandbox-report, write-yara-rule, analyze-suspicious-script, analyze-memory-image-with-volatility]
  personas: [soc-analyst]
args:
  - name: static_output
    description: Output from tools such as file, sigcheck or osslsigncode, pestudio, Detect It Easy, capa, FLOSS or strings, readelf, plus hashes and file size. Paste text, not the binary.
    type: text
    required: true
  - name: context
    description: Where it was found (path, host, user), how it got there if known, what alerted, and whether it has run.
    type: text
output_contract:
  format: markdown
  sections: [Identity, Static indicators, Capabilities, Reputation checks, Verdict, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Static triage answers "is this worth a sandbox run or a full investigation" in minutes, without executing anything. Useful signals: the file's real type versus its name; a valid code signature from the expected publisher (also check for revoked or stolen certificates and signatures on a file that is otherwise odd); version information that names a different product than the file name; packing (UPX section names, high-entropy sections, a tiny import table using `LoadLibrary` and `GetProcAddress`); import combinations that imply behaviour (`VirtualAllocEx`, `WriteProcessMemory` and `CreateRemoteThread` for injection, `CryptEncrypt` with file enumeration for encryption, `InternetOpenUrl` or `WinHttp` for download); strings such as URLs, IPs, user agents, mutex names and ransom text, with FLOSS recovering obfuscated ones; and capa results mapped to ATT&CK. For ELF: static linking, stripped symbols, UPX, embedded `/bin/sh` commands, miner pool strings. Compile timestamps are easily forged. Looking up a hash in reputation services is safe; uploading the file can leak confidential data or alert the attacker, so that is a decision, not a default.
</context>

<task>
Triage this executable:

<static_output>
{{static_output}}
</static_output>
{{#context}}

<context_notes>
{{context}}
</context_notes>
{{/context}}

1. Identity: file type and architecture, hashes (SHA256 first, plus imphash, TLSH or ssdeep if given), size, signer and signature status, version info, and whether the name and path fit a legitimate product.
2. Static indicators: packing, section anomalies, import combinations, notable strings, embedded resources, quoting the tool line for each.
3. Capabilities: what the binary can probably do, grouped (execution, persistence, injection, credential access, network, encryption, anti-analysis), with ATT&CK technique names where capa or the imports support them.
4. Reputation checks: what to look up by hash and indicator, and whether uploading the sample is advisable given the context.
5. Verdict: benign, suspicious or malicious, with confidence, and the strongest evidence each way.
6. Next steps: sandbox run settings worth choosing, YARA rule candidates from distinctive strings, host checks if it ran (process tree, persistence, network), and containment if the verdict is malicious.
</task>

<constraints>
- Never tell the user to run the file outside an isolated sandbox or analysis VM.
- Do not decide malicious from a single weak signal such as packing, an unsigned file or a recent compile time.
- Do not invent capa rule names, malware families or reputation results. Mark hypotheses as such.
- Defang network indicators (`hxxp`, `[.]`).
{{> output/uncertainty}}
</constraints>

<output_format>
## Identity
Bullets.

## Static indicators
Table: Indicator | Evidence | Weight (weak, moderate, strong).

## Capabilities
Grouped bullets with technique names.

## Reputation checks
Bullets, including the upload decision.

## Verdict
One line plus reasoning.

## Next steps
Ordered checklist.
</output_format>
