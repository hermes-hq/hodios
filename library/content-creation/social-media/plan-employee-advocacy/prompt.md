---
schema: 1
id: plan-employee-advocacy
kind: prompt
title: Plan an employee advocacy programme
description: Plans an employee advocacy programme with goals, voluntary participation, posting guidelines, shareable content, training, incentives and metrics. Use before asking staff to post about the company.
category: social-media
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, manager, founder]
stack: [linkedin]
inputs: [notes]
output: [plan, docs]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [employee-advocacy, employer-brand, social-media-policy, b2b-social]
pairs_with:
  prompts: [plan-linkedin-personal-brand, write-linkedin-post, write-editorial-guidelines]
  personas: [social-media-manager]
args:
  - name: company
    description: What the company does, its industry and any regulation, the goals (hiring, sales, awareness), current social presence, culture, and who would run the programme.
    type: text
    required: true
  - name: employees
    description: Number of employees.
    type: number
output_contract:
  format: markdown
  sections: [Goals and fit, Programme design, Guidelines, Content system, Training and launch, Incentives, Measurement, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design employee advocacy programmes: structured ways for staff to share their work and their company on their own social accounts. Posts from people usually reach and persuade more than posts from company pages, but only when they sound like the person. Programmes fail in three common ways: everyone is asked to repost the same corporate text, which looks fake and gets little reach; participation feels compulsory, which breeds resentment; and there are no guidelines, so someone leaks confidential information or makes a claim the company cannot support. Employees promoting their employer generally need to make the connection clear (for example under the US FTC Endorsement Guides and UK advertising rules), and paying per post creates a material connection that must be disclosed. Regulated industries (finance, healthcare, legal, pharmaceuticals) often have extra rules on what staff can say publicly.
</context>

<task>
<company>
{{company}}
</company>

Employees: {{employees}}

1. **Goals and fit.** State the one or two goals the programme serves, what success looks like in six months, and whether the company is ready (leadership participation, something worth sharing, someone to run it). If it is not ready, say what must come first.
2. **Programme design.** Who takes part (voluntary, starting with a pilot group of willing champions, sized to the company), the platforms, the expected effort per week, and who runs it.
3. **Guidelines.** A one-page policy employees will actually read: what to share and what never to share (confidential, customer or financial information, unreleased products), how to disclose the employment connection, how to handle negative comments or questions about the company (do not argue, pass to the named contact), personal opinions versus company positions, and what to do after a mistake. Note anything the industry's regulation adds.
4. **Content system.** A monthly mix that encourages personal posts (what I worked on, what I learned, our team) over reshares, a shareable kit each month (news, a few prompts, images, suggested angles rather than copy to paste), and how employees submit ideas.
5. **Training and launch.** A short session plan (profile basics, writing a first post, the guidelines), a launch sequence for the pilot, and how to expand.
6. **Incentives.** Recognition-based incentives (spotlights, leadership thanks, learning budgets, career visibility), and a clear warning about paying per post or tying it to performance reviews.
7. **Measurement.** Participation, reach and engagement on employee posts, profile visits, inbound applicants or leads attributed with tagged links, and a quarterly survey of how participants feel about it.
8. **Risks.** The main risks and how to reduce them.
</task>

<constraints>
- Participation must be voluntary; do not design mandatory quotas, monitoring of personal accounts, or penalties for not posting, and say why if the notes ask for them.
- Recommend that HR and legal review the guidelines before launch, especially in regulated industries or where employment law limits what an employer can ask of staff.
- Scale the plan to {{employees}} employees; if the number is missing, assume a company of about 100 and say so.
- Name tool categories, not specific vendors.
- Do not promise reach or lead numbers.
</constraints>

<output_format>
## Goals and fit
## Programme design
## Guidelines
The one-page policy, ready to adapt.

## Content system
A monthly mix table and the kit contents.

## Training and launch
A short timeline.

## Incentives
## Measurement
A table: metric | how to track | target to set after the pilot.

## Risks
A table: risk | mitigation.
</output_format>
