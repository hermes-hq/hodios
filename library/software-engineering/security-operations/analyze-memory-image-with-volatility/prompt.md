---
schema: 1
id: analyze-memory-image-with-volatility
kind: prompt
title: Analyse a memory image with Volatility
description: Guides memory forensics with Volatility 3 on a captured Windows or Linux image, choosing plugins, reading process, network and injection findings and keeping an evidence log.
category: security-operations
version: 1.0.0
status: incubating
stage: [operate, review]
role: [security-engineer]
requires: [none]
inputs: [text, logs]
output: [report, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [volatility, memory-forensics, process-injection, malfind, evidence-log]
pairs_with:
  prompts: [plan-evidence-acquisition, build-forensic-timeline, triage-suspicious-executable, investigate-windows-persistence]
  personas: [soc-analyst]
args:
  - name: image_details
    description: OS and build of the captured host, acquisition tool, image format and size, the image hash, and the Volatility version you have.
    type: text
    required: true
  - name: question
    description: What you want to learn, such as which process is malicious, whether code was injected, what it was talking to, or what ran before the alert.
    type: text
    required: true
  - name: plugin_output
    description: Optional output from plugins already run.
    type: text
output_contract:
  format: markdown
  sections: [Setup check, Plugin plan, Findings, False positives ruled out, Evidence log, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Memory shows what disk often hides: injected code, decrypted strings, network connections and processes that exited or unlinked themselves. Volatility 3 uses symbol tables instead of Volatility 2 profiles; Windows symbols usually download automatically, but Linux images need an ISF symbol file built from the exact kernel's debug symbols, which is the most common blocker. Analysts waste time by running every plugin and reading raw output. A better order: `windows.info` to confirm the image parses, `windows.pslist`, `windows.psscan` and `windows.pstree` for processes (a process in psscan but not pslist is hidden or exited), `windows.cmdline`, `windows.netscan`, then targeted plugins such as `windows.malfind`, `windows.dlllist`, `windows.ldrmodules`, `windows.handles`, `windows.svcscan`, `windows.filescan` and `windows.dumpfiles`. Recent Volatility 3 releases move some detection plugins into a `windows.malware` namespace (for example `windows.malware.malfind`) and keep the old names as deprecated aliases, so check `vol -h` for the installed version. Parent and count anomalies are strong signals: `lsass.exe` not a child of `wininit.exe` or more than one of it, `svchost.exe` not a child of `services.exe` or running from the wrong path, Office spawning shells. `malfind` produces false positives for JIT engines (.NET, browsers, Java) and some security products, so a hit needs a look at the memory content and the owning process.
</context>

<task>
Work through the analysis with the user.

<image_details>
{{image_details}}
</image_details>

<question>
{{question}}
</question>
{{#plugin_output}}

<plugin_output>
{{plugin_output}}
</plugin_output>
{{/plugin_output}}

1. Setup check: confirm the image hash is recorded, analysis runs on a copy, the Volatility version and symbols are right for the OS, and for Linux whether an ISF exists for that kernel. If the image cannot parse, say what to fix and stop.
2. Plugin plan: give the next three to six plugin commands in Volatility 3 syntax (`vol -f <image> windows.pslist` and so on), each with what it answers for this question, and an output-to-file habit (`-r csv` or redirect) so every result is kept.
3. When output is pasted, read it: list processes with parent, path and start time anomalies, network connections with owning processes, command lines that stand out, and injection hits with the protection flags and whether the region starts with an executable header or shellcode-like bytes.
4. Rule out false positives explicitly for each candidate (JIT processes, security agents, legitimate admin tools).
5. Keep an evidence log: each command run, the output file, the finding it supports.
6. Suggest next steps: dumping a suspicious process or region for static analysis or YARA scanning, correlating with disk and logs, and what the findings mean for containment.
</task>

<constraints>
- Never claim a process is malicious from one anomaly alone; say what would confirm it.
- Use plugin names that exist in Volatility 3; if the user is on Volatility 2, translate and say so. Mark uncertain plugin names or options `[VERIFY]`.
- Do not suggest extracting credentials from the image unless the user states it is in scope for the investigation and authorised; even then, keep extracted secrets out of reports.
- Work on copies; never on the original evidence file.
{{> output/uncertainty}}
</constraints>

<output_format>
## Setup check
Checklist with pass, fail or unknown.

## Plugin plan
Fenced `bash` block of commands with a comment per line.

## Findings
Table: Item | Evidence (plugin and line) | Why it matters | Confidence.

## False positives ruled out
Bullets.

## Evidence log
Table: Step | Command | Output file | Supports finding.

## Next steps
Numbered list.
</output_format>
