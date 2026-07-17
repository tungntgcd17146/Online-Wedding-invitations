'use client';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Gallery() {
  const images = [
    '/wedding_photos/BUM_8838.webp',
    '/wedding_photos/BUM_8749.webp',
    '/wedding_photos/BUM_8696.webp',
    '/wedding_photos/BUM_8680.webp',
    '/wedding_photos/BUM_8676.webp',
    '/wedding_photos/BUM_8668.webp',
    '/wedding_photos/BUM_8625.webp',
    '/wedding_photos/BUM_8617.webp'
  ];

  const [activeIdx, setActiveIdx] = useState(null);

  const openLightbox = (idx) => setActiveIdx(idx);
  const closeLightbox = () => setActiveIdx(null);

  const prevImage = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full px-4 py-4">
      {/* Khung Grid Ảnh Masonry-like */}
      <div className="grid grid-cols-2 gap-3">
        {images.map((src, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            onClick={() => openLightbox(index)}
            className={`cursor-pointer overflow-hidden rounded-xl border border-[#928362]/10 shadow-xs relative group ${
              index % 3 === 0 ? 'col-span-1 row-span-1' : ''
            }`}
          >
            <img 
              src={src} 
              alt={`Wedding Photo ${index + 1}`}
              className="w-full h-full object-cover aspect-[3/4] group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {/* Overlay hover tinh tế */}
            <div className="absolute inset-0 bg-[#928362]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>

      {/* Lightbox Phóng To Ảnh */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 max-w-[480px] mx-auto select-none"
          >
            {/* Nút đóng */}
            <button 
              onClick={closeLightbox}
              className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 p-2 rounded-full cursor-pointer hover:bg-white/20 transition z-50"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Nút trước */}
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 p-2.5 rounded-full cursor-pointer hover:bg-white/20 transition z-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Bức ảnh lớn */}
            <motion.div
              key={activeIdx}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-full max-h-[80vh] flex items-center justify-center"
            >
              <img 
                src={images[activeIdx]} 
                alt="Enlarged view" 
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border border-white/10"
              />
            </motion.div>

            {/* Nút tiếp theo */}
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 p-2.5 rounded-full cursor-pointer hover:bg-white/20 transition z-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Chỉ mục ảnh */}
            <div className="absolute bottom-5 text-white/60 text-xs font-semibold tracking-widest font-serif-elegant">
              {activeIdx + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
