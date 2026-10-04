---
schema: 1
id: compare-religious-perspectives
kind: prompt
title: Compare religious perspectives on a question
description: Compares how several religious and secular traditions approach one big question, such as suffering, the afterlife or forgiveness, fairly and in each tradition's own terms, without a verdict.
category: spirituality
version: 1.0.0
status: incubating
stage: [learn]
role: [student, individual]
subject: [philosophy]
requires: [none]
inputs: [topic]
output: [explanation, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [comparative-religion, big-questions, world-religions, humanism, ethics]
pairs_with:
  prompts: [explain-religious-tradition, explore-faith-questions]
args:
  - name: question
    description: The question to compare, for example "Why is there suffering?", "What happens after death?", "Must I forgive someone who has not apologised?".
    type: string
    required: true
  - name: traditions
    description: Which traditions to include, comma-separated, for example "Catholicism, Shia Islam, Advaita Vedanta, Zen". Leave as major-world-traditions for a balanced default set.
    type: text
    default: major-world-traditions
  - name: include_secular
    description: Whether to include secular and humanist views alongside the religious ones.
    type: boolean
    default: true
output_contract:
  format: markdown
  sections: [The question, At a glance, Tradition by tradition, Where they meet and part, Read further]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You teach comparative religion and philosophy of religion. Good comparison starts from each tradition's own questions, because traditions often do not ask the same question in the same way: "the afterlife" means resurrection in one, rebirth driven by karma in another and liberation from rebirth in a third. Bad comparison forces everything into one tradition's categories, quotes the most extreme voice as typical, or ends with an implied winner.

Question: {{question}}
Traditions: {{traditions}}
Include secular and humanist views: {{include_secular}}
</context>

<task>
1. If the question is not a comparative question about meaning, ethics or belief (for example a request to prove one religion right), say what you can compare instead and stop.
2. Choose the traditions. If "{{traditions}}" is "major-world-traditions", use five to seven that cover Abrahamic, Indic and East Asian families, plus secular humanism if include_secular is true. Otherwise use exactly the listed ones and add secular humanism only if include_secular is true.
3. Restate the question in neutral terms, and note where a tradition would reframe it (for example a tradition that treats the self as not ultimately real reframes "what happens to me").
4. For each tradition, give its answer in its own key terms with a plain gloss, the main source or school the view comes from, and one point of internal disagreement.
5. Identify real convergences and real differences. Do not invent harmony where traditions disagree.
6. Check before output: every view is attributed to a school, text or community; no tradition is described in another's vocabulary without saying so; there is no conclusion about which answer is right; each tradition gets roughly equal care.
</task>

<constraints>
- No verdict and no ranking, explicit or implied. End on the comparison, not on a recommendation.
- Attribute views ("In Theravada teaching…", "Many Reform rabbis…", "Humanists generally…"). Mark minority views as minority.
- Do not invent quotations. Cite a text or thinker only when you are confident of the reference; otherwise describe the idea without a citation.
- Secular views are presented with the same respect and specificity as religious ones; secular does not mean "the neutral default".
- If you are unsure of a tradition's position, say so instead of filling the gap.
</constraints>

<output_format>
## The question
Two or three sentences restating it neutrally and noting reframings.

## At a glance
Table: Tradition | Short answer in its own terms | Key concept (glossed) | Main source or school.

## Tradition by tradition
A short subsection per tradition: the view, where it comes from, and one internal debate.

## Where they meet and part
Bullets: convergences, then real differences.

## Read further
Kinds of source per tradition (a primary text, an introductory scholar's book, a community's own explanation), named only when confident.
</output_format>
