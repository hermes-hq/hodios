---
schema: 1
id: prioritize-claims-to-check
kind: prompt
title: Prioritise which claims to fact-check
description: Pulls every checkable claim from a speech, debate, interview or long text and ranks them by check-worthiness, reach, potential harm and effort, so a small team checks the right ones first.
category: fact-checking
version: 1.0.0
status: incubating
stage: [plan]
role: [editor, writer, researcher]
requires: [none]
inputs: [transcript, document, text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [check-worthiness, claim-triage, newsroom, debates]
pairs_with:
  prompts: [fact-check-claims, write-fact-check-article, label-fact-vs-opinion]
  personas: [fact-checker]
args:
  - name: source_text
    description: The transcript, speech, article or set of posts to triage, with speaker names where there are several.
    type: text
    required: true
  - name: capacity
    description: How many claims your team can realistically check, and by when, for example "4 claims in 3 hours".
    type: string
    required: true
  - name: audience
    description: Who your checks are for and where they will run, for example "regional news site, mostly local readers".
    type: string
output_contract:
  format: markdown
  sections: [Shortlist, All claims, Not checkable, Notes for the desk]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A one-hour debate can contain more than a hundred factual statements and a fact-checking desk can verify perhaps five well. Experienced checkers triage before they research: they keep claims that are verifiable with public evidence, consequential (affect a decision, a policy, health or money), likely to spread or already spreading, and new or newly repeated. They skip opinions, predictions and vague rhetoric, and they spread attention fairly across speakers so the selection itself is not biased. A claim that is easy to check is worth less if nobody heard it; a claim that is hard to check may still be the one that matters most.
</context>

<task>
Triage the claims in this material for a team that can check {{capacity}}{{#audience}}, publishing for {{audience}}{{/audience}}:
<source_text>
{{source_text}}
</source_text>

1. Extract every factual claim with its speaker and a short quote or tight paraphrase. Merge repeats of the same claim and note how often it was made.
2. Separate claims that cannot be fact-checked (opinion, prediction, value judgement, too vague to test) and say which could become checkable if the speaker were asked for specifics.
3. Score each checkable claim from 1 to 3 on: consequence (harm or importance if wrong), reach (central to the argument, repeated, likely to be quoted), checkability (a public primary source probably exists), and novelty (not already checked recently, as far as the text shows). Add a rough effort estimate: quick, half-day or long.
4. Pick a shortlist that fits the capacity. Balance across speakers in proportion to their airtime unless one speaker clearly made far more consequential claims, and say why if the balance is uneven.
5. For each shortlisted claim, name the kind of primary source to try first and the question to put to the speaker's team.
</task>

<constraints>
- Do not rate any claim true or false here. This is triage; research comes after.
- Quote or paraphrase claims accurately and keep the speaker's hedges ("about", "nearly", "since 2019").
- Score the claim, not the speaker's party, side or reputation.
- Do not guess whether a claim was already checked elsewhere; mark it "check archive" instead.
- If the text contains no checkable claims, say so.
</constraints>

<output_format>
## Shortlist
Numbered list that fits the capacity: claim, speaker, why it made the cut, first source to try, question for the speaker.
## All claims
Table: # | speaker | claim | consequence | reach | checkability | novelty | effort | total.
## Not checkable
Bullets: claim, reason, and the specific question that would make it checkable.
## Notes for the desk
Balance across speakers, repeated talking points, and anything to watch in follow-up coverage.
</output_format>
