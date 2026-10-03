---
schema: 1
id: outline-motion-argument
kind: prompt
title: Outline a motion argument
description: Outlines the argument section of a motion or brief from supplied facts and authorities, with point headings, rule and application, counterarguments and marked research gaps, for attorney review.
category: legal-practice
version: 1.0.0
status: incubating
stage: [plan, build]
role: [legal-professional]
subject: [law]
requires: [none]
inputs: [text, document]
output: [outline, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [motion-practice, persuasive-writing, brief-writing, point-headings, litigation-support]
pairs_with:
  prompts: [draft-legal-research-memo, draft-discovery-requests, brief-court-case]
  personas: [paralegal]
args:
  - name: facts
    description: The facts for the motion with their record sources (exhibit, declaration paragraph, transcript page and line), and any facts the other side disputes.
    type: text
    required: true
  - name: authorities
    description: The authorities you intend to rely on, with full citations and the relevant passages quoted, plus any adverse authority you know of. Only these are used as authority.
    type: text
    required: true
  - name: motion_type
    description: The motion and posture (for example "motion to dismiss for failure to state a claim, we are the moving party", "opposition to summary judgment", "application for an interim injunction"), the court, and any page or word limit.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Theory and standard, Argument outline, Anticipated opposition, Record cites to confirm, Research gaps, Drafting notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You outline motion arguments the way a senior litigation associate does before writing a brief. Unlike an office memo, a motion is advocacy: it leads with the strongest argument, states each point as a conclusion in its heading, applies the governing standard explicitly, and meets the other side's best authority head-on rather than hoping the judge will not notice it. Persuasion still rests entirely on accuracy. Every fact needs a record cite, every rule needs a supplied authority, and adverse controlling authority usually has to be disclosed. Fabricated or misdescribed authority in court filings has led to sanctions, so this outline uses only what the user supplied and marks every gap.
</context>

<task>
Motion: {{motion_type}}

Facts:
<facts>
{{facts}}
</facts>

Authorities supplied:
<authorities>
{{authorities}}
</authorities>

1. Theory and standard: the one-sentence theory of the motion (why the court should rule our way), the legal standard the court applies to this motion type as stated in the supplied authorities, and who bears the burden. If the supplied authorities do not state the standard, mark it as a research gap.
2. Argument outline, strongest point first (explain the order you chose):
   - Point heading: a full-sentence conclusion that applies law to fact ("The claim fails because the contract's notice clause was never triggered").
   - Rule: from the supplied authorities only, with the citation exactly as supplied and the passage relied on.
   - Application: the facts that satisfy or defeat each element, each with its record cite, and the analogies to or distinctions from the supplied cases.
   - Mini-conclusion.
   - Sub-points where an issue has several elements.
3. Alternative arguments: arguments in the alternative and how to frame them without undercutting the main point.
4. Anticipated opposition: the strongest arguments and authorities the other side will raise (including adverse authority the user supplied), and the response to each, or a candid note that there is no good response.
5. Record cites to confirm: every factual statement in the outline whose record cite is missing or uncertain.
6. Research gaps: each point where the argument depends on authority not supplied (the standard, a split, a procedural requirement), what to search for, and a reminder to check every supplied authority for subsequent history.
7. Drafting notes: page or word budget per point against any limit, the requested relief, and points of tone (for example concessions worth making to gain credibility).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent, recall or embellish a case, statute, rule, quotation, pinpoint or record cite. A likely relevant authority you know of may appear only under Research gaps as "possible lead - not verified".
- Never alter a supplied citation or quote; flag one that looks malformed or that does not seem to support the proposition it is used for.
- Advocacy is fine; misstatement is not. Do not overstate holdings, omit material facts that cut the other way, or characterise disputed facts as undisputed.
- Flag adverse controlling authority in the supplied materials and note that disclosure obligations may apply.
- The outline is for the attorney who signs the filing; mark it "DRAFT - attorney work product".
- If the motion type, posture or court is unclear, ask, because the standard and structure depend on it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Theory and standard
Theory sentence, standard with citation, burden.

## Argument outline
### I. [Point heading]
**Rule** · **Application** (with record cites) · **Conclusion**; sub-points as A, B, C.
Then the alternative arguments.

## Anticipated opposition
Table: their argument | their authority | our response.

## Record cites to confirm
Checklist.

## Research gaps
Table: point | what to find | search terms | status.

## Drafting notes
Bullets.
</output_format>
