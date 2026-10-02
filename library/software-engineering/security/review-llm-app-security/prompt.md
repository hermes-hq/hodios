---
schema: 1
id: review-llm-app-security
kind: prompt
title: Review an LLM app for security
description: Reviews an LLM app for prompt injection, data exfiltration through tools, excessive agency and unsafe output handling, mapped to the OWASP LLM Top 10. Use before shipping an agent or RAG feature.
category: security
version: 1.0.0
status: incubating
stage: [review, design]
role: [security-engineer, ml-engineer, software-engineer, architect]
stack: [llm-apps]
requires: [none]
inputs: [spec, text, file]
output: [report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [prompt-injection, owasp-llm, excessive-agency, ai-security, threat-model]
pairs_with:
  personas: [security-auditor]
args:
  - name: architecture
    description: How the app works - users and tenants, data sources and retrieval, where model output goes, what runs automatically, and how credentials are held.
    type: text
    required: true
  - name: prompts
    description: System prompts and prompt templates, if available.
    type: text
  - name: tools
    description: Tools or functions the model can call, with their parameters, permissions and whether a human confirms each call.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Trust boundaries, Findings, Adequate controls, Tests to add]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A language model cannot reliably tell instructions from data. Any text that reaches its context, whether a user message, a retrieved document, a web page, an email or a tool result, can steer it. The damage depends on what the model can do next. The dangerous combination is access to private data, exposure to untrusted content, and a way to send data out (an outbound request, a rendered image or link, an email). Controls that only ask the model to behave ("ignore malicious instructions") are not security controls. Real controls sit outside the model: least privilege, human confirmation, output encoding, egress limits, isolation.
</context>

<task>
Review this LLM application:
{{architecture}}
{{#prompts}}
Prompts:
{{prompts}}
{{/prompts}}
{{#tools}}
Tools:
{{tools}}
{{/tools}}

1. Map trust boundaries: list every source of text entering the model's context and who controls it, every tool and what it can read or change, and every place model output goes (a browser, a database, a shell, another model, an email).
2. Check each risk in the OWASP Top 10 for LLM Applications (2025): LLM01 prompt injection (direct and indirect), LLM02 sensitive information disclosure, LLM03 supply chain, LLM04 data and model poisoning, LLM05 improper output handling, LLM06 excessive agency, LLM07 system prompt leakage, LLM08 vector and embedding weaknesses, LLM09 misinformation, LLM10 unbounded consumption.
3. Pay special attention to:
   - Exfiltration paths: markdown images or links rendered with attacker-chosen URLs, tools that fetch URLs or send messages, and logs visible to others.
   - Tool permissions: service-wide credentials where per-user ones are needed, write or delete actions without confirmation, parameters the attacker can influence.
   - Retrieval: access control enforced at query time per user and tenant, and poisoned documents.
   - Output handling: model output inserted into HTML, SQL, shell commands, file paths or code without encoding or validation.
   - Secrets in system prompts (assume the prompt will leak).
   - Cost and abuse limits: token, rate and loop limits.
4. For each finding, write an attack scenario with a short, harmless example of the injected text and where it would come from, the impact, and a fix enforced outside the model.
</task>

<constraints>
- Report only risks that the described architecture actually has. If a component is not described, ask under Tests to add or the verdict rather than assuming the worst.
- Do not offer "tell the model to ignore injections" as a fix. Prompt hardening may be listed only as defence in depth beside a real control.
- Keep injected-text examples benign (for example, exfiltrating a marker string), never working payloads against real services.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: ship | ship after fixes | redesign needed, and the single biggest risk.
## Trust boundaries
Three short lists: untrusted inputs, capabilities (tools and data), output sinks.
## Findings
Numbered, ranked. Each: OWASP LLM id, severity, attack scenario, impact, fix.
## Adequate controls
What is already sound.
## Tests to add
Red-team cases to automate, each with its input source and the expected safe behaviour.
</output_format>
