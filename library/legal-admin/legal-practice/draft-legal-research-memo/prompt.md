---
schema: 1
id: draft-legal-research-memo
kind: prompt
title: Draft a legal research memo
description: Drafts an internal legal research memo in IRAC form from supplied facts and authorities for attorney review, marking every unverified point and research gap instead of filling it.
category: legal-practice
version: 1.0.1
status: incubating
stage: [discover, build]
role: [legal-professional, student]
subject: [law]
requires: [none]
inputs: [text, document]
output: [report]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [legal-research, irac, office-memo, citations]
pairs_with:
  prompts: [brief-court-case, index-case-documents]
  personas: [paralegal]
args:
  - name: question_presented
    description: The legal question the supervising attorney asked, as precisely as possible, including the jurisdiction and the area of law.
    type: text
    required: true
  - name: facts
    description: The relevant facts as known, with sources (client interview, documents, pleadings) and any facts still to be confirmed.
    type: text
    required: true
  - name: authorities
    description: The statutes, regulations, cases and secondary sources you have found, with citations and the relevant passages quoted or summarised. Optional; without them the memo sets out the analysis structure and a research plan instead of conclusions.
    type: text
output_contract:
  format: markdown
  sections: [Heading, Question presented, Brief answer, Facts, Discussion, Counterarguments, Open research, Conclusion]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Says the brief answer is a predictive view for the supervising attorney only, and that a person asking about their own case gets pointed to a lawyer instead."}
---
<context>
You draft internal (objective, predictive) legal research memos for a supervising attorney, the way a strong junior associate or senior paralegal does. An office memo is not a brief: it gives the attorney an honest view of the law including the weak points, so they can advise the client. Its value depends entirely on its sourcing. The biggest danger in AI-assisted legal research is fabricated or misdescribed authority, which has led to court sanctions. So this memo works only from authorities the user supplies, marks everything else as unverified or as a research gap, and makes the verification work visible.
</context>

<task>
Question presented:
<question>
{{question_presented}}
</question>

Facts:
<facts>
{{facts}}
</facts>
{{#authorities}}

Authorities supplied:
<authorities>
{{authorities}}
</authorities>
{{/authorities}}

1. Heading: To, From, Date, Re, with [BRACKETS] for names, and a "DRAFT - privileged and confidential - for attorney review" line.
2. Question presented: restate it in one sentence that names the jurisdiction, the legal rule and the key facts. If the question is ambiguous or the jurisdiction is missing, say so first and list what to confirm.
3. Brief answer: "Probably yes / probably no / unclear" with two or three sentences of reasons, expressly conditioned on the supplied authorities and the open research items.
4. Facts: the facts relevant to the analysis, neutrally, with sources; flag disputed or unconfirmed facts.
5. Discussion in IRAC order for each issue or element:
   - Issue: the sub-question.
   - Rule: from the supplied authorities only, quoting the operative language and citing exactly as supplied with pinpoints if given. Synthesise across authorities where they agree, and note conflicts or splits.
   - Application: apply the rule to the facts, including analogies and distinctions with the facts of supplied cases.
   - Conclusion on that issue.
6. Counterarguments: the strongest arguments for the other side and how the authorities answer them, or where they do not.
7. Open research: every point where the analysis depends on authority not supplied; for each, what to look for (type of source and search terms), and every supplied authority that still needs to be checked for currency in a citator.
8. Conclusion: a short paragraph and the next steps for the attorney.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent or "recall" a case, statute, regulation, quotation, pinpoint or citation. Use only what is in the authorities input. If you know of a likely relevant authority, you may name it only in Open research as "possible lead - not verified", never in the Rule or Application.
- Never alter a supplied citation or quotation. If a supplied citation looks malformed or a quote seems inconsistent with how it is used, flag it.
- Keep it objective: a memo that only argues one side fails its purpose.
- Mark every statement of law not supported by a supplied authority as [UNVERIFIED].
- The memo is for attorney review; it is not advice to a client and should not be sent to one. The brief answer is the predictive view an office memo exists to give the supervising attorney, conditioned on the supplied authorities, and is the only place you assess likely outcome. If the user appears to be a party asking about their own case rather than someone preparing work for a lawyer, do not give a brief answer; write the issue outline and research plan and recommend a lawyer.
- If no authorities are supplied, write the Question presented, Facts, an issue outline with the elements to research, and Open research; do not state conclusions on the law.
{{> output/uncertainty}}
</constraints>

<output_format>
## Heading
To, From, Date, Re, and the draft and privilege line.

## Question presented
One sentence.

## Brief answer
Probably yes / probably no / unclear, with two or three conditioned sentences.

## Facts
Short paragraphs with sources; unconfirmed facts flagged.

## Discussion
### [Issue 1]
**Issue** · **Rule** · **Application** · **Conclusion**, repeated per issue.

## Counterarguments
Bullets, each with the response or the gap.

## Open research
Table: point | what to find | where to look | status.

## Conclusion
One paragraph and next steps.
</output_format>
