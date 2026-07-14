'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GuestPopup({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [guestName, setGuestName] = useState('Gia đình bạn ❤️');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const toVal = params.get('to');
      if (toVal) {
        setGuestName(toVal);
      }
    }
  }, []);

  const handleOpenClick = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    // Đóng popup khi click vào phần nền đen bên ngoài card
    if (e.target === e.currentTarget) {
      handleOpenClick();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        onClick={handleBackdropClick}
        className="fixed inset-0 z-[9999] flex flex-col justify-end bg-black/75 max-w-[480px] mx-auto overflow-hidden select-none cursor-pointer"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          className="relative bg-[#fff8ed] rounded-t-[50px] border-t-6 border-[#928362]/40 pt-16 pb-12 text-center text-[#5b432b] px-6 cursor-default"
        >
          {/* Con dấu sáp vàng ở đỉnh card */}
          <div 
            className="w-[110px] h-[110px] absolute -top-[55px] left-1/2 -translate-x-1/2 bg-contain bg-center bg-no-repeat drop-shadow-md"
            style={{
              backgroundImage: 'url(https://cocohappii.com/assets/images/common/button.png)'
            }}
          />

          {/* Tên thiệp mời */}
          <div className="space-y-4">
            <span className="text-zinc-500 uppercase tracking-[0.2em] text-[10px] block">
              The Wedding Of
            </span>
            <h2 className="text-2xl font-serif-elegant font-bold text-[#5b432b] tracking-wide">
              Minh Phương ♥ Đức Trung
            </h2>

            {/* Ngày cưới cùng 2 chiếc lá nghệ thuật */}
            <div className="flex items-center justify-center space-x-1 py-2">
              <div 
                className="w-16 h-8 bg-contain bg-center bg-no-repeat opacity-80"
                style={{
                  backgroundImage: 'url(https://cocohappii.com/assets/images/common/leaf-left.png)'
                }}
              />
              <span className="text-[15px] font-serif-elegant font-semibold tracking-[0.15em] text-[#5b432b]">
                07.11.2025
              </span>
              <div 
                className="w-16 h-8 bg-contain bg-center bg-no-repeat opacity-80"
                style={{
                  backgroundImage: 'url(https://cocohappii.com/assets/images/common/leaf-right.png)'
                }}
              />
            </div>

            {/* Lời mời khách hàng */}
            <div className="pt-4 space-y-2">
              <span className="text-zinc-500 uppercase tracking-[0.15em] text-[10px] block">
                Gửi lời mời tới
              </span>
              <div className="inline-block px-6 pb-2 border-b border-[#928362]/20">
                <span className="text-lg font-serif-elegant font-semibold text-[#928362]">
                  {guestName}
                </span>
              </div>
            </div>

            {/* Nút Xem thiệp ngay */}
            <div className="pt-6">
              <button 
                onClick={handleOpenClick}
                className="border border-[#928362]/40 rounded-md py-2 px-8 font-serif-elegant text-sm text-[#928362] shadow-[0_4px_0_rgba(146,131,98,0.25)] hover:shadow-[0_5px_0_rgba(146,131,98,0.35)] active:translate-y-[3px] active:shadow-none transition-all duration-150 cursor-pointer bg-transparent"
              >
                Xem thiệp ngay
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
