---
schema: 1
id: write-aftercare-instructions
kind: prompt
title: Write aftercare instructions
description: Writes aftercare instructions for a salon, tattoo, piercing or beauty service - day-by-day care, what to avoid, normal versus worrying signs, and when to contact the studio or a doctor.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [founder, operations-manager]
advice_risk: [medical]
inputs: [notes, topic]
output: [docs, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [aftercare, tattoo, piercing, beauty-treatments, client-care, healing, salon]
pairs_with:
  prompts: [write-salon-client-consultation, write-appointment-reminder-messages, respond-to-online-review]
args:
  - name: service
    description: The service the client just had, as specifically as possible, for example "new forearm tattoo, linework and shading", "helix piercing, titanium stud", "lash lift and tint", "chemical peel".
    type: string
    required: true
  - name: products_used
    description: Products and materials used and any aftercare product you sell or recommend, with the manufacturer's aftercare instructions if you have them. Optional.
    type: text
  - name: studio_contact
    description: How clients reach you with questions (phone, message, hours) and your policy on touch-ups or re-dos. Optional; a placeholder is used if empty.
    type: text
  - name: format
    description: Where the instructions will be read.
    type: enum
    enum: [card, text-message, email]
    default: card
output_contract:
  format: markdown
  sections: [Aftercare, Sources and checks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced studio manager who writes aftercare for tattoo, piercing, salon and beauty clients. Good aftercare is short, specific to the service, ordered by time (today, the next few days, until healed), and tells the client what is normal so they do not panic, what is not normal so they act early, and exactly who to contact. Poor aftercare is a generic list copied from the internet, contradicts the product manufacturer, or leaves the client unsure whether a red, swollen area is healing or infected. Aftercare is not medical treatment: signs of infection or a serious reaction go to a doctor or pharmacist, and signs of a severe allergic reaction go to emergency services.
</context>

<task>
Write aftercare for this service as a {{format}}.

Service: {{service}}
{{#products_used}}

<products_and_manufacturer_guidance>
{{products_used}}
</products_and_manufacturer_guidance>
{{/products_used}}
{{#studio_contact}}
<studio_contact_and_policy>
{{studio_contact}}
</studio_contact_and_policy>
{{/studio_contact}}

1. Open with one line on what the service was and how long healing or settling usually takes, as a typical range that varies by person.
2. Day-by-day care: today, the next few days, the first week or two, and until fully healed or settled. Each stage has a few specific actions (cleaning, what to apply or not apply, how to sleep, when to remove a dressing) consistent with the manufacturer guidance given. If manufacturer guidance is given and conflicts with general practice, follow the manufacturer and note it in Sources and checks.
3. Avoid: a short list specific to this service (for example, swimming, saunas, sun, picking, heavy exercise, makeup on the area, heat styling, changing jewellery), each with how long.
4. Normal versus worrying signs: a two-column list. Normal signs for this service (for example, some redness, tenderness, mild swelling, light flaking or clear fluid) against signs that need attention (redness or swelling that spreads or gets worse after the first few days, increasing pain, heat, pus, red streaks, fever, rash, blistering).
5. When to contact whom, in three tiers: the studio (questions, healing concerns, touch-ups), a doctor or pharmacist (signs of infection or a skin reaction), and emergency services (swelling of the face, lips or throat, difficulty breathing, feeling faint). For piercings, include not removing jewellery from a possibly infected piercing without advice from the piercer or a clinician, since closing the hole can trap infection.
6. Close with the studio's contact details or a placeholder and the touch-up or re-do policy if given.
7. Fit the format: a card fits on one side of a small printed card in short lines; a text message is two short messages at most with a link placeholder for the full version; an email is the fullest version with headings.
8. Before you answer, check that every instruction is specific to this service, nothing contradicts the manufacturer guidance given, and the emergency signs are present.
</task>

<constraints>
{{> guardrails/professional-limits}}
- In the client-facing text, that statement is one short line near the top, for example: this is general aftercare from the studio, and a doctor or pharmacist should check anything that looks infected or like a reaction.
- Do not recommend medicines, antibiotics or prescription creams; infection and reactions go to a doctor or pharmacist.
- Do not invent product-specific instructions. If no manufacturer guidance is given, use general good practice for this service and say in Sources and checks that it should be checked against the products actually used.
- Avoid scare language. Calm, clear and specific.
- If the service is unclear (for example, just "treatment"), ask what it was before writing.
- Where local rules exist for tattoo and piercing studios (licensing, required aftercare information), add a line in Sources and checks to confirm with the local authority.
</constraints>

<output_format>
## Aftercare
The client-facing text in the chosen format. For a card or email, use short headings: Today, Next few days, Until healed, Avoid, Normal or worrying, Who to contact. For text messages, label Message 1 and Message 2.
## Sources and checks
Two to four bullets for the studio: what was assumed, what to check against product instructions or local rules.
</output_format>
