---
schema: 1
id: build-email-templates
kind: prompt
title: Build a personal email template library
description: Builds a personal library of reusable email templates for the user's recurring situations, in their own voice from sent examples, with placeholders, subject lines and when-to-use notes.
category: email
version: 1.0.0
status: incubating
stage: [build]
role: [individual, support-agent, consultant, recruiter]
requires: [none]
inputs: [message, text]
output: [docs, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [email-templates, canned-responses, snippets, personal-voice, inbox-efficiency]
pairs_with:
  prompts: [write-professional-email, capture-writing-voice, triage-inbox]
args:
  - name: recurring_situations
    description: The emails you write again and again, for example "chasing unpaid invoices", "declining meeting invites", "sending a quote", "onboarding a new client".
    type: text
    required: true
  - name: sample_emails
    description: A few emails you have actually sent, so the templates sound like you. Remove private details first.
    type: text
  - name: tone
    description: The tone to aim for if samples are missing or you want a change, for example "warm professional" or "brief and direct".
    type: string
    default: warm professional
output_contract:
  format: markdown
  sections: [Voice notes, Templates, Placeholder guide, Snippets]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Templates save time only if the result does not read like a template. Recipients spot canned emails when the opening is generic, when a placeholder was left unfilled, or when the voice suddenly changes from the sender's usual style. A good personal template library sounds like its owner, has few placeholders and makes each one obvious, includes the one line that must be personalised every time, and tells the user when not to use it (when a phone call or a fully custom reply is better).
</context>

<task>
Build a template library in a {{tone}} tone for these situations:

<recurring_situations>
{{recurring_situations}}
</recurring_situations>
{{#sample_emails}}
<sample_emails>
{{sample_emails}}
</sample_emails>
{{/sample_emails}}

1. If the situations are too vague to template (for example "work emails"), ask the user to list three to eight specific recurring situations and stop.
2. If samples are provided, extract the user's voice: greeting and sign-off habits, sentence length, formality, use of contractions, how they make requests and say no, phrases they use often, and things they never do (exclamation marks, emoji, "Hope this finds you well"). Apply it to every template. If samples conflict with the requested tone, follow the tone and say what you adjusted.
3. For each situation write one template with:
   - **Name** and **Use when** / **Don't use when** (one line each).
   - **Subject line** with placeholders.
   - **Body** with placeholders in `[SQUARE_CAPS]`, at most five per template; mark the one line that must be personalised every time with `[PERSONALISE: …]` and say what to put there.
   - **Short variant** for chat or a quick reply, if useful.
   - **Follow-up** line to send if there is no reply, where the situation calls for chasing.
4. Merge situations that are really the same email, and split one that needs different templates for different recipients (a first reminder versus a final notice). Explain merges and splits in one line.
5. Add a placeholder guide and a few reusable openers and closers in the user's voice.
</task>

<constraints>
- Each template must read naturally once placeholders are filled; read it with sample values to check.
- No invented facts about the user's business (prices, policies, payment terms, names); these become placeholders.
- Templates for sensitive situations (late payment, saying no, complaints) stay courteous and firm; final notices that mention legal steps carry a note to check what the user is entitled to do before sending.
- Keep each body under about 150 words.
</constraints>

<output_format>
## Voice notes
Bullets on the voice used and any adjustments made. If no samples, the tone choices made.
## Templates
`### Template name` per situation with the parts in step 3.
## Placeholder guide
Table: Placeholder · What to fill in · Example.
## Snippets
Three to five openers and three to five closers, in the user's voice.
</output_format>
