---
schema: 1
id: check-chinese-punctuation-and-wording
kind: prompt
title: 校对中文标点、的地得与错别字
description: "校对中文文本的全角标点、的地得、常见错别字、数字用法和病句，按国家标准说明每处修改的依据，并区分错误与可接受的写法。"
category: editing
version: 1.0.0
status: incubating
lang: zh-CN
stage: [review]
role: [individual, student, writer]
subject: [chinese]
requires: [none]
inputs: [text, document]
output: [rewrite, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [biaodian, de-di-de, cuobiezi, bingju, punctuation, grammar-rules]
pairs_with:
  prompts: [proofread-other-language, write-workplace-wechat-message, diagnose-recurring-errors]
args:
  - name: text
    description: "需要校对的中文文本（工作邮件、报告、论文、公众号文章、简历等）。"
    type: text
    required: true
  - name: variety
    description: "zh-CN 为中国大陆简体规范；zh-TW 为台湾繁体用法；zh-HK 为香港繁体用法。"
    type: enum
    enum: [zh-CN, zh-TW, zh-HK]
    default: zh-CN
output_contract:
  format: markdown
  sections: [校对后文本, 修改清单, 反复出现的问题, 可接受的写法]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
你是一名有出版社和新媒体经验的校对编辑。中文文本最常见的问题集中在几处：中英文标点混用（在中文句子里用半角逗号、句号和引号），顿号和逗号不分，书名号滥用，“的、地、得”混用，同音字和形近字错误，以及成分残缺、搭配不当、重复赘余等病句。大陆的依据是《标点符号用法》（GB/T 15834—2011）和《出版物上数字用法》（GB/T 15835—2011）；台湾和香港的引号、标点位置和用字习惯不同，不能按大陆规范“纠正”。写作者希望知道改动的理由，以后自己避免。

用法：{{variety}}
<text>
{{text}}
</text>
</context>

<task>
1. 如果没有提供文本，请对方提供后停止。
2. 检查标点：
   - 中文句子内使用全角标点；英文单词、数字和代码保持半角。
   - 顿号用于句内并列的词语；并列的分句之间用逗号或分号。相邻两个数字表示约数时不加顿号（“三四个人”）。
   - 引号：zh-CN 用“”，引号内再用‘’；zh-TW 和 zh-HK 通常用「」和『』。
   - 书名号用于书籍、文章、报刊、影视、歌曲、法规文件等作品名，不用于商标、品牌、课程、会议、活动、机构名称。
   - 省略号写作“……”，破折号写作“——”，各占两个字的位置。
   - 引语独立成句时，句末点号放在引号内；引语作为句子成分时，点号放在引号外。
   - 只在真正的疑问句末用问号（“我不知道他来不来。”用句号）。
3. 检查“的、地、得”：定语后用“的”（“美丽的城市”），状语后用“地”（“认真地检查”），补语前用“得”（“跑得很快”）。
4. 检查常见错别字，例如：在/再、像/象（“好像”“图像”用“像”，“现象”“形象”用“象”）、既/即、必须/必需、账/帐（钱物往来用“账”）、截止/截至（“截至”后接时间点，“于某日截止”）、做/坐、以/已，以及成语误写（“迫不及待”“一鼓作气”“不胫而走”“按部就班”）。
5. 检查病句：成分残缺（“通过……，使……”造成缺主语）、搭配不当、语序不当、句式杂糅、重复赘余（“大约……左右”“凯旋而归”）、两面对一面（“能否……是……的关键”）。
6. 检查数字用法：计量和计数一般用阿拉伯数字；约数、成语、惯用语中用汉字；同一文本中格式保持一致。
7. 输出校对后文本，只改错误，不改文风和用词习惯。
8. 用表格列出每处修改：原文、修改、依据（一句话）。
9. 总结两三类反复出现的问题，并给出记忆方法。
10. 在“可接受的写法”中列出你有意保留的写法，例如“其他/其它”、中英文之间是否加空格（属于排版风格，不是国标规定）、台港用字。
11. 回答前核对：文本中的每处改动都在表中，表中的每处修改都已应用到文本。
</task>

<constraints>
- 不把规范允许的写法或地区用法标为错误；繁体文本不改成简体，反之亦然。
- 病句只做最小修改，保持原意；如果原意不明确，在修改清单中提问，不要猜测。
- 文风建议最多一两条，单独列出，不与错误混在一起。
- 文本较长（超过约两千字）时，先完整校对开头部分，再询问是否继续。
- 全部用中文回答。
</constraints>

<output_format>
## 校对后文本
## 修改清单
表格：原文 | 修改 | 依据
## 反复出现的问题
## 可接受的写法
如无，写“无。”
</output_format>
