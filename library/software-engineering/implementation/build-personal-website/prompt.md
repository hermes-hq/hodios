---
schema: 1
id: build-personal-website
kind: prompt
title: Build a personal website
description: Builds a simple personal or portfolio website in plain HTML and CSS or a static site generator, accessible, fast and free to host, with steps a beginner can follow. Use to get a site online.
category: implementation
version: 1.0.0
status: incubating
stage: [build, ship]
role: [individual, student, job-seeker, designer]
stack: [html-css]
requires: [none]
inputs: [text, resume, preferences]
output: [code, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [portfolio-website, static-site, web-accessibility, free-hosting, beginners]
pairs_with:
  prompts: [build-ui-component, improve-web-vitals]
  personas: [coding-mentor]
args:
  - name: content
    description: What the site should say and show, for example your name, a short bio, projects with links and images, a CV, contact options, and whether you want a blog.
    type: text
    required: true
  - name: preferences
    description: Look and feel, colours, sites you like, whether you have a domain name, your operating system and how comfortable you are with code. Leave empty for a clean, simple default.
    type: text
output_contract:
  format: markdown
  sections: [Plan, Files, See it on your computer, Put it online, Check before sharing, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people with little or no web experience put up a personal site they are proud of and can maintain themselves. For a few pages with no blog, plain HTML and CSS is the simplest thing that lasts: no build tools, nothing to update, and it opens in any browser. For a blog or many pages, a static site generator (such as Eleventy, Hugo or Astro) turns Markdown files into pages. Static hosts such as GitHub Pages, Cloudflare Pages and Netlify offer free plans for sites like this; a custom domain is optional and costs money each year.

A good personal site is readable and accessible: semantic HTML (`header`, `nav`, `main`, `footer`, one `h1`, headings in order), text alternatives for images, sufficient colour contrast, visible keyboard focus, a layout that works on phones, and respect for `prefers-reduced-motion`. It is fast because images are resized and compressed and there is little JavaScript. It has a page title, a meta description and social sharing tags. It does not expose more personal information than the person intends.
</context>

<task>
Build a personal website with this content:
{{content}}

{{#preferences}}Preferences:
{{preferences}}{{/preferences}}

1. Choose plain HTML and CSS or a static site generator, based on whether there is a blog or many pages, and explain the choice in two sentences.
2. Plan the pages and sections.
3. Write every file. Use semantic HTML, one CSS file with custom properties for colours and fonts at the top so they are easy to change, system fonts or one web font, a responsive layout without a CSS framework, light and dark colour schemes through `prefers-color-scheme`, and no JavaScript unless a feature needs it. Mark the places where the person must fill in their own text, links and images with clear `TODO` comments, and never invent facts about them.
4. Explain how to open the site on their own computer.
5. Give step-by-step deployment to one free static host, written for a beginner: account creation, uploading or connecting a repository, and where the live address appears. Add the optional steps for a custom domain.
6. Give a checklist to run before sharing the link.
</task>

<constraints>
- Do not put a home address, personal phone number or date of birth on the site even if provided; suggest an email address, a contact form service or a professional profile link instead, and say why in one sentence.
- Do not invent projects, employers, testimonials or metrics.
- Explain any technical term the first time it appears.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Plan
The choice and the page list.
## Files
One code block per file, with its path as a heading.
## See it on your computer
Numbered steps.
## Put it online
Numbered steps for one host, then optional custom domain steps.
## Check before sharing
A checklist: links work, images have alt text, it reads well on a phone, contrast passes, the title and description are set, no private details.
## Next steps
Two or three ideas, such as adding a project or a blog post.
</output_format>
