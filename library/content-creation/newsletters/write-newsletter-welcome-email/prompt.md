---
schema: 1
id: write-newsletter-welcome-email
kind: prompt
title: Write a newsletter welcome email
description: Writes a newsletter welcome email that confirms the promise, sets expectations, surfaces the best past issues and starts a reply conversation. Use on Substack, beehiiv, Ghost or similar.
category: newsletters
version: 1.0.0
status: incubating
stage: [build]
role: [writer, content-creator, marketer]
inputs: [text, notes]
output: [message, copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [welcome-email, subscriber-onboarding, reply-prompt, deliverability]
pairs_with:
  prompts: [plan-newsletter-format, grow-newsletter, write-newsletter-issue]
args:
  - name: newsletter
    description: The newsletter's name, what it covers, who it is for, how often and on which day it is sent, and anything new subscribers should know (paid tier, community, archive).
    type: text
    required: true
  - name: best_issues
    description: Three to five past issues worth reading first, with titles, links and a line on why each is good. Leave empty if the newsletter is new.
    type: text
  - name: author_voice
    description: A paragraph from a past issue, or a description of how you write.
    type: text
output_contract:
  format: markdown
  sections: [Subject lines, Preview text, Email, Setup notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write welcome emails for newsletters. The welcome email is usually the most-read email a newsletter sends, because it arrives when interest is highest. It has four jobs: confirm the subscriber made a good choice by restating the promise; set expectations (what arrives, when, how often, how long it takes to read); give them something good to read right now; and start a two-way relationship. Asking for a reply does double duty: it tells the writer who the readers are, and replies help mail providers treat future issues as wanted mail rather than promotions or spam.
</context>

<task>
<newsletter>
{{newsletter}}
</newsletter>

<best_issues>
{{best_issues}}
</best_issues>

<author_voice>
{{author_voice}}
</author_voice>

1. Write three subject line options: warm, specific to the newsletter, and clearly a welcome (not a sales pitch).
2. Write preview text that complements the subject line rather than repeating it.
3. Write the email, in the author's voice, in this order:
   - A short, personal welcome and the newsletter's promise in one or two sentences.
   - Expectations: what each issue contains, the send day and frequency, typical reading time, and anything else they get (archive, community, paid tier) in one line each.
   - "Start here": the best past issues, each with its title as a link and one line on why to read it. If none were given, offer one useful thing instead (the most useful idea of the newsletter in a few sentences, or what the first issue will cover) and do not invent issue titles.
   - One reply prompt: a single specific question that is easy to answer and useful to the writer (for example what they hope to get, or their biggest challenge with the topic).
   - A short line on making sure issues arrive (moving it to the main inbox or adding the sender to contacts), without technical jargon.
   - A sign-off in the author's voice.
4. Add setup notes: where to paste it on the platform, a reminder to set a fallback for any first-name merge tag, and to send a test to more than one email provider.
</task>

<constraints>
- Keep the email under about 250 words. It should read like a note from a person, not a brochure.
- One reply question only, and no other calls to action except the start-here links.
- Never invent past issue titles, links, subscriber counts or testimonials. Use `[LINK]` or `[ISSUE TITLE]` placeholders if something is missing.
- Use a generic placeholder such as `[FIRST_NAME]` for personalisation rather than a platform-specific merge tag, unless the user named the platform's syntax.
- If no voice sample is given, write plainly and warmly in the first person, and say so in the setup notes.
</constraints>

<output_format>
## Subject lines
Three numbered options.

## Preview text
One line.

## Email
Ready to paste, with Markdown links.

## Setup notes
A short checklist, including any placeholders to fill.
</output_format>
