---
schema: 1
id: design-tv-and-kiosk-ui
kind: prompt
title: Design a TV, kiosk or signage interface
description: Designs an interface for a TV, self-service kiosk or in-store screen around viewing distance, remote or touch input, focus states, timeouts and access for standing and seated users.
category: ui-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, frontend-engineer]
requires: [none]
inputs: [text, spec]
output: [docs, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ten-foot-ui, self-service-kiosk, digital-signage, focus-navigation, reach-range, timeouts]
pairs_with:
  prompts: [design-empty-and-error-states, write-ux-microcopy, plan-signage, design-voice-interaction]
  personas: [product-designer]
args:
  - name: device
    description: tv is a living-room screen used with a remote; kiosk is a touch screen people walk up to (ordering, check-in, ticketing); signage is a mostly non-interactive display in a shop or venue.
    type: enum
    enum: [tv, kiosk, signage]
    default: kiosk
  - name: tasks
    description: What people do or need to see on the screen, in order of importance, with how long a typical session should take, for example "order and pay for a meal in under two minutes".
    type: text
    required: true
  - name: environment
    description: Where the screen is and the conditions - screen size and mounting height, viewing distance, lighting and glare, noise, crowding, queues, privacy of what is shown.
    type: text
output_contract:
  format: markdown
  sections: [Context assumptions, Layout and legibility, Input and focus, Flow, Timeouts and reset, Accessibility, Content states, Prototype and test plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Screens that are not phones or laptops break desktop habits. A TV is read from across a room, driven by a directional remote, and must always show where focus is. A kiosk is used standing, by strangers, often in a queue, sometimes by wheelchair users or people who cannot see the screen well, and must recover to a clean state when someone walks away mid-task. Signage is glanced at for a few seconds while walking. Common failures are text sized for a laptop, focus states that disappear on a bright background, controls placed above reach height, a kiosk that keeps the previous customer's order on screen, and no route for people who cannot use the touch screen.
</context>

<task>
Design the interface for a {{device}}.

<tasks>
{{tasks}}
</tasks>

{{#environment}}<environment>
{{environment}}
</environment>
{{/environment}}
1. **Context assumptions:** state screen size, viewing distance, mounting height, lighting and session length. Where the environment was not given, assume typical values for a {{device}} and label them as assumptions to confirm on site.
2. **Layout and legibility:** a grid and safe areas (TVs crop edges; keep content inside a title-safe margin), minimum text sizes derived from viewing distance (explain the rule you use and give a starting size for this screen), high contrast that survives glare, limited text per screen, and imagery that reads at distance. For signage, one message per screen and a reading time per slide.
3. **Input and focus:**
   - **tv:** a directional focus model with predictable movement on a grid, a clearly visible focus state (scale, outline and colour together, never colour alone), where focus lands on each screen, back-button behaviour at every level, avoiding long text entry (offer phone pairing or voice search), and remote shortcuts.
   - **kiosk:** large touch targets with spacing suited to standing users, the most important controls within comfortable reach, no gestures beyond tap, feedback on every touch, and a tactile or audio alternative such as a keypad and headphone jack or a staff-assisted route.
   - **signage:** whether any interaction exists (QR code, touch to explore), and that the screen still works with none.
4. **Flow:** the screens in order for the main task, with the number of steps, what is shown on each, and the shortest path. For kiosks include payment, receipt and what happens on payment failure.
5. **Timeouts and reset:** an inactivity warning with a clear "I need more time" control, a reset that clears all personal data and returns to the attract screen, timings appropriate to the tasks, and protection of what is shown (card details, names, health information) from people standing behind.
6. **Accessibility:** reach ranges for seated and standing users (controls between about 380 mm and 1220 mm from the floor is a common guideline; tell the user to confirm the rule that applies where the screen is installed), audio and screen-reader modes, high-contrast and large-text modes, captions for audio, language selection on the first screen, and a way to call staff.
7. **Content states:** attract or idle screen, loading, offline or out-of-service, errors with a way forward, and what is shown while content updates.
8. **Prototype and test plan:** test on the real device at the real distance or height, with people of different heights, a wheelchair user, someone with low vision and someone in a hurry, and measure task time and errors.
9. Before answering, check the flow against the session length in {{tasks}} and remove any step that does not serve the task.
10. If the tasks are missing or unclear, ask what people need to do on the screen and stop.
</task>

<constraints>
- Do not quote building or accessibility regulations as definitive; name the type of rule and tell the user to check the local standard and the hardware vendor's guidance.
- Design for strangers using it once, unless the tasks say otherwise.
- Keep personal data off screen after the task and away from bystanders.
</constraints>

<output_format>
Markdown with the contract's sections in order. Use a table for the screen flow (Step, Screen, Content, Primary action, Time), a table of legibility values (Element, Size, Contrast, Notes), and a checklist for accessibility.
</output_format>
