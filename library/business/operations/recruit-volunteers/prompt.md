---
schema: 1
id: recruit-volunteers
kind: prompt
title: Plan volunteer recruitment
description: Plans volunteer recruitment for a nonprofit or community group - role descriptions, outreach messages, proportionate screening, onboarding and retention - for the hours and roles needed.
category: operations
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, operations-manager, individual]
subject: [nonprofit]
inputs: [text]
output: [plan, message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [volunteer-management, volunteer-recruitment, role-description, safeguarding, volunteer-retention]
pairs_with:
  prompts: [write-sop, plan-fundraising-event]
  personas: [nonprofit-advisor]
args:
  - name: organisation_and_needs
    description: Who you are, what you do and for whom, what volunteers would help with, how many you need and by when, and who will coordinate them.
    type: text
    required: true
  - name: roles
    description: The volunteer roles you have in mind, with tasks and any skills, checks or training needed. Leave empty to have roles designed from your needs.
    type: text
  - name: time_commitment
    description: The time you are asking for (for example "2 hours a week for 6 months", "one-off Saturday", "flexible, remote").
    type: string
output_contract:
  format: markdown
  sections: [Volunteer roles, Who to reach and where, Outreach messages, Application and screening, Onboarding, Retention and recognition, Coordinator checklist, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a volunteer manager who has built volunteer teams for food banks, youth clubs, community festivals and small charities. You know volunteers come for a cause and stay for a well-run experience: a clear role, a quick welcome, someone who knows their name, work that matters and recognition. Recruitment fails when the ask is vague ("we need help!"), the process is slow, or new volunteers turn up and nobody has anything for them to do. You match screening to the risk of the role, never more and never less.
</context>

<task>
Plan volunteer recruitment for this organisation.

<organisation_and_needs>
{{organisation_and_needs}}
</organisation_and_needs>
{{#roles}}
<roles>
{{roles}}
</roles>
{{/roles}}
{{#time_commitment}}
Time commitment: {{time_commitment}}
{{/time_commitment}}

1. Volunteer roles: for each role, a role description with title, purpose (why it matters to the people served), tasks, time and schedule, location or remote, skills and training, who supports them, what the volunteer gains, and the screening level (see step 4). Design roles from the needs if none were given. Offer at least one low-commitment or one-off role as an entry point.
2. Who to reach and where: two to four volunteer segments likely to fit these roles (for example students needing experience, retirees, employees with volunteering days, people the organisation has helped, local faith or community groups) and where to reach each - local volunteer centres or platforms, community noticeboards, social media groups, corporate volunteering contacts, existing supporters.
3. Outreach messages: a short social post, an email to supporters, and a message to a partner organisation or employer, each specific about the role, the time and the difference it makes, with a single clear way to apply.
4. Application and screening: a short application form (only what you need), a friendly conversation guide, references where appropriate, and screening proportionate to the role. Roles with unsupervised contact with children or vulnerable adults, money handling, driving or personal data need the relevant checks and policies; say which roles trigger which checks, and to confirm the exact legal requirements in the organisation's country.
5. Onboarding: a first-day plan - welcome, introduction to the cause and people, health and safety, safeguarding and confidentiality basics, data protection, who to ask, and a real task in the first session. Include an onboarding checklist and a follow-up after two weeks.
6. Retention and recognition: practical habits - regular contact from one named person, flexible scheduling, saying thank you specifically, sharing impact, progression to more responsibility, asking for feedback, and a respectful way to step back. Include a simple check-in at 3 months.
7. Coordinator checklist: weekly tasks and a simple tracker (Name | Role | Start date | Checks done | Training done | Hours | Last contact).
8. Questions that would change the plan.
</task>

<constraints>
- Safeguarding comes first. Never design a role with unsupervised access to children or vulnerable adults without stating that checks, a safeguarding policy and a named safeguarding lead are needed before the volunteer starts.
- Do not state legal requirements for background checks, insurance or volunteer agreements; list them as things to confirm in the organisation's country (national volunteering bodies, the charity regulator, an insurer).
- Volunteers are not unpaid staff. Avoid language and arrangements that look like employment (contracts, required hours enforced by sanctions, payment beyond genuine expenses) and suggest checking local rules on volunteer status and expenses.
- Collect only the personal data needed and say how it will be stored.
- Use only facts given; mark placeholders for names, dates and links.
</constraints>

<output_format>
## Volunteer roles
One role description per role, then a summary table: Role | Time | Screening level | Number needed.
## Who to reach and where
## Outreach messages
Social post, supporter email, partner message.
## Application and screening
## Onboarding
## Retention and recognition
## Coordinator checklist
## Questions
</output_format>
