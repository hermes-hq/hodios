---
schema: 1
id: check-claim-about-law
kind: prompt
title: Check a claim about what a law says
description: Checks a claim about what a law, bill, regulation or official policy does against the text you supply, separating what the text says, how it may be applied, and what it does not say.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [writer, editor, researcher, individual]
subject: [law]
requires: [none]
inputs: [document, text]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
advice_risk: [legal]
tags: [legislation, policy-claims, viral-claims, primary-sources]
pairs_with:
  prompts: [fact-check-claims, check-paraphrase-faithfulness, respond-to-misinformation]
args:
  - name: claim
    description: The claim as it is circulating, for example "the new bill bans cash payments over 500".
    type: text
    required: true
  - name: legal_text
    description: The relevant text of the law, bill, regulation or policy, with section numbers. Paste the official version, not a summary.
    type: text
    required: true
  - name: jurisdiction_and_status
    description: Country or region, and the stage it is at (proposed, passed, in force from a date, amended).
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Verdict, What the text says, Where the claim goes wrong, Open questions, Accurate summary]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Viral claims about laws usually fail in predictable ways. A bill is described as if it were already law. A proposal by one member is presented as government policy. A narrow exception is read as a general ban, or a general rule is read as a new power that already existed. Defined terms ("vehicle", "public place", "child") mean what the definitions section says, not what they mean in everyday speech. Penalties, start dates, sunset clauses and exemptions are often in a different section from the headline provision. How courts or agencies will apply a provision is a separate question from what its words say, and it is where honest people disagree.
</context>

<task>
Check this claim against the legal text.
Claim:
<claim>
{{claim}}
</claim>
Jurisdiction and status: {{jurisdiction_and_status}}
Legal text:
<legal_text>
{{legal_text}}
</legal_text>

1. Break the claim into its parts: who it applies to, what it requires, forbids or allows, from when, the penalty, and the status ("is law", "will", "could").
2. For each part, find the provision that speaks to it and quote it with its section number. Read the definitions, exemptions, commencement and penalty sections before concluding.
3. Mark each part: Supported by the text, Not in the text, Contradicted by the text, or Depends on interpretation or later rules (for example powers to make regulations).
4. State whether the status claimed matches the status given ({{jurisdiction_and_status}}).
5. Write an accurate plain-language summary of what the text does, at the same length as the claim.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Work only from the text supplied. Do not quote, number or summarise provisions that are not in it, and say when the claim depends on a part of the law that was not pasted.
- Do not predict how a court or agency will rule. Where the wording is open, describe the competing readings neutrally.
- Do not tell the reader what they personally must do to comply; this is a check of a public claim, not advice on their situation.
- Keep the jurisdiction fixed. If the claim mixes up countries or levels of government, say so.
</constraints>

<output_format>
## Verdict
One rating in bold (Accurate, Partly accurate, Misleading, Inaccurate, Cannot tell from this text), then two sentences.
## What the text says
Table: claim part | provision (section) | quoted words | mark.
## Where the claim goes wrong
Bullets naming each distortion: status, scope, definitions, exemptions, dates or penalties.
## Open questions
What depends on interpretation, missing sections or later regulations, and where the official answer would be found.
## Accurate summary
A plain-language replacement for the claim.
</output_format>
