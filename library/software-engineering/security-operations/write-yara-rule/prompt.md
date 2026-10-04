---
schema: 1
id: write-yara-rule
kind: prompt
title: Write a YARA rule
description: Writes a YARA rule for a malware family or suspicious file pattern from defender-supplied indicators, balancing strings and conditions to limit false positives, with test and tuning guidance.
category: security-operations
version: 1.0.0
status: incubating
stage: [build]
role: [security-engineer]
requires: [none]
inputs: [text, file]
output: [code, explanation, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [yara, malware-analysis, file-scanning, false-positives, threat-detection]
pairs_with:
  prompts: [write-sigma-rule, analyze-suspicious-script, write-threat-intel-brief]
  personas: [detection-engineer]
args:
  - name: indicators
    description: What you know about the files - unique strings, byte sequences, imports, section names, sizes, hashes of samples, packer, and behaviour notes from a sandbox or report.
    type: text
    required: true
  - name: file_type
    description: The file format the rule targets; it decides the header check and which modules make sense.
    type: enum
    enum: [pe, elf, macho, office-ooxml, office-ole, pdf, script, any]
    default: pe
  - name: purpose
    description: production-detection keeps false positives near zero for scanning fleets or mail gateways; hunting accepts more noise to find related samples in a corpus.
    type: enum
    enum: [production-detection, hunting]
    default: production-detection
output_contract:
  format: markdown
  sections: [Assumptions, Rule, Why these strings, False-positive risks, Testing, Performance notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
YARA rules match files by strings, byte patterns and conditions. The rules that cause trouble are predictable: they match strings from a common library, compiler runtime or packer stub and fire on thousands of clean files; they lean on one string the next build will change; they are a hash list dressed up as a rule; or they use short atoms and unanchored regular expressions that slow every scan. A good rule combines several strings that are specific to the family, anchors on the file format, bounds the file size, and says how it was tested against both malicious samples and a clean corpus.
</context>

<task>
Write a YARA rule from these defender-supplied indicators:

<indicators>
{{indicators}}
</indicators>

Target format: {{file_type}}. Purpose: {{purpose}}.

1. If the indicators contain nothing a rule can match (only a family name, or only one hash), say so, explain what to collect (samples' unique strings, imports, a sandbox report) and stop. A hash on its own belongs in an IOC blocklist, not a YARA rule.
2. Sort the indicators into: likely family-specific (custom mutex names, unique error messages, configuration markers, distinctive byte sequences in code), likely shared (library, runtime or packer strings, common API names, URLs that will rotate), and unusable. Explain each placement briefly.
3. Build the rule:
   - `meta`: description, author and date placeholders, reference (only if supplied), sample hashes supplied, and a `purpose` field.
   - `strings`: text strings with the right modifiers (`ascii`, `wide`, `nocase` only when needed, `fullword` for short tokens), hex strings with wildcards `??` and bounded jumps `[2-6]` for code that varies between builds, and regex only when unavoidable and anchored. Name strings by role (`$cfg_marker`, `$err_msg1`, `$code_xor_loop`).
   - `condition`: a format check at offset 0 suited to {{file_type}} (for example `uint16(0) == 0x5A4D` for PE, `uint32(0) == 0x464C457F` for ELF, `uint32(0) == 0x04034B50` for OOXML zip, `uint32(0) == 0xE011CFD0` for OLE, `uint32(0) == 0x46445025` for PDF; for `script` or `any` there is no reliable magic, so say so and lean on the strings and size instead), a `filesize` bound from the samples, and a threshold such as `2 of ($err_msg*) and $cfg_marker`. Use modules (`pe` imports or section names, `math.entropy`) only when the indicators support them and say which module is imported.
   - For production-detection require several family-specific strings; for hunting write a looser rule and name it with a `_hunt` suffix.
4. List false-positive risks: which strings might appear in legitimate software and how the condition protects against them.
5. Give a test plan: run against the known samples (every one should match; `yara -s` shows which strings hit), against a clean corpus of the same file type (operating system files, common installers, office documents), and against older or newer samples of the family if available; record the match counts.
6. Before answering, check the rule compiles in principle: every string referenced in the condition exists, hex strings have even nibbles and valid jumps, backslashes and double quotes inside text strings are escaped (a mutex `Global\sync` is written `"Global\\sync"`), and no string is shorter than four bytes without a reason.
</task>

<constraints>
- Defensive detection only. Do not write, modify, complete or pack malware, and do not suggest how to make a sample evade this or any other rule.
- Use only the indicators provided; never invent strings, offsets, hashes or family attribution. Mark anything inferred.
- Do not claim the rule was tested or compiled; say what must be run.
- Defang any URL or domain in comments and meta (`hxxp://`, `example[.]com`), and keep defanged values out of `strings` unless the plain form is what appears in the file.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Format, what the samples are, what is unknown.

## Rule
One fenced block with the complete rule, including any `import` lines.

## Why these strings
Table: String id | Value (shortened if long) | Category (family-specific, shared, structural) | Why it is included.

## False-positive risks
Bullets with the mitigation for each.

## Testing
Numbered steps with the corpus to use and the result to expect.

## Performance notes
Short bullets on atom quality, regex use and scan cost, or "No concerns".
</output_format>
