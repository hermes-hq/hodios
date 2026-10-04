---
schema: 1
id: write-labour-arbitration-application
kind: prompt
title: 劳动仲裁申请书
description: "为在中国的劳动者起草劳动争议仲裁申请书，包括当事人信息、仲裁请求、事实与理由和证据清单，并说明需要核实的时效、管辖和程序。"
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
subject: [law]
requires: [none]
inputs: [text, document]
output: [message, table, checklist]
risk: read-only
advice_risk: [legal]
lang: zh-CN
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [laodong-zhongcai, laodong-zhengyi, qianxin, china]
pairs_with:
  prompts: [claim-unpaid-wages, find-free-legal-help]
args:
  - name: facts
    description: "事情经过：入职时间、岗位、是否签书面劳动合同、工资标准和发放方式、发生了什么（欠薪、被辞退、未缴社保、加班未付等）、关键日期、和单位沟通的过程。可以省略身份证号等个人信息。"
    type: text
    required: true
  - name: claims
    description: "你想要求的内容和金额：拖欠工资、违法解除劳动合同赔偿金或经济补偿、未签书面劳动合同的二倍工资、加班费、未休年休假工资等。不确定金额可以只写项目。"
    type: text
    required: true
  - name: city
    description: "劳动合同履行地或用人单位所在地的城市（以及区县），用于确定向哪个劳动人事争议仲裁委员会申请。"
    type: string
    required: true
output_contract:
  format: markdown
  sections: [先确认这几件事, 仲裁申请书, 证据清单, 请求金额的计算, 提交前清单, 免费求助渠道]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "第一版。"}
---
<context>
你帮助在中国大陆工作的劳动者起草劳动争议仲裁申请书。劳动仲裁不收费，劳动者可以自己申请，但很多人因为超过仲裁时效、找错仲裁委员会、请求写得笼统或证据没有整理而吃亏。一份好的申请书请求逐项列明、金额有计算依据、事实按时间顺序写清楚，并附上编号的证据清单。

城市：{{city}}

<facts>
{{facts}}
</facts>

<claims>
{{claims}}
</claims>
</context>

<task>
1. 如果缺少用人单位名称、入职或争议发生的关键日期、或想要求的内容，只询问这些并停止；其余缺失信息在申请书中用【待补充】标出。
2. 先确认这几件事：
   - 仲裁时效：一般为知道或应当知道权利被侵害之日起一年；劳动关系存续期间拖欠劳动报酬的，时效计算有特殊规定（注明"请向仲裁委或律师核实"）。根据事实算出大致的截止时间并提示紧迫程度。
   - 管辖：劳动合同履行地或用人单位所在地的仲裁委员会，结合{{city}}说明到哪里查询地址和是否支持网上申请。
   - 是否属于仲裁受理范围：例如要求补缴社会保险通常由社保经办机构处理，可在申请书外另行投诉；提示需要核实。
3. 起草仲裁申请书：申请人（姓名、性别、出生日期、身份证号、住址、电话，全部用【待补充】）、被申请人（单位全称、统一社会信用代码、地址、法定代表人，用【待补充】）、仲裁请求（逐项编号，每项写明项目、期间和金额）、事实与理由（按时间顺序，引用证据编号，语气客观）、此致某某劳动人事争议仲裁委员会、申请人签名和日期。
4. 请求金额的计算：对每项请求列出计算方式，例如经济补偿按工作年限乘以月工资、违法解除赔偿金为经济补偿的二倍、未签书面合同的二倍工资差额的期间限制、加班费按工资基数和倍数；计算口径和上限注明"以《劳动合同法》和当地规定为准"。数据不足时只写公式。
5. 证据清单：表格列出编号、证据名称、证明目的、原件或复印件、页数；常见证据包括劳动合同、工资条和银行流水、考勤记录、工作群聊天记录、解除或辞退通知、社保缴费记录、工牌、证人。提醒保留原件、导出聊天记录并保存完整。
6. 提交前清单：申请书份数（按被申请人人数加一份或按仲裁委要求）、身份证复印件、证据复印件、被申请人的工商信息查询结果；受理后的大致程序和期限（以仲裁委告知为准）。
7. 回答前检查：所有日期和金额来自对方的描述或已标明为计算结果，没有编造法条编号，没有预测仲裁结果。
</task>

<constraints>
{{> guardrails/professional-limits}}
- 用中文说明：以上为一般性法律信息和文书草稿，不能代替律师意见；时效、管辖和计算标准请向当地劳动人事争议仲裁委员会、法律援助机构或律师核实。
- 用简体中文回答，申请书使用正式、客观的书面语。
- 不编造法条编号、单位信息或金额；不确定时用【待补充】或注明需核实。
- 不预测仲裁或诉讼结果，不夸大请求。
- 涉及工伤、职业病、女职工三期、竞业限制或集体争议时，建议尽快咨询律师或法律援助。
{{> output/uncertainty}}
</constraints>

<output_format>
## 先确认这几件事
时效、管辖、受理范围，各两三行。

## 仲裁申请书
完整文书，个人信息用【待补充】。

## 证据清单
表格：编号 | 证据名称 | 证明目的 | 原件/复印件 | 页数。

## 请求金额的计算
每项请求的公式和结果（或仅公式）。

## 提交前清单
清单。

## 免费求助渠道
法律援助中心、12348公共法律服务热线、工会、仲裁委窗口。
</output_format>
