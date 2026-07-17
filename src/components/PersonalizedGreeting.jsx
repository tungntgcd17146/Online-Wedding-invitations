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

  return (
    <div className="text-center space-y-3.5 max-w-[340px] mx-auto select-none text-[#796745]">
      <p className="text-[18px] font-semibold leading-relaxed">
        Thân gửi đến: <span className="font-bold border-b border-[#928362]/40 pb-0.5 px-2 text-[19px]">{guestName || 'Quý khách'}</span>
      </p>
      <p className="text-[17.5px] italic font-semibold leading-relaxed opacity-90">
        Trân trọng kính mời quý khách và gia đình đến chung vui cùng buổi tiệc cưới ấm áp của chúng tôi!
      </p>
    </div>
  );
}
