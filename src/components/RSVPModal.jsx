'use client';
import { X, CalendarRange, Check, Loader2 } from 'lucide-react';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function RSVPModalContent({ isOpen, onClose }) {
  const searchParams = useSearchParams();
  const [name, setName] = useState('');
  const [attends, setAttends] = useState(true); // true = Có, false = Không
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Lấy tên khách từ query parameter "to"
  useEffect(() => {
    if (isOpen) {
      const toParam = searchParams.get('to') || '';
      setName(toParam);
      setSuccess(false);
      setError('');
      setMessage('');
      setAttends(true);
    }
  }, [isOpen, searchParams]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          attends,
          message: message.trim(),
        }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        setError(result.error || 'Có lỗi xảy ra, vui lòng thử lại.');
      }
    } catch (err) {
      console.error('RSVP submit error:', err);
      setError('Lỗi kết nối mạng, vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs max-w-[480px] mx-auto transition-opacity duration-300">
      <div className="bg-[#fff8ed] w-full max-w-[380px] rounded-2xl shadow-2xl border border-[#928362]/20 overflow-hidden relative">
        {/* Tiêu đề Modal */}
        <div className="flex items-center justify-between p-4 border-b border-[#928362]/10 bg-white">
          <div className="flex items-center space-x-2 text-[#928362]">
            <CalendarRange className="w-5 h-5" />
            <h3 className="text-md font-serif-elegant font-bold tracking-wider uppercase">
              Xác Nhận Tham Dự
            </h3>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-[#928362] transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nội dung Form */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-serif-elegant font-bold text-[#928362]">Gửi thành công!</h4>
              <p className="text-sm text-zinc-600 font-medium">
                Cảm ơn bạn rất nhiều vì đã gửi phản hồi tham dự lễ cưới của chúng mình!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left font-body">
              {/* Tên khách mời */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#928362] mb-1.5">
                  Tên Khách Mời / Guest:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập tên của bạn*"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-xl border border-[#928362]/30 bg-white/70 text-[15px] focus:outline-none focus:ring-1 focus:ring-[#928362] transition text-zinc-800 placeholder-zinc-400 font-medium"
                  required
                />
              </div>

              {/* Trạng thái tham dự */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#928362]">
                  Bạn sẽ tham dự chứ? *
                </label>
                <div className="space-y-2.5 pt-1">
                  <label className="flex items-center space-x-3 cursor-pointer select-none text-sm text-zinc-700 font-semibold">
                    <input
                      type="radio"
                      name="attends"
                      checked={attends === true}
                      onChange={() => setAttends(true)}
                      disabled={isSubmitting}
                      className="w-4 h-4 text-[#928362] focus:ring-[#928362] border-zinc-300 accent-[#928362]"
                    />
                    <span>Có, tôi sẽ tham dự</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer select-none text-sm text-zinc-700 font-semibold">
                    <input
                      type="radio"
                      name="attends"
                      checked={attends === false}
                      onChange={() => setAttends(false)}
                      disabled={isSubmitting}
                      className="w-4 h-4 text-[#928362] focus:ring-[#928362] border-zinc-300 accent-[#928362]"
                    />
                    <span>Không, tôi không tham dự được</span>
                  </label>
                </div>
              </div>

              {/* Lời chúc gửi kèm */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#928362] mb-1.5">
                  Lời nhắn gửi Cô dâu & Chú rể:
                </label>
                <textarea
                  rows="3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Nhập lời nhắn..."
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-xl border border-[#928362]/30 bg-white/70 text-[15px] focus:outline-none focus:ring-1 focus:ring-[#928362] transition text-zinc-800 placeholder-zinc-400 resize-none font-medium"
                ></textarea>
                <p className="text-[10px] text-zinc-400 italic mt-1 leading-normal">
                  * Lời nhắn này sẽ được gửi RIÊNG đến cô dâu và chú rể.
                </p>
              </div>

              {error && (
                <p className="text-red-500 text-xs font-bold text-center">{error}</p>
              )}

              {/* Nút gửi */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#928362] hover:bg-[#7a6d51] text-white text-[15px] font-bold rounded-xl transition duration-300 shadow-md flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Đang gửi xác nhận...</span>
                  </>
                ) : (
                  <span>Gửi xác nhận</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RSVPModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <Suspense fallback={null}>
      <RSVPModalContent isOpen={isOpen} onClose={onClose} />
    </Suspense>
  );
}
