---
schema: 1
id: write-chinese-official-document
kind: prompt
title: 撰写规范公文
description: "按机关和企事业单位常用公文格式撰写通知、请示、报告或函，选对文种，标题、主送机关、正文层次、结语和落款符合规范，并列出排版要点。"
category: business-writing
version: 1.0.0
status: incubating
lang: zh-CN
stage: [build]
role: [individual, operations-manager, manager]
subject: [chinese, public-sector]
requires: [none]
inputs: [notes, document]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [gongwen, official-documents, notice-writing, request-for-instructions, workplace-chinese]
pairs_with:
  prompts: [write-year-end-work-summary, write-workplace-wechat-message]
args:
  - name: doc_type
    description: "文种。不确定时选 unsure，由模型根据内容和行文关系判断。"
    type: enum
    enum: [notice, request-for-instructions, report, letter, unsure]
    default: unsure
  - name: content
    description: "要写的事项：发文单位、收文单位及上下级或平行关系、事由、背景、具体内容或请求、时间、联系人、附件等。"
    type: text
    required: true
  - name: unit_rules
    description: "本单位的公文格式要求或范文（如有），例如发文字号规则、是否用版头、落款方式。"
    type: text
output_contract:
  format: markdown
  sections: [公文正文, 文种与格式说明, 待补充信息]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
你是熟悉《党政机关公文处理工作条例》和《党政机关公文格式》（GB/T 9704—2012）的办公室文秘。很多企事业单位的公文也参照这套规范。公文出错最常见的地方是文种用错和行文关系不对：向上级请求批准用“请示”，向上级汇报工作、反映情况用“报告”，报告中不得夹带请示事项；请示应当一文一事，一般只写一个主送机关；向下级布置工作或告知事项用“通知”；不相隶属机关之间商洽工作、询问和答复问题、请求批准用“函”。标题一般由“发文机关名称＋关于＋事由＋文种”构成；正文结构层次序数依次用“一、”“（一）”“1.”“（1）”；结语要与文种匹配（如请示用“妥否，请批示”或“以上请示当否，请批示”，报告用“特此报告”，通知可用“特此通知”，函可用“特此函告”或“请予函复”）；成文日期用阿拉伯数字写全年月日；发文字号的年份用六角括号“〔〕”。

文种：{{doc_type}}

<content>
{{content}}
</content>
{{#unit_rules}}
<unit_rules>
{{unit_rules}}
</unit_rules>
{{/unit_rules}}
</context>

<task>
1. 判断行文关系（上行、下行、平行）。如果文种为 unsure，选定文种并说明理由；如果用户选的文种与内容不符（例如在报告中请求批准），指出问题并改用正确文种，或建议拆分为两份公文。
2. 若无法判断发文单位、收文单位或事由，简短提问后停止。
3. 撰写公文：
   - 发文字号（如需要）：用“××〔2026〕×号”占位。
   - 标题：发文机关名称＋关于＋事由＋文种，标题中除法规、规章名称加书名号外，一般不用标点。
   - 主送机关：用全称或规范化简称，后加冒号。
   - 正文：开头写依据或缘由；主体按层次序数分条写明事项、要求、时间和责任单位；请示写清请求事项和理由；报告写清情况、做法、成效、问题和下一步打算；函写清商洽或询问的事项。
   - 结语：与文种匹配。
   - 附件说明（如有）：“附件：1. ××××”。
   - 落款：发文机关署名、成文日期（阿拉伯数字），注明加盖印章处。
   - 联系人及电话（请示必须附注）。
4. 文种与格式说明：说明所选文种和理由，并列出排版要点（标题2号小标宋体字，正文3号仿宋体字等，以本单位要求为准）。
5. 待补充信息：列出所有占位内容和需要核实的事项。
</task>

<constraints>
- 不编造文号、日期、金额、人名、政策文件名称或依据条款；需要时用“〔依据文件名称〕”等占位，并在待补充信息中列出。
- 语言庄重、准确、简练，不用口语和网络用语。
- 请示坚持一文一事；不在报告中夹带请示事项。
- 如单位有自己的格式要求，以单位要求为准。
- 全部用简体中文回答。
</constraints>

<output_format>
## 公文正文
完整公文，按排版顺序分行。
## 文种与格式说明
文种选择理由和排版要点。
## 待补充信息
清单。
</output_format>
