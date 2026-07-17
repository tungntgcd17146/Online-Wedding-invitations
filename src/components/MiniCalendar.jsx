'use client';

export default function MiniCalendar({ 
  highlightDay = 8, 
  month = 'August', 
  year = '2026', 
  blanksCount = 5, 
  daysCount = 31 
}) {
  // Tiêu đề các ngày trong tuần (Thứ Hai đến Chủ Nhật) theo mẫu Cocohappii
  const daysOfWeek = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  
  // Ngày 1 rơi vào thứ Bảy (cần blanksCount ô trống phía trước nếu bắt đầu từ Thứ Hai)
  const blanks = Array(blanksCount).fill(null);
  const daysInMonth = Array.from({ length: daysCount }, (_, i) => i + 1);
  const allDays = [...blanks, ...daysInMonth];

  return (
    <div className="w-full max-w-[320px] mx-auto p-2 font-serif-elegant bg-transparent select-none">
      {/* Tiêu đề Tháng & Năm chồng đè nghệ thuật */}
      <div className="relative flex flex-col items-center justify-center h-20 mb-6">
        <span className="text-[#928362]/20 font-serif-elegant text-7xl font-semibold tracking-wider leading-none">
          {year}
        </span>
        <h3 className="font-cursive text-[#928362] text-4xl absolute bottom-1.5 opacity-90 select-none">
          {month}
        </h3>
      </div>

      {/* Tên các Thứ (T2 -> CN) */}
      <div className="grid grid-cols-7 gap-y-2 text-center text-xs font-semibold text-[#928362]/80 mb-4 pb-2">
        {daysOfWeek.map((day, idx) => (
          <div key={idx} className="tracking-widest">{day}</div>
        ))}
      </div>

      {/* Lưới các Ngày */}
      <div className="grid grid-cols-7 gap-y-4 text-center text-sm font-medium text-[#928362]">
        {allDays.map((day, idx) => {
          if (day === null) {
            return <div key={`blank-${idx}`} />;
          }

          const isWeddingDay = day === highlightDay;

          return (
            <div 
              key={`day-${day}`} 
              className="relative flex items-center justify-center h-9 w-9 mx-auto"
            >
              {isWeddingDay ? (
                <div className="relative flex items-center justify-center w-9 h-9">
                  {/* Trái tim viền màu vàng đất bao quanh số ngày */}
                  <svg 
                    className="absolute w-9 h-9 text-[#928362]/85 animate-pulse" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3c1.782 0 3.398.88 4.312 2.233C12.914 3.88 14.53 3 16.312 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001z" 
                    />
                  </svg>
                  <span className="font-serif-elegant font-bold text-[#928362] z-10 -mt-0.5">{day}</span>
                </div>
              ) : (
                <span className="font-serif-elegant text-zinc-700/90">{day}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
