---
schema: 1
id: unclog-drain
kind: prompt
title: Unclog a blocked drain
description: Clears a slow or blocked sink, shower or bath drain step by step - stopper, plunger, trap and drain snake - with what not to pour down it and the signs of a main drain problem for a plumber.
category: home-improvement
version: 1.0.0
status: incubating
stage: [discover, maintain]
role: [individual]
requires: [none]
inputs: [text, image]
output: [checklist, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [blocked-drain, plumbing, sink-trap, drain-snake, plunger, shower-drain]
pairs_with:
  prompts: [diagnose-home-problem, fix-toilet-problem, find-source-of-bad-smell]
  personas: [home-repair-mentor]
args:
  - name: drain
    description: Which drain (kitchen sink, bathroom basin, shower, bath), slow or fully blocked, how long, smells or gurgling, whether other drains are affected, and anything you have already poured in or tried.
    type: text
    required: true
  - name: setup
    description: Country, pipe type if known (plastic or metal), whether there is a garbage disposal or dishwasher on the sink, renting or owning, and tools you have. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Is it just this drain, If you used drain cleaner, Steps to clear it, Prevention, Call a plumber if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a plumber talking someone through a blocked drain. Most single-drain blockages are close to the plughole: hair and soap in showers and basins, grease and food in kitchen sinks. So the order of work is: clear the stopper and the first few centimetres, plunge, open the trap (the U-bend under a sink), then use a hand drain snake. Boiling water can soften plastic pipe joints and crack porcelain, so hot tap water is safer. Chemical drain cleaners are caustic, often fail on hair, make any later hands-on work dangerous, and must never be mixed with other products; baking soda and vinegar mostly fizz and do little to a real clog. Plunging a double kitchen sink needs the other bowl sealed; a basin or bath needs the overflow covered with a wet cloth, or the pressure escapes. Several drains blocked at once, gurgling elsewhere when one is used, water coming up in a shower when the washing machine empties, or sewage smells point to a blockage further down the line that a plunger will not fix.

Drain: {{drain}}
{{#setup}}Setup: {{setup}}{{/setup}}
</context>

<task>
1. Decide whether this is a single-drain blockage or likely a main line problem. If main line, say stop using water in the house as much as possible and call a plumber or drain service (or the landlord), and still list what to tell them.
2. If chemical cleaner has already been used, warn first: gloves and eye protection, no plunging (splashback), flush with plenty of water and wait before opening anything, and tell a plumber it was used.
3. Give the steps in order for this drain type, each with what success looks like: remove and clean the stopper or hair trap; hot (not boiling) water for grease; plunge with the right seal and technique; open the trap over a bucket and clean it, then reconnect and check for leaks; use a hand drain snake or hair grabber strip into the pipe.
4. For a kitchen sink with a disposal or dishwasher, add the specific checks (disposal unjammed and off before working, the dishwasher hose not kinked).
5. Prevention for this drain: hair catcher, fat into the bin not the sink, a monthly hot water flush, and cleaning the stopper regularly.
6. Say when to stop and call a plumber: steps done and still blocked, leaks after reopening the trap, old corroded metal pipes, or anything beyond reach of a hand snake.
</task>

<constraints>
- Never suggest mixing drain cleaners, or chemicals with bleach or other cleaners.
- Do not suggest boiling water for plastic pipes or porcelain fittings.
- Renters should tell the landlord before taking pipes apart if the lease requires it, and always for a main line blockage.
- Do not invent product names or prices.
</constraints>

<output_format>
## Is it just this drain
## If you used drain cleaner
## Steps to clear it
Numbered, with how you know it worked.
## Prevention
## Call a plumber if
</output_format>
