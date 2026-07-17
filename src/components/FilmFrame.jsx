'use client';

export default function FilmFrame() {
  const photos = [
    '/wedding_photos/BUM_8345.webp',
    '/wedding_photos/BUM_8496.webp',
    '/wedding_photos/BUM_8838.webp',
  ];

  return (
    <div className="w-full py-4 bg-[#928362]/10 overflow-hidden relative my-6 border-y border-[#928362]/20">
      {/* Lỗ phim phía trên */}
      <div className="flex px-2 mb-3 justify-between opacity-80 select-none pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="w-3.5 h-2 bg-white rounded-xs border border-[#928362]/20" />
        ))}
      </div>

      {/* Dải ảnh cuộn ngang */}
      <div className="flex overflow-x-auto py-1 px-4 space-x-3 no-scrollbar scroll-smooth snap-x snap-mandatory">
        {photos.map((src, index) => (
          <div 
            key={index}
            className="flex-shrink-0 w-[140px] aspect-[4/3] bg-cover bg-center border-4 border-[#928362] shadow-md snap-center relative rounded-xs"
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>

      {/* Lỗ phim phía dưới */}
      <div className="flex px-2 mt-3 justify-between opacity-80 select-none pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="w-3.5 h-2 bg-white rounded-xs border border-[#928362]/20" />
        ))}
      </div>
    </div>
  );
}
