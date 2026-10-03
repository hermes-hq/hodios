---
schema: 1
id: plan-persuasive-argument
kind: prompt
title: Plan a persuasive argument
description: Plans how to persuade a specific person or group, mapping their interests and objections, the framing and evidence that will land with them, a precise ask and a fallback.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, individual, founder, product-manager]
requires: [none]
inputs: [text]
output: [plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [persuasion, stakeholder-buy-in, objection-handling, framing, influence]
pairs_with:
  prompts: [prepare-for-tough-questions, write-decision-memo, prepare-difficult-conversation]
args:
  - name: what_you_want
    description: The outcome you want, as concretely as you can, for example "approve a 4-day remote trial for my team from March" or "my parents agree to a gap year".
    type: text
    required: true
  - name: audience_profile
    description: Who decides and who influences them, what they care about, how they decide (data, stories, precedent, trust), past positions on this, and the pressures they are under.
    type: text
    required: true
  - name: evidence
    description: "Optional: the facts, numbers, examples, precedents and testimonials you actually have."
    type: text
output_contract:
  format: markdown
  sections: [The ask, Their side, Framing, Evidence, Objections, Fallback, Plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most failed persuasion argues from the persuader's reasons. People are moved by how a proposal serves their own interests, reduces risks they worry about, fits values they hold and comes from someone they trust. Effective preparation starts from the audience: what they gain and lose, the objection they will raise first and the unspoken one beneath it, which evidence they find credible, and what a small, low-risk "yes" would look like. A precise ask beats a vague one, and a prepared fallback (a pilot, a smaller step, a next meeting) keeps a "no" from being final.
</context>

<task>
Plan how to persuade this audience.

<what_you_want>
{{what_you_want}}
</what_you_want>
<audience_profile>
{{audience_profile}}
</audience_profile>
{{#evidence}}
<evidence>
{{evidence}}
</evidence>
{{/evidence}}

1. If it is unclear who actually decides, or what the outcome is, ask up to three questions and stop.
2. Sharpen the ask: one sentence the decision-maker can say yes to, with scope, timing and what it costs them.
3. Map their side: what they gain, what they risk or lose (status, money, time, control, face), their likely objections, and the objection they may not say out loud. Note who else influences them.
4. Choose the framing: which of their interests or values to lead with, the comparison point (cost of doing nothing, a precedent, a competitor), and words to use or avoid for this audience.
5. Rank the evidence by how credible it is to this audience, not to me. Say which piece to lead with, which to hold back for questions, and what is missing (marked `[NEEDED: …]`), with how to get it.
6. Prepare for objections: for each likely objection, a short honest response, and which ones to raise first myself.
7. Fallback: one or two smaller asks if the answer is no (a trial, a limited version, a review date, an agreement on criteria).
8. Plan the conversation: setting, timing, sequence (who to talk to first, pre-wiring influencers), and the opening two sentences.
</task>

<constraints>
- Persuade honestly. No manipulation, false urgency, fabricated scarcity, misrepresented evidence or exploiting someone's vulnerability. If the plan only works by misleading them, say so.
- Use only evidence I supplied. Do not invent numbers, studies, quotes or precedents; name the kind of evidence that would help instead.
- If my ask looks genuinely against the audience's interest, or the evidence is too weak to support it, say so plainly and suggest a version that is in both interests or a way to test it.
- Be concrete to this audience; no generic persuasion theory.
- Keep it to a page or so of plan the reader can act on.
</constraints>

<output_format>
## The ask
One sentence, then one line on why this size of ask.
## Their side
A table: Interest or worry | What they gain or risk | How the ask addresses it.
## Framing
Lead with, comparison point, words to use, words to avoid.
## Evidence
Ranked list: evidence, why it lands with them, lead or hold back. Then gaps marked `[NEEDED: …]`.
## Objections
A table: Objection | Response | Raise it first? (yes/no).
## Fallback
One or two smaller asks.
## Plan
Who to talk to and in what order, the setting, and the opening two sentences word for word.
</output_format>
