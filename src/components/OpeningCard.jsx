'use client';
import { useState, useEffect } from 'react';

export default function OpeningCard({ onComplete }) {
  const [isStarted, setIsStarted] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Tự động kích hoạt hiệu ứng mở sau 300ms để người dùng kịp nhìn bìa
    const startTimer = setTimeout(() => {
      setIsStarted(true);
    }, 300);

    // Kích hoạt callback báo hoàn tất hiệu ứng khi slide đang trượt nửa chừng (tránh cảm giác chờ đợi)
    const completeTimer = setTimeout(() => {
      setIsHidden(true);
      if (onComplete) onComplete();
    }, 1200); // 300ms delay + 900ms transition time

    return () => {
      clearTimeout(startTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (isHidden) return null;

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center max-w-[480px] mx-auto overflow-hidden bg-transparent select-none pointer-events-none">
      
      {/* Cánh trái thiệp (chứa ảnh side-card.png bao gồm cả nửa con dấu và chữ Save The Date) */}
      <div 
        className={`absolute inset-y-0 left-0 w-[68%] z-10 card-side-animate-left ${isStarted ? 'slide-active' : ''}`}
        style={{
          backgroundImage: 'url(https://cocohappii.com/assets/images/side-card.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'top right',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Cánh phải thiệp (màu kem đồng bộ) */}
      <div 
        className={`absolute inset-y-0 right-0 w-[50%] bg-[#fff8ed] z-0 card-side-animate-right ${isStarted ? 'slide-active' : ''}`}
      />
      
    </div>
  );
}
