import type { LevelId } from '@/domain/levels/types';

/** Lời dẫn không tiết lộ đáp án; mỗi màn có một tình huống, một câu chốt và một lời mời khám phá. */
export const LEVEL_FLAVOR = {
  '2d-01': [
    'Ông đếm đủ cháu mà sao vẫn thiếu một đứa nhỉ?',
    'Phát hiện nhân vật bí mật! Tết này bạn được giao phát lì xì.',
    'Một câu đố mà càng nghĩ to, đáp án càng nhỏ.',
  ],
  '2d-02': [
    'Chủ ao đố một câu. Cá trong ao cũng đang hóng đáp án.',
    'Chủ ao xin thua. Chơi chữ mà bạn cũng bắt được!',
    'Qua đường thôi, mà xe cộ có vẻ chưa hợp tác.',
  ],
  '2d-03': [
    'Bé đã đợi ba bài nhạc rồi. Có cách nào lịch sự hơn lao ra đường?',
    'Một pha qua đường không cần siêu năng lực.',
    'Xoài thì chín rồi. Còn bạn đã có kế chưa?',
  ],
  '2d-04': [
    'Bé: “Cao thêm hai phân nữa là với được… chắc vậy.”',
    'Xoài rụng, bé vui. Newton cũng gật đầu.',
    'Một câu chuyện trên mái nhà nghe hơi sai sai.',
  ],
  '2d-05': [
    'Gà trống có lời muốn nói về kịch bản này.',
    'Gà trống cảm ơn bạn đã đòi lại công bằng.',
    'Con cá này giấu kỹ hơn bạn tưởng.',
  ],
  '2d-06': [
    'Cá đâu? Đôi khi đọc kỹ còn lợi hơn soi kỹ.',
    'Bạn bắt được cá bằng… mắt đọc. Đỉnh!',
    'Hai quả cam, một bà bán hàng rất tự tin.',
  ],
  '2d-07': [
    'Bà bảo mắt bà tinh lắm. Mắt bạn thì sao?',
    'Bà bán cam xin đo lại kính. Bạn thắng kèo!',
    'Shipper cần một thám tử biết xoay chuyển tình thế.',
  ],
  '3d-01': [
    'Shipper gọi lần thứ ba rồi. Địa chỉ có thật mà!',
    'Đã giao đúng nhà! Một đơn hàng, một pha xoay não.',
    'Chiếc rương chỉ mở cho người biết nghịch chữ.',
  ],
  '2d-08': [
    'Rương này không nhận chìa khóa. Nó thích nghe chơi chữ.',
    'Rương mở rồi! Hóa ra mật khẩu nằm ngay trên nhãn.',
    'Một bài kiểm tra mà chăm chỉ quá lại dễ mắc bẫy.',
  ],
  '2d-09': [
    'Giáo viên: “Chỉ năm phút thôi.” Đọc kỹ đã nha.',
    'Bạn qua bài kiểm tra về… đọc bài kiểm tra.',
    'Đàn vịt chuẩn bị thử tài đếm của bạn.',
  ],
  '2d-10': [
    'Đàn vịt cứ đi qua đi lại, làm rối cả lời kể.',
    'Vịt không nhân đôi. Chỉ có lời kể chạy vòng vòng.',
    'Có một thứ của bạn mà cả xóm dùng ké.',
  ],
  '2d-11': [
    'Mình giữ nó, mà người khác cứ gọi suốt ngày.',
    'Đúng rồi! Của bạn, nhưng cả xóm xài miễn phí.',
    'Chìa khóa lại trốn. Chiếc dép có vẻ khả nghi.',
  ],
  '3d-02': [
    'Xe chờ, người chờ. Chỉ có chìa khóa là thích trốn tìm.',
    'Tìm thấy rồi! Chiếc dép chính thức hết bị tình nghi.',
    'Cả phố đang kẹt. Bấm nhiều liệu có nhanh hơn?',
  ],
  '2d-12': [
    'Tiếng còi còn chạy nhanh hơn cả đoàn xe.',
    'Một khoảng yên tĩnh, cả đoàn xe biết ơn bạn.',
    'Một cây cầu khỉ đang thử độ kiên nhẫn của bạn.',
  ],
  '2d-13': [
    'Bé tự tin lắm. Cây cầu thì chưa được vậy.',
    'Bé đã về tới nhà ngoại. Cầu xin nghỉ giải lao.',
    'Con lươn nhanh. Bạn có cần nhanh hơn nó không?',
  ],
  '2d-14': [
    'Lươn: “Bắt được tui rồi hãy nói chuyện.”',
    'Lươn thua một bộ óc biết đổi chiến thuật.',
    'Nồi bánh Tết có thể đang giấu thêm khách.',
  ],
  '3d-03': [
    'Cả nhà chờ chia bánh. Đếm hụt là có người giận đó!',
    'Đếm đủ bánh rồi. Năm nay chia phần khỏi cãi!',
    'Một câu tiếng Việt trông như bị gõ lặp.',
  ],
  '2d-15': [
    'Bàn phím không hỏng đâu. Câu này có nghĩa thật.',
    'Câu chữ đã vào hàng. Giáo viên Văn thả tim.',
    'Gánh hàng lệch vai. Giúp bà một tay nào.',
  ],
  '2d-16': [
    'Bà: “Chia sao cho đều, chứ vai bà hết chịu nổi rồi.”',
    'Vai bà nhẹ, đầu bạn sáng. Một công đôi việc!',
    'Quán cà phê có chiếc đồng hồ thích đánh lừa.',
  ],
  '2d-17': [
    'Khách bảo trễ hẹn. Đồng hồ trong gương bảo chưa chắc.',
    'Giờ đã đúng, cà phê vẫn còn nóng. Vừa kịp!',
    'Mười bảy con trâu và một bài chia gia tài khó đỡ.',
  ],
  '2d-18': [
    'Ba anh em đang đếm lại lần thứ mười bảy.',
    'Chia đủ, trâu còn nguyên. Ông cụ chắc đang cười.',
    'Một que diêm sắp cứu cả phép tính.',
  ],
  '2d-19': [
    'Phép tính này chỉ cần một cuộc chuyển nhà nhỏ.',
    'Đúng một que, cứu cả phép tính. Tiết kiệm ghê!',
    'Ba túi trái cây. Ba cái nhãn. Không nhãn nào thật thà.',
  ],
  '2d-20': [
    'Chủ sạp: “Ai dán nhãn vậy trời?” Bạn ra tay nhé.',
    'Sạp trái cây đã có trật tự. Chủ sạp tặng một tràng pháo tay.',
    'Tắt đèn rồi mà bé vẫn chưa chịu ngủ.',
  ],
  '2d-21': [
    'Bé kéo chăn lần thứ năm. Vẫn chói!',
    'Bé ngủ rồi. Bạn nhẹ tay bấm màn tiếp nha.',
    'Một chiếc bóng đang đứng sai chỗ.',
  ],
  '2d-22': [
    'Mặt trời không biết nói dối. Còn mấy cái bóng thì…',
    'Bạn tóm được cái bóng chính chủ!',
    'Hai cốc ngang mực, nhưng chưa chắc ngang nước.',
  ],
  '2d-23': [
    'Hai cốc đang tranh nhau danh hiệu “nhiều nước nhất”.',
    'Mực nước đã khai thật. Một pha điều tra trong veo!',
    'Ba cổng hội chợ, chỉ một tấm biển thật thà.',
  ],
  '2d-24': [
    'Bác bảo vệ cũng đang chờ bạn chọn cổng.',
    'Ra được rồi! Mấy tấm biển hết đường đánh lạc hướng.',
    'Trời sắp mưa, ốc sên cần về nhà gấp.',
  ],
  '2d-25': [
    'Ốc sên không chạy nhanh. Nhưng có khi chẳng cần chạy.',
    'Về nhà trong một nốt nhạc. Ốc sên gọi đó là tiện nghi.',
    'Cái cân không nói dối, nhưng nó cân những gì?',
  ],
  '2d-26': [
    'Cô bán cam: “Cân cả tình cảm… à nhầm, cả cái rổ.”',
    'Cam ra cam, rổ ra rổ. Tính tiền chuẩn rồi!',
    'Cắt mất một góc, sao nhìn lại thấy nhiều hơn?',
  ],
  '2d-27': [
    'Tờ giấy: “Mất một góc chưa chắc là bớt một góc nha.”',
    'Cây kéo cắt giấy. Bạn cắt được đường suy nghĩ quen thuộc.',
    'Bà nhắc chuyện hôm qua, mà nghe như ngày mai.',
  ],
  '2d-28': [
    'Bà nhớ rất rõ. Chỉ có lịch trong đầu mình hơi loạn.',
    'Lịch đã hết lú. Bà rủ bạn uống trà.',
    'Sáu cái cốc và đúng một lần nhấc tay.',
  ],
  '2d-29': [
    'Phục vụ quán có một thử thách dọn bàn hơi kỳ.',
    'Một lần nhấc, cả hàng cốc vào nếp. Tay nghề cao!',
    'Trong phòng tối, việc đầu tiên là gì?',
  ],
  '2d-30': [
    'Nến và đèn dầu đang chờ ai đó bắt đầu.',
    'Một tia sáng lóe lên. Cả căn phòng được nhờ!',
    'Chia bánh sao cho cái giỏ vẫn có phần?',
  ],
  '2d-31': [
    'Ba bé, ba bánh. Cái giỏ cũng nhất quyết không chịu rỗng.',
    'Ai cũng có bánh. Cái giỏ cũng vui. Khéo thật!',
    'Ốc leo ban ngày, tụt ban đêm. Khi nào được nghỉ?',
  ],
  '2d-32': [
    'Ốc: “Lên tới đỉnh là tui về, không tăng ca đâu.”',
    'Ốc chạm đỉnh rồi! Đêm nay được ngủ ngon.',
    'Một viên bi nhẹ hơn đang giả vờ giống tám viên còn lại.',
  ],
  '2d-33': [
    'Chiếc cân chỉ nhận hai lượt. Thám tử tính kỹ nhé.',
    'Viên bi hết đường giả vờ. Hai lượt cân quá gọn!',
    'Sói, dê, bắp cải cùng muốn đi đò. Hơi căng.',
  ],
  '2d-34': [
    'Bác lái đò: “Miễn đừng ai ăn ai trên bờ là được.”',
    'Đủ khách, nguyên hàng. Bác đò nhận chuyến đi năm sao!',
    'Vừa vượt một người, liệu đã được dẫn đầu?',
  ],
  '2d-35': [
    'Bình luận viên đang hét rất to. Bạn khoan ăn mừng vội.',
    'Pha vượt người chuẩn. Pha tính thứ hạng còn chuẩn hơn!',
    'Mắt đọc chữ, tay chọn màu. Não có theo kịp không?',
  ],
  '2d-36': [
    'Màu mực và tên màu đang cố tình cãi nhau.',
    'Bạn nhìn màu chuẩn hơn máy in rồi đó!',
    'Một chiếc bánh, một cái túi, một cái bẫy nhẩm nhanh.',
  ],
  '2d-37': [
    'Cô bán bánh: “Nhẩm nhanh quá là cô tính lại đó nha.”',
    'Hóa đơn khớp rồi. Cô bán bánh khỏi lo thối nhầm!',
    'Hai cái bình, không vạch chia, vẫn phải nấu chè.',
  ],
  '2d-38': [
    'Nồi chè đang chờ đúng lượng nước. Đừng áng chừng nha.',
    'Đủ bốn lít! Chè ngon có công bạn đong nước.',
    'Bốn tấm thẻ sắp thử xem bạn tin luật đến đâu.',
  ],
  '2d-39': [
    'Đây là bàn cuối. Ít thẻ thôi, nhưng phải bắt được mọi kẽ hở.',
    'Bạn đã đi hết hành trình! Bốn mươi hai cú xoắn, một bộ óc rất cừ.',
    'Thử tự giải lại những màn từng cần trợ giúp nhé.',
  ],
} satisfies Record<LevelId, readonly [string, string, string]>;

export function flavorOf(id: LevelId) {
  return LEVEL_FLAVOR[id as keyof typeof LEVEL_FLAVOR];
}
