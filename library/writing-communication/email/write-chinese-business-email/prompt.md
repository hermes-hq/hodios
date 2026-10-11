---
schema: 1
id: write-chinese-business-email
kind: prompt
title: 撰写正式中文商务邮件
description: "撰写正式的中文商务邮件，主题、称呼、敬语、正文结构和结尾语符合对外合作与内部汇报的规范，适用于请求、确认、催办、致歉、婉拒和工作汇报。"
category: email
version: 1.0.0
status: incubating
lang: zh-CN
stage: [build]
role: [individual, manager, sales-rep]
subject: [chinese]
requires: [none]
inputs: [notes, message]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [shangwu-youjian, formal-chinese, business-etiquette, honorifics, work-report]
pairs_with:
  prompts: [write-workplace-wechat-message, write-year-end-work-summary, write-follow-up-email]
args:
  - name: mudi
    description: "邮件目的：qingqiu（请求、询问）、queren（确认、通知）、cuiban（催办、跟进）、zhiqian（致歉）、wanju（婉拒）、huibao（向上级汇报）。"
    type: enum
    enum: [qingqiu, queren, cuiban, zhiqian, wanju, huibao]
    default: qingqiu
  - name: shoujianren
    description: "收件人及关系：姓名、职务、单位，对外还是对内，是否第一次联系，是否上级（例如“合作方华信科技 采购部 王经理，第一次邮件联系”）。"
    type: string
    required: true
  - name: neirong
    description: "要表达的内容和事实：背景、具体请求、日期和期限、金额、订单或合同编号、附件，以及发件人的单位、部门、姓名。可用中文、英文或混合书写。"
    type: text
    required: true
output_contract:
  format: markdown
  sections: [邮件主题, 邮件正文, 用语说明, 发送前检查]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
正式的中文商务邮件和微信、钉钉消息不同：它常被转发、存档，甚至作为合作依据，所以既要礼貌，又要把事情一次说清。常年处理对外合作的人都知道几条规矩：主题要能单独看懂（“【请确认】10月订单交期调整（10月20日前回复）”），称呼用“姓+职务”（“王经理您好”“尊敬的李总”），第一次联系先用一句话自我介绍；正文先说结论或请求，再给背景和细节，多项内容用编号；期限写具体日期而不是“尽快”；结尾用与目的相符的结束语（“盼复”“如有疑问请随时与我联系”），落款写全单位、部门、姓名和联系方式。常见问题是开头寒暄过长、把要求藏在第三段、口语化（“哈喽”“OK的”）、或在对外邮件里随意承诺赔偿。向上级汇报时，结论先行，再列进展、问题和需要的支持。
</context>

<task>
请撰写一封中文商务邮件。目的：{{mudi}}。收件人：{{shoujianren}}。

<neirong>
{{neirong}}
</neirong>

1. 如果缺少该目的必需的信息（请求：要对方做什么、期限；催办：第一次发送的日期和事项；致歉：发生了什么、影响、补救措施；婉拒：拒绝的是什么；汇报：进展和需要上级决定的事项），先提出最多三个简短问题，然后停止。发件人信息缺失时可用［］占位继续写。
2. 主题：用【】标出类型（如【请求】【请确认】【跟进】【致歉】【汇报】），写清事项，必要时加期限。
3. 称呼：对外用“姓+职务/先生/女士 + 您好”，对高层可用“尊敬的…”；对内按公司习惯用“X总”“X经理”或“各位同事”。
4. 第一次联系时，第一句自我介绍（单位、部门、姓名），第二句说明来意。
5. 正文按目的组织：
   - qingqiu：请求放在开头，说明原因，给出具体期限和所需材料。
   - queren：说明需确认的内容（编号列出），请对方在某日前回复。
   - cuiban：提及上次发送的日期和事项，语气客气，不指责，给出新的期限和原因。
   - zhiqian：先说事实和影响，再致歉（全文一到两次），然后说明原因、补救措施和防范措施。
   - wanju：先感谢，再明确婉拒，简述理由，如有真实可行的替代方案再提出。
   - huibao：结论先行，再分“进展”“问题与风险”“需要您决定或支持的事项”。
6. 结束语与目的匹配（“盼复，谢谢！”“如有任何问题，请随时与我联系。”“再次致歉，感谢您的理解。”），最后是落款：单位、部门、姓名、电话，缺失用［］占位。
</task>

<constraints>
- 全部用简体中文书写，包括说明部分。
- 不编造事实、日期、金额、人名、编号或承诺；缺失信息用［］标出。
- 对外致歉时，除非内容中已明确，不要承诺具体赔偿或法律责任。
- 书面语，避免网络用语和口语；段落简短，每段不超过三四行；正文一般不超过约400字。
- 日期写成“10月20日（周一）”这类明确格式，金额注明币种。
</constraints>

<output_format>
## 邮件主题
一行。
## 邮件正文
称呼、正文、结束语、落款。
## 用语说明
两到四条：称呼、语气、结束语或某个容易用错的表达。
## 发送前检查
占位符、附件、期限、抄送对象。
</output_format>
