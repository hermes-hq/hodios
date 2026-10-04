---
schema: 1
id: apply-moderation-policy-to-comments
kind: prompt
title: Apply a moderation policy to comments
description: Applies a page's own community guidelines to a batch of comments and returns one decision per comment with the rule cited and a reason. Use for consistent, defensible moderation.
category: social-media
version: 1.0.0
status: incubating
stage: [operate]
role: [content-creator, marketer, support-agent]
requires: [none]
inputs: [text, document]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [content-moderation, community-guidelines, comment-triage, escalation, trust-and-safety]
pairs_with:
  prompts: [write-community-guidelines, reply-to-comments, handle-social-media-backlash]
  personas: [community-manager]
args:
  - name: guidelines
    description: The page's own community guidelines or house rules, ideally numbered, plus any sanction ladder (warning, hide, ban) the page uses.
    type: text
    required: true
  - name: comments
    description: The comments to review, one per line or block, numbered if possible, with the commenter's handle and any known history (previous warnings).
    type: text
    required: true
  - name: format
    description: Output as a readable table or as JSON for a spreadsheet or moderation tool.
    type: enum
    enum: [table, json]
    default: table
output_contract:
  format: markdown
  sections: [Needs a person now, Decisions, Policy gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A community manager, creator or volunteer page admin needs to apply their own published rules to a batch of comments the same way every time. Moderation loses trust in three ways: removing criticism because it stings (which looks like censorship), letting abuse stand because it is polite on the surface, and inconsistency between moderators or between friends and strangers. A defensible decision names the rule it rests on. Some comments are not moderation questions at all: threats, self-harm, doxxing and child-safety concerns need a person now, not a hide button.

Output format requested: {{format}}
</context>

<task>
<guidelines>
{{guidelines}}
</guidelines>

<comments>
{{comments}}
</comments>

1. Read the guidelines and number each rule (R1, R2...) if they are not numbered already. Note any sanction ladder; if there is none, never ban, and suggest a ladder under Policy gaps. If the comments are not numbered, number them in the order given and ignore pasted interface noise ("Like", "Reply", timestamps).
2. For each comment, decide whether it breaks a rule, judging the words in context, not the topic. Separate:
   - criticism, complaints, sarcasm about the organisation, disagreement and bad reviews: allowed unless they break a specific rule;
   - abuse aimed at a person, slurs, harassment, spam, scams, impersonation, personal data, off-topic flooding: as the rules say.
   - hyperbole and jokes ("I'll burn the place down lol"): judge whether a reasonable reader would take it as a real threat; if in doubt, escalate rather than ignore or ban.
3. Pick exactly one decision per comment: keep, reply (a question or fair complaint deserves an answer), hide, delete, ban, or escalate. Use the lightest action that fits the rule and the commenter's history; ban only when the rules or the ladder allow it.
4. Cite the rule (R-number) for any hide, delete or ban. If no rule covers a comment you think is harmful, choose escalate and record it under Policy gaps rather than inventing a rule.
5. Mark as escalate and list under Needs a person now: threats of violence, self-harm or suicide mentions, someone's private information posted, sexual content involving minors, credible legal threats, and press enquiries. Say what the person should do first (for self-harm: a private, caring message pointing to local emergency services or a crisis line; for threats or child safety: preserve evidence, report to the platform, and contact the police where there is danger). Do not draft public replies to these.
6. Give a one-line reason per decision in plain words a commenter could read without feeling mocked.
</task>

<constraints>
- Apply only the supplied guidelines. Do not import platform rules or your own preferences; if something seems to break platform terms but not the page's rules, say so under Policy gaps.
- Treat the same behaviour the same way regardless of who posts it or whether they agree with the page.
- If a comment is ambiguous (unclear sarcasm, a language you cannot read well, missing context), choose escalate with the reason "needs human judgement" instead of guessing.
- Never repeat personal data, slurs or threats in full in the output; refer to them ("contains a slur", "posts a phone number").
- For more than 40 comments, list every non-keep decision in full and give the keeps as one line of comment numbers, so the output stays usable.
- If the moderator says the material is upsetting them, acknowledge it briefly and suggest a break and someone to talk to; moderation of abuse takes a toll.
- If the guidelines or comments are missing, ask for them and stop.
</constraints>

<output_format>
## Needs a person now
Bullets: comment number, what it is, first action. "None" if empty.

## Decisions
If format is table: a table with columns # | decision | rule | reason | note for reply (only when the decision is reply).
If format is json: one fenced JSON array of objects with keys "id", "decision" (keep, reply, hide, delete, ban, escalate), "rule" (R-number or null), "reason", "reply_note" (string or null). No text inside the fence besides the JSON.

## Policy gaps
Bullets: situations the rules do not cover clearly, with a suggested rule wording to consider. "None" if empty.
</output_format>
