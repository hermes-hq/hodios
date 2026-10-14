---
schema: 1
id: write-layoff-announcement
kind: prompt
title: Write a company-wide layoff announcement
description: Writes the internal all-company message announcing layoffs or a restructuring - the reasons, who is affected, support offered, what happens next and where to ask - plus a short leader script and FAQ.
category: hr-operations
version: 1.0.0
status: incubating
stage: [build]
role: [executive, founder, operations-manager]
advice_risk: [legal]
requires: [none]
inputs: [text]
output: [message, script, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [layoffs, restructuring, internal-communication, all-hands, change-communication]
pairs_with:
  prompts: [plan-layoff-day-logistics, write-layoff-public-statement, plan-layoff-conversation, lead-team-after-layoffs]
  personas: [hr-business-partner]
args:
  - name: facts
    description: What is happening and why, how many roles and which teams or locations, whether people are now at risk (consultation) or roles are ending, dates, and decisions already made. Only confirmed facts.
    type: text
    required: true
  - name: support
    description: Support for affected people (notice, pay and benefits points to be confirmed, outplacement, references, equipment), and for those staying. Optional.
    type: text
  - name: sender
    description: Who signs the message, how the company usually communicates (email, all-hands, chat), and the tone people expect. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Message, Leader script, FAQ, Checks before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write internal layoff announcements the way an experienced internal communications lead does. What experts know: the message goes out only after affected people have been told individually, and it should say so; people read it for three things in order - am I affected, why is this happening, what happens now - so those go first; the reason must be honest and specific (the business situation and the decision), and leaders should own the decision rather than blame the market alone; euphemisms ("rightsizing", "parting ways"), corporate optimism and gratitude that sounds scripted read as cold; numbers and dates must match what affected people heard exactly, because staff compare notes; in places where this is the start of consultation, the message must not present outcomes as final; and the message should not promise "no more layoffs" unless it is certain. Departing colleagues deserve a respectful acknowledgement, and the people who stay need to know what changes for them and where to ask questions.

<facts>
{{facts}}
</facts>
{{#support}}
<support>
{{support}}
</support>
{{/support}}
{{#sender}}
<sender>
{{sender}}
</sender>
{{/sender}}
</context>

<task>
1. Check the facts: list what is confirmed and what is missing (dates, numbers, consultation status, support terms). Mark missing items [X] rather than guessing.
2. Write the message, 300 to 500 words: what happened and who is affected (and that affected people have already been told), the reason in plain words, owned by the sender, what support departing colleagues receive, what changes for those who stay, what happens next with dates, and where to ask questions. If consultation applies, use "proposed" and "at risk" language.
3. Write a two-minute script for the leader to say at an all-hands or team meetings, consistent with the message.
4. Write an FAQ of eight to ten questions people will actually ask (Will there be more? Why these teams? What about my work? Can I say goodbye? What should I tell customers?), answered only from the facts; where the answer is unknown, say when it will be known.
5. Checks before sending: consistency with individual letters and any external statement, timing, legal review, and who answers follow-up questions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the facts given; never invent figures, reasons, dates or support terms.
- No euphemisms, no blaming departing employees, no promise of job security that the facts do not support.
- Do not name affected individuals.
- If the situation involves consultation, do not word decisions as final.
{{> output/uncertainty}}
</constraints>

<output_format>
## Message
Ready to send, with subject line.
## Leader script
## FAQ
Q and A pairs.
## Checks before sending
Checklist.
</output_format>
