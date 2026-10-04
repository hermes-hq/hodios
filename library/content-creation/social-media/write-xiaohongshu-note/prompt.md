---
schema: 1
id: write-xiaohongshu-note
kind: prompt
title: 小红书笔记
description: "写一篇小红书图文笔记：标题备选、封面大字、分段正文、真实体验细节、话题标签和评论区互动引导，避开极限词、功效宣称和站外引流，合作内容如实标注。"
category: social-media
version: 1.0.0
status: incubating
lang: zh-CN
stage: [build]
role: [content-creator, founder]
requires: [none]
inputs: [topic, notes]
output: [post, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [xiaohongshu, lifestyle-notes, sponsored-disclosure, china]
pairs_with:
  prompts: [write-taobao-product-detail-page, write-wechat-official-account-article]
args:
  - name: topic
    description: 笔记写什么，以及你的真实经历和细节：用了多久、花了多少钱、在哪里、怎么用、踩过什么坑、和之前用的有什么不同。细节越具体，笔记越可信。
    type: text
    required: true
  - name: account_type
    description: 账号类型。personal = 个人博主，第一人称分享；brand = 品牌或店铺官方号，语气专业但不端着。
    type: enum
    enum: [personal, brand]
    default: personal
  - name: sponsored
    description: 是否是商业合作或收到了品牌的产品、费用。true 时必须在笔记中标注合作并走平台的合作报备流程。
    type: boolean
    default: false
output_contract:
  format: markdown
  sections: [标题备选, 封面文字, 正文, 话题标签, 评论区互动, 合规自查]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "第一版。"}
---
<context>
你帮创作者和品牌写小红书笔记。小红书用户来这里找「真实的人的真实经验」，搜索和推荐都会把有用、具体、可收藏的笔记推上去。一篇笔记在信息流里先被看到的是封面和标题，所以封面大字和标题负责点击，正文负责收藏和评论。

平台写法与规则要点：
- 标题有字数上限（目前为二十个字左右，以发布页提示为准），要具体：人群 + 场景 + 结果或数字，例如「小个子通勤｜一周五套不重样」。
- 封面文字是大字，一般不超过十来个字，和标题互补而不是重复。
- 正文分短段，可以用少量表情符号做小标题或列表符号，但不要每句都加。正文有字数上限（以发布页为准），常见笔记几百字即可。
- 「真实体验细节」最打动人：时间、价格、具体用法、缺点和适合谁、不适合谁。
- 平台限制：不得使用「最」「第一」「全网最低」等极限词，不得做医疗或功效宣称，不得留微信号、二维码、外链等站外引流信息。商业合作需要通过平台的合作渠道报备，并在笔记中如实标注。规则会更新，以平台社区规范为准。
</context>

<task>
根据下面的内容写一篇小红书笔记。

<topic>
{{topic}}
</topic>

账号类型：{{account_type}}
是否商业合作：{{sponsored}}

1. 如果内容里没有任何亲身经历或具体信息（只有一个产品名或一句话），列出需要补充的细节（用了多久、价格、使用场景、优缺点），然后停止。
2. 写五个标题备选，标注字数，角度各不相同（数字清单、对比前后、避坑、人群场景、问题式）。
3. 写封面大字两个方案，并用一句话说明封面图怎么拍或怎么排版。
4. 写正文：开头两行直接给结论或最抓人的细节；中间按步骤、清单或优缺点组织；保留缺点和不适合的人群；结尾一句自然的互动问题。账号类型为 personal 时用第一人称分享口吻；为 brand 时以官方身份说话，不假装是普通用户。
5. 如果是否商业合作为 true，在正文开头或结尾写明合作关系，并提醒通过平台合作渠道报备；如果为 false，不要写成像广告的语气。
6. 给出八到十个话题标签，混合大词和精准长尾词。
7. 写两条评论区置顶或回复的引导语。
8. 检查全文：删掉极限词、功效宣称和站外联系方式，确认没有编造的体验。
</task>

<constraints>
- 不编造体验、价格、效果或「姐妹们都说好」之类的评价；资料没有的细节不写。
- brand 账号不得假扮素人，素人号的合作内容不得隐藏合作关系。
- 不写诱导互动的承诺（如「评论就送」），除非用户给出了真实的活动规则。
- 语言自然口语化，像朋友分享，少用营销套话。
</constraints>

<output_format>
## 标题备选
五个标题，每个后面标注字数。

## 封面文字
两个方案和封面拍摄或排版建议。

## 正文
可直接发布的正文。

## 话题标签
标签列表。

## 评论区互动
两条置顶或回复引导语。

## 合规自查
删改过的词语或宣称、合作标注情况，以及需要作者确认的细节。没有则写「无」。
</output_format>
