---
schema: 1
id: write-policy-brief
kind: prompt
title: Write a policy brief
description: Turns research findings into a policy brief for decision-makers with the problem, the evidence and its strength, costed options and recommendations. For researchers and think tanks.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, consultant, writer]
requires: [none]
inputs: [document, text, notes]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [policy-brief, evidence-to-policy, knowledge-translation, policy-options, research-uptake]
pairs_with:
  prompts: [write-briefing-note, explain-research-to-public, plan-research-dissemination, write-impact-statement]
  personas: [science-communicator]
args:
  - name: findings
    description: The research the brief is based on - the paper, report or your summary of it, with design, sample, key results and numbers, limitations, and any costs or implementation data.
    type: text
    required: true
  - name: audience
    description: Who will read it and what they can decide, for example "city council transport committee", "health ministry officials", "MPs on the education select committee".
    type: string
    required: true
  - name: length_pages
    description: Target length in pages, at about 450 words per page plus one figure or table.
    type: number
    default: 2
output_contract:
  format: markdown
  sections: [Before you send, Policy brief, Evidence notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A policy brief is read in a few minutes by someone who did not ask for the research, has competing priorities, and must decide or advise. It leads with what the reader should do and why now, not with the study. Briefs that work frame the problem in the reader's terms (cost, people affected, legal duty, political commitment), say how strong the evidence is in plain words, offer two to four realistic options with trade-offs, and make a recommendation that follows from the evidence. Briefs fail when they read as a shortened paper, overstate a single study, hide uncertainty, or recommend something outside the reader's powers.
</context>

<task>
Write a policy brief of about {{length_pages}} pages for {{audience}}.
<findings>
{{findings}}
</findings>

1. Identify what {{audience}} can actually decide or influence, and the policy question the findings answer for them. If the findings do not answer a question this audience controls, say so and suggest who the right audience is.
2. Judge the strength of the evidence: design, size, setting, consistency with other work the author mentions, and how far it transfers to the audience's context. Express it in one plain sentence (for example "one well-run trial in two cities; promising but not yet proven at scale").
3. Draft the brief:
   - Title that states the message, not the topic.
   - Key messages: three to five bullets a reader could repeat in a meeting.
   - The problem: scale and who is affected, in the reader's terms.
   - What the research found: the main results with the actual numbers, translated (for example "about 1 in 8 fewer admissions"), and the limitations that matter for a decision.
   - Policy options: two to four, including the status quo, each with expected effect, cost or resource signal, feasibility, equity effects and risks.
   - Recommendations: specific, actionable by this audience, ordered, with what to monitor.
   - Sources and contact.
4. Suggest one figure or table that carries the main result.
</task>

<constraints>
- Use only the numbers and claims in the findings. Mark anything needed but missing as [DATA NEEDED: ...], and costs not supplied as [COST ESTIMATE NEEDED].
- Keep causal language to what the design supports; an observational association is not "X reduces Y".
- Plain language at a general professional reading level: no unexplained acronyms, statistics explained in words.
- Recommendations follow from the evidence; separate what the evidence shows from value judgements, and label the latter.
- Stay non-partisan: no lobbying language, no attacks on existing policy, and acknowledge credible counter-arguments.
- Respect the length: about {{length_pages}} pages at roughly 450 words per page.
</constraints>

<output_format>
## Before you send
The policy question, the evidence-strength sentence, and any mismatch between audience and findings.
## Policy brief
The brief under the headings above, with the suggested figure described in brackets where it goes.
## Evidence notes
A table: claim in the brief | source in the findings | strength (strong, moderate, limited). Then the list of [DATA NEEDED] items.
</output_format>
