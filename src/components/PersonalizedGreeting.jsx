'use client';
import { useState, useEffect } from 'react';

export default function PersonalizedGreeting({ guestName }) {

  return (
    <div className="text-center space-y-3.5 max-w-[340px] mx-auto select-none text-[#796745]">
      <p className="text-[18px] font-semibold leading-relaxed">
        Thân gửi đến: <span className="font-black text-[#3a2818] border-b-2 border-[#928362]/60 pb-0.5 px-2 text-[21px]">{guestName || 'Quý khách'}</span>
      </p>
      <p className="text-[17.5px] italic font-semibold leading-relaxed opacity-90">
        Trân trọng kính mời quý khách và gia đình đến chung vui cùng buổi tiệc cưới ấm áp của chúng tôi!
      </p>
    </div>
  );
}
