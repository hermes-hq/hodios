---
schema: 1
id: decline-job-offer
kind: prompt
title: Decline a job offer
description: Writes a gracious job offer decline that thanks the employer, gives a brief reason if wanted and keeps the door open, plus a short phone script. Use once you have decided to turn an offer down.
category: job-search
version: 1.0.0
status: incubating
stage: [ship]
role: [job-seeker]
requires: [none]
inputs: [preferences, message]
output: [message, script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: beginner
tags: [job-offer, decline, professional-relationships]
pairs_with:
  prompts: [evaluate-job-offer, negotiate-job-offer, accept-job-offer-in-writing]
args:
  - name: company
    description: The company, the role, and the name of the person who made the offer if you know it.
    type: string
    required: true
  - name: reason
    description: Optional reason you are declining (another offer, compensation, role fit, location, staying put) and how much of it you want to share.
    type: text
  - name: relationship_warmth
    description: formal for a short, polite note; warm when you built rapport with the team and want to stay in touch.
    type: enum
    enum: [formal, warm]
    default: warm
output_contract:
  format: markdown
  sections: [Email, Phone script, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a recruiter who has received thousands of offer declines. The good ones arrive quickly once the decision is made, are short and kind, give a reason that is true but does not invite a debate, and leave both sides happy to work together later. The bad ones go silent, over-explain, criticise the company or the offer, or turn out to be a negotiation tactic in disguise. Industries are small: the recruiter or hiring manager may be at the candidate's next target employer in two years.

Company and role: {{company}}
Tone: {{relationship_warmth}}
{{#reason}}
<reason>
{{reason}}
</reason>
{{/reason}}
</context>

<task>
1. Check the intent. If the reason suggests the candidate would accept with better terms (pay, title, start date, remote work), say at the top that this is a negotiation, not a decline, and that declining first and asking later rarely works; then still write the decline as requested.
2. Write the email:
   - Subject line: "[Role] offer - [Your name]" or similar.
   - Thank the person by name for the offer and for their time.
   - The decision in the first or second sentence, clearly: "I have decided not to accept the offer."
   - A reason in one sentence only if the candidate wants to share one. Keep it neutral: "I have accepted a role that is closer to my long-term focus on X" rather than naming the competitor or pay gap, unless the candidate asks to be specific.
   - One sentence of genuine appreciation about the people or process, specific if possible, for the warm tone.
   - Keep the door open: hope to cross paths, wish the team well, and offer to stay in touch (for example on LinkedIn).
3. Write a short phone script (four to six lines) for when the offer was made by phone or the relationship is warm: say it is a decline in the first sentence, give the reason, thank them, and say an email confirmation will follow.
4. Add notes on timing and on anything to handle (signed documents, references, background check consent, equipment already sent).
</task>

<constraints>
- 80 to 150 words for the email body; formal is shorter and more reserved, warm is personal but still brief.
- No criticism of the company, the offer or anyone in the process. No apologies beyond one "I am sorry to disappoint" in the warm tone if it fits.
- Use only the reason given. If none is given, write the email without one; do not invent a competing offer.
- Use [Name] placeholders where the contact or the candidate's name is unknown.
</constraints>

<output_format>
## Email
Subject line, then the body ready to send.
## Phone script
## Notes
Two to four bullets.
</output_format>
