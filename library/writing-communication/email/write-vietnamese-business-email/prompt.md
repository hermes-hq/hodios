---
schema: 1
id: write-vietnamese-business-email
kind: prompt
title: Viết email công việc bằng tiếng Việt
description: "Viết email công việc bằng tiếng Việt với cách xưng hô, kính ngữ, bố cục và lời kết phù hợp với đối tác, khách hàng và cấp trên: đề nghị, xác nhận, nhắc việc, xin lỗi, từ chối và báo cáo."
category: email
version: 1.0.0
status: incubating
lang: vi
stage: [build]
role: [individual, manager, sales-rep]
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
depth: specific
tags: [email-cong-viec, xung-ho, kinh-ngu, business-vietnamese, van-phong]
pairs_with:
  prompts: [write-professional-email, write-follow-up-email, check-tone-before-sending]
args:
  - name: muc_dich
    description: "Mục đích email: de-nghi (đề nghị, yêu cầu), xac-nhan (xác nhận), nhac-viec (nhắc, theo dõi), xin-loi (xin lỗi), tu-choi (từ chối) hoặc bao-cao (báo cáo cấp trên)."
    type: enum
    enum: [de-nghi, xac-nhan, nhac-viec, xin-loi, tu-choi, bao-cao]
    default: de-nghi
  - name: nguoi_nhan
    description: "Người nhận và mối quan hệ: họ tên, chức vụ, công ty, đối tác bên ngoài hay đồng nghiệp, cấp trên hay ngang cấp, tuổi tác tương đối nếu biết, lần đầu liên hệ hay đã quen (ví dụ: \"Chị Nguyễn Thu Hà, Trưởng phòng Mua hàng Công ty ABC, lần đầu liên hệ\")."
    type: string
    required: true
  - name: noi_dung
    description: "Nội dung cần truyền đạt và các dữ kiện: ngày, hạn chót, số tiền, số đơn hàng hoặc hợp đồng, tệp đính kèm, cùng họ tên, chức vụ, công ty người gửi. Có thể viết bằng tiếng Việt, tiếng Anh hoặc kết hợp."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Tiêu đề, Nội dung email, Ghi chú về xưng hô, Kiểm tra trước khi gửi]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Trong email công việc tiếng Việt, cách xưng hô quyết định ấn tượng đầu tiên. Người làm việc lâu năm với doanh nghiệp Việt Nam biết rằng: email trang trọng mở đầu bằng "Kính gửi" kèm danh xưng và tên (Anh/Chị với người cùng thế hệ hoặc đối tác trẻ, Ông/Bà với lãnh đạo cấp cao hoặc cơ quan nhà nước); khi viết cho một tổ chức thì dùng "Quý Công ty", "Quý khách hàng"; người gửi xưng "tôi" trong email trang trọng, "em" khi viết cho cấp trên hoặc người lớn tuổi hơn trong nội bộ nếu đó là thói quen của công ty, và giữ nguyên một cách xưng hô trong cả email. Lỗi thường gặp: mở đầu "Dear anh", đổi qua lại giữa "tôi" và "em", mục đích bị chôn sau nhiều câu xã giao, hạn chót ghi "sớm nhất có thể", và kết thư bằng ngôn ngữ chat ("ok nha", "thanks"). Lời kết chuẩn mực là "Trân trọng," hoặc "Trân trọng cảm ơn," kèm chữ ký đầy đủ.
</context>

<task>
Viết một email công việc bằng tiếng Việt. Mục đích: {{muc_dich}}. Người nhận: {{nguoi_nhan}}.

<noi_dung>
{{noi_dung}}
</noi_dung>

1. Nếu thiếu thông tin cần thiết cho mục đích (đề nghị: cần gì và hạn khi nào; nhắc việc: ngày gửi email trước; xin lỗi: chuyện gì đã xảy ra và cách khắc phục; từ chối: từ chối việc gì; báo cáo: tiến độ và việc cần cấp trên quyết định), hãy đặt tối đa ba câu hỏi ngắn rồi dừng lại. Nếu chỉ thiếu thông tin người gửi, dùng [chỗ trống] và viết tiếp.
2. Xưng hô: chọn danh xưng cho người nhận (Anh/Chị/Ông/Bà, hoặc "Quý Công ty") và cho người gửi (tôi/em/chúng tôi) dựa trên mối quan hệ; nếu không rõ, dùng "Anh/Chị" và "tôi". Giải thích ngắn trong phần ghi chú.
3. Tiêu đề: cụ thể, có số đơn hàng, số hợp đồng hoặc ngày nếu có, ví dụ "[Xác nhận] Lịch giao hàng đơn PO-2291 ngày 20/11/2026".
4. Lời chào: "Kính gửi Chị Hà," hoặc "Kính gửi Ông Trần Văn Nam," hoặc "Kính gửi Quý Công ty," khi không có tên người nhận. Lần đầu liên hệ: một câu giới thiệu bản thân và công ty.
5. Mục đích nêu ngay câu thứ nhất hoặc thứ hai; chi tiết trình bày bằng danh sách đánh số nếu có nhiều ý.
6. Theo mục đích:
   - de-nghi: yêu cầu rõ ràng với "Kính đề nghị" hoặc "Rất mong Anh/Chị hỗ trợ", kèm hạn chót có ngày cụ thể và lý do.
   - xac-nhan: liệt kê nội dung cần xác nhận và thời hạn phản hồi.
   - nhac-viec: nhắc đến email trước kèm ngày gửi, lời lẽ lịch sự không trách móc, hạn chót mới.
   - xin-loi: sự việc và ảnh hưởng, lời xin lỗi một hai lần, nguyên nhân, biện pháp khắc phục và phòng ngừa.
   - tu-choi: cảm ơn, từ chối rõ ràng, lý do ngắn gọn, phương án khác nếu thật sự có.
   - bao-cao: kết luận trước, sau đó "Tiến độ", "Vấn đề và rủi ro", "Đề xuất cần Anh/Chị quyết định".
7. Lời kết phù hợp ("Rất mong nhận được phản hồi của Anh/Chị.", "Xin chân thành cảm ơn."), sau đó "Trân trọng," và chữ ký: họ tên, chức vụ, công ty, số điện thoại, dùng [chỗ trống] nếu thiếu.
</task>

<constraints>
- Viết toàn bộ email và ghi chú bằng tiếng Việt có dấu, chuẩn chính tả, kể cả khi đầu vào là tiếng Anh.
- Không bịa đặt dữ kiện, ngày tháng, số tiền, tên người, chức vụ hay số chứng từ; dùng [chỗ trống].
- Ngày viết "20/11/2026" hoặc "ngày 20 tháng 11 năm 2026", số tiền "25.000.000 đồng" hoặc "25.000.000 VNĐ".
- Giữ một cách xưng hô trong toàn bộ email; không dùng tiếng lóng hay từ tiếng Anh không cần thiết. Nội dung chính thường dưới khoảng 200 từ.
</constraints>

<output_format>
## Tiêu đề
Một dòng.
## Nội dung email
Lời chào, nội dung, lời kết, chữ ký.
## Ghi chú về xưng hô
Hai đến bốn ý: danh xưng đã chọn, mức độ trang trọng, cụm từ dễ dùng sai.
## Kiểm tra trước khi gửi
[Chỗ trống], tệp đính kèm, hạn chót, người cần CC.
</output_format>
