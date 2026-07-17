'use client';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { useSearchParams } from 'next/navigation';
import { CalendarRange } from 'lucide-react';

export default function Guestbook({ onRSVPClick }) {
  const searchParams = useSearchParams();
  const guestName = searchParams.get('to') || '';
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    try {
      const res = await fetch('/api/wishes');
      const result = await res.json();
      if (result.success) {
        setWishes(result.data || []);
      }
    } catch (e) {
      console.error('Không thể tải lời chúc:', e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError('Vui lòng điền đầy đủ Tên và Lời chúc.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message })
      });
      const result = await res.json();
      if (result.success) {
        setSuccess(true);
        setName('');
        setMessage('');
        
        // Thêm lời chúc mới vào đầu danh sách hiển thị
        setWishes((prev) => [result.data, ...prev]);

        // Hiệu ứng pháo hoa giấy chúc mừng!
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.8 },
          colors: ['#928362', '#fff8ed', '#b89c65', '#d4af37']
        });

        setTimeout(() => setSuccess(false), 4000);
      } else {
        setError(result.error || 'Có lỗi xảy ra. Vui lòng thử lại.');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi mạng. Vui lòng kiểm tra lại kết nối.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[420px] mx-auto px-4 font-body">
      {/* Form Gửi Lời Chúc */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Nhập tên của bạn*"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting}
            className="w-full px-4 py-3.5 rounded-xl border border-[#928362]/30 bg-white/70 text-[16px] focus:outline-none focus:ring-1 focus:ring-[#928362] transition text-zinc-800 placeholder-zinc-400 font-medium"
            required
          />
        </div>
        <div>
          <textarea
            rows="3"
            placeholder="Nhập lời chúc của bạn*"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isSubmitting}
            className="w-full px-4 py-3.5 rounded-xl border border-[#928362]/30 bg-white/70 text-[16px] focus:outline-none focus:ring-1 focus:ring-[#928362] transition text-zinc-800 placeholder-zinc-400 resize-none font-medium"
            required
          ></textarea>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center font-bold">{error}</p>
        )}
        {success && (
          <p className="text-emerald-600 text-sm text-center font-extrabold">
            Lời chúc của bạn đã gửi thành công! Cảm ơn bạn rất nhiều!
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 bg-[#928362] hover:bg-[#7a6d51] text-white text-[16px] font-bold rounded-xl transition duration-300 shadow-md cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? 'Đang gửi...' : 'Gửi Lời Chúc'}
        </button>
      </form>

      {/* Nút Xác Nhận Tham Dự */}
      <button
        onClick={onRSVPClick}
        type="button"
        className="w-full mt-3 py-3.5 bg-white hover:bg-zinc-50 text-[#928362] border-2 border-[#928362] text-[16px] font-extrabold rounded-xl transition duration-300 shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
      >
        <CalendarRange className="w-5 h-5 text-[#928362]" />
        <span>XÁC NHẬN THAM DỰ</span>
      </button>

      {guestName && (
        <div className="text-right text-xs text-[#928362]/70 font-semibold mt-2.5 italic">
          Khách mời: <span className="text-[#928362] font-bold">{guestName}</span>
        </div>
      )}

      {/* Danh Sách Lời Chúc (Dưới dạng các ô giấy ghi chú cuộn dọc nhỏ gọn) */}
      <div className="mt-10">
        <h4 className="text-sm font-serif-elegant font-bold text-[#928362]/90 uppercase tracking-widest text-center mb-4">
          — Lời Chúc Từ Mọi Người —
        </h4>

        {wishes.length === 0 ? (
          <p className="text-sm text-zinc-400 text-center italic py-4">
            Chưa có lời chúc nào. Hãy là người đầu tiên chúc phúc!
          </p>
        ) : (
          <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1 no-scrollbar border-t border-b border-[#928362]/10 py-3 bg-white/20 rounded-lg">
            {wishes.map((wish, index) => (
              <div 
                key={index} 
                className="bg-white/80 p-3.5 rounded-xl border border-[#928362]/10 shadow-xs flex flex-col space-y-1.5 transition duration-300 hover:shadow-sm"
              >
                <div className="flex justify-between items-center text-xs text-[#928362]/60 border-b border-[#928362]/10 pb-1.5">
                  <span className="font-bold text-[#928362] text-[13px]">{wish.name}</span>
                  <span>{wish.timestamp}</span>
                </div>
                <p className="text-sm text-zinc-800 leading-relaxed pt-0.5 break-words font-medium text-left">{wish.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
