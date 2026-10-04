---
schema: 1
id: plan-audience-interviews
kind: prompt
title: Plan audience interviews
description: Plans five to ten short interviews with real readers, viewers or listeners, with recruiting, a 20-minute script about their lives, note-taking and a synthesis grid that leads to content decisions.
category: content-strategy
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [content-creator, writer, founder, marketer]
requires: [none]
inputs: [text]
output: [plan, script, questions, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [audience-research, customer-interviews, interview-script, synthesis, listening]
pairs_with:
  prompts: [mine-audience-questions, define-content-pillars, analyze-content-performance]
  personas: [content-strategist]
args:
  - name: audience_description
    description: Who you think your audience is, how many you reach and where (email list, followers, listeners), and anything you already know about them.
    type: text
    required: true
  - name: decision_to_inform
    description: The content decision these interviews should help you make, for example "whether to start a paid tier", "which of three series to make next", "why people stop opening".
    type: text
    required: true
  - name: channel
    description: Where you will recruit and how you will talk, for example "newsletter, video calls", "Instagram DMs, voice notes", "shop customers in person".
    type: string
    default: video or phone calls
output_contract:
  format: markdown
  sections: [What we want to learn, Who to talk to, Recruiting, Interview script, Notes template, Synthesis grid, From findings to decisions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a creator, newsletter writer or small business talk to five to ten real people in their audience before making a content decision. Most creator "research" fails in three ways: they only hear from superfans who reply to everything, they ask people what content they want (people guess, are polite, and describe what they already get), and they end with a pile of nice quotes but no decision. Good interviews ask about the person's life, their recent concrete behaviour and the problem the content touches, and save the creator's own ideas for the last few minutes, if at all. Five to eight conversations usually surface the main patterns for one narrow question; more is worth it only when the audience splits into clearly different groups.

Recruiting and talking through: {{channel}}
</context>

<task>
<audience>
{{audience_description}}
</audience>

<decision>
{{decision_to_inform}}
</decision>

1. Turn the decision into three to five learning goals: what you need to know about their lives, habits and problems (not opinions of your content) to make it.
2. Who to talk to: a mix across at least two of: new versus long-time, engaged versus quiet or lapsed, and the segments that matter to the decision. Say how many of each and why superfans should be no more than a third.
3. Recruiting: a short invite message for the channel (purpose, 20 minutes, no selling, what they get as thanks), how to pick people so it is not only the loudest replies, scheduling, and consent to take notes or record.
4. Interview script for 20 minutes: warm-up (2 min), their life and context (5), the last time they had the problem or did the behaviour, told as a story (8), where they get help or information today and what frustrates them (3), and only then optional reactions to your idea (2). Include follow-up probes ("Tell me about the last time...", "What happened next?", "What did you try?"), and five leading or hypothetical questions to avoid, each with a better version.
5. Notes template to fill within an hour of each call: quotes in their words, behaviours observed, surprises.
6. Synthesis grid: themes as rows, people as columns, then a count; a theme seen in fewer than three people is a hunch, not a pattern.
7. From findings to decisions: for each likely outcome, what you would do with the content (start, change, stop) so the interviews cannot end in "interesting".
</task>

<constraints>
- No leading questions, no "would you" hypotheticals as evidence, no asking what content they want as the main question.
- Never invent audience facts or quotes; the example answers in the script are placeholders.
- If the decision is vague ("learn about my audience"), propose two or three sharper decisions and ask which one to use before planning.
- Keep personal data minimal: what to store, where, and to delete recordings after synthesis unless consent says otherwise.
- Do not recommend paying amounts that would bias who answers; a small equal thank-you for everyone is fine.
</constraints>

<output_format>
## What we want to learn
Three to five bullets, each tied to the decision.

## Who to talk to
Table: segment | how many | why | where to find them.

## Recruiting
The invite message (under 90 words), then selection and scheduling bullets.

## Interview script
Timed sections with numbered questions and probes, then "Avoid these" as a two-column table: leading question | better question.

## Notes template
A short fill-in template.

## Synthesis grid
An empty grid with example theme rows, and the counting rule.

## From findings to decisions
Table: if we hear... | we will...
</output_format>
