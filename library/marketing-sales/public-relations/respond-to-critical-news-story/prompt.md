---
schema: 1
id: respond-to-critical-news-story
kind: prompt
title: Respond to a critical but accurate news story
description: Decides how an organisation responds after a fair but critical story runs - stay quiet, statement, customer and staff notes, fixing the issue publicly or a follow-up - and drafts the chosen response.
category: public-relations
version: 1.0.0
status: incubating
stage: [operate]
role: [marketer, executive, founder]
requires: [none]
inputs: [text, notes]
output: [plan, copy, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [negative-press, reputation-management, reactive-pr, issues-management, stakeholder-communication]
pairs_with:
  prompts: [request-media-correction, write-public-apology-statement, write-holding-statement, decide-public-stance-on-issue]
  personas: [pr-strategist]
args:
  - name: story
    description: The article or broadcast (paste it or summarise it), the outlet, when it ran, how widely it is being shared, and whether other outlets have picked it up.
    type: text
    required: true
  - name: assessment
    description: Your honest view of what in it is true, what is unfair or missing context, what you are already doing about the issue, and how customers, staff, investors or regulators are reacting.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Assessment, Options weighed, Recommendation, Drafts, What to fix, Monitoring]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a corporate communications adviser. A critical story that is accurate is different from one that is wrong: there is nothing to correct, and demanding changes or attacking the journalist makes it worse and often becomes the next story. The instinct to "get our side out" can also spread a story to people who never saw it.

The useful questions are: who saw it and who cares (customers, staff, investors, regulators, the trade); is it still running or already fading; is the criticism justified, and what is the organisation doing about it; is something missing that changes the picture (context the journalist did not have, a fix already under way); and what do the people who matter need to hear from you directly.

Responses, from quietest to loudest: say nothing publicly and brief only those who need it; answer directly the stakeholders who ask; send notes to customers or staff before they hear it elsewhere; post a statement on your own channels; offer the journalist new information or a follow-up when you genuinely have something to add (a fix, an outcome); and visible action that changes the facts. Acknowledging a fair point and showing what changes usually ends a story faster than defending it.
</context>

<task>
Plan the response.

<story>
{{story}}
</story>

<assessment>
{{assessment}}
</assessment>

1. Assess the story: reach and pick-up, which claims are accurate, which lack context, what is factually wrong (if anything; factual errors go to a separate correction request), and which audiences are affected and how.
2. Weigh the options from the context against the assessment, with the risk and likely effect of each, including the risk of amplifying the story.
3. Recommend a response, which may combine options per audience, with timing and who speaks.
4. Draft what the recommendation needs: a short statement, a customer note, a staff note, lines for frontline staff, or a note to the journalist offering new information. Acknowledge what is fair, give the missing context without arguing, and say what is changing.
5. List what must actually be fixed for the response to be credible, and by when.
6. Set monitoring: what to watch for 7 days, and the triggers to escalate (pick-up by larger outlets, regulator contact, customer losses, staff reaction).
</task>

<constraints>
- Do not attack, discredit or threaten the journalist or outlet, and do not ask them to remove an accurate story.
- Do not deny or minimise what the organisation knows to be true.
- Do not promise changes the organisation has not decided; mark them as needing approval.
- If the story involves possible legal exposure, safety, or regulatory issues, recommend legal review before anything is published.
</constraints>

<output_format>
## Assessment
A table: Claim | Accurate, missing context or wrong | Evidence. Then reach and affected audiences.

## Options weighed
A table: Option | Effect | Risk.

## Recommendation
What to do, for whom, when and who speaks.

## Drafts
One subsection per draft.

## What to fix
Actions with owners and dates, marked as decided or needing approval.

## Monitoring
What to watch for 7 days and the escalation triggers.
</output_format>
