---
schema: 1
id: write-wedding-invitation-wording
kind: prompt
title: Write wedding invitation wording
description: Writes save-the-date and wedding invitation wording in the couple's style, getting hosts, names, adults-only or plus-one rules, dress code, gifts and RSVP details right without sounding rude.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
requires: [none]
inputs: [notes, preferences]
output: [copy, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [wedding-invitations, save-the-date, rsvp, plus-ones, dress-code, gift-wording]
pairs_with:
  prompts: [design-invitation-suite, plan-wedding, manage-event-rsvps, write-card-message]
args:
  - name: wedding_facts
    description: Names as they should appear, who is hosting (the couple, one or both families, divorced or remarried parents), date, ceremony and reception times and venues, and whether it is a religious, civil or other ceremony.
    type: text
    required: true
  - name: style
    description: The tone, for example "formal and traditional", "relaxed and funny", "short and modern", and whether it is printed, digital or both.
    type: string
    required: true
  - name: rules
    description: Optional - children or adults-only, plus-one policy, dress code, gifts or registry, RSVP deadline and method, evening-only guests, accommodation and travel notes, and any languages needed for guests.
    type: text
output_contract:
  format: markdown
  sections: [Save the date, Invitation, Details card, Evening invitation, Tricky wording, Checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help couples word their wedding stationery. Most guest confusion and family friction starts with wording: who is named as hosting (traditionally whoever pays or hosts, and a source of hurt when families are blended or divorced), how names appear, and the house rules that are awkward to say, such as adults-only, no plus-ones, evening-only invitations, cash gifts or an unplugged ceremony. Clear wording avoids most awkward conversations: the envelope or digital invite names exactly who is invited, the invitation itself stays focused on the celebration, and the practical rules go on a details card or the wedding website in a warm, plain sentence. Formal conventions (third person, spelled-out dates and times, "the honour of your presence" for religious venues and "the pleasure of your company" for others in some traditions) differ by country, language, religion and family, so the couple's own traditions come first. RSVP deadlines usually need to fall well before the caterer's final numbers date.

Wedding facts: {{wedding_facts}}
Style: {{style}}
{{#rules}}Rules and details: {{rules}}{{/rules}}
</context>

<task>
1. Save the date: two short versions in the chosen style, with names, date, place (town or venue), "invitation to follow" and a website line if they have one.
2. Invitation: the main wording in the chosen style, with hosts named correctly for the situation described; offer one alternative host line where the family set-up is sensitive (for example "Together with their families"). Spell dates and times in the convention that fits the style.
3. Details card: the practical information as short lines: reception, dress code with a plain-language hint, children or adults-only, plus-ones, gifts or registry, accommodation and transport, the RSVP method and deadline, dietary and access needs, and anything like an unplugged ceremony.
4. Evening invitation: wording for evening-only guests, if any, that feels welcoming and makes the timing clear.
5. Tricky wording: for each awkward rule in the input, a warm one-line version for the card and a short reply the couple can send if a guest asks for an exception.
6. Checklist: the things to verify before printing (spellings, dates against the venue booking, the day of the week, times, venue address, RSVP date versus the caterer's deadline, how names go on envelopes or digital invites to show exactly who is invited).
</task>

<constraints>
- Use only the names, dates, times and venues given. Leave clearly marked placeholders for anything missing; never invent a date, time or venue.
- Respect the couple's religion, culture and language conventions; if they mention a tradition, follow it and say where conventions vary.
- Keep rules warm and short; no lecturing or passive-aggressive phrasing ("strictly no children", "do NOT bring a guest").
- Gift wording must be gentle and never demand money or a specific amount.
- Do not assume the couple's genders or that parents are married to each other.
</constraints>

<output_format>
## Save the date
## Invitation
The main wording, then an alternative host line if relevant.
## Details card
## Evening invitation
Or "Not needed".
## Tricky wording
A table: Rule | On the card | If a guest asks.
## Checklist
</output_format>
