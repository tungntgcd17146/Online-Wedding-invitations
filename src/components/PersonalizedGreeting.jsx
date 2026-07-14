'use client';
import { useState, useEffect } from 'react';

export default function PersonalizedGreeting() {
  const [guestName, setGuestName] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const toVal = params.get('to');
      if (toVal) {
        setGuestName(toVal);
      }
    }
  }, []);

  if (!guestName) {
    return (
      <p className="text-xs text-zinc-500 italic max-w-[280px] mx-auto leading-relaxed">
        Trân trọng kính mời quý khách và gia đình đến chung vui cùng buổi tiệc cưới ấm áp của chúng tôi!
      </p>
    );
  }

  return (
    <div className="bg-[#fff8ed]/90 border border-[#928362]/30 p-4 rounded-xl shadow-xs text-center max-w-[320px] mx-auto animate-float">
      <span className="text-[9px] uppercase font-bold text-[#928362] tracking-widest block mb-1">
        Thư Mời Trân Trọng
      </span>
      <h4 className="text-sm font-serif-elegant font-bold text-[#928362] mb-1">
        Thân gửi đến: <span className="underline decoration-wavy decoration-[#gold-accent] underline-offset-4 font-extrabold">{guestName}</span>
      </h4>
      <p className="text-[11px] text-zinc-500">
        Sự hiện diện của quý khách là niềm vinh hạnh lớn cho gia đình chúng tôi!
      </p>
    </div>
  );
}
