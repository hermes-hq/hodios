---
schema: 1
id: write-brand-perception-interview-guide
kind: prompt
title: Write a brand perception interview guide
description: Writes a guide for one-to-one interviews on how customers, lost customers, prospects or staff see a brand, with sampling, unaided-first questions, projective exercises, consent and an analysis plan.
category: branding
version: 1.0.0
status: incubating
stage: [discover]
role: [marketer, ux-researcher, consultant, founder]
requires: [none]
inputs: [text]
output: [questions, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [brand-research, qualitative-research, interview-guide, brand-perception, customer-interviews]
pairs_with:
  prompts: [run-brand-audit, plan-rebrand, build-brand-platform, measure-brand-awareness]
  personas: [brand-strategist, ux-researcher]
args:
  - name: brand
    description: The brand, what it sells, and why perception matters now (planned rebrand, falling sales, new market, merger).
    type: text
    required: true
  - name: questions
    description: What the team wants to learn, for example "why do people pick competitors", "does our name feel dated", "what do we stand for in customers' minds".
    type: text
    required: true
  - name: segments
    description: Who to interview, such as loyal customers, lapsed customers, prospects who chose a competitor, staff, partners. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Objectives, Sample and recruitment, Interview structure, Questions, Projective exercises, Consent and recording, Analysis plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Brand perception interviews tell you what a brand means in people's heads and why, which surveys cannot. They go wrong when the interviewer shows the logo and asks "do you like it?" in the first minute, when questions lead ("would you say we're innovative?"), when only happy customers are interviewed, and when nobody plans how to analyse 15 hours of recordings. Good guides go from broad to specific: the category and the person's life first, then unaided recall of brands, then associations with this brand, then prompted material. Projective techniques (if the brand were a person, a party guest, a car; sorting images) help people express feelings they cannot name directly. Five to eight interviews per segment usually reveal the main themes.
</context>

<task>
Write an interview guide for brand perception research.

<brand>
{{brand}}
</brand>

<research_questions>
{{questions}}
</research_questions>
{{#segments}}

<segments>
{{segments}}
</segments>
{{/segments}}

If no segments are given, propose them, always including people who chose a competitor or stopped buying.

1. **Objectives.** Turn the team's questions into three to five research objectives, and say what this research cannot answer (how many people think something; that needs a survey).
2. **Sample and recruitment.** Segments, number per segment, screening criteria, how to recruit (customer lists, panels, social), incentives to consider, and avoiding only friendly customers.
3. **Interview structure.** A 45 to 60 minute flow with timings: warm-up about the person and category, unaided recall, brand associations, experiences and moments, competitors, prompted stimulus (logo, ads, website) at the end, and close.
4. **Questions.** Main questions and follow-up probes for each block, open and neutral; mark questions that map to each objective; include a few "tell me about the last time..." questions for concrete stories.
5. **Projective exercises.** Two or three exercises with instructions and what they reveal, such as brand as a person, obituary of the brand, image sorting, or completing sentences.
6. **Consent and recording.** Information to give participants, consent for recording and quotes, anonymisation, data storage and deletion, and following the data-protection rules that apply in the user's country.
7. **Analysis plan.** How to note and code interviews, a theme matrix by segment, how to choose quotes, signs of saturation, and the short report structure to share with the team.
</task>

<constraints>
- Questions must be neutral; rewrite any leading question in the team's input and say why.
- Do not invent findings or participant quotes; the guide prepares research, it does not report it.
- Keep personal data collection to what the research needs.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. Interview structure as a table (Block, Minutes, Purpose). Questions grouped by block as a numbered list with probes indented. Analysis as a theme matrix template (Theme, Segment, Evidence, Quote).
</output_format>
