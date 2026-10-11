---
schema: 1
id: write-cease-and-desist-letter
kind: prompt
title: Write a cease-and-desist letter
description: Drafts a cease-and-desist letter for harassment, false statements, interference or misuse of personal information, with the facts, specific demands, a deadline and a measured tone.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build]
role: [individual, founder]
subject: [law]
requires: [none]
inputs: [text]
output: [message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [cease-and-desist, demand-letter, harassment, defamation, stop-contact, formal-notice]
pairs_with:
  prompts: [write-neighbor-dispute-letter, respond-to-online-harassment, write-trademark-infringement-letter, find-free-legal-help]
args:
  - name: location
    description: Country and state or region for you and for the other party; what you can threaten and which laws apply depend on it.
    type: string
    required: true
  - name: conduct
    description: What the other person or business is doing, since when, specific dated examples, the harm it causes (lost customers, distress, safety), what you have already said or done to stop it, and the evidence you hold.
    type: text
    required: true
  - name: demands
    description: Optional. What you want them to do - stop contacting you, remove posts, stop using your photos or information, retract a statement, return property - and any deadline you have in mind.
    type: text
output_contract:
  format: markdown
  sections: [Is a letter the right step, Letter, Evidence to keep, Sending it, If they ignore it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help individuals and small businesses write a letter telling someone to stop conduct that harms them: repeated unwanted contact, false public statements, interference with their business or contracts, or misuse of their photos or personal information. Intellectual property claims (trademark, copyright) are handled by dedicated entries. What lawyers know: the letter works when it is specific (dated examples, the exact posts or messages), makes clear, achievable demands with a deadline, states the next step credibly, and stays calm, because the letter may later be read by a judge or posted online by the recipient. Overreaching backfires: accusing someone of crimes, threatening criminal prosecution to get money, or demanding things the law does not give can itself be unlawful in some places and can expose the sender to a defamation claim or an anti-SLAPP motion. Truthful opinion and fair reviews are usually lawful, so a letter about them may do more harm than good. For threats of violence or stalking, the police and a protective order come before letters.

Location: {{location}}
</context>

<task>
Conduct:

<conduct>
{{conduct}}
</conduct>

{{#demands}}
What the person wants:

<demands>
{{demands}}
</demands>
{{/demands}}

1. Is a letter the right step? Check for danger (threats, stalking, violence) and if present say to contact police and consider a protective order first, and that a letter could escalate. Check whether the conduct may be lawful (honest opinion, true statements, a genuine review) and say so plainly. Note when a platform report or a lawyer's letter would work better.
2. Draft the letter:
   - Sender and recipient blocks with [BRACKETS], date, and a clear subject line ("Demand to cease and desist").
   - The conduct, stated factually with dates and examples, without exaggeration.
   - Why it is not acceptable, in plain terms; name a legal basis only when confident for {{location}}, framed as "may amount to", and marked for verification.
   - Specific demands: what to stop, what to remove or return, and confirmation in writing by a stated date (allow a reasonable period, often 7 to 14 days).
   - The next step if they do not comply (for example legal advice, a claim, a report to the platform or regulator), only steps the person is genuinely willing to take.
   - A preservation request: not to delete relevant messages or posts.
   - A reservation of rights and a civil close.
3. Evidence to keep: screenshots with dates and URLs, message exports, witness names, a log of further incidents.
4. Sending it: a method with proof of delivery or receipt, a copy kept, and no further contact or argument after sending.
5. If they ignore it: realistic next steps and when to involve a lawyer.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not threaten criminal prosecution to obtain money or any other advantage, and do not accuse the recipient of crimes; describe the conduct and its effect.
- Do not invent laws, case names, damages figures or deadlines.
- Do not include insults, personal attacks or anything the person could not prove.
- If the target is a fair review or criticism, say a demand letter may be unlawful or backfire and suggest a measured reply or the platform's process instead.
- If the person wants the letter sent under a lawyer's name, they need an actual lawyer; never draft it as if from a law firm.
{{> output/uncertainty}}
</constraints>

<output_format>
## Is a letter the right step
Two to four lines.

## Letter
The complete letter with [BRACKETS].

## Evidence to keep
Checklist.

## Sending it
Three or four bullets.

## If they ignore it
Bullets.
</output_format>
