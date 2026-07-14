'use client';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Gallery() {
  const images = [
    'https://media.cocohappii.com/optimized/53d8f7a6-acc3-4f83-afe2-0aba355282c2/9cb03dc3-c5a6-4b7f-a807-96c21d708094.jpg',
    'https://media.cocohappii.com/optimized/53d8f7a6-acc3-4f83-afe2-0aba355282c2/94572186-c77b-4421-9a4f-fc5a26ffd1e1.jpg',
    'https://media.cocohappii.com/optimized/53d8f7a6-acc3-4f83-afe2-0aba355282c2/5490b50c-742d-48d4-a586-4b5d2f854053.jpg',
    'https://media.cocohappii.com/optimized/53d8f7a6-acc3-4f83-afe2-0aba355282c2/40975a4a-64a5-436e-b875-aa2c3f6d7380.jpg',
    'https://media.cocohappii.com/optimized/53d8f7a6-acc3-4f83-afe2-0aba355282c2/f9bd7002-acea-484c-ab73-2ca5ac265fd6.jpg',
    'https://media.cocohappii.com/optimized/53d8f7a6-acc3-4f83-afe2-0aba355282c2/65a7e4c7-d8f8-4275-91e2-1af1cac0a16a.jpg',
    'https://media.cocohappii.com/optimized/53d8f7a6-acc3-4f83-afe2-0aba355282c2/9d701b10-eeb3-423f-b285-4f3caa983d01.jpg',
    'https://media.cocohappii.com/optimized/53d8f7a6-acc3-4f83-afe2-0aba355282c2/3ad48427-5423-4ba2-93f5-46ec76095de9.jpg',
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
