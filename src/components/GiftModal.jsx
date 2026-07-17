'use client';
import { X, Copy, Check } from 'lucide-react';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function GiftModalContent({ isOpen, onClose, bankInfo }) {
  const [copied, setCopied] = useState(false);
  const searchParams = useSearchParams();

  if (!isOpen) return null;

  // Quyết định hiển thị Chú rể hay Cô dâu dựa trên các tham số query thông dụng (nếu có)
  const sideParam = (
    searchParams.get('side') || 
    searchParams.get('from') || 
    searchParams.get('role') || 
    ''
  ).toLowerCase();

  let accountInfo = bankInfo;

  if (sideParam) {
    const isBride = 
      sideParam.includes('nu') || 
      sideParam.includes('bride') || 
      sideParam.includes('codau') || 
      sideParam.includes('gai');

    const fallbackGroom = {
      roleName: 'chú rể',
      fullName: 'Thanh Tùng',
      bankName: 'TPBank',
      accountNumber: '02138194101',
      ownerName: 'NGUYỄN THANH TÙNG',
      qrSrc: '/wedding_photos/QRchure_cropped.webp'
    };

    const fallbackBride = {
      roleName: 'cô dâu',
      fullName: 'Ánh Nguyệt',
      bankName: 'TPBank',
      accountNumber: '10000516918',
      ownerName: 'PHẠM THỊ ÁNH NGUYỆT',
      qrSrc: '/wedding_photos/QRcodau_cropped.webp'
    };

    accountInfo = isBride ? fallbackBride : fallbackGroom;
  }

  // Fallback mặc định nếu không truyền prop và không có query params
  if (!accountInfo) {
    accountInfo = {
      roleName: 'chú rể',
      fullName: 'Thanh Tùng',
      bankName: 'TPBank',
      accountNumber: '02138194101',
      ownerName: 'NGUYỄN THANH TÙNG',
      qrSrc: '/wedding_photos/QRchure_cropped.webp'
    };
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs max-w-[480px] mx-auto transition-opacity duration-300">
      <div className="bg-[#fff8ed] w-full max-w-[380px] rounded-2xl shadow-2xl border border-[#928362]/20 overflow-hidden relative">
        {/* Tiêu đề Modal */}
        <div className="flex items-center justify-between p-4 border-b border-[#928362]/10 bg-white">
          <h3 className="text-md font-serif-elegant font-bold text-[#928362] tracking-wider uppercase">
            Quà Mừng Cưới
          </h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-[#928362] transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nội dung hiển thị tài khoản */}
        <div className="p-6 text-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Mừng cưới {accountInfo.roleName} {accountInfo.fullName}
            </p>
            <div className="w-[180px] h-[180px] mx-auto bg-white p-2 rounded-xl border border-[#928362]/20 shadow-inner flex items-center justify-center">
              <img 
                src={accountInfo.qrSrc} 
                alt={`QR Code ${accountInfo.fullName}`}
                className="max-h-full max-w-full rounded-sm"
              />
            </div>
            <div className="bg-white/80 p-4 rounded-xl border border-[#928362]/10 text-[13px] min-[360px]:text-sm space-y-1.5 font-semibold text-zinc-700 text-left max-w-[310px] mx-auto">
              <div>Ngân hàng: <span className="text-zinc-950 font-bold">{accountInfo.bankName}</span></div>
              <div>Số tài khoản: <span className="text-zinc-950 font-bold">{accountInfo.accountNumber}</span></div>
              <div>Chủ tài khoản: <span className="text-zinc-950 font-bold">{accountInfo.ownerName}</span></div>
              <div className="pt-2 text-center">
                <button
                  onClick={() => copyToClipboard(accountInfo.accountNumber)}
                  className="inline-flex items-center justify-center space-x-1.5 py-1.5 px-4 rounded bg-[#928362] text-white hover:bg-[#7a6d51] transition-colors font-bold text-xs shadow-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Đã sao chép' : 'Sao chép STK'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GiftModal({ isOpen, onClose, bankInfo }) {
  if (!isOpen) return null;
  return (
    <Suspense fallback={null}>
      <GiftModalContent isOpen={isOpen} onClose={onClose} bankInfo={bankInfo} />
    </Suspense>
  );
}
