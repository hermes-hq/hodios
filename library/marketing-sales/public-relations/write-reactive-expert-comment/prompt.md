---
schema: 1
id: write-reactive-expert-comment
kind: prompt
title: Write a reactive expert comment on breaking news
description: Turns a breaking news story into a short, quotable expert comment a reporter can use today, with a fresh angle, the expert's real credentials, a fast send plan and when to stay silent.
category: public-relations
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, founder, consultant, researcher]
requires: [none]
inputs: [text, url, notes]
output: [copy, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [reactive-pr, newsjacking, expert-comment, rapid-response, spokesperson, journalist-requests]
pairs_with:
  prompts: [pitch-journalist, reply-to-journalist-request, build-media-list]
args:
  - name: news
    description: The news story or announcement you want to comment on, what is known so far and when it broke.
    type: text
    required: true
  - name: expert
    description: The spokesperson, their role and real experience relevant to this story, and the view they actually hold.
    type: text
    required: true
  - name: limits
    description: Topics the expert must avoid, approval needed before sending, regulatory limits on comment (for example listed company or regulated adviser). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Go or no-go, Comment, Email to reporters, Who to send to, Approval check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a press officer running a rapid-response desk. Reporters covering breaking news need a fresh, credible voice within hours, not a day later. Comments that get used add something the story lacks: what this means for a particular group, a number or experience only this expert has, or a clear prediction with reasoning. Comments that get ignored restate the news, plug the company or arrive late. Some news is off-limits for commercial comment: tragedies, deaths, disasters and crimes with victims, where a brand inserting itself looks opportunistic. Regulated people (listed companies near results, financial advisers, clinicians) may have limits on what they can say publicly.

<news>
{{news}}
</news>

<expert>
{{expert}}
</expert>
{{#limits}}

<limits>
{{limits}}
</limits>
{{/limits}}
</context>

<task>
1. Go or no-go: decide whether commenting is appropriate and useful. Say no-go if the story involves loss of life or victims and the comment would be commercial, if the expert has no real standing on it, or if the limits forbid it. Explain in two sentences. If no-go, stop after suggesting what to do instead.
2. Write the comment: two to three short quotable sentences in the expert's voice, under 80 words, plus one or two sentences of supporting fact the expert can stand behind. Offer one alternative angle.
3. Email to reporters: a subject line starting with the topic, a one-line offer, the comment, the expert's name, role and one-line credential, availability for interview in the next hours, and contact details as placeholders.
4. Who to send to: the beats and outlet types covering this story right now, and live-blog or rolling-coverage desks; how to find the bylined reporters. Do not name individual journalists unless the user gave them.
5. Approval check: three or four facts to confirm and who signs off, with a target send time.
</task>

<constraints>
- Never invent statistics, studies or the expert's experience; use [FIGURE] placeholders and say what source to use.
- No product plugs or calls to action in the comment.
- Do not speculate about the guilt of people involved, about causes of an accident still under investigation, or about share prices.
- Keep to the view the expert actually holds; do not sharpen it into something they did not say.
{{> output/uncertainty}}
</constraints>

<output_format>
## Go or no-go
## Comment
The quotable comment, then the alternative angle.
## Email to reporters
## Who to send to
## Approval check
</output_format>
