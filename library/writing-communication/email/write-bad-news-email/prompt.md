---
schema: 1
id: write-bad-news-email
kind: prompt
title: Write a bad news email
description: Writes an email that delivers bad news, such as a cancelled project, a denied request or a missed target, with the news early, honest reasons, the impact on the reader and next steps.
category: email
version: 1.0.0
status: incubating
stage: [build]
role: [manager, project-manager, consultant, executive]
requires: [none]
inputs: [text, notes]
output: [message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [bad-news, cancellation, denied-request, missed-target, difficult-email]
pairs_with:
  prompts: [write-delay-notification, decline-request-gracefully, prepare-difficult-conversation]
args:
  - name: news
    description: The bad news itself, stated plainly, including whether it is final or could change and when.
    type: text
    required: true
  - name: recipient
    description: Who receives it and what they have at stake, for example "the 6-person team that built the pilot" or "client's marketing director, who championed the project".
    type: string
    required: true
  - name: reasons
    description: The real reasons for the decision or outcome, including the ones that are uncomfortable to say.
    type: text
  - name: what_happens_next
    description: What follows for the reader, such as alternatives, timelines, what is kept, people they can talk to, invoices, notice periods or redeployment.
    type: text
  - name: relationship
    description: Internal means colleagues or your own team; client means a customer you serve; vendor means a supplier or contractor you buy from.
    type: enum
    enum: [internal, client, vendor]
    default: internal
output_contract:
  format: markdown
  sections: [Channel check, Email, Likely questions, Notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Readers of bad news want to know three things quickly: what happened, what it means for them, and what happens now. The classic "buffer" opening (praise first, news in paragraph three) now reads as manipulative, and readers skim for the "but" anyway. What preserves trust is the news in the first paragraph, reasons that are honest without being a defence brief, an acknowledgement of the reader's effort or loss that does not patronise, no false hope when the decision is final, and concrete next steps. Some news should not arrive by email first: anything that changes a person's job, pay or role, or ends a long relationship, deserves a conversation, with the email as the written follow-up.
</context>

<task>
Write a bad news email to {{recipient}} ({{relationship}} relationship).

<news>
{{news}}
</news>
{{#reasons}}
<reasons>
{{reasons}}
</reasons>
{{/reasons}}
{{#what_happens_next}}
<what_happens_next>
{{what_happens_next}}
</what_happens_next>
{{/what_happens_next}}

1. If you cannot tell what the news is or who is affected, ask and stop.
2. Channel check: decide whether this should be said in person or on a call first. Recommend a conversation first when the news affects someone's job, pay, role or a long-standing relationship, or when the reader championed the work and would be blindsided. In that case still write the email, framed as the follow-up ("As we discussed this morning…").
3. Subject line: plain and specific ("Decision on the Atlas pilot"), never a disguise like "Quick update" and never alarming in caps.
4. First paragraph: the news in one or two sentences, including whether it is final. If it is not final, say what could change it and when.
5. Reasons: the main one or two, honestly, in plain words. Do not hide behind "the business has decided" when a clearer reason is available; do not list every factor. For clients and vendors, leave out internal politics and confidential numbers, and never blame a named colleague.
6. Impact on the reader: what changes for them, and an acknowledgement of their work or their loss that is specific, not generic ("the onboarding flow your team built will be reused in…" only if the input says so).
7. Next steps: what happens now, with dates, what is kept, what they need to do, and who they can talk to. For a vendor, cover outstanding work, invoices and notice per the contract if given; for a client, cover what is delivered and any commercial consequence only as stated.
8. Close with an offer to talk, with a specific way to do it.
9. List the three to five questions the reader is most likely to ask, with honest answers from the input or `[need: …]` where the answer is not known.
</task>

<constraints>
- Under about 220 words in the body.
- Use only the facts given; never invent reasons, alternatives, compensation or dates. Mark gaps `[need: …]`.
- No softening that changes the meaning: do not call a cancellation a "pause" or a denial "not right now" unless that is true.
- One sincere sentence of regret at most; no grovelling, no "unfortunately" in every paragraph, no corporate euphemisms ("right-sizing", "sunsetting the initiative").
- Do not make promises the input does not authorise (future work, guaranteed roles, refunds).
- If the news concerns redundancies, disciplinary matters or contract termination, add a line under Notes that HR or legal should review before sending.
</constraints>

<output_format>
## Channel check
One or two sentences: email is fine, or talk first and then send this.
## Email
Subject line, then the body.
## Likely questions
Numbered questions with short answers.
## Notes
Placeholders, reviewers to involve, anything deliberately left out. "None" if nothing.
</output_format>
