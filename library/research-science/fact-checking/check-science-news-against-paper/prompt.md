---
schema: 1
id: check-science-news-against-paper
kind: prompt
title: Check a science news story against the paper
description: Checks a news story about a study against the paper itself, covering design, sample, effect size, causal language and what the headline overstates, and suggests an accurate headline.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [writer, editor, researcher, student]
requires: [none]
inputs: [text, document]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [science-journalism, spin, relative-risk, causal-language, anti-hype]
pairs_with:
  prompts: [fact-check-claims, check-statistics-in-article, read-paper-with-me, explain-research-to-public]
  personas: [fact-checker, science-communicator]
args:
  - name: news_text
    description: The news article, press release or post about the study, including the headline.
    type: text
    required: true
  - name: paper_text_or_abstract
    description: The study itself - full text if possible, at least the abstract, methods and results. Say which you are pasting.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Claim by claim, What the study actually shows, An accurate headline, What could not be checked]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Exaggeration in science news usually enters through a few predictable doors, often already in the press release: correlation reported as causation, animal or cell findings reported as if they applied to people, relative risks without the absolute risk, a surrogate marker reported as a health outcome, a small or unrepresentative sample generalised to everyone, a preprint presented as settled, statistical significance presented as importance, and advice the study never tested. A useful check puts each sentence of the story next to what the paper actually reports, and is just as clear when the story is accurate.
</context>

<task>
Compare the story with the study.
<news>
{{news_text}}
</news>
<paper>
{{paper_text_or_abstract}}
</paper>

1. Extract the study's facts from the paper: question, design (randomised trial, cohort, case-control, cross-sectional, qualitative, modelling, animal, in vitro), population and sample size, setting, exposure or intervention and comparison, outcomes (and whether they are surrogate or clinical), main results with effect sizes, absolute numbers where available, and uncertainty, the authors' own stated limitations, funding and conflicts of interest, and publication status (peer-reviewed or preprint).
2. Extract every claim in the news text, including the headline, the first paragraph, quotes and any advice to readers.
3. For each claim, find what the paper says and rate it: Accurate; Overstated (direction right, strength or scope inflated); Missing context (true but misleading without a key fact); Wrong (contradicts the paper); Not in the paper (from elsewhere, such as an interview or another study).
4. Check the common distortions explicitly: causal language for an observational design, animal-to-human extrapolation, relative versus absolute risk, surrogate outcomes, generalisation beyond the sample, preprint status, and quotes from independent experts versus the authors only.
5. Explain in plain words what the study shows and does not show.
6. Write an accurate headline of similar length.
</task>

<constraints>
- Base every rating on the paper text supplied. If only the abstract is given, say which claims cannot be checked without the full text.
- Compute absolute risks only from numbers the paper gives, and show the calculation.
- Be fair in both directions: say clearly when a story is accurate, and do not accuse the journalist where the press release or the paper's own abstract overstated the result (note where the overstatement seems to start if the text shows it).
- Do not give personal health, diet or treatment advice; if readers might act on the story, say what a study of this type can and cannot justify and suggest talking to a qualified professional.
- Do not judge whether the study's conclusion is ultimately true; only whether the story reports it faithfully.
</constraints>

<output_format>
## Verdict
Two sentences: how faithful the story is overall and its biggest problem.
## Claim by claim
A table: news claim (quoted) | what the paper says | rating | note.
## What the study actually shows
Plain-language summary with design, sample, effect size and limitations.
## An accurate headline
One headline, plus the original for comparison.
## What could not be checked
Items that need the full text, supplementary material or other sources.
</output_format>
