---
schema: 1
id: review-backlink-profile
kind: prompt
title: Review a backlink profile
description: Reviews a backlink export to separate useful, neutral and risky links, explains why most spammy links need no action, judges whether a disavow file is justified and lists realistic link opportunities.
category: seo
version: 1.0.0
status: incubating
stage: [review]
role: [founder, marketer, consultant]
requires: [none]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [backlinks, disavow, link-audit, toxic-links]
pairs_with:
  prompts: [write-link-building-outreach, write-reconsideration-request, diagnose-organic-traffic-drop]
args:
  - name: backlink_export
    description: Backlink rows from your webmaster tool or a link tool - linking domain, linking page, target page, anchor text, follow or nofollow, and first-seen date if available. A summary of the top domains works too.
    type: text
    required: true
  - name: site_niche
    description: What the site is about and where it operates (for example "independent bike shop in Utrecht", "B2B payroll software for EU firms").
    type: string
    required: true
  - name: concern
    description: Why you are looking - a manual action notice, a traffic drop, a tool's toxic score, a past link-buying campaign, or just a check-up.
    type: string
    default: check-up
output_contract:
  format: markdown
  sections: [Summary, Classification, Patterns, Disavow decision, Link opportunities, Next steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review backlink profiles for site owners who are worried about their links. Every site collects junk links from scrapers, stats pages and spam directories; search engines largely ignore them, and third-party "toxic" scores are tool estimates, not search engine verdicts. Disavowing in bulk wastes time and can remove links that were helping. A disavow file is justified mainly when there is a manual action for unnatural links, or when the site itself bought links or joined link schemes at scale and those links are still live. What usually matters more is the short list of good links and how to earn more like them. Concern: {{concern}}.
</context>

<task>
<backlink_export>
{{backlink_export}}
</backlink_export>

Site and niche: {{site_niche}}

1. Summarise the profile: number of linking domains in the export, share of follow links, the main target pages, and the anchor text mix (brand, URL, generic, keyword-rich).
2. Classify linking domains:
   - useful: real sites with an audience, relevant to the niche or location, editorial links (press, partners, suppliers, associations, real reviews and resources);
   - neutral: scrapers, auto-generated stats or "website worth" pages, foreign-language spam, low-quality directories, forum profiles. Ignored by search engines, no action;
   - risky: patterns that look like links the site placed or paid for: keyword-rich anchors at scale, sitewide footer links from unrelated sites, networks of near-identical blogs, paid guest posts, link exchanges.
3. Patterns: unusual anchor concentration, sudden spikes by first-seen date, links pointing to pages that no longer exist (worth redirecting).
4. Disavow decision: recommend no disavow, a narrow domain-level disavow of risky domains the site cannot get removed, or a full cleanup with removal requests first (when there is a manual action). Explain the reason in plain words.
5. Link opportunities realistic for this niche: lost or broken links to reclaim, unlinked mentions, suppliers and partners, local or industry associations, local press, resources the site could create.
</task>

<constraints>
- Work only from the export; do not claim to know a domain's quality, traffic or penalty status beyond what the rows show, and mark judgements made from the domain name alone as provisional.
- Do not treat a third-party toxic score as proof.
- Never recommend buying links, link exchanges or private networks.
- If the export is empty or only a toxic-score summary with no domains, ask for the domain-level rows.
- Note that disavow tools are search-engine specific and used through that engine's webmaster tool.
</constraints>

<output_format>
## Summary
Five lines or fewer.

## Classification
Table: Domain | Links | Anchor example | Class (useful, neutral, risky) | Reason.

## Patterns
Bullets.

## Disavow decision
The recommendation, the reason, and if needed the list of domains in disavow file format (domain:example.com).

## Link opportunities
Table: Opportunity | Why it fits | First step.

## Next steps
Numbered, five or fewer.
</output_format>
