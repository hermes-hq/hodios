---
schema: 1
id: plan-music-release
kind: prompt
title: Plan a music release
description: Plans an independent single or EP release with a dated timeline, metadata checklist, playlist pitching, content plan, press outreach, budget and release-week checklist. Use before a release.
category: music
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [artist, marketer]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [music-release, playlist-pitching, pre-save, music-marketing]
pairs_with:
  prompts: [write-artist-bio, write-music-prompt]
args:
  - name: release
    description: What you are releasing (single or EP, track titles, genre), the artist's current audience (followers, monthly listeners, mailing list, local following), the distributor if chosen, and what assets exist (artwork, photos, videos, a music video).
    type: text
    required: true
  - name: release_date
    description: The planned release date, or "flexible" to get a recommended date.
    type: string
    default: flexible
  - name: budget
    description: Total budget for the release campaign, with currency, e.g. "300 GBP", "2,000 USD", "zero".
    type: string
    default: zero
output_contract:
  format: markdown
  sections: [Assumptions, Timeline, Distribution and metadata, Pitching, Content plan, Press and radio, Budget, Release-week checklist, After release]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Independent releases usually fail on timing, not music: the track goes to the distributor a week before release, so there is no time to pitch to editorial playlists, collect pre-saves, brief press or build content, and release day passes in silence. A workable plan starts six to eight weeks out, gets the admin right early (metadata, credits, splits, rights registrations), pitches the music where it can be considered, and spreads promotion across the weeks before and after release day. Small budgets go furthest on assets the artist can reuse (good artwork, short videos) and on targeted outreach, not on services that promise streams.
</context>

<task>
Plan this release:

<release>
{{release}}
</release>

Release date: {{release_date}}
Budget: {{budget}}

1. **Assumptions:** in four lines: single or EP, the audience size you are planning for, the release date (if flexible, recommend a Friday at least six to eight weeks away, since most markets release new music on Fridays, and say why), and the primary goal (new listeners, fan engagement, press, bookings). If the release description lacks the format or anything about the current audience, ask (at most three questions) and stop.
2. **Timeline:** a table counting back from release day, by week (for example week minus 8 to week plus 4), with dated tasks if a date is given. Include: final masters and artwork (3000 by 3000 pixels is the common store requirement; tell the user to check their distributor's specification); delivery to the distributor at least four weeks before release; pitching to editorial playlists through the streaming services' artist tools as soon as the release appears there; pre-save link; announcement; content drops; press and radio outreach; release-day actions; and follow-up.
3. **Distribution and metadata:** a checklist: correct artist name and featured-artist formatting, track titles, ISRC codes for each track and the UPC for the release (usually issued by the distributor), explicit content flag, genre, songwriter and producer credits, split sheet signed by all writers, registering the songs with the performing rights organisation and a publishing administrator or mechanical rights body where the user lives, and neighbouring rights registration for the recording. Name common organisations only as examples (for example PRS, ASCAP, BMI, SOCAN, GEMA) and tell the user to check which apply in their country.
4. **Pitching:** editorial playlist pitch through the streaming services' artist tools (what to write: genre, mood, instruments, story, cultural context, marketing plans; pitch only unreleased music, and submit well ahead, since late pitches may miss editorial review or algorithmic release playlists); independent curators and blogs (how to find relevant ones, a short personalised pitch template); and the artist's own playlists. Warn clearly against paying for guaranteed streams or playlist placements, which can involve fake streams and lead to removed tracks or penalties.
5. **Content plan:** a week-by-week plan for the platforms the audience uses: teaser clips, behind-the-scenes, the story of the song, performance clips, a countdown, release-day post, fan reposts; with formats and frequency the artist can sustain. Prioritise short vertical video, and reuse each asset across platforms.
6. **Press and radio:** local and genre-specific blogs and magazines, community and college or student radio, specialist shows on public radio where they exist, and local press if there is a local angle; a press release outline and when to send it (three to four weeks before release).
7. **Budget:** allocate {{budget}} across artwork, content production, ads (only once there is content worth amplifying), and PR, with a zero-budget version if the budget is zero. Show amounts in the given currency.
8. **Release-week checklist:** day by day, from final checks of links and metadata through release day (post, update bios and links, email list, thank supporters) to the weekend.
9. **After release:** weeks plus 1 to plus 4: follow-up content, live sessions, the next pitch, which metrics to watch (saves, save rate, playlist adds, followers gained, listener locations) and what they tell you.
</task>

<constraints>
- Do not promise stream counts, playlist placements or press coverage; describe what improves the odds.
- Platform tools, deadlines and requirements change. Wherever you state one, tell the user to confirm it in the current documentation of their distributor or the platform.
- Do not recommend buying followers, streams, bots or playlist placements, or anything that breaks platform terms.
- Keep the plan doable for the people involved; flag tasks that need help (a designer, a videographer).
</constraints>

<output_format>
Use the sections in order as level-two headings. Timeline and Budget are tables; Distribution and metadata and Release-week checklist are checkbox lists.
</output_format>
