---
schema: 1
id: request-deadline-extension
kind: prompt
title: Request a deadline extension
description: Asks a client, manager, landlord or official body for more time, with what is already done, the honest reason, a firm new date and what you will send in the meantime.
category: email
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, consultant, project-manager, founder]
requires: [none]
inputs: [text, notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [extension, deadline, more-time, expectation-setting]
pairs_with:
  prompts: [write-delay-notification, push-back-on-deadline-by-email, write-email-to-professor]
args:
  - name: deadline
    description: What is due, to whom, and the current deadline, for example "Tax documents to my accountant by 31 Jan" or "design proofs to the client by Friday".
    type: string
    required: true
  - name: progress
    description: What is already done and what remains.
    type: text
    required: true
  - name: reason
    description: The real reason more time is needed, including anything in your control.
    type: text
  - name: proposed_date
    description: The new date you are asking for. If you do not know, say so and the prompt will help pick one.
    type: string
  - name: recipient_type
    description: Client or manager means a working relationship; official means a public body, court, tax office, university administration or landlord, where formal rules may apply.
    type: enum
    enum: [client, manager, official]
    default: client
output_contract:
  format: markdown
  sections: [Date check, Email, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Extension requests are granted most often when they arrive before the deadline, show real progress, give a specific new date with a little buffer, and offer something now (a partial delivery, a draft, a first section). They are refused or resented when they come on the day, when they are open-ended ("a bit more time"), or when the new date is so tight that a second request follows. Asking once for a realistic date is better than asking twice. With official bodies (tax offices, courts, regulators, landlords under a notice, universities), extensions often have a formal process, a form or a cut-off, and a missed statutory deadline may not be extendable by email at all; the person needs to check the process and get the extension confirmed in writing before relying on it.
</context>

<task>
Write an extension request to a {{recipient_type}} recipient.

Deadline: {{deadline}}
{{#proposed_date}}Proposed new date: {{proposed_date}}{{/proposed_date}}

<progress>
{{progress}}
</progress>
{{#reason}}
<reason>
{{reason}}
</reason>
{{/reason}}

1. If the current deadline or what is due is unclear, ask and stop.
2. Date check: test the proposed date against the work that remains. If none was given or it looks tight, suggest one with a small buffer and say why. Ask for one extension, not two.
3. If the recipient is official, say in Date check that a formal process may apply (a form, a portal, a fee, a fixed cut-off), that some deadlines cannot be extended, and that the user should confirm the extension in writing before relying on it. Do not state the rules for any specific body or country.
4. Write the email:
   - Subject: "Request for extension: [what] (currently due [date])".
   - First lines: the request and the new date.
   - Progress: what is done, in one or two concrete lines.
   - Reason: one honest sentence, owning what was in the sender's control. No detailed personal or medical information unless the user wants it there.
   - Offer: what can be sent by the original date (a draft, the finished part, an update), if anything.
   - Close by asking them to confirm the new date, and thanking them.
   - For official recipients, include any reference number placeholder `[reference]` and a formal tone.
5. Under Notes, list what to attach and when to follow up if there is no reply before the original deadline.
</task>

<constraints>
- Under about 150 words in the body.
- Never invent progress, reasons or reference numbers; mark gaps `[need: …]`.
- No grovelling and no stack of excuses; one reason.
- Do not imply an extension is already agreed, and do not tell the user they are entitled to one.
</constraints>

<output_format>
## Date check
Two or three bullets on the proposed date, and the formal-process warning for official recipients.
## Email
Subject line, then the body.
## Notes
Bullets: attachments, follow-up timing, placeholders.
</output_format>
