---
schema: 1
id: write-community-group-buying-post
kind: prompt
title: 社区团购接龙文案
description: "为社区团购群写一整套接龙文案：开团介绍、价格与规格、接龙格式、截团时间、自提地点，以及截团前、到货、自提和售后的跟进提醒。"
category: sales
version: 1.0.0
status: incubating
lang: zh-CN
stage: [build]
role: [founder]
subject: [ecommerce]
requires: [none]
inputs: [spec, text]
output: [message, post]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [group-buying, wechat-group, neighbourhood-sales, china]
pairs_with:
  prompts: [write-xiaohongshu-note, write-whatsapp-business-service-scripts]
args:
  - name: product
    description: 团购商品：名称、产地或来源、规格（重量、数量）、团购价和单位、保质期和储存方式、真实的卖点（例如当天采摘、冷链到货），以及售后规则（例如坏果拍照包赔）。
    type: text
    required: true
  - name: deadline
    description: 截团时间（例如「周四晚上9点」）。
    type: string
    required: true
  - name: pickup
    description: 到货时间和自提地点、自提时段（例如「周六上午10点到货，3号楼大堂，10点至20点自提」），如可送货上门也请注明。
    type: string
    required: true
output_contract:
  format: markdown
  sections: [开团文案, 接龙模板, 截团前提醒, 到货与自提通知, 未自提提醒, 售后说明, 待确认信息]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "第一版。"}
---
<context>
你为小区团长、社区小店和农产品卖家写团购群文案。社区团购在微信群里进行：团长发开团文案，邻居用「接龙」报名，截团后统一下单，到货后在自提点领取。群里消息多、大家扫一眼就划走，所以文案要一眼看清买什么、多少钱、什么时候截止、去哪里拿。

写法要点：
- 开团文案前三行写清品名、规格和价格、截团时间；后面再写产地、卖点和储存方式。
- 价格写成「单价 / 规格」，例如「29.9元 / 5斤装」，避免买家误会。
- 接龙格式统一，方便团长统计，例如「序号. 楼栋-门牌 姓名 数量」。
- 截团前提醒一到两次就够，太多会被屏蔽或惹邻居反感。
- 到货、自提和未自提提醒要写清时间段和地点；生鲜要提醒尽快领取。
- 售后规则提前写明，邻里之间信任是复购的基础。
- 食品要来源合规，不写「有机」「无公害」「绿色食品」等需要认证的说法，除非有证书。
</context>

<task>
为下面的团购写一整套群文案。

<product>
{{product}}
</product>

截团时间：{{deadline}}
到货与自提：{{pickup}}

1. 如果缺少团购价或规格，用一条消息问清楚后停止。
2. 写开团文案：前三行是品名、「价格 / 规格」、截团时间 {{deadline}}；然后写来源、真实卖点、储存方式和自提安排 {{pickup}}。可以用少量表情符号分隔，但不要满屏。
3. 写接龙模板，给出格式和第一行示例。
4. 写两条截团前提醒：一条提前半天左右，一条截团前一小时左右，语气轻松不催促。
5. 写到货与自提通知，写清地点、时段和需要带什么（例如接龙序号）。
6. 写一条未自提提醒，生鲜要说明放置时间的风险。
7. 写售后说明，只写资料中给出的规则；没有给出的写成需要团长确认的占位。
8. 检查：价格、时间、地点在所有文案里前后一致，没有未经认证的说法。
</task>

<constraints>
- 不编造产地、口感评价、销量或「已经有一百多户订了」之类的数据。
- 不写「最后一天」「错过等一年」等夸张催单话术，除非情况属实。
- 语气像邻居之间说话：亲切、简洁、礼貌。
- 每条文案都适合在手机群聊里一屏读完。
</constraints>

<output_format>
## 开团文案
可直接发群的文案。

## 接龙模板
格式和示例。

## 截团前提醒
两条提醒。

## 到货与自提通知
通知文案。

## 未自提提醒
提醒文案。

## 售后说明
售后规则文案。

## 待确认信息
需要团长确认的内容。没有则写「无」。
</output_format>
