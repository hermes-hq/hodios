---
schema: 1
id: write-live-commerce-script
kind: prompt
title: 直播带货脚本
description: "写一场按分钟排好的直播带货脚本：开场暖场、逐款讲品、价格揭晓、互动与福利、合规话术和收尾返场，并给助播、场控和上架动作，不用虚假稀缺和违规宣称。"
category: video
version: 1.0.0
status: incubating
lang: zh-CN
stage: [build]
role: [content-creator, sales-rep]
subject: [ecommerce]
requires: [none]
inputs: [spec, notes]
output: [script, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [livestream-selling, live-commerce, run-of-show, china]
pairs_with:
  prompts: [plan-livestream-run-of-show, write-taobao-product-detail-page]
args:
  - name: products
    description: 本场要卖的商品，每款写清：名称、规格、日常售价和直播价、库存数量、核心卖点及依据、赠品、适合人群、售后政策。如有讲品顺序或主推款也请注明。
    type: text
    required: true
  - name: minutes
    description: 直播总时长（分钟）。
    type: number
    default: 60
  - name: host_style
    description: 主播风格，例如「亲切自然」「专业测评」「热闹搞笑」「温柔慢节奏」。
    type: string
    default: 亲切自然
output_contract:
  format: markdown
  sections: [直播总览, 分钟流程表, 讲品话术卡, 互动与福利规则, 合规自查, 待确认信息]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "第一版。"}
---
<context>
你为直播带货团队写脚本，团队通常有主播、助播和场控（中控）。直播间的观众随进随出，平均停留很短，所以脚本要一直做三件事：留人（让新进来的人知道现在在讲什么、有什么福利）、讲品（把一个卖点讲透并现场演示）、转化（给出清楚的价格和下单指令）。

一款商品常见的讲品循环：抛出场景或痛点 - 上手展示 - 演示一两个核心卖点 - 讲清规格和适合谁 - 说明日常价与直播价 - 上链接、讲下单方式 - 回答弹幕问题 - 过渡到下一款。主推款可以在后半场返场一次。

合规是硬要求：《广告法》禁止「最」「第一」「全网最低」等绝对化用语；划线价或「原价」必须是真实成交过的价格，不能先涨后降；不得虚构库存或倒计时（「只剩最后三单」必须属实）；食品、化妆品、保健品不能宣称疗效；抽奖和福利的规则必须事先讲清并兑现。平台规则会更新，以平台最新规则为准。
</context>

<task>
为下面的商品写一场 {{minutes}} 分钟的直播脚本，主播风格：{{host_style}}。

<products>
{{products}}
</products>

1. 如果缺少直播价、库存或任何一款商品的核心卖点，用一条消息列出缺什么，然后停止。
2. 规划总览：讲品顺序（引流款、主推款、利润款的安排）、每款时长、福利节点和返场安排，总时长等于 {{minutes}} 分钟。
3. 写分钟流程表：每个时间段写环节、主播话术要点、助播或场控动作（上架链接、改价、放福利、切画面），话术写成主播能直接说的口语。
4. 为每款商品写一张讲品话术卡：开场一句、演示步骤、三个以内的卖点及依据、价格说明、下单指令、常见弹幕问题和回答。
5. 每隔几分钟安排一次留人话术和互动（例如扣数字、点赞、提问），福利只用资料中给出的。
6. 写收尾：返场主推款、感谢、预告下一场。
7. 逐句检查：删掉绝对化用语、疗效宣称、虚构的稀缺和不真实的原价，确认库存说法和资料一致。
</task>

<constraints>
- 价格、库存、赠品、售后只用资料里的数据；没有给出的写成「待确认」，不要编。
- 不写「最后三单」「马上下架」之类的稀缺话术，除非资料中的库存和时间真的如此。
- 不贬低竞品或其他主播；对比只用「普通款」和实际演示。
- 话术口语化、短句，适合说出来；符合 {{host_style}} 的风格，但不靠吼叫和催促来逼单。
</constraints>

<output_format>
## 直播总览
讲品顺序、每款时长、福利节点、返场安排。

## 分钟流程表
表格：时间 | 环节 | 主播话术要点 | 助播/场控动作。

## 讲品话术卡
每款一张：开场、演示、卖点与依据、价格说明、下单指令、弹幕问答。

## 互动与福利规则
每个福利的参与方式、名额和兑现方式。

## 合规自查
已删改的话术及原因。

## 待确认信息
需要团队补充或确认的数据。没有则写「无」。
</output_format>
