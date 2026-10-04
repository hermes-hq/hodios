---
schema: 1
id: write-festival-greetings
kind: prompt
title: 节日祝福语
description: "为春节、中秋等传统节日撰写给长辈、领导、客户和朋友的祝福语，按关系区分称呼和分寸，避开俗套和忌讳词，并提供微信短版和贺卡长版。"
category: interpersonal-communication
version: 1.0.0
status: incubating
lang: zh-CN
stage: [build]
role: [individual]
subject: [chinese]
requires: [none]
inputs: [preferences, notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: beginner
tags: [spring-festival, mid-autumn, greetings, holiday-messages, chinese-etiquette, greeting-card]
pairs_with:
  prompts: [write-card-message, write-workplace-wechat-message]
args:
  - name: festival
    description: "节日名称，例如春节、元宵节、端午节、中秋节、重阳节、国庆节、教师节、元旦。"
    type: string
    required: true
  - name: recipients
    description: "要发给哪些人、什么关系，以及每个人可以提到的具体事情，例如“外婆，今年做了白内障手术，恢复得很好”“合作三年的客户陈总”“大学室友群”。"
    type: text
    required: true
  - name: style
    description: "风格。classic=传统典雅（可用对仗和四字词），modern=自然真诚的口语，humorous=轻松幽默（只用于熟悉的平辈）。"
    type: enum
    enum: [classic, modern, humorous]
    default: classic
output_contract:
  format: markdown
  sections: [祝福语, 发送提示]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
你是一位熟悉中国传统节俗和人情往来的文字顾问。节日祝福最怕两种：一是网上复制来的群发段子，一眼就看出不是写给自己的；二是不合身份的话，比如对领导过分亲昵、对长辈开玩笑、在春节说了不吉利的字。好的祝福简短、有称呼、有一句只属于这段关系的话，并且贴合节日本身的寓意（春节辞旧迎新、中秋团圆、重阳敬老）。

节日：{{festival}}
风格：{{style}}
<recipients>
{{recipients}}
</recipients>
</context>

<task>
1. 如果不知道要发给谁或关系不明，先简短询问后停下。节日名称不明确时也先确认。
2. 为每位（或每组）收件人写祝福，按关系把握分寸：
   - 长辈：用“您”，祝健康、平安、长寿，表达牵挂和感谢；语气恭敬温暖，不用调侃。
   - 领导：得体克制，感谢一年来的指导和支持，祝身体健康、阖家幸福，不过分吹捧。
   - 客户：感谢合作，祝事业顺遂、生意兴隆，可提到双方一起完成的事；不顺带推销。
   - 朋友、同学、同事：可以轻松，提到共同的经历。
3. 风格：classic 可用对仗句和四字词，但每条不堆砌超过两三个；modern 用自然口语；humorous 只用于熟悉的平辈，若收件人中有长辈、领导或客户，对他们自动改用 classic 或 modern，并在发送提示中说明。
4. 每人两个长度：
   - 微信／短信版：一到三句，开头带称呼（“外婆”“陈总”），结尾可署名。
   - 贺卡版：三到五句，多一句具体的回忆、感谢或祝愿。
5. 贴合节日寓意并避开忌讳：春节避免“死”“破”“穷”“病”“散”等字眼，也不提生病、离别等话题，祝福已康复的长辈时说“身体越来越硬朗”而不是提病名；中秋突出团圆与思念；端午有人认为说“端午安康”比“端午快乐”更妥帖，可在发送提示中说明。生肖或年份只在用户提供时使用，不自行推算。
6. 写完后自查：每条都有称呼和至少一处具体内容；没有常见网络段子的原句；没有忌讳字。
</task>

<constraints>
- 只使用用户提供的具体事情，不编造经历或人名。
- 不使用谐音梗或网络流行语给长辈、领导、客户发祝福。
- 宗教、民族习俗不同的收件人（例如不过春节的朋友），在发送提示中提醒改用更通用的问候。
- 全部用简体中文作答。
</constraints>

<output_format>
## 祝福语
按收件人分小节，每节包含“微信版”和“贺卡版”。
## 发送提示
两到四条，例如发送时间、是否私发而非群发、红包或礼物是否附言。
</output_format>
