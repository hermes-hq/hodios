---
schema: 1
id: write-donor-thank-you
kind: prompt
title: Write a donor thank-you
description: Writes a specific, warm donor thank-you letter or email that names the gift, shows its concrete impact and invites the donor a step closer to the work.
category: fundraising
version: 1.0.1
status: incubating
stage: [build]
role: [manager, writer, founder]
subject: [nonprofit]
inputs: [text]
output: [message, copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [donor-stewardship, thank-you-letter, donor-retention, gift-acknowledgement, impact-story]
pairs_with:
  prompts: [write-donor-appeal, write-impact-report, plan-major-donor-cultivation, plan-giving-day-campaign]
  personas: [nonprofit-advisor]
args:
  - name: donor
    description: Who the donor is - name as they like to be addressed, first gift or long-time supporter, how they gave (online, event, monthly), and anything personal you know that is relevant (in memory of someone, a volunteer, a story they shared).
    type: text
    required: true
  - name: gift
    description: The gift - amount or item, what it was for (restricted purpose or general support), date, and channel (letter or email) you will send the thank-you by.
    type: text
    required: true
  - name: impact
    description: What the gift does or has already done - a concrete outcome, a short story of one person helped (with consent), and a number if you have one.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Thank-you, Subject line or envelope note, Personal touch, Checks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "The donor and gift arguments take long text, since they ask for relationship, purpose and channel details."}
---
<context>
You write donor thank-yous for charities and community organisations. A prompt, personal thank-you is one of the strongest predictors of whether a donor gives again, and most organisations send a generic receipt instead. A good thank-you is sent quickly, opens with thanks rather than the organisation, names the gift and its purpose, shows one concrete effect in a short story or image, makes the donor the hero ("you" more than "we"), and ends with a warm, low-pressure invitation closer (a visit, an update, a call), never another ask. Tone matters: a first-time donor, a monthly donor, a gift in memory of a loved one and a major donor each need a different note.
</context>

<task>
Write a thank-you to this donor.

Donor: {{donor}}
Gift: {{gift}}

<impact>
{{impact}}
</impact>

1. Thank-you: a letter or email (the channel given; default email) of 120-220 words:
   - Open with "thank you" and the donor's name in the first sentence, and name the gift and its purpose.
   - One concrete picture of impact from the input: a person, a moment, a number. Use "you" and "your gift".
   - If this is a first gift, welcome them; if long-time, honour their loyalty with the number of years if given; if in memory of someone, acknowledge that person with care and do not focus on the money.
   - An invitation closer: for example a visit, a short call from the director, a programme update in a few months, or joining a volunteer event. No new donation request.
   - Signed by a named person (placeholder if unknown), with a direct contact.
2. Subject line (email) or envelope or handwritten note suggestion (letter): personal and specific, not "Donation receipt".
3. Personal touch: one suggestion for going further for this donor (a handwritten line, a phone call from a board member, a photo), suited to their gift and relationship.
4. Checks: confirm the facts used; note that the official tax receipt, if required where the organisation operates, should be sent separately or attached as the organisation's policy says; flag any story that needs the beneficiary's consent.
</task>

<constraints>
- Use only the facts given. Never invent beneficiaries, stories, statistics or quotes. If impact is general, write it truthfully and suggest what specific story to gather next time.
- Do not ask for another gift or mention upcoming appeals.
- Avoid clichés ("without you, none of this would be possible", "on behalf of everyone") unless rewritten into something specific.
- Protect privacy: no identifying details about beneficiaries beyond what the user says is consented.
- Match the gift's purpose exactly; never imply a restricted gift was used for something else.
</constraints>

<output_format>
## Thank-you
## Subject line or envelope note
## Personal touch
## Checks
</output_format>
