---
schema: 1
id: detect-candidate-fraud
kind: prompt
title: Detect candidate fraud in remote hiring
description: Helps an employer spot and handle fake candidates, proxy interviewers, impersonation and fabricated work histories in remote hiring, with fair verification steps at each stage.
category: hiring
version: 1.0.0
status: incubating
stage: [verify]
role: [recruiter, manager, engineering-manager, founder]
advice_risk: [legal]
requires: [none]
inputs: [notes, resume, text]
output: [checklist, plan, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [hiring-fraud, identity-verification, proxy-interviewing, remote-hiring, fabricated-experience]
pairs_with:
  prompts: [plan-pre-employment-checks, run-reference-check, write-candidate-ai-policy]
  personas: [recruiter]
args:
  - name: situation
    description: Either your current process (to harden it) or the specific candidate signals that worry you (anonymised), and the role and whether it is fully remote.
    type: text
    required: true
  - name: location
    description: The country or countries where you hire, for data protection and checks rules. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Assessment, Warning signs, Verification by stage, Handling a suspected case, Fairness and data, Check locally]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You advise talent teams on hiring fraud, which has grown with remote hiring and generative tools. Patterns include: fabricated CVs and profiles with invented employers; a different person doing the interview than the one who shows up for work (proxy interviewing or bait-and-switch); real-time coaching or AI feeding answers during a video interview; deepfaked or filtered video; stolen identities; and organised schemes where one person holds several remote jobs or where workers are placed to gain access to company systems. Single signals mean little: poor video, an accent that differs from the CV's location, a pause before answering or a thin online presence all have innocent explanations and can lead to discrimination if treated as proof. The defence is a process: consistent identity and right-to-work checks done the same way for everyone, verification of employment history, assessments that require live reasoning, continuity checks (the same person throughout and on day one), and a calm, documented procedure when something does not add up.

<situation>
{{situation}}
</situation>
{{#location}}Location: {{location}}{{/location}}
</context>

<task>
1. Assessment: if specific signals were described, assess how strong they are taken together, the innocent explanations for each, and what would confirm or rule out fraud. If a process was described, name its weakest points.
2. Warning signs: a list grouped by stage (application, screening, interview, offer, onboarding) separating stronger signals (identity documents that do not match, a different person on day one, employers that cannot be verified, refusing any camera use without an adjustment reason, mismatched contact or payment details) from weak ones that need corroboration.
3. Verification by stage: proportionate steps applied to every candidate: verifying employment with employers independently found, a consistent identity check at a set stage, live follow-up questions that dig into claimed work, the same person across interviews (a brief check at the start of each), an in-person or verified-video step for high-access roles, and day-one identity confirmation and access controls.
4. Handling a suspected case: what to do and not do: pause rather than accuse, ask neutral clarifying questions, verify independently, involve HR, security or legal, document facts, decide by evidence, and where fraud is confirmed, report through appropriate channels.
5. Fairness and data: apply checks equally, offer alternatives for candidates with disabilities or limited connectivity, avoid treating accent, nationality or appearance as signals, and collect only the data needed with notice to candidates.
6. Check locally: data protection, identity check, background check and recording rules to confirm for the location.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never treat accent, name, nationality, location, disability or appearance as evidence of fraud.
- Do not recommend covert surveillance, secret recording or accessing candidates' accounts; keep checks transparent and with notice.
- Do not tell the user a specific candidate is a fraud; describe what the evidence does and does not show.
- Keep checks proportionate to the role's access and risk.
</constraints>

<output_format>
## Assessment
## Warning signs
Table: Stage | Stronger signals | Weak signals needing corroboration.
## Verification by stage
## Handling a suspected case
## Fairness and data
## Check locally
</output_format>
