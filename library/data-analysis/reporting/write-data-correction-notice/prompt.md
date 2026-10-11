---
schema: 1
id: write-data-correction-notice
kind: prompt
title: Write a data correction notice
description: Writes the notice that tells readers a published figure, report or dashboard was wrong, with old and new numbers, the cause, what it changes and what was done to stop it recurring.
category: reporting
version: 1.0.0
status: incubating
stage: [operate]
role: [data-analyst, business-analyst, financial-analyst, manager]
inputs: [text, dataset]
output: [message, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [restatement, data-error, stakeholder-communication, trust]
pairs_with:
  prompts: [explain-metric-discrepancy, write-data-methodology-note, write-data-quality-checks]
args:
  - name: error
    description: "What was published (report, dashboard, figure), when and to whom, the wrong and corrected values for each affected number, and what caused the error as far as it is known."
    type: text
    required: true
  - name: impact
    description: Decisions, targets, bonuses, external filings or other reports known to have used the wrong figures. Optional.
    type: text
  - name: audience
    description: Who receives the notice (leadership, all report readers, a client, the public) and the channel.
    type: string
output_contract:
  format: markdown
  sections: [Notice, Corrected figures, Does the story change, Who needs a direct call, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A correction is where an analytics team earns or loses trust. Experienced analysts know what makes one work: it goes out fast, before readers find the error themselves; it states the old and new numbers side by side, not just "figures have been updated"; it says plainly whether the conclusion changes, because that is what readers really want to know; it explains the cause in one or two sentences without blaming a person or hiding behind jargon; and it names the fix that stops a repeat. Notices fail when they bury the correction under apologies, quietly overwrite the dashboard so earlier screenshots disagree with it, or are so vague that readers start doubting every number. People who acted on the wrong figure (a budget holder, a client, a regulator filing) need a direct conversation before the broadcast.

{{#audience}}Audience and channel: {{audience}}{{/audience}}
</context>

<task>
<error>
{{error}}
</error>
{{#impact}}

<impact>
{{impact}}
</impact>
{{/impact}}

1. List every affected figure with the published value, the corrected value, the absolute and relative difference, and the periods affected. Check that the corrected figures are consistent with each other (totals still add up, rates match their numerators and denominators).
2. Decide whether the story changes: does a trend reverse, does a target flip between met and missed, does a ranking change, does a recommendation no longer hold? Say so in plain words.
3. Describe the cause in one or two sentences a non-analyst understands, and the fix (already done and still to do). If the cause is not yet confirmed, say what is known and when the next update comes.
4. Identify the people who need to hear before the broadcast: anyone who made a decision, external commitment or payout on the wrong figure.
5. Draft the notice: subject line, the correction first, then the table, whether the conclusion changes, cause, fix, and where the corrected version lives. Mark the corrected report version and date so old copies can be told apart.
</task>

<constraints>
- Use only the figures supplied; never estimate a corrected value that was not given, and flag any corrected figure that does not reconcile.
- Lead with the correction, not the apology; one sentence of apology is enough.
- Do not name or blame individuals; describe the process gap.
- Do not soften a material change ("minor adjustment") when a conclusion, target or payout changes.
- If the error touches external filings, contracts, pay or regulated reporting, say who must review the notice before it goes out (finance, legal or the owner of that filing) rather than advising on the obligation itself.
{{> output/uncertainty}}
</constraints>

<output_format>
## Notice
Subject line and the message, ready to send, under about 200 words.

## Corrected figures
Table: Figure | Period | Published | Corrected | Difference | Difference %.

## Does the story change
Two to four sentences.

## Who needs a direct call
Bullets: person or group, why, what to tell them first. Or "None identified".

## Open questions
Bullets: what is still unconfirmed and when it will be known.
</output_format>
