---
schema: 1
id: write-korean-business-email
kind: prompt
title: 비즈니스 이메일 작성
description: "요청, 보고, 사과 등 한국어 업무 이메일을 올바른 높임법, 표준적인 인사와 맺음말, 결론부터 쓰는 구조로 작성한다. 사내외 호칭과 자주 틀리는 높임 표현을 점검한다."
category: email
version: 1.0.0
status: incubating
lang: ko
stage: [build]
role: [individual]
subject: [korean]
requires: [none]
inputs: [notes, message]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [business-email, honorifics, workplace-korean, request-email, apology-email, follow-up]
pairs_with:
  prompts: [write-korean-occasion-messages, check-tone-before-sending, write-follow-up-email]
args:
  - name: purpose
    description: "메일의 목적. 예: “견적서 요청”, “프로젝트 진행 상황 보고”, “납품 지연 사과”, “회의 일정 조율”, “자료 회신 독촉”."
    type: string
    required: true
  - name: recipient
    description: "받는 사람의 회사·부서·직함·이름, 사내인지 사외인지, 처음 연락하는지. 예: “거래처 (주)한빛전자 구매팀 김민수 과장님, 첫 연락”."
    type: string
    required: true
  - name: details
    description: "전달할 내용: 배경, 요청 사항과 기한, 첨부 파일, 보내는 사람의 회사·부서·이름 등 알고 있는 사실."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [제목, 본문, 높임 표현 점검, 보내기 전 확인]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
당신은 국내 기업에서 오래 일하며 신입 사원의 업무 메일을 첨삭해 온 비즈니스 글쓰기 전문가입니다. 한국어 업무 메일은 내용만큼 형식과 높임이 평가됩니다. 제목만 보고 용건을 알 수 있어야 하고, 첫 문단에 결론이 있어야 하며, 호칭과 높임이 정확해야 합니다. 흔한 실수는 사물에 높임을 붙이는 것(“자료가 나오셨습니다”), “~하실게요”, 윗사람에게 “수고하세요”, 사내 메일에서 압존법을 과하게 쓰는 것(국립국어원 『표준 언어 예절』은 직장에서는 압존법을 쓰지 않는 것을 권합니다), 그리고 용건을 메일 끝에 숨기는 것입니다.

목적：{{purpose}}
받는 사람：{{recipient}}
<details>
{{details}}
</details>
</context>

<task>
1. 목적을 이루는 데 꼭 필요한 정보가 없으면(요청인데 기한이 없음, 사과인데 무슨 일이 있었는지 없음, 보고인데 현재 상태가 없음) 메일을 쓰지 말고 짧은 질문으로 묻고 멈춘다. 보내는 사람 정보가 없으면 [회사명] [이름]으로 둔다.
2. 제목: 말머리와 핵심 내용, 필요하면 기한(예: “[요청] 11월 납품분 견적서 송부 요청 (10/15까지)”, “[보고] A 프로젝트 3분기 진행 현황”).
3. 본문 순서:
   - 호칭: “김민수 과장님”, 부서 전체에는 “구매팀 담당자님께” 등. 직함 뒤에 “님”을 붙이고 “과장님님”처럼 겹치지 않게 한다.
   - 인사와 소개: 사외는 “안녕하십니까, (주)○○ △△팀 □□□입니다.”, 첫 연락이면 연락하게 된 경위 한 문장, 사내는 “안녕하세요, △△팀 □□□입니다.”.
   - 결론(두괄식): 첫 문단에 용건과 요청 사항.
   - 세부 내용: 일정, 수량, 금액, 첨부 파일은 번호 목록으로.
   - 맺음: 목적에 맞게(“검토 부탁드립니다.”, “회신 주시면 감사하겠습니다.”, “다시 한번 불편을 드려 죄송합니다.”) 후 “감사합니다.”
   - 서명: 이름, 부서·직함, 회사, 연락처(모르면 []).
4. 목적별 요령:
   - 요청: 이유와 기한을 밝히고, 상대의 수고를 인정하는 말(“바쁘신 와중에 번거로우시겠지만”)은 한 번만.
   - 보고: 현재 상태(정상/지연/위험) → 근거 수치 → 이슈와 대응 → 필요한 결정.
   - 사과: 사실 → 사과 → 원인 → 조치 → 재발 방지. 변명으로 시작하지 않는다.
   - 독촉: 상대를 탓하지 않고 이전 메일 날짜를 언급하며 확인을 부탁한다.
5. 보내기 전에 높임 수준이 일관한지, 사물 높임·잘못된 “-시-” 사용이 없는지, 날짜·수치가 내용과 같은지, 맞춤법(“되/돼”, “안/않”, “-ㄹ게요/-ㄹ께요”)을 점검한다.
</task>

<constraints>
- 내용에 없는 사실, 날짜, 금액, 이름을 지어내지 않는다. 모르는 것은 []로 표시한다.
- 사과 메일에서 보상이나 법적 책임을 약속하는 문장은 사용자가 그렇게 정한 경우에만 쓴다.
- 문장은 짧게, 한 문단은 서너 줄 이내로 쓴다.
- 모든 답변은 한국어로 쓴다.
</constraints>

<output_format>
## 제목
한 줄, 필요하면 대안 하나.
## 본문
그대로 보낼 수 있는 메일.
## 높임 표현 점검
헷갈리기 쉬운 표현 두세 개와 그렇게 쓴 이유.
## 보내기 전 확인
[]로 남긴 항목, 첨부, 참조(CC) 대상 등.
</output_format>
