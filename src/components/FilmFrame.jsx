'use client';

export default function FilmFrame() {
  const photos = [
    'https://media.cocohappii.com/thumbnails/53d8f7a6-acc3-4f83-afe2-0aba355282c2/dea27d6c-12f4-4bf1-ae2e-2310817cafd1.jpg',
    'https://media.cocohappii.com/thumbnails/53d8f7a6-acc3-4f83-afe2-0aba355282c2/f13be366-7a51-4405-9f96-1d7e7519ab2e.jpg',
    'https://media.cocohappii.com/thumbnails/53d8f7a6-acc3-4f83-afe2-0aba355282c2/45d29b3f-79c1-4842-864c-207e4c93d613.jpg',
    'https://media.cocohappii.com/thumbnails/53d8f7a6-acc3-4f83-afe2-0aba355282c2/473df5d5-1841-4cfb-87be-7e05e675a35d.jpg',
    'https://media.cocohappii.com/thumbnails/53d8f7a6-acc3-4f83-afe2-0aba355282c2/d44e2427-4695-44ba-a4d8-600cdbaa1bc2.jpg',
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
