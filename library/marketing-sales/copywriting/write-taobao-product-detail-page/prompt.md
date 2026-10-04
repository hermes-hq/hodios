---
schema: 1
id: write-taobao-product-detail-page
kind: prompt
title: 电商详情页文案
description: "为淘宝、天猫、京东等电商平台策划商品详情页：按屏排列卖点顺序，写出每屏文案和拍摄说明，并整理参数表、信任要素、常见问题和广告法违禁词自查。"
category: copywriting
version: 1.0.0
status: incubating
lang: zh-CN
stage: [build]
role: [founder]
subject: [ecommerce]
requires: [none]
inputs: [spec, text]
output: [copy, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [taobao, product-detail-page, ecommerce-copy, china]
pairs_with:
  prompts: [write-xiaohongshu-note, write-live-commerce-script]
args:
  - name: product
    description: 商品是什么：品牌、型号、材质、规格尺寸、功能、使用方法、包装清单、已有的检测报告或认证、售后政策，以及和同类商品相比真正的不同点。
    type: text
    required: true
  - name: target_buyer
    description: 主要买家是谁、在什么场景下买（例如「25-35岁一线城市租房上班族，给小厨房添置」）。
    type: string
    required: true
  - name: price_band
    description: 售价和所在价格带（例如「129元，中端」）。选填，用于决定卖点侧重和信任要素的多少。
    type: string
output_contract:
  format: markdown
  sections: [卖点排序, 分屏策划, 参数表, 常见问题, 违禁词与宣称自查, 待补充信息]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "第一版。"}
---
<context>
你为中国电商平台的商家策划商品详情页（详情页）。买家在手机上从主图点进来，一屏一屏往下滑，平均只看前几屏就决定加购、问客服还是离开。所以详情页不是说明书，而是按买家的疑虑顺序排好的一组画面加短文案。

好的详情页通常这样排：
- 首屏：一句话说清「这是什么、凭什么选它」，配核心场景图。
- 痛点或场景屏：买家在什么情况下需要它。
- 卖点屏：一屏只讲一个卖点，按「特点 - 带来的好处 - 证据」写（FAB），证据可以是实拍、对比测试、数据或检测报告。
- 细节屏：材质、做工、接口等特写。
- 参数与尺码屏：表格，方便比较。
- 信任屏：资质证书、检测报告、品牌故事、售后保障。
- 包装清单与常见问题：减少咨询和退货。

手机端以竖向长图为主，每屏文字要少，大字标题加一两行小字。合规方面，《广告法》禁止使用「最」「第一」「顶级」「国家级」等绝对化用语，功效和数据宣称必须有依据；食品、化妆品、保健类商品不能宣称疗效。平台规则和监管口径会更新，以平台后台最新规则为准。
</context>

<task>
为下面的商品策划详情页。

<product>
{{product}}
</product>

目标买家：{{target_buyer}}
{{#price_band}}价格带：{{price_band}}{{/price_band}}

1. 如果缺少商品是什么、核心规格或真正的差异点，用一条消息列出需要补充的信息，然后停止。
2. 站在目标买家的角度，列出他下单前最担心的三到五个问题，据此排出卖点顺序，每个卖点说明理由。
3. 写分屏策划：每屏写目的、主标题、副文案和画面或拍摄说明（拍什么、怎么拍、需要哪种道具或对比）。一般八到十二屏，价格越高，信任和细节屏越多。
4. 整理参数表，只用商品资料里的数据，没有的写「待补充」。
5. 写五到八条常见问题和回答，覆盖尺寸是否合适、怎么用、怎么清洁保养、发货与售后。
6. 逐条检查文案：去掉绝对化用语和没有依据的功效或数据宣称，列出需要商家提供证据的地方。
</task>

<constraints>
- 不编造数据、测试结果、销量、好评或证书。没有依据的数字一律不写，改成「待提供检测报告」之类的提示。
- 不贬低或点名竞品；对比只和「普通款」「旧款」做，而且要有实测依据。
- 文案短而具体：主标题一般不超过十二个字，副文案一到两行，用买家的话而不是行业术语。
- 售后承诺（如七天无理由退货、质保年限）只写商家资料中给出的内容。
</constraints>

<output_format>
## 卖点排序
买家的主要疑虑，以及对应的卖点顺序和理由。

## 分屏策划
表格：屏序 | 目的 | 主标题 | 副文案 | 画面/拍摄说明。

## 参数表
表格：项目 | 参数（缺失的写「待补充」）。

## 常见问题
问答列表。

## 违禁词与宣称自查
已删改的词语或宣称及原因，以及需要商家提供证明的宣称。

## 待补充信息
需要商家补充的资料。没有则写「无」。
</output_format>
