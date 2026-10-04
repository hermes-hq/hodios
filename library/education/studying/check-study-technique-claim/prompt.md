---
schema: 1
id: check-study-technique-claim
kind: prompt
title: Check a study technique claim
description: Weighs a claim about a study method (learning styles, highlighting, brain training, music while studying) against learning-science evidence, rates its support and says what to do instead.
category: studying
version: 1.0.0
status: incubating
stage: [learn]
role: [student, parent, teacher]
subject: [psychology]
requires: [none]
inputs: [text, url]
output: [explanation, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [learning-science, evidence-check, study-myths, learning-styles]
pairs_with:
  prompts: [run-feynman-check]
args:
  - name: claim
    description: The claim, in the words you heard it ("you're a visual learner so use diagrams", "highlighting helps memory", "this app raises IQ"), and where it came from (teacher, advert, video, article).
    type: text
    required: true
  - name: learner
    description: Optional. Who it is for (age, subject, exam) so the advice on what to do instead fits.
    type: string
output_contract:
  format: markdown
  sections: [The claim, Verdict, What the evidence says, Where it might still help, What to do instead, How to check further]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Someone has heard a claim about how to study and wants to know if it holds up. Popular study advice mixes well-supported techniques (practice testing, spacing) with weak or disproven ones (matching teaching to "learning styles", rereading and highlighting as main strategies, commercial brain training to raise general intelligence). Answers go wrong in three ways: debunking too broadly (diagrams are useful for everyone even though "visual learners" are not a real category), overstating lab results as classroom proof, and citing studies that do not exist. Large reviews such as Dunlosky and colleagues' 2013 review of ten learning techniques and Pashler and colleagues' 2008 review of learning styles are good anchors, but name a source only when you are confident it exists and says what you say.
</context>

<task>
<claim>
{{claim}}
</claim>
{{#learner}}Learner: {{learner}}{{/learner}}

1. Restate the claim in a precise, testable form, and separate it from nearby claims that may be true (for example "people prefer certain formats" is true; "teaching to that preference improves learning" is the testable claim).
2. Rate the evidence on this scale: Strong (consistent across many studies and settings), Moderate (good evidence with limits), Mixed (studies disagree), Weak (little or poor evidence), Contradicted (well-tested and not supported), Untested.
3. Explain what the evidence shows in plain words: the kind of studies (lab, classroom, meta-analysis), how large the effects are when known, and the limits (age groups, subjects, short tests vs long-term retention, near vs far transfer). Say who is selling or promoting the claim if that matters.
4. Say where the claim might still help, if anywhere (for example music without lyrics may help mood for a dull task even if it does not improve memory).
5. Give two or three evidence-based alternatives fitted to the learner, with how to do each in a normal study session.
6. Give the person a way to check further: search terms, the kind of source to trust (systematic reviews, meta-analyses) and red flags (brain scans as proof, testimonials, a single small study).
</task>

<constraints>
- Name studies or reviews only when you are confident they exist and say what you attribute to them; otherwise describe the evidence generally ("several reviews have found...") and say you cannot cite a specific source.
- Do not invent effect sizes, sample sizes or percentages.
- Separate what is well established from your own inference.
- Respectful toward whoever made the claim; many teachers were trained in it.
- If the claim concerns a medical product, medication or supplement for focus or memory, say it is outside study advice and suggest asking a doctor or pharmacist.
{{> output/uncertainty}}
</constraints>

<output_format>
## The claim
The precise, testable version in one or two sentences.

## Verdict
The rating in bold, then one sentence.

## What the evidence says
Four to six bullets.

## Where it might still help
One to three bullets, or "Nowhere that the evidence supports".

## What to do instead
Two or three techniques, each with a "how to do it" line.

## How to check further
Search terms, trusted source types, red flags.
</output_format>
