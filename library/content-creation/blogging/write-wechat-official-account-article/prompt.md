---
schema: 1
id: write-wechat-official-account-article
kind: prompt
title: 公众号文章
description: "写一篇微信公众号文章：多个标题备选和摘要、抓人的开头、清晰的小标题、适合手机阅读的短段落、配图位置和结尾行动引导，不做诱导分享，并列出需核实的事实。"
category: blogging
version: 1.0.0
status: incubating
lang: zh-CN
stage: [build]
role: [content-creator, marketer]
requires: [none]
inputs: [topic, notes]
output: [article, copy]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [wechat, official-account, mobile-reading, china]
pairs_with:
  prompts: [write-xiaohongshu-note, write-article-headlines-and-standfirsts]
args:
  - name: topic
    description: 文章写什么：核心观点、你掌握的素材（案例、数据及来源、亲身经历、采访内容），以及希望读者读完后做什么（关注、留言、报名、购买、转发给需要的人）。
    type: text
    required: true
  - name: audience
    description: 公众号的读者是谁（例如「二三线城市的小学家长」「做跨境电商的中小卖家」）。
    type: string
    required: true
  - name: words
    description: 正文目标字数（汉字）。
    type: number
    default: 1500
output_contract:
  format: markdown
  sections: [标题备选, 摘要, 正文, 排版建议, 事实核查清单]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "第一版。"}
---
<context>
你为微信公众号写文章。读者在手机上从订阅号列表、朋友圈转发或搜一搜进来：标题和封面决定点不点，开头三行决定读不读，中间的节奏决定能不能读完，结尾决定会不会点「在看」、留言或转发。

公众号写作要点：
- 标题有长度上限（以后台提示为准），但手机列表里只显示前面一部分，所以关键信息放前面。好标题具体、有信息量或有反差，不做标题党。
- 摘要显示在分享卡片上，用一两句话补充标题没说的价值。
- 开头直接进入：一个场景、一个问题、一个数字或一句结论，不铺垫背景。
- 手机阅读：每段一般不超过三四行，小标题把文章分成三到五块，关键句可以加粗，配图或分隔用来换气。
- 结尾给一个明确、轻量的行动。
- 平台规则禁止诱导分享和诱导关注（例如「转发才能领取」「集赞送礼」），原创声明只能用于原创内容。规则以微信公众平台运营规范为准。
</context>

<task>
为 {{audience}} 写一篇约 {{words}} 字的公众号文章。

<topic>
{{topic}}
</topic>

1. 如果没有核心观点或任何素材（只有一个泛泛的题目），列出需要作者补充的内容（观点、案例、数据来源、期望读者的行动），然后停止。
2. 写五个标题备选，每个注明角度（数字、反差、问题、场景、利益），并推荐一个。
3. 写一段分享卡片摘要。
4. 写正文：开头三行抓住 {{audience}} 关心的点；用三到五个小标题推进；每个论点配一个具体案例或数据（只用素材中的）；段落短，适合手机；标出建议配图的位置和内容。
5. 写结尾：一句收束全文的观点，加一个轻量的行动引导，不写「转发才能……」之类的诱导话术。
6. 给出排版建议（字号、行距、加粗和配图的使用）。
7. 列出文中所有数据、引语和事实性说法，标明来源是否在素材中，未提供来源的标「需核实」。
</task>

<constraints>
- 不编造数据、案例、专家观点或读者留言；素材里没有的事实不写，或写成需要作者补充的占位。
- 不用标题党：标题承诺的内容正文必须兑现。
- 语言贴近 {{audience}} 的阅读习惯，少用空洞的大词和排比堆砌。
- 字数大致接近 {{words}}，宁可短而扎实，不为凑字数注水。
</constraints>

<output_format>
## 标题备选
五个标题和各自角度，标出推荐的一个。

## 摘要
分享卡片摘要。

## 正文
完整正文，含小标题，配图位置用【配图：说明】标出。

## 排版建议
三到五条。

## 事实核查清单
表格：说法 | 来源（素材中/需核实）。
</output_format>
