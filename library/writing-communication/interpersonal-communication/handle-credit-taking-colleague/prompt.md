---
schema: 1
id: handle-credit-taking-colleague
kind: prompt
title: Handle a colleague who takes credit
description: Plans a response when a colleague takes credit for someone's work, from preventive visibility habits to a direct conversation and when to involve a manager, with exact phrasing.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, software-engineer, designer, manager]
requires: [none]
inputs: [text]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [credit-stealing, workplace-politics, visibility, office-conflict, career-advocacy]
pairs_with:
  prompts: [give-feedback-sbi, give-upward-feedback, prepare-difficult-conversation, write-weekly-update-to-manager]
  personas: [communication-coach]
args:
  - name: situation
    description: What happened, when, who saw it, whether it has happened before, and what you have done so far.
    type: text
    required: true
  - name: relationship
    description: The colleague's level relative to you.
    type: enum
    enum: [peer, senior, junior]
    default: peer
  - name: evidence
    description: Optional, what shows the work was yours, such as drafts, commits, emails, file history or who was in the meetings.
    type: text
output_contract:
  format: markdown
  sections: [Read of the situation, Prevent, In the moment, The direct conversation, Involving your manager, Don't]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Credit-taking ranges from careless ("I" when it should have been "we") to deliberate and repeated. The response should match: most cases are solved by making your contribution visible as it happens and by a calm, factual private conversation, not by a public challenge. Escalating to a manager makes sense when it repeats after a direct conversation, when it affects reviews, pay or promotion, or when the colleague is senior enough that a direct conversation is risky; even then, the framing that works is "I want my manager to see my contribution accurately", not "they are a thief". Public accusations, reply-all emails and retaliation usually cost the person who was wronged more than the one who took credit.
</context>

<task>
Help me handle a {{relationship}} colleague who took credit for my work.

<situation>
{{situation}}
</situation>
{{#evidence}}
<evidence>
{{evidence}}
</evidence>
{{/evidence}}

1. Read the situation fairly: how clear the credit-taking is (careless wording, ambiguous shared work, or clear misattribution), whether it is a pattern, who was affected (my manager, leadership, a client), and what is at stake for me. If the work was genuinely shared or the evidence is thin, say so and lean towards prevention and a light clarifying conversation rather than confrontation.
2. Prevent: four or five visibility habits that suit my situation, such as short written updates to my manager, sharing work in team channels with my name on it, agreeing roles and presenters before a joint piece of work, and presenting my own work where possible.
3. In the moment: three calm lines I can use when it happens again in a meeting or email, which add my contribution without accusing anyone ("Glad that landed. I can take questions on the model, since I built it.").
4. The direct conversation: unless the relationship makes it unsafe for my career, script a private conversation: a neutral opener, the specific instance described factually, the impact, the request for the future (for example naming contributors in updates, agreeing who presents), and replies to likely pushback ("it was a team effort", "I didn't mean anything by it", "you're being petty").
5. Adapt to the relationship:
   - peer: a direct conversation first;
   - senior: lead with visibility to my own manager and a lighter, curious conversation; avoid confrontation;
   - junior: treat it as coaching about attribution, while still making my contribution visible.
6. Involving my manager: when it is justified, and a script focused on accurate visibility of my work and the facts, bringing evidence, not on the colleague's character. Mention HR only if the credit-taking is part of discrimination, harassment or retaliation.
7. Don't: what to avoid and why.
</task>

<constraints>
- Phrasing must be calm, specific and factual. No sarcasm, no public call-outs, no accusations about motive.
- Use only the facts I gave; mark anything I should check with `[check: …]`.
- Keep scripts short enough to say naturally.
- Do not promise outcomes; workplace politics vary.
</constraints>

<output_format>
## Read of the situation
Three or four lines, including how clear-cut it is and the recommended level of response.
## Prevent
Four or five bullets.
## In the moment
Three lines in quote blocks.
## The direct conversation
Opener, the facts, the impact, the request, and pushback replies, as short quoted lines.
## Involving your manager
When, and a short script.
## Don't
Three or four bullets.
</output_format>
