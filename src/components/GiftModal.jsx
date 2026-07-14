'use client';
import { X, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function GiftModal({ isOpen, onClose }) {
  const [copiedGroom, setCopiedGroom] = useState(false);
  const [copiedBride, setCopiedBride] = useState(false);
  const [activeTab, setActiveTab] = useState('groom'); // 'groom' hoặc 'bride'

  if (!isOpen) return null;

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'groom') {
      setCopiedGroom(true);
      setTimeout(() => setCopiedGroom(false), 2000);
    } else {
      setCopiedBride(true);
      setTimeout(() => setCopiedBride(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs max-w-[480px] mx-auto transition-opacity duration-300">
      <div className="bg-[#fff8ed] w-full max-w-[380px] rounded-2xl shadow-2xl border border-[#928362]/20 overflow-hidden relative">
        {/* Tiêu đề Modal */}
        <div className="flex items-center justify-between p-4 border-b border-[#928362]/10 bg-white">
          <h3 className="text-md font-serif-elegant font-bold text-[#928362] tracking-wider uppercase">Quà Mừng Cưới</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-[#928362] transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nút Tab chuyển tài khoản Chú Rể / Cô Dâu */}
        <div className="flex border-b border-[#928362]/10 bg-white/50 text-sm">
          <button
            onClick={() => setActiveTab('groom')}
            className={`flex-1 py-3 text-center font-bold transition-all duration-300 ${
              activeTab === 'groom' 
                ? 'text-[#928362] bg-[#fff8ed] border-b-2 border-[#928362]' 
                : 'text-zinc-500 hover:text-[#928362]/80'
            }`}
          >
            Đến Chú Rể
          </button>
          <button
            onClick={() => setActiveTab('bride')}
            className={`flex-1 py-3 text-center font-bold transition-all duration-300 ${
              activeTab === 'bride' 
                ? 'text-[#928362] bg-[#fff8ed] border-b-2 border-[#928362]' 
                : 'text-zinc-500 hover:text-[#928362]/80'
            }`}
          >
            Đến Cô Dâu
          </button>
        </div>

        {/* Nội dung bên trong Tab */}
        <div className="p-6 text-center">
          {activeTab === 'groom' ? (
            <div className="space-y-4">
              <p className="text-xs font-semibold text-zinc-500">Mừng cưới chú rể Đức Trung</p>
              <div className="w-[180px] h-[180px] mx-auto bg-white p-2 rounded-xl border border-[#928362]/20 shadow-inner flex items-center justify-center">
                <img 
                  src="https://media.cocohappii.com/qr_codes/53d8f7a6-acc3-4f83-afe2-0aba355282c2.jpg" 
                  alt="QR Code Groom"
                  className="max-h-full max-w-full rounded-sm"
                />
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-[#928362]/10 text-xs space-y-1 font-semibold text-zinc-700">
                <div>Ngân hàng: <span className="text-zinc-950 font-bold">Vietcombank</span></div>
                <div>Số tài khoản: <span className="text-zinc-950 font-bold">101889988</span></div>
                <div>Chủ tài khoản: <span className="text-zinc-950 font-bold">TRẦN ĐỨC TRUNG</span></div>
                <button
                  onClick={() => copyToClipboard('101889988', 'groom')}
                  className="mt-2 inline-flex items-center space-x-1 py-1 px-3 rounded bg-[#928362] text-white hover:bg-[#7a6d51] transition-colors font-bold text-xs"
                >
                  {copiedGroom ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedGroom ? 'Đã sao chép' : 'Sao chép STK'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs font-semibold text-zinc-500">Mừng cưới cô dâu Minh Phương</p>
              <div className="w-[180px] h-[180px] mx-auto bg-white p-2 rounded-xl border border-[#928362]/20 shadow-inner flex items-center justify-center">
                <img 
                  src="https://media.cocohappii.com/qr_codes/53d8f7a6-acc3-4f83-afe2-0aba355282c2.jpg" 
                  alt="QR Code Bride"
                  className="max-h-full max-w-full rounded-sm"
                />
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-[#928362]/10 text-xs space-y-1 font-semibold text-zinc-700">
                <div>Ngân hàng: <span className="text-zinc-950 font-bold">Techcombank</span></div>
                <div>Số tài khoản: <span className="text-zinc-950 font-bold">19033445566</span></div>
                <div>Chủ tài khoản: <span className="text-zinc-950 font-bold">LÊ THỊ MINH PHƯƠNG</span></div>
                <button
                  onClick={() => copyToClipboard('19033445566', 'bride')}
                  className="mt-2 inline-flex items-center space-x-1 py-1 px-3 rounded bg-[#928362] text-white hover:bg-[#7a6d51] transition-colors font-bold text-xs"
                >
                  {copiedBride ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedBride ? 'Đã sao chép' : 'Sao chép STK'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
