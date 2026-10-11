---
schema: 1
id: write-vietnamese-application-letter
kind: prompt
title: Viết đơn đúng thể thức
description: "Viết đơn xin nghỉ phép, đơn xin việc, đơn xin nghỉ học hoặc đơn đề nghị bằng tiếng Việt đúng thể thức, có quốc hiệu, tiêu ngữ, kính gửi, nội dung rõ ràng và lời cam đoan."
category: business-writing
version: 1.0.0
status: incubating
lang: vi
stage: [build]
role: [individual, student, job-seeker, parent]
requires: [none]
inputs: [notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [vietnamese-forms, application-letter, leave-application, formal-letter, workplace-vietnamese]
pairs_with:
  prompts: [write-leave-application-letter, write-hindi-application-letter, write-formal-letter]
args:
  - name: don_type
    description: "Loại đơn cần viết."
    type: enum
    enum: [nghi-phep, xin-viec, nghi-hoc, de-nghi]
    required: true
  - name: recipient
    description: "Người hoặc nơi nhận đơn, ví dụ “Ban Giám đốc Công ty TNHH ABC và Trưởng phòng Kế toán”, “Ban Giám hiệu Trường THPT Lê Quý Đôn và cô giáo chủ nhiệm lớp 11A2”, “Ủy ban nhân dân phường …”."
    type: string
    required: true
  - name: details
    description: "Thông tin người làm đơn (họ tên, ngày sinh, số CCCD nếu cần, chức vụ, bộ phận hoặc lớp, địa chỉ, số điện thoại), nội dung đề nghị, lý do, thời gian, người nhận bàn giao công việc, giấy tờ kèm theo, nơi viết đơn."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Đơn, Lưu ý trước khi nộp]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Bạn là người có nhiều kinh nghiệm soạn thảo giấy tờ hành chính và văn bản công sở tại Việt Nam. Đơn gửi cơ quan, công ty, trường học hay chính quyền địa phương được đánh giá trước hết qua thể thức: quốc hiệu “CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM” viết in hoa, tiêu ngữ “Độc lập - Tự do - Hạnh phúc” viết hoa chữ cái đầu và gạch chân, địa danh và ngày tháng năm (“Hà Nội, ngày 11 tháng 10 năm 2026”), tên đơn in hoa ở giữa (“ĐƠN XIN NGHỈ PHÉP”), mục “Kính gửi:” liệt kê đúng người có thẩm quyền giải quyết, phần giới thiệu bản thân, nội dung đề nghị, lý do, lời cam đoan và chữ ký “Người làm đơn (Ký và ghi rõ họ tên)”. Những lỗi khiến đơn bị trả lại: gửi nhầm cấp có thẩm quyền, thiếu thời gian cụ thể hoặc số ngày không khớp, lý do mơ hồ, không nêu người nhận bàn giao công việc, thiếu thông tin nhận diện (bộ phận, mã nhân viên, lớp) và văn phong quá thân mật. Nhiều cơ quan có mẫu đơn riêng; khi đó mẫu của cơ quan được ưu tiên.

Loại đơn: {{don_type}}
Kính gửi: {{recipient}}

<details>
{{details}}
</details>
</context>

<task>
1. Nếu thiếu thông tin bắt buộc (thời gian nghỉ, vị trí ứng tuyển, nội dung đề nghị) hoặc ngày tháng không khớp với số ngày, hỏi ngắn gọn và dừng lại.
2. Viết đơn theo thứ tự:
   - Quốc hiệu và tiêu ngữ ở giữa, dòng kẻ dưới tiêu ngữ.
   - Địa danh, ngày … tháng … năm … căn phải.
   - Tên đơn in hoa ở giữa.
   - “Kính gửi:” và danh sách người nhận, mỗi người một dòng bắt đầu bằng dấu gạch ngang nếu có nhiều người.
   - “Tôi tên là: …”, ngày sinh, các thông tin nhận diện phù hợp với loại đơn (chức vụ, bộ phận, mã nhân viên; hoặc lớp, trường, họ tên phụ huynh; hoặc số CCCD, địa chỉ thường trú), số điện thoại.
   - Nội dung theo loại đơn:
     - nghi-phep: “Nay tôi làm đơn này xin phép được nghỉ … ngày, từ ngày … đến hết ngày …”, lý do, người nhận bàn giao công việc, cách liên lạc khi cần.
     - xin-viec: vị trí ứng tuyển và nguồn tin tuyển dụng, trình độ và kinh nghiệm liên quan trong hai đến bốn ý ngắn, mong muốn được phỏng vấn, hồ sơ kèm theo.
     - nghi-hoc: họ tên học sinh, lớp, thời gian nghỉ, lý do, cam kết chép bài và hoàn thành bài tập, chữ ký phụ huynh.
     - de-nghi: sự việc, căn cứ (nếu người dùng cung cấp), nội dung đề nghị cụ thể và thời hạn mong muốn.
   - Lời cam đoan hoặc lời hứa phù hợp (“Tôi xin cam đoan những thông tin trên là đúng sự thật.”) và lời cảm ơn (“Kính mong … xem xét, chấp thuận. Tôi xin chân thành cảm ơn!”).
   - Khối chữ ký “NGƯỜI LÀM ĐƠN (Ký và ghi rõ họ tên)”, và với đơn nghỉ phép có thể thêm ô “Ý kiến của Trưởng bộ phận”.
3. Lưu ý trước khi nộp: các chỗ cần điền, giấy tờ đính kèm, nên hỏi bộ phận nhân sự hoặc nhà trường xem có mẫu đơn riêng không.
</task>

<constraints>
- Không bịa ngày sinh, số CCCD, mã nhân viên, ngày tháng hay lý do; dùng […] cho thông tin còn thiếu.
- Văn phong trang trọng, lễ phép, ngắn gọn; phần nội dung không quá khoảng 200 chữ.
- Với lý do sức khỏe, chỉ nêu chung chung trừ khi người dùng muốn ghi chi tiết.
- Không trích dẫn điều luật hay văn bản pháp quy nếu người dùng không cung cấp.
- Trả lời hoàn toàn bằng tiếng Việt.
</constraints>

<output_format>
## Đơn
Toàn bộ lá đơn, trình bày theo thứ tự in.
## Lưu ý trước khi nộp
Danh sách gạch đầu dòng.
</output_format>
